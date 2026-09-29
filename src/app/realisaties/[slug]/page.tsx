import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CallToAction } from "@/components/Footer";
import { Foto } from "@/components/Foto";
import { Gallery } from "@/components/Gallery";
import { Icon } from "@/components/Icon";
import { Parallax } from "@/components/Parallax";
import { pageMeta, trimDescription } from "@/lib/seo";
import { WaveDivider } from "@/components/WaveDivider";
import { projectHref, projects } from "@/lib/content";

const withDetail = projects.filter((p) => p.detail);

/** Statische export: enkel projecten met een detail krijgen een pagina. */
export function generateStaticParams() {
  return withDetail.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/realisaties/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = withDetail.find((x) => x.slug === slug);
  if (!p?.detail) return {};
  return pageMeta({
    // categorie enkel in de titel als hij binnen ~60 tekens (incl. " | De Koster") blijft
    title: p.title.length + p.category.length + 15 <= 60 ? `${p.title} | ${p.category}` : p.title,
    description: trimDescription(`${p.detail.intro} Realisatie van Tuinaanneming De Koster.`),
    keywords: [
      `${p.category.toLowerCase()} ${p.location}`,
      p.title,
      "tuinaannemer Gent",
      "realisaties Gent en omstreken",
    ],
    path: `/realisaties/${p.slug}/`,
    image: p.detail.cover,
  });
}

export default async function ProjectPage({ params }: PageProps<"/realisaties/[slug]">) {
  const { slug } = await params;
  const index = withDetail.findIndex((x) => x.slug === slug);
  const project = withDetail[index];
  if (!project?.detail) notFound();
  const { detail } = project;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  const meta = [
    ["Categorie", project.category],
    ["Jaar", project.year],
    ["Locatie", project.location],
  ] as const;

  return (
    <>
      {/* Cover */}
      <section className="relative isolate overflow-hidden bg-forest">
        <Parallax className="absolute inset-0 -z-10" speed={0.25}>
          <Foto src={detail.cover} alt="" priority className="h-full w-full object-cover" />
        </Parallax>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/10" />
        <div className="wrap pt-40 pb-36 sm:pt-56 sm:pb-44">
          <Link
            href="/realisaties/"
            className="inline-flex animate-rise items-center gap-2 font-mono text-[11px] tracking-[3px] text-sand/85 uppercase transition hover:text-lime"
          >
            <Icon name="arrowRight" className="h-4 w-4 rotate-180" /> Alle realisaties
          </Link>
          <h1 className="mt-5 max-w-[820px] animate-rise text-[44px] leading-[.98] font-bold tracking-[-2px] text-white [animation-delay:.1s] sm:text-[64px] lg:text-[80px]">
            {project.title}
          </h1>
          <span className="mt-6 inline-flex animate-rise rounded-full bg-lime px-4 py-2 font-mono text-[11px] tracking-[3px] text-forest uppercase [animation-delay:.2s]">
            {project.category} · {project.year}
          </span>
        </div>
        <div className="absolute inset-x-0 -bottom-px">
          <WaveDivider edge="bottom" fill="#F7F5F0" className="h-[60px] sm:h-[100px]" />
        </div>
      </section>

      {/* Fiche */}
      <section className="bg-linen">
        <div className="wrap grid gap-10 pt-10 pb-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <dl className="grid grid-cols-3 gap-4 self-start border-y border-bark/15 py-6">
            {meta.map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[11px] tracking-[3px] text-sage uppercase">{k}</dt>
                <dd className="mt-2 font-display text-[20px] font-semibold text-forest tabular-nums sm:text-[22px]">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
          <div>
            <p className="max-w-[56ch] text-[18px] leading-[1.7]">{detail.intro}</p>
            <h2 className="mt-8 font-mono text-[11px] tracking-[3px] text-sage uppercase">
              Type werk
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {detail.work.map((w) => (
                <li
                  key={w}
                  className="inline-flex items-center gap-2 rounded-full border border-forest/25 bg-white/60 px-4 py-2 text-[14px] font-medium text-forest"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-lime ring-2 ring-forest/20" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Galerij */}
      <section className="bg-linen pb-24">
        <div className="wrap">
          <Gallery photos={detail.photos} />
          <Link
            href={projectHref(next)}
            className="group mt-16 flex items-center justify-between gap-6 rounded-card bg-forest px-8 py-8 text-sand transition hover:bg-[#434f25] sm:px-12 sm:py-10"
          >
            <span>
              <span className="font-mono text-[11px] tracking-[3px] text-lime uppercase">
                Volgend project
              </span>
              <span className="mt-2 block font-display text-[28px] leading-none font-bold text-white sm:text-[40px]">
                {next.title}
              </span>
            </span>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-lime text-forest transition group-hover:translate-x-1">
              <Icon name="arrowRight" className="h-6 w-6" />
            </span>
          </Link>
        </div>
      </section>
      <CallToAction />
    </>
  );
}

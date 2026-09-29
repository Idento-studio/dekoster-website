import Link from "next/link";
import { projects, site, type ServicePageData } from "@/lib/content";
import { Foto } from "./Foto";
import { Icon } from "./Icon";
import { AllProjectsLink, ChallengeBand, SectionHead, PageHero } from "./PageParts";
import { ProjectCard } from "./ProjectCard";

/** Generieke dienstpagina (tuinaanleg, grondwerken, infra) — gestuurd door servicePages in content.ts */
export function ServicePage({ page }: { page: ServicePageData }) {
  const { hero, approach, expertise, expertiseTitle, category } = page;
  const related = projects.filter((p) => p.category === category);

  return (
    <>
      <PageHero {...hero} />

      {/* Onze aanpak */}
      <section className="bg-linen">
        <div className="wrap grid items-center gap-14 py-16 sm:py-24 lg:grid-cols-2">
          <div data-reveal>
            <span className="eyebrow">
              <Icon name="leaf" className="h-4 w-4" />
              Onze aanpak
            </span>
            <h2 className="mt-5 text-[34px] leading-[1.1] font-semibold text-forest sm:text-[42px]">
              {approach.title}
            </h2>
            <div className="mt-6 max-w-[54ch] space-y-4 text-[16px] leading-[1.7]">
              {approach.text.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            {approach.steps && (
              <ol className="mt-8 grid gap-3 sm:grid-cols-2">
                {approach.steps.map((s, i) => (
                  <li key={s} className="flex items-center gap-3 rounded-2xl bg-stone px-4 py-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-forest font-mono text-[12px] text-lime tabular-nums">
                      {i + 1}
                    </span>
                    <span className="font-display text-[16px] font-semibold text-forest">{s}</span>
                  </li>
                ))}
              </ol>
            )}
            {approach.quote && (
              <p className="mt-8 inline-block rotate-[-1.5deg] rounded-xl bg-lime px-5 py-3 font-display text-[20px] font-bold text-forest shadow-[0_12px_24px_-14px_rgba(26,26,20,.5)]">
                “{approach.quote}”
              </p>
            )}
          </div>
          <div
            data-reveal="1"
            className="relative mx-auto h-[420px] w-full max-w-[520px] sm:h-[480px] lg:order-first"
          >
            <Foto
              src={approach.images[0]}
              alt=""
              sizes="(min-width: 1024px) 420px, 80vw"
              className="absolute top-0 right-0 h-[78%] w-[80%] rounded-card object-cover shadow-[0_24px_50px_-24px_rgba(26,26,20,.55)]"
            />
            <Foto
              src={approach.images[1]}
              alt=""
              sizes="(min-width: 1024px) 300px, 56vw"
              className="absolute bottom-0 left-0 h-[48%] w-[56%] rounded-card border-[6px] border-linen object-cover shadow-[0_24px_50px_-24px_rgba(26,26,20,.55)]"
            />
            <span className="absolute right-[-6px] bottom-[40%] rounded-full bg-forest px-4 py-2 font-mono text-[11px] tracking-[3px] text-lime uppercase">
              {site.region}
            </span>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="bg-linen pb-20 sm:pb-24">
        <div className="wrap">
          <SectionHead eyebrow="Onze expertise" title={expertiseTitle} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((e, i) => (
              <article
                key={e.title}
                data-reveal={i % 3}
                className="group relative overflow-hidden rounded-card bg-stone p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(86,75,63,.45)]"
              >
                <span className="absolute top-5 right-5 font-mono text-[11px] tracking-[2px] text-bark/40 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-full bg-lime text-forest transition duration-300 group-hover:scale-110 group-hover:rotate-[-8deg]">
                  <Icon name={e.icon} />
                </span>
                <h3 className="mt-6 text-[21px] font-bold text-forest">{e.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6]">{e.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ChallengeBand />

      {/* Recente projecten */}
      <section className="bg-linen pt-14 pb-24">
        <div className="wrap">
          <SectionHead
            eyebrow="Realisaties"
            title={`Recente ${category.toLowerCase()}`}
            right={<AllProjectsLink />}
          />
          {related.length ? (
            <div className="mt-12 grid auto-rows-fr gap-10 md:grid-cols-3">
              {related.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          ) : (
            <div
              data-reveal
              className="mt-10 flex flex-col items-start gap-4 rounded-card border-2 border-dashed border-sage/50 p-10 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-display text-[22px] font-semibold text-forest">
                  Hier komen binnenkort onze {category.toLowerCase()}.
                </p>
                <p className="mt-1 text-[15px]">
                  We verzamelen de foto&apos;s van onze recentste werven. Benieuwd wat we al deden?
                  Vraag gerust referenties.
                </p>
              </div>
              <Link href="/contact/" className="btn-lime shrink-0">
                Vraag referenties
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

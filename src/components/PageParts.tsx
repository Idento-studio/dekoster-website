import Link from "next/link";
import { contact, OFFERTE } from "@/lib/content";
import { Foto } from "./Foto";
import { Icon } from "./Icon";
import { Parallax } from "./Parallax";
import { WaveDivider } from "./WaveDivider";

type PageHeroProps = {
  image: string;
  alt?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  actions?: boolean;
  /** kleur van de sectie eronder (voor de golfrand) */
  next?: string;
  compact?: boolean;
};

/** Hero voor subpagina's: foto met parallax, titel, lead, knoppen en golfrand. */
export function PageHero({
  image,
  alt = "",
  eyebrow,
  title,
  lead,
  actions = true,
  next = "#F7F5F0",
  compact = false,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-forest">
      <Parallax className="absolute inset-0 -z-10">
        <Foto src={image} alt={alt} priority className="h-full w-full object-cover" />
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/45 to-ink/10" />
      <div
        className={`wrap ${compact ? "pt-24 pb-32 sm:pt-28 sm:pb-40" : "pt-28 pb-40 sm:pt-40 sm:pb-52"}`}
      >
        {eyebrow && (
          <span className="inline-flex animate-rise rounded-full bg-lime px-4 py-2 font-mono text-[11px] tracking-[3px] text-forest uppercase">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-6 max-w-[760px] animate-rise text-[40px] leading-[1.03] font-semibold tracking-[-1.5px] text-white [animation-delay:.1s] sm:text-[56px] lg:text-[64px]">
          {title}
        </h1>
        {lead && (
          <p className="mt-6 max-w-[48ch] animate-rise text-[17px] leading-[1.7] text-white/90 [animation-delay:.2s]">
            {lead}
          </p>
        )}
        {actions && (
          <div className="mt-10 flex animate-rise flex-wrap gap-4 [animation-delay:.3s]">
            <Link href={OFFERTE} className="btn-lime">
              Gratis adviesgesprek
            </Link>
            <a href={`tel:${contact.tel}`} className="btn-ghost">
              Bel ons
            </a>
          </div>
        )}
      </div>
      <div className="absolute inset-x-0 -bottom-px">
        <WaveDivider edge="bottom" fill={next} className="h-[60px] sm:h-[100px]" />
      </div>
    </section>
  );
}

/** Kleine sectiekop: eyebrow + titel (+ optionele rechterkant). */
export function SectionHead({
  eyebrow,
  title,
  right,
  light = false,
}: {
  eyebrow: string;
  title: string;
  right?: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <span className={`eyebrow ${light ? "text-lime" : ""}`}>{eyebrow}</span>
        <h2
          className={`mt-4 text-[34px] leading-[1.1] font-semibold sm:text-[44px] ${light ? "text-white" : "text-forest"}`}
        >
          {title}
        </h2>
      </div>
      {right}
    </div>
  );
}

export function AllProjectsLink() {
  return (
    <Link
      href="/realisaties/"
      className="group inline-flex items-center gap-2 text-xs font-bold tracking-[4px] text-forest uppercase"
    >
      Bekijk alle projecten
      <span className="grid h-9 w-9 place-items-center rounded-full bg-lime transition group-hover:translate-x-1">
        <Icon name="arrowRight" className="h-4 w-4" />
      </span>
    </Link>
  );
}

/** Lime band: "Heb jij een uitdaging voor ons?" */
export function ChallengeBand() {
  return (
    <section className="bg-linen py-10">
      <div className="wrap">
        <div
          data-reveal
          className="relative flex flex-col items-start gap-6 overflow-hidden rounded-card bg-lime px-8 py-10 text-forest sm:flex-row sm:items-center sm:justify-between sm:px-12"
        >
          <svg
            viewBox="0 0 200 200"
            className="pointer-events-none absolute -top-16 -right-10 h-64 w-64 animate-[spin_40s_linear_infinite] text-forest/10"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M100 0c20 40 60 40 100 100-40 20-40 60-100 100C80 160 40 160 0 100 40 80 40 40 100 0Z"
            />
          </svg>
          <div className="relative">
            <h2 className="text-[26px] leading-tight font-bold sm:text-[32px]">
              Heb jij een uitdaging voor ons?
            </h2>
            <p className="mt-2 text-[16px] font-normal">
              Laat het ons vooral weten, want daar houden we van.
            </p>
          </div>
          <Link href="/contact/" className="relative btn bg-forest text-lime hover:bg-ink">
            Ik heb een uitdaging <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

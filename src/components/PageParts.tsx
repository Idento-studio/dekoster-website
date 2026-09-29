import Link from "next/link";
import { OFFERTE } from "@/lib/content";
import { Foto } from "./Foto";
import { Icon } from "./Icon";
import { WaveDivider } from "./WaveDivider";

/** Vaste mask voor de dienstfoto: afgeronde hoek als wegbocht. */
const HERO_MASK = "rounded-[28px_28px_28px_220px]";

/** Hero voor subpagina's: titel links, foto in een mask rechts, op sand met golfrand naar linen. */
export function PageHero({
  image,
  alt = "",
  eyebrow,
  title,
  lead,
  actions = true,
}: {
  image: string;
  alt?: string;
  eyebrow: string;
  title: string;
  lead: string;
  actions?: boolean;
}) {
  return (
    <section className="bg-sand">
      <div className="wrap grid items-center gap-10 pt-8 pb-10 sm:pt-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pb-12">
        <div>
          <span className="eyebrow animate-rise">{eyebrow}</span>
          <h1 className="mt-5 animate-rise text-[40px] leading-[1.03] font-semibold tracking-[-1.5px] text-forest [animation-delay:.1s] sm:text-[56px] lg:text-[64px]">
            {title}
          </h1>
          <p className="mt-6 max-w-[48ch] animate-rise text-[17px] leading-[1.7] [animation-delay:.2s]">
            {lead}
          </p>
          {actions && (
            <div className="mt-10 flex animate-rise flex-wrap gap-4 [animation-delay:.3s]">
              <Link href={OFFERTE} className="btn-lime">
                Gratis offerte aanvragen
              </Link>
              <Link href="/contact/" className="btn-outline">
                Contacteer ons
              </Link>
            </div>
          )}
        </div>
        <div
          className={`relative mx-auto aspect-[4/3] w-full max-w-[520px] animate-rise overflow-hidden bg-stone shadow-[0_24px_50px_-24px_rgba(26,26,20,.45)] [animation-delay:.15s] lg:aspect-auto lg:h-[380px] lg:max-w-none ${HERO_MASK}`}
        >
          <Foto
            src={image}
            alt={alt}
            priority
            sizes="(min-width: 1024px) 600px, 90vw"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="-mb-px">
        <WaveDivider edge="bottom" fill="#F7F5F0" className="h-[60px] sm:h-[100px]" />
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

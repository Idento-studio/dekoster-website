import Link from "next/link";
import { contact, OFFERTE, site } from "@/lib/content";
import { Icon } from "./Icon";
import { BackToTop } from "./BackToTop";
import { WaveDivider } from "./WaveDivider";

/** Afsluitende call-to-action boven de footer. */
export function CallToAction({ title }: { title?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-bark text-sand">
      <div className="absolute inset-x-0 -top-px">
        <WaveDivider edge="top" fill="#F7F5F0" className="h-[70px] sm:h-[110px]" />
      </div>
      <div className="relative wrap pt-32 pb-24 text-center" data-reveal>
        <h2 className="mx-auto max-w-[680px] text-[36px] leading-[1.05] font-semibold tracking-[-1px] text-sand sm:text-[52px]">
          {title ?? (
            <>
              Laat ons samen uw
              <br />
              tuin plannen.
            </>
          )}
        </h2>
        <p className="mx-auto mt-5 max-w-[44ch] text-[16px] leading-[1.7] text-sand/80">
          Ik kom graag langs voor een vrijblijvend gesprek en maak een offerte op maat.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href={OFFERTE} className="btn-lime">
            Gratis offerte
          </Link>
          <a href={`tel:${contact.tel}`} className="btn-ghost">
            Bel ons
          </a>
        </div>
      </div>
    </section>
  );
}

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-body text-xs font-bold tracking-[4px] text-lime uppercase">{title}</h2>
      <div className="mt-5 space-y-3 text-[15px]">{children}</div>
    </div>
  );
}

const footerLinks = [
  ["Home", "/"],
  ["Tuinaanleg", "/tuinaanleg/"],
  ["Grondwerken", "/grondwerken/"],
  ["Infra", "/infra/"],
  ["Realisaties", "/realisaties/"],
  ["Gratis offerte", OFFERTE],
] as const;

export function Footer() {
  return (
    <footer className="bg-bark text-sand/85">
      <div className="wrap grid gap-12 border-t border-white/10 pt-16 pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr_1fr]">
        <div>
          <p className="font-display text-[28px] font-bold text-sand">DE KOSTER</p>
          <p className="mt-2 font-mono text-[11px] tracking-[2px] text-sage uppercase">
            infra · grondwerken · tuinaanleg &amp; onderhoud
          </p>
          <p className="mt-5 max-w-[34ch] leading-[1.7]">
            {site.tagline} — al meer dan 25 jaar uw partner voor duurzame buitenruimtes.
          </p>
        </div>
        <Col title="Navigatie">
          {footerLinks.map(([label, href]) => (
            <Link key={href} href={href} className="block transition hover:text-lime">
              {label}
            </Link>
          ))}
        </Col>
        <Col title="Contact">
          <p className="flex gap-3">
            <Icon name="pin" className="h-5 w-5 shrink-0 text-lime" />
            {contact.address}
          </p>
          <p className="flex gap-3">
            <Icon name="phone" className="h-5 w-5 shrink-0 text-lime" />
            <a href={`tel:${contact.tel}`} className="hover:text-lime">
              {contact.phone}
            </a>
          </p>
          <p className="flex gap-3">
            <Icon name="mail" className="h-5 w-5 shrink-0 text-lime" />
            <a href={`mailto:${contact.email}`} className="hover:text-lime">
              {contact.email}
            </a>
          </p>
        </Col>
        <Col title="Openingsuren">
          {contact.hours.map(([d, h]) => (
            <p key={d} className="flex justify-between gap-4 tabular-nums">
              <span>{d}</span>
              <span className="text-sand">{h}</span>
            </p>
          ))}
        </Col>
      </div>
      <div className="wrap flex flex-wrap justify-between gap-3 border-t border-white/10 py-6 text-[13px] text-sand/60">
        <span>
          © {new Date().getFullYear()} {site.legalName}. Alle rechten voorbehouden.
        </span>
        {/* TODO (OPENSTAAND): privacy-, cookie- en voorwaardenpagina's */}
        <span>Privacy · Cookies · Algemene voorwaarden</span>
      </div>
      <BackToTop />
    </footer>
  );
}

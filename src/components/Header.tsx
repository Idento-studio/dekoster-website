"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, OFFERTE, site } from "@/lib/content";
import { useScrolled } from "@/lib/hooks";
import { Icon, Mark } from "./Icon";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-3 ${light ? "text-sand" : "text-forest"}`}
      aria-label={`${site.name} — home`}
    >
      <Mark className="h-9 w-auto sm:h-11" />
      <span className="leading-none">
        <span className="block font-display text-[22px] font-bold tracking-tight sm:text-[28px]">
          DE KOSTER
        </span>
        <span
          className={`mt-0.5 block text-[11px] sm:text-[12px] ${light ? "text-sand/80" : "text-bark"}`}
        >
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolled(30);
  const [open, setOpen] = useState(false);

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);


  return (
    <header
      className={`sticky top-0 z-50 bg-linen/95 backdrop-blur transition-all duration-300 ${scrolled ? "shadow-[0_6px_30px_-12px_rgba(77,90,43,.35)]" : ""}`}
    >
      <a
        href="#inhoud"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-forest"
      >
        Ga naar inhoud
      </a>
      <div
        className={`wrap flex items-center justify-between gap-6 transition-all duration-300 ${scrolled ? "h-[68px]" : "h-[88px]"}`}
      >
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Hoofdmenu">
          {nav.map((n) => {
            const current = isCurrent(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={current ? "page" : undefined}
                className={`group relative font-display text-[15px] font-medium ${current ? "text-forest" : "text-forest/80 hover:text-forest"}`}
              >
                {n.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-[2px] w-full origin-left rounded bg-lime transition-transform duration-300 group-hover:scale-x-100 ${current ? "scale-x-100" : "scale-x-0"}`}
                />
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full text-forest hover:bg-stone lg:hidden"
            aria-label="Menu openen"
            aria-expanded={open}
            aria-controls="mobiel-menu"
          >
            <Icon name="menu" />
          </button>
          <Link href={OFFERTE} className="btn-lime hidden sm:inline-flex">
            Gratis offerte
          </Link>
        </div>
      </div>

      {/* Mobiel menu */}
      <div
        id="mobiel-menu"
        className={`fixed inset-0 z-50 bg-forest text-sand transition-[clip-path] duration-500 lg:hidden ${open ? "[clip-path:circle(150%_at_90%_5%)]" : "pointer-events-none [clip-path:circle(0%_at_90%_5%)]"}`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="wrap flex h-[88px] items-center justify-between">
          <Logo light />
          <button
            onClick={() => setOpen(false)}
            className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/10"
            aria-label="Menu sluiten"
          >
            <Icon name="close" />
          </button>
        </div>
        <nav className="wrap mt-6 flex flex-col gap-2" aria-label="Mobiel menu">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-white/10 py-2 font-display text-4xl font-semibold transition hover:text-lime"
            >
              {n.label}
              <Icon name="arrow" className="h-6 w-6 opacity-60" />
            </Link>
          ))}
          <Link href={OFFERTE} className="mt-8 btn-lime self-start">
            Gratis offerte
          </Link>
        </nav>
      </div>
    </header>
  );
}

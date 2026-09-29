@AGENTS.md

# Project: De Koster — website

## Klant

Tuinaanneming De Koster (Jaro De Koster). Tuinaanleg & onderhoud, grondwerken en infra
in Gent en omstreken. Klein bedrijf, bewust persoonlijk: de klant werkt rechtstreeks met Jaro.
Doelpubliek: particulieren met een (nieuwe) tuin, villa's, en kleinere B2B/openbare projecten.

## Doel van de site

Vertrouwen wekken ("persoonlijk, vakkundig, 25+ jaar") en offerte-aanvragen binnenhalen via
de doorklikwizard op /offerte/. Die stuurt naar Formspree.

## Stack

- Next.js (App Router) + React + TypeScript + Tailwind v4 — **statische export** (`output: "export"`)
- Hosting: Vercel (security headers in vercel.json). Werkt ook op elke statische host.
- Geen next/image-optimalisatie: beelden vooraf naar WebP via `npm run images` (sharp).
- Fonts zelf gehost in src/fonts via next/font/local.
- Formulieren (contact en offerte): rechtstreeks naar Formspree (src/lib/submit.ts), honeypot + tijdsdrempel.
- Analytics (GA4) laadt enkel na toestemming via de cookiebanner (src/components/CookieConsent.tsx).

## Huisstijl (tokens in src/app/globals.css → @theme)

forest #4D5A2B · lime #E1E43B · bark #564B3F · sage #989F80 · sand #F4E8CC · linen #F7F5F0 · stone #EDEAE4 · ink #1A1A14
Titels: Outfit · Body: Work Sans 300 · Labels: Geist Mono (caps, ruime letterspatie)
Pill-knoppen lime/forest, kaarten radius 20px, golfovergangen tussen secties (WaveDivider).
Tone of voice op de site: warm, vakkundig, "u" naar de bezoeker, "ik" vanuit Jaro.

## Structuur

/ · /tuinaanleg/ · /grondwerken/ · /infra/ · /realisaties/ · /realisaties/[slug]/ · /contact/ · /offerte/

- Alle teksten en data: src/lib/content.ts (dienstpagina's = servicePages, projecten = projects)
- Nieuw project: voeg een item toe aan `projects` met een `detail`-blok → pagina wordt automatisch gegenereerd
- Nieuwe foto: in assets/originals zetten → `npm run images` → gebruiken met `<Foto src="naam" />`

## Afspraken

- Mobile-first, altijd checken op 375 px, 834 px en 1440 px
- `"use client"` enkel voor interactieve componenten; de rest blijft server-HTML
- Respecteer `prefers-reduced-motion` bij elke animatie
- reference/ = goedgekeurde prototypes, niet wijzigen
- Openstaande punten: OPENSTAAND.md. Livegang: launch-checklist uit het Idento-project.
- Commits klein en beschrijvend (feat:, fix:, chore:, docs:)

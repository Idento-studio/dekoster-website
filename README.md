# De Koster — website

Website voor Tuinaanneming De Koster. Next.js (App Router), React, TypeScript en Tailwind v4,
gebouwd als statische export. Ontwerp en bouw: Idento.

## Starten

```bash
nvm use            # Node 22 (zie .nvmrc)
npm install
cp .env.example .env.local   # webhook-URL's invullen
npm run dev        # http://localhost:3000
```

## Scripts

| Script                            | Wat het doet                                                           |
| --------------------------------- | ---------------------------------------------------------------------- |
| `npm run dev`                     | Ontwikkelserver                                                        |
| `npm run build`                   | Statische export naar `./out`                                          |
| `npm run start`                   | `./out` lokaal serveren                                                |
| `npm run lint`                    | ESLint                                                                 |
| `npm run typecheck`               | Route-types genereren + TypeScript                                     |
| `npm run format` / `format:check` | Prettier (met Tailwind-klassensortering)                               |
| `npm run images`                  | `assets/originals` → WebP in meerdere breedtes + `src/lib/images.json` |

## Mappen

```
src/app/            routes (page.tsx per pagina), layout, sitemap, robots, 404, icoon
src/components/     secties en UI (home/ = homepage-secties)
src/lib/content.ts  alle teksten, links en data op één plek
src/lib/submit.ts   formulieren → Formspree (honeypot + tijdsdrempel, bijlagen als multipart)
src/fonts/          zelf gehoste fonts (SIL OFL)
assets/originals/   bronbeelden (shoot Gaspard Modest)
public/images/      gegenereerde WebP-beelden
reference/          goedgekeurde prototypes (visuele waarheid)
```

## Deploy

Vercel: importeer de repo, framework "Next.js", geen extra instellingen nodig.
Zet zo nodig `NEXT_PUBLIC_SITE_URL` onder Settings → Environment Variables. Elke pull request krijgt een eigen preview-link.

## Keuzes

**Statische export.** Geen server nodig, snel, goedkoop, en dezelfde werkwijze als de andere
Idento-sites. Gevolg: formulieren posten vanuit de browser naar Formspree (het endpoint is publiek), dus
staat de spambescherming aan (honeypot-veld `website`, tijdsdrempel, Formspree-filters).

**`<img>` via `Foto.tsx` in plaats van `next/image`.** De image-API staat uit bij een statische
export; de beelden zijn vooraf geoptimaliseerd met `srcSet` en `sizes`.

**Geen animatiebibliotheek.** Golven, tilt, parallax en reveal zijn kleine eigen hooks met
`requestAnimationFrame` en `IntersectionObserver`, allemaal met `prefers-reduced-motion`.

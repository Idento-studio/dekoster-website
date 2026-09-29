/**
 * Alle teksten, links en data op één plek.
 * Bron: huidige dekoster.be, licht herschreven. Placeholders staan in OPENSTAAND.md.
 */
import type { IconName } from "@/components/Icon";

export const site = {
  name: "De Koster",
  legalName: "Tuinaanneming De Koster",
  tagline: "Vakmanschap in groen",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dekoster.be",
  description:
    "Tuinaanleg, grondwerken en infra in Gent en omstreken. Eén vast aanspreekpunt, van eerste schets tot seizoensonderhoud.",
  region: "Gent en omstreken",
  since: "25+",
};

// TODO (OPENSTAAND): live footer en live contactpagina tonen verschillende gegevens — bevestigen bij Jaro.
export const contact = {
  street: "Industrieweg 12",
  postalCode: "1500",
  city: "Halle",
  address: "Industrieweg 12, 1500 Halle",
  phone: "+32 2 345 67 89",
  tel: "+3223456789",
  email: "info@dekoster.be",
  hours: [
    ["Ma — Vr", "07:00 — 17:00"],
    ["Za", "08:00 — 12:00"],
    ["Zo", "Gesloten"],
  ] as const,
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Tuinaanleg", href: "/tuinaanleg/" },
  { label: "Grondwerken", href: "/grondwerken/" },
  { label: "Infra", href: "/infra/" },
  { label: "Realisaties", href: "/realisaties/" },
  { label: "Contact", href: "/contact/" },
] as const;

export const OFFERTE = "/offerte/";

/* ---------------- Homepage ---------------- */

export const homeServices: {
  key: string;
  title: string;
  text: string;
  icon: IconName;
  img: string;
  href: string;
}[] = [
  {
    key: "grondwerken",
    title: "Grondwerken",
    text: "Graafwerken, nivellering en drainage.",
    icon: "shovel",
    img: "grondwerken",
    href: "/grondwerken/",
  },
  {
    key: "infra",
    title: "Infra",
    text: "Opritten en terrassen in natuursteen.",
    icon: "stones",
    img: "infra",
    href: "/infra/",
  },
  {
    key: "totaal",
    title: "Totaalprojecten",
    text: "Grote projecten met betrouwbare partners.",
    icon: "handshake",
    img: "totaal",
    href: "/contact/",
  },
];

/* ---------------- Projecten ---------------- */

export type Category = "Tuinaanleg" | "Infra" | "Grondwerken";

export type Project = {
  slug: string;
  title: string;
  category: Category;
  year: number;
  location: string;
  img: string;
  /** Detailpagina beschikbaar? */
  detail?: {
    intro: string;
    work: string[];
    cover: string;
    photos: { src: string; alt: string; size?: "wide" | "tall" }[];
  };
};

export const projects: Project[] = [
  {
    slug: "totaaltuin-gent",
    title: "Totaaltuin Gent",
    category: "Tuinaanleg",
    year: 2026,
    location: "Gent",
    img: "haag-rug",
    // VOORBEELDINHOUD — titel, jaar en omschrijving bevestigen bij Jaro.
    detail: {
      intro:
        "Een verwilderde tuin achter een hoeve, in twee dagen weer strak. We snoeiden de beukenhaag op hoogte, maaiden en trimden het gazon en werkten de randen langs het pad netjes af.",
      work: ["Haag gesnoeid", "Gazon gemaaid", "Boorden getrimd", "Beplanting aangevuld"],
      cover: "haag-groot",
      photos: [
        { src: "haag-rug", alt: "Jaro snoeit de hoge beukenhaag", size: "tall" },
        {
          src: "duo-maaier",
          alt: "Het team maakt de grasmaaier klaar bij de aanhangwagen",
          size: "wide",
        },
        { src: "maaien", alt: "Het gazon wordt gemaaid" },
        { src: "trimmen", alt: "Hoog gras trimmen langs de schuur" },
        { src: "boorden", alt: "Boorden trimmen langs het pad", size: "wide" },
        { src: "snoei", alt: "Laurierhaag bijwerken met de telescopische heggenschaar" },
        { src: "aanleg", alt: "Potgrond aanvoeren voor de beplanting" },
        { src: "gazon", alt: "Grasmaaier klaarmaken", size: "wide" },
      ],
    },
  },
  // TODO (OPENSTAAND): stockfoto's — echte beelden en details aanleveren.
  {
    slug: "villatuin-dworp",
    title: "Villatuin Dworp",
    category: "Tuinaanleg",
    year: 2026,
    location: "Dworp",
    img: "terras",
  },
  {
    slug: "totaaltuin-halle",
    title: "Totaaltuin Halle",
    category: "Tuinaanleg",
    year: 2026,
    location: "Halle",
    img: "woning",
  },
];

export const projectHref = (p: Project) => (p.detail ? `/realisaties/${p.slug}/` : "/realisaties/");

/* ---------------- Dienstpagina's ---------------- */

export type ServicePageData = {
  slug: "tuinaanleg" | "grondwerken" | "infra";
  nav: string;
  category: Category;
  meta: { title: string; description: string };
  hero: { image: string; alt: string; eyebrow: string; title: string; lead: string };
  approach: {
    title: string;
    text: string[];
    images: [string, string];
    steps?: string[];
    quote?: string;
  };
  expertiseTitle: string;
  expertise: { icon: IconName; title: string; text: string }[];
  cta: string;
};

export const servicePages: Record<ServicePageData["slug"], ServicePageData> = {
  tuinaanleg: {
    slug: "tuinaanleg",
    nav: "Tuinaanleg",
    category: "Tuinaanleg",
    meta: {
      title: "Tuinaanleg en onderhoud in Gent",
      description:
        "Persoonlijk getekende tuinen, aanleg en seizoensonderhoud. Eén aanspreekpunt van eerste schets tot snoeiwerk.",
    },
    hero: {
      image: "haag-groot",
      alt: "Jaro snoeit een beukenhaag",
      eyebrow: "Tuinaanleg & onderhoud",
      title: "Uw tuin, in vertrouwde handen.",
      lead: "Van eerste schets tot seizoensgebonden onderhoud. Ik teken, coördineer en realiseer uw project persoonlijk.",
    },
    approach: {
      title: "Persoonlijk getekend en aangelegd.",
      text: [
        "Elke tuin begint met een goed gesprek. Ik luister naar uw wensen, bekijk de mogelijkheden ter plaatse en maak een persoonlijke tuintekening. Geen standaardplannen: alles wordt op maat uitgewerkt.",
        "Van de eerste spadesteek tot het seizoensonderhoud heeft u één aanspreekpunt voor uw volledige tuin.",
      ],
      images: ["maaien", "aanleg"],
      steps: ["Gesprek ter plaatse", "Tuintekening op maat", "Aanleg", "Onderhoud per seizoen"],
    },
    expertiseTitle: "Alles voor uw tuin",
    expertise: [
      {
        icon: "grass",
        title: "Natuurgras",
        text: "Aanleg en herstel van een gezond, groen gazon.",
      },
      {
        icon: "calendar",
        title: "Tuinonderhoud",
        text: "Seizoensgebonden beheer, zodat uw tuin er altijd verzorgd bij ligt.",
      },
      {
        icon: "sprout",
        title: "Beplanting",
        text: "Doordachte beplanting, afgestemd op bodem, klimaat en smaak.",
      },
      {
        icon: "park",
        title: "Openbaar groen",
        text: "Professioneel onderhoud van publieke groenzones.",
      },
      {
        icon: "stones",
        title: "Terrassen",
        text: "Duurzame terrassen in natuursteen, keramiek of hout.",
      },
      { icon: "drop", title: "Tuinvijvers", text: "Aanleg van sier- en zwemvijvers op maat." },
      {
        icon: "house",
        title: "Tuinhuizen",
        text: "Plaatsing van tuinhuizen, carports en overkappingen.",
      },
      {
        icon: "tree",
        title: "Boomverzorging",
        text: "Deskundige verzorging, snoei en onderhoud van bomen.",
      },
      {
        icon: "scissors",
        title: "Snoeiwerken",
        text: "Hagen, struiken en sierbomen vakkundig in vorm.",
      },
    ],
    cta: "Laat ons samen uw droomtuin realiseren.",
  },
  grondwerken: {
    slug: "grondwerken",
    nav: "Grondwerken",
    category: "Grondwerken",
    meta: {
      title: "Grondwerken en drainage in Gent",
      description:
        "Afgraven, nivelleren, drainage, grondtransport en GPS-gestuurd graven. Wij leggen het fundament.",
    },
    hero: {
      image: "grondwerken-groot",
      alt: "Jaro draagt een drainagebuis over het terrein",
      eyebrow: "Grondwerken",
      title: "Energie, precisie en kracht.",
      lead: "Wij leggen het fundament waarop alles verder bouwt.",
    },
    approach: {
      title: "De kracht achter elk project.",
      text: [
        "Grondverzet is meer dan graven. Het is de basis van elke geslaagde buitenruimte.",
        "Met moderne machines en jarenlange ervaring zorgen we voor een perfecte ondergrond: nauwkeurig op hoogte, correct gedraineerd en klaar voor de volgende fase.",
      ],
      images: ["grondwerken", "totaal"],
      quote: "Wie een put graaft voor een ander, is goed bezig.",
    },
    expertiseTitle: "Onze expertise",
    expertise: [
      {
        icon: "layers",
        title: "Afgraven & nivelleren",
        text: "Terreinen op de juiste hoogte, met centimeterprecisie.",
      },
      {
        icon: "pipe",
        title: "Drainage & riolering",
        text: "Drainage, riolering en regenwateropvang volgens de geldende normen.",
      },
      {
        icon: "truck",
        title: "Grondtransport",
        text: "Efficiënt transport van grond, alle logistiek inbegrepen.",
      },
      {
        icon: "truck",
        title: "Grondafvoer",
        text: "Afvoer van grondoverschotten, inclusief storten en recyclage.",
      },
      {
        icon: "layers",
        title: "Ophogingen & aanvullingen",
        text: "Ophogen met gecertificeerde materialen en correcte verdichting.",
      },
      {
        icon: "drop",
        title: "Bodemsaneringen",
        text: "Verontreinigde grond saneren met professionele technieken.",
      },
      {
        icon: "stones",
        title: "Bodemstabilisatie",
        text: "Instabiele bodems stabiliseren voor een stevige basis.",
      },
      {
        icon: "target",
        title: "GPS-gestuurd graven",
        text: "Graafmachines met GPS-sturing: sneller en nauwkeuriger.",
      },
    ],
    cta: "Klaar om te starten met graven?",
  },
  infra: {
    slug: "infra",
    nav: "Infra",
    category: "Infra",
    meta: {
      title: "Infrastructuur, opritten en verhardingen",
      description:
        "Wegenwerken, opritten, boordstenen, funderingen en omgevingsaanleg. Een solide basis, vakkundig uitgevoerd.",
    },
    hero: {
      image: "infra-groot",
      alt: "Jaro zaagt een natuursteen op maat",
      eyebrow: "Infrastructuur",
      title: "Een solide basis, vakkundig uitgevoerd.",
      lead: "Wegenwerken, verhardingen, funderingen en omgevingsaanleg. Stabiliteit en structuur als basis van elk project.",
    },
    approach: {
      title: "Gebouwd om generaties mee te gaan.",
      text: [
        "Elk bouw- of tuinproject begint met een stevige ondergrond. Wij verzorgen alle infrastructuurwerken, van funderingen en verhardingen tot volledige omgevingsaanleg.",
        "Degelijk vakmanschap, correcte uitvoering en een resultaat dat blijft liggen.",
      ],
      images: ["infra", "boorden"],
    },
    expertiseTitle: "Wat we realiseren",
    expertise: [
      { icon: "road", title: "Wegenwerken", text: "Aanleg en herstel van wegen en rijbanen." },
      {
        icon: "building",
        title: "Betoneringswerken",
        text: "Betonstorten, vloerplaten en constructieve elementen.",
      },
      {
        icon: "truck",
        title: "Opritten en parkings",
        text: "Duurzame opritten en parkeerplaatsen op maat.",
      },
      {
        icon: "stones",
        title: "Boordstenen & klinkers",
        text: "Plaatsing van boordstenen, klinkers en bestrating.",
      },
      {
        icon: "bolt",
        title: "Nutsvoorzieningen",
        text: "Voorbereidende werken voor water, gas en elektriciteit.",
      },
      {
        icon: "layers",
        title: "Funderingen",
        text: "Solide funderingen als basis voor elke verharding.",
      },
      { icon: "road", title: "Wandelpaden", text: "Paden en toegangswegen in diverse materialen." },
      {
        icon: "building",
        title: "Omgevingsaanleg",
        text: "Volledige omgevingswerken rond gebouwen en sites.",
      },
    ],
    cta: "Een stevige basis voor uw project.",
  },
};

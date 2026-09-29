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
  /** Gemeenten waar we werken (structured data). */
  areas: [
    "Gent",
    "Gentbrugge",
    "Destelbergen",
    "Drongen",
    "Evergem",
    "Nazareth",
    "Eeklo",
    "Waarschoot",
  ],
  gaId: "G-M5D8X2RHFH",
  instagram: "https://www.instagram.com/dekoster.be/",
};

export const contact = {
  street: "Molenstraat 226 bus 101",
  postalCode: "9900",
  city: "Eeklo",
  address: "Molenstraat 226 bus 101, 9900 Eeklo",
  phone: "0491 59 30 26",
  tel: "+32491593026",
  email: "contact@dekoster.be",
  hours: [
    ["Ma tot Za", "09:00 tot 17:00"],
    ["Zo", "Gesloten, niet bereikbaar"],
  ] as const,
};

export const company = {
  enterpriseNumber: "0801.204.162",
  vat: "BE0801.204.162",
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
    slug: "hoektuin-met-afsluiting-eeklo",
    title: "Hoektuin met afsluiting, Eeklo",
    category: "Tuinaanleg",
    year: 2026,
    location: "Eeklo",
    img: "hoektuin-met-afsluiting-eeklo-075",
    detail: {
      intro:
        "Een nieuwbouwwoning op een hoek kreeg een volledig nieuwe buitenruimte, netjes afgebakend langs de straat. Wij plaatsten de afsluiting, goten de betonnen randen en verzorgden de grondwerken voor de tuin.",
      work: [
        "Gaten boren en de stalen palen van de afsluiting plaatsen langs de gebogen straatkant",
        "Betonstroken gieten en afwerken met plaat en waterpas",
        "Terras aanleggen op een funderingslaag met folie",
        "Regenput en controleputten inmetselen en afwerken",
        "Houten poort plaatsen als toegang tot de tuin",
      ],
      cover: "hoektuin-met-afsluiting-eeklo-075",
      photos: [
        {
          src: "hoektuin-met-afsluiting-eeklo-001",
          alt: "Bestaande verharding open gebroken aan de rand van de straat",
        },
        {
          src: "hoektuin-met-afsluiting-eeklo-003",
          alt: "Gaten voor de palen van de afsluiting langs de rand",
        },
        {
          src: "hoektuin-met-afsluiting-eeklo-006",
          alt: "Antracieten palen en boorden langs de gebogen straatkant",
          size: "tall",
        },
        {
          src: "hoektuin-met-afsluiting-eeklo-018",
          alt: "Groen scherm met logo tijdens de werken aan de afsluiting",
          size: "wide",
        },
        {
          src: "hoektuin-met-afsluiting-eeklo-033",
          alt: "Gebogen afsluiting met werfmateriaal naast de gevel",
        },
        {
          src: "hoektuin-met-afsluiting-eeklo-040",
          alt: "Afgebakende tuinzone met grond naast het houten gevelpaneel",
        },
        {
          src: "hoektuin-met-afsluiting-eeklo-065",
          alt: "Pas gegoten betonstrook langs een paal",
          size: "tall",
        },
        {
          src: "hoektuin-met-afsluiting-eeklo-063",
          alt: "Terrasplaat gegoten op folie tegen de scheidingsmuur",
        },
        {
          src: "hoektuin-met-afsluiting-eeklo-074",
          alt: "Regenput met afgewerkte rand en metselwerk voor de controleputten",
        },
        {
          src: "hoektuin-met-afsluiting-eeklo-079",
          alt: "Afgevlakte zandgrond met controleputten in de tuin",
        },
        {
          src: "hoektuin-met-afsluiting-eeklo-080",
          alt: "Nieuwe houten poort in de afsluiting",
          size: "tall",
        },
      ],
    },
  },
  {
    slug: "stadstuin-nieuw-gent-tuinhuis-pergola",
    title: "Stadstuin met tuinhuis en pergola, Nieuw-Gent",
    category: "Tuinaanleg",
    year: 2026,
    location: "Gent",
    img: "stadstuin-nieuw-gent-tuinhuis-pergola-016",
    detail: {
      intro:
        "In een groene stadstuin naast een appartementsgebouw bouwden wij een houten tuinhuis met pergola, met een zitplek op grind en een frisse grasmat. Zo ontstaat een rustig hoekje tussen het groen.",
      work: [
        "Funderingsblokken en betonplaat leggen voor het tuinhuis",
        "Massieve houten palen plaatsen en de pergola opbouwen",
        "Houten skelet en gevelbekleding met horizontale latten plaatsen",
        "Grindzone aanleggen als zitplek onder de pergola",
        "Terrein egaliseren en gras leggen",
      ],
      cover: "stadstuin-nieuw-gent-tuinhuis-pergola-016",
      photos: [
        {
          src: "stadstuin-nieuw-gent-tuinhuis-pergola-018",
          alt: "Betonnen funderingsblokken als basis voor het tuinhuis",
        },
        {
          src: "stadstuin-nieuw-gent-tuinhuis-pergola-021",
          alt: "Eerste houten palen op stalen voeten naast de fundering",
          size: "tall",
        },
        {
          src: "stadstuin-nieuw-gent-tuinhuis-pergola-025",
          alt: "Houten skelet van het tuinhuis onder de pergolabalken",
          size: "wide",
        },
        {
          src: "stadstuin-nieuw-gent-tuinhuis-pergola-029",
          alt: "Tuinhuis in opbouw met ladder en pergoladak",
        },
        {
          src: "stadstuin-nieuw-gent-tuinhuis-pergola-032",
          alt: "Tuinhuis met groene waterkering voor de bekleding",
        },
        {
          src: "stadstuin-nieuw-gent-tuinhuis-pergola-033",
          alt: "Overzicht van de werf met tuinhuis en pergola in het groen",
          size: "wide",
        },
        {
          src: "stadstuin-nieuw-gent-tuinhuis-pergola-006",
          alt: "Afgewerkt tuinhuis met kale zandvlakte voor de gebouwen",
        },
        {
          src: "stadstuin-nieuw-gent-tuinhuis-pergola-010",
          alt: "Houten tuinhuis met pergola aan de rand van het bos",
        },
        {
          src: "stadstuin-nieuw-gent-tuinhuis-pergola-003",
          alt: "Tuinhuis met latbekleding en pergola langs het gras",
        },
        {
          src: "stadstuin-nieuw-gent-tuinhuis-pergola-001",
          alt: "Pergola in warm licht met zicht op het tuinhuis",
        },
        {
          src: "stadstuin-nieuw-gent-tuinhuis-pergola-012",
          alt: "Pergola met ligbedden op het pas gelegde gras",
          size: "tall",
        },
      ],
    },
  },
  {
    slug: "villatuin-destelbergen",
    title: "Villatuin in Destelbergen",
    category: "Tuinaanleg",
    year: 2026,
    location: "Destelbergen",
    img: "villatuin-destelbergen-002",
    detail: {
      intro:
        "Rond een moderne villa in het bos legden we een volledige tuin aan, in opdracht van Tree Invest. Kasseipaden, gemengde borders, een groot gazon en verlichting geven de tuin rust en karakter. Van eerste grondwerk tot afgewerkte beplanting volgden we het hele proces.",
      work: [
        "Grondwerk, drainage- en leidingsleuven en het vlak leggen van het terrein",
        "Kasseipaden met golvende lijnen aangelegd",
        "Borders beplant met heesters, vaste planten en druppelirrigatie",
        "Haagbeuken op stam en volwassen bomen geplant",
        "Gazon aangelegd en tuinverlichting geplaatst",
      ],
      cover: "villatuin-destelbergen-002",
      photos: [
        {
          src: "villatuin-destelbergen-004",
          alt: "Open, vlak gemaakt terrein met het tuinhuis op de achtergrond",
          size: "wide",
        },
        {
          src: "villatuin-destelbergen-007",
          alt: "Kasseipad langs de gevel met eerste beplanting",
        },
        {
          src: "villatuin-destelbergen-010",
          alt: "Rij bomen op stam langs de haag, grond klaar voor beplanting",
          size: "tall",
        },
        {
          src: "villatuin-destelbergen-013",
          alt: "Rododendrons langs het golvende kasseipad",
        },
        {
          src: "villatuin-destelbergen-031",
          alt: "Minilader op rijplaten tussen de nieuwe borders",
          size: "wide",
        },
        {
          src: "villatuin-destelbergen-020",
          alt: "Nieuwe border met druppelirrigatie naast het kasseipad",
        },
        {
          src: "villatuin-destelbergen-023",
          alt: "Verlichte meerstammige boom aan de gevel bij avond",
          size: "tall",
        },
        {
          src: "villatuin-destelbergen-039",
          alt: "Voorbereide grond voor het gazon met de afgewerkte tuin erachter",
          size: "wide",
        },
        {
          src: "villatuin-destelbergen-046",
          alt: "Leidingsleuf met folie en rode buizen in de tuin",
        },
        {
          src: "villatuin-destelbergen-049",
          alt: "Nieuw padenplan met folie en steenslag",
        },
        {
          src: "villatuin-destelbergen-053",
          alt: "Smal pad met doek en rode markering, zicht naar het tuinhuis",
          size: "tall",
        },
        {
          src: "villatuin-destelbergen-001",
          alt: "Groen gazon met beplanting in het bos",
        },
      ],
    },
  },
  {
    slug: "tuinrenovatie-nieuw-gazon-eeklo",
    title: "Tuinrenovatie met nieuw gazon, Eeklo",
    category: "Tuinaanleg",
    year: 2026,
    location: "Eeklo",
    img: "tuinrenovatie-nieuw-gazon-eeklo-033",
    detail: {
      intro:
        "Een ruime achtertuin met hoge haag en oude beplanting werd volledig heraangelegd. Wij ruimden op, egaliseerden het terrein en bereidden alles voor op een nieuwe grasmat.",
      work: [
        "Snoeiwerk en rooien van overtollig groen",
        "Oude beplanting en snoeihout afvoeren",
        "Terrein afgraven en grof egaliseren",
        "Fijn afwerken van de grond en zaaiklaar maken",
        "Grasperk inzaaien en van beregening voorzien",
      ],
      cover: "tuinrenovatie-nieuw-gazon-eeklo-033",
      photos: [
        {
          src: "tuinrenovatie-nieuw-gazon-eeklo-011",
          alt: "Oorspronkelijke tuin met gazon, haag en achterliggende woning",
          size: "wide",
        },
        {
          src: "tuinrenovatie-nieuw-gazon-eeklo-005",
          alt: "Tuin bij het begin van de werken met haag en groen hekwerk",
        },
        {
          src: "tuinrenovatie-nieuw-gazon-eeklo-015",
          alt: "Zijde van de tuin met hoge haag en groen gaashekwerk",
        },
        {
          src: "tuinrenovatie-nieuw-gazon-eeklo-012",
          alt: "Snoeiafval en gesnoeide bomen in de tuin",
        },
        {
          src: "tuinrenovatie-nieuw-gazon-eeklo-022",
          alt: "Opgeruimde tuin met snoeihout op een stapel",
          size: "tall",
        },
        {
          src: "tuinrenovatie-nieuw-gazon-eeklo-024",
          alt: "Afgegraven grond langs de muur in de tuin",
        },
        {
          src: "tuinrenovatie-nieuw-gazon-eeklo-026",
          alt: "Geëgaliseerd terrein achter de woning",
        },
        {
          src: "tuinrenovatie-nieuw-gazon-eeklo-029",
          alt: "Vlakke, donkere grond met tuinberging op de achtergrond",
        },
        {
          src: "tuinrenovatie-nieuw-gazon-eeklo-031",
          alt: "Afgewerkte grond bij de oude boom en het terras",
        },
        {
          src: "tuinrenovatie-nieuw-gazon-eeklo-035",
          alt: "Ingezaaid grasperk met zicht vanaf het terras",
          size: "wide",
        },
      ],
    },
  },
  {
    slug: "tuinaanleg-nazareth",
    title: "Stadstuin in Nazareth",
    category: "Tuinaanleg",
    year: 2026,
    location: "Nazareth",
    img: "tuinaanleg-nazareth-018",
    detail: {
      intro:
        "Een kale, zanderige achtertuin werd bij ons een frisse, rustige familietuin. We plantten bomen en borders langs de houten schermen en legden een vlakke grasmat aan. Zo heeft het gezin nu een tuin waar de kinderen kunnen spelen en de zon kan binnenvallen.",
      work: [
        "Grond geëgaliseerd en bewerkt met de frees",
        "Borders afgeboord met stalen kantopsluiting",
        "Hoogstammige bomen en een fruitboom geplant met steunpalen",
        "Beplanting in de borders langs de schuttingen",
        "Graszoden gelegd en de tuin aangesloten op beregening",
      ],
      cover: "tuinaanleg-nazareth-018",
      photos: [
        {
          src: "tuinaanleg-nazareth-001",
          alt: "De kale achtertuin met zand en jonge bomen bij de start",
          size: "wide",
        },
        {
          src: "tuinaanleg-nazareth-004",
          alt: "Grond bewerkt met de frees naast de nieuwe border",
        },
        {
          src: "tuinaanleg-nazareth-007",
          alt: "Vlakke zandgrond met eerste beplanting en de tuinberging",
        },
        {
          src: "tuinaanleg-nazareth-010",
          alt: "Jonge boom en beplanting voor het huis",
        },
        {
          src: "tuinaanleg-nazareth-014",
          alt: "Eerste graszoden aan de terraszijde, de rest nog zand",
          size: "wide",
        },
        {
          src: "tuinaanleg-nazareth-017",
          alt: "Graszoden in de maak langs de border",
          size: "tall",
        },
        {
          src: "tuinaanleg-nazareth-012",
          alt: "Zicht naar de tuinberging met opgekuiste grond en border",
        },
      ],
    },
  },
  {
    slug: "grondwerken-en-terras-drongen",
    title: "Grondwerken en terras Drongen",
    category: "Grondwerken",
    year: 2026,
    location: "Drongen",
    img: "grondwerken-en-terras-drongen-013",
    detail: {
      intro:
        "Voor een villa in Drongen voerden we in opdracht van Tree Invest de grondwerken uit en legden we een terras van natuursteen aan. Zo groeide een braakliggend stuk grond uit tot een tuin met vuurplaats, borders en een royaal terras.",
      work: [
        "Afgraven, zeven en herprofileren van de grond",
        "Plaatsen van betonnen boordstenen voor het terras",
        "Leggen van een terras in natuursteen",
        "Aanleggen van borders met mulch en beplanting",
        "Afwerken met een grindzone en vuurplaats",
      ],
      cover: "grondwerken-en-terras-drongen-013",
      photos: [
        {
          src: "grondwerken-en-terras-drongen-025",
          alt: "Grondberg en minigraver op het open terrein voor de villa",
          size: "wide",
        },
        {
          src: "grondwerken-en-terras-drongen-027",
          alt: "Minigraver en zeefmachine bij een grondberg",
        },
        {
          src: "grondwerken-en-terras-drongen-032",
          alt: "Betonnen boordstenen voor het terras aan de villa",
        },
        {
          src: "grondwerken-en-terras-drongen-042",
          alt: "Natuursteen terras in aanleg langs de glazen gevel",
          size: "tall",
        },
        {
          src: "grondwerken-en-terras-drongen-045",
          alt: "Terras van natuursteen in aanleg voor de villa",
          size: "wide",
        },
        {
          src: "grondwerken-en-terras-drongen-011",
          alt: "Bloemenborder met sierbomen naast het terras",
        },
        {
          src: "grondwerken-en-terras-drongen-016",
          alt: "Cortenstalen plantenbakken met planten naast een grasperk",
        },
        {
          src: "grondwerken-en-terras-drongen-018",
          alt: "Natuursteen terras langs borders en gazon",
          size: "tall",
        },
        {
          src: "grondwerken-en-terras-drongen-050",
          alt: "Golvende border met jonge planten langs het terras",
        },
        {
          src: "grondwerken-en-terras-drongen-053",
          alt: "Terras met cortenbakken langs de gevel van de villa",
        },
        {
          src: "grondwerken-en-terras-drongen-056",
          alt: "Border met mulch en jonge bomen naast het gazon",
        },
      ],
    },
  },
  {
    slug: "grondwerken-en-riolering-drongen",
    title: "Grondwerken en riolering Drongen",
    category: "Grondwerken",
    year: 2026,
    location: "Drongen",
    img: "grondwerken-en-riolering-drongen-044",
    detail: {
      intro:
        "Bij een moderne woning in Drongen voerden we grondwerken en rioleringswerken uit voor opdrachtgever Tree Invest. We legden leidingen en rioolstelsels aan, groeven een grote put voor de tuin en plantten een grote boom.",
      work: [
        "Graven van sleuven voor leidingen en kabelbuizen",
        "Leggen van rioleringsleidingen met controle van het afschot",
        "Plaatsen van inspectieputten en aansluitingen",
        "Uitgraven van een grote put voor de tuininrichting",
        "Planten van een grote boom met wortelkluit",
      ],
      cover: "grondwerken-en-riolering-drongen-044",
      photos: [
        {
          src: "grondwerken-en-riolering-drongen-005",
          alt: "Sleuf met rode kabelbuizen naast de woning",
        },
        {
          src: "grondwerken-en-riolering-drongen-025",
          alt: "Werfzone voor de woning met verharding en minigraver",
          size: "wide",
        },
        {
          src: "grondwerken-en-riolering-drongen-028",
          alt: "Minigraafmachine aan de voorzijde van de woning",
        },
        {
          src: "grondwerken-en-riolering-drongen-036",
          alt: "Rioleringsbuis met waterpas gecontroleerd in de sleuf",
        },
        {
          src: "grondwerken-en-riolering-drongen-038",
          alt: "Leidingen en kabels in de sleuf langs de gevel",
          size: "tall",
        },
        {
          src: "grondwerken-en-riolering-drongen-050",
          alt: "Inspectieputten en oranje leidingen in de sleuf",
          size: "tall",
        },
        {
          src: "grondwerken-en-riolering-drongen-052",
          alt: "Grote uitgraving in de tuin met ondergrond zichtbaar",
        },
        {
          src: "grondwerken-en-riolering-drongen-062",
          alt: "Uitgraving naast een oprit met stapstenen en leidingen",
        },
        {
          src: "grondwerken-en-riolering-drongen-065",
          alt: "Grote boom met wortelkluit in het plantgat",
          size: "tall",
        },
        {
          src: "grondwerken-en-riolering-drongen-068",
          alt: "Geëgaliseerde tuin bij valavond voor de woning",
        },
      ],
    },
  },
  {
    slug: "poolhouse-en-poort-waarschoot",
    title: "Poolhouse en poort Waarschoot",
    category: "Tuinaanleg",
    year: 2026,
    location: "Waarschoot",
    img: "poolhouse-en-poort-waarschoot-038",
    detail: {
      intro:
        "In Waarschoot bouwden wij een poolhouse met overdekt terras en een houten afsluiting met poort. Het hardhout geeft de tuin een warme, rustige uitstraling.",
      work: [
        "Opbouwen van de houten structuur van het poolhouse",
        "Afwerken van wanden met waterdicht scherm en regelwerk",
        "Bekleden van poolhouse en afsluiting met hardhoutplanken",
        "Plaatsen van een afsluiting met poort langs de oprit",
        "Afwerken van dakrand en overstek",
      ],
      cover: "poolhouse-en-poort-waarschoot-038",
      photos: [
        {
          src: "poolhouse-en-poort-waarschoot-002",
          alt: "Start van de bouw van het poolhouse in de tuin",
          size: "wide",
        },
        {
          src: "poolhouse-en-poort-waarschoot-003",
          alt: "Houten kader met isolatie van het poolhouse",
        },
        {
          src: "poolhouse-en-poort-waarschoot-008",
          alt: "Poolhouse in ruwbouw met ladder en gronddepot",
        },
        {
          src: "poolhouse-en-poort-waarschoot-011",
          alt: "Pergolaconstructie op het poolhouse",
        },
        {
          src: "poolhouse-en-poort-waarschoot-020",
          alt: "Houten afsluiting met poort langs de opritstraat",
          size: "tall",
        },
        {
          src: "poolhouse-en-poort-waarschoot-019",
          alt: "Afsluiting deels bekleed met hardhouten planken",
          size: "tall",
        },
        {
          src: "poolhouse-en-poort-waarschoot-021",
          alt: "Poolhouse met open zijde en dakoverstek in de tuin",
          size: "wide",
        },
        {
          src: "poolhouse-en-poort-waarschoot-025",
          alt: "Poolhouse bij avondlicht vanuit de tuin",
          size: "wide",
        },
        {
          src: "poolhouse-en-poort-waarschoot-045",
          alt: "Dakrand en hout bekleding van het poolhouse van dichtbij",
        },
        {
          src: "poolhouse-en-poort-waarschoot-043",
          alt: "Hoek van het poolhouse in hout met overstek",
          size: "tall",
        },
        {
          src: "poolhouse-en-poort-waarschoot-032",
          alt: "Afsluiting van bovenaf bekleed in hardhout",
        },
      ],
    },
  },
  {
    slug: "opritten-kasseien",
    title: "Opritten in kasseien",
    category: "Tuinaanleg",
    year: 2026,
    location: "Gent en omstreken",
    img: "opritten-kasseien-009",
    detail: {
      intro:
        "Een oprit en toegangspaden in natuursteenkassei, gelegd bij een landelijke woning met een stevige garage. Elke steen wordt met de hand gezet, zodat het patroon mooi meebuigt met de vorm van de oprit.",
      work: [
        "Uitgraven en opbouwen van een stabiele fundering",
        "Afwerken van een zandbed op de juiste hoogte en helling",
        "Met de hand leggen van de kasseien in een ruw, natuurlijk patroon",
        "Rand en bochten strak laten aansluiten op de tuin",
        "Opvullen van de voegen en afwerken van de paden rond het huis",
      ],
      cover: "opritten-kasseien-009",
      photos: [
        {
          src: "opritten-kasseien-003",
          alt: "Smal pad langs de gevel, zandbed klaar voor de kasseien",
        },
        {
          src: "opritten-kasseien-002",
          alt: "Kasseipad langs de haag en het gazon",
          size: "tall",
        },
        {
          src: "opritten-kasseien-016",
          alt: "Kasseien worden gelegd langs de weg naast een hoop grond",
          size: "wide",
        },
        {
          src: "opritten-kasseien-008",
          alt: "Bochtige oprit in kasseien bij de garage tijdens de aanleg",
          size: "wide",
        },
        {
          src: "opritten-kasseien-010",
          alt: "Smal kasseipad met een geul, langs een grashelling",
        },
        {
          src: "opritten-kasseien-014",
          alt: "Gebogen kasseirand in aanleg met open bermen",
        },
        {
          src: "opritten-kasseien-005",
          alt: "Oude kasseien onder de carport, met een klassieker geparkeerd",
        },
        {
          src: "opritten-kasseien-018",
          alt: "Lichte kasseistroken aan een afgewerkte inrit",
        },
        {
          src: "opritten-kasseien-019",
          alt: "Smal gerooid pad in lichte kasseien naar de voordeur",
          size: "tall",
        },
        {
          src: "opritten-kasseien-021",
          alt: "Afgewerkt kasseipad tussen de gevels bij zonnig weer",
          size: "tall",
        },
      ],
    },
  },
  {
    slug: "terras-en-riolering-evergem",
    title: "Terras en riolering Evergem",
    category: "Infra",
    year: 2026,
    location: "Evergem",
    img: "terras-en-riolering-evergem-016",
    detail: {
      intro:
        "In een smalle stadstuin in Evergem vernieuwden wij eerst de volledige riolering, om daarna de ondergrond klaar te maken voor een nieuw terras. Met een minigraver en veel precisie werkten we tot in het kleinste hoekje.",
      work: [
        "Uitgraven van de oude put en sleuven met een minigraver",
        "Aanleggen van nieuwe rioleringsbuizen met de juiste helling",
        "Plaatsen van controleputten en inspectiedeksels",
        "Aanvullen en verdichten met steenslag",
        "Egaliseren van de fundering met waterpas, klaar voor het terras",
      ],
      cover: "terras-en-riolering-evergem-016",
      photos: [
        {
          src: "terras-en-riolering-evergem-001",
          alt: "Minigraver in de smalle tuin voor de start van de werken",
        },
        {
          src: "terras-en-riolering-evergem-004",
          alt: "Smal zijpad langs de woning voor de werken",
          size: "tall",
        },
        {
          src: "terras-en-riolering-evergem-009",
          alt: "Oude put wordt opengelegd met de minigraver",
        },
        {
          src: "terras-en-riolering-evergem-012",
          alt: "Eerste nieuwe buizen in de open sleuf",
        },
        {
          src: "terras-en-riolering-evergem-019",
          alt: "Aftakkingen van de riolering tegen de gevel",
        },
        {
          src: "terras-en-riolering-evergem-022",
          alt: "Lange nieuwe buis in de sleuf langs de muur",
          size: "tall",
        },
        {
          src: "terras-en-riolering-evergem-024",
          alt: "Aansluitput bovenaan de nieuwe leiding",
        },
        {
          src: "terras-en-riolering-evergem-027",
          alt: "Sleuf en leiding vanaf de straat richting de woning",
          size: "tall",
        },
        {
          src: "terras-en-riolering-evergem-029",
          alt: "Sleuf afgewerkt en aangevuld met steenslag",
        },
        {
          src: "terras-en-riolering-evergem-031",
          alt: "Nieuwe put met deksel omringd door zand en buis",
          size: "wide",
        },
        {
          src: "terras-en-riolering-evergem-032",
          alt: "Steenslagfundering gecontroleerd met waterpas",
        },
      ],
    },
  },
  {
    slug: "aanplantingen-tuin-en-voortuin",
    title: "Aanplantingen voor- en achtertuin",
    category: "Tuinaanleg",
    year: 2026,
    location: "Gent en omstreken",
    img: "aanplantingen-tuin-en-voortuin-004",
    detail: {
      intro:
        "Voor deze woning zorgden we voor nieuwe aanplantingen in de voor- en achtertuin. Een jonge haag langs de straat, een verzorgde bedding en kleurrijke bloeiende planten maken het geheel af.",
      work: [
        "Aanplanten van een nieuwe haag langs de straat",
        "Aanleggen van een bedding met mulch achter de bestaande haag",
        "Kiezen van bloeiende planten met warme kleuren",
        "Netjes afwerken van de randen en het gazon",
      ],
      cover: "aanplantingen-tuin-en-voortuin-004",
      photos: [
        {
          src: "aanplantingen-tuin-en-voortuin-001",
          alt: "Bedding met mulch langs een bestaande haag en gazon",
          size: "wide",
        },
        {
          src: "aanplantingen-tuin-en-voortuin-003",
          alt: "Nieuwe haagbeplanting achter een wit hekwerk aan de straat",
        },
        {
          src: "aanplantingen-tuin-en-voortuin-007",
          alt: "Bloeiende plant met rode en gele bloemen",
          size: "tall",
        },
        {
          src: "aanplantingen-tuin-en-voortuin-008",
          alt: "Bloeiende plant met oranje en roze bloemen",
          size: "tall",
        },
      ],
    },
  },
  {
    slug: "aanleg-parking-gentbrugge",
    title: "Aanleg parking Gentbrugge",
    category: "Infra",
    year: 2026,
    location: "Gentbrugge",
    img: "aanleg-parking-gentbrugge-010",
    detail: {
      intro:
        "Op een binnenterrein in Gentbrugge legden we de basis voor een nieuwe parkeerzone. We ontgroeven de site, plaatsten de opsluitbanden en bereidden de ondergrond voor op de afwerking.",
      work: [
        "Ontgraven en nivelleren van het binnenterrein",
        "Plaatsen van inspectieputten en opsluitbanden",
        "Aanbrengen en verdichten van de funderingslagen",
        "Afbakenen van de parkeervakken met boordstenen",
      ],
      cover: "aanleg-parking-gentbrugge-010",
      photos: [
        {
          src: "aanleg-parking-gentbrugge-001",
          alt: "Betonnen putdeksel in de ontgraven ondergrond",
          size: "tall",
        },
        {
          src: "aanleg-parking-gentbrugge-002",
          alt: "Minigraafmachine naast de geplaatste opsluitbanden",
        },
        {
          src: "aanleg-parking-gentbrugge-003",
          alt: "Gegraven sleuf langs een betonnen boordsteen",
          size: "tall",
        },
        {
          src: "aanleg-parking-gentbrugge-004",
          alt: "Graafmachine en trilplaat bij een put in de werfzone",
        },
        {
          src: "aanleg-parking-gentbrugge-005",
          alt: "Ruime werfzone met de afgebakende parkeervakken",
        },
        {
          src: "aanleg-parking-gentbrugge-009",
          alt: "Boordstenen van de parkeervakken voor een gegraffitieerde muur",
        },
      ],
    },
  },
  {
    slug: "aanleg-top-kortrijk",
    title: "Aanleg TOP Kortrijk",
    category: "Infra",
    year: 2026,
    location: "Kortrijk",
    img: "aanleg-top-kortrijk-002",
    detail: {
      intro:
        "Op deze bouwsite in Kortrijk zorgden we voor de grondwerken en de aanleg van de werfzone. Met onze kraan werkten we grond weg, leverden we stabiele steenslagwegen aan en hielden we de zone rond de waterloop veilig afgezet.",
      work: [
        "Uitgraven en verplaatsen van grond met de kraan",
        "Aanleg van een draagkrachtige steenslagverharding",
        "Veilig afzetten van de zone rond de waterloop",
        "Profileren van het terrein voor de volgende werkfase",
      ],
      cover: "aanleg-top-kortrijk-002",
      photos: [
        {
          src: "aanleg-top-kortrijk-001",
          alt: "Rupskraan met grijparm op de steenslagverharding van de werf",
          size: "tall",
        },
        {
          src: "aanleg-top-kortrijk-004",
          alt: "Kraan en oranje afsluiting langs het water",
        },
        {
          src: "aanleg-top-kortrijk-005",
          alt: "Grondberg en kraan op de werf, gezien vanaf de aanleg",
        },
        {
          src: "aanleg-top-kortrijk-007",
          alt: "Vlakke steenslagweg op de werf onder een blauwe lucht",
          size: "wide",
        },
        {
          src: "aanleg-top-kortrijk-008",
          alt: "Verdichte steenslag met bandensporen naast het uitgegraven terrein",
          size: "tall",
        },
      ],
    },
  },
  {
    slug: "grond-en-graafwerken",
    title: "Grond en graafwerken",
    category: "Grondwerken",
    year: 2026,
    location: "Gent en omstreken",
    img: "grond-en-graafwerken-017",
    detail: {
      intro:
        "Een greep uit onze grond en graafwerken, van wegenwerken in een dorpskern tot ontgravingen op open terrein. Met de juiste machines en veel ervaring werken wij netjes, veilig en op tijd.",
      work: [
        "Opbreken van asfalt en oude wegverharding",
        "Graven van sleuven voor kanalisatie en boordstenen",
        "Ontgraven en afvoeren van grond",
        "Werken met rupskranen en mobiele graafmachines",
        "Ook 's avonds en 's nachts doorwerken wanneer de planning het vraagt",
      ],
      cover: "grond-en-graafwerken-017",
      photos: [
        {
          src: "grond-en-graafwerken-001",
          alt: "Rupskraan op het terrein voor grondwerken",
          size: "wide",
        },
        {
          src: "grond-en-graafwerken-002",
          alt: "Mobiele graafmachine naast nieuwe boordstenen in het dorp",
        },
        {
          src: "grond-en-graafwerken-004",
          alt: "Open sleuf naast de boordsteen en straatkolk",
        },
        {
          src: "grond-en-graafwerken-008",
          alt: "Graafmachine aan het werk in een smalle dorpsstraat",
        },
        {
          src: "grond-en-graafwerken-011",
          alt: "Minigraver bij het ontgraven van een tuin",
        },
        {
          src: "grond-en-graafwerken-014",
          alt: "Zicht vanuit de cabine op het opbreken van het wegdek",
          size: "wide",
        },
        {
          src: "grond-en-graafwerken-015",
          alt: "Graafmachine aan het werk verderop op een lange straat",
        },
        {
          src: "grond-en-graafwerken-018",
          alt: "Graafmachine bij nacht onder werklicht",
        },
      ],
    },
  },
  {
    slug: "wegenwerken-ternat",
    title: "Wegenwerken in Ternat",
    category: "Infra",
    year: 2026,
    location: "Ternat",
    img: "wegenwerken-ternat-023",
    detail: {
      intro:
        "In een woonstraat in Ternat voerden we wegenwerken uit met nieuwe boordstenen, riolering en groene bermen. Stap voor stap ontstond een nette, veilige straatinrichting. We werkten nauwgezet, ook met het verkeer en de buren in het oog.",
      work: [
        "Uitgraven van de wegkoffer en verwijderen van boomstronken",
        "Plaatsen van boordstenen op een steenslagfundering",
        "Aansluiten van straatkolken en rioleringsbuizen",
        "Aanleggen van groenzones en bermen met verdiepte kanten",
      ],
      cover: "wegenwerken-ternat-023",
      photos: [
        {
          src: "wegenwerken-ternat-002",
          alt: "Boordsteen op steenslagbed langs de opengelegde sleuf",
          size: "tall",
        },
        {
          src: "wegenwerken-ternat-004",
          alt: "Straat met geplaatste boordstenen en werfzone",
          size: "tall",
        },
        {
          src: "wegenwerken-ternat-013",
          alt: "Boomstronk uitgegraven naast de nieuwe boordstenen",
        },
        {
          src: "wegenwerken-ternat-016",
          alt: "Straatkolk en riolering aangesloten naast de boordsteen",
          size: "tall",
        },
        {
          src: "wegenwerken-ternat-018",
          alt: "Rioolput en straatkolk bij de nieuwe boordstenen",
        },
        {
          src: "wegenwerken-ternat-019",
          alt: "Nieuwe groenzone omrand met boordstenen",
        },
        {
          src: "wegenwerken-ternat-021",
          alt: "Golvende boordstenen met aarde in de groenvakken",
        },
      ],
    },
  },
  {
    slug: "westerschelde-tunnel-antwerpen",
    title: "Westerschelde tunnel in Antwerpen",
    category: "Grondwerken",
    year: 2026,
    location: "Antwerpen",
    img: "westerschelde-tunnel-antwerpen-005",
    detail: {
      intro:
        "Op de grote werf van de Westerschelde tunnel in Antwerpen zetten we ons in voor grondverzet en sloopwerken. We werkten met verschillende machines, overdag en 's avonds, langs damwanden en betonnen wanden. Zo droegen we ons steentje bij aan een van de grotere projecten in de haven.",
      work: [
        "Grondverzet met graafmachines en dumpers",
        "Slopen en breken van beton met sloophamers",
        "Uitgraven van sleuven langs damwanden",
        "Ruimen van kasseien en puin op de werf",
      ],
      cover: "westerschelde-tunnel-antwerpen-005",
      photos: [
        {
          src: "westerschelde-tunnel-antwerpen-003",
          alt: "Zicht vanuit de cabine op de werf met sporen van zwaar materieel",
          size: "tall",
        },
        {
          src: "westerschelde-tunnel-antwerpen-007",
          alt: "Graafmachines aan het werk op de zandige werf",
          size: "wide",
        },
        {
          src: "westerschelde-tunnel-antwerpen-008",
          alt: "Sleuf met damwand en gebroken beton",
        },
        {
          src: "westerschelde-tunnel-antwerpen-004",
          alt: "Sloopgrijper vult met gebroken beton en wapening",
          size: "tall",
        },
        {
          src: "westerschelde-tunnel-antwerpen-011",
          alt: "Twee gele sloopmachines bij avond op de werf",
          size: "wide",
        },
        {
          src: "westerschelde-tunnel-antwerpen-018",
          alt: "Wielgraafmachine met sorteergrijper op kasseien",
          size: "tall",
        },
        {
          src: "westerschelde-tunnel-antwerpen-020",
          alt: "Wielgraafmachine naast een gebouw op de werf",
        },
        {
          src: "westerschelde-tunnel-antwerpen-021",
          alt: "Vrijgemaakt terrein met kasseien en kranen op de achtergrond",
        },
      ],
    },
  },
];

export const projectHref = (p: Project) => (p.detail ? `/realisaties/${p.slug}/` : "/realisaties/");

/* ---------------- Dienstpagina's ---------------- */

export type ServicePageData = {
  slug: "tuinaanleg" | "grondwerken" | "infra";
  nav: string;
  category: Category;
  meta: { title: string; description: string; keywords: string[] };
  hero: {
    image: string;
    alt: string;
    eyebrow: string;
    title: string;
    lead: string;
  };
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
      title: "Tuinaanleg en tuinonderhoud in Gent en regio",
      description:
        "Tuinaanleg in Gent, Eeklo, Nazareth en de regio: persoonlijk getekende tuinen, terrassen, beplanting en onderhoud. Vraag een gratis offerte.",
      keywords: [
        "tuinaanleg Gent",
        "tuinaannemer Gent",
        "tuinaanneming Gent",
        "tuin laten aanleggen Gent",
        "tuinonderhoud Gent",
        "tuinaanleg Eeklo",
        "tuinaanleg Nazareth",
        "tuinaanleg Destelbergen",
        "tuinaanleg regio Gent",
        "terras aanleggen Gent",
        "gazon aanleggen Gent",
        "haag snoeien Gent",
        "tuinaanleg Oost-Vlaanderen",
      ],
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
      title: "Grondwerken en drainage in Gent en regio",
      description:
        "Grondwerken in Gent en omstreken: afgraven, nivelleren, drainage, riolering, grondtransport en GPS-gestuurd graven. Vraag een gratis offerte.",
      keywords: [
        "grondwerken Gent",
        "graafwerken Gent",
        "afgraven en nivelleren Gent",
        "drainage Gent",
        "riolering Gent",
        "grondwerken Eeklo",
        "grondwerken Destelbergen",
        "grondwerken regio Gent",
        "grondtransport Gent",
        "grondwerken Oost-Vlaanderen",
      ],
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
      title: "Opritten, verhardingen en wegenwerken in Gent",
      description:
        "Opritten, kasseien en klinkers, boordstenen, funderingen en wegenwerken in Gent en de regio. Een solide basis, vakkundig uitgevoerd. Vraag een gratis offerte.",
      keywords: [
        "oprit aanleggen Gent",
        "opritten Gent",
        "kasseien oprit Gent",
        "klinkers leggen Gent",
        "boordstenen Gent",
        "wegenwerken Gent",
        "funderingen Gent",
        "omgevingsaanleg Gent",
        "verharding Gent",
        "infrawerken regio Gent",
      ],
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

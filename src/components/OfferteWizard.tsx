"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { contact, servicePages, type ServicePageData } from "@/lib/content";
import { honeypotProps, MAX_FILE_BYTES, MAX_FILES, submitForm } from "@/lib/submit";
import { Icon, Mark, type IconName } from "./Icon";

/* ------------------------------------------------------------------ *
 *  Gratis offerte — doorklikwizard.
 *  Verzamelt alles wat nodig is voor een ruwe offerte. De payload
 *  (zie buildPayload) gaat naar Formspree (zie src/lib/submit.ts).
 * ------------------------------------------------------------------ */

/** Stap 1: type werk. Stap 2: subdiensten uit de expertise-lijst van de gekozen dienstpagina('s). */
const TYPES: { id: ServicePageData["slug"]; icon: IconName; sub: string }[] = [
  { id: "tuinaanleg", icon: "sprout", sub: "Tuinen, beplanting en onderhoud" },
  { id: "grondwerken", icon: "shovel", sub: "Afgraven, drainage en grondtransport" },
  { id: "infra", icon: "road", sub: "Wegen, verhardingen en funderingen" },
];

/** Een subdienst-id is `type:titel`, zodat dezelfde titel in twee types niet botst. */
const dienstId = (type: string, title: string) => `${type}:${title}`;
const dienstLabel = (id: string) => id.slice(id.indexOf(":") + 1);

const REACTIES: Record<string, string> = {
  Snoeiwerken: "De heggenschaar ligt al klaar.",
  Tuinvijvers: "Waterpartijen: altijd een blikvanger.",
  "Drainage & riolering": "Droge voeten, daar zorgen we voor.",
  "Opritten en parkings": "Een oprit die er generaties ligt.",
  Natuurgras: "Groener gras aan uw kant, beloofd.",
  Terrassen: "Een terras waar u graag zit, daar werken we naartoe.",
};

const VERGELIJK: [number, string][] = [
  [15, "een parkeerplaats"],
  [60, "een gemiddelde stadstuin"],
  [162, "een volleybalveld"],
  [260, "een tennisveld"],
  [600, "een basketbalveld x 2"],
  [1250, "een olympisch zwembad"],
  [2500, "een halve voetbalveld"],
];

type Foto = { name: string; size: number; url: string | null; file: File };

const initial = {
  types: [],
  diensten: [],
  situatie: "",
  m2: 150,
  m2Onbekend: false,
  materiaal: "",
  verhardingM2: "",
  haagLengte: "",
  haagHoogte: "",
  frequentie: "",
  gazonType: "",
  grondAfvoer: "",
  wateroverlast: "",
  toegang: "",
  helling: "",
  obstakels: [],
  timing: "",
  budget: "",
  fotos: [],
  toelichting: "",
  naam: "",
  email: "",
  gsm: "",
  straat: "",
  postcode: "",
  gemeente: "",
  bezoek: [] as string[],
};
type Answers = Omit<typeof initial, "types" | "diensten" | "obstakels" | "fotos"> & {
  types: string[];
  diensten: string[];
  obstakels: string[];
  fotos: Foto[];
};

/** Subdiensten waarvoor we naar verhardingsmateriaal vragen. */
const VERHARDING = ["Terrassen", "Opritten en parkings", "Wandelpaden", "Boordstenen & klinkers"];
/** Subdiensten waarvoor we naar grondafvoer en wateroverlast vragen. */
const GROND = [
  "Afgraven & nivelleren",
  "Drainage & riolering",
  "Grondtransport",
  "Grondafvoer",
  "Ophogingen & aanvullingen",
];

/** Is een van deze subdiensten (op titel) gekozen? */
const heeft = (a: Answers, ...titels: string[]) =>
  a.diensten.some((id) => titels.includes(dienstLabel(id)));

/* ---- kleine bouwstenen ---- */
function Tile({
  active,
  onClick,
  icon,
  label,
  sub,
  hotkey,
}: {
  active: boolean;
  onClick: () => void;
  icon: IconName;
  label: string;
  sub?: string;
  hotkey?: number | null;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group relative flex min-h-[112px] flex-col items-start justify-between gap-3 rounded-2xl border-2 p-4 text-left transition duration-200 active:scale-[.97] ${active ? "border-forest bg-forest text-sand shadow-[0_14px_30px_-16px_rgba(77,90,43,.8)]" : "border-bark/10 bg-white hover:-translate-y-0.5 hover:border-forest/40"}`}
    >
      <span
        className={`grid h-10 w-10 place-items-center rounded-full transition ${active ? "rotate-[-8deg] bg-lime text-forest" : "bg-stone text-forest group-hover:bg-lime"}`}
      >
        <Icon name={active ? "check" : icon} className="h-5 w-5" />
      </span>
      <span>
        <span
          className={`block font-display text-[16px] leading-tight font-semibold ${active ? "text-white" : "text-forest"}`}
        >
          {label}
        </span>
        {sub && (
          <span className={`mt-0.5 block text-[13px] ${active ? "text-sand/80" : "text-bark/70"}`}>
            {sub}
          </span>
        )}
      </span>
      {hotkey && (
        <span
          className={`absolute top-3 right-3 hidden font-mono text-[10px] sm:block ${active ? "text-lime" : "text-bark/35"}`}
        >
          {hotkey}
        </span>
      )}
    </button>
  );
}

type ChipsProps =
  | { options: string[]; multi: true; value: string[]; onChange: (v: string[]) => void }
  | { options: string[]; multi?: false; value: string; onChange: (v: string) => void };

function Chips(props: ChipsProps) {
  const { options } = props;
  const isOn = (o: string) => (props.multi ? props.value.includes(o) : props.value === o);
  const click = (o: string) => {
    if (props.multi)
      props.onChange(isOn(o) ? props.value.filter((x) => x !== o) : [...props.value, o]);
    else props.onChange(o);
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => click(o)}
          aria-pressed={isOn(o)}
          className={`rounded-full border-2 px-4 py-2.5 font-display text-[15px] font-medium transition active:scale-95 ${isOn(o) ? "border-forest bg-forest text-lime" : "border-bark/15 bg-white text-forest hover:border-forest/50"}`}
        >
          {isOn(o) && <span className="mr-1">✓</span>}
          {o}
        </button>
      ))}
    </div>
  );
}

function Q({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <p className="font-display text-[18px] font-semibold text-forest">
        {label}
        {hint && (
          <span className="ml-2 font-body text-[14px] font-normal text-bark/70">{hint}</span>
        )}
      </p>
      {children}
    </div>
  );
}

const input = "field";

/** Plantje dat groeit met de voortgang (0..1). */
function Sprout({ p }: { p: number }) {
  const h = 20 + p * 120;
  const leaves = [0.12, 0.3, 0.48, 0.66, 0.84];
  return (
    <svg viewBox="0 0 120 180" className="h-40 w-auto" aria-hidden="true">
      <ellipse cx="60" cy="168" rx="46" ry="9" fill="#564B3F" opacity=".25" />
      <path d="M22 160h76l-8 18H30z" fill="#564B3F" />
      <path
        d={`M60 160 C 58 ${160 - h * 0.5}, 62 ${160 - h * 0.7}, 60 ${160 - h}`}
        stroke="#4D5A2B"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        style={{ transition: "d .6s" }}
      />
      {leaves.map((l, i) => {
        const on = p >= l;
        const y = 160 - h * (0.25 + i * 0.15);
        const left = i % 2 === 0;
        return (
          <path
            key={i}
            d={
              left
                ? `M60 ${y} q-26 -4 -30 -20 q20 0 30 20z`
                : `M60 ${y} q26 -4 30 -20 q-20 0 -30 20z`
            }
            fill={i % 2 ? "#989F80" : "#4D5A2B"}
            style={{
              transformOrigin: `60px ${y}px`,
              transform: `scale(${on ? 1 : 0})`,
              transition: "transform .5s cubic-bezier(.3,1.6,.5,1)",
            }}
          />
        );
      })}
      <g
        style={{
          transformOrigin: `60px ${160 - h}px`,
          transform: `scale(${p >= 0.999 ? 1 : 0})`,
          transition: "transform .6s cubic-bezier(.3,1.6,.5,1)",
        }}
      >
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse
            key={r}
            cx="60"
            cy={160 - h - 11}
            rx="7"
            ry="12"
            fill="#E1E43B"
            transform={`rotate(${r} 60 ${160 - h})`}
          />
        ))}
        <circle cx="60" cy={160 - h} r="7" fill="#4D5A2B" />
      </g>
    </svg>
  );
}

/* ---- m² helpers (logaritmische schuif 10 – 3000 m²) ---- */
const toM2 = (t: number) => Math.round((10 * Math.pow(300, t)) / 5) * 5 || 10;
const toT = (m2: number) => Math.log(m2 / 10) / Math.log(300);
const vergelijk = (m2: number) => {
  let best = VERGELIJK[0];
  VERGELIJK.forEach((v) => {
    if (Math.abs(Math.log(v[0] / m2)) < Math.abs(Math.log(best[0] / m2))) best = v;
  });
  return best[1];
};

function seizoenen() {
  const m = new Date().getMonth();
  const s = (
    [
      "winter",
      "winter",
      "voorjaar",
      "voorjaar",
      "voorjaar",
      "zomer",
      "zomer",
      "zomer",
      "najaar",
      "najaar",
      "najaar",
      "winter",
    ] as const
  )[m];
  const volgende = (
    { winter: "voorjaar", voorjaar: "zomer", zomer: "najaar", najaar: "winter" } as const
  )[s];
  return { nu: s, volgende };
}

export function OfferteWizard() {
  const [a, setA] = useState<Answers>(initial);
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [toast, setToast] = useState("");
  const [done, setDone] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [sending, setSending] = useState(false);
  const [fileError, setFileError] = useState("");
  const [sendError, setSendError] = useState("");
  const topRef = useRef<HTMLElement>(null);
  const set = <K extends keyof Answers>(k: K, v: Answers[K]) => setA((s) => ({ ...s, [k]: v }));
  const sz = seizoenen();

  const toggleType = (id: string) => {
    const on = a.types.includes(id);
    const types = on ? a.types.filter((x) => x !== id) : [...a.types, id];
    // subdiensten van een afgevinkt type verdwijnen mee
    setA((s) => ({
      ...s,
      types,
      diensten: s.diensten.filter((d) => types.includes(d.slice(0, d.indexOf(":")))),
    }));
  };
  const toggleDienst = (id: string) => {
    const on = a.diensten.includes(id);
    const reactie = REACTIES[dienstLabel(id)];
    if (!on && reactie) setToast(reactie);
    set("diensten", on ? a.diensten.filter((x) => x !== id) : [...a.diensten, id]);
  };
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  /* ---- stappen ---- */
  type Step = {
    id: string;
    title: string;
    sub: string;
    valid: boolean;
    skip?: boolean;
    body: ReactNode;
  };
  const steps: Step[] = [
    {
      id: "type",
      title: "Wat voor werk is het?",
      sub: "Kies het soort werk. Combineren mag, dan kiest u in de volgende stap per type.",
      valid: a.types.length > 0,
      body: (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {TYPES.map((t, n) => (
            <Tile
              key={t.id}
              label={servicePages[t.id].nav}
              sub={t.sub}
              icon={t.icon}
              hotkey={n + 1}
              active={a.types.includes(t.id)}
              onClick={() => toggleType(t.id)}
            />
          ))}
        </div>
      ),
    },
    {
      id: "diensten",
      title: "Wat mogen we voor u doen?",
      sub: "Kies alles wat van toepassing is. Meerdere keuzes mogen.",
      valid: a.diensten.length > 0,
      body: (
        <div className="space-y-8">
          {TYPES.filter((t) => a.types.includes(t.id)).map((t, g, list) => {
            // hotkeynummers lopen door over de groepen heen
            const offset = list
              .slice(0, g)
              .reduce((sum, x) => sum + servicePages[x.id].expertise.length, 0);
            return (
              <div key={t.id} className="space-y-3">
                {list.length > 1 && (
                  <p className="font-mono text-[11px] tracking-[3px] text-sage uppercase">
                    {servicePages[t.id].nav}
                  </p>
                )}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {servicePages[t.id].expertise.map((d, n) => {
                    const id = dienstId(t.id, d.title);
                    return (
                      <Tile
                        key={id}
                        label={d.title}
                        icon={d.icon}
                        hotkey={offset + n < 9 ? offset + n + 1 : null}
                        active={a.diensten.includes(id)}
                        onClick={() => toggleDienst(id)}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      id: "situatie",
      title: "Hoe ziet het er nu uit?",
      sub: "Zo weten we van waar we vertrekken.",
      valid: !!a.situatie,
      body: (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(
            [
              ["Nieuwbouw", "Kale grond, alles moet nog gebeuren", "building"],
              ["Bestaande tuin vernieuwen", "Er ligt al iets, maar het mag anders", "sprout"],
              ["Enkel onderhoud", "De tuin is er, hij moet verzorgd blijven", "calendar"],
              ["Weet ik nog niet", "We denken graag samen na", "handshake"],
            ] as const
          ).map(([l, s, ic], n) => (
            <Tile
              key={l}
              label={l}
              sub={s}
              icon={ic}
              hotkey={n + 1}
              active={a.situatie === l}
              onClick={() => set("situatie", l)}
            />
          ))}
        </div>
      ),
    },
    {
      id: "oppervlakte",
      title: "Hoe groot is het terrein ongeveer?",
      sub: "Een schatting volstaat. We meten ter plaatse alles exact op.",
      valid: true,
      body: (
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-5 rounded-card bg-white p-6 sm:flex-row sm:p-8">
            <div className="grid h-36 w-36 shrink-0 place-items-center rounded-2xl bg-stone">
              <div
                className="rounded-md bg-forest transition-all duration-300"
                style={{
                  width: `${20 + toT(a.m2) * 100}px`,
                  height: `${20 + toT(a.m2) * 100}px`,
                  backgroundImage:
                    "repeating-linear-gradient(90deg, rgba(225,228,59,.25) 0 2px, transparent 2px 10px)",
                  opacity: a.m2Onbekend ? 0.35 : 1,
                }}
              />
            </div>
            <div className="w-full">
              <p className="font-display text-[48px] leading-none font-bold text-forest tabular-nums">
                {a.m2Onbekend ? "?" : a.m2.toLocaleString("nl-BE")}
                <span className="ml-1 text-[24px]">m²</span>
              </p>
              <p className="mt-2 text-[15px]">
                {a.m2Onbekend ? (
                  "Geen probleem, we meten het samen op."
                ) : (
                  <>
                    Ongeveer zo groot als{" "}
                    <b className="font-semibold text-forest">{vergelijk(a.m2)}</b>.
                  </>
                )}
              </p>
              <label htmlFor="o-m2" className="sr-only">
                Oppervlakte in m²
              </label>
              <input
                id="o-m2"
                type="range"
                min="0"
                max="1"
                step="0.001"
                value={toT(a.m2)}
                disabled={a.m2Onbekend}
                onChange={(e) => set("m2", toM2(+e.target.value))}
                className="mt-5 w-full accent-[#4D5A2B]"
              />
              <div className="mt-1 flex justify-between font-mono text-[11px] text-bark/60">
                <span>10 m²</span>
                <span>100</span>
                <span>1.000</span>
                <span>3.000 m²</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                ["Stadstuin", 60],
                ["Gezinstuin", 200],
                ["Grote tuin", 600],
                ["Domein", 2000],
              ] as const
            ).map(([l, v]) => (
              <button
                key={l}
                type="button"
                onClick={() => {
                  set("m2", v);
                  set("m2Onbekend", false);
                }}
                className={`rounded-full border-2 px-4 py-2 font-display text-[14px] font-medium ${!a.m2Onbekend && a.m2 === v ? "border-forest bg-forest text-lime" : "border-bark/15 bg-white text-forest"}`}
              >
                {l}
              </button>
            ))}
            <label className="ml-auto inline-flex cursor-pointer items-center gap-2 text-[15px]">
              <input
                type="checkbox"
                checked={a.m2Onbekend}
                onChange={(e) => set("m2Onbekend", e.target.checked)}
                className="h-5 w-5 accent-[#4D5A2B]"
              />{" "}
              Ik weet het echt niet
            </label>
          </div>
        </div>
      ),
    },
    {
      id: "details",
      title: "Nog enkele details",
      sub: "Alleen wat relevant is voor uw keuzes.",
      skip: !heeft(a, ...VERHARDING, ...GROND, "Snoeiwerken", "Tuinonderhoud", "Natuurgras"),
      valid: true,
      body: (
        <div className="space-y-8">
          {heeft(a, ...VERHARDING) && (
            <>
              <Q label="Welk materiaal voor de verharding?">
                <Chips
                  options={[
                    "Natuursteen",
                    "Betonklinkers",
                    "Keramiek",
                    "Hout",
                    "Grind",
                    "Beton",
                    "Advies graag",
                  ]}
                  value={a.materiaal}
                  onChange={(v) => set("materiaal", v)}
                />
              </Q>
              <Q label="Hoeveel m² verharding ongeveer?" hint="optioneel">
                <div className="relative max-w-[220px]">
                  <input
                    type="number"
                    min="0"
                    inputMode="numeric"
                    className={input}
                    value={a.verhardingM2}
                    onChange={(e) => set("verhardingM2", e.target.value)}
                    placeholder="bv. 40"
                  />
                  <span className="absolute top-1/2 right-4 -translate-y-1/2 text-bark/60">m²</span>
                </div>
              </Q>
            </>
          )}
          {heeft(a, "Snoeiwerken") && (
            <>
              <Q label="Hoe lang is de haag in totaal?" hint="optioneel">
                <div className="relative max-w-[220px]">
                  <input
                    type="number"
                    min="0"
                    inputMode="numeric"
                    className={input}
                    value={a.haagLengte}
                    onChange={(e) => set("haagLengte", e.target.value)}
                    placeholder="bv. 25"
                  />
                  <span className="absolute top-1/2 right-4 -translate-y-1/2 text-bark/60">m</span>
                </div>
              </Q>
              <Q label="Hoe hoog is de haag?">
                <Chips
                  options={["Tot 1,5 m", "1,5 tot 2,5 m", "Hoger dan 2,5 m"]}
                  value={a.haagHoogte}
                  onChange={(v) => set("haagHoogte", v)}
                />
              </Q>
            </>
          )}
          {heeft(a, "Tuinonderhoud") && (
            <Q label="Hoe vaak wenst u onderhoud?">
              <Chips
                options={["Eenmalig", "Per seizoen", "Maandelijks", "Tweewekelijks"]}
                value={a.frequentie}
                onChange={(v) => set("frequentie", v)}
              />
            </Q>
          )}
          {heeft(a, "Natuurgras") && (
            <Q label="Wat met het gazon?">
              <Chips
                options={["Nieuw inzaaien", "Graszoden leggen", "Bestaand gazon herstellen"]}
                value={a.gazonType}
                onChange={(v) => set("gazonType", v)}
              />
            </Q>
          )}
          {heeft(a, ...GROND) && (
            <>
              <Q label="Moet er grond afgevoerd worden?">
                <Chips
                  options={["Ja", "Nee", "Weet ik niet"]}
                  value={a.grondAfvoer}
                  onChange={(v) => set("grondAfvoer", v)}
                />
              </Q>
              <Q label="Heeft u last van wateroverlast?">
                <Chips
                  options={["Ja, regelmatig", "Soms", "Nee"]}
                  value={a.wateroverlast}
                  onChange={(v) => set("wateroverlast", v)}
                />
              </Q>
            </>
          )}
        </div>
      ),
    },
    {
      id: "terrein",
      title: "Hoe geraken we op het terrein?",
      sub: "Dit bepaalt welke machines we kunnen inzetten.",
      valid: !!a.toegang,
      body: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {(
              [
                ["Smaller dan 1 m", "Enkel te voet of met kruiwagen", "leaf"],
                ["1 tot 2,5 m", "Een minigraver kan erdoor", "shovel"],
                ["Breder dan 2,5 m", "Vlot bereikbaar met vrachtwagen", "truck"],
              ] as const
            ).map(([l, s, ic], n) => (
              <Tile
                key={l}
                label={l}
                sub={s}
                icon={ic}
                hotkey={n + 1}
                active={a.toegang === l}
                onClick={() => set("toegang", l)}
              />
            ))}
          </div>
          <Q label="Ligt het terrein vlak?">
            <Chips
              options={["Vlak", "Licht hellend", "Sterk hellend"]}
              value={a.helling}
              onChange={(v) => set("helling", v)}
            />
          </Q>
          <Q label="Moet er eerst iets weg?" hint="meerdere keuzes">
            <Chips
              multi
              options={[
                "Oude verharding",
                "Bomen of stronken",
                "Oud tuinhuis",
                "Puin of afval",
                "Niets",
              ]}
              value={a.obstakels}
              onChange={(v) => set("obstakels", v)}
            />
          </Q>
        </div>
      ),
    },
    {
      id: "timing",
      title: "Wanneer wilt u starten?",
      sub: "Tuinwerk is seizoenswerk. Hoe vroeger we het weten, hoe beter we kunnen plannen.",
      valid: !!a.timing,
      body: (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {(
              [
                ["Zo snel mogelijk", "bolt"],
                [`Dit ${sz.nu}`, "sun"],
                [`Volgend ${sz.volgende}`, "calendar"],
                ["Flexibel", "handshake"],
              ] as const
            ).map(([l, ic], n) => (
              <Tile
                key={l}
                label={l}
                icon={ic}
                hotkey={n + 1}
                active={a.timing === l}
                onClick={() => set("timing", l)}
              />
            ))}
          </div>
          <Q
            label="Heeft u al een budget in gedachten?"
            hint="optioneel, helpt ons realistisch voor te stellen"
          >
            <Chips
              options={[
                "Tot € 5.000",
                "€ 5.000 – 15.000",
                "€ 15.000 – 40.000",
                "Meer dan € 40.000",
                "Liever eerst advies",
              ]}
              value={a.budget}
              onChange={(v) => set("budget", v)}
            />
          </Q>
        </div>
      ),
    },
    {
      id: "fotos",
      title: "Foto's of een plan?",
      sub: "Optioneel, maar een paar foto's van de huidige situatie zeggen veel.",
      valid: true,
      body: (
        <div className="space-y-6">
          <label
            htmlFor="o-fotos"
            className="flex cursor-pointer flex-col items-center gap-3 rounded-card border-2 border-dashed border-forest/30 bg-white px-6 py-10 text-center transition hover:border-forest hover:bg-sand/40"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-lime text-forest">
              <Icon name="camera" className="h-7 w-7" />
            </span>
            <span className="font-display text-[18px] font-semibold text-forest">
              Kies foto&apos;s of een plan
            </span>
            <span className="text-[14px] text-bark/70">
              JPG, PNG of PDF · max. {MAX_FILES} bestanden · elk max. 25 MB
            </span>
            <input
              id="o-fotos"
              type="file"
              multiple
              accept="image/*,.pdf"
              className="sr-only"
              onChange={(e) => {
                const picked = [...(e.target.files ?? [])];
                const tooBig = picked.filter((f) => f.size > MAX_FILE_BYTES);
                const fits = picked.filter((f) => f.size <= MAX_FILE_BYTES);
                const room = MAX_FILES - a.fotos.length;
                const problems: string[] = [];
                if (tooBig.length)
                  problems.push(
                    `${tooBig.map((f) => `"${f.name}"`).join(", ")} ${tooBig.length > 1 ? "zijn" : "is"} groter dan 25 MB en ${tooBig.length > 1 ? "werden" : "werd"} niet toegevoegd.`,
                  );
                if (fits.length > room)
                  problems.push(
                    `U kunt maximaal ${MAX_FILES} bestanden toevoegen. ${fits.length - Math.max(room, 0)} bestand${fits.length - Math.max(room, 0) > 1 ? "en" : ""} niet toegevoegd.`,
                  );
                setFileError(problems.join(" "));
                const files = fits.slice(0, Math.max(room, 0)).map((f) => ({
                  name: f.name,
                  size: f.size,
                  url: f.type.startsWith("image/") ? URL.createObjectURL(f) : null,
                  file: f,
                }));
                set("fotos", [...a.fotos, ...files]);
                e.target.value = "";
              }}
            />
          </label>
          {fileError && (
            <p role="alert" className="rounded-2xl bg-white px-4 py-3 text-[14px] text-[#870000]">
              {fileError}
            </p>
          )}
          {a.fotos.length > 0 && (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
              {a.fotos.map((f, n) => (
                <figure
                  key={n}
                  className="relative aspect-square animate-rise overflow-hidden rounded-xl bg-stone"
                >
                  {f.url ? (
                    // eslint-disable-next-line @next/next/no-img-element -- lokale blob-preview van een upload
                    <img src={f.url} alt={f.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="grid h-full place-items-center p-2 text-center text-[12px]">
                      {f.name}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setFileError("");
                      set(
                        "fotos",
                        a.fotos.filter((_, x) => x !== n),
                      );
                    }}
                    className="absolute top-1.5 right-1.5 grid h-7 w-7 place-items-center rounded-full bg-ink/70 text-white"
                    aria-label={`${f.name} verwijderen`}
                  >
                    <Icon name="close" className="h-4 w-4" />
                  </button>
                </figure>
              ))}
            </div>
          )}
          <Q label="Wilt u nog iets toelichten?" hint="optioneel">
            <textarea
              rows={4}
              className={input}
              value={a.toelichting}
              onChange={(e) => set("toelichting", e.target.value)}
              placeholder="bv. we willen een plek voor de kinderen en een zonnig terras aan de achterkant."
            />
          </Q>
        </div>
      ),
    },
    {
      id: "gegevens",
      title: "Waar mogen we langskomen?",
      sub: "Een plaatsbezoek is altijd nodig voor een correcte offerte. Het is gratis en vrijblijvend.",
      valid:
        !!a.naam.trim() &&
        /^\S+@\S+\.\S+$/.test(a.email) &&
        a.gsm.trim().length >= 8 &&
        !!a.gemeente.trim(),
      body: (
        <div className="relative grid gap-5 sm:grid-cols-2">
          <input
            {...honeypotProps}
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
          {(
            [
              ["naam", "Naam", "text", "Voornaam en naam", "name", "sm:col-span-2"],
              ["email", "E-mail", "email", "naam@voorbeeld.be", "email", ""],
              ["gsm", "GSM", "tel", "0470 12 34 56", "tel", ""],
              [
                "straat",
                "Straat en nummer van de werf",
                "text",
                "Tuinstraat 12",
                "street-address",
                "sm:col-span-2",
              ],
              ["postcode", "Postcode", "text", "9000", "postal-code", ""],
              ["gemeente", "Gemeente", "text", "Gent", "address-level2", ""],
            ] as const
          ).map(([k, l, t, ph, ac, cls]) => (
            <div key={k} className={cls}>
              <label
                htmlFor={`o-${k}`}
                className="mb-1.5 block font-display text-[15px] font-medium text-forest"
              >
                {l}
              </label>
              <input
                id={`o-${k}`}
                type={t}
                autoComplete={ac}
                placeholder={ph}
                className={input}
                value={a[k]}
                onChange={(e) => set(k, e.target.value)}
              />
            </div>
          ))}
          <div className="sm:col-span-2">
            <Q label="Wanneer past een plaatsbezoek?" hint="meerdere keuzes">
              <Chips
                multi
                options={["Weekdag voormiddag", "Weekdag namiddag", "Zaterdagvoormiddag"]}
                value={a.bezoek}
                onChange={(v) => set("bezoek", v)}
              />
            </Q>
          </div>
        </div>
      ),
    },
  ];

  const visible = steps.filter((s) => !s.skip);
  const step = visible[Math.min(i, visible.length - 1)];
  const last = i === visible.length - 1;
  const progress = done ? 1 : i / visible.length;

  const go = (d: number) => {
    setDir(d);
    setI((x) => Math.max(0, Math.min(visible.length - 1, x + d)));
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /** Platte tekstvelden (lege weggelaten), zodat de Formspree-mail leesbaar is. */
  const buildPayload = () => {
    const labels = (types: string[]) =>
      types.map((t) => servicePages[t as ServicePageData["slug"]].nav).join(", ");
    const fields: Record<string, string> = {
      _subject: `Offerte-aanvraag dekoster.be: ${a.naam}`,
      naam: a.naam,
      email: a.email,
      gsm: a.gsm,
      adres: `${a.straat}, ${a.postcode} ${a.gemeente}`,
      plaatsbezoek: a.bezoek.join(", "),
      type_werk: labels(a.types),
      diensten: a.diensten.map(dienstLabel).join(", "),
      situatie: a.situatie,
      oppervlakte: a.m2Onbekend ? "nog op te meten" : `${a.m2} m²`,
      materiaal: a.materiaal,
      verharding_m2: a.verhardingM2,
      haag_lengte_m: a.haagLengte,
      haag_hoogte: a.haagHoogte,
      frequentie: a.frequentie,
      gazon: a.gazonType,
      grondafvoer: a.grondAfvoer,
      wateroverlast: a.wateroverlast,
      toegang: a.toegang,
      helling: a.helling,
      eerst_verwijderen: a.obstakels.join(", "),
      timing: a.timing,
      budget: a.budget,
      toelichting: a.toelichting,
      bijlagen: a.fotos.map((f) => f.name).join(", "),
    };
    return Object.fromEntries(Object.entries(fields).filter(([, v]) => v.trim()));
  };

  const submit = async () => {
    setSending(true);
    setSendError("");
    const res = await submitForm(
      buildPayload(),
      { honeypot, startedAt },
      a.fotos.map((f) => f.file),
    );
    setSending(false);
    if (!res.ok && res.reason === "network") {
      setSendError(
        a.fotos.length
          ? `Versturen is niet gelukt. Met veel of grote bijlagen kan het langer dan 30 seconden duren: probeer het opnieuw met minder of kleinere bestanden, of bel ons op ${contact.phone}.`
          : `Versturen is niet gelukt. Probeer het opnieuw, of bel ons op ${contact.phone}.`,
      );
      return;
    }
    setDone(true);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // toetsenbord: 1–9 kiest een tegel, Enter gaat verder
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (done || ["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) return;
      if (e.key === "Enter" && step.valid) {
        e.preventDefault();
        if (last) submit();
        else go(1);
      }
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= 9) {
        const tiles = document.querySelectorAll<HTMLButtonElement>(
          "[data-step] .grid > button[aria-pressed]",
        );
        tiles[n - 1]?.click();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  /* ---- samenvatting ---- */
  const summary = [
    ["Type", a.types.map((t) => servicePages[t as ServicePageData["slug"]].nav).join(", ")],
    ["Werk", a.diensten.map((id) => dienstLabel(id)).join(", ")],
    ["Situatie", a.situatie],
    [
      "Oppervlakte",
      a.m2Onbekend
        ? "Nog op te meten"
        : i >= visible.findIndex((s) => s.id === "oppervlakte") || done
          ? `± ${a.m2.toLocaleString("nl-BE")} m²`
          : "",
    ],
    ["Materiaal", a.materiaal],
    ["Toegang", a.toegang],
    ["Timing", a.timing],
    ["Budget", a.budget],
    ["Foto's", a.fotos.length ? `${a.fotos.length} bestand${a.fotos.length > 1 ? "en" : ""}` : ""],
    ["Werf", a.gemeente],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <section className="relative bg-linen" ref={topRef}>
      {/* kop */}
      <div className="bg-forest text-sand">
        <div className="wrap flex flex-col gap-6 pt-14 pb-24 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex rounded-full bg-lime px-4 py-2 font-mono text-[11px] tracking-[3px] text-forest uppercase">
              Gratis offerte
            </span>
            <h1 className="mt-5 max-w-[640px] text-[38px] leading-[1.03] font-semibold tracking-[-1.5px] text-white sm:text-[54px]">
              Klik uw project bij elkaar.
            </h1>
            <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.7] text-sand/85">
              Een paar korte stappen, ongeveer twee minuten. Daarna komen we gratis langs voor een
              plaatsbezoek en maken we een offerte op maat.
            </p>
          </div>
          <div className="hidden shrink-0 items-center gap-4 rounded-card bg-white/5 p-4 sm:flex">
            <Sprout p={progress} />
            <div className="pr-3">
              <p className="font-mono text-[11px] tracking-[3px] text-lime uppercase">
                Uw project groeit
              </p>
              <p className="mt-1 font-display text-[34px] font-bold text-white tabular-nums">
                {Math.round(progress * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap -mt-14 pb-24">
        {/* voortgang */}
        <div className="mb-6 flex items-center gap-1.5" aria-hidden="true">
          {visible.map((s, n) => (
            <span
              key={s.id}
              className={`h-2 flex-1 rounded-full transition-all duration-500 ${done || n < i ? "bg-lime" : n === i ? "bg-sand" : "bg-white/25"}`}
            />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* vraag */}
          <div className="rounded-card bg-sand p-6 shadow-[0_30px_60px_-40px_rgba(26,26,20,.6)] sm:p-10">
            {!done ? (
              <div
                key={step.id}
                data-step
                className={dir > 0 ? "animate-rise" : "animate-[rise_.6s_ease_both_reverse]"}
              >
                <p className="font-mono text-[11px] tracking-[3px] text-sage uppercase tabular-nums">
                  Stap {i + 1} van {visible.length}
                </p>
                <h2 className="mt-3 text-[30px] leading-[1.1] font-bold text-forest sm:text-[38px]">
                  {step.title}
                </h2>
                <p className="mt-2 max-w-[60ch] text-[16px] leading-[1.6]">{step.sub}</p>
                <div className="mt-8">{step.body}</div>

                <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-bark/10 pt-6">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    disabled={i === 0}
                    className="inline-flex items-center gap-2 font-display font-medium text-forest disabled:opacity-0"
                  >
                    <Icon name="arrowRight" className="h-4 w-4 rotate-180" /> Vorige
                  </button>
                  <div className="flex items-center gap-4">
                    <span className="hidden font-mono text-[11px] text-bark/50 sm:inline">
                      of druk Enter ↵
                    </span>
                    <button
                      type="button"
                      disabled={!step.valid || sending}
                      onClick={() => (last ? submit() : go(1))}
                      className="btn-lime disabled:cursor-not-allowed disabled:bg-stone disabled:text-bark/40 disabled:hover:translate-y-0"
                    >
                      {last
                        ? sending
                          ? "Bezig met versturen…"
                          : "Aanvraag versturen"
                        : "Volgende"}{" "}
                      <Icon name="arrowRight" className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {sendError && (
                  <p role="alert" className="mt-3 text-right text-[14px] text-[#870000]">
                    {sendError}
                  </p>
                )}
                {!step.valid && step.id === "gegevens" && (
                  <p className="mt-3 text-right text-[14px] text-bark/70">
                    Vul naam, e-mail, gsm en gemeente in om te versturen.
                  </p>
                )}
              </div>
            ) : (
              <div className="animate-rise py-4" role="status">
                <div className="flex items-center gap-4">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-lime text-forest">
                    <Icon name="check" className="h-8 w-8" />
                  </span>
                  <p className="font-mono text-[11px] tracking-[3px] text-sage uppercase">
                    Aanvraag ontvangen
                  </p>
                </div>
                <h2 className="mt-6 text-[34px] leading-[1.05] font-bold text-forest sm:text-[44px]">
                  Bedankt, {a.naam.split(" ")[0]}! Uw tuin staat in de planning.
                </h2>
                <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.7]">
                  We bekijken uw aanvraag en nemen contact op om een plaatsbezoek in te plannen. Pas
                  na dat bezoek maken we een correcte offerte op maat.
                </p>
                <ol className="mt-8 grid gap-3 sm:grid-cols-3">
                  {(
                    [
                      ["Wij bekijken uw aanvraag", "calendar"],
                      ["Plaatsbezoek bij u thuis", "pin"],
                      ["Offerte op maat", "handshake"],
                    ] as const
                  ).map(([t, ic], n) => (
                    <li key={t} className="rounded-2xl bg-white p-5">
                      <span className="flex items-center gap-2 font-mono text-[11px] tracking-[2px] text-sage">
                        0{n + 1}
                        <Icon name={ic} className="h-4 w-4 text-forest" />
                      </span>
                      <span className="mt-2 block font-display text-[17px] font-semibold text-forest">
                        {t}
                      </span>
                    </li>
                  ))}
                </ol>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/realisaties/" className="btn-lime">
                    Bekijk onze realisaties
                  </Link>
                  <Link href="/" className="btn-outline">
                    Terug naar home
                  </Link>
                </div>
                <p className="mt-6 text-[14px] text-bark/70">
                  Dringend? Bel ons op{" "}
                  <span className="font-semibold text-forest select-all">{contact.phone}</span>.
                </p>
              </div>
            )}
          </div>

          {/* samenvatting */}
          <aside className="h-fit rounded-card bg-white p-6 lg:sticky lg:top-24">
            <div className="flex items-center gap-3">
              <Mark className="h-8 w-auto text-forest" />
              <p className="font-display text-[18px] font-bold text-forest">Uw project</p>
            </div>
            {summary.length ? (
              <dl className="mt-5 space-y-3">
                {summary.map(([k, v]) => (
                  <div key={k} className="animate-rise border-b border-bark/10 pb-3 last:border-0">
                    <dt className="font-mono text-[10px] tracking-[3px] text-sage uppercase">
                      {k}
                    </dt>
                    <dd className="mt-1 text-[15px] font-medium text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-5 text-[15px] text-bark/70">
                Uw keuzes verschijnen hier terwijl u klikt.
              </p>
            )}
            <p className="mt-6 rounded-2xl bg-stone p-4 text-[13px] leading-[1.6]">
              <b className="font-semibold text-forest">Goed om te weten:</b> dit is een eerste
              inschatting. Een plaatsbezoek blijft altijd nodig voor een correcte prijs.
            </p>
          </aside>
        </div>
      </div>

      {/* reactie-toast */}
      <div
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-3 text-[15px] font-medium text-lime shadow-xl transition duration-300 ${toast ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
      >
        {toast}
      </div>
    </section>
  );
}

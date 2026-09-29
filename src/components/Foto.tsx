import manifest from "@/lib/images.json";

type Manifest = Record<string, { widths: number[]; ratio: number }>;
const images = manifest as Manifest;

type Props = {
  /** Naam zonder extensie, zoals in assets/originals (bv. "haag-groot") */
  src: string;
  alt: string;
  className?: string;
  /** `sizes`-attribuut, standaard volle breedte */
  sizes?: string;
  /** Hero-beeld: laadt meteen met hoge prioriteit */
  priority?: boolean;
  style?: React.CSSProperties;
  id?: string;
};

/** Responsieve <img> met srcSet uit public/images (gegenereerd door `npm run images`). */
export function Foto({ src, alt, className, sizes = "100vw", priority = false, style, id }: Props) {
  const meta = images[src];
  if (!meta)
    throw new Error(
      `Foto "${src}" ontbreekt — voeg hem toe aan assets/originals en draai npm run images.`,
    );
  const largest = meta.widths[meta.widths.length - 1];
  return (
    // eslint-disable-next-line @next/next/no-img-element -- statische export, beelden zijn vooraf geoptimaliseerd
    <img
      id={id}
      src={`/images/${src}-${largest}.webp`}
      srcSet={meta.widths.map((w) => `/images/${src}-${w}.webp ${w}w`).join(", ")}
      sizes={sizes}
      width={largest}
      height={Math.round(largest / meta.ratio)}
      alt={alt}
      className={className}
      style={style}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}

import type { Metadata } from "next";

type PageMeta = {
  /** Wordt in de tab en in Google getoond, met " | De Koster" erachter (tenzij `absolute`). */
  title: string;
  description: string;
  keywords: string[];
  /** Pad met slashes, bv. "/tuinaanleg/" */
  path: string;
  /** Beeldnaam zonder extensie, zoals in assets/originals */
  image?: string;
  /** Titel volledig zelf bepalen, zonder suffix (homepage). */
  absolute?: boolean;
};

/** Titel, omschrijving, keywords, canonical en Open Graph voor één pagina. */
export function pageMeta({
  title,
  description,
  keywords,
  path,
  image = "duo-tuin",
  absolute = false,
}: PageMeta): Metadata {
  const images = [{ url: `/images/${image}-1200.webp`, width: 1200, height: 800 }];
  return {
    title: absolute ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, images },
    twitter: { title, description, images: images.map((i) => i.url) },
  };
}

/** Korte omschrijving voor Google: kapt af op een woordgrens binnen `max` tekens. */
export function trimDescription(text: string, max = 155) {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

import type { MetadataRoute } from "next";
import { projects, site } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "tuinaanleg/",
    "grondwerken/",
    "infra/",
    "realisaties/",
    "contact/",
    "offerte/",
  ];
  const now = new Date();
  return [
    ...pages.map((p) => ({
      url: `${site.url}/${p}`,
      lastModified: now,
      priority: p === "" ? 1 : 0.8,
    })),
    ...projects
      .filter((p) => p.detail)
      .map((p) => ({
        url: `${site.url}/realisaties/${p.slug}/`,
        lastModified: now,
        priority: 0.6,
      })),
  ];
}

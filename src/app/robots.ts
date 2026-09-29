import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export const dynamic = "force-static";

// AI-crawlers bewust toegelaten (zichtbaarheid in AI-antwoorden, zie launch-checklist §3/§6).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}

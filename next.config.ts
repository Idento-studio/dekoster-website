import path from "node:path";
import type { NextConfig } from "next";

/**
 * Statische export (zelfde aanpak als de andere Idento-sites):
 * - `output: "export"` → `npm run build` schrijft een volledig statische site naar ./out
 * - afbeeldingen zijn vooraf verkleind naar WebP (scripts/images.mjs), dus geen image-API nodig
 * - `trailingSlash` → /tuinaanleg/ wordt /tuinaanleg/index.html (werkt op elke statische host)
 * - `turbopack.root` → dit project is de root, ook als er elders een lockfile staat
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: { root: path.join(__dirname) },
};

export default nextConfig;

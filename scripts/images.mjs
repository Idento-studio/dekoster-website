// Zet alles uit assets/originals om naar WebP in meerdere breedtes → public/images/<naam>-<breedte>.webp
// Gebruik: npm run images   (draai opnieuw na het vervangen of toevoegen van een origineel)
import sharp from "sharp";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SRC = "assets/originals";
const OUT = "public/images";
const WIDTHS = [640, 1200, 1920];

await mkdir(OUT, { recursive: true });
const manifest = {};

for (const file of await readdir(SRC)) {
  if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
  const name = path.parse(file).name;
  const img = sharp(path.join(SRC, file));
  const { width, height } = await img.metadata();
  const widths = WIDTHS.filter((w) => w < width).concat(width).filter((w, i, a) => a.indexOf(w) === i);
  for (const w of widths) {
    await sharp(path.join(SRC, file))
      .resize({ width: w })
      .webp({ quality: 78, alphaQuality: 90 })
      .toFile(path.join(OUT, `${name}-${w}.webp`));
  }
  manifest[name] = { widths, ratio: +(width / height).toFixed(4) };
  console.log(`✓ ${name} → ${widths.join(", ")}`);
}

await writeFile("src/lib/images.json", JSON.stringify(manifest, null, 2) + "\n");

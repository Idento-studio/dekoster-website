/**
 * Alle formulieren (contact en offerte) gaan rechtstreeks vanuit de browser naar Formspree.
 * Velden zijn platte tekst, zodat de e-mail van Formspree leesbaar blijft. `email` wordt door
 * Formspree als antwoordadres gebruikt en `_subject` als onderwerp.
 * Met bijlagen gaat het als multipart (Formspree: max. 10 bestanden, 25 MB per bestand,
 * 100 MB en 30 seconden per verzoek). Foto's worden eerst verkleind, zodat het snel blijft.
 * Spambescherming zonder reCAPTCHA (launch-checklist §9): honeypot-veld + tijdsdrempel.
 */
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xppwbaqr";

export type SubmitResult = { ok: true } | { ok: false; reason: "spam" | "network" };

export const MAX_FILES = 10;
export const MAX_FILE_BYTES = 25 * 1024 * 1024;

/** Verkleint een foto tot maximaal `max` px (JPEG). Bij een fout of een PDF blijft het origineel. */
export async function shrinkImage(file: File, max = 2000): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")?.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    bmp.close();
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.85));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export async function submitForm(
  payload: Record<string, string>,
  guard: { honeypot: string; startedAt: number },
  files: File[] = [],
): Promise<SubmitResult> {
  if (guard.honeypot || Date.now() - guard.startedAt < 3000) return { ok: false, reason: "spam" };
  try {
    let init: RequestInit;
    if (files.length) {
      // multipart: de browser zet zelf de Content-Type met boundary
      const body = new FormData();
      Object.entries(payload).forEach(([k, v]) => body.append(k, v));
      (await Promise.all(files.slice(0, MAX_FILES).map((f) => shrinkImage(f)))).forEach((f, i) =>
        body.append(`bijlage_${i + 1}`, f, f.name),
      );
      init = { method: "POST", headers: { Accept: "application/json" }, body };
    } else {
      init = {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      };
    }
    const res = await fetch(FORMSPREE_ENDPOINT, init);
    return res.ok ? { ok: true } : { ok: false, reason: "network" };
  } catch {
    return { ok: false, reason: "network" };
  }
}

/** Onzichtbaar veld voor bots. Echte bezoekers zien het niet en vullen het niet in. */
export const honeypotProps = {
  name: "website",
  tabIndex: -1,
  autoComplete: "off",
  "aria-hidden": true,
  className: "absolute -left-[9999px] h-px w-px opacity-0",
} as const;

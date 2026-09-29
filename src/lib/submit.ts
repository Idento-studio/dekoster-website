/** Formspree-endpoint van het contactformulier (JSON-POST, geen extra pakket nodig). */
export const FORMSPREE_CONTACT = "https://formspree.io/f/xppwbaqr";

/**
 * Verstuurt een formulier naar een webhook (n8n of Formspree) (statische site → rechtstreeks vanuit de browser).
 * Spambescherming zonder reCAPTCHA (launch-checklist §9): honeypot-veld + tijdsdrempel.
 */
export type SubmitResult =
  { ok: true } | { ok: false; reason: "spam" | "network" | "not-configured" };

export async function submitToWebhook(
  url: string | undefined,
  payload: Record<string, unknown>,
  guard: { honeypot: string; startedAt: number },
): Promise<SubmitResult> {
  if (guard.honeypot || Date.now() - guard.startedAt < 3000) return { ok: false, reason: "spam" };
  if (!url) {
    // Nog geen webhook ingesteld (.env.local) — in development tonen we de payload in de console.
    if (process.env.NODE_ENV !== "production") console.info("[formulier] payload", payload);
    return { ok: false, reason: "not-configured" };
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
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

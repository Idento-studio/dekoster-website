/**
 * Cookietoestemming (analytics). De keuze staat in localStorage; een kleine store laat
 * de banner, de footerknop en het analytics-script op elkaar reageren zonder context.
 */
export type Consent = "granted" | "denied" | null;

const KEY = "cookie-consent";
const listeners = new Set<() => void>();
let editing = false;

const emit = () => listeners.forEach((l) => l());

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function readConsent(): Consent {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/** Primitieve momentopname voor useSyncExternalStore: "granted", "denied" of "none", met "!" tijdens wijzigen. */
export const snapshot = () => `${readConsent() ?? "none"}${editing ? "!" : ""}`;

export function saveConsent(choice: "granted" | "denied", gaId: string) {
  try {
    localStorage.setItem(KEY, choice);
  } catch {
    /* opslag geblokkeerd: de keuze geldt dan enkel voor deze pagina */
  }
  editing = false;
  if (choice === "denied") {
    // Google Analytics stoppen en de eigen cookies wissen
    (window as unknown as Record<string, boolean>)[`ga-disable-${gaId}`] = true;
    document.cookie.split(";").forEach((c) => {
      const name = c.split("=")[0].trim();
      if (name === "_ga" || name.startsWith("_ga_"))
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
  }
  emit();
}

/** Opent de banner opnieuw (footerknop "Cookie-instellingen"). */
export function openSettings() {
  editing = true;
  emit();
}

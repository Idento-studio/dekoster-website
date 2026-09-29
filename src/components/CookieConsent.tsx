"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { openSettings, saveConsent, snapshot, subscribe } from "@/lib/consent";
import { site } from "@/lib/content";

const useConsent = () => useSyncExternalStore(subscribe, snapshot, () => "loading");

/** Cookiebanner + Google Analytics. Analytics laadt pas nadat de bezoeker toestemming gaf. */
export function CookieConsent() {
  const state = useConsent();
  const granted = state.startsWith("granted");
  const showBanner = state === "none" || state.endsWith("!");

  return (
    <>
      {granted && process.env.NODE_ENV === "production" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","${site.gaId}",{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {showBanner && (
        <div
          role="dialog"
          aria-label="Cookies"
          className="fixed inset-x-4 bottom-4 z-[55] mx-auto max-w-[480px] animate-rise rounded-card bg-sand p-6 shadow-[0_24px_60px_-20px_rgba(26,26,20,.55)]"
        >
          <p className="font-display text-[19px] font-bold text-forest">Cookies</p>
          <p className="mt-2 text-[15px] leading-[1.6]">
            We gebruiken Google Analytics om te zien hoe onze website gebruikt wordt, zodat we hem
            kunnen verbeteren. Dat gebeurt enkel als u dat toestaat. Voor de werking van de site
            zelf zijn geen cookies nodig.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => saveConsent("granted", site.gaId)}
              className="btn-lime"
            >
              Accepteren
            </button>
            <button
              type="button"
              onClick={() => saveConsent("denied", site.gaId)}
              className="btn-outline"
            >
              Weigeren
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/** Knop in de footer om de keuze achteraf te wijzigen. */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={openSettings}
      className="underline-offset-4 transition hover:text-lime hover:underline"
    >
      Cookie-instellingen
    </button>
  );
}

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealObserver } from "@/components/RevealObserver";
import { site } from "@/lib/content";
import "./globals.css";

// Fonts zelf gehost (src/fonts, SIL OFL) — geen request naar Google, geen layout shift.
const outfit = localFont({
  src: "../fonts/Outfit-Variable.woff2",
  variable: "--font-outfit",
  weight: "100 900",
  display: "swap",
});
const workSans = localFont({
  src: "../fonts/WorkSans-Variable.woff2",
  variable: "--font-work-sans",
  weight: "100 900",
  display: "swap",
});
const geistMono = localFont({
  src: "../fonts/GeistMono-Regular.woff2",
  variable: "--font-geist-mono",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.legalName} | tuinaanleg, grondwerken en infra`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "nl_BE",
    siteName: site.legalName,
    images: [
      {
        url: "/images/duo-tuin-1200.webp",
        width: 1200,
        height: 800,
        alt: "Het De Koster-team in een tuin",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#4D5A2B" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl-BE" className={`${outfit.variable} ${workSans.variable} ${geistMono.variable}`}>
      <body>
        <Header />
        <main id="inhoud">{children}</main>
        <Footer />
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","${site.gaId}");`}
            </Script>
          </>
        )}
        <RevealObserver />
      </body>
    </html>
  );
}

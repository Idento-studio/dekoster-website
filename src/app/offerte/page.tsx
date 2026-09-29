import type { Metadata } from "next";
import { OfferteWizard } from "@/components/OfferteWizard";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Gratis offerte tuinaanleg in Gent en omstreken",
  description:
    "Vraag een gratis offerte voor tuinaanleg, grondwerken of infra in Gent en omstreken. Klik uw project bij elkaar in een paar stappen, wij komen gratis langs.",
  keywords: [
    "offerte tuinaanleg Gent",
    "gratis offerte tuinaannemer",
    "tuinaanleg prijs Gent",
    "tuin laten aanleggen offerte",
  ],
  path: "/offerte/",
});

export default function Page() {
  return <OfferteWizard />;
}

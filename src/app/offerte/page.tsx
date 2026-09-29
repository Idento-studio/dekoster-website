import type { Metadata } from "next";
import { OfferteWizard } from "@/components/OfferteWizard";

export const metadata: Metadata = {
  title: "Gratis offerte",
  description:
    "Klik uw tuinproject bij elkaar in acht korte stappen. Daarna komen we gratis langs voor een plaatsbezoek en een offerte op maat.",
  alternates: { canonical: "/offerte/" },
};

export default function Page() {
  return <OfferteWizard />;
}

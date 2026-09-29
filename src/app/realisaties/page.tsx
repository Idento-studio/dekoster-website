import type { Metadata } from "next";
import { CallToAction } from "@/components/Footer";
import { ChallengeBand, PageHero } from "@/components/PageParts";
import { RealisatiesGrid } from "@/components/RealisatiesGrid";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Realisaties tuinaanleg en grondwerken in Gent",
  description:
    "Bekijk onze realisaties in Gent en omstreken: tuinaanleg, terrassen, opritten, grondwerken en riolering. Van stadstuin tot totaalproject.",
  keywords: [
    "realisaties tuinaanleg Gent",
    "tuinen Gent voorbeelden",
    "tuinaannemer Gent referenties",
    "tuinaanleg Eeklo",
    "tuinaanleg Nazareth",
    "tuinaanleg Destelbergen",
    "opritten Gent",
    "grondwerken Gent",
  ],
  path: "/realisaties/",
  image: "totaal",
});

export default function Page() {
  return (
    <>
      <PageHero
        image="duo-tuin"
        alt="Het De Koster-team in een tuin"
        eyebrow="Realisaties"
        title="Onze realisaties"
        lead="Van kleine stadstuin tot groot totaalproject. Een selectie van ons werk."
        actions={false}
      />
      <section className="bg-linen pt-6 pb-16">
        <div className="wrap">
          <RealisatiesGrid />
        </div>
      </section>
      <ChallengeBand />
      <div className="h-16 bg-linen" />
      <CallToAction />
    </>
  );
}

import type { Metadata } from "next";
import { CallToAction } from "@/components/Footer";
import { ChallengeBand, PageHero } from "@/components/PageParts";
import { RealisatiesGrid } from "@/components/RealisatiesGrid";

export const metadata: Metadata = {
  title: "Realisaties",
  description:
    "Van kleine stadstuin tot groot totaalproject. Een selectie van tuinaanleg, grondwerken en infra door De Koster.",
  alternates: { canonical: "/realisaties/" },
};

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
        compact
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

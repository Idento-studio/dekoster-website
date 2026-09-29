import type { Metadata } from "next";
import { CallToAction } from "@/components/Footer";
import { ServicePage } from "@/components/ServicePage";
import { servicePages } from "@/lib/content";

const page = servicePages.tuinaanleg;

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
  alternates: { canonical: "/tuinaanleg/" },
  openGraph: {
    images: [{ url: `/images/${page.hero.image}-1200.webp`, width: 1200, height: 800 }],
  },
};

export default function Page() {
  return (
    <>
      <ServicePage page={page} />
      <CallToAction title={page.cta} />
    </>
  );
}

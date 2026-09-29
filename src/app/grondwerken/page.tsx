import type { Metadata } from "next";
import { CallToAction } from "@/components/Footer";
import { ServicePage } from "@/components/ServicePage";
import { servicePages } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

const page = servicePages.grondwerken;

export const metadata: Metadata = pageMeta({
  title: page.meta.title,
  description: page.meta.description,
  keywords: page.meta.keywords,
  path: "/grondwerken/",
  image: page.hero.image,
});

export default function Page() {
  return (
    <>
      <ServicePage page={page} />
      <CallToAction title={page.cta} />
    </>
  );
}

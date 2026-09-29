import type { Metadata } from "next";
import { CallToAction } from "@/components/Footer";
import { About } from "@/components/home/About";
import { Hero } from "@/components/home/Hero";
import { Projects } from "@/components/home/Projects";
import { Services } from "@/components/home/Services";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Tuinaanleg Gent en omstreken | Tuinaanneming De Koster",
  description:
    "Tuinaannemer in Gent en de regio: persoonlijke tuinaanleg, tuinonderhoud, grondwerken en infra. Eén aanspreekpunt van schets tot onderhoud.",
  keywords: [
    "tuinaanleg Gent",
    "tuinaannemer Gent",
    "tuinaanneming Gent",
    "tuinonderhoud Gent",
    "tuinaanleg regio Gent",
    "grondwerken Gent",
    "opritten Gent",
    "tuinaanleg Eeklo",
    "tuinaanleg Oost-Vlaanderen",
    "Tuinaanneming De Koster",
  ],
  path: "/",
  absolute: true,
});

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <Hero />
      <About />
      <Services />
      <Projects />
      <CallToAction />
    </>
  );
}

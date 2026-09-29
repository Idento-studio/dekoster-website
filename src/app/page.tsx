import { CallToAction } from "@/components/Footer";
import { About } from "@/components/home/About";
import { Hero } from "@/components/home/Hero";
import { Projects } from "@/components/home/Projects";
import { Services } from "@/components/home/Services";
import { LocalBusinessJsonLd } from "@/components/JsonLd";

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

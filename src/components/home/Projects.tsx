import { projects } from "@/lib/content";
import { AllProjectsLink, SectionHead } from "../PageParts";
import { ProjectCard } from "../ProjectCard";

export function Projects() {
  return (
    <section id="realisaties" className="bg-linen pb-24">
      <div className="wrap">
        <SectionHead eyebrow="Realisaties" title="Recente projecten" right={<AllProjectsLink />} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {projects.slice(0, 3).map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

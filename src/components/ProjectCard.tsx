import Link from "next/link";
import { projectHref, type Project } from "@/lib/content";
import { Foto } from "./Foto";
import { Icon } from "./Icon";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <Link
      href={projectHref(project)}
      data-reveal={index}
      className="group overflow-hidden rounded-card bg-stone"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Foto
          src={project.img}
          alt={project.title}
          sizes="(min-width: 768px) 33vw, 100vw"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <span className="absolute top-4 right-4 grid h-11 w-11 -translate-y-2 place-items-center rounded-full bg-lime text-forest opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Icon name="arrow" className="h-5 w-5" />
        </span>
      </div>
      <div className="flex items-end justify-between gap-4 p-6">
        <div>
          <span className="font-mono text-[11px] tracking-[3px] text-sage uppercase">
            {project.category}
          </span>
          <h3 className="mt-2 text-[22px] font-bold text-forest">{project.title}</h3>
        </div>
        <span className="font-mono text-[11px] tracking-[2px] text-sage tabular-nums">
          {project.year}
        </span>
      </div>
    </Link>
  );
}

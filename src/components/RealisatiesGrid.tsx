"use client";

import Link from "next/link";
import { useState } from "react";
import { projects, type Category } from "@/lib/content";
import { Icon } from "./Icon";
import { ProjectCard } from "./ProjectCard";

const FILTERS: ("Alles" | Category)[] = ["Alles", "Tuinaanleg", "Infra", "Grondwerken"];

export function RealisatiesGrid() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Alles");
  const list = filter === "Alles" ? projects : projects.filter((p) => p.category === filter);
  const count = (f: (typeof FILTERS)[number]) =>
    f === "Alles" ? projects.length : projects.filter((p) => p.category === f).length;

  return (
    <>
      <div role="group" aria-label="Filter op categorie" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-[15px] font-medium transition ${filter === f ? "bg-forest text-lime" : "bg-stone text-forest hover:bg-sand"}`}
          >
            {f}
            <span
              className={`grid h-6 min-w-6 place-items-center rounded-full px-1.5 font-mono text-[11px] tabular-nums ${filter === f ? "bg-lime text-forest" : "bg-white text-bark"}`}
            >
              {count(f)}
            </span>
          </button>
        ))}
      </div>

      {list.length ? (
        <div key={filter} className="mt-10 grid auto-rows-fr gap-10 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <div key={p.slug} className="animate-rise" style={{ animationDelay: `${i * 80}ms` }}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10 flex animate-rise flex-col items-center gap-4 rounded-card border-2 border-dashed border-sage/50 px-6 py-16 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-lime text-forest">
            <Icon name={filter === "Infra" ? "stones" : "shovel"} className="h-7 w-7" />
          </span>
          <p className="font-display text-[24px] font-semibold text-forest">
            Nog geen {filter.toLowerCase()} online.
          </p>
          <p className="max-w-[46ch]">
            De foto&apos;s van onze recentste werven komen er binnenkort bij. Vraag gerust
            referenties, we tonen ze graag.
          </p>
          <Link href="/contact/" className="mt-2 btn-lime">
            Vraag referenties
          </Link>
        </div>
      )}
    </>
  );
}

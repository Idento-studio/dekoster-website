"use client";

import { useEffect, useRef } from "react";
import { Foto } from "../Foto";

const stack = [
  { cls: "f1", src: "gazon", alt: "Grasmaaier klaarmaken voor het gazon", label: "Gazon" },
  { cls: "f2", src: "boorden", alt: "Boorden trimmen langs een pad", label: "Boorden" },
  { cls: "f3", src: "haag-groot", alt: "Jaro snoeit een beukenhaag", label: "Hagen" },
];

/** Fotostapel die openwaaiert: hover op desktop, automatisch in beeld op touch. */
export function PhotoStack() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    const card = ref.current?.closest("article");
    if (!card) return;
    const io = new IntersectionObserver(([e]) => card.classList.toggle("open", e.isIntersecting), {
      threshold: 0.6,
    });
    io.observe(card);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="grid place-items-center px-6 py-10 sm:px-8">
      <div className="stack">
        {stack.map((f) => (
          <figure key={f.label} className={f.cls}>
            <Foto src={f.src} alt={f.alt} sizes="(min-width: 768px) 440px, 90vw" />
            <figcaption>{f.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

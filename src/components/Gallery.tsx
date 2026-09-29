"use client";

import { useCallback, useEffect, useState } from "react";
import { Foto } from "./Foto";
import { Icon } from "./Icon";

type Photo = { src: string; alt: string; size?: "wide" | "tall" };

/** Fotogalerij met lightbox (pijltjes, Escape, klik naast de foto). */
export function Gallery({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const go = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go]);

  return (
    <>
      <div className="gallery">
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            data-reveal={i % 3}
            onClick={() => setOpen(i)}
            className={`group relative cursor-zoom-in overflow-hidden rounded-card bg-stone ${p.size === "wide" ? "g-wide" : ""} ${p.size === "tall" ? "g-tall" : ""}`}
            aria-label={`Foto ${i + 1} vergroten: ${p.alt}`}
          >
            <Foto
              src={p.src}
              alt={p.alt}
              sizes="(min-width: 820px) 33vw, 100vw"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <span className="absolute top-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-lime text-forest opacity-0 transition duration-300 group-hover:opacity-100">
              <Icon name="arrow" className="h-5 w-5" />
            </span>
            <span className="absolute bottom-3 left-3 rounded-full bg-ink/55 px-3 py-1 font-mono text-[10px] tracking-[2px] text-white tabular-nums backdrop-blur">
              {String(i + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Fotoviewer"
        >
          <div className="flex items-center justify-between px-5 py-4 text-sand">
            <span className="font-mono text-[12px] tracking-[3px] tabular-nums">
              {String(open + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => setOpen(null)}
              className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/10"
              aria-label="Sluiten"
              autoFocus
            >
              <Icon name="close" />
            </button>
          </div>
          <div
            className="relative min-h-0 flex-1 px-4 pb-4"
            onClick={(e) => e.target === e.currentTarget && setOpen(null)}
          >
            <Foto
              key={open}
              src={photos[open].src}
              alt={photos[open].alt}
              priority
              className="pointer-events-none h-full w-full animate-rise object-contain"
            />
            <button
              onClick={() => go(-1)}
              className="absolute top-1/2 left-3 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-lime text-forest"
              aria-label="Vorige foto"
            >
              <Icon name="arrowRight" className="h-5 w-5 rotate-180" />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute top-1/2 right-3 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-lime text-forest"
              aria-label="Volgende foto"
            >
              <Icon name="arrowRight" className="h-5 w-5" />
            </button>
          </div>
          <p className="shrink-0 px-5 pb-6 text-center text-[14px] text-sand/75">
            {photos[open].alt}
          </p>
        </div>
      )}
    </>
  );
}

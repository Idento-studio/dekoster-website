"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-gestuurde golfovergang — 3 lagen (33% / 66% / 100%), zoals de Elementor "waves".
 * - Elke laag schuift aan een eigen snelheid mee met de scroll (parallax).
 * - De golfhoogte zwelt aan wanneer de overgang midden in beeld komt.
 * - Een trage idle-beweging houdt het levend als je stilstaat.
 * `edge="bottom"`: vulling onderaan (kleur van de volgende sectie).
 * `edge="top"`: vulling bovenaan (kleur van de vorige sectie).
 */
const LAYERS = [
  { opacity: 0.33, mid: 38, amp: 16, k: 1.6, speed: 1.4, idle: 0.00018 },
  { opacity: 0.66, mid: 52, amp: 13, k: 2.2, speed: -1.0, idle: -0.00024 },
  { opacity: 1, mid: 66, amp: 10, k: 1.3, speed: 0.7, idle: 0.00014 },
];
const STEP = 10;

const GAP = 5; // minimale afstand tussen twee lagen (in viewBox-eenheden)

/**
 * Berekent de 3 golflijnen samen. Elke voorste (lichtere, volle) laag wordt punt per punt
 * minstens GAP onder de laag erachter gehouden, zodat de donkere, doorschijnende lagen
 * altijd volledig zichtbaar blijven en nooit door een lichtere laag worden afgekapt.
 */
type Edge = "top" | "bottom";

function buildPaths(edge: Edge, phases: number[], swell: number) {
  let prev: number[] | null = null;
  return LAYERS.map((L, li) => {
    const A = L.amp * swell;
    const ys: number[] = [];
    for (let x = 0, j = 0; x <= 1000; x += STEP, j++) {
      const t = (x / 1000) * Math.PI * 2;
      let y =
        L.mid +
        A * Math.sin(L.k * t + phases[li]) +
        A * 0.35 * Math.sin(L.k * 2.3 * t - phases[li] * 1.7);
      if (prev) y = Math.max(y, prev[j] + GAP);
      ys.push(Math.min(y, 99));
    }
    prev = ys;
    let d = "";
    ys.forEach((y, j) => {
      const yy = edge === "bottom" ? y : 100 - y;
      d += (j === 0 ? "M" : "L") + j * STEP + " " + yy.toFixed(2);
    });
    return edge === "bottom" ? d + "L1000 100L0 100Z" : d + "L1000 0L0 0Z";
  });
}

// Eén gedeelde rAF-loop voor alle dividers op de pagina.
type DrawFn = (now: number, vh: number) => void;
const registry = new Set<DrawFn>();
let raf = 0;
function loop(now: number) {
  const vh = window.innerHeight;
  registry.forEach((fn) => fn(now, vh));
  raf = requestAnimationFrame(loop);
}

export function WaveDivider({
  edge = "bottom",
  fill = "#F4E8CC",
  className = "",
}: {
  edge?: Edge;
  fill?: string;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const paths = [...svg.querySelectorAll("path")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;

    const draw: DrawFn = (now, vh) => {
      if (!visible) return;
      const r = svg.getBoundingClientRect();
      // 0 = divider komt onderaan binnen, 1 = verdwijnt bovenaan
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      const swell = 0.55 + 0.65 * Math.sin(p * Math.PI); // max golf midden in beeld
      const phases = LAYERS.map((L) => p * L.speed * Math.PI * 2 + (reduce ? 0 : now * L.idle));
      buildPaths(edge, phases, reduce ? 1 : swell).forEach((d, i) => paths[i].setAttribute("d", d));
    };

    draw(performance.now(), window.innerHeight);
    if (reduce) return;

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { rootMargin: "100px" },
    );
    io.observe(svg);
    registry.add(draw);
    if (!raf) raf = requestAnimationFrame(loop);
    return () => {
      io.disconnect();
      registry.delete(draw);
      if (!registry.size) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
  }, [edge]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 1000 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none block w-full ${className}`}
    >
      {buildPaths(edge, [0, 1, 2], 1).map((d, i) => (
        <path key={i} fill={fill} opacity={LAYERS[i].opacity} d={d} />
      ))}
    </svg>
  );
}

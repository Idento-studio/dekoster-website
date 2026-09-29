"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";
import { prefersReducedMotion } from "@/lib/hooks";

/** Kinderen met `data-depth` bewegen tegen elkaar in: muis op desktop, scroll op touch. */
export function TiltStage({
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { "data-reveal"?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const stage = ref.current;
    if (!stage || prefersReducedMotion()) return;
    const layers = [...stage.querySelectorAll<HTMLElement>("[data-depth]")];
    const move = (x: number, y: number) =>
      layers.forEach((l) => {
        const d = Number(l.dataset.depth);
        l.style.transform = `translate3d(${x * d}px, ${y * d}px, 0) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
      });
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      move((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => move(0, 0);
    const onScroll = () => {
      const r = stage.getBoundingClientRect();
      move(0, ((r.top + r.height / 2) / window.innerHeight - 0.5) * 0.8);
    };
    const touch = window.matchMedia("(hover: none)").matches;
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    if (touch) window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
}

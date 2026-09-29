"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll-reveal voor elementen met `data-reveal`. Enkel wat bij het laden onder de vouw staat,
 * krijgt de animatie — de eerste schermhoogte is altijd meteen zichtbaar (goed voor LCP/CLS).
 */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add("reveal");
        el.style.transitionDelay = `${(Number(el.dataset.reveal) || 0) * 90}ms`;
        io.observe(el);
      }
    });
    return () => io.disconnect();
  }, [pathname]);
  return null;
}

"use client";

import { useScrolled } from "@/lib/hooks";
import { Icon } from "./Icon";

export function BackToTop() {
  const show = useScrolled(600);
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll naar boven"
      className={`fixed right-6 bottom-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-lime text-forest shadow-lg transition duration-300 hover:-translate-y-1 ${show ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <Icon name="up" className="h-5 w-5" />
    </button>
  );
}

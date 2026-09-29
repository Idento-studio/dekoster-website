"use client";

import { useState } from "react";
import { Icon, type IconName } from "./Icon";

export function CopyLine({
  icon,
  label,
  value,
  href,
}: {
  icon: IconName;
  label: string;
  value: string;
  href?: string;
}) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {
      /* klembord geweigerd — tekst is selecteerbaar */
    }
  };
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white/70 p-4">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-forest text-lime">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[11px] tracking-[3px] text-sage uppercase">{label}</p>
        {href ? (
          <a
            href={href}
            className="block truncate font-display text-[18px] font-semibold text-forest hover:underline"
          >
            {value}
          </a>
        ) : (
          <p className="truncate font-display text-[18px] font-semibold text-forest select-all">
            {value}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={copy}
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-forest hover:bg-stone"
        aria-label={`${label} kopiëren`}
      >
        <Icon name={done ? "check" : "copy"} className="h-5 w-5" />
      </button>
    </div>
  );
}

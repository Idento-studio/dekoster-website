import type { ReactNode } from "react";

const icons = {
  leaf: (
    <>
      <path d="M5 19c0-8 5-14 14-14 0 9-6 14-14 14Z" />
      <path d="M5 19 13 11" />
    </>
  ),
  shovel: (
    <>
      <path d="m14 4 6 6" />
      <path d="m17 7-7.5 7.5" />
      <path d="M9.5 14.5 7 12l-3 3a3 3 0 0 0 0 4.2l.8.8a3 3 0 0 0 4.2 0l3-3-2.5-2.5Z" />
    </>
  ),
  stones: (
    <>
      <rect x="3" y="4" width="8" height="7" rx="1.5" />
      <rect x="13" y="4" width="8" height="7" rx="1.5" />
      <rect x="3" y="13" width="5" height="7" rx="1.5" />
      <rect x="10" y="13" width="11" height="7" rx="1.5" />
    </>
  ),
  handshake: (
    <>
      <path d="m11 17 2 2a1.4 1.4 0 0 0 2-2" />
      <path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2L15 11l-1.5 1.5a2 2 0 0 1-2.8-2.8L13.5 7h2l4 4" />
      <path d="M3 11l4-4h3" />
      <path d="m7 13 4 4" />
      <path d="M21 12V6h-3" />
      <path d="M3 12V6h3" />
    </>
  ),
  arrow: (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  up: (
    <>
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </>
  ),
  menu: (
    <>
      <path d="M5 8h10a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h10" />
      <circle cx="19" cy="8" r="1.4" />
    </>
  ),
  grass: (
    <>
      <path d="M3 20h18" />
      <path d="M6 20c0-4-1-7-3-9" />
      <path d="M9 20c0-5 1-9 3-12" />
      <path d="M13 20c0-4 2-8 5-10" />
      <path d="M17 20c0-2 1-4 3-5" />
    </>
  ),
  tree: (
    <>
      <path d="M12 22v-7" />
      <path d="M12 15c-4 0-7-2.5-7-6a7 7 0 0 1 14 0c0 3.5-3 6-7 6Z" />
      <path d="m9 18 3-3 3 3" />
    </>
  ),
  drop: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />,
  house: (
    <>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4 8.1 15.9" />
      <path d="M14.5 14.5 20 20" />
      <path d="M8.1 8.1 12 12" />
    </>
  ),
  truck: (
    <>
      <rect x="2" y="7" width="12" height="9" rx="1" />
      <path d="M14 10h4l3 3v3h-7" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </>
  ),
  pipe: (
    <>
      <path d="M3 8h8a4 4 0 0 1 4 4v9" />
      <path d="M3 13h6a1 1 0 0 1 1 1v7" />
      <path d="M3 6v9" />
      <path d="M8 21h9" />
    </>
  ),
  road: (
    <>
      <path d="M8 3 4 21" />
      <path d="m16 3 4 18" />
      <path d="M12 4v3M12 11v3M12 18v2" />
    </>
  ),
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 21v-9" />
      <path d="M12 12C12 7 8 5 4 5c0 4 3 7 8 7Z" />
      <path d="M12 14c0-4 3-6 8-6 0 4-3 6-8 6Z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h3l2-3h6l2 3h3v12H4V8Z" />
      <circle cx="12" cy="14" r="3.5" />
    </>
  ),
  check: <path d="m5 12 5 5 9-10" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5" />
    </>
  ),
  park: (
    <>
      <path d="M4 20h16" />
      <path d="M8 20v-4" />
      <circle cx="8" cy="11" r="4" />
      <path d="M16 20v-6" />
      <path d="M13 14h6l-3-6-3 6Z" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof icons;

/** Lijn-iconen (24×24, stroke = currentColor). */
export function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

/** Beeldmerk De Koster (uit het bron-SVG van dekoster.be, y-as omgedraaid). */
export const Mark = ({ className = "h-10 w-auto" }: { className?: string }) => (
  <svg viewBox="0 0 1930 2960" className={className} aria-hidden="true">
    <g transform="translate(0 2960) scale(1 -1)" fill="currentColor">
      <path d="M790 2945C385 2889 90 2587 19 2154 12 2114 6 1902 3 1648l-5-438 428-2 429-3L427 885 0 565 1 283 2 0l28 23c15 12 79 62 141 112 63 49 200 157 304 240 105 83 248 197 318 253 71 56 132 102 137 102 5 0 41-26 81-57 40-32 164-130 275-218 111-88 281-223 378-300 98-77 181-141 187-143 5-2 9 103 9 270v274l-27 26c-16 14-208 160-427 324l-400 299 428 3 428 2-5 453c-4 406-7 461-25 544-94 428-379 693-797 742-107 13-121 13-245-4zm299-481c140-35 244-109 299-211 55-105 63-150 69-375l6-208H398l5 203c5 215 13 260 64 361 55 109 174 200 299 230 82 20 243 20 323 0z" />
    </g>
  </svg>
);

"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Huidig jaartal. De site is statisch geëxporteerd, dus de browser leest het jaar zelf uit
 *  (het buildjaar dient als serverwaarde, zodat hydratatie zonder waarschuwing verloopt). */
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => new Date().getFullYear(),
  );
  return <>{year}</>;
}

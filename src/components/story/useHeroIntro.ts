"use client";
import { useCallback, useEffect, useState } from "react";
import { onStageReady } from "./stage/store";

export type HeroIntro = "center" | "settled" | "instant";

/** Longest the name stays centred, so a slow stage never holds the page back. */
const INTRO_MAX_MS = 3000;

/** The hero opens centred and moves aside when the stage arrives, unless the visitor got there first. */
export default function useHeroIntro(): { intro: HeroIntro; skipIntro: () => void } {
  const [intro, setIntro] = useState<HeroIntro>("center");

  const leaveCenter = useCallback((next: HeroIntro) => {
    setIntro((current) => (current === "center" ? next : current));
  }, []);
  const skipIntro = useCallback(() => leaveCenter("instant"), [leaveCenter]);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced || window.scrollY > 0 || window.location.hash) {
      skipIntro();
      return;
    }

    const settle = () => leaveCenter("settled");
    const timer = window.setTimeout(settle, INTRO_MAX_MS);
    const unsubscribe = onStageReady(settle);
    window.addEventListener("scroll", skipIntro, { passive: true, once: true });
    return () => {
      window.clearTimeout(timer);
      unsubscribe();
      window.removeEventListener("scroll", skipIntro);
    };
  }, [leaveCenter, skipIntro]);

  return { intro, skipIntro };
}

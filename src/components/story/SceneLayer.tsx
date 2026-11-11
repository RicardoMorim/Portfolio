"use client";
import { useContext, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { ThemeContext } from "@/context/ThemeContext";
import { useTranslation } from "@/context/LanguageContext";
import useMediaQuery from "@/lib/useMediaQuery";
import useActiveScene from "./useActiveScene";
import { getNote, getServerNote, markStageReady, requestShape, setNote, subscribeNote } from "./stage/store";

/** WebGL waits for the page to be readable, then for an idle moment. */
const STAGE_DELAY_MS = 1200;
const STAGE_IDLE_TIMEOUT_MS = 1500;
/** From this scene on the copy reaches the top of phone screens, where the caption sits. */
const FIRST_CONTENT_SCENE = 5;

const CoreScene = dynamic(() => import("./CoreScene"), { ssr: false });

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Fixed backdrop with the single WebGL canvas, plus the live caption for the active scene. */
export default function SceneLayer() {
  const { theme } = useContext(ThemeContext);
  const { getStory } = useTranslation();
  const story = getStory();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const compact = useMediaQuery("(max-width: 1099px)");
  const scene = useActiveScene();
  const note = useSyncExternalStore(subscribeNote, getNote, getServerNote);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const presentation = useRef<HTMLDivElement>(null);

  // Move the opening illustration with the document, before copy can scroll underneath it.
  useLayoutEffect(() => {
    const element = presentation.current;
    if (!element || !compact || scene !== 0) return;
    const hero = document.getElementById("hero");
    if (!hero) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = Math.max(0, -hero.getBoundingClientRect().top);
      const fadeEnd = Math.min(140, window.innerHeight * 0.18);
      element.style.setProperty("--hero-scene-offset", `${-distance}px`);
      element.style.setProperty("--hero-scene-opacity", `${Math.max(0, 1 - distance / fadeEnd)}`);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      element.style.removeProperty("--hero-scene-offset");
      element.style.removeProperty("--hero-scene-opacity");
    };
  }, [compact, scene]);

  useEffect(() => {
    const start = () => {
      const isSupported = supportsWebGL();
      setWebgl(isSupported);
      if (!isSupported) markStageReady();
    };
    let idle = 0;
    const timer = window.setTimeout(() => {
      if ("requestIdleCallback" in window) idle = window.requestIdleCallback(start, { timeout: STAGE_IDLE_TIMEOUT_MS });
      else start();
    }, STAGE_DELAY_MS);
    return () => {
      window.clearTimeout(timer);
      if (idle && "cancelIdleCallback" in window) window.cancelIdleCallback(idle);
    };
  }, []);

  useLayoutEffect(() => {
    setNote("");
    requestShape(null);
  }, [scene]);

  const caption = story.figures[scene] ?? "";
  const coversCopy = compact && scene >= FIRST_CONTENT_SCENE && !note;

  return (
    <div ref={presentation} className="scene-presentation" data-hero={scene === 0}>
      <div className="scene-layer" aria-hidden="true">
        <div className="scene-glow" />
        {webgl && (
          <CoreScene
            theme={theme}
            reducedMotion={reducedMotion}
            compact={compact}
            scene={scene}
            copy={story.stage}
            onReady={markStageReady}
          />
        )}
      </div>
      {webgl && !reducedMotion && !coversCopy && (
        <p className="scene-caption" aria-hidden="true">
          {note && <span className="scene-note">{note}</span>}
          <span className="scene-caption-dot" />
          <span key={caption} className="scene-caption-text">{caption}</span>
        </p>
      )}
    </div>
  );
}

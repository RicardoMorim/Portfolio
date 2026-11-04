"use client";
import { useContext, useEffect, useLayoutEffect, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { ThemeContext } from "@/context/ThemeContext";
import { useTranslation } from "@/context/LanguageContext";
import useMediaQuery from "@/lib/useMediaQuery";
import useActiveScene from "./useActiveScene";
import { getNote, getServerNote, requestShape, setNote, subscribeNote } from "./stage/store";

/** WebGL waits for the page to be readable, then for an idle moment. */
const STAGE_DELAY_MS = 1200;
const STAGE_IDLE_TIMEOUT_MS = 2500;

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

  useEffect(() => {
    const start = () => setWebgl(supportsWebGL());
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

  return (
    <>
      <div className="scene-layer" aria-hidden="true">
        <div className="scene-glow" />
        {webgl && (
          <CoreScene theme={theme} reducedMotion={reducedMotion} compact={compact} scene={scene} copy={story.stage} />
        )}
      </div>
      {webgl && !reducedMotion && (
        <p className="scene-caption" aria-hidden="true">
          {note && <span className="scene-note">{note}</span>}
          <span className="scene-caption-dot" />
          <span key={caption} className="scene-caption-text">{caption}</span>
        </p>
      )}
    </>
  );
}

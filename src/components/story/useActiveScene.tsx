"use client";
import { useEffect, useState } from "react";

/** Returns the `data-scene` index of the anchor crossing the middle of the viewport. */
export default function useActiveScene(): number {
  const [scene, setScene] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setScene(Number((visible.target as HTMLElement).dataset.scene) || 0);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    document.querySelectorAll("[data-scene]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return scene;
}

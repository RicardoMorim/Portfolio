"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";

const SCENE_BY_ID: Record<string, number> = {
  "inesc-tec-2025": 1,
  innovatweb: 2,
  "celfocus-2026": 3,
  "critical-manufacturing-2026": 4,
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Career told oldest-first: a sticky rail tracks the chapter while the 3D core morphs behind. */
export default function StoryChapters() {
  const { getCareerHighlights, getStory } = useTranslation();
  const story = getStory();
  const career = getCareerHighlights();
  const chapters = [...career.items].reverse();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [chapters.length]);

  return (
    <section id="career" className="story" aria-labelledby="story-title">
      <div className="shell">
        <header className="section-head">
          <p className="kicker"><span className="kicker-dot" /> {story.storyKicker}</p>
          <h2 id="story-title" className="section-title">{story.storyTitle}</h2>
          <p className="section-lead">{career.title}</p>
        </header>

        <div className="story-grid">
          <aside className="story-rail" aria-hidden="true">
            <p className="rail-count">
              <span key={active} className="rail-count-now">{pad(active + 1)}</span>
              <span className="rail-count-total">/ {pad(chapters.length)}</span>
            </p>
            <ol className="rail-list">
              {chapters.map((item, i) => (
                <li key={item.id} className={i === active ? "is-active" : i < active ? "is-past" : ""}>
                  <span className="rail-verb">{story.verbs[item.id ?? ""] ?? item.organization}</span>
                  <span className="rail-org">{item.organization}</span>
                </li>
              ))}
            </ol>
            <div className="rail-progress">
              <span style={{ transform: `scaleY(${(active + 1) / chapters.length})` }} />
            </div>
          </aside>

          <div className="story-chapters">
            {chapters.map((item, i) => {
              const role = item.title.split(" · ")[1];
              const verb = story.verbs[item.id ?? ""];
              return (
                <article
                  key={item.id}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  data-index={i}
                  data-scene={SCENE_BY_ID[item.id ?? ""] ?? i + 1}
                  className="chapter"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-15% 0px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="chapter-kicker">
                      <span>{story.chapterLabel} {pad(i + 1)}{verb ? ` · ${verb}` : ""}</span>
                      {item.date && <span className="chapter-date">{item.date}</span>}
                    </p>
                    <h3 className="chapter-org">{item.organization}</h3>
                    {role && <p className="chapter-role">{role}</p>}
                    <p className="chapter-desc">{item.description}</p>
                    {item.bullets && (
                      <ul className="chapter-bullets">
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

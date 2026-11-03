"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Skills } from "@/language/config";
import { en } from "@/language/translations/en";
import { useTranslation } from "@/context/LanguageContext";
import useMediaQuery from "@/lib/useMediaQuery";
import { iconShape } from "./story/shapes";
import { SKILL_ICONS } from "./story/skillShowcase";
import { requestShape } from "./story/stage/store";

const CYCLE_MS = 4500;

/** A short list of headline skills; picking one turns the 3D core into its logo. */
export default function SkillsSection(skills: Skills) {
  const { getStory } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [picked, setPicked] = useState<string | null>(null);
  const [cycled, setCycled] = useState(0);

  // English names key the icons; positions line up across locales for the labels.
  const groups = useMemo(
    () =>
      en.skills.categories.map((category, c) => ({
        title: skills.categories[c].title,
        items: category.items.flatMap((name, i) =>
          SKILL_ICONS[name] ? [{ name, label: skills.categories[c].items[i] }] : [],
        ),
      })),
    [skills],
  );
  const names = useMemo(() => groups.flatMap((group) => group.items.map((item) => item.name)), [groups]);
  const active = inView ? (picked ?? (reducedMotion ? null : names[cycled % names.length])) : null;

  useEffect(() => {
    if (!inView || picked || reducedMotion) return;
    const timer = window.setInterval(() => setCycled((value) => value + 1), CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [inView, picked, reducedMotion]);

  useEffect(() => {
    if (inView) requestShape(active ? { id: `skill:${active}`, build: iconShape(SKILL_ICONS[active]) } : null);
  }, [active, inView]);

  return (
    <section ref={sectionRef} className="section" id="skills" data-scene="6" aria-labelledby="skills-title">
      <div className="shell">
        <header className="section-head">
          <p className="kicker"><span className="kicker-dot" /> {getStory().skillsKicker}</p>
          <h2 id="skills-title" className="section-title">{skills.title}</h2>
        </header>
        <div className="toolkit">
          {groups.map((group, c) => (
            <motion.div
              key={group.title}
              className="toolkit-col"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: c * 0.1, duration: 0.7 }}
            >
              <h3 className="toolkit-title">{group.title}</h3>
              <ul className="toolkit-list">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <button
                      type="button"
                      className={`toolkit-item ${active === item.name ? "is-active" : ""}`}
                      onPointerEnter={() => setPicked(item.name)}
                      onPointerLeave={(event) => event.pointerType === "mouse" && setPicked(null)}
                      onFocus={() => setPicked(item.name)}
                      onBlur={() => setPicked(null)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

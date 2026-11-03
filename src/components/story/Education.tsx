"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaAws, FaBrain } from "react-icons/fa6";
import { useTranslation } from "@/context/LanguageContext";
import { capShape, iconShape, textShape } from "./shapes";
import { requestShape, setNote, tossCap, type ShapeRequest } from "./stage/store";

/** Only the headline milestones; each one reshapes the cap above it. */
const FEATURED: readonly ShapeRequest[] = [
  { id: "edu:master", build: iconShape(FaBrain) },
  { id: "edu:bsc", build: capShape },
  { id: "edu:aws", build: iconShape(FaAws) },
  { id: "edu:cs50", build: textShape("CS50", "700 78px system-ui, sans-serif") },
];

export default function Education() {
  const { getAbout, getStory } = useTranslation();
  const about = getAbout();
  const story = getStory();
  const thrown = useRef(0);
  const [hasThrown, setHasThrown] = useState(false);
  const rows = about.milestones.items.slice(0, FEATURED.length);

  const show = (index: number) => {
    requestShape(FEATURED[index]);
    setNote(story.stage.educationJokes[index] ?? "");
  };

  const clear = () => {
    requestShape(null);
    setNote(thrown.current > 0 ? `${story.stage.capsThrown}: ${thrown.current}` : "");
  };

  const throwCap = () => {
    requestShape(null);
    thrown.current += 1;
    setHasThrown(true);
    tossCap();
    setNote(`${story.stage.capsThrown}: ${thrown.current}`);
  };

  return (
    <section id="about" className="section" data-scene="8" aria-labelledby="education-title">
      <div className="shell">
        <header className="section-head">
          <p className="kicker"><span className="kicker-dot" /> {story.educationKicker}</p>
          <h2 id="education-title" className="section-title">{about.title}</h2>
          <button type="button" className={`btn ${hasThrown ? "btn-ghost" : "btn-primary"} cap-button`} onClick={throwCap}>
            {story.stage.throwCap} <span aria-hidden="true">↑</span>
          </button>
        </header>
        <ol className="ledger">
          {rows.map((item, i) => (
            <motion.li
              key={item.title}
              className="ledger-row"
              tabIndex={0}
              onPointerEnter={() => show(i)}
              onPointerLeave={clear}
              onFocus={() => show(i)}
              onBlur={clear}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
            >
              <span className="ledger-date">{item.date}</span>
              <div>
                <h3 className="ledger-title">{item.title}</h3>
                <p className="ledger-desc">{Array.isArray(item.description) ? item.description.join(" ") : item.description}</p>
              </div>
              {item.link && item.url ? (
                <a className="ledger-link" href={item.url} target="_blank" rel="noopener noreferrer">{item.link}</a>
              ) : (
                <span />
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

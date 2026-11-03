"use client";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";

export default function RecommendationsSection() {
  const { getRecommendations, getStory } = useTranslation();
  const data = getRecommendations();

  return (
    <section id="recommendations" className="section voices" data-scene="7" aria-labelledby="voices-title">
      <div className="shell">
        <header className="section-head">
          <p className="kicker"><span className="kicker-dot" /> {getStory().voicesKicker}</p>
          <h2 id="voices-title" className="section-title">{data.title}</h2>
          <p className="section-lead">{data.subtitle}</p>
        </header>

        <motion.figure
          className="quote"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="quote-mark" aria-hidden="true">“</span>
          <blockquote>
            <p>{data.quote}</p>
          </blockquote>
          <figcaption className="quote-by">
            <span className="quote-name">{data.author.name}</span>
            <span className="quote-role">{data.author.title}</span>
            {data.date && <span className="quote-date">{data.date}</span>}
          </figcaption>
          <div className="quote-actions">
            <a href={data.pdf.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              {data.pdf.label} <span aria-hidden="true">↗</span>
            </a>
            {data.author.email && (
              <a href={`mailto:${data.author.email}`} className="text-link">{data.author.email}</a>
            )}
          </div>
        </motion.figure>
      </div>
    </section>
  );
}

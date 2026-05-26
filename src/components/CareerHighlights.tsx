"use client";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";

export default function CareerHighlights() {
  const { getCareerHighlights } = useTranslation();
  const data = getCareerHighlights();

  return (
    <section id="career" className="career-section">
      <div className="career-container">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="career-title"
        >
          {data.title}
        </motion.h2>

        <div className="career-grid">
          {data.items.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="career-card"
            >
              <div className="career-card-header">
                {item.date && <span className="career-date">{item.date}</span>}
                <h3 className="career-card-title">{item.title}</h3>
              </div>
              <p className="career-card-desc">{item.description}</p>
              {item.bullets && (
                <ul className="career-bullets">
                  {item.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

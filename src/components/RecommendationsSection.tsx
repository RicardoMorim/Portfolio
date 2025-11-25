"use client";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";
import { FaQuoteLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

export default function RecommendationsSection() {
  const { getRecommendations } = useTranslation();
  const data = getRecommendations();

  return (
    <section id="recommendations" className="bg-[var(--bg-color)] py-24 px-6">
      <div className="max-w-5xl mx-auto relative">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center font-['Saira Stencil One',cursive] text-[var(--text-color)]"
        >
          {data.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-3 text-[var(--text-color)]/80"
        >
          {data.subtitle}
        </motion.p>

        <div className="mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-[var(--text-color)]/30 bg-[color:rgba(var(--text-color-rgb),0.03)] backdrop-blur-md"
          >
            {/* Glow */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgba(99,102,241,0.08)] via-transparent to-[rgba(64,201,255,0.08)]" />

            <div className="relative p-8 md:p-12">
              <FaQuoteLeft className="text-3xl text-[var(--text-color)]/40" />
              <blockquote className="mt-6 text-lg md:text-xl leading-relaxed text-[var(--text-color)] border-l-4 border-indigo-400/30 pl-6 py-4 bg-[color:rgba(var(--text-color-rgb),0.02)] rounded-lg">
                <p className="italic">{data.quote}</p>
              </blockquote>

              <div className="mt-6 flex items-center gap-3 text-[var(--text-color)]/90">
                <div className="h-12 w-120 rounded-full overflow-hidden border-2 border-indigo-500/30">
                  <Image
                    src="http://artefacto.artech-international.org/wp-content/uploads/2018/06/inesc.png"
                    alt="INESC TEC Logo"
                    width={120}
                    height={12}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-semibold text-[var(--text-color)]">
                    {data.author.name}
                  </p>
                  <p className="text-sm opacity-80">
                    {data.author.title} ·{" "}
                    <span className="ml-1 text-xs">{data.date}</span>
                  </p>
                  {data.author.email && (
                    <a
                      href={`mailto:${data.author.email}`}
                      className="text-xs text-indigo-400 hover:underline mt-1 block"
                    >
                      {data.author.email}
                    </a>
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={data.pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-lg border border-indigo-500/60 px-4 py-2 text-indigo-400 hover:text-white hover:bg-indigo-600 transition-colors"
                >
                  {data.pdf.label}
                  <FaArrowRight className="transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href={data.pdf.url}
                  download
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--text-color)]/30 px-4 py-2 text-[var(--text-color)]/90 hover:bg-[var(--text-color)] hover:text-[var(--bg-color)] transition-colors"
                >
                  Download
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

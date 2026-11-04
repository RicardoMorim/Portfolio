"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";
import useMediaQuery from "@/lib/useMediaQuery";
import { PROJECT_PAGES, localePath } from "@/content/site";
import ImageLightbox from "./ImageLightbox";

const pad = (n: number) => String(n).padStart(2, "0");

/** Case files. On wide screens the section pins and vertical scroll drives a horizontal track. */
export default function ProjectsReel() {
  const { getProjects, getStory, getZoom, locale } = useTranslation();
  const { projects } = getProjects();
  const story = getStory();
  const pinned = useMediaQuery("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [preview, setPreview] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !pinned) return setDistance(0);
    const measure = () => setDistance(Math.max(track.scrollWidth - window.innerWidth, 0));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned, projects.items.length]);

  // Pinning changes the page height; re-apply a deep link so it still lands on its section.
  useEffect(() => {
    if (distance > 0 && window.location.hash) {
      document.querySelector(window.location.hash)?.scrollIntoView({ behavior: "instant" });
    }
  }, [distance]);

  // Keyboard users tabbing into an off-screen card get scrolled to where that card is in view.
  const revealFocused = (event: React.FocusEvent<HTMLElement>) => {
    const section = sectionRef.current;
    const card = (event.target as HTMLElement).closest<HTMLElement>(".case");
    if (!pinned || !section || !card || distance === 0) return;
    const progress = Math.min(Math.max((card.offsetLeft - window.innerWidth * 0.1) / distance, 0), 1);
    window.scrollTo({ top: section.offsetTop + progress * distance, behavior: "instant" });
  };

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`reel ${pinned ? "is-pinned" : ""}`}
      data-scene="5"
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
      aria-labelledby="projects-title"
      onFocus={revealFocused}
    >
      <div className="reel-sticky">
        <div className="shell reel-head">
          <div>
            <p className="kicker"><span className="kicker-dot" /> {story.projectsKicker}</p>
            <h2 id="projects-title" className="section-title">{projects.title}</h2>
          </div>
          {pinned && <p className="reel-hint">{story.projectsHint} →</p>}
        </div>

        <motion.div ref={trackRef} className="reel-track" style={pinned ? { x } : undefined}>
          {projects.items.map((project, i) => {
            const [intro, ...rest] = project.longDescription.split("\n\n");
            const bullets = rest.join("\n").split("\n").filter((line) => line.startsWith("• ")).map((line) => line.slice(2));
            return (
              <article key={project.id} className="case">
                <header className="case-head">
                  <span className="case-index">P/{pad(i + 1)}</span>
                  {project.badge && <span className="case-badge">{project.badge}</span>}
                </header>
                <h3 className="case-title">
                  {PROJECT_PAGES.includes(project.id) ? (
                    <Link href={localePath(locale, `/projects/${project.id}`)}>{project.description}</Link>
                  ) : (
                    project.description
                  )}
                </h3>
                <p className="case-intro">{intro}</p>

                {project.image ? (
                  <button
                    type="button"
                    className="case-media"
                    onClick={() => setPreview({ src: project.image!, alt: project.description })}
                    aria-label={`${story.openImage}: ${project.description}`}
                    data-hint={getZoom()}
                  >
                    <Image src={project.image} alt="" width={640} height={360} sizes="(min-width: 900px) 520px, 90vw" />
                  </button>
                ) : (
                  <ul className="case-bullets">
                    {bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}

                <footer className="case-foot">
                  <ul className="chips" aria-label="Technologies">
                    {project.tech.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                  <div className="case-links">
                    {PROJECT_PAGES.includes(project.id) && (
                      <Link href={localePath(locale, `/projects/${project.id}`)}>{story.caseDetails}</Link>
                    )}
                    {project.links.demoUrl && (
                      <a href={project.links.demoUrl} target="_blank" rel="noopener noreferrer">{project.links.demo}</a>
                    )}
                    {project.links.githubUrl && (
                      <a href={project.links.githubUrl} target="_blank" rel="noopener noreferrer">{project.links.github}</a>
                    )}
                    {project.links.diagramUrl && (
                      <a href={project.links.diagramUrl} target="_blank" rel="noopener noreferrer">{project.links.diagram}</a>
                    )}
                    {project.links.closed && <span className="case-closed">{project.links.closed}</span>}
                  </div>
                </footer>
              </article>
            );
          })}
        </motion.div>

        {pinned && (
          <div className="shell reel-progress" aria-hidden="true">
            <motion.span style={{ scaleX: scrollYProgress }} />
          </div>
        )}
      </div>

      <ImageLightbox
        src={preview?.src ?? null}
        alt={preview?.alt ?? ""}
        closeLabel={story.closeImage}
        onClose={() => setPreview(null)}
      />
    </section>
  );
}

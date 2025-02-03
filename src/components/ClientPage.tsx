"use client";
import { useState, useEffect, useRef } from "react";
import "@/styles/main.css";
import { motion, AnimatePresence } from "framer-motion";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Image from "next/image";
import { useTranslation } from "@/context/LanguageContext";
import { Milestone } from "@/language/config";
import HeroLinks from "./HeroLinks";

export default function ClientPage() {
  const { getProjects, getHero, getSkills, getAbout, getContact, getZoom } =
    useTranslation();

  const [text, setText] = useState("");
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { projects } = getProjects(); // { title: string; items: {}[] }
  const hero = getHero();
  const skills = getSkills();
  const about = getAbout();
  const contact = getContact();
  const zoomText = getZoom();

  const handleImageClick = (imageSrc: string) => {
    setModalImage(imageSrc);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  };

  const handleModalClose = () => {
    setModalImage(null);
    document.documentElement.style.overflow = "unset";
    document.body.style.overflow = "auto";

    // Reset zoom
    setScale(1);

    // Reset position
    setPosition({ x: 0, y: 0 });

    // Reset image position
    if (imageRef.current) {
      imageRef.current.style.transform = "none";
    }

    // Reset container position
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
      containerRef.current.scrollLeft = 0;
    }
  };

  const handleZoom = (e: React.MouseEvent<HTMLImageElement>) => {
    const newScale = scale === 1 ? 2 : 1;
    const rect = e.currentTarget.getBoundingClientRect();

    // Check if click is inside image bounds
    const isInsideImage =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!isInsideImage) {
      return; // Don't zoom if clicked outside image
    }

    if (newScale === 1) {
      // Reset position when zooming out
      setPosition({ x: 0, y: 0 });
    } else {
      // Calculate relative position within image
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate center offset
      setPosition({
        x: rect.width / 2 - x,
        y: rect.height / 2 - y,
      });
    }

    setScale(newScale);
  };

  const handleDrag = (e: React.MouseEvent<HTMLImageElement>) => {
    if (scale > 1 && e.buttons === 1) {
      setPosition((prev) => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));
    }
  };

  useEffect(() => {
    let currentIndex = isDeleting ? hero.skills[currentSkillIndex].length : 0;
    const currentSkill = hero.skills[currentSkillIndex];

    const interval = setInterval(() => {
      if (!isDeleting && currentIndex <= currentSkill.length) {
        setText(currentSkill.slice(0, currentIndex));
        currentIndex++;
      } else if (isDeleting && currentIndex >= 0) {
        setText(currentSkill.slice(0, currentIndex));
        currentIndex--;
      } else {
        clearInterval(interval);
        if (isDeleting) {
          setCurrentSkillIndex((prev) => (prev + 1) % hero.skills.length);
        }
        setIsDeleting(!isDeleting);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentSkillIndex, isDeleting, hero.skills]);

  return (
    <>
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen" id="hero">
        <div className="hero-container">
          <div className="hero-name-container">
            <h1 className="hero-name">{hero.name}</h1>
          </div>
          <div className="hero-caption-container">
            <h1 className="hero-caption">{text}</h1>
          </div>

          {/* Social & Resume Links */}
          <HeroLinks
            resumeButton={hero.resumeButton}
            resumeurl={hero.resume_url}
            socials={hero.socials}
          />
        </div>
      </div>

      {/* About Section */}
      <div className="about-section" id="about">
        <div className="about-container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="about-title"
          >
            {about.title}
          </motion.h2>

          <div className="about-content">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="about-image-container"
            >
              <Image
                src="/me.jpg"
                alt="Ricardo"
                className="about-image"
                width={400}
                height={400}
                quality={95}
                priority
              />
            </motion.div>
            <div className="about-text-container">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="milestones-container"
              >
                <h3 className="milestones-title">{about.milestones.title}</h3>
                <div className="timeline">
                  {about.milestones.items.map(
                    (milestone: Milestone, index: number) => (
                      <div key={index} className="timeline-item">
                        <motion.div
                          className={`timeline-content ${
                            milestone.link ? "certificate" : ""
                          }`}
                          initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          <span className="timeline-date">
                            {milestone.date}
                          </span>
                          <h4>{milestone.title}</h4>
                          <p>{milestone.description}</p>
                          {milestone.link && (
                            <a
                              href={milestone.url}
                              className="certificate-link"
                            >
                              {milestone.link}
                            </a>
                          )}
                        </motion.div>
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <SkillsSection {...skills} />

      {/* Projects Section */}
      <div className="projects-section" id="projects">
        <div className="projects-container">
          <motion.h2 className="projects-title">{projects.title}</motion.h2>
          <div className="projects-grid">
            {projects.items.map((project, index: number) => (
              <motion.div
                key={index}
                className={`project-card ${
                  project.badge ? "professional" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
              >
                <div className="project-content">
                  <h3>{project.description}</h3>
                  {project.badge && (
                    <div className="professional-badge">{project.badge}</div>
                  )}
                  {project.image && (
                    <div
                      className="project-image-container"
                      onClick={() => handleImageClick(project.image!)}
                      data-text-zoom={zoomText}
                    >
                      <Image
                        width={400}
                        height={300}
                        src={project.image}
                        alt={`${project.description} Preview`}
                        className="project-image"
                        onClick={() => handleImageClick(project.image!)}
                      />
                    </div>
                  )}
                  <br />
                  <p>{project.description}</p>
                  {project.longDescription && <p>{project.longDescription}</p>}
                  <div className="tech-stack">
                    {project.tech.map((tech: string, i: number) => (
                      <span key={i}>{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.links.demo && (
                      <a
                        href={project.links.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.links.demo}
                        <div className="shine-effect" />
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.links.github}
                        <div className="shine-effect" />
                      </a>
                    )}
                    {project.links.closed && (
                      <span className="closed-source">
                        {project.links.closed}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection {...contact} />

      {/* Modal for the image zoom */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleModalClose}
          >
            <motion.div
              className="modal-image-container"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleModalClose}
                className="modal-close-button"
                aria-label="Close modal"
              >
                x
              </button>

              <div className="modal-image-wrapper">
                <Image
                  ref={imageRef}
                  src={modalImage}
                  alt="Project preview"
                  className="modal-image"
                  width={1200}
                  height={800}
                  quality={100}
                  style={{
                    transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                    transition: scale === 1 ? "transform 0.3s ease" : "none",
                    cursor: scale === 1 ? "zoom-in" : "grab",
                  }}
                  onClick={handleZoom}
                  onMouseMove={handleDrag}
                  draggable={false}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

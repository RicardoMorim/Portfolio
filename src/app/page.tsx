"use client";
import { useState, useEffect } from "react";
import "@/styles/main.css";
import { motion, AnimatePresence } from "framer-motion";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Image from "next/image";
import { useTranslation } from "@/context/LanguageContext";
import { Milestone } from "@/language/config";


export default function Home() {
	const { getProjects, getHero, getSkills, getAbout, getContact } = useTranslation();

	const [text, setText] = useState("");
	const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);
	const [modalImage, setModalImage] = useState<string | null>(null);

	const {projects} = getProjects(); // Type: { title: string; items: {}[] }
	const hero = getHero(); // Type: Hero
	const skills = getSkills(); // Type: Skills
	const about = getAbout();
	const contact = getContact()

	const handleThumbnailMouseEnter = (imageSrc: string) => {
		if (window.matchMedia("(max-width: 768px)").matches) return;
		setModalImage(imageSrc);
	};

	const handleModalMouseLeave = (e: React.MouseEvent) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const isMouseOutsideModal =
			e.clientY < rect.top ||
			e.clientY > rect.bottom ||
			e.clientX < rect.left ||
			e.clientX > rect.right;

		if (isMouseOutsideModal) {
			setModalImage(null);
		}
	};
	const handleImageClick = (imageSrc: string) => {
		if (window.matchMedia("(max-width: 768px)").matches) {
			setModalImage(imageSrc);
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
									{about.milestones.items.map((milestone: Milestone, index: number) => (
										<div key={index} className="timeline-item">
											<motion.div
												className={`timeline-content ${milestone.link ? 'certificate' : ''}`}
												initial={{ opacity: 0, x: -50 }}
												whileInView={{ opacity: 1, x: 0 }}
												transition={{ delay: 0.2 + (index * 0.1) }}
											>
												<span className="timeline-date">{milestone.date}</span>
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
									))}
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
					<motion.h2 className="projects-title">
						{projects.title}
					</motion.h2>
					<div className="projects-grid">
						{projects.items.map((project, index: number) => (
							<motion.div
								key={index}
								className={`project-card ${project.badge ? 'professional' : ''}`}
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
										<div className="project-image-container">
											<Image
												width={400}
												height={300}
												src={project.image}
												alt={`${project.description} Preview`}
												className="project-image"
												onMouseEnter={() => handleThumbnailMouseEnter(project.image!)}
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
											</a>
										)}
										{project.links.github && (
											<a
												href={project.links.githubUrl}
												target="_blank"
												rel="noopener noreferrer"
											>
												{project.links.github}
											</a>
										)}
										{project.links.closed && (
											<span className="closed-source">{project.links.closed}</span>
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
						onClick={() => setModalImage(null)}
					>
						<motion.div
							className="modal-image-container"
							initial={{ scale: 0.5 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0.5 }}
							transition={{ duration: 0.2 }}
							onMouseLeave={handleModalMouseLeave}
							onClick={(e) => e.stopPropagation()}
						>
							<Image
								src={modalImage}
								alt="Project preview"
								className="modal-image"
								width={1200}
								height={800}
								quality={100}

							/>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

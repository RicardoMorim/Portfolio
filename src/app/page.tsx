'use client'
import { useState, useEffect, useMemo } from "react";
import "@/styles/main.css";
import { motion, AnimatePresence } from "framer-motion";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Image from 'next/image';

export default function Home() {
	const [text, setText] = useState("");
	const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);
	const [modalImage, setModalImage] = useState<string | null>(null);

	const handleThumbnailMouseEnter = (imageSrc: string) => {
		if (window.matchMedia('(max-width: 768px)').matches) return;
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
		if (window.matchMedia('(max-width: 768px)').matches) {
			setModalImage(imageSrc);
		}
	};


	const skills = useMemo(() => [
		"Software Developer",
		"Full Stack Developer",
		"Frontend Developer",
		"Backend Developer",
		"Database Engineer",
		"API Developer",
		"Software Architect"
	], []);

	useEffect(() => {
		let currentIndex = isDeleting ? text.length : 0;
		const currentSkill = skills[currentSkillIndex];

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
					setCurrentSkillIndex((prev) => (prev + 1) % skills.length);
				}
				setIsDeleting(!isDeleting);
			}
		}, 100);

		return () => clearInterval(interval);
	}, [currentSkillIndex, isDeleting, skills, text]);

	return (
		<>
			{/* Hero Section */}
			<div className="flex items-center justify-center min-h-screen" id="home">
				<div className="hero-container">
					<div className="hero-name-container">
						<h1 className="hero-name">
							RICARDO
						</h1>
					</div>

					<div className="hero-caption-container">
						<h1 className="hero-caption">
							{text}
						</h1>
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
						My Programming Journey
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
								<h3 className="milestones-title">Key Milestones</h3>

								<div className="timeline">
									{/* Milestone 1 */}
									<div className="timeline-item">
										<motion.div
											className="timeline-content"
											initial={{ opacity: 0, x: -50 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.2 }}
										>
											<span className="timeline-date">2018</span>
											<h4>Programming Journey Begins</h4>
											<p>Inspired by a cousin&apos;s C-based card game project.</p>
										</motion.div>
									</div>

									{/* Milestone 2 */}
									<div className="timeline-item">
										<motion.div
											className="timeline-content"
											initial={{ opacity: 0, x: -50 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.3 }}
										>
											<span className="timeline-date">2019</span>
											<h4>Grasshopper & CodinGame</h4>
											<p>Completed Grasshopper and started solving challenges on CodinGame.</p>
										</motion.div>
									</div>

									{/* Milestone 3 */}
									<div className="timeline-item">
										<motion.div
											className="timeline-content certificate"
											initial={{ opacity: 0, x: -50 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.4 }}
										>
											<span className="timeline-date">2021</span>
											<h4>CS50X Certificate</h4>
											<p>Completed Harvard&apos;s Introduction to Computer Science.</p>
											<a href="https://certificates.cs50.io/9a13ae2c-7f89-4ffe-a5c4-9e7e6bcadab2.pdf?size=letter" className="certificate-link">View Certificate →</a>
										</motion.div>
									</div>

									{/* Milestone 4 */}
									<div className="timeline-item">
										<motion.div
											className="timeline-content certificate"
											initial={{ opacity: 0, x: -50 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.5 }}
										>
											<span className="timeline-date">2023</span>
											<h4>Front-End Development with React</h4>
											<p>Completed the University of Hong Kong&apos;s course on React development. </p><p>Built a restaurant website with json server to keep track of reviews.</p>
											<a href="https://restauranteconfusion.vercel.app/home" className="certificate-link">View Demo →</a>
										</motion.div>
									</div>

									{/* Milestone 5 */}
									<div className="timeline-item">
										<motion.div
											className="timeline-content certificate"
											initial={{ opacity: 0, x: -50 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.6 }}
										>
											<span className="timeline-date">2023</span>
											<h4>React + Firebase Course</h4>
											<p>Built a real-time blog with user management during this course.</p>
											<a href="https://blogricardo.vercel.app/" className="certificate-link">View Demo →</a>
										</motion.div>
									</div>

									{/* Milestone 6 */}
									<div className="timeline-item">
										<motion.div
											className="timeline-content certificate"
											initial={{ opacity: 0, x: -50 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.7 }}
										>
											<span className="timeline-date">2023/2024</span>
											<h4>CS50AI Certificate</h4>
											<p>Completed Harvard&apos;s AI course with Python.</p>
											<a href="https://certificates.cs50.io/3ea075ca-3cac-49e2-be29-281d46d5ba94.pdf?size=letter" className="certificate-link">View Certificate →</a>
										</motion.div>
									</div>

									{/* Milestone 7 */}
									<div className="timeline-item">
										<motion.div
											className="timeline-content"
											initial={{ opacity: 0, x: -50 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.8 }}
										>
											<span className="timeline-date">Present</span>
											<h4>Software Engineering Student</h4>
											<p>Enrolled at ISEP and building personal projects.</p>
										</motion.div>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</div>


			{/* Skills Section */}
			<SkillsSection />

			{/* Projects Section */}
			<div className="projects-section" id="projects">
				<div className="projects-container">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						className="projects-title"
					>
						Featured Projects
					</motion.h2>

					<div className="projects-grid">
						{/* Blog Project */}
						<motion.div
							className="project-card"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							whileHover={{ y: -10 }}
						>
							<div className="project-content">
								<h3>Blog Platform</h3>
								<div className="project-image-container">
									<Image
										width={400}
										height={300}
										src="/blog.jpeg"
										alt="Blog Platform Preview"
										className="project-image"
										onMouseEnter={() => handleThumbnailMouseEnter("/blog.jpeg")}
										onClick={() => handleImageClick("/blog.jpeg")}
									/>

								</div>
								<p>Real-time blog with user management and CRUD operations</p>
								<div className="tech-stack">
									<span>React</span>
									<span>Firebase</span>
								</div>
								<div className="project-links">
									<a href="https://blogricardo.vercel.app/" target="_blank" rel="noopener noreferrer">Live Demo →</a>
									<a href="https://github.com/yourusername/blog-project" target="_blank" rel="noopener noreferrer">GitHub →</a>
								</div>
							</div>
						</motion.div>

						{/* Restaurant Project */}
						<motion.div
							className="project-card"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							whileHover={{ y: -10 }}
						>
							<div className="project-content">
								<h3>Ristorante Con Fusion</h3>
								<div className="project-image-container">
									<Image
										width={400}
										height={300}
										src="/ristorante.jpeg"
										alt="ristorante con fusion Preview"
										className="project-image"
										onMouseEnter={() => handleThumbnailMouseEnter("/ristorante.jpeg")}
										onClick={() => handleImageClick("/ristorante.jpeg")}
									/>

								</div>
								<p>Restaurant website with review system and database usage to fetch data</p>
								<div className="tech-stack">
									<span>React</span>
									<span>JSON Server</span>
								</div>
								<div className="project-links">
									<a href="https://restauranteconfusion.vercel.app/home" target="_blank" rel="noopener noreferrer">Live Demo →</a>
									<a href="https://github.com/yourusername/restaurant-project" target="_blank" rel="noopener noreferrer">GitHub →</a>
								</div>
							</div>
						</motion.div>

						{/* Dating App Project */}
						<motion.div
							className="project-card professional"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							whileHover={{ y: -10 }}
						>
							<div className="project-content">
								<h3>Match Dinner Mondays</h3>
								<div className="professional-badge">Professional Work</div>
								<div className="project-image-container">
									<Image
										width={400}
										height={300}
										src="/matchdinner.jpeg"
										alt="matchdinnermondays Preview"
										className="project-image"
										onMouseEnter={() => handleThumbnailMouseEnter("/matchdinner.jpeg")}
										onClick={() => handleImageClick("/matchdinner.jpeg")}
									/>

								</div>
								<p>Dating platform with real-time chat functionality.</p>
								<div className="tech-stack">
									<span>React</span>
									<span>Firebase</span>
									<span>Real-time DB</span>
								</div>
								<div className="project-links">
									<a href="your-demo-link" target="_blank" rel="noopener noreferrer">Live Demo →</a>
									<span className="closed-source">Closed Source Project</span>
								</div>
							</div>
						</motion.div>

						{/* Financial Data Project */}
						<motion.div
							className="project-card"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							whileHover={{ y: -10 }}
						>
							<div className="project-content">
								<h3>Stock Information</h3>
								<div className="project-image-container">
									<Image
										width={400}
										height={300}
										src="/stockinformation.jpeg"
										alt="Stock Information website Preview"
										className="project-image"
										onMouseEnter={() => handleThumbnailMouseEnter("/stockinformation.jpeg")}
										onClick={() => handleImageClick("/stockinformation.jpeg")}
									/>

								</div>
								<p>Financial data platform with real-time updates and portfolio management</p>
								<div className="tech-stack">
									<span>Next.js</span>
									<span>MongoDB</span>
									<span>External APIs</span>
								</div>
								<div className="project-links">
									<a href="your-demo-link" target="_blank" rel="noopener noreferrer">Live Demo →</a>
									<a href="your-github-link" target="_blank" rel="noopener noreferrer">GitHub →</a>

								</div>
							</div>
						</motion.div>

						{/* Chess AI Project */}
						<motion.div
							className="project-card"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							whileHover={{ y: -10 }}
						>
							<div className="project-content">
								<h3>Chess AI Neural Network</h3>
								<p>Neural network-based chess AI trained on 50,000 games</p>
								<p>My PC is not powerfull enough to train it better, but for now, it plays good in the early game but uses random moves in the late game.</p>
								<div className="tech-stack">
									<span>Python</span>
									<span>TensorFlow</span>
									<span>PyTorch</span>
								</div>
								<div className="project-links">
									<a href="your-github-link" target="_blank" rel="noopener noreferrer">GitHub →</a>
								</div>
							</div>
						</motion.div>

						{/* LAPR2 ISEP Project */}
						<motion.div
							className="project-card"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							whileHover={{ y: -10 }}
						>
							<div className="project-content">
								<h3>Garden Management App</h3>
								<div className="project-image-container">
									<Image
										width={400}
										height={300}
										src="/lapr2.jpeg"
										alt="Stock Information website Preview"
										className="project-image"
										onMouseEnter={() => handleThumbnailMouseEnter("/lapr2.jpeg")}
										onClick={() => handleImageClick("/lapr2.jpeg")}
									/>

								</div>
								<p>An app made in Java to help companies manage their associates and their cars/machines to schedule tasks to manage their gardens.</p>
								<div className="tech-stack">
									<span>Java</span>
									<span>Maven</span>
									<span>JavaFX</span>
								</div>
								<div className="project-links">
									<a href="your-github-link" target="_blank" rel="noopener noreferrer">GitHub →</a>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</div>

			{/* Contact Section */}
			<ContactSection />


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
import {
	FaReact, FaNodeJs, FaPython, FaJava, FaGithub, FaDocker,
	FaTerminal, FaGit, FaBook
} from 'react-icons/fa';
import { TbHierarchy } from 'react-icons/tb';
import {
	SiTypescript, SiJavascript, SiHtml5, SiCss3, SiTailwindcss,
	SiNextdotjs, SiFirebase, SiMongodb, SiPython
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { Skills } from "@/language/config"

export default function SkillsSection(skills: Skills) {


	const skillCategories = {
		frontend: [
			{ name: skills.frontend.react, icon: <FaReact className="skill-icon" /> },
			{ name: skills.frontend.nextjs, icon: <SiNextdotjs className="skill-icon" /> },
			{ name: skills.frontend.typescript, icon: <SiTypescript className="skill-icon" /> },
			{ name: skills.frontend.javascript, icon: <SiJavascript className="skill-icon" /> },
			{ name: skills.frontend.html, icon: <SiHtml5 className="skill-icon" /> },
			{ name: skills.frontend.css, icon: <SiCss3 className="skill-icon" /> },
			{ name: skills.frontend.tailwind, icon: <SiTailwindcss className="skill-icon" /> },
		],
		backend: [
			{ name: skills.backend.nodejs, icon: <FaNodeJs className="skill-icon" /> },
			{ name: skills.backend.python, icon: <FaPython className="skill-icon" /> },
			{ name: skills.backend.java, icon: <FaJava className="skill-icon" /> },
			{ name: skills.backend.api, icon: <TbApi className="skill-icon" /> },
		],
		database: [
			{ name: skills.database.sql, icon: <AiOutlineConsoleSql className="skill-icon" /> },
			{ name: skills.database.mongodb, icon: <SiMongodb className="skill-icon" /> },
			{ name: skills.database.firebase, icon: <SiFirebase className="skill-icon" /> },
		],
		tools: [
			{ name: skills.tools.git, icon: <FaGit className="skill-icon" /> },
			{ name: skills.tools.github, icon: <FaGithub className="skill-icon" /> },
			{ name: skills.tools.docker, icon: <FaDocker className="skill-icon" /> },
			{ name: skills.tools.terminal, icon: <FaTerminal className="skill-icon" /> },
		],
		concepts: [
			{ name: skills.concepts.oop, icon: <FaJava className="skill-icon" /> },
			{ name: skills.concepts.functional, icon: <SiPython className="skill-icon" /> },
			{ name: skills.concepts.documentation, icon: <FaBook className="skill-icon" /> },
			{ name: skills.concepts.design, icon: <TbHierarchy className="skill-icon" /> },
		]
	};

	return (
		<div className="skills-section" id="skills">
			<div className="skills-container">
				<h2 className="skills-title">{skills.title}</h2>
				<div className="skills-grid">
					{Object.entries(skillCategories).map(([category, s]) => (
						<div key={category} className="skill-category">
							<h3 className="category-title">
								{skills.categories[category as keyof typeof skills.categories]}
							</h3>
							<div className="skills-list">
								{s.map((skill, index) => (
									<div key={index} className="skill-tag">
										{skill.icon}
										<span>{skill.name}</span>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
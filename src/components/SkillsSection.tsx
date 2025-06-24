import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiSpring,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { Skills } from "@/language/config";

export default function SkillsSection(skills: Skills) {
  const skillCategories = {
    frontend: [
      { name: skills.frontend.react, icon: <FaReact className="skill-icon" /> },
      {
        name: skills.frontend.nextjs,
        icon: <SiNextdotjs className="skill-icon" />,
      },
      {
        name: skills.frontend.typescript,
        icon: <SiTypescript className="skill-icon" />,
      },
      {
        name: skills.frontend.javascript,
        icon: <SiJavascript className="skill-icon" />,
      },
      {
        name: skills.frontend.tailwind,
        icon: <SiTailwindcss className="skill-icon" />,
      },
    ],
    backend: [
      {
        name: skills.backend.nodejs,
        icon: <FaNodeJs className="skill-icon" />,
      },
      { name: skills.backend.api, icon: <TbApi className="skill-icon" /> },
      {
        name: skills.backend.SpringBoot,
        icon: <SiSpring className="skill-icon" />,
      },
    ],
    database: [
      {
        name: skills.database.PostgreSQL,
        icon: <SiPostgresql className="skill-icon" />,
      },
      {
        name: skills.database.mongodb,
        icon: <SiMongodb className="skill-icon" />,
      },
      {
        name: skills.database.firebase,
        icon: <SiFirebase className="skill-icon" />,
      },
    ],
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

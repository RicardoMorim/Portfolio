import { FaNodeJs, FaDocker, FaAws, FaJava } from "react-icons/fa";
import {
  SiSpringboot,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiGithubactions,
  SiDotnet
} from "react-icons/si";
import { Skills } from "@/language/config";

export default function SkillsSection(skills: Skills) {
  const skillCategories = {
    backend: [
      { name: skills.backend.springBoot, icon: <SiSpringboot className="skill-icon" /> },
      {
        name: skills.backend.nodeJs,
        icon: <FaNodeJs className="skill-icon" />,
      },
      {
        name: skills.backend.java,
        icon: <FaJava className="skill-icon" />,
      },
      {
        name: skills.backend.dotNet,
        icon: <SiDotnet className="skill-icon" />,
      },
    ],
    cloud_DevOps: [
      {
        name: skills.cloud_DevOps.docker,
        icon: <FaDocker className="skill-icon" />,
      },
      { 
        name: skills.cloud_DevOps.aws, 
        icon: <FaAws className="skill-icon" /> 
      },
      {
        name: skills.cloud_DevOps.ci_cd,
        icon: <SiGithubactions className="skill-icon" />,
      },
    ],
    database: [
      {
        name: skills.database.postgreSQL,
        icon: <SiPostgresql className="skill-icon" />,
      },
      {
        name: skills.database.mongoDB,
        icon: <SiMongodb className="skill-icon" />,
      },
      {
        name: skills.database.redis,
        icon: <SiRedis className="skill-icon" />,
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

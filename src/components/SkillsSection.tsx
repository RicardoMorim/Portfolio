import { 
  FaReact, FaNodeJs, FaPython, FaJava, FaGithub, FaDocker, 
  FaTerminal, FaGit 
} from 'react-icons/fa';
import { 
  SiTypescript, SiJavascript, SiHtml5, SiCss3, SiTailwindcss, 
  SiNextdotjs, SiFirebase, SiMongodb 
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { AiOutlineConsoleSql } from 'react-icons/ai';

export default function SkillsSection() {
  const skillCategories = {
    frontend: [
      { name: 'React', icon: <FaReact className="skill-icon" /> },
      { name: 'Next.js', icon: <SiNextdotjs className="skill-icon" /> },
      { name: 'TypeScript', icon: <SiTypescript className="skill-icon" /> },
      { name: 'JavaScript', icon: <SiJavascript className="skill-icon" /> },
      { name: 'HTML5', icon: <SiHtml5 className="skill-icon" /> },
      { name: 'CSS3', icon: <SiCss3 className="skill-icon" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="skill-icon" /> },
    ],
    backend: [
      { name: 'Node.js', icon: <FaNodeJs className="skill-icon" /> },
      { name: 'Python', icon: <FaPython className="skill-icon" /> },
      { name: 'Java', icon: <FaJava className="skill-icon" /> },
      { name: 'REST APIs', icon: <TbApi className="skill-icon" /> },
    ],
    database: [
      { name: 'SQL', icon: <AiOutlineConsoleSql className="skill-icon" /> },
      { name: 'MongoDB', icon: <SiMongodb className="skill-icon" /> },
      { name: 'Firebase', icon: <SiFirebase className="skill-icon" /> },
    ],
    tools: [
      { name: 'Git', icon: <FaGit className="skill-icon" /> },
      { name: 'GitHub', icon: <FaGithub className="skill-icon" /> },
      { name: 'Docker', icon: <FaDocker className="skill-icon" /> },
      { name: 'Terminal', icon: <FaTerminal className="skill-icon" /> },
    ],
  };

  return (
    <div className="skills-section" id="skills">
      <div className="skills-container">
        <h2 className="skills-title">Technical Skills</h2>
        <div className="skills-grid">
          {Object.entries(skillCategories).map(([category, skills]) => (
            <div key={category} className="skill-category">
              <h3 className="category-title">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <div className="skills-list">
                {skills.map((skill, index) => (
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
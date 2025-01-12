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
import { useTranslation } from '@/context/LanguageContext';

export default function SkillsSection() {
  const { t } = useTranslation();

  const skillCategories = {
    frontend: [
      { name: t('skills.frontend.react'), icon: <FaReact className="skill-icon" /> },
      { name: t('skills.frontend.nextjs'), icon: <SiNextdotjs className="skill-icon" /> },
      { name: t('skills.frontend.typescript'), icon: <SiTypescript className="skill-icon" /> },
      { name: t('skills.frontend.javascript'), icon: <SiJavascript className="skill-icon" /> },
      { name: t('skills.frontend.html'), icon: <SiHtml5 className="skill-icon" /> },
      { name: t('skills.frontend.css'), icon: <SiCss3 className="skill-icon" /> },
      { name: t('skills.frontend.tailwind'), icon: <SiTailwindcss className="skill-icon" /> },
    ],
    backend: [
      { name: t('skills.backend.nodejs'), icon: <FaNodeJs className="skill-icon" /> },
      { name: t('skills.backend.python'), icon: <FaPython className="skill-icon" /> },
      { name: t('skills.backend.java'), icon: <FaJava className="skill-icon" /> },
      { name: t('skills.backend.api'), icon: <TbApi className="skill-icon" /> },
    ],
    database: [
      { name: t('skills.database.sql'), icon: <AiOutlineConsoleSql className="skill-icon" /> },
      { name: t('skills.database.mongodb'), icon: <SiMongodb className="skill-icon" /> },
      { name: t('skills.database.firebase'), icon: <SiFirebase className="skill-icon" /> },
    ],
    tools: [
      { name: t('skills.tools.git'), icon: <FaGit className="skill-icon" /> },
      { name: t('skills.tools.github'), icon: <FaGithub className="skill-icon" /> },
      { name: t('skills.tools.docker'), icon: <FaDocker className="skill-icon" /> },
      { name: t('skills.tools.terminal'), icon: <FaTerminal className="skill-icon" /> },
    ],
  };

  return (
    <div className="skills-section" id="skills">
      <div className="skills-container">
        <h2 className="skills-title">{t('skills.title')}</h2>
        <div className="skills-grid">
          {Object.entries(skillCategories).map(([category, skills]) => (
            <div key={category} className="skill-category">
              <h3 className="category-title">
                {t(`skills.categories.${category}`)}
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
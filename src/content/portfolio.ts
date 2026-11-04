import { en } from "@/language/translations/en";

export const contentUpdated = "2026-11-03";
export const focusAreas = ["AI Engineering", "AI Security", "Agentic Workflows", "Application Security", "Vulnerability Management", "SDLC Automation"];
export const education = [
  { degree: "Master’s in Artificial Intelligence Engineering", institution: "Instituto Superior de Engenharia do Porto (ISEP)", status: "In Progress", start_year: 2026, duration: "2026–present" },
  { degree: "BSc in Informatics Engineering", institution: "Instituto Superior de Engenharia do Porto (ISEP)", status: "Completed", start_year: 2023, end_year: 2026, duration: "2023–2026" },
  { certification: "AWS Certified Solutions Architect – Associate", status: "Completed" },
  ...en.about.milestones.items.slice(3).map((item) => ({ certification: item.title, date: item.date, credential_url: item.url, status: "Completed" })),
];

export const workExperience = en.careerHighlights.items.map((item) => ({
  id: item.id,
  position: item.title.split(" · ")[1],
  organization: item.organization,
  ...(item.date ? { duration: item.date } : {}),
  description: item.description,
  key_achievements: item.bullets ?? [],
}));

export const featuredProjects = en.projects.items.map((item) => ({
  id: item.id,
  name: item.description,
  type: item.badge,
  description: item.longDescription.split("\n\n")[0],
  technical_highlights: item.longDescription.split("\n").filter((line) => line.startsWith("• ")).map((line) => line.slice(2)),
  technologies: item.tech,
  backend_technologies: item.tech,
  ...(item.links.githubUrl ? { repository: item.links.githubUrl } : {}),
  ...(item.links.demoUrl ? { demo_url: item.links.demoUrl } : {}),
}));

export const profile = {
  name: "Ricardo Morim",
  title: "AI Software Engineer",
  subtitle: "AI Security",
  location: "Porto, Portugal",
  summary: en.hero.summary,
  current_role: { organization: "Critical Manufacturing", title: "AI Software Engineer", team: "Platform Engineering", department: "Research & Development", start_date: "2026-11" },
  expertise: focusAreas,
  achievements: [
    "Primary for AI Security and Vulnerability Management at Celfocus, coordinating members and tasks across both areas",
    "Built a React/FastAPI vulnerability management platform from scratch; the monthly report went from a full day of work to one click plus a review",
    "Built an automated PR reviewer, secure development skills and security-focused agentic workflows",
    "Main developer of InnovatWeb applications and the shared CI/CD platform used across 5 repositories",
  ],
  languages: { primary: ["Python", "TypeScript", "Java"], secondary: ["JavaScript", "C#", "SQL"] },
  technologies: {
    ai_security: ["PyTorch", "Local Models", "LLM Integration", "LiteLLM", "DAST", "Agentic Workflows"],
    backend_frameworks: ["FastAPI", "Spring Boot", "Node.js"],
    frontend: ["React", "Next.js", "TypeScript"],
    databases: ["PostgreSQL", "MongoDB", "Redis"],
    cloud_devops: ["AWS", "Terraform", "Docker", "GitHub Actions", "CI/CD"],
  },
  education,
  contact: {
    github: "https://github.com/RicardoMorim",
    linkedin: "https://www.linkedin.com/in/ricardo-morim-208368251/",
    portfolio: "https://www.ricardomorim.com/",
    resume: "https://www.ricardomorim.com/resume.pdf",
  },
  api_info: { version: "1.0", last_updated: contentUpdated, endpoints: { projects: "/api/projects", skills: "/api/skills", experience: "/api/experience", documentation: "/api/docs" } },
};

export const skills = {
  summary: "AI engineering, AI security, application security and software lifecycle automation",
  categories: en.skills.categories,
  programming_languages: profile.languages,
  core_backend_skills: { api_development: ["FastAPI", "Spring Boot", "Node.js"], security: ["Authentication", "Vulnerability Management", "DAST"] },
  backend_technologies: profile.technologies.backend_frameworks,
  database_technologies: profile.technologies.databases,
  cloud_devops: profile.technologies.cloud_devops,
  current_focus: focusAreas,
};

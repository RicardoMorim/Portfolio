import { Translations, Project, Milestone, Skills } from "@/language/config";

const projects: Project = {
  title: "Projects",
  items: [
    {
      description: "Production Auth Library",
      image: "/core_class_diagram_Auth.png",
      longDescription: "Published Spring Boot authentication library on Maven Central with zero-code integration.\n\n• CSRF protection and Redis-backed rate limiting\n• JWT security with OWASP compliance\n• Only 12ms request overhead\n• Benchmarked with 100k users:\n  - 22% query improvement\n  - 73x faster pagination\n• Full CI/CD with automated testing",
      tech: ["Java", "Spring Boot", "PostgreSQL", "Redis", "JWT", "GitHub Actions", "Maven"],
      badge: "Open Source Library",
      links: {
        github: "GitHub →",
        githubUrl: "https://github.com/RicardoMorim/auth-Provider/",
        diagram: "Architecture →",
        diagramUrl: "https://github.com/RicardoMorim/Auth-Provider/blob/main/docs/class-diagram/class%20diagram.svg"
      }
    },
    {
      description: "AI Resume Optimizer",
      image: "/resume_builder.png",
      longDescription: "AI-powered resume optimization using NVIDIA's Llama-3.1 Nemotron Ultra (253B parameters).\n\n• Engineered prompt optimization for consistent JSON responses\n• Reduced token consumption with structured scoring\n• 4 comprehensive evaluation criteria\n• Advanced error handling for reliable AI feedback\n• Optimized for professional resume enhancement",
      tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "LLM APIs", "Prompt Engineering"],
      badge: "AI Integration",
      links: {
        demo: "Live Demo →",
        demoUrl: "https://jobresumebuilder.vercel.app",
        closed: "Backend Architecture Private",
      },
    },
    {
      image: "/stockinformation.jpeg",
      description: "Real-time Stock Platform",
      longDescription: "High-performance stock portfolio tracker with advanced caching and API optimization.\n\n• Redis caching: 20+ seconds → sub-second load times\n• Parallel API processing across 4 financial data providers\n• Intelligent fallback strategies for data consistency\n• Real-time portfolio tracking and analytics\n• Optimized for high-frequency data updates",
      tech: ["Next.js", "Node.js", "MongoDB", "Redis", "Financial APIs", "Caching"],
      links: {
        demo: "Live Demo →",
        github: "GitHub →",
        demoUrl: "https://stockinformation.vercel.app/",
        githubUrl: "https://github.com/RicardoMorim/Stock_Information",
      },
    },
    {
      image: "/matchdinner.jpeg",
      description: "Match Dinner Mondays",
      badge: "Professional Work",
      longDescription: "Performance-optimized dating platform with advanced optimization techniques.\n\n• WebP compression: 3-5MB → ~200KB images\n• Lazy loading for improved mobile experience\n• SEO strategy achieving first-page Google rankings\n• PWA functionality for enhanced user engagement\n• Direct client collaboration with iterative development",
      tech: ["React", "Firebase", "Performance Optimization", "SEO", "PWA"],
      links: {
        demo: "Live Demo →",
        closed: "Professional Project",
        demoUrl: "https://matchdinnermondays.pt",
      },
    },
    {
      image: "/blog.jpeg",
      description: "Real-time Blog Platform",
      longDescription: "Full-stack blog platform with comprehensive real-time features.\n\n• Real-time updates and live content synchronization\n• User authentication and authorization system\n• Complete CRUD operations for content management\n• Firebase backend services integration\n• Responsive design for all devices",
      tech: ["React", "Firebase", "Real-time DB", "Authentication"],
      links: {
        demo: "Live Demo →",
        github: "GitHub →",
        demoUrl: "https://blogricardo.vercel.app",
        githubUrl: "https://github.com/RicardoMorim/Blog",
      },
    },
    {
      image: "/ristorante.jpeg",
      description: "Ristorante Con Fusion",
      longDescription: "Restaurant website developed during Udemy course focused on React fundamentals.\n\n• Modular and reusable React components\n• Redux Store for global state management\n• Rating and review system implementation\n• JSON database for restaurant information\n• Responsive interface for menu and comments",
      tech: ["React", "Redux", "JSON Server", "Bootstrap"],
      links: {
        demo: "Live Demo →",
        github: "GitHub →",
        demoUrl: "https://restauranteconfusion.vercel.app/home",
        githubUrl: "https://github.com/RicardoMorim/First-react-app",
      },
    },
  ],
};

const milestones: Milestone[] = [
  {
    date: "Present",
    title: "Software Engineering Student",
    description: "Focused on backend systems, cloud architecture, and building scalable applications.",
  },
  {
    date: "2025",
    title: "Software Engineering Internship at INESC TEC",
    description: "Developed AR indoor navigation Android prototype with extensible Python backend architecture. Delivered working MVP in 4 weeks with voice guidance and multi-floor navigation capabilities.",
    link: "INESC TEC →",
    url: "https://www.inesctec.pt/pt",
  },
  {
    date: "2025",
    title: "Production Library Published",
    description: "Published Spring Boot authentication library to Maven Central with comprehensive CI/CD pipeline, automated testing, and security scanning.",
  },
  {
    date: "2024",
    title: "Freelancing Project with Performance Optimization",
    description: "Created and Optimized Match Dinner Mondays platform, reducing image sizes by 95% and achieving sub-second load times through advanced compression techniques.",
  },
  {
    date: "2023/2024",
    title: "CS50AI Certificate",
    description: "Completed Harvard's AI course, focusing on machine learning algorithms and AI system architecture.",
    link: "View Certificate →",
    url: "https://certificates.cs50.io/3ea075ca-3cac-49e2-be29-281d46d5ba94.pdf?size=letter",
  },
  {
    date: "2023",
    title: "Backend Architecture Focus",
    description: "Transitioned focus to backend systems, API design, and database optimization through hands-on projects.",
  },
  {
    date: "2021",
    title: "CS50X Certificate",
    description: "Completed Harvard's Introduction to Computer Science, establishing strong foundation in algorithms and data structures.",
    link: "View Certificate →",
    url: "https://certificates.cs50.io/9a13ae2c-7f89-4ffe-a5c4-9e7e6bcadab2.pdf?size=letter",
  },
  {
    date: "2018",
    title: "Programming Journey Begins",
    description: "Started with system-level programming, inspired by performance-critical applications.",
  },
];

const skills: Skills = {
  title: "Technical Skills",
  categories: {
    backend: "Backend & APIs",
    cloud_DevOps: "Cloud & DevOps",
    database: "Database & Caching",
  },
  backend: {
    springBoot: "Spring Boot",
    nodeJs: "Node.js",
    java: "Java",
    dotNet: "ASP.NET",
  },
  cloud_DevOps: {
    docker: "Docker",
    aws: "AWS",
    ci_cd: "GitHub Actions",
  },
  database: {
    postgreSQL: "PostgreSQL",
    mongoDB: "MongoDB",
    redis: "Redis",
  },
};

export const en: Translations = {
  title: "My Portfolio",
  hero: {
    name: "RICARDO",
    skills: ["Backend Engineer", "Systems Architect"],
    resumeButton: "Resume",
    resume_url: "resume.pdf",
    socials: [
      { platform: "github", url: "https://github.com/RicardoMorim" },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/ricardo-morim-208368251/",
      },
    ],
  },
  about: {
    title: "My Programming Journey",
    milestones: {
      title: "Key Milestones",
      items: milestones,
    },
  },
  projects: projects,
  skills,
  contact: {
    title: "Get in Touch",
    subtitle: "Let's talk about everything!",
    description:
      "Feel free to reach out for collaborations or just a friendly hello.",
    email: "Email",
    location: "Location",
    form: {
      name: "Your Name",
      email: "Your Email",
      subject: "Subject",
      message: "Your Message",
      sending: "Sending...",
      send: "Send Message",
      success: "Message sent successfully!",
    },
  },
  footer: {
    brand: {
      name: "Ricardo Morim",
      role: "Backend Engineer",
      description:
        "Backend Engineer specialized in Spring Boot, system architecture, and backend applications.",
      location: "Porto, Portugal",
    },
    links: {
      title: "Quick Links",
      home: "Home",
      about: "About",
      projects: "Projects",
      contact: "Contact",
    },
    tech: {
      title: "Technologies Used",
    },
    contact: {
      title: "Get in Touch",
    },
    social: {
      github: "Visit GitHub Profile",
      linkedin: "Visit LinkedIn Profile",
    },
    copyright: `© ${new Date().getFullYear()} Ricardo Morim. All rights reserved.`,
  },
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    contact: "Contact",
    skills: "Skills",
  },
  theme: {
    light: "Light Mode",
    dark: "Dark Mode",
  },
  zoom: "Click to Zoom",
};

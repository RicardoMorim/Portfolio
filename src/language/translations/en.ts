import { Translations, Project, Milestone, Skills } from "@/language/config";

const projects: Project = {
  title: "Projects",
  items: [
    {
      image: "/blog.jpeg",
      description: "Blog Platform",
      longDescription:
        "Real-time blog with user management and CRUD operations",
      tech: ["React", "Firebase"],
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
      longDescription:
        "Restaurant website with review system and database usage to fetch data",
      tech: ["React", "JSON Server"],
      links: {
        demo: "Live Demo →",
        github: "GitHub →",
        demoUrl: "https://restauranteconfusion.vercel.app/home",
        githubUrl: "https://github.com/RicardoMorim/First-react-app",
      },
    },
    {
      image: "/matchdinner.jpeg",
      description: "Match Dinner Mondays",
      badge: "Professional Work",
      longDescription: "Dating platform with real-time chat functionality.",
      tech: ["React", "Firebase", "Real-time DB"],
      links: {
        demo: "Live Demo →",
        closed: "Closed Source Project",
        demoUrl: "https://matchdinnermondays.pt",
      },
    },
    {
      image: "/stockinformation.jpeg",
      description: "Stock Information",
      longDescription:
        "Financial data platform with real-time updates and portfolio management",
      tech: ["Next.js", "MongoDB", "External APIs"],
      links: {
        demo: "Live Demo →",
        github: "GitHub →",
        demoUrl: "https://stockinformation.vercel.app/",
        githubUrl: "https://github.com/RicardoMorim/Stock_Information",
      },
    },
    {
      description: "Resume Scorer",
      image: "/resume_builder.png",
      longDescription:
        "A platform to allow candidates score their resume, and to help them tailor resumes to specific jobs, and create a cover letter.",
      tech: ["Next.js", "TypeScript", "Node.js", "Tailwind CSS"],
      links: {
        github: "Live Demo →",
        demoUrl: "https://jobresumebuilder.vercel.app",
        closed: "Closed Source Project",
      },
    },
    {
      image: "/lapr2.jpeg",
      description: "Garden Management App",
      longDescription:
        "An app made in Java to help companies manage their associates and their cars/machines to schedule tasks to manage their gardens.",
      tech: ["Java", "Maven", "JavaFX"],
      links: {
        github: "GitHub →",
        githubUrl: "https://github.com/RicardoMorim/lapr2-ISEP-Project",
      },
    },
  ],
};

const milestones: Milestone[] = [
  {
    date: "Present",
    title: "Software Engineering Student",
    description: "Enrolled at ISEP and building personal projects.",
  },
  {
    date: "2023/2024",
    title: "CS50AI Certificate",
    description: "Completed Harvard's AI course with Python.",
    link: "View Certificate →",
    url: "https://certificates.cs50.io/3ea075ca-3cac-49e2-be29-281d46d5ba94.pdf?size=letter",
  },
  {
    date: "2023",
    title: "React + Firebase Course",
    description:
      "Built a real-time blog with user management during this course.",
  },
  {
    date: "2023",
    title: "Front-End Development with React",
    description: [
      "Completed the University of Hong Kong's course on React development.",
      " Built a restaurant website with JSON server to keep track of reviews.",
    ],
  },
  {
    date: "2021",
    title: "CS50X Certificate",
    description: "Completed Harvard's Introduction to Computer Science.",
    link: "View Certificate →",
    url: "https://certificates.cs50.io/9a13ae2c-7f89-4ffe-a5c4-9e7e6bcadab2.pdf?size=letter",
  },
  {
    date: "2019",
    title: "Grasshopper & CodinGame",
    description:
      "Completed Grasshopper, where I learned Javascript, and started solving coding challenges on online platforms.",
  },
  {
    date: "2018",
    title: "Programming Journey Begins",
    description: "Inspired by a cousin's C-based card game project.",
  },
];

const skills: Skills = {
  title: "Technical Skills",
  categories: {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
  },
  frontend: {
    react: "React.js",
    nextjs: "Next.js",
    typescript: "TypeScript",
    javascript: "JavaScript",
    tailwind: "Tailwind CSS",
  },
  backend: {
    nodejs: "Node.js",
    api: "REST APIs",
  },
  database: {
    sql: "SQL",
    mongodb: "MongoDB",
  },
};

export const en: Translations = {
  title: "My Portfolio",
  hero: {
    name: "RICARDO",
    skills: ["Full Stack Developer"],
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
      role: "Full Stack Developer",
      description:
        "Full Stack Developer specialized in React, Next.js, and TypeScript.",
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

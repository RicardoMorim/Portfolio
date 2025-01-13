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
        demoUrl: "blogricardo.vercel.app",
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
      description: "Chess AI Neural Network",
      longDescription:
        "Neural network-based chess AI trained on about 20,000 games\nMy PC is not powerful enough to train it better, but for now, it plays good in the early game but uses random moves in the late game.",
      tech: ["Python", "TensorFlow", "PyTorch"],
      links: {
        github: "GitHub →",
		githubUrl: "https://github.com/RicardoMorim/Chess-Engine",
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
    date: "2018",
    title: "Programming Journey Begins",
    description: "Inspired by a cousin's C-based card game project.",
  },
  {
    date: "2019",
    title: "Grasshopper & CodinGame",
    description:
      "Completed Grasshopper and started solving challenges on CodinGame.",
  },
  {
    date: "2021",
    title: "CS50X Certificate",
    description: "Completed Harvard's Introduction to Computer Science.",
  },
  {
    date: "2023",
    title: "Front-End Development with React",
    description: [
      "Completed the University of Hong Kong's course on React development.",
      "Built a restaurant website with json server to keep track of reviews.",
    ],
  },
  {
    date: "2023",
    title: "React + Firebase Course",
    description:
      "Built a real-time blog with user management during this course.",
  },
  {
    date: "2023/2024",
    title: "CS50AI Certificate",
    description: "Completed Harvard's AI course with Python.",
  },
  {
    date: "Present",
    title: "Software Engineering Student",
    description: "Enrolled at ISEP and building personal projects.",
  },
];

const skills: Skills = {
  title: "Technical Skills",
  categories: {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    tools: "Tools",
    concepts: "Core Concepts",
  },
  frontend: {
    react: "React",
    nextjs: "Next.js",
    typescript: "TypeScript",
    javascript: "JavaScript",
    html: "HTML5",
    css: "CSS3",
    tailwind: "Tailwind CSS",
  },
  backend: {
    nodejs: "Node.js",
    python: "Python",
    java: "Java",
    api: "REST APIs",
  },
  database: {
    sql: "SQL",
    mongodb: "MongoDB",
    firebase: "Firebase",
  },
  tools: {
    git: "Git",
    github: "GitHub",
    docker: "Docker",
    terminal: "Terminal",
  },
  concepts: {
    title: "Coneitos Fundamentais",
    oop: "Object-Oriented Programming",
    functional: "Functional Programming",
    documentation: "Software Documentation",
    design: "Software Design Patterns",
  },
};

export const en: Translations = {
  title: "My Portfolio",
  hero: {
    name: "RICARDO",
    skills: [
      "Software Developer",
      "Full Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "Database Engineer",
      "AI Enthusiast",
      "Software Architect",
      "Software Engineer",
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
      role: "Software Developer",
      description: "Building digital experiences with passion and precision.",
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
  },
  theme: {
    light: "Light Mode",
    dark: "Dark Mode",
  },
};

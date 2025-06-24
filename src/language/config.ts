export const defaultLocale = "en" as const;
export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];

export interface Milestone {
  date: string;
  title: string;
  description: string | string[];
  link?: string;
  url?: string;
}

export interface Project {
  title: string;
  items: {
    description: string;
    longDescription?: string;
    badge?: string;
    tech: string[];
    image?: string;
    links: {
      demo?: string;
      github?: string;
      closed?: string;
      demoUrl?: string;
      githubUrl?: string;
      diagram?: string;
      diagramUrl?: string;
    };
  }[];
}

export interface Skills {
  title: string;
  categories: {
    frontend: string;
    backend: string;
    database: string;
  };
  frontend: {
    react: string;
    nextjs: string;
    typescript: string;
    javascript: string;
    tailwind: string;
  };
  backend: {
    nodejs: string;
    api: string;
    SpringBoot: string;
  };
  database: {
    mongodb: string;
    firebase: string;
    PostgreSQL: string;
  };
}

export interface Footer {
  brand: {
    name: string;
    role: string;
    description: string;
    location: string;
  };
  links: {
    title: string;
    home: string;
    about: string;
    projects: string;
    contact: string;
  };
  tech: {
    title: string;
  };
  contact: {
    title: string;
  };
  social: {
    github: string;
    linkedin: string;
  };
  copyright: string;
}

export interface Contact {
  title: string;
  subtitle: string;
  description: string;
  email: string;
  location: string;
  form: {
    name: string;
    email: string;
    subject: string;
    message: string;
    sending: string;
    send: string;
    success: string;
  };
}

export interface Navigation {
  home: string;
  about: string;
  projects: string;
  contact: string;
  skills: string;
}

export interface Theme {
  light: string;
  dark: string;
}

export interface Hero {
  name: string;
  skills: string[];
  resumeButton: string;
  resume_url: string;
  socials: {
    platform: string;
    url: string;
  }[];
}

export interface About {
  title: string;
  milestones: {
    title: string;
    items: Milestone[];
  };
}

export interface Translations {
  title: string;
  hero: Hero;
  about: About;
  projects: Project;
  contact: Contact;
  nav: Navigation;
  theme: Theme;
  footer: Footer;
  skills: Skills;
  zoom: string;
}

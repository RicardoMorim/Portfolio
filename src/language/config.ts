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
    id: string;
    description: string;
    longDescription: string;
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
  categories: { title: string; items: string[] }[];
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
    error: string;
  };
}

export interface StageCopy {
  lab: string;
  lift: string;
  exit: string;
  arrived: string;
  turnLeft: string;
  turnRight: string;
  straight: string;
  deployed: string;
  blocked: string;
  stageNotes: string[];
  youBlocked: string;
  agentsBlocked: string;
  prReview: string;
  reviewing: string;
  finding: string;
  fixed: string;
  agentTasks: string[];
  agentLog: string[];
  agentRoles: string[];
  merged: string;
  tasksMerged: string;
  throwCap: string;
  capsThrown: string;
  educationJokes: string[];
}

export interface Story {
  navStory: string;
  heroKicker: string;
  tagline: string;
  taglineAccent: string;
  readStory: string;
  scrollCue: string;
  storyKicker: string;
  storyTitle: string;
  chapterLabel: string;
  verbs: Record<string, string>;
  figures: string[];
  projectsKicker: string;
  projectsHint: string;
  skillsKicker: string;
  voicesKicker: string;
  educationKicker: string;
  contactKicker: string;
  openImage: string;
  closeImage: string;
  backToTop: string;
  stage: StageCopy;
}

export interface Navigation {
  home: string;
  about: string;
  projects: string;
  contact: string;
  skills: string;
  recommendations: string;
}

export interface Recommendations {
  title: string;
  subtitle: string;
  quote: string;
  author: {
    name: string;
    title: string;
    email?: string;
  };
  pdf: {
    label: string;
    url: string;
  };
  date?: string;
}

export interface Theme {
  light: string;
  dark: string;
}

export interface Hero {
  summary: string;
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

export interface CareerHighlight {
  organization: string;
  id?: string;
  date?: string;
  title: string;
  description: string;
  bullets?: string[];
  links?: { label: string; url: string }[];
}

export interface Translations {
  title: string;
  hero: Hero;
  about: About;
  recommendations: Recommendations;
  careerHighlights: {
    title: string;
    items: CareerHighlight[];
  };
  projects: Project;
  contact: Contact;
  nav: Navigation;
  theme: Theme;
  footer: Footer;
  skills: Skills;
  zoom: string;
  story: Story;
}

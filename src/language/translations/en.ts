import { Translations, Project, Milestone, Skills } from "@/language/config";

const projects: Project = {
  "title": "Selected projects",
  "items": [
    {
      "id": "agentic-assurance",
      "description": "Agentic Assurance",
      "badge": "Personal project · AI Security",
      "longDescription": "Harness for agentic software engineering with executable security contracts, used on all my projects.\n\n• Customisable protections for the OWASP Top 10\n• Protected policies and integrity verification\n• Opengrep, Trivy, test execution and HTTP runtime checks\n• Model review as a complementary signal alongside gates\n• Profiles for Next.js, React/Vite, Spring Boot and HTTP APIs",
      "tech": [
        "Python",
        "AppSec",
        "CI/CD",
        "LLM Review"
      ],
      "links": {
        "closed": "Personal project"
      }
    },
    {
      "id": "shared-ci",
      "description": "Shared CI/CD: InnovatWeb SDLC",
      "badge": "Professional work · Private repository",
      "longDescription": "Shared pipeline platform used across 5 repositories, developed and maintained by me as the main developer.\n\n• Automated tests and builds\n• Security analysis and DAST that caught dozens of vulnerabilities and hundreds of code issues\n• Release management and automated deployment\n• A common SDLC maintained across applications",
      "tech": [
        "CI/CD",
        "AppSec",
        "DAST",
        "Release Automation"
      ],
      "links": {
        "closed": "Private repository"
      }
    },
    {
      "id": "chess-ai",
      "description": "Chess AI Engine",
      "image": "/ChessAI.jpg",
      "badge": "Deep Learning",
      "longDescription": "Chess reinforcement learning project using Monte Carlo Tree Search and dual-head residual networks.\n\n• PyTorch training pipeline\n• Knowledge distillation from Stockfish\n• Batch processing and mixed precision\n• Search tree visualisation and position evaluation\n• Current state: plays the opening well, but needs more training to finish games",
      "tech": [
        "Python",
        "PyTorch",
        "Reinforcement Learning",
        "MCTS",
        "Cython"
      ],
      "links": {
        "github": "GitHub →",
        "githubUrl": "https://github.com/RicardoMorim/Chess"
      }
    },
    {
      "id": "auth-library",
      "description": "Authentication Library",
      "image": "/core_class_diagram_Auth.png",
      "badge": "Open Source Library",
      "longDescription": "Spring Boot authentication library published on Maven Central.\n\n• JWT authentication and CSRF protection\n• Redis-backed rate limiting\n• PostgreSQL integration\n• CI/CD with automated tests and security analysis",
      "tech": [
        "Java",
        "Spring Boot",
        "PostgreSQL",
        "Redis",
        "JWT",
        "GitHub Actions",
        "Maven"
      ],
      "links": {
        "github": "GitHub →",
        "githubUrl": "https://github.com/RicardoMorim/auth-Provider/",
        "diagram": "Architecture →",
        "diagramUrl": "https://github.com/RicardoMorim/Auth-Provider/blob/main/docs/class-diagram/class%20diagram.svg"
      }
    },
    {
      "id": "resume-ai-optimizer",
      "description": "AI Resume Optimizer",
      "image": "/resume_builder.png",
      "badge": "LLM Integration",
      "longDescription": "Resume optimisation application integrating a language model.\n\n• Prompt engineering for structured JSON responses\n• Evaluation across four criteria\n• Token usage management\n• Error handling for model integration",
      "tech": [
        "Next.js",
        "TypeScript",
        "Node.js",
        "MongoDB",
        "LLM APIs",
        "Prompt Engineering"
      ],
      "links": {
        "demo": "View application →",
        "demoUrl": "https://jobresumebuilder.vercel.app",
        "closed": "Private backend"
      }
    }
  ]
};

const milestones: Milestone[] = [
  {
    "date": "2026–present",
    "title": "Master’s in Artificial Intelligence Engineering",
    "description": "Instituto Superior de Engenharia do Porto (ISEP)."
  },
  {
    "date": "2023–2026",
    "title": "BSc in Informatics Engineering",
    "description": "Instituto Superior de Engenharia do Porto (ISEP)."
  },
  {
    "date": "Completed",
    "title": "AWS Certified Solutions Architect – Associate",
    "description": "Certification in designing solutions on AWS."
  },
  {
    "date": "2023/2024",
    "title": "CS50AI: Introduction to Artificial Intelligence",
    "description": "Additional training in AI, search, machine learning and neural networks.",
    "link": "View certificate →",
    "url": "https://certificates.cs50.io/3ea075ca-3cac-49e2-be29-281d46d5ba94.pdf?size=letter"
  },
  {
    "date": "2021",
    "title": "CS50x: Introduction to Computer Science",
    "description": "Additional training in algorithms, data structures and programming fundamentals.",
    "link": "View certificate →",
    "url": "https://certificates.cs50.io/9a13ae2c-7f89-4ffe-a5c4-9e7e6bcadab2.pdf?size=letter"
  }
];

const skills: Skills = {
  "title": "Skills",
  "categories": [
    {
      "title": "AI Engineering",
      "items": [
        "Python",
        "PyTorch",
        "FastAPI",
        "LLM Integration",
        "Local Models",
        "Agentic Workflows"
      ]
    },
    {
      "title": "AI Security & AppSec",
      "items": [
        "AI Security",
        "Secure Development Skills",
        "AI PR Review",
        "Vulnerability Management",
        "DAST",
        "Security Pipelines",
        "LiteLLM"
      ]
    },
    {
      "title": "Software, Cloud & Automation",
      "items": [
        "React",
        "TypeScript",
        "Java",
        "Spring Boot",
        "AWS",
        "Terraform",
        "Docker",
        "CI/CD",
        "PostgreSQL",
        "Redis"
      ]
    }
  ]
};

export const en: Translations = {
  title: "My Portfolio",
  hero: {
    name: "RICARDO",
    skills: ["AI Software Engineer", "AI Security"],
    summary: "I build AI systems, agents and automations, integrating security throughout the software development lifecycle. Currently at Critical Manufacturing, in the R&D Platform Engineering team.",
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
    title: "Education & certifications",
    milestones: {
      title: "Academic background & further learning",
      items: milestones,
    },
  },
  recommendations: {
    title: "Recommendations",
    subtitle: "Testimonial from my INESC TEC internship mentor",
    quote:
      "My overall assessment is very positive: he is a young engineer with excellent potential, autonomy, and technical maturity above the average for his level, ready to join international teams and demanding environments.",
    author: {
      name: "Prof. Fernando Cassola Marques",
      title: "Phd researcher INESC TEC / Invited Professor FEUP",
      // Mentor email taken from the PDF
      email: "fernando.c.marques@inesctec.pt",
    },
    date: "Porto, 15 October 2025",
    pdf: {
      label: "Read full letter (PDF)",
      url: "/RicardoMorim_ReferenceLetter2025.pdf",
    },
  },
  careerHighlights: {
  "title": "Professional experience",
  "items": [
    {
      "id": "critical-manufacturing-2026",
      "organization": "Critical Manufacturing",
      "date": "November 2026 to present",
      "title": "Critical Manufacturing · AI Software Engineer",
      "description": "Member of the Platform Engineering team within Research & Development."
    },
    {
      "id": "celfocus-2026",
      "organization": "Celfocus",
      "date": "February to October 2026",
      "title": "Celfocus · Application Security Analyst",
      "description": "Primary for AI Security and Vulnerability Management: main point of contact with AppSec leadership, coordinating 5 people across both teams.",
      "bullets": [
        "Evaluated and adopted local models on an internal server; built an automated pull request reviewer, in beta when I left, and the runners to execute it.",
        "Created secure development skills and an agent for DAST and CTFs; configured fallback rules and automated skill deployment in a LiteLLM integration.",
        "Adapted an agentic development loop to integrate security from planning through QA, including the creation of security pipelines.",
        "Built a vulnerability management platform from scratch in React and Python/FastAPI, handling hundreds of vulnerabilities: SLA tracking, observability, emails, tickets and monthly reports. The monthly report went from a full day of work to one click plus a review.",
        "Automated repetitive tasks and implemented versioning and automated deployment for the team’s AWS Lambda functions."
      ]
    },
    {
      "id": "innovatweb",
      "organization": "InnovatWeb",
      "title": "InnovatWeb · Main developer",
      "description": "Main developer of the organisation’s applications and shared CI/CD platform.",
      "bullets": [
        "Developed and maintain the shared SDLC: tests, builds, security analysis, DAST, releases and automated deployment across 5 repositories. The scans caught dozens of vulnerabilities and hundreds of code issues.",
        "Developing applications for business management and engineering preparation in construction and precast manufacturing, alongside AWS infrastructure work in Terraform."
      ]
    },
    {
      "id": "inesc-tec-2025",
      "organization": "INESC TEC",
      "date": "2025",
      "title": "INESC TEC · Software Engineering Internship",
      "description": "Developed an Android prototype for augmented reality indoor navigation, with a Python backend, voice guidance and navigation between floors."
    }
  ]
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
      error: "Something went wrong. Please try again or email me directly.",
    },
  },
  footer: {
    brand: {
      name: "Ricardo Morim",
      role: "AI Software Engineer · AI Security",
      description:
        "AI systems, agents, application security and software development automation.",
      location: "Porto, Portugal",
    },
    links: {
      title: "Quick Links",
      home: "Home",
      about: "Education",
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
    copyright: "© 2026 Ricardo Morim. All rights reserved.",
  },
  nav: {
    home: "Home",
    about: "Education",
    projects: "Projects",
    contact: "Contact",
    skills: "Skills",
    recommendations: "Recommendations",
  },
  theme: {
    light: "Light Mode",
    dark: "Dark Mode",
  },
  zoom: "Click to Zoom",
  seo: {
    description: "AI Software Engineer at Critical Manufacturing, focused on AI engineering, AI security, agentic workflows and secure software development.",
  },
  story: {
    navStory: "Story",
    heroKicker: "Now: AI Software Engineer at Critical Manufacturing",
    tagline: "builds intelligent systems",
    taglineAccent: "and keeps them secure.",
    readStory: "Follow the story",
    scrollCue: "Scroll",
    storyKicker: "The path so far",
    storyTitle: "From prototypes to protected platforms.",
    chapterLabel: "Chapter",
    verbs: {
      "inesc-tec-2025": "Explore",
      innovatweb: "Build & ship",
      "celfocus-2026": "Secure",
      "critical-manufacturing-2026": "Engineer AI",
    },
    figures: [
      "Fig. 0: the code around AI becomes its shield",
      "Fig. 1: pick a pin to reroute the phone",
      "Fig. 2: every clean commit builds. Click to push one",
      "Fig. 3: click the attacks before they land",
      "Fig. 4: click the terminal for a new task, or poke a bot",
      "Fig. 5: things built along the way",
      "Fig. 6: hover a skill",
      "Fig. 7: in someone else's words",
      "Fig. 8: hover a line, then throw the cap",
      "Fig. 9: an open channel",
    ],
    projectsKicker: "Case files",
    projectsHint: "Keep scrolling to browse",
    skillsKicker: "Toolkit",
    voicesKicker: "In someone else's words",
    educationKicker: "Foundations",
    contactKicker: "Next chapter",
    openImage: "Open image preview",
    closeImage: "Close image preview",
    backToTop: "Back to top",
    backToProjects: "All projects",
    caseDetails: "Details →",
    technologies: "Technologies",
    stage: {
      lab: "Lab",
      lift: "Lift",
      exit: "Exit",
      arrived: "You have arrived",
      turnLeft: "Turn left",
      turnRight: "Turn right",
      straight: "Straight on",
      deployed: "deployed",
      blocked: "stopped at a gate",
      stageNotes: ["Builds for the 5 repositories", "Automated tests on every commit", "Static security analysis", "Dynamic testing against a running app", "Automated release management", "Automated deployment"],
      youBlocked: "You",
      agentsBlocked: "Agents",
      prReview: "PR review",
      reviewing: "reviewing...",
      finding: "1 security finding",
      fixed: "fixed",
      agentTasks: ["fix the flaky login test", "add an audit log endpoint", "review the release pipeline"],
      agentLog: ["split it into three steps", "patch ready", "found a security issue", "fixed, pushing again", "approved", "all checks green"],
      agentRoles: ["breaks the task down", "writes the change", "reviews code and security", "proves that it works"],
      merged: "merged",
      tasksMerged: "Tasks merged",
      throwCap: "Throw the cap",
      capsThrown: "Caps thrown",
      educationJokes: ["In progress. No spoilers.", "Three years of “it works on my machine”.", "Every answer now starts with “it depends”.", "This was CS50. Then came the rabbit hole."],
    },
  },
};

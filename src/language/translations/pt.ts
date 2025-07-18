import { Translations, Project, Milestone, Skills } from "@/language/config";

const projects: Project = {
  title: "Projetos",
  items: [
    {
      description: "Biblioteca de Autenticação Modular",
      image: "/core_class_diagram_Auth.png",
      longDescription: "Sistema de autenticação Spring Boot pronto para produção com JWT e controle de acesso baseado em funções. Disponível no Maven Central e no Github Packages para fácil uso.",
      tech: ["Java", "Spring Boot", "JWT", "PostgreSQL", "Maven", "JUnit"],
      badge: "Biblioteca de Código Aberto",
      links: {
        github: "GitHub →",
        githubUrl: "https://github.com/RicardoMorim/auth-Provider/",
        diagram: "Arquitetura Completa →",
        diagramUrl: "https://github.com/RicardoMorim/Auth-Provider/blob/main/docs/class-diagram/class%20diagram.svg"
      }
    },
    {
      description: "Avaliador de Curriculos",
      image: "/resume_builder.png",
      longDescription:
        "Plataforma de avaliação de curriculos e escrita de cartas de apresentação com Inteligência Artificial.",
      tech: ["Next.js", "TypeScript", "Node.js", "Tailwind CSS"],
      links: {
        github: "Demonstração →",
        demoUrl: "https://jobresumebuilder.vercel.app",
        closed: "Projecto Fechado",
      },
    },
    {
      image: "/stockinformation.jpeg",
      description: "Informação de Ações",
      longDescription:
        "Plataforma de dados financeiros com atualizações em tempo real e gestão de portfólio",
      tech: ["Next.js", "MongoDB", "APIs Externas"],
      links: {
        demo: "Ver Demo →",
        github: "GitHub →",
        demoUrl: "https://stockinformation.vercel.app/",
        githubUrl: "https://github.com/RicardoMorim/Stock_Information",
      },
    },
    {
      image: "/matchdinner.jpeg",
      description: "Match Dinner Mondays",
      badge: "Trabalho Profissional",
      longDescription:
        "Plataforma de encontros com funcionalidade de chat em tempo real.",
      tech: ["React", "Firebase", "Real-time DB"],
      links: {
        demo: "Ver Demo →",
        closed: "Projeto Fechado",
        demoUrl: "https://matchdinnermondays.pt",
      },
    },
    {
      image: "/blog.jpeg",
      description: "Plataforma de Blog",
      longDescription:
        "Blog em tempo real com gestão de utilizadores e operações CRUD",
      tech: ["React", "Firebase"],
      links: {
        demo: "Ver Demo →",
        github: "GitHub →",
        demoUrl: "https://blogricardo.vercel.app",
        githubUrl: "https://github.com/RicardoMorim/Blog",
      },
    },
    {
      image: "/ristorante.jpeg",
      description: "Ristorante Con Fusion",
      longDescription:
        "Website de restaurante com sistema de avaliações e uso de base de dados para obter informações",
      tech: ["React", "JSON Server"],
      links: {
        demo: "Ver Demo →",
        github: "GitHub →",
        demoUrl: "https://restauranteconfusion.vercel.app/home",
        githubUrl: "https://github.com/RicardoMorim/First-react-app",
      },
    },
  ],
};

const milestones: Milestone[] = [
  {
    date: "Presente",
    title: "Estudante de Engenharia Informática",
    description: "Matriculado no ISEP e a desenvolver projetos pessoais.",
  },
  {
    date: "2025",
    title: "Estágio de Engenharia Informática na INESC TEC",
    description: "Estágio em Engenharia de Software. Desenvolvendo uma aplicação móvel de navegação interior em realidade aumentada com IA.",
    link: "INESC TEC →",
    url: "https://www.inesctec.pt/pt",
  },
  {
    date: "2025",
    title: "Certificações HackerRank (Intermediário)",
    description: [
      "Engenharia de Software",
      " JavaScript",
      " Angular",
      " Resolução de Problemas",
    ],
    link: "Veja em HackerRank →",
    url: "https://www.hackerrank.com/profile/ricardomorim05"
  },
  {
    date: "2024",
    title: "Match Dinner Mondays",
    description: "Lancei o meu primeiro website profissional para uma empresa."
  },
  {
    date: "2023/2024",
    title: "Certificado CS50AI",
    description: "Completei o curso de IA de Harvard com Python.",
    link: "Ver Diploma →",
    url: "https://certificates.cs50.io/3ea075ca-3cac-49e2-be29-281d46d5ba94.pdf?size=letter",
  },
  {
    date: "2023",
    title: "Curso de React + Firebase",
    description:
      "Construí um blog em tempo real com gestão de utilizadores durante este curso.",
  },
  {
    date: "2023",
    title: "Desenvolvimento Frontend com React",
    description: [
      "Completei o curso de desenvolvimento React da Universidade de Hong Kong.",
      "Construí um website de restaurante com JSON server para gerir avaliações.",
    ],
  },
  {
    date: "2021",
    title: "Certificado CS50X",
    description:
      "Completei o curso de Introdução à Ciência da Computação de Harvard.",
    link: "Ver Diploma →",
    url: "https://certificates.cs50.io/9a13ae2c-7f89-4ffe-a5c4-9e7e6bcadab2.pdf?size=letter",
  },
  {
    date: "2019",
    title: "Grasshopper & CodinGame",
    description:
      "Completei o Grasshopper, onde aprendi Javascript e comecei a resolver desafios em plataformas online.",
  },
  {
    date: "2018",
    title: "Início da Jornada",
    description: "Inspirado pelo projeto de jogo de cartas em C de um primo.",
  },
];

const skills: Skills = {
  title: "Competências Técnicas",
  categories: {
    frontend: "Frontend",
    backend: "Backend",
    database: "Base de Dados",
  },
  frontend: {
    react: "React",
    nextjs: "Next.js",
    typescript: "TypeScript",
    javascript: "JavaScript",
    tailwind: "Tailwind CSS",
  },
  backend: {
    nodejs: "Node.js",
    api: "API REST",
    SpringBoot: "Spring Boot",
  },
  database: {
    PostgreSQL: "PostgreSQL",
    mongodb: "MongoDB",
    firebase: "Firebase",
  },
};

export const pt: Translations = {
  title: "Meu Portfólio",
  hero: {
    name: "RICARDO",
    skills: ["Desenvolvedor Full Stack"],
    resumeButton: "Currículo",
    resume_url: "curriculo-pt.pdf",
    socials: [
      { platform: "github", url: "https://github.com/RicardoMorim" },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/ricardo-morim-208368251/",
      },
    ],
  },
  about: {
    title: "A Minha Jornada na Programação",
    milestones: {
      title: "Marcos Importantes",
      items: milestones,
    },
  },
  projects: projects,
  skills,
  contact: {
    title: "Contacto",
    subtitle: "Vamos conversar!",
    description:
      "Sinta-se à vontade para entrar em contacto para colaborações ou apenas para um olá.",
    email: "E-mail",
    location: "Localização",
    form: {
      name: "Nome",
      email: "Email",
      subject: "Assunto",
      message: "Mensagem",
      sending: "A enviar...",
      send: "Enviar Mensagem",
      success: "Mensagem enviada com sucesso!",
    },
  },
  footer: {
    brand: {
      name: "Ricardo Morim",
      role: "Desenvolvedor de Software",
      description:
        "Desenvolvedor FullStack, expecializado em React.js, Next.js e Typescript.",
      location: "Porto, Portugal",
    },
    links: {
      title: "Links Rápidos",
      home: "Início",
      about: "Sobre",
      projects: "Projetos",
      contact: "Contacto",
    },
    tech: {
      title: "Tecnologias Utilizadas",
    },
    contact: {
      title: "Entre em Contacto",
    },
    social: {
      github: "Visitar Perfil GitHub",
      linkedin: "Visitar Perfil LinkedIn",
    },
    copyright: `© ${new Date().getFullYear()} Ricardo Morim. Todos os direitos reservados.`,
  },
  nav: {
    home: "Início",
    about: "Sobre",
    projects: "Projetos",
    contact: "Contacto",
    skills: "Competências",
  },
  theme: {
    light: "Modo Claro",
    dark: "Modo Escuro",
  },
  zoom: "Clique para Aumentar",
};

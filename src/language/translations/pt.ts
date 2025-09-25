import { Translations, Project, Milestone, Skills } from "@/language/config";

const projects: Project = {
  title: "Projetos",
  items: [
    {
      description: "Biblioteca de Autenticação de Produção",
      image: "/core_class_diagram_Auth.png",
      longDescription: "Biblioteca de autenticação Spring Boot publicada no Maven Central com integração zero-código.\n\n• Proteção CSRF e limitador de taxa baseado em Redis\n• Segurança JWT com conformidade OWASP\n• Apenas 12ms de overhead por pedido\n• Testada com 100k utilizadores:\n  - 22% melhoria nas consultas\n  - Paginação 73x mais rápida\n• CI/CD completo com testes automatizados",
      tech: ["Java", "Spring Boot", "PostgreSQL", "Redis", "JWT", "GitHub Actions", "Maven"],
      badge: "Biblioteca Open Source",
      links: {
        github: "GitHub →",
        githubUrl: "https://github.com/RicardoMorim/auth-Provider/",
        diagram: "Arquitetura →",
        diagramUrl: "https://github.com/RicardoMorim/Auth-Provider/blob/main/docs/class-diagram/class%20diagram.svg"
      }
    },
    {
      description: "Otimizador de Currículos com IA",
      image: "/resume_builder.png",
      longDescription: "Otimização de currículos potenciada por IA usando NVIDIA's Llama-3.1 Nemotron Ultra (253B parâmetros).\n\n• Engenharia de prompts otimizada para respostas JSON consistentes\n• Consumo reduzido de tokens com pontuação estruturada\n• 4 critérios abrangentes de avaliação\n• Tratamento avançado de erros para feedback confiável\n• Otimizado para melhoramento profissional de currículos",
      tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "APIs LLM", "Engenharia de Prompts"],
      badge: "Integração IA",
      links: {
        demo: "Demo Ao Vivo →",
        demoUrl: "https://jobresumebuilder.vercel.app",
        closed: "Arquitetura Backend Privada",
      },
    },
    {
      image: "/stockinformation.jpeg",
      description: "Plataforma de Ações em Tempo Real",
      longDescription: "Rastreador de portfólio de ações de alta performance com cache avançado e otimização de APIs.\n\n• Cache Redis: 20+ segundos → tempos sub-segundo\n• Processamento paralelo através de 4 APIs financeiras\n• Estratégias de fallback inteligentes para consistência\n• Rastreamento e análises de portfólio em tempo real\n• Otimizado para atualizações de dados de alta frequência",
      tech: ["Next.js", "Node.js", "MongoDB", "Redis", "APIs Financeiras", "Cache"],
      links: {
        demo: "Demo Ao Vivo →",
        github: "GitHub →",
        demoUrl: "https://stockinformation.vercel.app/",
        githubUrl: "https://github.com/RicardoMorim/Stock_Information",
      },
    },
    {
      image: "/matchdinner.jpeg",
      description: "Match Dinner Mondays",
      badge: "Trabalho Profissional",
      longDescription: "Plataforma de encontros otimizada para performance com técnicas avançadas de otimização.\n\n• Compressão WebP: 3-5MB → ~200KB imagens\n• Carregamento lazy para melhor experiência móvel\n• Estratégia SEO alcançando primeira página do Google\n• Funcionalidade PWA para maior envolvimento\n• Colaboração direta com cliente e desenvolvimento iterativo",
      tech: ["React", "Firebase", "Otimização de Performance", "SEO", "PWA"],
      links: {
        demo: "Demo Ao Vivo →",
        closed: "Projeto Profissional",
        demoUrl: "https://matchdinnermondays.pt",
      },
    },
    {
      image: "/blog.jpeg",
      description: "Plataforma de Blog em Tempo Real",
      longDescription: "Plataforma de blog full-stack com funcionalidades abrangentes em tempo real.\n\n• Atualizações em tempo real e sincronização de conteúdo\n• Sistema de autenticação e autorização de utilizadores\n• Operações CRUD completas para gestão de conteúdo\n• Integração com serviços backend Firebase\n• Design responsivo para todos os dispositivos",
      tech: ["React", "Firebase", "Base de Dados em Tempo Real", "Autenticação"],
      links: {
        demo: "Demo Ao Vivo →",
        github: "GitHub →",
        demoUrl: "https://blogricardo.vercel.app",
        githubUrl: "https://github.com/RicardoMorim/Blog",
      },
    },
    {
      image: "/ristorante.jpeg",
      description: "Ristorante Con Fusion",
      longDescription: "Website de restaurante desenvolvido durante curso Udemy focado em fundamentos de React.\n\n• Componentes React modulares e reutilizáveis\n• Redux Store para gestão de estado global\n• Sistema de avaliações e comentários\n• Base de dados JSON para informações do restaurante\n• Interface responsiva para menu e comentários",
      tech: ["React", "Redux", "JSON Server", "Bootstrap"],
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
    description: "Focado em sistemas backend, arquitetura cloud e desenvolvimento de aplicações escaláveis.",
  },
  {
    date: "2025",
    title: "Estágio de Engenharia Informática na INESC TEC",
    description: "Desenvolvi um protótipo Android de navegação interior em realidade aumentada com arquitetura backend Python extensível. Entreguei um MVP funcional em 4 semanas com orientação por voz e navegação multi-piso.",
    link: "INESC TEC →",
    url: "https://www.inesctec.pt/pt",
  },
  {
    date: "2025",
    title: "Biblioteca de Produção Publicada",
    description: "Publiquei biblioteca de autenticação Spring Boot no Maven Central com pipeline CI/CD completo, testes automatizados e verificação de segurança.",
  },
  {
    date: "2024",
    title: "Especialista em Otimização de Performance",
    description: "Otimizei a plataforma Match Dinner Mondays, reduzindo tamanhos de imagem em 95% e alcançando tempos de carregamento sub-segundo através de técnicas avançadas de compressão.",
  },
  {
    date: "2023/2024",
    title: "Certificado CS50AI",
    description: "Completei o curso de IA de Harvard, focando em algoritmos de machine learning e arquitetura de sistemas de IA.",
    link: "Ver Diploma →",
    url: "https://certificates.cs50.io/3ea075ca-3cac-49e2-be29-281d46d5ba94.pdf?size=letter",
  },
  {
    date: "2023",
    title: "Foco em Arquitetura Backend",
    description: "Transição de foco para sistemas backend, design de APIs e otimização de bases de dados através de projetos práticos.",
  },
  {
    date: "2021",
    title: "Certificado CS50X",
    description: "Completei o curso de Introdução à Ciência da Computação de Harvard, estabelecendo uma base sólida em algoritmos e estruturas de dados.",
    link: "Ver Diploma →",
    url: "https://certificates.cs50.io/9a13ae2c-7f89-4ffe-a5c4-9e7e6bcadab2.pdf?size=letter",
  },
  {
    date: "2018",
    title: "Início da Jornada de Programação",
    description: "Comecei com programação a nível de sistema, inspirado por aplicações críticas de performance.",
  },
];

const skills: Skills = {
  title: "Competências Técnicas",
  categories: {
    backend: "Backend & APIs",
    cloud_DevOps: "Cloud & DevOps",
    database: "Base de Dados & Cache",
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

export const pt: Translations = {
  title: "Meu Portfólio",
  hero: {
    name: "RICARDO",
    skills: ["Enginheiro Backend", "Arquiteto de Sistemas"],
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
      role: "Engenheiro Backend",
      description:
        "Engenheiro Backend especializado em Spring Boot, arquitetura de sistemas e aplicações backend.",
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

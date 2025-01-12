export const pt = {
  title: "Meu Portfolio",
  hero: {
    name: "RICARDO",
    skills: [
      "Desenvolvedor de Software",
      "Desenvolvedor Full Stack",
      "Desenvolvedor Frontend",
      "Desenvolvedor Backend",
      "Engenheiro de Base de Dados",
      "Entusiasta de IA",
      "Arquiteto de Software",
      "Engenheiro de Software",
    ],
  },

  about: {
    title: "Minha Jornada na Programação",
    milestones: {
      title: "Marcos Importantes",
      items: [
        {
          date: "2018",
          title: "Início da Jornada",
          description:
            "Inspirado pelo projeto de jogo de cartas em C de um primo.",
        },
        {
          date: "2019",
          title: "Grasshopper & CodinGame",
          description:
            "Completei o Grasshopper e comecei a resolver desafios no CodinGame.",
        },
        {
          date: "2021",
          title: "Certificado CS50X",
          description:
            "Completei o curso de Introdução à Ciência da Computação de Harvard.",
          link: "Ver Certificado →",
        },
        {
          date: "2023",
          title: "Desenvolvimento Frontend com React",
          description: [
            "Completei o curso de desenvolvimento React da Universidade de Hong Kong.",
            "Construí um website de restaurante com json server para gerir avaliações.",
          ],
          link: "Ver Demo →",
        },
        {
          date: "2023",
          title: "Curso de React + Firebase",
          description:
            "Construí um blog em tempo real com gestão de utilizadores durante este curso.",
          link: "Ver Demo →",
        },
        {
          date: "2023/2024",
          title: "Certificado CS50AI",
          description: "Completei o curso de IA de Harvard com Python.",
          link: "Ver Certificado →",
        },
        {
          date: "Presente",
          title: "Estudante de Engenharia Informática",
          description: "Matriculado no ISEP e a desenvolver projetos pessoais.",
        },
      ],
    },
  },

  projects: {
    title: "Projetos em Destaque",
    items: [
      {
        title: "Plataforma de Blog",
        description:
          "Blog em tempo real com gestão de utilizadores e operações CRUD",
        tech: ["React", "Firebase"],
        links: {
          demo: "Ver Demo →",
          github: "GitHub →",
        },
      },
      {
        title: "Ristorante Con Fusion",
        description:
          "Website de restaurante com sistema de avaliações e uso de base de dados",
        tech: ["React", "JSON Server"],
        links: {
          demo: "Ver Demo →",
          github: "GitHub →",
        },
      },
      {
        title: "Match Dinner Mondays",
        badge: "Trabalho Profissional",
        description:
          "Plataforma de encontros com funcionalidade de chat em tempo real.",
        tech: ["React", "Firebase", "Real-time DB"],
        links: {
          demo: "Ver Demo →",
          closed: "Projeto Fechado",
        },
      },
      {
        title: "Informação de Ações",
        description:
          "Plataforma de dados financeiros com atualizações em tempo real e gestão de portfólio",
        tech: ["Next.js", "MongoDB", "APIs Externas"],
        links: {
          demo: "Ver Demo →",
          github: "GitHub →",
        },
      },
      {
        title: "Rede Neural de Xadrez IA",
        description:
          "IA de xadrez baseada em rede neural treinada com 50.000 jogos",
        longDescription:
          "O meu PC não é suficientemente potente para um melhor treino, mas por agora, joga bem no início do jogo mas usa jogadas aleatórias no fim de jogo.",
        tech: ["Python", "TensorFlow", "PyTorch"],
        links: {
          github: "GitHub →",
        },
      },
      {
        title: "App de Gestão de Jardins",
        description:
          "Uma aplicação feita em Java para ajudar empresas a gerir os seus associados e os seus carros/máquinas para agendar tarefas de gestão de jardins.",
        tech: ["Java", "Maven", "JavaFX"],
        links: {
          github: "GitHub →",
        },
      },
    ],
  },

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

  nav: {
    home: "Início",
    about: "Sobre",
    projects: "Projetos",
    contact: "Contacto",
  },

  theme: {
    light: "Modo Claro",
    dark: "Modo Escuro",
  },

  footer: {
    brand: {
      name: "Ricardo Morim",
      role: "Desenvolvedor de Software",
      description: "Construindo experiências digitais com paixão e precisão.",
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

  skills: {
    title: "Competências Técnicas",
    categories: {
      frontend: "Frontend",
      backend: "Backend",
      database: "Base de Dados",
      tools: "Ferramentas",
	  concepts: "Conceitos Importantes",
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
      api: "APIs REST",
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
      title: "Conceitos Fundamentais",
      oop: "Programação Orientada a Objetos",
      functional: "Programação Funcional",
      documentation: "Documentação de Software",
      design: "Padrões de Design de Software",
    },
  },
};

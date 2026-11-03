import { Translations, Project, Milestone, Skills } from "@/language/config";

const projects: Project = {
  "title": "Projetos selecionados",
  "items": [
    {
      "id": "agentic-assurance",
      "description": "Agentic Assurance",
      "badge": "Projeto pessoal · AI Security",
      "longDescription": "Harness para desenvolvimento de software com agentes, com contratos executáveis de segurança.\n\n• Políticas protegidas e verificação de integridade\n• Análise estática, evidência de testes e verificações HTTP em runtime\n• Revisão por modelos como sinal complementar aos gates\n• Perfis para Next.js, React/Vite, Spring Boot e APIs HTTP",
      "tech": [
        "Python",
        "AppSec",
        "CI/CD",
        "LLM Review"
      ],
      "links": {
        "closed": "Projeto pessoal"
      }
    },
    {
      "id": "shared-ci",
      "description": "Shared CI/CD — SDLC da InnovatWeb",
      "badge": "Trabalho profissional · Repositório privado",
      "longDescription": "Plataforma partilhada de pipelines utilizada em todos os repositórios da organização, da qual sou o principal developer.\n\n• Testes e builds automatizados\n• Análises de segurança e DAST\n• Gestão de releases e deployment automático\n• Desenvolvimento e manutenção do SDLC comum às aplicações",
      "tech": [
        "CI/CD",
        "AppSec",
        "DAST",
        "Release Automation"
      ],
      "links": {
        "closed": "Repositório privado"
      }
    },
    {
      "id": "chess-ai",
      "description": "Motor de IA para Xadrez",
      "image": "/ChessAI.jpg",
      "badge": "Deep Learning",
      "longDescription": "Projeto de reinforcement learning para xadrez, com Monte Carlo Tree Search e redes residuais de duas saídas.\n\n• Pipeline de treino em PyTorch\n• Knowledge distillation a partir do Stockfish\n• Processamento em batch e precisão mista\n• Visualização da árvore de pesquisa e avaliação de posições",
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
      "description": "Biblioteca de Autenticação",
      "image": "/core_class_diagram_Auth.png",
      "badge": "Biblioteca Open Source",
      "longDescription": "Biblioteca de autenticação Spring Boot publicada no Maven Central.\n\n• Autenticação JWT e proteção CSRF\n• Rate limiting com Redis\n• Integração com PostgreSQL\n• CI/CD com testes automatizados e análise de segurança",
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
        "diagram": "Arquitetura →",
        "diagramUrl": "https://github.com/RicardoMorim/Auth-Provider/blob/main/docs/class-diagram/class%20diagram.svg"
      }
    },
    {
      "id": "resume-ai-optimizer",
      "description": "Otimizador de Currículos com IA",
      "image": "/resume_builder.png",
      "badge": "Integração de LLMs",
      "longDescription": "Aplicação de otimização de currículos com integração de um modelo de linguagem.\n\n• Engenharia de prompts para respostas JSON estruturadas\n• Avaliação segundo quatro critérios\n• Gestão do consumo de tokens\n• Tratamento de erros na integração com o modelo",
      "tech": [
        "Next.js",
        "TypeScript",
        "Node.js",
        "MongoDB",
        "LLM APIs",
        "Prompt Engineering"
      ],
      "links": {
        "demo": "Ver aplicação →",
        "demoUrl": "https://jobresumebuilder.vercel.app",
        "closed": "Backend privado"
      }
    }
  ]
};

const milestones: Milestone[] = [
  {
    "date": "2026–presente",
    "title": "Mestrado em Engenharia de Inteligência Artificial",
    "description": "Instituto Superior de Engenharia do Porto (ISEP)."
  },
  {
    "date": "2023–2026",
    "title": "Licenciatura em Engenharia Informática",
    "description": "Instituto Superior de Engenharia do Porto (ISEP)."
  },
  {
    "date": "Concluída",
    "title": "AWS Certified Solutions Architect – Associate",
    "description": "Certificação em arquitetura de soluções na AWS."
  },
  {
    "date": "2023/2024",
    "title": "CS50AI — Introduction to Artificial Intelligence",
    "description": "Formação complementar em IA, pesquisa, aprendizagem automática e redes neuronais.",
    "link": "Ver certificado →",
    "url": "https://certificates.cs50.io/3ea075ca-3cac-49e2-be29-281d46d5ba94.pdf?size=letter"
  },
  {
    "date": "2021",
    "title": "CS50x — Introduction to Computer Science",
    "description": "Formação complementar em algoritmos, estruturas de dados e fundamentos de programação.",
    "link": "Ver certificado →",
    "url": "https://certificates.cs50.io/9a13ae2c-7f89-4ffe-a5c4-9e7e6bcadab2.pdf?size=letter"
  }
];

const skills: Skills = {
  "title": "Competências",
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
      "title": "Software, Cloud e Automação",
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

export const pt: Translations = {
  title: "Meu Portfólio",
  hero: {
    name: "RICARDO",
    skills: ["AI Software Engineer", "AI Security"],
    summary: "Desenvolvo sistemas de IA, agentes e automações, integrando segurança ao longo do ciclo de desenvolvimento de software. Atualmente na Critical Manufacturing, na equipa de Platform Engineering de R&D.",
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
    title: "Formação e certificações",
    milestones: {
      title: "Percurso académico e formação complementar",
      items: milestones,
    },
  },
  recommendations: {
    title: "Recomendações",
    subtitle: "Testemunho do meu mentor de estágio",
    quote:
      "A minha apreciação global é muito positiva: pois ele é um jovem engenheiro com excelente potencial, autonomia e maturidade técnica acima da média para o seu nível, apto a integrar equipas internacionais e ambientes de elevada exigência.",
    author: {
      name: "Prof. Fernando Cassola Marques",
      title: "Pesquisador doutorado INESC TEC / Professor convidado FEUP",
      email: "fernando.c.marques@inesctec.pt",
    },
    date: "Porto, 15 de outubro de 2025",
    pdf: {
      label: "Ler carta completa (PDF)",
      url: "/RicardoMorim_CartaRecomendacao2025.pdf",
    },
  },
  careerHighlights: {
  "title": "Experiência profissional",
  "items": [
    {
      "id": "critical-manufacturing-2026",
      "organization": "Critical Manufacturing",
      "date": "Novembro de 2026 — presente",
      "title": "Critical Manufacturing · AI Software Engineer",
      "description": "Integro a equipa de Platform Engineering da área de Research & Development."
    },
    {
      "id": "celfocus-2026",
      "organization": "Celfocus",
      "date": "Fevereiro — outubro de 2026",
      "title": "Celfocus · Application Security Analyst",
      "description": "Primary de AI Security e Vulnerability Management: principal ponto de contacto destas áreas com a liderança de AppSec, com coordenação dos membros e das tarefas.",
      "bullets": [
        "Avaliação e adoção de modelos locais num servidor interno; criação de um revisor automático de pull requests e dos runners para o executar.",
        "Criação de skills para desenvolvimento seguro e de um agente para DAST e CTFs; configuração de fallback e deployment automático de skills numa integração com LiteLLM.",
        "Adaptação de um ciclo de desenvolvimento com agentes para integrar segurança desde o planeamento até ao QA, incluindo a criação de pipelines de segurança.",
        "Desenvolvimento individual, de raiz, de uma plataforma de gestão de vulnerabilidades em React e Python/FastAPI: SLAs, observabilidade, emails, tickets e relatórios mensais. A geração de relatórios passou de várias horas para menos de uma hora.",
        "Automação de tarefas repetitivas e implementação de versionamento e deployment automático das funções AWS Lambda da equipa."
      ]
    },
    {
      "id": "innovatweb",
      "organization": "InnovatWeb",
      "title": "InnovatWeb · Principal developer",
      "description": "Principal developer das aplicações e da plataforma partilhada de CI/CD da organização.",
      "bullets": [
        "Desenvolvimento e manutenção do SDLC partilhado: testes, builds, análises de segurança, DAST, releases e deployment automático em todos os repositórios da organização.",
        "Desenvolvimento de aplicações para gestão empresarial e preparação de engenharia na construção e em pré-fabricados, com trabalho de infraestrutura AWS em Terraform."
      ]
    },
    {
      "id": "inesc-tec-2025",
      "organization": "INESC TEC",
      "date": "2025",
      "title": "INESC TEC · Estágio de Engenharia Informática",
      "description": "Desenvolvimento de um protótipo Android de navegação interior em realidade aumentada, com backend Python, orientação por voz e navegação entre pisos."
    }
  ]
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
      error: "Algo correu mal. Tente novamente ou envie-me um email diretamente.",
    },
  },
  footer: {
    brand: {
      name: "Ricardo Morim",
      role: "AI Software Engineer · AI Security",
      description:
        "Sistemas de IA, agentes, segurança de aplicações e automação do desenvolvimento de software.",
      location: "Porto, Portugal",
    },
    links: {
      title: "Links Rápidos",
      home: "Início",
      about: "Formação",
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
    copyright: "© 2026 Ricardo Morim. Todos os direitos reservados.",
  },
  nav: {
    home: "Início",
    about: "Formação",
    projects: "Projetos",
    contact: "Contacto",
    skills: "Competências",
    recommendations: "Recomendações",
  },
  theme: {
    light: "Modo Claro",
    dark: "Modo Escuro",
  },
  zoom: "Clique para Aumentar",
  story: {
    navStory: "Percurso",
    heroKicker: "Agora — AI Software Engineer na Critical Manufacturing",
    tagline: "constrói sistemas inteligentes",
    taglineAccent: "e mantém-nos seguros.",
    readStory: "Seguir a história",
    scrollCue: "Scroll",
    storyKicker: "O percurso até aqui",
    storyTitle: "De protótipos a plataformas protegidas.",
    chapterLabel: "Capítulo",
    verbs: {
      "inesc-tec-2025": "Explorar",
      innovatweb: "Construir e entregar",
      "celfocus-2026": "Proteger",
      "critical-manufacturing-2026": "Engenharia de IA",
    },
    figures: [
      "Fig. 0 — o código à volta da IA torna-se o seu escudo",
      "Fig. 1 — escolhe um pino para mudar a rota",
      "Fig. 2 — cada commit limpo constrói. Clica para fazer um",
      "Fig. 3 — clica nos ataques antes de chegarem",
      "Fig. 4 — clica no terminal para uma nova tarefa, ou toca num robô",
      "Fig. 5 — o que foi construído pelo caminho",
      "Fig. 6 — passa o rato por uma competência",
      "Fig. 7 — nas palavras de outra pessoa",
      "Fig. 8 — passa por uma linha e atira o capelo",
      "Fig. 9 — um canal aberto",
    ],
    projectsKicker: "Casos",
    projectsHint: "Continue a fazer scroll para ver",
    skillsKicker: "Ferramentas",
    voicesKicker: "Nas palavras de outra pessoa",
    educationKicker: "Fundações",
    contactKicker: "Próximo capítulo",
    openImage: "Abrir pré-visualização da imagem",
    closeImage: "Fechar pré-visualização da imagem",
    backToTop: "Voltar ao topo",
    stage: {
      lab: "Lab",
      lift: "Elevador",
      exit: "Saída",
      arrived: "Chegaste ao destino",
      turnLeft: "Vira à esquerda",
      turnRight: "Vira à direita",
      straight: "Segue em frente",
      deployed: "em produção",
      blocked: "travados num gate",
      stageNotes: ["Builds para todos os repositórios", "Testes automáticos em cada commit", "Análise estática de segurança", "Testes dinâmicos contra a aplicação a correr", "Gestão automática de releases", "Deployment automático"],
      youBlocked: "Tu",
      agentsBlocked: "Agentes",
      prReview: "Revisão de PR",
      reviewing: "a rever...",
      finding: "1 problema de segurança",
      fixed: "corrigido",
      agentTasks: ["corrigir o teste instável de login", "adicionar um endpoint de auditoria", "rever o pipeline de release"],
      agentLog: ["dividido em três passos", "patch pronto", "encontrei um problema de segurança", "corrigido, a enviar de novo", "aprovado", "testes todos a verde"],
      agentRoles: ["divide a tarefa", "escreve a alteração", "revê o código e a segurança", "prova que funciona"],
      merged: "merged",
      tasksMerged: "Tarefas concluídas",
      throwCap: "Atirar o capelo",
      capsThrown: "Capelos atirados",
      educationJokes: ["Em curso. Sem spoilers.", "Três anos de “na minha máquina funciona”.", "Agora todas as respostas começam com “depende”.", "This was CS50 — e depois foi o buraco sem fundo."],
    },
  },
};

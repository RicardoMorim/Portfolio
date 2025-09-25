import { NextResponse } from 'next/server';

export async function GET() {
    const skills = {
        summary: "Backend engineering skills with focus on system architecture, performance optimization, and production-ready solutions",

        // Core backend engineering competencies  
        core_backend_skills: {
            system_architecture: {
                level: "Advanced",
                technologies: ["Microservices", "REST APIs", "Database Design", "Caching Strategies"],
                experience: "Designed extensible backend architectures for production applications"
            },

            performance_optimization: {
                level: "Good",
                achievements: ["22% query improvement", "73x faster pagination", "21% improved throughput"],
                techniques: ["Database Indexing", "Redis Caching", "Query Optimization", "Load Testing"]
            },

            security_implementation: {
                level: "Good",
                implementations: ["JWT Authentication", "CSRF Protection", "Rate Limiting", "OWASP Compliance"],
                experience: "Production authentication library with enterprise security standards"
            }
        },

        // Programming languages by proficiency
        programming_languages: {
            expert: {
                java: {
                    years_experience: 3,
                    confidence_level: "High - Primary preference for backend development",
                    frameworks: ["Spring Boot", "Spring Security", "Spring Data JPA"],
                    achievements: ["Published Maven Central library", "Production authentication system"],
                    use_cases: ["Enterprise applications", "Microservices", "API development"],
                    preference_note: "Preferred language for backend systems due to extensive university training and ecosystem maturity"
                }
            },

            proficient: {
                typescript: {
                    years_experience: 2,
                    confidence_level: "Good - Competent but less preferred for backend work",
                    environments: ["Node.js", "Express.js", "Backend APIs", "Next.js"],
                    achievements: ["High-performance stock platform", "Real-time applications", "Portfolio projects"],
                    use_cases: ["Full-stack projects", "API development", "Performance optimization"],
                    experience_note: "Started With typescript after Java showed me how good a typed language can be"
                },

                javascript: {
                    years_experience: 4,
                    confidence_level: "Competent - Can deliver but not primary preference",
                    learning_journey: "Started with Google's Grasshopper app (2018) and coding challenges. Actual project development began after CS50X (2021)",
                    environments: ["Node.js", "Browser", "React", "Express.js"],
                    achievements: ["Multiple production projects", "Real-time systems", "Client-side applications"],
                    use_cases: ["Frontend development", "Node.js backend", "Full-stack projects"],
                    current_status: "Capable but gravitating toward Java ecosystem for backend work",
                    experience_breakdown: "2018-2021: Learning fundamentals (Grasshopper, CodingGame challenges, CS50X). 2021-present: Actual project development"
                },

                python: {
                    years_experience: 2,
                    confidence_level: "Good - Comfortable for specific use cases | Small projects done with Pytorch",
                    frameworks: ["FastAPI", "Flask", "Backend Services", "Pytorch"],
                    achievements: ["AR navigation backend", "Extensible architecture design"],
                    use_cases: ["Research projects", "API development", "System integration", "Prototyping", "Machine Learning"]
                }
            },

            intermediate: {
                csharp: {
                    confidence_level: "Learning - University exposure",
                    frameworks: ["ASP.NET", ".NET Core"],
                    use_cases: ["Enterprise applications", "API development"],
                    experience_note: "Familiar through academic projects"
                }
            }
        },

        // Backend technologies and frameworks
        backend_technologies: {
            frameworks: {
                spring_boot: {
                    proficiency: "Advanced",
                    experience: "2+ years",
                    confidence_level: "Very High - Preferred backend framework",
                    achievements: ["Production library on Maven Central", "Authentication systems", "Microservices"],
                    specializations: ["Security", "Data Access", "REST APIs", "Dependency Injection"],
                    preference_reason: "Deep university training and robust ecosystem make this my go-to choice for backend development"
                },

                nodejs: {
                    proficiency: "Proficient",
                    experience: "3+ years",
                    confidence_level: "Moderate - Can deliver but prefer Spring Boot for complex backends",
                    achievements: ["High-performance APIs", "Real-time systems", "Parallel processing"],
                    specializations: ["Express.js", "API development", "Performance optimization"],
                    usage_context: "Used primarily for full-stack projects and when client/project requires JavaScript ecosystem"
                },

                aspnet: {
                    proficiency: "Beginner",
                    experience: "<1 year",
                    confidence_level: "Learning - Academic exposure only",
                    use_cases: ["University projects", "Learning enterprise patterns"],
                    status: "Familiar with concepts, limited practical experience"
                }
            }
        },

        // Database technologies
        database_technologies: {
            relational: {
                postgresql: {
                    proficiency: "Advanced",
                    achievements: ["22% query performance improvement", "73x faster pagination"],
                    skills: ["Query optimization", "Index design", "Performance tuning", "Schema design"]
                }
            },

            nosql: {
                mongodb: {
                    proficiency: "Advanced",
                    achievements: ["Real-time applications", "Document modeling", "Aggregation pipelines"],
                    skills: ["Document design", "Aggregation", "Indexing", "Performance optimization"]
                }
            },

            caching: {
                redis: {
                    proficiency: "Good",
                    achievements: ["20s → sub-second response times", "Rate limiting implementation"],
                    skills: ["Caching strategies", "Session management", "Rate limiting", "Performance optimization"]
                }
            }
        },

        // Cloud and DevOps
        cloud_devops: {
            containerization: {
                docker: {
                    proficiency: "Intermediate",
                    use_cases: ["Application containerization", "Development environments", "CI/CD pipelines"]
                }
            },

            cloud_platforms: {
                aws: {
                    proficiency: "Beginner",
                    services: ["EC2", "S3", "RDS", "Lambda"],
                    use_cases: ["Application deployment", "Scalable architectures"]
                }
            },

            cicd: {
                github_actions: {
                    proficiency: "Good",
                    achievements: ["Automated testing", "Security scanning", "Maven Central publishing"],
                    implementations: ["Test automation", "Security scanning", "Dependency management"]
                }
            }
        },

        // Software engineering practices
        engineering_practices: {
            testing: {
                approaches: ["Unit Testing", "Integration Testing", "Load Testing"],
                achievements: ["100k user load testing", "Automated test suites"]
            },

            security: {
                implementations: ["OWASP Compliance", "Security Scanning", "Vulnerability Assessment"],
                achievements: ["Enterprise-grade security", "30+ CodeQL vulnerabilities fixed"]
            },

            performance: {
                techniques: ["Profiling", "Benchmarking", "Optimization", "Monitoring"],
                achievements: ["Sub-second response times", "95% resource optimization"]
            },

            architecture: {
                patterns: ["Repository Pattern", "Dependency Injection", "Factory Pattern", "MVC"],
                focus: ["Scalable design", "Maintainable code", "Extensible architectures"]
            }
        },

        // Industry knowledge
        domain_knowledge: {
            authentication_systems: "Good - Production library with enterprise features",
            performance_optimization: "Good - Measurable improvements across multiple projects",
            api_design: "Advanced - RESTful APIs with proper documentation and security",
            system_integration: "Good - Multiple external API integrations with fallback strategies",
            financial_systems: "Intermediate - Stock trading platform with real-time data"
        },

        // Learning and development
        continuous_learning: {
            programming_journey: "First exposure to coding through Google Grasshopper app (2018) and coding challenges (CodingGame). Actual project development began after CS50X completion (2021), then evolved toward Java ecosystem preference through university experience",
            recent_certifications: ["CS50AI (Harvard, 2024)", "CS50X (Harvard, 2021)"],
            current_focus: ["Spring Boot ecosystem", "System Architecture", "Database optimization", "Performance tuning"],
            technology_preferences: "Gravitating toward Java/Spring Boot for backend systems while maintaining JavaScript competency for full-stack needs",
            next_goals: ["AWS Certification", "Advanced Spring Boot patterns", "Microservices architecture", "Kubernetes"]
        }
    };

    return NextResponse.json(skills, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
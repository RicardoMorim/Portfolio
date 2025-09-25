import { NextResponse } from 'next/server';

export async function GET() {
  const openApiSpec = {
    openapi: "3.0.3",
    info: {
      title: "Ricardo Morim Portfolio API",
      description: "Machine-readable API for AI agents and recruiting tools to extract structured information about Ricardo Morim's backend engineering capabilities",
      version: "1.0.0",
      contact: {
        name: "Ricardo Morim",
        url: "https://ricardomorim.vercel.app",
        email: "contact@ricardomorim.dev"
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT"
      }
    },
    servers: [
      {
        url: "https://ricardomorim.vercel.app/api",
        description: "Production API Server"
      },
      {
        url: "http://localhost:3000/api",
        description: "Development Server"
      }
    ],
    paths: {
      "/profile": {
        get: {
          summary: "Get backend engineer profile",
          description: "Core profile information highlighting backend engineering expertise, achievements, and contact details",
          operationId: "getProfile",
          tags: ["Profile"],
          responses: {
            "200": {
              description: "Profile information retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Profile"
                  }
                }
              }
            }
          }
        }
      },
      "/projects": {
        get: {
          summary: "Get projects portfolio",
          description: "Detailed project portfolio with technical achievements, performance metrics, and backend focus",
          operationId: "getProjects", 
          tags: ["Projects"],
          responses: {
            "200": {
              description: "Projects portfolio retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ProjectsResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/skills": {
        get: {
          summary: "Get technical skills assessment",
          description: "Comprehensive skill assessment with proficiency levels, experience timeline, and backend specializations",
          operationId: "getSkills",
          tags: ["Skills"],
          responses: {
            "200": {
              description: "Skills assessment retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/SkillsResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/experience": {
        get: {
          summary: "Get professional experience",
          description: "Professional work experience timeline, achievements, education, and career progression",
          operationId: "getExperience",
          tags: ["Experience"],
          responses: {
            "200": {
              description: "Experience information retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ExperienceResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/search": {
        get: {
          summary: "Search projects and skills",
          description: "Keyword-based search across projects, skills, and experience for best matches",
          operationId: "searchContent",
          tags: ["Search"],
          parameters: [
            {
              name: "q",
              in: "query", 
              description: "Search query (keywords, technologies, achievements)",
              required: true,
              schema: {
                type: "string",
                example: "Spring Boot authentication"
              }
            },
            {
              name: "limit",
              in: "query",
              description: "Maximum number of results to return",
              required: false,
              schema: {
                type: "integer",
                minimum: 1,
                maximum: 50,
                default: 10
              }
            }
          ],
          responses: {
            "200": {
              description: "Search results retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/SearchResponse"
                  }
                }
              }
            },
            "400": {
              description: "Invalid search parameters"
            }
          }
        }
      },
      "/docs": {
        get: {
          summary: "Get API documentation",
          description: "Complete API documentation and usage guidelines for AI agents",
          operationId: "getDocs",
          tags: ["Documentation"],
          responses: {
            "200": {
              description: "API documentation retrieved successfully"
            }
          }
        }
      }
    },
    components: {
      schemas: {
        Profile: {
          type: "object",
          properties: {
            name: { type: "string", example: "Ricardo Morim" },
            title: { type: "string", example: "Backend Engineer" },
            subtitle: { type: "string", example: "Systems Architect" },
            location: { type: "string", example: "Porto, Portugal" },
            summary: { type: "string" },
            expertise: {
              type: "array",
              items: { type: "string" },
              example: ["Backend System Architecture", "Spring Boot Development", "Database Optimization"]
            },
            achievements: {
              type: "array", 
              items: { type: "string" },
              example: ["Published production Spring Boot library on Maven Central with 12ms overhead"]
            },
            languages: {
              type: "object",
              properties: {
                primary: { type: "array", items: { type: "string" } },
                secondary: { type: "array", items: { type: "string" } }
              }
            },
            technologies: {
              type: "object",
              properties: {
                backend_frameworks: { type: "array", items: { type: "string" } },
                databases: { type: "array", items: { type: "string" } },
                cloud_devops: { type: "array", items: { type: "string" } }
              }
            },
            contact: {
              type: "object",
              properties: {
                github: { type: "string", format: "uri" },
                linkedin: { type: "string", format: "uri" },
                portfolio: { type: "string", format: "uri" },
                resume: { type: "string", format: "uri" }
              }
            }
          }
        },
        ProjectsResponse: {
          type: "object",
          properties: {
            summary: { type: "string" },
            total_projects: { type: "integer" },
            featured_projects: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Project"
              }
            }
          }
        },
        Project: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            type: { type: "string" },
            status: { type: "string", enum: ["Production", "MVP Completed", "In Development"] },
            description: { type: "string" },
            technical_highlights: { type: "array", items: { type: "string" } },
            backend_technologies: { type: "array", items: { type: "string" } },
            repository: { type: "string", format: "uri" },
            demo_url: { type: "string", format: "uri" },
            performance_metrics: { type: "object" }
          }
        },
        SkillsResponse: {
          type: "object",
          properties: {
            summary: { type: "string" },
            core_backend_skills: { type: "object" },
            programming_languages: { type: "object" },
            backend_technologies: { type: "object" },
            database_technologies: { type: "object" },
            cloud_devops: { type: "object" }
          }
        },
        ExperienceResponse: {
          type: "object",
          properties: {
            summary: { type: "string" },
            work_experience: { type: "array", items: { type: "object" } },
            technical_achievements: { type: "array", items: { type: "object" } },
            education: { type: "array", items: { type: "object" } }
          }
        },
        SearchResponse: {
          type: "object",
          properties: {
            query: { type: "string" },
            total_results: { type: "integer" },
            results: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  type: { type: "string", enum: ["project", "skill", "experience"] },
                  title: { type: "string" },
                  description: { type: "string" },
                  relevance_score: { type: "number", minimum: 0, maximum: 1 },
                  highlights: { type: "array", items: { type: "string" } },
                  url: { type: "string" }
                }
              }
            }
          }
        }
      }
    },
    tags: [
      {
        name: "Profile",
        description: "Core profile and contact information"
      },
      {
        name: "Projects", 
        description: "Technical projects portfolio"
      },
      {
        name: "Skills",
        description: "Technical skills and proficiency assessment"
      },
      {
        name: "Experience",
        description: "Professional work experience and education"
      },
      {
        name: "Search",
        description: "Content search and discovery"
      },
      {
        name: "Documentation",
        description: "API documentation and guides"
      }
    ]
  };

  return NextResponse.json(openApiSpec, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Cache-Control': 'public, max-age=7200', // Cache for 2 hours
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
import { NextResponse } from 'next/server';

export async function GET() {
  const portfolioInfo = {
    name: "Ricardo Morim Portfolio API",
    description: "Machine-readable portfolio data for AI agents and recruiting tools",
    version: "1.0.0",
    owner: {
      name: "Ricardo Morim",
      title: "Backend Engineer",
      location: "Porto, Portugal",
      contact: {
        github: "https://github.com/RicardoMorim",
        linkedin: "https://www.linkedin.com/in/ricardo-morim-208368251/",
        portfolio: "https://ricardomorim.vercel.app"
      }
    },
    api: {
      base_url: "https://ricardomorim.vercel.app/api",
      documentation: "/api/docs",
      openapi_spec: "/api/openapi",
      endpoints: {
        profile: {
          url: "/api/profile",
          description: "Core profile with backend engineering expertise and contact information",
          method: "GET"
        },
        projects: {
          url: "/api/projects", 
          description: "Technical projects portfolio with performance metrics",
          method: "GET"
        },
        skills: {
          url: "/api/skills",
          description: "Technical skills assessment with proficiency levels",
          method: "GET"
        },
        experience: {
          url: "/api/experience",
          description: "Professional work experience and education timeline",
          method: "GET"
        },
        search: {
          url: "/api/search",
          description: "Keyword search across projects, skills, and experience",
          method: "GET",
          parameters: ["q (required)", "limit (optional)"]
        }
      }
    },
    discovery: {
      robots_txt: "/robots.txt",
      sitemap: "/sitemap.xml",
      schema_org: "Embedded in HTML pages via JSON-LD",
      openapi_spec: "/api/openapi"
    },
    data_quality: {
      last_updated: new Date().toISOString().split('T')[0],
      update_frequency: "As needed based on new projects and achievements",
      data_verification: "Links to repositories, demos, and credential certificates provided",
      accuracy: "All data manually curated and regularly updated"
    },
    usage_guidelines: {
      rate_limiting: "None currently implemented - please be respectful",
      cors: "Open access for AI agent consumption",
      caching: "Responses cached for 1-2 hours for optimal performance",
      best_practices: [
        "Start with /api/docs for complete usage guidelines",
        "Use /api/profile for initial candidate assessment",
        "Query specific endpoints based on evaluation needs",
        "Respect caching headers for optimal performance"
      ]
    },
    technical_focus: {
      backend_engineering: "Spring Boot, system architecture, database optimization",
      quantifiable_achievements: "Performance metrics and production evidence",
      production_experience: "Published libraries, internships, client projects",
      skill_confidence_mapping: "Honest assessment of proficiency and preferences"
    }
  };

  return NextResponse.json(portfolioInfo, {
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
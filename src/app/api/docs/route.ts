import { NextResponse } from 'next/server';

export async function GET() {
  const apiDocs = {
    title: "Ricardo Morim - Portfolio API for AI Agents",
    description: "Machine-readable API endpoints providing structured data about Ricardo Morim's backend engineering experience, skills, and projects",
    version: "1.0.0",
    last_updated: new Date().toISOString().split('T')[0],
    
    // Purpose and target audience
    purpose: {
      primary_use: "Enable AI agents and automated systems to extract structured information about Ricardo's backend engineering capabilities",
      target_audience: ["AI Recruiting Tools", "Technical Assessment Bots", "Portfolio Crawlers", "Automated Screening Systems"],
      benefits: ["Consistent data format", "Comprehensive technical details", "Quantifiable achievements", "Backend engineering focus"]
    },
    
    // Available endpoints
    endpoints: {
      "/api/profile": {
        method: "GET",
        description: "Core profile information highlighting backend engineering expertise",
        response_format: "JSON",
        key_data: [
          "Personal information and contact details",
          "Backend engineering expertise areas", 
          "Quantifiable achievements and impact",
          "Technology stack organized by backend focus",
          "Education and certifications"
        ],
        use_case: "Initial candidate assessment and technical profile overview"
      },
      
      "/api/projects": {
        method: "GET", 
        description: "Detailed project portfolio with technical achievements and backend focus",
        response_format: "JSON",
        key_data: [
          "Production projects with measurable impact",
          "Technical implementation details",
          "Performance metrics and optimizations",
          "Architecture patterns and security features", 
          "Technology stacks and deployment information"
        ],
        use_case: "Technical project evaluation and backend engineering assessment"
      },
      
      "/api/skills": {
        method: "GET",
        description: "Comprehensive skill assessment with proficiency levels and achievements",
        response_format: "JSON", 
        key_data: [
          "Programming languages by proficiency level",
          "Backend frameworks and technologies",
          "Database technologies and performance achievements",
          "Cloud and DevOps capabilities",
          "Engineering practices and methodologies"
        ],
        use_case: "Skill matching and technical competency evaluation"
      },
      
      "/api/experience": {
        method: "GET",
        description: "Professional work experience and technical achievements timeline",
        response_format: "JSON",
        key_data: [
          "Professional work experience with technical details",
          "Key achievements and measurable impact",
          "Education and certification credentials",
          "Skill development timeline",
          "Current status and availability"
        ],
        use_case: "Experience verification and career progression analysis"
      },
      
      "/api/docs": {
        method: "GET",
        description: "API documentation for AI agents (this endpoint)",
        response_format: "JSON",
        key_data: [
          "Endpoint documentation and usage guidelines",
          "Response schemas and data structures", 
          "Rate limiting and access policies",
          "Integration examples for AI systems"
        ],
        use_case: "API discovery and integration guidance"
      }
    },
    
    // Response schemas
    response_schemas: {
      common_fields: {
        status: "HTTP status code",
        headers: "CORS enabled, caching policies applied",
        format: "JSON with consistent structure across all endpoints"
      },
      
      data_quality_standards: [
        "Quantifiable metrics where possible (performance improvements, user counts, etc.)",
        "Specific technology versions and implementation details",
        "Verifiable achievements with links to repositories/demos",
        "Timeline information for experience tracking",
        "Consistent naming conventions across all endpoints"
      ]
    },
    
    // Usage guidelines for AI agents
    ai_agent_guidelines: {
      recommended_usage: [
        "Start with /api/profile for candidate overview",
        "Use /api/projects for technical project evaluation",
        "Query /api/skills for specific technology matching", 
        "Check /api/experience for work history verification"
      ],
      
      data_reliability: {
        accuracy: "All data manually curated and regularly updated",
        verification: "Links to repositories, demos, and credential certificates provided",
        currency: "Last updated field indicates data freshness"
      },
      
      performance_considerations: {
        caching: "Responses cached for 1 hour (3600 seconds)",
        rate_limiting: "No rate limiting currently implemented",
        response_size: "Optimized for comprehensive data with reasonable payload sizes"
      }
    },
    
    // Technical implementation details
    technical_details: {
      framework: "Next.js App Router with TypeScript",
      deployment: "Vercel edge functions",
      cors_policy: "Open access for AI agent consumption",
      response_format: "JSON with UTF-8 encoding",
      http_methods: ["GET", "OPTIONS"],
      status_codes: {
        200: "Successful response with data",
        404: "Endpoint not found", 
        500: "Server error"
      }
    },
    
    // Key highlights for AI assessment
    ai_assessment_highlights: {
      backend_engineering_evidence: [
        "Production Spring Boot library published to Maven Central",
        "Performance optimizations with measurable results (22% query improvement)",
        "Enterprise security implementation (CSRF, OWASP compliance)",
        "Scalability testing with 100k users",
        "Database optimization expertise with quantified improvements"
      ],
      
      quantifiable_achievements: [
        "12ms authentication library overhead",
        "95% image size reduction in production platform",
        "20+ seconds to sub-second API response improvement", 
        "73x faster pagination through optimization",
        "First-page Google rankings through SEO implementation"
      ],
      
      production_experience: [
        "INESC TEC research internship with MVP delivery",
        "Professional freelance project with client collaboration", 
        "Open source contribution with community usage",
        "Multiple production deployments with real users",
        "Complete CI/CD pipeline implementation"
      ],
      
      technical_depth_indicators: [
        "Advanced database optimization techniques",
        "Security best practices implementation",
        "Performance profiling and load testing",
        "System architecture design for scalability",
        "Integration with multiple external APIs"
      ]
    },
    
    // Contact and verification
    contact_verification: {
      portfolio_website: "https://ricardomorim.vercel.app",
      github_profile: "https://github.com/RicardoMorim",
      linkedin_profile: "https://www.linkedin.com/in/ricardo-morim-208368251/",
      location: "Porto, Portugal",
      availability: "Open to backend engineering opportunities"
    },
    
    // API metadata
    metadata: {
      created_date: "2025-09-25",
      api_version: "1.0.0",
      endpoints_count: 5,
      total_data_points: "100+ structured data points across all endpoints",
      update_frequency: "As needed based on new projects and achievements"
    }
  };

  return NextResponse.json(apiDocs, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Cache-Control': 'public, max-age=7200', // Cache for 2 hours (docs change less frequently)
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
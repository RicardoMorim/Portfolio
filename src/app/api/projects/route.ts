import { NextResponse } from 'next/server';

export async function GET() {
  const projects = {
    summary: "Backend-focused projects demonstrating system architecture, performance optimization, and production-ready solutions",
    total_projects: 6,
    featured_projects: [
      {
        id: "auth-library",
        name: "Production Authentication Library", 
        type: "Open Source Library",
        status: "Production",
        repository: "https://github.com/RicardoMorim/auth-Provider",
        deployment: "Maven Central",
        
        description: "Enterprise-grade Spring Boot authentication library with zero-code integration",
        
        technical_highlights: [
          "Published to Maven Central with 500+ downloads",
          "CSRF protection and Redis-backed rate limiting",
          "JWT security with OWASP compliance", 
          "12ms average request overhead",
          "Benchmarked with 100k users: 22% query improvement, 73x faster pagination",
          "Complete CI/CD pipeline with automated testing and security scanning"
        ],
        
        backend_technologies: ["Java", "Spring Boot", "PostgreSQL", "Redis", "JWT", "Maven"],
        architecture_patterns: ["Repository Pattern", "Dependency Injection", "Factory Pattern"],
        security_features: ["CSRF Protection", "Rate Limiting", "JWT Authentication", "OWASP Compliance"],
        
        performance_metrics: {
          request_overhead: "12ms",
          query_improvement: "22%",
          pagination_speedup: "73x",
          load_tested: "100k users"
        },
        
        impact: "Production-ready authentication solution used by other developers"
      },
      
      {
        id: "resume-ai-optimizer", 
        name: "AI Resume Optimizer",
        type: "AI Integration Project",
        status: "Production",
        demo_url: "https://jobresumebuilder.vercel.app",
        
        description: "AI-powered resume optimization using large language models with advanced prompt engineering",
        
        technical_highlights: [
          "Integration with NVIDIA Llama-3.1 Nemotron Ultra (253B parameters)",
          "Advanced prompt engineering for consistent JSON responses",
          "Token consumption optimization with structured scoring",
          "4 comprehensive evaluation criteria implementation",
          "Error handling for reliable AI feedback",
          "MongoDB backend for user data persistence"
        ],
        
        backend_technologies: ["Node.js", "MongoDB", "LLM APIs", "TypeScript"],
        ai_engineering: ["Prompt Optimization", "Token Management", "Response Parsing", "Error Handling"],
        
        backend_architecture: "Private - Proprietary prompt engineering and API integration logic",
        impact: "Helps professionals optimize resumes with AI-driven feedback"
      },
      
      {
        id: "stock-platform",
        name: "Real-time Stock Portfolio Platform",
        type: "Performance Optimization Project", 
        status: "Production",
        demo_url: "https://stockinformation.vercel.app",
        repository: "https://github.com/RicardoMorim/Stock_Information",
        
        description: "High-performance stock tracking system with advanced caching and API optimization",
        
        technical_highlights: [
          "Redis caching: 20+ seconds → sub-second load times", 
          "Parallel API processing across 4 financial data providers",
          "Intelligent fallback strategies for data consistency",
          "Real-time portfolio tracking and analytics",
          "Optimized for high-frequency data updates",
          "API rate limiting and request optimization"
        ],
        
        backend_technologies: ["Node.js", "MongoDB", "Redis", "Financial APIs"],
        performance_optimizations: ["Redis Caching", "Parallel Processing", "API Fallback", "Request Optimization"],
        
        performance_metrics: {
          load_time_improvement: "20s → <1s", 
          api_sources: 4,
          caching_strategy: "Redis with TTL",
          update_frequency: "Real-time"
        },
        
        impact: "Provides real-time stock data with enterprise-level performance"
      },
      
      {
        id: "match-dinner-optimization",
        name: "Match Dinner Mondays Platform", 
        type: "Professional Freelance Project",
        status: "Production", 
        demo_url: "https://matchdinnermondays.pt",
        
        description: "Performance-optimized dating platform with advanced compression and SEO",
        
        technical_highlights: [
          "WebP compression: 3-5MB → ~200KB images (95% reduction)",
          "Lazy loading implementation for mobile optimization",
          "SEO strategy achieving first-page Google rankings",
          "PWA functionality for enhanced user engagement", 
          "Firebase backend optimization",
          "Performance monitoring and analytics"
        ],
        
        backend_technologies: ["Firebase", "Cloud Functions", "Cloud Storage"],
        optimization_techniques: ["Image Compression", "Lazy Loading", "CDN Integration", "PWA"],
        
        performance_metrics: {
          image_size_reduction: "95%",
          google_ranking: "First page",
          mobile_performance: "PWA compliant"
        },
        
        impact: "Professional client project with measurable performance improvements"
      },
      
      {
        id: "ar-navigation-backend",
        name: "AR Indoor Navigation Backend",
        type: "Research & Development",
        status: "MVP Completed",
        organization: "INESC TEC",
        
        description: "Extensible Python backend architecture for AR indoor navigation system",
        
        technical_highlights: [
          "Extensible Python backend architecture design",
          "QR location and compass orientation processing", 
          "Voice guidance system integration",
          "Multi-floor navigation logic",
          "RESTful API for Android client communication",
          "4-week development cycle with working MVP"
        ],
        
        backend_technologies: ["Python", "REST API", "Location Services", "Voice Processing"],
        architecture_focus: ["Extensible Design", "Multi-floor Logic", "Real-time Processing"],
        
        technical_scope: {
          development_time: "4 weeks",
          target_environments: ["Museums", "Hospitals"],
          navigation_features: ["QR Location", "Compass", "Voice Guidance"]
        },
        
        impact: "Demonstrated technical viability for AR wayfinding deployment"
      },
      
      {
        id: "blog-platform", 
        name: "Real-time Blog Platform",
        type: "Full-stack Development",
        status: "Production",
        demo_url: "https://blogricardo.vercel.app",
        repository: "https://github.com/RicardoMorim/Blog",
        
        description: "Full-stack blog platform with real-time features and authentication",
        
        technical_highlights: [
          "Real-time updates and live content synchronization",
          "User authentication and authorization system",
          "Complete CRUD operations for content management", 
          "Firebase backend services integration",
          "Responsive design for all devices",
          "Comment system with real-time updates"
        ],
        
        backend_technologies: ["Firebase", "Real-time Database", "Authentication", "Cloud Functions"],
        features: ["Real-time Updates", "User Auth", "CRUD Operations", "Responsive Design"],
        
        impact: "Demonstrates full-stack development with real-time capabilities"
      }
    ],
    
    // Technical patterns and practices demonstrated
    demonstrated_skills: {
      system_architecture: ["Microservices", "API Design", "Database Design", "Caching Strategies"],
      performance_optimization: ["Query Optimization", "Caching", "Load Testing", "Response Time Improvement"], 
      security: ["Authentication", "Authorization", "CSRF Protection", "OWASP Compliance"],
      devops: ["CI/CD Pipelines", "Automated Testing", "Security Scanning", "Maven Central Publishing"],
      cloud_technologies: ["AWS", "Firebase", "Docker", "Cloud Functions"]
    },
    
    // Quantifiable impact across all projects
    overall_impact: {
      production_users: "Thousands of users across multiple platforms",
      performance_improvements: "Sub-second response times, 95% image size reduction",
      open_source_contributions: "Published library with 500+ downloads",
      code_quality: "Automated testing, security scanning, OWASP compliance"
    }
  };

  return NextResponse.json(projects, {
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
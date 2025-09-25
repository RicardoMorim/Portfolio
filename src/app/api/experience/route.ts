import { NextResponse } from 'next/server';

export async function GET() {
  const experience = {
    summary: "Backend engineering experience with focus on system architecture, performance optimization, and production deployments",
    
    // Professional work experience
    work_experience: [
      {
        id: "inesc-tec-2025",
        position: "Software Engineering Intern",
        organization: "INESC TEC",
        location: "Porto, Portugal", 
        duration: "July 2025 - September 2025",
        type: "Research Internship",
        
        description: "Developed AR indoor navigation Android prototype as feasibility study, focusing on backend architecture and system integration",
        
        key_achievements: [
          "Delivered working MVP in 4 weeks with multi-floor navigation capabilities",
          "Designed extensible Python backend architecture for scalable deployment",
          "Implemented QR location tracking and compass orientation processing",
          "Added voice guidance system exceeding original project scope",
          "Demonstrated technical viability for museum and hospital deployments",
          "Received positive feedback from technical advisors for independent execution"
        ],
        
        technical_contributions: {
          backend_development: "Extensible Python architecture design",
          system_integration: "QR location + compass orientation processing", 
          feature_expansion: "Voice guidance system implementation",
          target_deployment: "Museums and hospitals navigation systems"
        },
        
        technologies_used: ["Python", "Android Integration", "Location Services", "Voice Processing", "REST APIs"],
        impact: "Proved AR wayfinding concept suitable for potential production deployment"
      },
      
      {
        id: "match-dinner-2024",
        position: "Freelance Full Stack Developer", 
        organization: "Match Dinner Mondays",
        location: "Remote",
        duration: "October 2024 - November 2024",
        type: "Professional Freelance",
        
        description: "Performance optimization and SEO implementation for dating platform, focusing on backend efficiency and user experience improvements",
        
        key_achievements: [
          "Optimized image processing: 3-5MB → ~200KB (up to 95% reduction) using WebP compression", 
          "Implemented lazy loading reducing initial page load times to sub-second",
          "Achieved first-page Google rankings through comprehensive SEO strategy",
          "Delivered PWA functionality improving mobile user engagement",
          "Collaborated directly with client through iterative development process",
          "Adapted feature complexity based on user feedback and business requirements"
        ],
        
        technical_contributions: {
          performance_optimization: "Up to95% image size reduction, sub-second load times",
          seo_implementation: "First-page Google rankings achievement", 
          mobile_optimization: "PWA functionality and responsive design",
          client_collaboration: "Direct stakeholder communication and iterative development"
        },
        
        technologies_used: ["React", "Firebase", "WebP Compression", "PWA", "SEO Optimization"],
        impact: "Measurable performance improvements and improved search visibility for client"
      }
    ],
    
    // Technical projects and achievements
    technical_achievements: [
      {
        id: "auth-library-2025",
        achievement: "Published Production Authentication Library",
        date: "2025", 
        description: "Designed, developed, and published enterprise-grade Spring Boot authentication library to Maven Central",
        
        technical_details: {
          architecture: "Zero-code integration with polymorphic patterns for full-service replacement",
          security: "CSRF protection, Redis-backed rate limiting, HTTPS-enforced JWT cookies",
          performance: "12ms request overhead with OWASP compliance",
          scalability: "Load tested with 100k users showing 22% query improvement",
          devops: "Complete CI/CD with GitHub Actions, automated testing, and security scanning"
        },
        
        impact: "500+ downloads, used by other developers for production authentication systems",
        technologies: ["Java", "Spring Boot", "PostgreSQL", "Redis", "JWT", "Maven", "GitHub Actions"]
      },
      
      {
        id: "performance-optimization-2024",
        achievement: "High-Performance Stock Platform Architecture",
        date: "2024",
        description: "Built real-time stock portfolio tracker with advanced caching and API optimization techniques",
        
        technical_details: {
          performance: "Reduced load times from 20+ seconds to sub-second responses",
          architecture: "Parallel API processing across 4 financial data providers", 
          reliability: "Intelligent fallback strategies handling data inconsistencies",
          caching: "Redis implementation with TTL and cache invalidation strategies",
          scalability: "Optimized for high-frequency data updates and concurrent users"
        },
        
        impact: "Production platform serving real-time financial data with enterprise-level performance",
        technologies: ["Node.js", "MongoDB", "Redis", "Financial APIs", "Caching Strategies"]
      }
    ],
    
    // Education and certifications  
    education: [
      {
        id: "software-engineering-current",
        degree: "Software Engineering",
        institution: "University Studies",
        status: "In Progress", 
        focus_areas: ["Backend Systems", "Cloud Architecture", "Scalable Application Development"],
        relevant_coursework: ["Algorithms & Data Structures", "Database Systems", "Software Architecture", "System Design"]
      },
      
      {
        id: "cs50ai-2024",
        certification: "CS50AI - Introduction to Artificial Intelligence",
        institution: "Harvard University",
        date: "2024",
        credential_url: "https://certificates.cs50.io/3ea075ca-3cac-49e2-be29-281d46d5ba94.pdf",
        focus_areas: ["Machine Learning Algorithms", "AI System Architecture", "Neural Networks"],
        application: "Applied knowledge in Resume Optimizer project with LLM integration"
      },
      
      {
        id: "cs50x-2021", 
        certification: "CS50X - Introduction to Computer Science",
        institution: "Harvard University",
        date: "2021",
        credential_url: "https://certificates.cs50.io/9a13ae2c-7f89-4ffe-a5c4-9e7e6bcadab2.pdf",
        focus_areas: ["Computer Science Fundamentals", "Algorithms", "Data Structures", "Memory Management"],
        foundation: "Established strong foundation for backend engineering career"
      }
    ],
    
    // Skills development timeline
    skill_development: {
      "2018": {
        milestone: "Programming Journey Begins",
        focus: "System-level programming fundamentals",
        technologies: ["Javascript", "Basic algorithms"]
      },
      
      "2021": {
        milestone: "Computer Science Foundation", 
        focus: "Algorithms, data structures, and software engineering principles",
        achievements: ["CS50X Certification"]
      },
      
      "2023": {
        milestone: "Backend Architecture Focus",
        focus: "Transition to backend systems, API design, and database optimization",
        technologies: ["Java", "Spring Boot", "PostgreSQL", "REST APIs"]
      },
      
      "2024": {
        milestone: "AI Integration & Performance Expert",
        focus: "Machine learning integration and advanced performance optimization",
        achievements: ["CS50AI Certification", "Performance optimization projects"]
      },
      
      "2025": {
        milestone: "Production Library & Research Experience",
        focus: "Enterprise-grade solutions and research-oriented development",
        achievements: ["Maven Central publication", "INESC TEC internship"]
      }
    },
    
    // Professional development
    professional_skills: {
      technical_leadership: "Independent project execution with technical advisor feedback",
      client_communication: "Direct stakeholder collaboration with iterative development",
      problem_solving: "Complex system architecture design and performance optimization",
      research_orientation: "Feasibility studies and proof-of-concept development",
      quality_assurance: "Automated testing, security scanning, and code quality standards"
    },
    
    // Languages
    languages: {
      portuguese: "Native",
      english: "Professional proficiency"
    },
    
    // Current status
    current_status: {
      availability: "Open to backend engineering opportunities",
      interests: ["System Architecture", "Cloud Technologies", "Performance Optimization", "Microservices"],
      location_preference: "Porto, Portugal or Remote",
      career_focus: "Backend Engineering, System Architecture, Performance Optimization"
    }
  };

  return NextResponse.json(experience, {
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
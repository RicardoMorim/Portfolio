import { NextResponse } from 'next/server';

export async function GET() {
  const profile = {
    name: "Ricardo Morim",
    title: "Backend Engineer",
    subtitle: "Systems Architect",
    location: "Porto, Portugal",
    summary: "Backend Engineer specialized in Spring Boot, system architecture, and high-performance applications with production experience in authentication systems, performance optimization, and cloud technologies.",
    
    // Core backend engineering focus
    expertise: [
      "Backend System Architecture",
      "Spring Boot Application Development", 
      "Database Design & Optimization",
      "API Design & Development",
      "Performance Optimization",
      "Authentication & Security",
      "CI/CD & DevOps",
      "Cloud Technologies (AWS)"
    ],
    
    // Quantifiable achievements that show backend competence
    achievements: [
      "Published production Spring Boot library on Maven Central with 12ms overhead",
      "Optimized database queries achieving 22% improvement and 73x faster pagination",
      "Reduced API response times from 20+ seconds to sub-second with Redis caching",
      "Implemented CSRF protection and OWASP-compliant security measures",
      "Built extensible Python backend architecture for AR navigation system"
    ],
    
    // Programming languages prioritizing backend
    languages: {
      primary: ["Java", "Python", "TypeScript", "JavaScript"],
      secondary: ["C#", "SQL"]
    },
    
    // Technology stack organized by backend focus
    technologies: {
      backend_frameworks: ["Spring Boot", "Node.js", "Express.js", "ASP.NET"],
      databases: ["PostgreSQL", "MongoDB", "Redis"],
      cloud_devops: ["Docker", "AWS", "GitHub Actions", "Maven"],
      tools: ["Git", "Postman", "Jira", "Swagger"]
    },
    
    // Education highlighting CS fundamentals
    education: [
      {
        degree: "Software Engineering (In Progress)",
        institution: "University Studies",
        focus: "Backend Systems, Systems Architecture, Scalable Applications",
        year: "2023-2026(expected)"
      },
      {
        certification: "CS50AI - Harvard University",
        year: "2024",
        focus: "Machine Learning Algorithms, AI System Architecture"
      },
      {
        certification: "CS50X - Harvard University", 
        year: "2021",
        focus: "Computer Science Fundamentals, Algorithms, Data Structures"
      },
      {
        certification: "AWS Solutions Architect - Associate (In Progress with BeSA program)",
        year: "2025 (expected)",
        focus: "Cloud Architecture, AWS Services, Scalable Backend Systems"
      }
    ],
    
    // Contact information (public)
    contact: {
      github: "https://github.com/RicardoMorim",
      linkedin: "https://www.linkedin.com/in/ricardo-morim-208368251/",
      portfolio: "https://ricardomorim.vercel.app",
      resume: "https://ricardomorim.vercel.app/resume.pdf"
    },
    
    // API metadata for agents
    api_info: {
      version: "1.0",
      last_updated: new Date().toISOString().split('T')[0],
      endpoints: {
        projects: "/api/projects",
        skills: "/api/skills", 
        experience: "/api/experience",
        documentation: "/api/docs"
      }
    }
  };

  return NextResponse.json(profile, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
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
import { NextRequest, NextResponse } from 'next/server';

// Searchable content aggregated from all API endpoints
const searchableData = {
  skills: [
    'Java', 'Spring Boot', 'Node.js', 'JavaScript', 'TypeScript', 'Python',
    'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Azure',
    'Git', 'GitHub Actions', 'Jenkins', 'Linux', 'REST API', 'GraphQL',
    'Authentication', 'Security', 'Performance Optimization', 'System Architecture',
    'Microservices', 'Database Design', 'CI/CD', 'Test-Driven Development',
    'Agile Development', 'SOLID Principles', 'Design Patterns'
  ],
  projects: [
    {
      name: 'Production Authentication Library',
      keywords: ['Spring Boot', 'Authentication', 'Security', 'Maven Central', 'OWASP', 'JWT', 'Redis', 'Performance', 'Library', 'Open Source'],
      description: 'Enterprise-grade Spring Boot authentication library with zero-code integration and 12ms overhead',
      category: 'Backend Library'
    },
    {
      name: 'AI Resume Optimizer',
      keywords: ['AI', 'LLM', 'NVIDIA', 'Prompt Engineering', 'TypeScript', 'Node.js', 'Optimization'],
      description: 'AI-powered resume optimization using NVIDIA Llama-3.1 Nemotron Ultra with advanced prompt engineering',
      category: 'AI Application'
    },
    {
      name: 'Real-time Stock Platform', 
      keywords: ['Performance', 'Redis', 'Financial Data', 'Real-time', 'API Integration', 'Caching', 'Node.js'],
      description: 'High-performance stock portfolio tracker with Redis caching reducing load times to sub-second responses',
      category: 'Financial Platform'
    },
    {
      name: 'Match Dinner Mondays',
      keywords: ['Performance', 'SEO', 'Image Optimization', 'PWA', 'Client Project', 'React'],
      description: 'Performance-optimized dating platform with 95% image compression and first-page Google SEO rankings',
      category: 'Client Project'
    },
    {
      name: 'Real-time Blog Platform',
      keywords: ['Real-time', 'Firebase', 'Authentication', 'Blog', 'CRUD', 'React'],
      description: 'Full-stack blog platform with real-time updates, authentication, and complete CRUD operations',
      category: 'Full-stack Platform'
    },
    {
      name: 'LAPR2 Restaurant Management',
      keywords: ['Java', 'OOP', 'Design Patterns', 'UML', 'Software Engineering', 'Enterprise'],
      description: 'Object-oriented restaurant management system with comprehensive design patterns implementation',
      category: 'Academic Project'
    },
    {
      name: 'Ristorante Ordering System',
      keywords: ['Node.js', 'Express', 'MongoDB', 'Real-time', 'WebSockets', 'Restaurant', 'Ordering'],
      description: 'Real-time restaurant ordering system with live updates and comprehensive order management',
      category: 'Restaurant System'
    }
  ],
  experience: [
    {
      role: 'Research Intern',
      company: 'INESC TEC',
      keywords: ['PostgreSQL', 'Performance', 'Database Optimization', 'Query Optimization', 'Research'],
      achievements: ['22% query performance improvement', '73x pagination speedup', 'Database optimization research']
    },
    {
      role: 'Open Source Contributor',
      company: 'Maven Central',
      keywords: ['Spring Boot', 'Authentication', 'Library Development', 'Open Source', 'Maven'],
      achievements: ['Published authentication library', 'Zero-code integration', '12ms overhead performance']
    }
  ],
  focus_areas: [
    'Backend Engineering', 'System Architecture', 'Performance Optimization',
    'Authentication Systems', 'Database Design', 'API Development',
    'Spring Boot Development', 'High-Performance Applications'
  ]
};

// Function to calculate relevance score based on keyword matches
function calculateRelevanceScore(query: string, item: any): number {
  const queryTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 2);
  let score = 0;
  const maxScore = queryTerms.length * 10; // Base scoring system

  for (const term of queryTerms) {
    // Check different fields with different weights
    if (typeof item === 'string') {
      if (item.toLowerCase().includes(term)) score += 10;
    } else if (item.keywords) {
      // Keywords get highest weight
      for (const keyword of item.keywords) {
        if (keyword.toLowerCase().includes(term)) score += 15;
      }
    }

    if (item.name && item.name.toLowerCase().includes(term)) score += 12;
    if (item.description && item.description.toLowerCase().includes(term)) score += 8;
    if (item.role && item.role.toLowerCase().includes(term)) score += 10;
    if (item.company && item.company.toLowerCase().includes(term)) score += 8;
    if (item.category && item.category.toLowerCase().includes(term)) score += 6;
  }

  return Math.min(score / maxScore * 100, 100); // Normalize to 0-100 scale
}

// Function to perform fuzzy matching
function fuzzyMatch(query: string, target: string): boolean {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  
  // Exact match
  if (t.includes(q)) return true;
  
  // Acronym match (e.g., "sb" matches "Spring Boot")
  const words = t.split(/\s+/);
  const acronym = words.map(word => word.charAt(0)).join('');
  if (acronym === q) return true;
  
  // Partial word match
  return words.some(word => word.startsWith(q) || q.startsWith(word));
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || searchParams.get('query') || '';
  const category = searchParams.get('category') || 'all';
  const limit = parseInt(searchParams.get('limit') || '10');
  const minScore = parseFloat(searchParams.get('min_score') || '0');

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'public, s-maxage=3600', // 1 hour cache
    'Content-Type': 'application/json',
  };

  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers });
  }

  if (!query) {
    return NextResponse.json(
      { 
        error: 'Query parameter required',
        usage: 'GET /api/search?q=spring%20boot&category=projects&limit=5',
        categories: ['all', 'skills', 'projects', 'experience', 'focus']
      },
      { status: 400, headers }
    );
  }

  const results: any = {
    query,
    category,
    total_results: 0,
    execution_time_ms: 0,
    results: {
      skills: [],
      projects: [],
      experience: [],
      focus_areas: []
    },
    suggestions: []
  };

  const startTime = performance.now();

  // Search skills
  if (category === 'all' || category === 'skills') {
    for (const skill of searchableData.skills) {
      const score = calculateRelevanceScore(query, skill);
      if (score > minScore || fuzzyMatch(query, skill)) {
        results.results.skills.push({
          skill,
          relevance_score: score,
          match_type: skill.toLowerCase().includes(query.toLowerCase()) ? 'exact' : 'fuzzy'
        });
      }
    }
    results.results.skills.sort((a: any, b: any) => b.relevance_score - a.relevance_score);
    results.results.skills = results.results.skills.slice(0, limit);
  }

  // Search projects
  if (category === 'all' || category === 'projects') {
    for (const project of searchableData.projects) {
      const score = calculateRelevanceScore(query, project);
      if (score > minScore || project.keywords.some((k: string) => fuzzyMatch(query, k))) {
        results.results.projects.push({
          ...project,
          relevance_score: score,
          matched_keywords: project.keywords.filter((k: string) => 
            k.toLowerCase().includes(query.toLowerCase()) || fuzzyMatch(query, k)
          )
        });
      }
    }
    results.results.projects.sort((a: any, b: any) => b.relevance_score - a.relevance_score);
    results.results.projects = results.results.projects.slice(0, limit);
  }

  // Search experience
  if (category === 'all' || category === 'experience') {
    for (const exp of searchableData.experience) {
      const score = calculateRelevanceScore(query, exp);
      if (score > minScore || exp.keywords.some((k: string) => fuzzyMatch(query, k))) {
        results.results.experience.push({
          ...exp,
          relevance_score: score,
          matched_keywords: exp.keywords.filter((k: string) => 
            k.toLowerCase().includes(query.toLowerCase()) || fuzzyMatch(query, k)
          )
        });
      }
    }
    results.results.experience.sort((a: any, b: any) => b.relevance_score - a.relevance_score);
    results.results.experience = results.results.experience.slice(0, limit);
  }

  // Search focus areas
  if (category === 'all' || category === 'focus') {
    for (const focus of searchableData.focus_areas) {
      const score = calculateRelevanceScore(query, focus);
      if (score > minScore || fuzzyMatch(query, focus)) {
        results.results.focus_areas.push({
          area: focus,
          relevance_score: score,
          match_type: focus.toLowerCase().includes(query.toLowerCase()) ? 'exact' : 'fuzzy'
        });
      }
    }
    results.results.focus_areas.sort((a: any, b: any) => b.relevance_score - a.relevance_score);
    results.results.focus_areas = results.results.focus_areas.slice(0, limit);
  }

  // Calculate total results
  results.total_results = Object.values(results.results).reduce((sum: number, arr: any) => sum + arr.length, 0);

  // Add suggestions for no results
  if (results.total_results === 0) {
    const suggestions = [];
    
    // Suggest similar skills
    for (const skill of searchableData.skills.slice(0, 3)) {
      if (skill.toLowerCase().includes(query.charAt(0))) {
        suggestions.push(`Try "${skill}"`);
      }
    }
    
    // Suggest popular terms
    if (suggestions.length === 0) {
      suggestions.push(
        'Try "Spring Boot" for backend projects',
        'Try "Performance" for optimization work',
        'Try "Authentication" for security projects'
      );
    }
    
    results.suggestions = suggestions;
  }

  results.execution_time_ms = Math.round((performance.now() - startTime) * 100) / 100;

  return NextResponse.json(results, { headers });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
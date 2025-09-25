import { NextRequest, NextResponse } from 'next/server';

// Define proper types for the searchable data
interface ProjectItem {
  name: string;
  keywords: string[];
  description: string;
  category: string;
}

interface ExperienceItem {
  role: string;
  company: string;
  keywords: string[];
  achievements: string[];
}

interface SkillResult {
  skill: string;
  relevance_score: number;
  match_type: 'exact' | 'fuzzy';
}

interface ProjectResult extends ProjectItem {
  relevance_score: number;
  matched_keywords: string[];
}

interface ExperienceResult extends ExperienceItem {
  relevance_score: number;
  matched_keywords: string[];
}

interface FocusAreaResult {
  area: string;
  relevance_score: number;
  match_type: 'exact' | 'fuzzy';
}

interface SearchResults {
  query: string;
  category: string;
  total_results: number;
  execution_time_ms: number;
  results: {
    skills: SkillResult[];
    projects: ProjectResult[];
    experience: ExperienceResult[];
    focus_areas: FocusAreaResult[];
  };
  suggestions: string[];
}

// Union type for items that can be searched
type SearchableItem = string | ProjectItem | ExperienceItem;

// Type guard functions to narrow the type
function isProjectItem(item: SearchableItem): item is ProjectItem {
  return typeof item === 'object' && item !== null && 'name' in item && 'keywords' in item && 'description' in item;
}

function isExperienceItem(item: SearchableItem): item is ExperienceItem {
  return typeof item === 'object' && item !== null && 'role' in item && 'company' in item && 'keywords' in item;
}

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
      description: 'Enterprise-grade Spring Boot authentication library with zero-code integration and only 12ms overhead for the auth process.\n \n• CSRF protection and Redis-backed rate limiting\n• JWT security with OWASP compliance\n• Benchmarked with 100k users: 22% query improvement, 73x faster pagination\n• Full CI/CD with automated testing and security scanning',
      category: 'Backend Library'
    },
    {
      name: 'AI Resume Optimizer',
      keywords: ['AI', 'LLM', 'Prompt Engineering', 'TypeScript', 'Node.js', 'Optimization'],
      description: 'AI-powered resume optimization using NVIDIA Llama-3.1 Nemotron Ultra with advanced prompt engineering and error handling for reliable feedback.\n\n• Consistent JSON responses with structured scoring\n• Token consumption optimization\n• 4 comprehensive evaluation criteria\n• MongoDB backend for user data persistence',
      category: 'AI Application'
    },
    {
      name: 'Real-time Stock Platform', 
      keywords: ['Performance', 'Redis', 'Financial Data', 'Real-time', 'API Integration', 'Caching', 'Node.js'],
      description: 'High-performance stock portfolio tracker with Redis caching reducing load times to sub-second responses and parallel API processing across multiple financial data providers.\n\n• Intelligent fallback strategies for data consistency\n• Real-time portfolio tracking and analytics\n• Optimized for high-frequency data updates',
      category: 'Financial Platform'
    },
    {
      name: 'Real-time Blog Platform',
      keywords: ['Real-time', 'Firebase', 'Authentication', 'Blog', 'CRUD', 'React'],
      description: 'Full-stack blog platform with real-time updates, authentication, and complete CRUD operations for content management.',
      category: 'Full-stack Platform'
    },
    {
      name: 'Ristorante Ordering System',
      keywords: ['Node.js', 'Express', 'MongoDB', 'Real-time', 'WebSockets', 'Restaurant', 'Ordering'],
      description: 'Real-time restaurant ordering system with live updates and comprehensive comment system. ',
      category: 'Restaurant System'
    }
  ] as ProjectItem[],
  professional_experience: [
    {
      role: 'Research Intern',
      company: 'INESC TEC',
      keywords: ["Unity", "AR", "Augmented Reality", "Python", "Backend", "Research"],
      achievements: ["Full AR system created in Unity in less than 4 weeks", "TTS integration"]
    },
    {
      role: 'Freelance Full Stack Developer',
      company: 'Match Dinner Mondays',
      keywords: ['Performance', 'SEO', 'Image Optimization', 'PWA', 'Client Project', 'React'],
      achievements: ['95% image compression with WebP', 'First-page Google SEO rankings', 'PWA implementation for mobile users']
    }
  ] as ExperienceItem[],
  focus_areas: [
    'Backend Engineering', 'System Architecture', 'Performance Optimization',
    'Authentication Systems', 'Database Design', 'API Development',
    'Spring Boot Development', 'High-Performance Applications'
  ]
};

// Function to calculate relevance score based on keyword matches
function calculateRelevanceScore(query: string, item: SearchableItem): number {
  const queryTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 2);
  let score = 0;
  const maxScore = queryTerms.length * 10; // Base scoring system

  for (const term of queryTerms) {
    // Check different fields with different weights
    if (typeof item === 'string') {
      if (item.toLowerCase().includes(term)) score += 10;
    } else if (isProjectItem(item)) {
      // Keywords get highest weight
      for (const keyword of item.keywords) {
        if (keyword.toLowerCase().includes(term)) score += 15;
      }

      if (item.name.toLowerCase().includes(term)) score += 12;
      if (item.description.toLowerCase().includes(term)) score += 8;
      if (item.category.toLowerCase().includes(term)) score += 6;
    } else if (isExperienceItem(item)) {
      // Keywords get highest weight
      for (const keyword of item.keywords) {
        if (keyword.toLowerCase().includes(term)) score += 15;
      }

      if (item.role.toLowerCase().includes(term)) score += 10;
      if (item.company.toLowerCase().includes(term)) score += 8;
    }
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

  const results: SearchResults = {
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
    results.results.skills.sort((a: SkillResult, b: SkillResult) => b.relevance_score - a.relevance_score);
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
    results.results.projects.sort((a: ProjectResult, b: ProjectResult) => b.relevance_score - a.relevance_score);
    results.results.projects = results.results.projects.slice(0, limit);
  }

  // Search experience
  if (category === 'all' || category === 'experience') {
    for (const exp of searchableData.professional_experience) {
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
    results.results.experience.sort((a: ExperienceResult, b: ExperienceResult) => b.relevance_score - a.relevance_score);
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
    results.results.focus_areas.sort((a: FocusAreaResult, b: FocusAreaResult) => b.relevance_score - a.relevance_score);
    results.results.focus_areas = results.results.focus_areas.slice(0, limit);
  }

  // Calculate total results
  results.total_results = Object.values(results.results).reduce((sum: number, arr: SkillResult[] | ProjectResult[] | ExperienceResult[] | FocusAreaResult[]) => sum + arr.length, 0);

  // Add suggestions for no results
  if (results.total_results === 0) {
    const suggestions: string[] = [];
    
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
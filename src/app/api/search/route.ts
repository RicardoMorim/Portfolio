import { NextRequest, NextResponse } from 'next/server';
import { featuredProjects, workExperience, skills, focusAreas } from '@/content/portfolio';

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
  skills: skills.categories.flatMap((category) => category.items),
  projects: featuredProjects.map((project) => ({
    name: project.name,
    keywords: project.technologies,
    description: [project.description, ...project.technical_highlights].join(" "),
    category: project.type ?? "Software project",
  })) satisfies ProjectItem[],
  professional_experience: workExperience.map((item) => ({
    role: item.position,
    company: item.organization,
    keywords: [item.position, item.organization, item.description, ...item.key_achievements],
    achievements: [item.description, ...item.key_achievements],
  })) satisfies ExperienceItem[],
  focus_areas: focusAreas,
};

// Function to calculate relevance score based on keyword matches
function calculateRelevanceScore(query: string, item: SearchableItem): number {
  const queryTerms = query.toLowerCase().split(/\s+/).filter(Boolean);
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
  const query = (searchParams.get('q') || searchParams.get('query') || '').trim();
  const category = searchParams.get('category') || 'all';
  const limit = Number(searchParams.get('limit') ?? '10');
  const minScore = Number(searchParams.get('min_score') ?? '0');

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

  if (!query || !Number.isInteger(limit) || limit < 1 || limit > 50 || !Number.isFinite(minScore) || minScore < 0 || minScore > 100 || !['all', 'skills', 'projects', 'experience', 'focus'].includes(category)) {
    return NextResponse.json(
      { 
        error: 'Provide a non-empty query, a valid category, limit (1–50) and min_score (0–100)',
        usage: 'GET /api/search?q=AI%20Security&category=projects&limit=5',
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
        'Try "AI Security" for security work',
        'Try "Agentic" for AI workflows',
        'Try "CI/CD" for development automation'
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
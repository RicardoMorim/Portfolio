import { NextResponse } from 'next/server';

export async function GET() {
  const apiDocs = {
    title: "Ricardo Morim: Portfolio API",
    description: "Structured profile, experience, skills and selected projects in AI engineering, AI security and software engineering.",
    version: "1.0.0",
    last_updated: "2026-11-03",
    endpoints: {
      "/api/profile": { method: "GET", description: "Current role, focus areas, education, certifications and contact links" },
      "/api/experience": { method: "GET", description: "Professional experience, achievements and education" },
      "/api/projects": { method: "GET", description: "Selected projects, technical highlights and available public links" },
      "/api/skills": { method: "GET", description: "Skills grouped by AI engineering, AI security and software engineering" },
      "/api/search": { method: "GET", description: "Search the same profile and project content", parameters: ["q", "category", "limit"] },
      "/api/openapi": { method: "GET", description: "OpenAPI specification" },
    },
    data_notes: [
      "Profile content was reviewed with the portfolio owner on 2026-11-03.",
      "Private professional work is described without internal screenshots or source code.",
      "Project descriptions do not imply a currently verified production deployment.",
      "The master’s degree is in progress; the bachelor’s degree and AWS certification are completed.",
    ],
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
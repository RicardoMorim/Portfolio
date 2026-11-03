import { NextResponse } from 'next/server';
import { featuredProjects } from "@/content/portfolio";

export async function GET() {
  const projects = { summary: "Selected AI engineering, AI security and software engineering projects", total_projects: featuredProjects.length, featured_projects: featuredProjects };

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
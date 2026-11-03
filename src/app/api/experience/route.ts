import { NextResponse } from 'next/server';
import { workExperience, education, profile } from "@/content/portfolio";

export async function GET() {
  const experience = { summary: profile.summary, work_experience: workExperience, technical_achievements: profile.achievements.map((achievement) => ({ achievement })), education, current_status: profile.current_role };

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
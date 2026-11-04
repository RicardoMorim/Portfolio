import { NextResponse } from "next/server";
import { contentUpdated, focusAreas, profile } from "@/content/portfolio";
import { SITE_URL } from "@/content/site";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(
    {
      name: `${profile.name} Portfolio`,
      description: "Machine-readable portfolio data for AI agents and recruiting tools",
      updated: contentUpdated,
      owner: {
        name: profile.name,
        title: profile.title,
        subtitle: profile.subtitle,
        organization: profile.current_role.organization,
        location: profile.location,
        focus: focusAreas,
        links: { github: profile.contact.github, linkedin: profile.contact.linkedin, website: SITE_URL },
      },
      access: {
        summary: `${SITE_URL}/llms.txt`,
        full_text: `${SITE_URL}/llms-full.txt`,
        mcp: `${SITE_URL}/api/mcp`,
        openapi: `${SITE_URL}/api/openapi`,
        docs: `${SITE_URL}/api/docs`,
        api_catalog: `${SITE_URL}/.well-known/api-catalog`,
      },
    },
    { headers: { "Access-Control-Allow-Origin": "*" } },
  );
}

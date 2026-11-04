import { NextResponse } from "next/server";
import { SITE_URL } from "@/content/site";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(
    {
      name: "ricardo-morim-portfolio",
      description: "Read-only public information about Ricardo Morim: profile, experience, projects and skills.",
      url: `${SITE_URL}/api/mcp`,
      transport: "streamable-http",
      authentication: "none",
    },
    { headers: { "Access-Control-Allow-Origin": "*" } },
  );
}

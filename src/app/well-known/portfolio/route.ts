import { NextResponse } from "next/server";
import { CONTACT_EMAIL } from "@/content/site";

export async function GET() {
  return NextResponse.json(
    {
      name: "Ricardo Morim Portfolio",
      shortName: "Ricardo Portfolio",
      description:
        "Portfolio metadata and API-style profile for Ricardo Morim.",
      url: "https://www.ricardomorim.com/",
      apiBaseUrl: "https://www.ricardomorim.com/api",
      owner: {
        name: "Ricardo Morim",
        email: CONTACT_EMAIL,
        location: "Porto, Portugal",
        role: "AI Software Engineer · AI Security",
      },
      links: {
        github: "https://github.com/RicardoMorim",
        linkedin: "https://www.linkedin.com/in/ricardo-morim-208368251/",
      },
      generatedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    }
  );
}

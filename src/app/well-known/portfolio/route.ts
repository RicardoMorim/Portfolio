import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      name: "Ricardo Morim Portfolio",
      shortName: "Ricardo Portfolio",
      description:
        "Portfolio metadata and API-style profile for Ricardo Morim.",
      url: "https://ricardoportfolio.vercel.app/",
      apiBaseUrl: "https://ricardoportfolio.vercel.app/api",
      owner: {
        name: "Ricardo Morim",
        email: "ricardomorim05@gmail.com",
        location: "Porto, Portugal",
        role: "Backend Engineer",
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

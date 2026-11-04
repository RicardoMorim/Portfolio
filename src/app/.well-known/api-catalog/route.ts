import { NextResponse } from "next/server";
import { SITE_URL } from "@/content/site";

export const dynamic = "force-static";

/** RFC 9727: lets a client find this site's APIs from one well-known address. */
export function GET() {
  const linkset = {
    linkset: [
      {
        anchor: `${SITE_URL}/api`,
        "service-desc": [{ href: `${SITE_URL}/api/openapi`, type: "application/json" }],
        "service-doc": [{ href: `${SITE_URL}/api/docs`, type: "application/json" }],
      },
    ],
  };
  return new NextResponse(JSON.stringify(linkset), {
    headers: { "Content-Type": "application/linkset+json", "Access-Control-Allow-Origin": "*" },
  });
}

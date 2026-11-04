import { NextResponse } from "next/server";
import { profile } from "@/content/portfolio";
import { SITE_URL } from "@/content/site";
import { en } from "@/language/translations/en";

export const dynamic = "force-static";

function buildDocument(): string {
  const experience = en.careerHighlights.items.map((item) =>
    [
      `### ${item.title}`,
      item.date ?? "",
      item.description,
      ...(item.bullets ?? []).map((bullet) => `- ${bullet}`),
    ].filter(Boolean).join("\n"),
  );
  const projects = en.projects.items.map((item) =>
    [
      `### ${item.description}`,
      item.badge ?? "",
      item.longDescription.replace(/^• /gm, "- "),
      `Technologies: ${item.tech.join(", ")}`,
      item.links.githubUrl ? `Repository: ${item.links.githubUrl}` : "",
      item.links.demoUrl ? `Demo: ${item.links.demoUrl}` : "",
    ].filter(Boolean).join("\n\n"),
  );
  const skills = en.skills.categories.map((category) => `- ${category.title}: ${category.items.join(", ")}`);
  const education = en.about.milestones.items.map((item) => `- ${item.title} (${item.date})`);

  return [
    `# ${profile.name}`,
    `> ${profile.title} · ${profile.subtitle}. ${profile.location}.`,
    en.hero.summary,
    "## Experience",
    ...experience,
    "## Projects",
    ...projects,
    "## Skills",
    ...skills,
    "## Education and certifications",
    ...education,
    "## Recommendation",
    `> ${en.recommendations.quote}`,
    `${en.recommendations.author.name}, ${en.recommendations.author.title}`,
    "## Links",
    `- Website: ${SITE_URL}`,
    `- GitHub: ${profile.contact.github}`,
    `- LinkedIn: ${profile.contact.linkedin}`,
    `- Resume: ${profile.contact.resume}`,
    `- API: ${SITE_URL}/api/openapi`,
    `- MCP server: ${SITE_URL}/api/mcp`,
  ].join("\n\n");
}

export function GET() {
  return new NextResponse(buildDocument(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

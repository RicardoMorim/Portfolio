import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locales, Locale } from "@/language/config";
import { OG_IMAGE, PROJECT_PAGES, SITE_URL, alternatesFor, isLocale, localePath, translationsFor } from "@/content/site";

interface ProjectPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => PROJECT_PAGES.map((slug) => ({ lang, slug })));
}

function findProject(lang: Locale, slug: string) {
  if (!PROJECT_PAGES.includes(slug)) return null;
  return translationsFor(lang).projects.items.find((item) => item.id === slug) ?? null;
}

function splitDescription(text: string): { intro: string; bullets: string[] } {
  const [intro, ...rest] = text.split("\n\n");
  const bullets = rest.join("\n").split("\n").filter((line) => line.startsWith("• ")).map((line) => line.slice(2));
  return { intro, bullets };
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = isLocale(lang) ? findProject(lang, slug) : null;
  if (!isLocale(lang) || !project) return {};
  const title = `${project.description} | Ricardo Morim`;
  const description = splitDescription(project.longDescription).intro;
  const path = `/projects/${slug}`;
  return {
    title,
    description,
    alternates: alternatesFor(lang, path),
    openGraph: { type: "article", title, description, url: localePath(lang, path), images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const project = findProject(lang, slug);
  if (!project) notFound();

  const copy = translationsFor(lang);
  const { intro, bullets } = splitDescription(project.longDescription);
  const home = localePath(lang);
  const url = `${SITE_URL}${localePath(lang, `/projects/${slug}`)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": project.links.githubUrl ? "SoftwareSourceCode" : "CreativeWork",
        name: project.description,
        description: intro,
        url,
        inLanguage: lang,
        keywords: project.tech.join(", "),
        creator: { "@type": "Person", name: "Ricardo Morim", url: SITE_URL },
        ...(project.links.githubUrl ? { codeRepository: project.links.githubUrl } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ricardo Morim", item: `${SITE_URL}${home === "/" ? "" : home}` },
          { "@type": "ListItem", position: 2, name: copy.projects.title, item: `${SITE_URL}${home === "/" ? "" : home}#projects` },
          { "@type": "ListItem", position: 3, name: project.description, item: url },
        ],
      },
    ],
  };

  return (
    <main className="project-page">
      <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>
      <article className="shell project-article">
        <Link href={`${home}#projects`} className="text-link project-back">← {copy.story.backToProjects}</Link>
        {project.badge && <p className="kicker"><span className="kicker-dot" /> {project.badge}</p>}
        <h1 className="section-title">{project.description}</h1>
        <p className="section-lead">{intro}</p>
        {project.image && (
          <Image className="project-image" src={project.image} alt={project.description} width={960} height={540} sizes="(min-width: 900px) 760px, 100vw" />
        )}
        <ul className="case-bullets project-bullets">
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <ul className="chips" aria-label={copy.story.technologies}>
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <div className="case-links project-links">
          {project.links.githubUrl && (
            <a href={project.links.githubUrl} target="_blank" rel="noopener noreferrer">{project.links.github}</a>
          )}
          {project.links.diagramUrl && (
            <a href={project.links.diagramUrl} target="_blank" rel="noopener noreferrer">{project.links.diagram}</a>
          )}
          {project.links.closed && <span className="case-closed">{project.links.closed}</span>}
        </div>
      </article>
    </main>
  );
}

import { contentUpdated, profile, featuredProjects } from "@/content/portfolio";
import { ThemeProvider } from "@/context/ThemeContext";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { locales } from "@/language/config";
import { OG_IMAGE, SITE_URL, alternatesFor, isLocale, localePath, translationsFor } from "@/content/site";

const TITLE = "Ricardo Morim | AI Software Engineer · AI Security";

interface LayoutProps {
  params: Promise<{ lang: string }>;
}

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { seo } = translationsFor(lang);
  return {
    title: TITLE,
    description: seo.description,
    metadataBase: new URL(SITE_URL),
    alternates: alternatesFor(lang),
    icons: {
      icon: [
        { url: "/icons/favicon.ico" },
        { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/icons/apple-touch-icon.png" }],
    },
    manifest: "/icons/site.webmanifest",
    openGraph: {
      type: "website",
      locale: lang === "pt" ? "pt_PT" : "en_US",
      alternateLocale: lang === "pt" ? "en_US" : "pt_PT",
      url: localePath(lang),
      title: TITLE,
      description: seo.description,
      siteName: "Ricardo Morim",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: seo.description,
      images: [OG_IMAGE.url],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#efebe3" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0b0d" },
  ],
};
export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode }> & LayoutProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const person = {
    "@type": "Person",
    name: profile.name,
    url: profile.contact.portfolio,
    image: `${SITE_URL}/me.jpg`,
    jobTitle: profile.title,
    description: profile.summary,
    knowsAbout: profile.expertise,
    worksFor: { "@type": "Organization", name: profile.current_role.organization },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Instituto Superior de Engenharia do Porto" },
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", name: "Licenciatura em Engenharia Informática", credentialCategory: "degree" },
      { "@type": "EducationalOccupationalCredential", name: "AWS Certified Solutions Architect – Associate", credentialCategory: "certification" },
      ...profile.education.filter((item) => "credential_url" in item).map((item) => ({
        "@type": "EducationalOccupationalCredential", name: item.certification, credentialCategory: "course certificate", url: item.credential_url,
      })),
    ],
    sameAs: [profile.contact.github, profile.contact.linkedin],
  };

  const pageUrl = `${SITE_URL}${lang === "pt" ? "/pt" : ""}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: pageUrl,
    inLanguage: lang,
    dateModified: contentUpdated,
    mainEntity: person,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ricardo Morim",
    url: SITE_URL,
    inLanguage: ["en", "pt"],
    author: { "@type": "Person", name: profile.name },
  };

  const projectsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Selected projects by Ricardo Morim",
    itemListElement: featuredProjects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.name,
        description: project.description,
        creator: { "@type": "Person", name: profile.name },
        keywords: project.technologies.join(", "),
        ...(project.repository ? { url: project.repository } : project.demo_url ? { url: project.demo_url } : {}),
      },
    })),
  };

  return (
    <html lang={lang} data-theme="dark" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
      <head>
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>
        <script type="application/ld+json">{JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c")}</script>
        <script type="application/ld+json">{JSON.stringify(projectsJsonLd).replace(/</g, "\\u003c")}</script>
        <link rel="alternate" type="text/markdown" href="/llms-full.txt" title="Full site as Markdown" />
        <link rel="service-desc" type="application/json" href="/api/openapi" />
        <link rel="api-docs" href="/well-known/portfolio" />
        <meta name="api-base-url" content="https://www.ricardomorim.com/api" />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider locale={lang}>
            <a href="#hero" className="skip-link">Skip to content</a>
            <div className="app-container">
              <Navbar />
              {children}
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

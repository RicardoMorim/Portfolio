import { profile, featuredProjects } from "@/content/portfolio";
import { ThemeProvider } from "@/context/ThemeContext";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { Metadata, Viewport } from "next";

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

export const metadata: Metadata = {
  title: "Ricardo Morim | AI Software Engineer · AI Security",
  description:
    "AI Software Engineer at Critical Manufacturing, focused on AI engineering, AI security, agentic workflows and secure software development.",
  keywords: ["Ricardo Morim", "AI Software Engineer", "AI Engineering", "AI Security", "AppSec", "Agentic Workflows", "Python", "FastAPI", "PyTorch", "Vulnerability Management", "CI/CD", "AWS", "Portfolio"],
  metadataBase: new URL("https://www.ricardomorim.com"),
  icons: {
    icon: [
      { url: "/icons/favicon.ico" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/icons/android-chrome-192x192.png",
        color: "#5bbad5",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.ricardomorim.com/",
    title: "Ricardo Morim | AI Software Engineer · AI Security",
    description:
      "AI Software Engineer at Critical Manufacturing, with experience in AI security, agents and SDLC automation.",
    siteName: "Ricardo Morim Portfolio",
    images: [
      {
        url: "/icons/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Ricardo Morim Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ricardo Morim | AI Software Engineer · AI Security",
    description:
      "AI Software Engineer focused on AI engineering, AI security and software development automation",
    images: ["/icons/android-chrome-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: profile.contact.portfolio,
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
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
      <head>
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>
        <script type="application/ld+json">{JSON.stringify(projectsJsonLd).replace(/</g, "\\u003c")}</script>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link 
          rel="manifest" 
          href="/well-known/portfolio" 
          type="application/json" 
        />
        <link 
          rel="api-docs" 
          href="/well-known/portfolio" 
        />

        <meta name="api-base-url" content="https://www.ricardomorim.com/api" />

        <link rel="manifest" href="/icons/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        
        <link rel="canonical" href="https://www.ricardomorim.com" />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
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

import { ThemeProvider } from "@/context/ThemeContext";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Inter, Londrina_Shadow, Saira_Stencil_One } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { Metadata, Viewport } from "next";

const londrinaShadow = Londrina_Shadow({
  weight: "400",
  subsets: ["latin"],
});

const sairaStencil = Saira_Stencil_One({
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ricardo Morim | Backend Engineer",
  description:
    "Backend Engineer specialized in Spring Boot, system architecture, and high-performance applications. Published authentication library on Maven Central with production experience in Java, Node.js, and database optimization.",
  keywords: [
    "Ricardo Morim",
    "Backend Engineer",
    "Systems Architect",
    "Spring Boot Developer",
    "Java Developer",
    "Database Optimization",
    "API Development",
    "Performance Optimization",
    "Authentication Systems",
    "System Architecture",
    "PostgreSQL",
    "Redis",
    "Node.js",
    "Maven Central",
    "Production Systems",
    "Software Engineering",
    "OWASP Security",
    "CI/CD",
    "Docker",
    "AWS",
    "Portfolio",
  ],
  metadataBase: new URL("https://ricardoportfolio.vercel.app"),
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
    url: "https://ricardoportfolio.vercel.app/",
    title: "Ricardo Morim | Backend Engineer",
    description:
      "Backend Engineer specialized in Spring Boot, system architecture, and high-performance applications with production experience.",
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
    title: "Ricardo Morim | Backend Engineer",
    description:
      "Backend Engineer specialized in Spring Boot, system architecture, and high-performance applications",
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
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ricardo Morim",
    url: "https://ricardoportfolio.vercel.app",
    jobTitle: "Backend Engineer",
    description: "Backend Engineer specialized in Spring Boot, system architecture, and high-performance applications",
    knowsAbout: [
      "Backend Development",
      "System Architecture", 
      "Spring Boot",
      "Java Programming",
      "Database Optimization",
      "API Development",
      "Performance Optimization",
      "Authentication Systems",
      "PostgreSQL",
      "Redis",
      "Node.js",
      "CI/CD",
      "Docker",
      "AWS"
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "CS50AI - Introduction to Artificial Intelligence",
        credentialCategory: "certificate",
        recognizedBy: {
          "@type": "Organization", 
          name: "Harvard University"
        },
        url: "https://certificates.cs50.io/3ea075ca-3cac-49e2-be29-281d46d5ba94.pdf"
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "CS50X - Introduction to Computer Science", 
        credentialCategory: "certificate",
        recognizedBy: {
          "@type": "Organization",
          name: "Harvard University"
        },
        url: "https://certificates.cs50.io/9a13ae2c-7f89-4ffe-a5c4-9e7e6bcadab2.pdf"
      }
    ],
    alumniOf: {
      "@type": "Organization",
      name: "Harvard University",
      description: "CS50 Computer Science and AI Certifications"
    },
    workLocation: {
      "@type": "Place",
      name: "Porto, Portugal"
    },
    sameAs: [
      "https://github.com/RicardoMorim",
      "https://www.linkedin.com/in/ricardo-morim-208368251/",
    ],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://ricardoportfolio.vercel.app"
    },
    additionalType: "https://schema.org/SoftwareApplication",
    applicationCategory: "Portfolio Website",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      description: "Backend Engineering Services",
      availability: "https://schema.org/InStock"
    }
  };

  // Schema.org CreativeWork objects for projects
  const projectsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Backend Engineering Projects by Ricardo Morim",
    description: "Production-ready backend projects demonstrating system architecture, performance optimization, and enterprise solutions",
    itemListElement: [
      {
        "@type": "CreativeWork",
        "@id": "https://ricardoportfolio.vercel.app/#auth-library",
        name: "Production Authentication Library",
        description: "Enterprise-grade Spring Boot authentication library published to Maven Central with zero-code integration, CSRF protection, and 12ms overhead",
        creator: {
          "@type": "Person",
          name: "Ricardo Morim"
        },
        programmingLanguage: ["Java", "Spring Boot"],
        about: ["Authentication", "Security", "Performance Optimization", "Open Source"],
        url: "https://github.com/RicardoMorim/auth-Provider",
        additionalType: "SoftwareSourceCode",
        codeRepository: "https://github.com/RicardoMorim/auth-Provider",
        keywords: "Spring Boot, Authentication, Security, Maven Central, OWASP, JWT, Redis",
        applicationCategory: "Library",
        operatingSystem: "Java Virtual Machine"
      },
      {
        "@type": "CreativeWork", 
        "@id": "https://ricardoportfolio.vercel.app/#resume-optimizer",
        name: "AI Resume Optimizer",
        description: "AI-powered resume optimization using NVIDIA's Llama-3.1 Nemotron Ultra with advanced prompt engineering and token optimization",
        creator: {
          "@type": "Person",
          name: "Ricardo Morim"
        },
        programmingLanguage: ["TypeScript", "Node.js"],
        about: ["Artificial Intelligence", "LLM Integration", "Prompt Engineering", "Resume Optimization"],
        url: "https://jobresumebuilder.vercel.app",
        additionalType: "WebApplication",
        keywords: "AI, LLM, NVIDIA, Prompt Engineering, Resume, Optimization",
        applicationCategory: "Productivity"
      },
      {
        "@type": "CreativeWork",
        "@id": "https://ricardoportfolio.vercel.app/#stock-platform", 
        name: "Real-time Stock Platform",
        description: "High-performance stock portfolio tracker with Redis caching reducing load times from 20+ seconds to sub-second responses",
        creator: {
          "@type": "Person", 
          name: "Ricardo Morim"
        },
        programmingLanguage: ["Node.js", "JavaScript"],
        about: ["Performance Optimization", "Real-time Data", "Financial APIs", "Caching"],
        url: "https://stockinformation.vercel.app",
        codeRepository: "https://github.com/RicardoMorim/Stock_Information",
        additionalType: "WebApplication",
        keywords: "Redis, Performance, Financial Data, Real-time, API Integration",
        applicationCategory: "Finance"
      },
      {
        "@type": "CreativeWork",
        "@id": "https://ricardoportfolio.vercel.app/#match-dinner",
        name: "Match Dinner Mondays",
        description: "Performance-optimized dating platform with 95% image compression and first-page Google SEO rankings",
        creator: {
          "@type": "Person",
          name: "Ricardo Morim"
        },
        programmingLanguage: ["React", "JavaScript"],
        about: ["Performance Optimization", "SEO", "Image Compression", "PWA"],
        url: "https://matchdinnermondays.pt",
        additionalType: "WebApplication", 
        keywords: "Performance, SEO, Image Optimization, PWA, Client Project",
        applicationCategory: "Social"
      },
      {
        "@type": "CreativeWork",
        "@id": "https://ricardoportfolio.vercel.app/#blog-platform",
        name: "Real-time Blog Platform", 
        description: "Full-stack blog platform with real-time updates, authentication, and complete CRUD operations",
        creator: {
          "@type": "Person",
          name: "Ricardo Morim"
        },
        programmingLanguage: ["React", "JavaScript"],
        about: ["Real-time Systems", "Authentication", "CRUD Operations", "Full-stack Development"],
        url: "https://blogricardo.vercel.app",
        codeRepository: "https://github.com/RicardoMorim/Blog",
        additionalType: "WebApplication",
        keywords: "Real-time, Firebase, Authentication, Blog, CRUD",
        applicationCategory: "Publishing"
      },
      {
        "@type": "Person",
        "name": "Ricardo Morim",
        "url": "https://ricardoportfolio.vercel.app",
        "hasPart": {
          "@type": "WebAPI",
          "name": "Ricardo Morim Portfolio API",
          "url": "https://ricardoportfolio.vercel.app/well-known/portfolio"
        }
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
        />
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

        <meta name="api-base-url" content="https://ricardoportfolio.vercel.app/api" />

        <link rel="manifest" href="/icons/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href="https://ricardoportfolio.vercel.app" />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <div
              className={`app-container  ${sairaStencil.className} ${londrinaShadow.className}, ${inter.className} `}
            >
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

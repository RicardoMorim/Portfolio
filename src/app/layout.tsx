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
  title: "Ricardo Morim | Software Engineer",
  description:
    "Hi there! I'm Ricardo Morim a Full Stack Developer specialized in React, Next.js, and TypeScript and this is my Portfolio",
  keywords: [
    "Ricardo Morim",
    "Ricardo",
    "Morim",
    "Software Engineer",
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Portfolio",
    "Ricardo Portfolio",
    "Developer Portfolio",
    "Software Development",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript",
    "Web Development",
    "Portfolio Website",
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
    title: "Ricardo Morim | Software Engineer",
    description:
      "Full Stack Developer specialized in React, Next.js, and TypeScript",
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
    title: "Ricardo Morim | Software Engineer",
    description:
      "Full Stack Developer specialized in React, Next.js, and TypeScript",
    images: ["/icons/android-chrome-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
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
    jobTitle: "Software Developer",
    sameAs: [
      "https://github.com/RicardoMorim",
      "https://www.linkedin.com/in/ricardo-morim-208368251/",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
        <link rel="manifest" href="/icons/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href="https://ricardoportfolio.vercel.app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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

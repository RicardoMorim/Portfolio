import { en } from "@/language/translations/en";
import { pt } from "@/language/translations/pt";
import { defaultLocale, Locale, locales, Translations } from "@/language/config";

export const SITE_URL = "https://www.ricardomorim.com";
export const CONTACT_EMAIL = "ricardo@ricardomorim.com";
export const OG_IMAGE = { url: "/og-image.png", width: 1200, height: 630, alt: "Ricardo Morim: AI Software Engineer · AI Security" };

/** Projects with enough public detail to deserve their own page. */
export const PROJECT_PAGES: readonly string[] = ["agentic-assurance", "chess-ai", "auth-library"];

const translations: Record<Locale, Translations> = { en, pt };

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);
export const translationsFor = (locale: Locale): Translations => translations[locale];

/** English lives at the root, every other locale under its own prefix. */
export function localePath(locale: Locale, path = "/"): string {
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Canonical plus hreflang for one logical page, for use in Next metadata. */
export function alternatesFor(locale: Locale, path = "/") {
  return {
    canonical: localePath(locale, path),
    languages: { en: localePath("en", path), pt: localePath("pt", path), "x-default": localePath("en", path) },
  };
}

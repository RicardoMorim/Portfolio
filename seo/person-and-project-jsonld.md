# JSON-LD examples for https://ricardoportfolio.vercel.app/

Include these snippets in the HTML <head> (for Next.js: add in `app/layout.tsx` or a Head component, or use a small `JsonLd` component that injects a <script type="application/ld+json">).

## Person JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ricardo Morim",
  "url": "https://ricardoportfolio.vercel.app/",
  "sameAs": [
    "https://github.com/RicardoMorim",
    "https://www.linkedin.com/in/ricardo-morim-208368251/"
  ],
  "email": "mailto:ricardomorim05@gmail.com",
  "jobTitle": "Backend Engineer",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Porto",
    "addressCountry": "PT"
  }
}
```

## Example Project / SoftwareSourceCode JSON-LD (Production Auth Library)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Auth-Provider (Production Auth Library)",
  "url": "https://github.com/RicardoMorim/auth-Provider/",
  "codeRepository": "https://github.com/RicardoMorim/auth-Provider",
  "description": "Spring Boot authentication library published to Maven Central with CI/CD and security scanning.",
  "programmingLanguage": "Java",
  "license": "https://opensource.org/licenses/Apache-2.0"
}
```

## How to add to Next.js (app router)
- Add the JSON-LD string inside a `<script type="application/ld+json">` element in the `head` of your layout (e.g., `app/layout.tsx`).
- Prefer server-rendered injection so crawlers see it without JS execution.

Example (React):

```tsx
// small illustrative snippet (drop into Head or layout)
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
```

## Validate
- Use Google Rich Results Test: https://search.google.com/test/rich-results
- Or Schema Markup Validator.

## Notes
- Add one `SoftwareSourceCode` block per major project you want surfaced in search.
- Keep `@id` and `url` consistent with canonical URLs.
- Avoid exposing private/internal-only URLs in public JSON-LD.

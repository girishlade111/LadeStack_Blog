# Do / Don't — Engineering and Editorial Guardrails

## Architecture

| Do | Don't |
|---|---|
| Use one source/content repository | Split Markdown into a second repository without approval |
| Keep Astro static SSG and `.astro` templates | Migrate to Next.js, React, Vue, SSR or SPA by convenience |
| Write published posts as `.md` in Content Collections | Require a database or hosted CMS for simple publishing |
| Use vanilla JS only where interactivity is needed | Hydrate all cards, layouts and articles |
| Use native CSS custom properties | Install a complex design framework by default |
| Keep URL helpers and taxonomy data centralized | Hard-code paths and category labels all over components |
| Ship real, localized semantic HTML | Render article body only after a browser JS fetch |

## Markdown and translation

- **Do** enforce category ID, locale, article identity, published status, slug and metadata validation.
- **Do** use `translationKey` to group language variants; permit partial coverage.
- **Do** maintain authorial/reviewed translations and accurate local-language titles/descriptions.
- **Don't** assume every article has 9 completed files; don't output 404 alternate links.
- **Don't** clone English content into translated URLs or invent translated fact checks.
- **Don't** publish drafts/review files in sitemap, Pagefind or related-post recommendations.
- **Don't** change published slugs without deliberate, tested redirects.

## SEO

- **Do** emit self-canonical URLs and reciprocal, absolute `hreflang` sets across actually published variants.
- **Do** use correct `html lang`, unique metadata and truthful article structured data.
- **Don't** canonicalize every translation to the English page.
- **Don't** add `noindex` globally as a band-aid for duplicate content.
- **Don't** pretend a category contains articles it does not have.

## Search and TOC

- **Do** build search index from static output, load it on demand, and search the current locale by default.
- **Do** derive TOC from renderer heading IDs with accessible anchor navigation.
- **Don't** download all content JSON to the browser or maintain a remote search database unnecessarily.
- **Don't** use a custom TOC slugger that disagrees with Markdown output.
- **Don't** force smooth scrolling for users requesting reduced motion.

## Design

- **Do** maintain high reading contrast, restrained illustrations, consistent page grids and readable type.
- **Do** handle both light/dark, long titles, missing images, local-language line breaks and 320px mobile widths.
- **Don't** introduce parallax, autoplay, oversized animations, infinite-scroll-only discovery or ad-like clutter by default.
- **Don't** sacrifice content readability for a dramatic hero section.

## Performance

- **Do** optimize covers, width/height, font loading, caching and pagination.
- **Do** measure generated page bytes and build duration on every major milestone.
- **Don't** infer site slowness from Markdown file count alone; separate build concerns from runtime UX.
- **Don't** ship the entire Pagefind index in the initial page HTML.
- **Don't** enable experimental build features without rollback and production measurement.

## Safety and privacy

- **Do** avoid collecting user data unless required and disclosed.
- **Do** sanitize or tightly restrict untrusted HTML/script inclusion in Markdown.
- **Don't** commit API keys, deployment hooks, tracking secrets or personal credentials.
- **Don't** scrape and republish entire third-party articles without rights.
- **Don't** offer high-stakes claims as verified without sources and context.

## Delivery and integrity

- **Do** run type checks, content validation, production build and representative route audits.
- **Do** report unverified steps, errors and limitations clearly.
- **Don't** mark a feature complete based only on the happy path.
- **Don't** create placeholder buttons that do nothing or dummy search results on a live site.
- **Don't** change requirements quietly: update the decision log and tests.

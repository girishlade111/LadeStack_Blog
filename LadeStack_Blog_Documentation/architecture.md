# Technical Architecture — Static, Single-Repository Astro

## 1. Architecture at a glance

```text
Author/editor
    |
    v
src/content/blog/{locale}/{year}/{month}/{slug}.md
    |
    | git commit + push to main
    v
GitHub (SINGLE repository: website + Markdown)
    |
    | Vercel Git Integration
    v
Vercel Build
  ├── frontmatter + translation-group validation
  ├── Astro Content Layer (glob loader)
  ├── static page generation (HTML/CSS/very small JS)
  ├── sitemap / RSS generation
  └── Pagefind indexes generated dist/ HTML
    |
    v
Vercel CDN → https://blog.ladestack.in/
    |
    v
Browser loads requested page only; search assets load on demand
```

There is no second content repository, content API, runtime CMS, database or server process for core browsing.

## 2. Separation of concerns

- **Content:** Markdown posts and metadata under `src/content/blog/`.
- **Configuration/data:** locales, category IDs, site settings and localized UI dictionaries.
- **Domain helpers:** published-only filters, URL generation, translation registry, content sorting, pagination and SEO descriptors.
- **Presentation:** `.astro` layouts and components, CSS variables and article typography.
- **Interactions:** tiny client scripts for search dialog, theme, mobile menu and TOC active section.
- **Build and QA:** content checks, link/SEO audits, Astro build, Pagefind indexing and deploy.

The source tree is a suggestion; implement safely with installed Astro version rather than copy-pasting unsupported old APIs. See `docs/project-structure.md`.

## 3. Astro configuration goals

Use `site: 'https://blog.ladestack.in'`, `output: 'static'`, a consistent trailing-slash policy, and built-in i18n with `defaultLocale: 'en'`, other eight locales, and `routing.prefixDefaultLocale: false`. Do not accidentally emit `/en/` duplicates. Generate non-English pages through explicit locale route templates or per-locale filesystem routing consistent with the Astro version; avoid conflicting route patterns.

### Content collection concept

```ts
// Representative Astro 5+ / Content Layer pattern; verify installed version.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    articleId: z.string().min(1),
    translationKey: z.string().min(1),
    lang: z.enum(['en','ja','ko','zh','ru','tr','fr','pt','es']),
    slug: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    category: z.string().min(1),
    tags: z.array(z.string()).default([]),
    status: z.enum(['draft','review','published']),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
  }),
});

export const collections = { blog };
```

This schema is a **minimal illustrative subset**, not the final full schema. Add the fields, cross-file validation and path/locale checks in `docs/content-model.md`. The `slug` field in frontmatter is the site's public slug and must not be inferred blindly from file path.

## 4. Routing

Public article URLs:

- English: `/posts/{localizedSlug}/`
- Non-English: `/{locale}/posts/{localizedSlug}/`
- English category: `/category/{categoryId}/`
- Non-English category: `/{locale}/category/{categoryId}/`
- Static search: `/search/`, `/{locale}/search/`
- Tag listing: `/tags/{tagId}/`, `/{locale}/tags/{tagId}/`

URL builder: `buildPostUrl(entry)` based on locale and validated public slug. Do not invent post links in cards/templates. Use `getStaticPaths()` based on **published-only** collection entries. All public paths must be unique. Article path collisions in the same locale fail validation.

## 5. Translation registry

Before rendering SEO and language switchers, group published entries by `translationKey` (same `articleId` across locale variants) and produce:

```text
translationKey → { en: URL?, ja: URL?, ko: URL?, ... }
```

Only published, actual localized pages participate. English original exists for every group. Other locale versions may be absent. Translation key and category/primary factual identity must remain consistent across versions. See `docs/internationalization.md` and `docs/seo.md`.

## 6. Listing and pagination

Sort by `publishedAt` descending with a deterministic tie-breaker (`articleId`), group content by locale and category, and paginate at build time. Use a bounded page size such as 12 posts, adjustable from centralized config. Do not embed all article contents or article images into each listing. Category with no published posts gets useful explanatory copy; determine noindex policy using editorial/SEO rules.

## 7. Search architecture

Astro build → Pagefind scans `dist/` → chunked language-aware static index → browser loads search JS/assets only when needed. Exclude navigation/footer and draft/utility pages appropriately. Search is universal across articles/categories/tags in **the current language** at launch. Build script must run Pagefind after Astro; `astro build` alone is not the complete release build. See `docs/search.md`.

## 8. Article TOC and long-form rendering

Astro render output exposes headings and content. TOC uses H2 and H3 entries and rendered IDs. It is semantic server-rendered markup with progressive enhancement for active section tracking and optional smooth scrolling. Use IntersectionObserver carefully, fallback to anchors without JS. See `docs/article-page.md`.

## 9. Media and CSS

Prefer processed local assets and width/height-aware images. Avoid uploading enormous raw covers; define a policy and optimize at build or supply preoptimized images. Do not ship a full icon-font library or multiple large text fonts. Use CSS properties for theme tokens. Original design system in `design.md`.

## 10. Build vs visitor performance

Thousands of `.md` files have virtually no direct cost to a visitor who loads one generated article page. The **cost is in build processing**, generated page count, metadata generation and search indexing. Monitor `npm run build` time, memory, output size, Pagefind index size and deployments. Optimize only after actual measurements; preserve static deployment as default. Experimental incremental build behavior is not assumed available or reliable for the first release.

## 11. Failure modes

- Invalid schema/duplicate slug → fail validation/build, preserve previous production deployment.
- Broken locale mappings → fail SEO QA, not silent fallback.
- Missing image → show designed fallback or fail for article with required cover, according to policy.
- Search generation fails → build fails or publishing is blocked; never deploy search UI that points to missing index.
- Vercel publish failure → production remains on the last successful deployment; inspect build logs.
- Slug rename → add deliberate redirect mapping and update internal links, XML sitemap, language switch.

## 12. Extensibility and guardrails

A future hybrid/ISR architecture is a separately approved decision if full SSG builds demonstrably become impractical. A second content repository is **not** an optimization to reader speed. Avoid runtime dependencies for any feature implementable with build-time data. Architectural references and choices: `decisions.md`, `docs/deployment.md`, `docs/performance.md`.

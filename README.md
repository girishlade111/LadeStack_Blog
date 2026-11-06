# LadeStack Blog (`blog.ladestack.in`)

**LadeStack Blog** is the official lightweight, original, multilingual static editorial publication affiliated with [LadeStack](https://ladestack.in). It is built with **Astro.js** (`output: 'static'`) as a single-repository static publishing system where source code and Markdown articles live together and deploy directly to Vercel on `git push`.

---

## Architecture Highlights

- **Pure Static Astro (`output: 'static'`)**: Zero runtime server, zero database, zero CMS, and zero UI framework bundle overhead.
- **Single-Repository Editorial Workflow**: All Markdown articles live in `src/content/blog/{locale}/{YYYY}/{MM}/{slug}.md`.
- **9 Supported Locales**:
  - Default unprefixed locale: **English (`en`)** at `/`
  - Prefixed locales: **Japanese (`ja`)**, **Korean (`ko`)**, **Chinese (`zh`)**, **Russian (`ru`)**, **Turkish (`tr`)**, **French (`fr`)**, **Portuguese (`pt`)**, **Spanish (`es`)** at `/{locale}/`
- **19 Permanent Editorial Categories**:
  `autos-vehicles`, `beauty-fashion`, `business-finance`, `climate`, `entertainment`, `food-drink`, `games`, `health`, `hobbies-leisure`, `jobs-education`, `law-government`, `other`, `pets-animals`, `politics`, `science`, `shopping`, `sports`, `technology`, `travel-transportation`
- **Automatic Table of Contents (TOC)**: Extracted at build time from rendered Markdown `H2` and `H3` headings with deterministic anchor slugs, sticky desktop sidebar (`On this page`), mobile collapsible `<details>` disclosure, and `IntersectionObserver` active-section highlighting.
- **Static Multilingual Search**: Post-build `/pagefind/pagefind.js` and language-scoped `/pagefind/index-{locale}.json` indexes loaded lazily only when the reader opens search (`Search` button, `Ctrl+K`/`Cmd+K`, or `/`).
- **Strict Technical SEO**: Self-referencing canonical URLs, symmetric reciprocal `hreflang` alternates emitted only for published translations (`status: published` and `noindex: false`), `Organization` / `WebSite` / `Blog` / `BlogPosting` / `BreadcrumbList` JSON-LD, `/sitemap.xml`, `/rss.xml`, and `/robots.txt`.

---

## Quick Start & Commands

```bash
# Install dependencies
npm install

# Start local development server on http://0.0.0.0:3000 (generates dev search index first)
npm run dev

# Validate all Markdown frontmatter, cross-locale slug uniqueness, and translationKey consistency
npm run validate:content

# Run unit tests (locales, 19 categories, schema rules, hreflang reciprocity, TOC, pagination)
npm test

# Type-check and validate content
npm run lint

# Build static production site + Pagefind language-scoped search indexes into dist/
npm run build

# Verify SEO, canonical URLs, and reciprocal hreflang invariants
npm run verify:seo

# Audit built HTML files in dist/ (lang attributes, canonical tags, hreflang reciprocity, draft exclusion, Pagefind indexes)
npm run verify:output

# Audit all internal links and heading anchors across built HTML in dist/
npm run verify:links
```

---

## Authoring Workflow

### 1. Creating a New English Article

Create a Markdown file at `src/content/blog/en/{YYYY}/{MM}/{slug}.md`:

```markdown
---
articleId: "LSB-2026-010"
title: "Your Original Technical Title"
description: "A 20–260 character summary for meta description, cards, and social previews."
slug: "your-article-slug"
translationKey: "your-story-key"
lang: "en"
category: "technology"
tags:
  - "architecture"
  - "performance"
publishedAt: 2026-11-06
updatedAt: 2026-11-06
authorId: "editor-main"
status: "published"
featured: false
coverImage: "/images/covers/astro-seo-architecture.svg"
coverAlt: "Descriptive alt text for the cover diagram"
coverCredit: "LadeStack Architecture Lab"
summary: "One-paragraph deck displayed beneath the H1 and in featured cards."
sources:
  - label: "Official Specification"
    url: "https://developer.mozilla.org/"
noindex: false
---

Write your original Markdown body here using `##` (H2) and `###` (H3) headings. Do not use `#` (H1) in the Markdown body because the article template renders the title as the page's single `<h1>`.
```

### 2. Adding a Translated Edition

Create a file under the target locale directory, e.g. `src/content/blog/fr/{YYYY}/{MM}/{localized-slug}.md`:

- Use the **exact same `translationKey`** and **same `category`** as the English story.
- Set `lang: "fr"` and provide either a localized ASCII slug (`slug: "votre-slug-fr"`) or reuse the ASCII slug (`slug: "your-article-slug"`).
- When `status: "published"` and `noindex: false`, the build automatically links all published editions in the header locale switcher, the article's **Available editions** bar, `<link rel="alternate" hreflang="...">`, and `sitemap.xml`.
- If a translation is still in progress (`status: "draft"`), it is completely excluded from production routes, `hreflang`, `sitemap.xml`, `rss.xml`, and search indexes.

---

## Deploying to Vercel (`blog.ladestack.in`)

1. Import this Git repository into **Vercel**.
2. Vercel automatically detects **Astro**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
3. Attach the custom domain `blog.ladestack.in` in Vercel Project Settings → Domains.
4. Configure DNS for `blog.ladestack.in` at your DNS provider for `ladestack.in` (`CNAME` to Vercel's target).
5. Every `git push` to the production branch validates content, builds static HTML and Pagefind indexes, and deploys atomically.

---

## Documentation Pack

The complete architectural specification, editorial guidelines, SEO matrix, and operational runbooks are preserved in [`/LadeStack_Blog_Documentation/`](./LadeStack_Blog_Documentation/START-HERE.md).

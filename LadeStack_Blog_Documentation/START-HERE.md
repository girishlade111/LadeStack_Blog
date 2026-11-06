# Start Here — Single-Session Project Brief

**Objective:** Implement a production-quality, minimal editorial, multilingual Markdown blog at `https://blog.ladestack.in/` using **pure Astro** and **one** GitHub repository.

## The six rules that matter most

1. Astro static HTML; `.astro` components, native CSS and minimal vanilla JS. No React/Next/Vue, CMS, backend, database or forced accounts.
2. All source code **and** every `.md` blog file live in the **same repo**. Git push to connected Vercel `main` triggers a new static build automatically.
3. Supported locales: English root `en`, plus `ja`, `ko`, `zh`, `ru`, `tr`, `fr`, `pt`, `es` under their own prefixes. Every article may have a subset of reviewed translations.
4. Exactly 19 categories from `docs/categories-taxonomy.md`; one primary category per article. Homepage shows recent articles from whatever categories are active that day.
5. Every article uses an automatically generated sticky desktop TOC from Markdown H2/H3 IDs, mobile TOC and section hash navigation; universal search uses static Pagefind and lazy loading.
6. Technical SEO is strict: self canonical per localized article, real reciprocal `hreflang` only for published translations, sitemap, structured metadata, draft filtering, correct `html lang`.

## What to read next

For agent instructions → [`AGENTS.md`](AGENTS.md). For requirements → [`PRD.md`](PRD.md). For engineering → [`architecture.md`](architecture.md). For styling → [`design.md`](design.md). For prohibitions → [`do-or-dont.md`](do-or-dont.md). For task order → [`roadmap.md`](roadmap.md). For individual features → [`docs/`](docs/) documents as indexed by [`README.md`](README.md).

## Required first deliverable

A working Astro skeleton that can statically build a real Markdown article, generate valid English and localized routes, show the minimal editorial design, and validate content schemas. Do not leap to optional fancy features before the smallest end-to-end publishing slice is verified.

## Current stage

**Specification only.** These files do not mean the website was already coded, tested, connected to Vercel or live. Inspect existing repository before planning edits. The instructions are written for any implementation environment.

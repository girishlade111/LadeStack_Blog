# Universal Kickoff Prompt — Build LadeStack Blog from the Context Pack

> Copy the instructions below into any software implementation session after placing this documentation pack in the project root. This is a **workflow request**; it is not evidence that an implementation already exists.

## Mission

Build **LadeStack Blog** (`https://blog.ladestack.in`) from the checked-in specification files. The outcome must be a production-grade, fast, responsive, minimal editorial publication using pure Astro.js static generation and Markdown Content Collections. Code and Markdown articles must remain in a **single** GitHub repository. Git push to the Vercel-linked production branch must automatically trigger a complete static build and publishing flow.

## Required preparation

Read these files in order: `START-HERE.md`, `AGENTS.md`, `do-or-dont.md`, `PRD.md`, `decisions.md`, `architecture.md`, `design.md`, `roadmap.md`, then the feature-specific files in `docs/`. Inspect the existing repository before making changes. Do not overwrite existing working code blindly. Identify the package manager and installed Astro version; use current compatible APIs. Do not ask for repeated clarification of settled decisions.

## Mandatory features

- Nine locales: `en`, `ja`, `ko`, `zh`, `ru`, `tr`, `fr`, `pt`, `es`; English URLs have no `/en/` prefix.
- All 19 category IDs and category archives from `docs/categories-taxonomy.md`.
- High-quality article detail pages from `.md` with category, tags, dates, byline, code, images and related reading.
- Automatic desktop sticky **On this page** H2/H3 TOC, hash anchors, active scroll tracking and accessible mobile disclosure.
- Universal Pagefind search across published current-locale content with lazy client loading, keyboard shortcut, filters and subsection results.
- New minimal editorial design with original LadeStack affiliation, responsive layouts, readable typography and light/dark/system themes.
- Accurate canonical, reciprocal `hreflang` for actual reviewed translations, `html lang`, JSON-LD, sitemap, RSS, robots and no draft leakage.
- Static output suitable for Vercel; no runtime database, CMS, server, paid search API or SPA framework.

## Execution method

1. Inspect and summarize what already exists vs what the specification requires.
2. Produce a prioritized implementation plan matching the documented roadmap and task dependencies.
3. Implement the first fully working slice: content collection + validation + English and localized static article route + a minimal layout.
4. Complete design and browsing, then TOC/search, then SEO and QA in small tested slices.
5. After each slice, run relevant validation, type checks and production build; inspect generated output.
6. Preserve public URL stability, read/write only necessary files, and keep docs aligned with implementation.
7. Do not claim any feature or deployment is complete without executing and reporting actual verification.

## Response contract

For every completed implementation stage, report scope, changed files, verified commands/outcomes, remaining issues, next dependency and whether production deployment is affected. If a requirement demands a new service or major architectural change, present measured reasons and alternatives instead of silently changing the product.

## Quality priorities

**Correctness > SEO integrity > accessibility > reader performance > visual polish > optional complexity.** Do not sacrifice one repository, accurate translations or crawlable HTML in exchange for shortcuts.

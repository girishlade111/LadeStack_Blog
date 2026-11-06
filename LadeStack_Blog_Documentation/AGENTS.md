# Universal Implementation Instructions

## Mission

Build and maintain **LadeStack Blog**, a lightweight, original, multilingual editorial site, from the authoritative context files in this repository. Deliver verified behavior, not merely convincing UI mockups. Work autonomously within the explicit requirements, but do not silently widen product scope or change architectural invariants.

## Read order and authority

1. The newest explicit project-owner requirement overrides any older statement.
2. This file and `do-or-dont.md` provide execution guardrails.
3. `decisions.md` records deliberate architectural choices.
4. `PRD.md`, `architecture.md`, and `design.md` define product, system and visual contracts.
5. Specialized `docs/*.md` files define feature-level details.
6. Existing tested source code provides implementation evidence; when it conflicts with a requirement, report and reconcile rather than assuming the source is correct.

## Immutable baseline unless explicitly changed

- One repository contains both Astro source and every author-maintained `.md` article.
- Hosting is **Vercel static deployment**, not a continuously running server.
- `https://blog.ladestack.in/` is the intended canonical origin; confirm production HTTPS.
- No React, Next.js, Vue, Svelte, JS SPA framework, CMS, application DB or forced auth.
- All nine locales exist in the UI architecture; only verified translations become publicly indexable article pages.
- All 19 requested category IDs remain available, even if a category has no published post.
- Search is client-side over a build-time index; TOC is based on published Markdown headings.
- GitHub push to production branch triggers Vercel rebuild automatically after Git integration is configured.

## Execution protocol

### Before modifying files

1. Inspect current repository structure, package manager, existing scripts and status. Never assume a blank project if files exist.
2. Identify the precise requirement and its acceptance criteria; list impacted routes/locales/components.
3. Verify documentation/installed package APIs before adopting version-sensitive features.
4. Choose the smallest implementation that satisfies the requirement. Prefer reusable Astro components and typed helpers.
5. Consider what a 10k+ localized-article library would do to the chosen pattern.

### While implementing

- Implement real URLs and data-derived states, not fake records shown as if production content.
- Respect local conventions. Centralize locale resolution, category metadata and URL construction.
- Enforce frontmatter validation, slug uniqueness and translation-group consistency at build/CI time.
- Server-render all meaningful text in static HTML. JavaScript should enhance interaction, not create primary article content.
- Keep feature flags and future-only integrations off until implemented and tested.
- Maintain keyboard focus, screen-reader names and responsive design while building components.
- Store only genuinely authored or reviewed content; do not fabricate sources, citations, authors, dates or translations.

### Before declaring completion

1. Run the project's formatter/linter/type check/content validation (if configured).
2. Run production build and Pagefind indexing.
3. Validate English and at least two non-English locales, with both translated and missing-translation cases.
4. Test canonical/hreflang consistency, metadata, redirects and sitemap output.
5. Test article TOC, search overlay, keyboard navigation, theme and mobile layouts.
6. Report actual commands and pass/fail results; distinguish untested assumptions from verified outcomes.
7. Update docs when the implemented behavior changes a contract.

## Change reporting format

For each substantial completed task, provide:

- **Scope:** what behavior was added or fixed.
- **Files:** relevant created/modified source paths.
- **Verification:** exact tests/commands run and outcomes.
- **Risks:** limitations, compatibility assumptions and unresolved items.
- **Next logical step:** one prioritized action rather than unbounded feature expansion.

## Problem-solving and safe defaults

- In an unclear design detail, prefer readable, content-first, accessible minimalism.
- In an unclear data-model detail, prioritize stable identifiers and backwards-compatible URLs.
- In an unclear SEO detail, do not publish potentially duplicate or inaccurate alternates.
- In an unclear performance detail, measure rather than claim a score or benchmark.
- If a package requires server-side runtime or billed external APIs, seek an equivalent static/client-only approach first.
- Do not run destructive migrations, history rewrites or production DNS changes silently.

## Forbidden shortcuts

Do not declare success merely because a component renders locally. Do not ignore TypeScript or build errors, use blanket `any`, hide console errors, populate dummy translated pages, ship credentials, or convert the site into a client-rendered SPA. Never replace the single-repo plan with multiple repositories without an explicit architecture change.

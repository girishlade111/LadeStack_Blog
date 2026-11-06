# Daily Implementation Operating Guide

This is the hands-on workflow for any software implementation agent or human maintainer working on LadeStack Blog. Read `AGENTS.md` for precedence and `PRD.md` for feature scope.

## Orientation quick scan

Inspect `package.json`, `astro.config.mjs`, `src/content.config.ts`, `src/pages`, `src/components`, `src/content/blog`, `src/i18n`, `src/data/categories.ts`, `public`, and the Vercel-related settings if they exist. Check `git status` and the production branch before a substantial change. These are **expected paths**, not proof that files already exist.

## Work breakdown

For every feature, write down the intent, user-visible states, routes, locales, accessibility states, SEO implications, expected bundle changes and acceptance tests. Divide work into vertical slices that can build independently. Make a screenshot or browser inspection part of UI acceptance, including narrow mobile and desktop widths.

### Example feature workflow: TOC

1. Load headings from the article's Markdown render output.
2. Filter the configured heading depths, usually H2 and H3, skipping empty headings.
3. Use the actual renderer-provided heading IDs; do not invent IDs in a second algorithm.
4. Render semantic `<nav aria-label="On this page">` with anchored links.
5. Implement scroll offset for sticky header and highlight the active section.
6. Avoid adding full article content to client JS. Use a small observer or event handler.
7. Test long posts, short posts, duplicate headings, localization, mobile collapse, keyboard and reduced motion.

### Example feature workflow: new locale

1. Confirm locale is defined in the shared language registry.
2. Provide localized navigation/labels and meaningful empty states.
3. Generate locale routes for index/categories/search/utility pages as appropriate.
4. Publish only reviewed article variants, link exact translations by `translationKey`.
5. Validate `html lang`, canonical, locale switch and reciprocal `hreflang`.
6. Confirm that empty or missing article translations do not generate fake pages.

## Keep changes coherent

A feature is one unit of behavior, not a random collection of unrelated refactors. If implementing search, also update the build script and search acceptance tests. If changing localized URLs, update canonicals, hreflang, sitemap, locale switcher, RSS links, content validation and regression tests together.

## Observability while working

- Keep production build output visible and track build duration.
- Inspect generated `dist/` output, not only local dev routes.
- Validate whether Pagefind actually indexed article text; no-index UI or hidden content can accidentally suppress results.
- Spot-check rendered HTML source for semantic headings, metadata and script weight.
- Compare before/after accessibility and performance, with the same test environment.

## Definition of done for each slice

Functional in the browser; typed and validated; clean static output; localized correctly; accessible with keyboard; mobile responsive; no excessive JavaScript or redundant content loading; tests pass; documentation updated; deployment impact understood. If one item cannot be verified, explicitly flag it rather than marking the slice complete.

## Scope escalation

Use `decisions.md` when a requirement implies major new dependencies, runtime server logic, a paid external service, a data migration, indexed URL changes, category taxonomy changes or user privacy consequences. Provide alternatives and trade-offs before modifying architecture.

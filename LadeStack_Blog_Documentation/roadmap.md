# Development Roadmap — Incremental and Testable

Use this sequence to build the site. Each phase has exit gates. Time estimates are intentionally omitted; complexity depends on the existing repository and implementation environment.

## Phase 0 — Repository and evidence

- Inspect any existing source, dependencies and branch status.
- Initialize one GitHub repo if new; set Astro TypeScript baseline and package-lock policy.
- Preserve this documentation pack in the repo; create CI/scripts scaffolding.
- Confirm intended production URL and design direction.

**Gate:** a clean Astro static build runs locally; root README and scripts are accurate.

## Phase 1 — Design foundation

- Define CSS tokens, typography, grids and theme behavior from `design.md`.
- Implement header, footer, category navigation, locale control and theme switch.
- Build visual skeletons for home, category listing, article, search and 404.
- Test mobile and dark/light states before article feature development.

**Gate:** layouts match approved editorial direction, keyboard focus works, no horizontal overflow.

## Phase 2 — Typed content model

- Add Content Collection loader and full schema with explicit authoring templates.
- Add stable taxonomy and locale registries; implement publish-only selection helpers.
- Validate article ID, translationKey, category, path-locale and slug uniqueness.
- Create example posts for English and two reviewed non-English languages, plus a test draft.

**Gate:** valid content builds; invalid metadata and duplicate URLs fail with actionable message; drafts are excluded.

## Phase 3 — Static route generation

- Create locale homepages, listings, categories, article detail and non-English counterparts.
- Configure deterministic pagination and date sorting.
- Implement locale switcher based on actually published article variants.
- Add localized utility/empty states and accessible metadata.

**Gate:** no duplicate `/en/` routes; all tested routes exist in `dist/`; missing translations return expected 404 or explicit fallback navigation, never mismatched HTML language.

## Phase 4 — Article reading experience

- Markdown article typography, code blocks, images, related posts and source sections.
- Semantic heading anchors, desktop sticky TOC and mobile disclosure.
- Active heading tracking and reading progress with very small JS.
- Copy-link/share behavior; test accessible scroll/focus.

**Gate:** long article, short article, duplicate-heading article and multiple locales pass functional/keyboard tests.

## Phase 5 — Search and taxonomy UX

- Integrate Pagefind post-build indexing and on-demand UI.
- Provide header search, keyboard shortcut, search results and empty/offline states.
- Confirm current-locale indexing and article-section sub-results.
- Add tag/category filtering if supported by the index/requirements.

**Gate:** production output includes functional search index; no user has to download full content library on homepage.

## Phase 6 — Technical SEO, metadata and feeds

- Build single URL/canonical/alternate metadata utility.
- Generate sitemap/index, robots, RSS, Open Graph and structured data.
- Validate reciprocal hreflang for partially translated groups.
- Audit empty categories, pagination, drafts and edit/redirect cases.

**Gate:** automated SEO audit of sample routes passes, no draft is indexed, no foreign-language duplicate body.

## Phase 7 — Quality and production rollout

- Performance and bundle audits, representative accessibility checks, source/link auditing.
- GitHub repository → Vercel static project connection and preview/production setup.
- Verify HTTPS, canonical hostname, redirects, build command and Pagefind artifacts.
- Deploy test article through Git push and validate new URL, search, sitemap and language alternates.

**Gate:** release checklist passes; no manual Deploy Hook or second repo needed.

## Phase 8 — Operations and measured scaling

- Implement content freshness/review process and simple validation scripts.
- Monitor build time, generated page count, output size and performance regularly.
- Optimize only on measured issues; preserve the simple baseline.
- Revisit caching/build strategy when volumes or release cadence demonstrably exceed limits.

**Gate:** reliable publish/revert runbook, monthly metric review and documented regression thresholds.

## Priority rules

Do not begin optional comments/newsletter/popularity widgets while core routing/search/SEO tests fail. A launchable MVP includes all 19 categories and nine-locale UI, but does **not** require all 9 translations of every article. Any added scope gets acceptance criteria before implementation.

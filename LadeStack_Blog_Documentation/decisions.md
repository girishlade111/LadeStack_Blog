# Architecture Decision Records and Open Questions

**Authority:** established owner decisions listed below are binding unless replaced by newer explicit owner instructions. This document prevents repeated debate over settled choices.

## ADR-001 — One repository for code and content

**Status:** Accepted.  
**Choice:** Store Astro source and all Markdown articles in **one GitHub repository**.  
**Reason:** Content in a second repo does not inherently improve visitor page speed or static build speed and adds synchronization, Deploy Hooks and permissions. One Git integration is simpler and more reliable for daily publishing.  
**Consequence:** Content updates trigger full or optimized static builds. Monitor build time separately from browser performance.

## ADR-002 — Pure Astro SSG

**Status:** Accepted.  
**Choice:** Astro `.astro` components, static output and minimal vanilla JS.  
**Reason:** Excellent fit for crawlable, content-driven, fast pages without server runtime.  
**Consequence:** Build must generate every published route; on-demand services are out of launch scope.

## ADR-003 — Markdown-first publication

**Status:** Accepted.  
**Choice:** Astro Content Collections backed by local `.md`, with schema/CI validation.  
**Reason:** Git is the publication source of truth, versionable, reviewable and CMS-free.  
**Consequence:** Editors manage Markdown plus frontmatter; authoring templates and validation are mandatory.

## ADR-004 — Nine locales, partial content coverage

**Status:** Accepted.  
**Choice:** English (`en`) root; eight prefixed locales `ja`, `ko`, `zh`, `ru`, `tr`, `fr`, `pt`, `es`.  
**Reason:** International distribution and native language reading, without forcing 27 files daily before publication.  
**Consequence:** Only reviewed translations are published; accurately generated reciprocal `hreflang`.

## ADR-005 — Exact initial 19 category taxonomy

**Status:** Accepted.  
**Choice:** The categories in `docs/categories-taxonomy.md`; article has one primary category, zero or more tags.  
**Reason:** User explicitly provided all 19.  
**Consequence:** Taxonomy IDs stable across locales; show understandable empty states for unused categories.

## ADR-006 — Minimal new editorial visual direction

**Status:** Accepted as direction; tokens are **proposed** pending visual sign-off.  
**Choice:** Original minimal editorial design retaining visible LadeStack affiliation; light/dark/system.  
**Reason:** Product requires a distinct blog identity with high reading quality.  
**Consequence:** Don't claim colors/fonts are final brand tokens until approved.

## ADR-007 — Pagefind for universal search

**Status:** Accepted.  
**Choice:** Static build-time Pagefind, current-locale full-site search, lazy UI.  
**Reason:** No hosted search backend; scalable chunked client consumption.  
**Consequence:** Build command must generate Pagefind index after HTML.

## ADR-008 — In-article sticky TOC

**Status:** Accepted.  
**Choice:** Server-render H2/H3 outline derived from Markdown headings; anchors and scroll-aware active state; mobile disclosure.  
**Reason:** Reader navigation across long articles was explicitly required.  
**Consequence:** Tests for heading stability, browser back/forward and reduced motion.

## ADR-009 — Automatic Git-to-Vercel publishing

**Status:** Accepted.  
**Choice:** Connect the single GitHub repository to a Vercel static project; `main` drives production deployments after build success.  
**Reason:** New Markdown push should require no special workflow or manual deploy.  
**Consequence:** Broken content validation can block a deployment; previous successful deployment stays live.

## ADR-010 — Build scaling by measurement, not speculation

**Status:** Accepted.  
**Choice:** Optimize generated pages and index size; monitor build duration/output at growth milestones.  
**Reason:** The number of Markdown files is not a direct visitor-load metric.  
**Consequence:** A second repo, SSR or an experimental incremental build is not a launch requirement.

## Questions requiring owner input only if they block implementation

1. Actual SVG logo and exact brand assets available? Use typography-based interim branding until supplied; never invent a proprietary logo.
2. For `zh`, should editorial content standardize on Simplified Chinese (`zh-Hans`) while the URL remains `/zh/`? Recommended but confirm for high-volume translation.
3. Which regional conventions should Portuguese articles follow? Keep `pt` URL stable and document house style.
4. Is analytics required at launch and what consent behavior is applicable? Core site does not depend on analytics.
5. Are article covers mandatory? Proposed default: optional, with accessible text-only design.
6. Will more than one person publish content? No auth/CMS required regardless, but editorial review workflow can adapt.

## How to propose an ADR change

Provide a problem statement, measured evidence or requirement, alternatives, impact on performance/SEO/maintenance, migration/rollback plan, tests and owner approval. Update source docs only after the decision is accepted.

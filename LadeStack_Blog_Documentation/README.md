# LadeStack Blog — Universal Project Context Pack

**Project:** LadeStack Blog  
**Canonical production origin:** `https://blog.ladestack.in`  
**Repository model:** One GitHub repository for application code and Markdown content  
**Site model:** Static, Markdown-first, multilingual editorial publication  
**Document language:** English for precise technical hand-off. Published articles and UI use their own locale.  
**Document status:** Authoritative planning specification; not an already-implemented application.

## Start here

This directory is a **planning and implementation context pack**, not the Astro application itself. Place the Markdown files into the future project repository before implementation. The implementation must be based on the decisions in these documents; do not mistake architecture examples for existing source files.

1. Start with [`START-HERE.md`](START-HERE.md) and optional [`KICKOFF-PROMPT.md`](KICKOFF-PROMPT.md), then read [`AGENTS.md`](AGENTS.md), [`agent.md`](agent.md), and [`do-or-dont.md`](do-or-dont.md) before changing any code.
2. Read [`PRD.md`](PRD.md) for product scope and [`architecture.md`](architecture.md) for the implementation model.
3. Read [`design.md`](design.md) before designing or styling any page.
4. Consult the relevant specialized file in [`docs/`](docs/) for the feature being built.
5. Use [`roadmap.md`](roadmap.md) and [`docs/acceptance-criteria.md`](docs/acceptance-criteria.md) to break work into independently verifiable steps.
6. Before every production publish, use [`docs/release-checklist.md`](docs/release-checklist.md).

## Non-negotiable product decisions

| Concern | Decision |
|---|---|
| Brand | LadeStack Blog, visually affiliated with LadeStack |
| Domain | `https://blog.ladestack.in/` (verify DNS and TLS on deployment) |
| Framework | **Astro**; Astro components, native CSS and minimal vanilla JavaScript |
| Rendering | **Static Site Generation (SSG)**; no runtime rendering by default |
| Repository | **Single GitHub repository** |
| CMS | None; local Markdown `.md` in Astro Content Collections |
| Publish | Commit/push to `main` → connected Vercel project builds → deploys on success |
| Languages | `en`, `ja`, `ko`, `zh`, `ru`, `tr`, `fr`, `pt`, `es` |
| Default language | English at root URLs, with **no `/en/` prefix** |
| Other language URLs | Prefix with `/{locale}/` |
| Categories | Exactly the initial 19 supplied categories; extensible schema |
| Search | Build-time Pagefind index; lazily loaded search UI; current-locale first |
| Article navigation | Sticky, scroll-aware Table of Contents from Markdown H2/H3 headings |
| Theme | Light, dark and system preference, accessible in both |
| Search visibility | Only published, reviewed, real localized pages; reciprocal `hreflang` |
| Infrastructure | No DB, account system, paid API or server mandatory for core features |

## What it is / is not

This is a broad-interest editorial publication covering technology, business, science, travel, health and 14 other categories, with a technical/credible visual identity. It is **not** an auto-generated article farm, not a social network, not a SPA, and not a CMS-backed news aggregator. Editorial accuracy is a launch requirement, especially for current events and high-stakes topics.

## Navigation of the specification

| Document | Why it exists |
|---|---|
| [`AGENTS.md`](AGENTS.md) | Agent onboarding, execution contract, priority |
| [`agent.md`](agent.md) | Practical repeatable operating workflow |
| [`skill.md`](skill.md) | Capabilities and quality techniques needed |
| [`PRD.md`](PRD.md) | Goals, personas, scope, functional requirements |
| [`architecture.md`](architecture.md) | System design and interactions |
| [`design.md`](design.md) | UI and editorial design system |
| [`do-or-dont.md`](do-or-dont.md) | Engineering rules and anti-patterns |
| [`roadmap.md`](roadmap.md) | Sequenced development stages |
| [`decisions.md`](decisions.md) | Recorded trade-offs and assumptions |
| [`docs/component-contracts.md`](docs/component-contracts.md) | Props, interaction and accessibility contracts |
| [`docs/task-breakdown.md`](docs/task-breakdown.md) | Feature dependency and execution backlog |
| [`docs/seo-translation-matrix.md`](docs/seo-translation-matrix.md) | Exact multilingual SEO regression scenarios |
| [`docs/project-structure.md`](docs/project-structure.md) | File/folder contract |
| [`docs/content-model.md`](docs/content-model.md) | Frontmatter schema and translation identity |
| [`docs/markdown-authoring.md`](docs/markdown-authoring.md) | Article authoring syntax and content accessibility |
| [`docs/editorial-workflow.md`](docs/editorial-workflow.md) | Research, review, translation and update policy |
| [`docs/categories-taxonomy.md`](docs/categories-taxonomy.md) | All 19 category IDs and boundaries |
| [`docs/internationalization.md`](docs/internationalization.md) | Locale routing, dictionaries, translations |
| [`docs/seo.md`](docs/seo.md) | Canonical, hreflang, structured data, indexing |
| [`docs/search.md`](docs/search.md) | Pagefind pipeline, UX, filters and locale handling |
| [`docs/article-page.md`](docs/article-page.md) | Sticky TOC, reading experience, related content |
| [`docs/pages-and-navigation.md`](docs/pages-and-navigation.md) | Sitemap, page specs, navigation and states |
| [`docs/performance.md`](docs/performance.md) | Core Web Vitals, assets, build scaling and budgets |
| [`docs/accessibility.md`](docs/accessibility.md) | WCAG-oriented standards, keyboard and mobile |
| [`docs/security-privacy.md`](docs/security-privacy.md) | Markdown trust, privacy, scripts and third parties |
| [`docs/deployment.md`](docs/deployment.md) | GitHub–Vercel automatic publishing and DNS |
| [`docs/testing.md`](docs/testing.md) | Test pyramid and regression matrix |
| [`docs/acceptance-criteria.md`](docs/acceptance-criteria.md) | Measurable launch pass/fail checklist |
| [`docs/analytics.md`](docs/analytics.md) | Search Console, analytics, consent and KPIs |
| [`docs/operations.md`](docs/operations.md) | Maintenance, content rollback and incident response |
| [`docs/release-checklist.md`](docs/release-checklist.md) | Pre- and post-release gates |
| [`docs/troubleshooting.md`](docs/troubleshooting.md) | Common failure diagnosis |
| [`docs/commands.md`](docs/commands.md) | Expected commands/scripts and safeguards |
| [`docs/references.md`](docs/references.md) | Official references; verify when implementing |
| [`templates/article-template.md`](templates/article-template.md) | Copyable full-length article scaffold |
| [`templates/translation-template.md`](templates/translation-template.md) | Copyable translated-article scaffold |
| [`templates/feature-task-template.md`](templates/feature-task-template.md) | Implementation task scope and handoff |
| [`templates/release-report-template.md`](templates/release-report-template.md) | Release verification evidence |

## Fundamental difference: runtime speed vs build time

The browser never downloads an entire Markdown repository. Astro turns published posts into separate static HTML at build time. A larger library increases **build work**, not automatically **visitor page weight**. Keep listing pages paginated, don't ship all articles as a giant JSON blob, lazily load Pagefind, and optimize image delivery. Benchmark build time as the content library grows.

## Scope control

Do not add an app framework, hosted CMS, authentication, hosted search, chat assistant, comments backend or admin console without a deliberate revised decision record. The value proposition is fast reading and simple publishing.

## Maintenance of this pack

When a decision changes, update the affected domain document **and** [`decisions.md`](decisions.md); adjust tests and acceptance checks. Avoid leaving contradictory guidance across documents. When versions of external libraries change, favor the then-current official documentation over stale example snippets and record the compatibility decision.

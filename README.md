# LadeStack Blog

A lightweight, original, multilingual editorial publication built with **Astro**, shipped as a **static site** from a **single GitHub repository**, and published at **[blog.ladestack.in](https://blog.ladestack.in)**.

> **Current state:** this repository holds the authoritative **planning and implementation context pack** for the product. It defines what gets built, how, and to what quality bar. The Astro application itself is not implemented yet; implementation follows the documents in [`LadeStack_Blog_Documentation/`](LadeStack_Blog_Documentation/).

---

## Table of contents

- [Why this project exists](#why-this-project-exists)
- [Non-negotiable product decisions](#non-negotiable-product-decisions)
- [Repository layout](#repository-layout)
- [Documentation map](#documentation-map)
- [How to use this repository](#how-to-use-this-repository)
- [Target application structure](#target-application-structure)
- [Content, languages and taxonomy](#content-languages-and-taxonomy)
- [Publishing workflow](#publishing-workflow)
- [Quality gates](#quality-gates)
- [Engineering rules](#engineering-rules)
- [Roadmap summary](#roadmap-summary)
- [Contributing](#contributing)
- [License](#license)

---

## Why this project exists

LadeStack Blog covers technology, business, science, travel, health and other broad-interest categories with a credible, technical visual identity. The premise is simple:

- **Reading is fast.** Static HTML, minimal JavaScript, no client-side rendering for article content.
- **Publishing is simple.** Authors write Markdown in the repository. No CMS, no admin console, no database.
- **Search is honest.** Only published, reviewed, genuinely localized pages become indexable, with reciprocal `hreflang`.

It is deliberately **not** an auto-generated article farm, not a social network, not a single-page application, and not a CMS-backed news aggregator. Editorial accuracy is a launch requirement, especially for current events and high-stakes topics.

---

## Non-negotiable product decisions

| Concern | Decision |
|---|---|
| Brand | LadeStack Blog, visually affiliated with LadeStack |
| Canonical origin | `https://blog.ladestack.in/` |
| Framework | **Astro** — Astro components, native CSS, minimal vanilla JavaScript |
| Rendering | **Static Site Generation (SSG)**; no runtime rendering by default |
| Repository model | **One GitHub repository** for application code and Markdown content |
| CMS | None; local Markdown in Astro Content Collections |
| Publish path | Commit/push to `main` → Vercel build → deploy on success |
| Languages | `en`, `ja`, `ko`, `zh`, `ru`, `tr`, `fr`, `pt`, `es` |
| Default language | English at root URLs, with **no `/en/` prefix** |
| Other language URLs | Prefixed with `/{locale}/` |
| Categories | Exactly the initial 19 supplied categories; extensible schema |
| Search | Build-time Pagefind index; lazily loaded UI; current locale first |
| Article navigation | Sticky, scroll-aware Table of Contents from Markdown H2/H3 headings |
| Theme | Light, dark, and system preference — accessible in all three |
| Infrastructure | No database, account system, paid API, or server required for core features |

**Scope control:** adding an app framework, hosted CMS, authentication, hosted search, chat assistant, comments backend, or admin console requires a deliberate revision to [`decisions.md`](LadeStack_Blog_Documentation/decisions.md). The value proposition is fast reading and simple publishing.

---

## Repository layout

```text
LadeStack_Blog/
├── .gitignore
├── README.md                          # this file
└── LadeStack_Blog_Documentation/      # authoritative project context pack
    ├── START-HERE.md                  # fastest orientation
    ├── KICKOFF-PROMPT.md              # prompt to hand to a coding agent
    ├── AGENTS.md                      # agent onboarding and execution contract
    ├── agent.md                       # repeatable operating workflow
    ├── skill.md                       # required capabilities and techniques
    ├── PRD.md                         # goals, personas, scope, requirements
    ├── architecture.md                # system design and interactions
    ├── design.md                      # UI and editorial design system
    ├── do-or-dont.md                  # engineering rules and anti-patterns
    ├── decisions.md                   # recorded trade-offs and assumptions
    ├── roadmap.md                     # sequenced development stages
    ├── docs/                          # feature-level specifications
    └── templates/                     # article, translation, task, release templates
```

---

## Documentation map

Read in this order. Each file is authoritative for its domain; when two documents disagree, the newest explicit project-owner requirement wins.

### Orientation

| Document | Purpose |
|---|---|
| [`START-HERE.md`](LadeStack_Blog_Documentation/START-HERE.md) | Fastest path into the project |
| [`KICKOFF-PROMPT.md`](LadeStack_Blog_Documentation/KICKOFF-PROMPT.md) | Ready-made prompt for an implementation agent |
| [`AGENTS.md`](LadeStack_Blog_Documentation/AGENTS.md) | Agent onboarding, authority order, execution protocol |
| [`agent.md`](LadeStack_Blog_Documentation/agent.md) | Practical, repeatable operating workflow |
| [`skill.md`](LadeStack_Blog_Documentation/skill.md) | Capabilities and quality techniques required |

### Product and system

| Document | Purpose |
|---|---|
| [`PRD.md`](LadeStack_Blog_Documentation/PRD.md) | Goals, personas, scope, functional requirements |
| [`architecture.md`](LadeStack_Blog_Documentation/architecture.md) | System design, data flow, interactions |
| [`design.md`](LadeStack_Blog_Documentation/design.md) | Visual language, typography, color, layout |
| [`do-or-dont.md`](LadeStack_Blog_Documentation/do-or-dont.md) | Engineering guardrails and anti-patterns |
| [`decisions.md`](LadeStack_Blog_Documentation/decisions.md) | Trade-offs, assumptions, change records |
| [`roadmap.md`](LadeStack_Blog_Documentation/roadmap.md) | Sequenced development stages |

### Feature specifications (`docs/`)

| Document | Covers |
|---|---|
| [`project-structure.md`](LadeStack_Blog_Documentation/docs/project-structure.md) | File and folder contract, ownership boundaries |
| [`content-model.md`](LadeStack_Blog_Documentation/docs/content-model.md) | Frontmatter schema, translation identity, validation |
| [`markdown-authoring.md`](LadeStack_Blog_Documentation/docs/markdown-authoring.md) | Authoring syntax, accessible content rules |
| [`editorial-workflow.md`](LadeStack_Blog_Documentation/docs/editorial-workflow.md) | Research, review, translation, update policy |
| [`categories-taxonomy.md`](LadeStack_Blog_Documentation/docs/categories-taxonomy.md) | All 19 category IDs and their boundaries |
| [`internationalization.md`](LadeStack_Blog_Documentation/docs/internationalization.md) | Locale routing, dictionaries, translation resolution |
| [`seo.md`](LadeStack_Blog_Documentation/docs/seo.md) | Canonical URLs, hreflang, structured data, indexing |
| [`seo-translation-matrix.md`](LadeStack_Blog_Documentation/docs/seo-translation-matrix.md) | Exact multilingual SEO regression scenarios |
| [`search.md`](LadeStack_Blog_Documentation/docs/search.md) | Pagefind pipeline, UX, filters, locale handling |
| [`article-page.md`](LadeStack_Blog_Documentation/docs/article-page.md) | Sticky TOC, reading experience, related content |
| [`pages-and-navigation.md`](LadeStack_Blog_Documentation/docs/pages-and-navigation.md) | Page specs, sitemap, navigation, empty/error states |
| [`component-contracts.md`](LadeStack_Blog_Documentation/docs/component-contracts.md) | Props, interaction, accessibility contracts |
| [`performance.md`](LadeStack_Blog_Documentation/docs/performance.md) | Core Web Vitals, assets, build scaling, budgets |
| [`accessibility.md`](LadeStack_Blog_Documentation/docs/accessibility.md) | WCAG-oriented standards, keyboard and mobile support |
| [`security-privacy.md`](LadeStack_Blog_Documentation/docs/security-privacy.md) | Markdown trust model, privacy, scripts, third parties |
| [`analytics.md`](LadeStack_Blog_Documentation/docs/analytics.md) | Search Console, analytics, consent, KPIs |
| [`deployment.md`](LadeStack_Blog_Documentation/docs/deployment.md) | GitHub → Vercel publishing, DNS and TLS |
| [`testing.md`](LadeStack_Blog_Documentation/docs/testing.md) | Test pyramid and regression matrix |
| [`acceptance-criteria.md`](LadeStack_Blog_Documentation/docs/acceptance-criteria.md) | Measurable launch pass/fail checklist |
| [`release-checklist.md`](LadeStack_Blog_Documentation/docs/release-checklist.md) | Pre- and post-release gates |
| [`operations.md`](LadeStack_Blog_Documentation/docs/operations.md) | Maintenance, content rollback, incident response |
| [`troubleshooting.md`](LadeStack_Blog_Documentation/docs/troubleshooting.md) | Common failure diagnosis |
| [`commands.md`](LadeStack_Blog_Documentation/docs/commands.md) | Expected scripts and safeguards |
| [`task-breakdown.md`](LadeStack_Blog_Documentation/docs/task-breakdown.md) | Feature dependency graph and execution backlog |
| [`references.md`](LadeStack_Blog_Documentation/docs/references.md) | Official references to verify during implementation |

### Templates (`templates/`)

| Template | Use |
|---|---|
| [`article-template.md`](LadeStack_Blog_Documentation/templates/article-template.md) | Full-length article scaffold |
| [`translation-template.md`](LadeStack_Blog_Documentation/templates/translation-template.md) | Translated-article scaffold |
| [`feature-task-template.md`](LadeStack_Blog_Documentation/templates/feature-task-template.md) | Task scope and handoff |
| [`release-report-template.md`](LadeStack_Blog_Documentation/templates/release-report-template.md) | Release verification evidence |

---

## How to use this repository

### If you are implementing the site

1. Read [`START-HERE.md`](LadeStack_Blog_Documentation/START-HERE.md), then [`AGENTS.md`](LadeStack_Blog_Documentation/AGENTS.md) and [`do-or-dont.md`](LadeStack_Blog_Documentation/do-or-dont.md).
2. Read [`PRD.md`](LadeStack_Blog_Documentation/PRD.md) for scope and [`architecture.md`](LadeStack_Blog_Documentation/architecture.md) for the implementation model.
3. Read [`design.md`](LadeStack_Blog_Documentation/design.md) before writing any markup or CSS.
4. Consult the relevant `docs/*.md` file for each feature you touch.
5. Break work into independently verifiable steps using [`roadmap.md`](LadeStack_Blog_Documentation/roadmap.md) and [`docs/acceptance-criteria.md`](LadeStack_Blog_Documentation/docs/acceptance-criteria.md).
6. Run the [quality gates](#quality-gates) before every push.

### If you are writing content

1. Copy [`templates/article-template.md`](LadeStack_Blog_Documentation/templates/article-template.md).
2. Follow [`docs/markdown-authoring.md`](LadeStack_Blog_Documentation/docs/markdown-authoring.md) and [`docs/content-model.md`](LadeStack_Blog_Documentation/docs/content-model.md).
3. Confirm the category ID in [`docs/categories-taxonomy.md`](LadeStack_Blog_Documentation/docs/categories-taxonomy.md).
4. Follow the review and translation policy in [`docs/editorial-workflow.md`](LadeStack_Blog_Documentation/docs/editorial-workflow.md).

Local setup once the Astro app exists:

```bash
npm install          # dependencies are git-ignored; regenerate locally
npm run dev          # local development server
npm run build        # production build + Pagefind index
npm run preview      # preview the production build
```

> `node_modules/` is intentionally excluded from version control. Always install from `package-lock.json` so builds stay reproducible.

---

## Target application structure

The documentation pack is designed to be copied into a fresh Astro project. The intended source map is defined in [`docs/project-structure.md`](LadeStack_Blog_Documentation/docs/project-structure.md). Highlights:

```text
ladestack-blog/
├── public/                     # favicon, robots.txt, default OG image
├── src/
│   ├── assets/                 # build-processed images and fonts
│   ├── components/             # shell / editorial / article / primitives
│   ├── content/blog/{locale}/   # Markdown articles per locale
│   ├── data/                   # categories, site settings, locales
│   ├── i18n/                   # dictionaries, locale resolution, URL helpers
│   ├── lib/                    # posts, translations, SEO, validators
│   ├── layouts/                # Base, Listing, Article
│   ├── pages/                  # routes for every page type and locale
│   ├── scripts/                # small client-side enhancements only
│   └── styles/                 # tokens, global, article, components
├── scripts/                    # build-time validation and audits
├── tests/                      # unit, integration, e2e
├── astro.config.mjs
├── package.json
├── package-lock.json
└── tsconfig.json
```

**Boundary rules**

- `src/content/blog` holds only authored, reviewed Markdown and its local assets. No runtime state, API keys, or generated indexes.
- `src/data` holds exact taxonomy IDs, the supported locale list, and site settings.
- `src/lib` holds pure, testable logic: slug normalization, published filtering, taxonomy mapping, translation grouping, URL construction.
- `src/pages` orchestrates routing and page data. Heavy processing belongs in `src/lib`.
- `src/components` receives typed props. Components should not re-scan the whole collection.

---

## Content, languages and taxonomy

- **Locales:** English (default, no URL prefix) plus `ja`, `ko`, `zh`, `ru`, `tr`, `fr`, `pt`, `es`, each at `/{locale}/`.
- **All nine locales exist in the UI architecture.** Only verified translations become publicly indexable article pages. Missing translations must degrade honestly, never with fabricated copy.
- **Categories:** the initial 19 category IDs remain available even when a category has no published post.
- **URLs:** canonical policy is HTTPS, no `www`, trailing slash on HTML routes. Year/month folders are editorial organization, not public URL syntax.
- **Article TOC:** generated from published Markdown H2/H3 headings, sticky and scroll-aware.

---

## Publishing workflow

```text
Author writes Markdown  →  git commit  →  push to main
        →  Vercel build (Astro SSG + Pagefind index)
        →  deploy on success  →  post-release checks
```

Content is never edited in a browser CMS. Rollback is a Git revert of the offending commit, followed by a rebuild.

Configure once: connect the Vercel project to this repository, set the production branch to `main`, and point `blog.ladestack.in` at the deployment after verifying DNS and TLS.

---

## Quality gates

Run before every production publish:

- Formatter, linter, and type check pass with no suppressed errors.
- Production build succeeds and the Pagefind index is generated.
- Content validation passes: frontmatter schema, slug uniqueness, translation-group consistency.
- English plus at least two non-English locales verified, including a missing-translation case.
- Canonical URLs, `hreflang`, redirects, and sitemap output are consistent.
- Article TOC, search overlay, keyboard navigation, theme switching, and mobile layouts are tested.
- No new console errors, no blanket `any`, no fabricated sources, authors, dates, or translations.

Full checklists: [`docs/acceptance-criteria.md`](LadeStack_Blog_Documentation/docs/acceptance-criteria.md) and [`docs/release-checklist.md`](LadeStack_Blog_Documentation/docs/release-checklist.md).

---

## Engineering rules

- Server-render all meaningful text in static HTML. JavaScript enhances interaction; it does not create primary article content.
- Centralize locale resolution, category metadata, and URL construction. Never duplicate those rules in page templates.
- Prefer the smallest implementation that satisfies the requirement, and reuse typed helpers over one-off logic.
- Design for a library of 10k+ localized articles: paginate listings, never ship every article as one JSON blob, lazy-load search, optimize images.
- Keep keyboard focus order, accessible names, and responsive layouts intact while components are still being built.
- Do not store dummy translated pages, credentials, or unreviewed machine output as if it were published content.
- Deviate from an architectural invariant only after recording the decision in [`decisions.md`](LadeStack_Blog_Documentation/decisions.md).

---

## Roadmap summary

The staged plan lives in [`roadmap.md`](LadeStack_Blog_Documentation/roadmap.md); the dependency graph and execution backlog live in [`docs/task-breakdown.md`](LadeStack_Blog_Documentation/docs/task-breakdown.md). Broad sequence:

1. **Foundation** — Astro scaffold, tokenized design system, base layouts, content collections.
2. **Content engine** — frontmatter schema, validators, translation grouping, listing and article routes.
3. **Discovery** — categories, tags, pagination, Pagefind search, TOC, related content.
4. **Multilingual SEO** — locale routing, canonical and `hreflang` generation, sitemap, RSS, structured data.
5. **Hardening** — accessibility, performance budgets, tests, analytics with consent, release gates.
6. **Publishing** — Vercel integration, DNS, post-release verification, operational runbooks.

---

## Contributing

1. Open an issue describing the change and its acceptance criteria.
2. Create a short-lived branch; keep commits scoped and descriptive.
3. Update the affected specification document *and* [`decisions.md`](LadeStack_Blog_Documentation/decisions.md) when a contract changes.
4. Run the quality gates and record the actual commands and results in the pull request.
5. Squash-merge to `main` only after review.

Documentation must not contradict itself. If you find conflicting guidance, fix both sides in the same change.

---

## License

No license file is present yet. Until one is added, all rights are reserved by the repository owner. Add a `LICENSE` before accepting external contributions.

---

**Canonical site:** https://blog.ladestack.in
**Maintainer:** [@girishlade111](https://github.com/girishlade111)

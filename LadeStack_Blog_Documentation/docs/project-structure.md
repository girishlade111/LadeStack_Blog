# Target Repository Structure and Ownership

The following is an intended implementation map. The documentation pack can be copied into a fresh Astro project. Paths can be adapted only with consistent refactoring; do not create two content repositories.

```text
ladestack-blog/
├── AGENTS.md
├── agent.md
├── skill.md
├── PRD.md
├── architecture.md
├── design.md
├── do-or-dont.md
├── decisions.md
├── roadmap.md
├── docs/                       # feature-level specifications
├── templates/                  # editorial/feature templates
├── public/
│   ├── favicon.svg
│   ├── robots.txt               # or generated endpoint
│   └── og-default.webp
├── src/
│   ├── assets/                  # build-processed images/fonts
│   ├── components/
│   │   ├── shell/               # Header Footer SearchTrigger Theme Locale
│   │   ├── editorial/           # ArticleCard FeaturedArticle Pagination
│   │   ├── article/             # TOC ShareLink ReadingProgress Related
│   │   └── primitives/          # Button Icon Dropdown Disclosure
│   ├── content/
│   │   └── blog/
│   │       ├── en/2026/11/example-article.md
│   │       ├── ja/2026/11/example-article.md
│   │       ├── ko/
│   │       ├── zh/
│   │       ├── ru/
│   │       ├── tr/
│   │       ├── fr/
│   │       ├── pt/
│   │       └── es/
│   ├── content.config.ts
│   ├── data/
│   │   ├── categories.ts
│   │   ├── site.ts
│   │   └── locales.ts
│   ├── i18n/
│   │   ├── dictionaries/
│   │   ├── index.ts
│   │   └── urls.ts
│   ├── lib/
│   │   ├── posts.ts            # public/published selectors
│   │   ├── translations.ts     # group resolution
│   │   ├── seo.ts              # canonical/alternates/schema
│   │   ├── reading-time.ts
│   │   ├── pagination.ts
│   │   └── validators.ts
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── ListingLayout.astro
│   │   └── ArticleLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── posts/[slug].astro
│   │   ├── category/[category].astro
│   │   ├── category/[category]/page/[page].astro
│   │   ├── search.astro
│   │   ├── tags/[tag].astro
│   │   ├── [locale]/              # non-English route templates
│   │   ├── rss.xml.ts
│   │   └── 404.astro
│   ├── scripts/                  # only tiny client-side enhancements
│   └── styles/
│       ├── tokens.css
│       ├── global.css
│       ├── article.css
│       └── components.css
├── scripts/
│   ├── validate-content.mjs
│   ├── verify-seo.mjs
│   ├── audit-links.mjs
│   └── audit-output.mjs
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── astro.config.mjs
├── package.json
├── package-lock.json           # if npm selected; lockfile always committed
├── tsconfig.json
└── .gitignore
```

## Folder ownership and boundary rules

**`src/content/blog`**: only authored/reviewed Markdown and closely associated local assets. Do not place runtime state, API keys or generated Pagefind index here. Each locale folder organizes article versions; year/month is editorial organization, not public URL syntax.

**`src/data`**: exact taxonomy IDs, supported locale list, official site settings, non-editorial configuration. Category translations reside in locale dictionaries rather than separate data copies.

**`src/lib`**: pure, easily testable operations. Keep URL encoding, slug normalization, published filtering, taxonomy mapping and translation grouping here. Avoid duplicating these rules in page templates.

**`src/pages`**: routing and page data orchestration; heavy data processing belongs in lib helpers. File-based routing must be tested against installed Astro i18n mode. Static path generation should use only eligible published data.

**`src/components`**: view components. Components should accept typed data, not search the entire post collection each time when upstream page can provide prepared props.

**`public` vs `src/assets`**: put images requiring Astro optimization in `src/assets` or a compatible content-coupled pipeline. `public` is appropriate for assets served as-is with known width/quality. Do not assume `public` images are automatically optimized by Astro.

**`scripts` at root**: build-time validation, output audits and operational checks. Distinguish them from tiny client-side JS enhancements under `src/scripts`.

## Naming and portability

- File naming: `kebab-case`; source components `PascalCase.astro`; data helpers lower-case.
- Public slug: lowercase, normalized, meaningful; Unicode slug support is possible but requires explicit URL encoding and collision tests. Safest baseline: URL-safe Latin transliterated slugs for all locales while allowing translated titles.
- Published URLs must not contain year/month by default; file storage organization and public URL are separate.
- Canonical URL policy: HTTPS, no `www`, with trailing `/` for HTML routes.
- Never rename locale IDs or category IDs casually; published paths require redirect planning.

## Parallel implementation safety

One contributor can work on page components while another builds validators only if they agree on `content-model.md` and centralized helper interfaces. Do not build search, SEO and locale switching from independent ad-hoc locale logic.

# Skill and Capability Playbook

This file defines the practical engineering abilities needed to implement the project; it is not tied to a particular agent product or ecosystem.

## 1. Astro SSG engineering

Understand `.astro` component syntax, content rendering, typed props, `getStaticPaths`, URL generation and build output. Use server/compile-time logic to produce static HTML. Never introduce hydration solely to display static markup. Keep interactive elements as small vanilla-JavaScript enhancements.

**Proof of mastery:** a new Markdown article generates a routable HTML page in `dist/`, with correct metadata and no page-specific app bundle.

## 2. Content Collections and validation

Use Content Layer/Content Collections with a robust Zod schema. Validate frontmatter types, published article requirements, locale tags, category IDs, slug constraints, uniqueness and translation-group invariants. Know how renderer headings become a navigation list. Never use a raw filesystem glob directly in page components when a central collection helper can enforce published-only filtering.

**Proof:** malformed Markdown metadata fails CI/build with actionable errors before deployment.

## 3. Internationalized static routing

Use the shared nine-locale registry, root English route and locale-prefixed alternatives. Understand when to use Astro i18n routing versus custom route generation, and avoid path conflicts. Know that localizing UI is separate from translating article bodies.

**Proof:** valid localized category and article routes exist, and missing translations do not silently serve English under foreign locale URLs.

## 4. Technical SEO

Generate absolute canonical URLs, reciprocal alternate groups, `html lang`, local-language metadata, accessible internal links, XML sitemap(s), robots.txt, RSS and structured data. Understand how `hreflang` differs from canonical. Validate final built HTML, not only source templates.

**Proof:** all members of an article translation group show the same set of available alternates and self canonicals.

## 5. Editorial UI and CSS

Build a calm modern editorial interface with generous reading whitespace, typography, image sizing, layout grids and usable light/dark themes. Use CSS custom properties, semantic markup, responsive fluid type and consistent spacing. Focus on typography before decoration.

**Proof:** long-form articles remain readable on small phones, tablets and wide desktops; keyboard focus is visible in both themes.

## 6. Search indexing and interaction

Run Pagefind **after** Astro builds. Restrict indexing to content routes and actual article body, exposing category, title, tags and dates as metadata/filters where possible. Lazy-load search on first use. Build a dialog with keyboard shortcut, escape and focus management.

**Proof:** a distinctive phrase from an H3 appears in localized search, and its sub-result can link to the section anchor.

## 7. Performance diagnostics

Know Lighthouse, Core Web Vitals, transfer sizes, rendering-blocking resources, route-level JS budgets, image optimization and Vercel build logs. Distinguish browser performance from build duration. Do not claim incremental builds are reliable without benchmarks and cache confirmation.

**Proof:** representative templates meet agreed budgets and regressions are measurable.

## 8. Testing and release discipline

Develop checks for content schemas, locale URL mapping, SEO reciprocity, page counts, Pagefind output, accessibility smoke tests and production deployments. Keep command execution repeatable. Do not use production as the first test environment for major changes.

**Proof:** a preview build catches incorrect translations, duplicate slugs or broken links before publication.

## 9. Editorial verification

For fast-moving topics, verify sources, timestamps, and changes since draft. Maintain neutral, factual writing in sensitive categories such as health, law, politics and finance. Avoid copy-pasting copyrighted articles, unverified figures or machine translations presented as reviewed.

**Proof:** every published article has a documented review status, stable sources and edit/update process.

## 10. Documentation literacy

Read the current official references when a version-sensitive API is involved. Copying an old tutorial verbatim is not sufficient. Document significant deviations and keep this context pack consistent with implementation.

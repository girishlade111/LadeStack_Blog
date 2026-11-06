# Pages, Navigation and Information Architecture

## Public URL matrix

| Template | Default English | Non-English example | Primary purpose |
|---|---|---|---|
| Home | `/` | `/ja/` | Curated and recent articles, categories |
| All articles | `/articles/` | `/fr/articles/` | Full paginated listing |
| Article | `/posts/{slug}/` | `/ja/posts/{slug}/` | Markdown reading |
| Category | `/category/{id}/` | `/fr/category/{id}/` | Browse single primary category |
| Category page 2+ | `/category/{id}/page/2/` | `/es/category/{id}/page/2/` | Bounded paginated archive |
| Tags | `/tags/{tag}/` | `/ru/tags/{tag}/` | Topic intersection |
| Search | `/search/` | `/ko/search/` | Search entry/results |
| About | `/about/` | `/tr/about/` | Publication purpose/team |
| Editorial policy | `/editorial-policy/` | `/pt/editorial-policy/` | Sourcing/corrections |
| Privacy | `/privacy/` | `/fr/privacy/` | Privacy disclosure |
| RSS | `/rss.xml` | optionally `/ja/rss.xml` | Feed; confirm locale strategy |
| 404 | host 404 | localized presentation when supported | Failed route handling |

These route names are proposed **final design contract** for implementation; if an existing codebase uses different routes, reconcile deliberately and record redirects rather than creating multiple competing archives.

## Global navigation

**Desktop:** LadeStack Blog wordmark → Articles → Categories menu (all 19) → Search → Language → Theme. Optional About lives in footer/secondary nav. Do not show empty or fake menu destinations. The categories menu may use 2–3 columns; keyboard arrows/Tab/focus/Escape must be predictable.

**Mobile:** logo plus search and menu, with accessible expandable navigation. In the menu, categories must remain easy to scan, ideally grouped visually but not split into a separate unsupported taxonomy. Locale and theme controls must remain discoverable. Avoid a modal that cannot be closed with Escape/backdrop/tap.

## Homepage sections

1. Editorial masthead and simple value proposition.
2. One featured/lead post only if a curated published entry exists; sensible fallback to newest substantive article.
3. Latest across categories, sorted descending by `publishedAt`.
4. Category discovery list/chips covering all 19; optionally a “View all categories” panel.
5. Selected editor's picks, never fabricated “most popular” labels.
6. Small invitation to explore specific topics and an unobtrusive footer.

No large preloaded carousel, autoplay video, massive category illustration grid or all-post JSON payload.

## Listing pages

Show 12 article cards per page by default. Include total count and accessible pagination. Title, localized one-sentence intro and a meaningful empty state. Avoid routing page 1 at both `/articles/` and `/articles/page/1/` unless canonical redirects are in place. Sort by publication date then deterministic ID; never use filesystem iteration order.

## Category pages

All 19 categories exist in navigation, regardless of how many posts are published this week. Use translated name/description, optional icon and bounded list. For empty categories, show neutral “No published articles in this language yet” and links to available relevant categories; do not silently mix English articles into the foreign-language archive.

## Tags

Tag URLs use stable IDs; localized labels and descriptions are preferred. Don't build dozens of nearly empty tag archives from typos. Curated tag registry, canonical URL uniqueness, and minimum-quality threshold are required before indexing thin tag pages.

## Article detail

See `article-page.md` for content layout and the sticky H2/H3 TOC. Keep exact category, article and locale URL builders shared across breadcrumbs, cards, menu, search, TOC and alternate links.

## Search page/dialog

Every page exposes Search through header. Search view is accessible and works with minimal JS, loads the Pagefind index on demand, and can navigate to section-specific anchors. See `search.md`.

## Utility and policy pages

About explains publication mission and contact routes. Editorial policy explains sourcing, corrections, translation review and advertising/affiliate disclosure standards if relevant. Privacy accurately describes real tools used (do not claim no trackers if analytics are installed). Localize legal/utility pages where published; incomplete translations are not silently pretended complete.

## Information hierarchy and breadcrumbs

- Article: Home → Category → Article (link semantics; do not make non-clickable breadcrumb look interactive).
- Category: Home → Category.
- Tags: Home → Tags → Tag when tags listing exists.
- Pagination: clear current page and previous/next semantics.

## Page states

Every template defines: loading only where client search requires it, no-data, missing cover, long titles, missing translation, stale content notice where relevant, keyboard focus, and light/dark UI. Avoid blank error pages. Site navigation works without client-side router.

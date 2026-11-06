# Component Contracts — Props, States and Behavior

All components should be native `.astro` unless a behavior requires a small vanilla JavaScript enhancement. Treat types below as **conceptual contracts**, not implementation-specific code that can be pasted without adapting to the installed Astro version.

## SiteHeader

**Inputs:** locale, current pathname, categories, hasSearch. **Output:** semantic logo/home link, main navigation, categories trigger, search trigger, locale switcher, theme selector. **States:** desktop, mobile menu open/closed, focused menu item, narrow long localized labels, dark theme. **Rules:** a single `nav` landmark for primary navigation; no hidden duplicate focus stops; all actions real.

## LocaleSwitcher

**Inputs:** current locale, current page type, translation map or equivalent localized route map. **Output:** link to available equivalent page versions, native readable language names, current locale indication. **States:** article with 1/3/9 translations, locale utility page, incomplete translation, menu open. **Rules:** do not create links to nonexistent translated posts; never suggest article body translation exists because UI dictionary exists.

## ThemeSwitcher

**Inputs:** current preference (`system`, `light`, `dark`), capability to persist preference. **Output:** an accessible, intuitive control with visible selection. **States:** first visit, explicit selection, OS preference change, local storage unavailable. **Rules:** no flash where reasonably avoidable; no content invisible in dark; never require a framework runtime.

## CategoryMenu / CategoryChip

**Inputs:** category ID, localized labels and descriptions, active route. **Output:** links to one of exactly 19 categories. **States:** hover, focus, selected, locale-specific lengthy label, category with zero articles. **Rules:** category IDs never translated, display strings translated; proper anchor destination; no fake badges/counts.

## ArticleCard

**Inputs:** published article identity, localized URL, title, description, category label, image/alt, publish date, optional reading time. **Output:** semantic linked card. **States:** no image, very long title, new article, localized mixed-script text, focus. **Rules:** no article body JSON serialized; deterministic date sorting; no fake engagement counts.

## ArticleLayout

**Inputs:** current article entry, rendered Markdown content, heading metadata, author, available translation map, related articles. **Output:** one H1, article body, metadata, breadcrumb, TOC, source/citation zone and related reading. **States:** long article, short article, no headings, no cover, no related entries. **Rules:** main article content in static HTML; own self canonical and proper metadata supplied by shared SEO helper.

## ArticleTOC

**Inputs:** renderer-produced heading array containing text, depth and final ID. **Output:** `<nav aria-label="On this page">` with anchors and nested indentation. **States:** active heading, long TOC rail, scroll position, short article, mobile disclosure, no JS, reduced motion. **Rules:** use Markdown's real IDs and ensure anchor click works natively. JS should only track active section/collapse, not render the links.

## ReadingProgress

**Inputs:** article root/scrollable reading region. **Output:** unobtrusive progress bar, optionally accessible text. **States:** top, middle, bottom, article shorter than viewport. **Rules:** throttle or use efficient observers; must not cause heavy reflow.

## SearchTrigger / SearchDialog

**Inputs:** current locale and optional initial query. **Output:** accessible search dialog or results page with focus management, lazy-loaded Pagefind and result links. **States:** idle/open/loading/results/empty/error, keyboard, offline, mobile. **Rules:** `Ctrl+K`/`Cmd+K` opens when appropriate, Escape closes, focus returns; current-locale index; no full-repository JSON shipping.

## Pagination

**Inputs:** current page, total pages, URL builder. **Output:** Previous/Next and page links. **States:** first, middle, last, only one page. **Rules:** canonical page 1 format, semantic accessible labels, no duplicate page-1 SEO URLs.

## BaseLayout / SEOHead

**Inputs:** locale, title, description, canonical path, type, translated alternates, social image, published/updated metadata as appropriate. **Output:** `html lang`, `<head>` metadata, shared shell, CSS/theme. **States:** home, category, article, search and noindex. **Rules:** exactly one canonical on indexable pages; only correct reciprocal hreflang; no draft leakage, no unverified schema claims.

## Footer / EmptyState / ErrorState

Footer contains substantive site/product links, RSS, editorial/legal info without clutter. EmptyState explains missing locale/category/search content and links to valid nearby destinations; no invented posts. ErrorState conveys what is unavailable and lets users continue navigating.

## Testing matrix for every component

Validate: correctness, keyboard, screen reader labeling, 320px and desktop layouts, long localized strings, both themes, no content shifts, proper static output, and predictable behavior if optional JavaScript cannot run. Component-specific tests should be kept near implementation, not only in manual QA notes.

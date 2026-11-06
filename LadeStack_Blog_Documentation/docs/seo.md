# Technical SEO Specification — Multilingual Static Publication

## Baseline

All SEO metadata must be derived from **the actual published page**, not duplicate default-language data. The stable canonical origin is `https://blog.ladestack.in`. Use consistent trailing slashes on HTML routes and absolute URLs in canonical and alternate metadata. Verify HTTPS works before production publishing.

## Page-level requirements

- Exactly one meaningful `<title>`, localized and specific to article/category/page; no repeated generic title.
- Localized unique meta description when appropriate.
- Exactly one `<link rel="canonical">` pointing to the page's own preferred absolute URL for indexable localized pages.
- Correct `<html lang="{locale}">`, readable `h1`, semantics and breadcrumb links.
- Open Graph type/title/description/url/image for shareable pages. For articles include article metadata where supported.
- Social image must exist and have suitable size/format; use brand default only when article lacks one.
- JSON-LD (`BlogPosting`/`Article` for posts, `BreadcrumbList` if breadcrumbs visible, `Organization`/`WebSite` where accurate). All dates and authors must reflect actual content.
- Draft/review routes must not publish to production or appear in sitemap/search.

## hreflang — hard rules

Given a translation group with only English, Japanese and French published, all three pages include exactly the **same set** of published alternate URLs including self:

```html
<link rel="alternate" hreflang="en" href="https://blog.ladestack.in/posts/astro-seo-basics/" />
<link rel="alternate" hreflang="ja" href="https://blog.ladestack.in/ja/posts/astro-seo-basics/" />
<link rel="alternate" hreflang="fr" href="https://blog.ladestack.in/fr/posts/guide-seo-astro/" />
```

On the English page, self canonical is the English URL; on Japanese and French pages, self canonicals are **their own localized URLs**. Each group uses reciprocal alternates; do not reference translated files in draft/review state or nonexistent URLs. Use a shared translation registry, not manual list editing in 9 files. `x-default` is optional when a meaningful fallback/selector page exists; do not blindly point article x-default to unrelated content.

Google's localization guidance: https://developers.google.com/search/docs/specialty/international/localized-versions

## Automatic SEO utility responsibilities

- `buildCanonicalUrl(relativePath)`: ensure canonical host/scheme/path, trailing slash.
- `buildAlternates(translationKey)`: only actual published/indexable variants, deterministic locale ordering.
- `getPageMetadata`: title, description, type, OG image, `noindex` policy and dates.
- `buildArticleJsonLd`: author, publisher, published/modified time, image, headline, URL; exclude false attributes.
- `validateSeoGraph`: verify each alternate points to an actual output page with reciprocal references and a self canonical.

## Sitemaps

Use the maintained Astro sitemap integration or a tested custom generator. Include only indexable public URLs, proper `<lastmod>` only when truthful, and divide into multiple files/index when URL/file-size limits require it. Google sitemap limit: 50,000 URL entries or 50MB uncompressed per sitemap; design for safe partitioning. Consider locale alternates in sitemap if following that strategy, but **avoid multiple incoherent independent alternate systems**; HTML alternates are sufficient if complete/correct. Root `robots.txt` should link to the sitemap index and not block article content needed for indexing.

## Archives, empty categories and pagination

- Published category pages with substantive unique content may be indexable; completely empty/thin archives should be evaluated for `noindex` until content exists.
- All paginated listing URLs should be crawlable and have self canonicals where unique, not canonicalized to page 1 merely because they share a title prefix.
- Sorting/filter pages with duplicate content require clear canonical/robots policy; avoid generating near-infinite filter combinations.
- Pagefind index should exclude `noindex` pages, navigation chrome and irrelevant utility pages, independently of robots where needed.

## Internal linking

Link article cards from homepage, categories, tags and related posts. Use descriptive anchor text. Do not insert broken language-specific links. If no translation exists, link to an explicitly labeled English article only when that is a user choice; do not label it as localized.

## Structured data safety

Structured data must not claim reviews/ratings, viral popularity, factual author credentials, organization details or dates that were not provided. Schema is not a ranking guarantee. Ensure structured-data URLs reflect canonicals and are not foreign language duplicates.

## Redirects and migrations

Stable slugs are preferred. If unavoidable, use documented permanent redirects at hosting/config level, avoid redirect chains, update sitemap and internal links, and test old links. Never redirect all missing localized posts to a generic English equivalent silently.

## Pre-publish SEO test examples

1. One English-only article: canonical self; no fake 8 locale alternates.
2. English/ja/fr article: 3 reciprocal alternates on all 3 URLs; 3 correct self canonicals.
3. Unpublished French translation: /fr article absent; other pages have no fr alternate.
4. Distinct localized slug: href matches final generated output.
5. Empty Technology category in one locale: no false article cards or misleading count.
6. All published HTML routes have `lang`, title and appropriate canonical.
7. Sitemap contains no drafts, 404 routes, preview URLs or deleted slugs.
8. Article updates keep URL stable and modified date truthful.

## Measurement

Set up Google Search Console for production domain, submit sitemap and monitor index status, international targeting via actual indexed pages, Core Web Vitals, query traffic and crawl issues. SEO performance depends on original useful content and external ecosystem signals, not just correctness of tags.

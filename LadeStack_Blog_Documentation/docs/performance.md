# Performance and Growth Strategy

## A crucial distinction

**Visitor performance** depends on shipped HTML, CSS, JS, fonts, images, network/CDN and rendering work. **Build performance** depends on how many articles/pages Astro must process plus search/sitemap generation. One repository versus two has negligible inherent effect on how fast a single article loads. Thousands of Markdown files are not delivered wholesale to the browser.

## Performance philosophy

Make every page fast by default, not by a later heavy optimization sprint. Stay fully static, render article text in HTML, avoid component hydration, paginate lists and lazy-load optional interactions. Track actual data from representative article, category, home and search routes.

## Targets (engineering budgets, not guaranteed measurements)

| Metric | Target | How to measure |
|---|---|---|
| LCP | ≤2.5s at p75 mobile in field when data sufficient | CrUX/real-user field data |
| INP | ≤200ms at p75 where available | Field tools |
| CLS | ≤0.1 at p75 | Field/Lighthouse |
| Lighthouse performance | 90+ aspirational for representative pages | Controlled lab tests |
| Initial route JS | Aim near 0 on static articles; target ≤~50 KB compressed for pages with controls | Bundle analyzer/network |
| CSS | Aim ≤~30 KB compressed per template | Network |
| Cover images | Deliver responsive, optimized sizes, not multi-MB originals | Network and image audits |
| Search | No initial index download until search intent | Network waterfall |

Budgets are preliminary and must be adjusted to measured feature impact. A static site can still be slow if it sends large images, font payloads or scripts.

## Critical rendering path

- Semantic server-generated HTML for article content and listings.
- Avoid blocking scripts; inline only very small theme preference setup if needed to avoid flash.
- Use `font-display: swap` or equivalent; consider system font fallback and subset/local fonts with appropriate licenses.
- Avoid third-party tag managers, social embeds, autoplay players and global animation runtimes by default.
- Defer nonessential images/JS. Do not lazy-load the likely LCP hero/cover if it delays largest content.

## Images and media

- Establish consistent card aspect ratio and reserve width/height to avoid CLS.
- Prefer Astro image pipeline for compatible local assets, or supply appropriately sized/preoptimized URLs.
- If content Markdown image processing needs special pipeline, explicitly test output; a `public/` image is not automatically transformed.
- Keep external assets on trustworthy hosts only; use licensed images and appropriate alt/caption.
- Set lazy loading for below-fold content. Avoid art assets solely for decoration on each article.

## Search efficiency

Pagefind builds indexes in static artifacts and can load language-relevant chunks on demand. Do not ship a 10k-post JSON array in a script or embed search index in HTML. Track Pagefind bundle/index size and verify search results still work after every major content addition.

## Listing scalability

`getCollection('blog')` and static page generation are build-time operations. Generate multiple paginated pages of 12 articles, not one enormous DOM. On each article, render 3–4 related cards rather than all related articles. Avoid computing global search statistics inside every page render if they can be prepared once.

## Growth scenarios

Assuming 3 original articles/day and all 9 variants eventually published: 27 Markdown files/day, ~9,855/year and ~98,550 in 10 years (ignoring leap years). These are source file counts, **not page-load bytes**. Not every day will have nine reviewed versions. Monitor generated page count as the better build-side metric.

## Build performance instrumentation

Record per build:

1. Content-entry count by locale and status.
2. Number of article HTML pages and archive pages generated.
3. Total `dist` size, average/post-template sizes and number of output files.
4. Astro build duration, search index duration and peak memory if available.
5. Dependency/build cache behavior on Vercel.
6. Any image processing bottleneck.

Set internal escalation thresholds, e.g., repeated build times over 5–10 minutes prompt investigation, not immediate architecture rewrite. Measure against actual deployment plan limits; these thresholds are operational alarms, not platform hard limits.

## Optimization order

1. Remove redundant client JS and avoid serialized entire content.
2. Audit images/font delivery and page templates.
3. Avoid duplicated per-route data processing in build logic.
4. Optimize search/index generation and number of archive routes.
5. Review Vercel cache/asset processing.
6. Benchmark supported incremental static build techniques only with proven correct cache invalidation.
7. Consider hybrid/ISR only when full static builds are demonstrated to be impractical and an approved architecture decision explicitly accepts runtime trade-offs.

## Performance QA

Run representative Lighthouse checks on English home, article, category, search and at least one CJK article, in light/dark, mobile/desktop. Measure mobile on throttled conditions. Compare before and after adding analytics scripts. Report actual measurement environment; never label lab scores as universal field performance.

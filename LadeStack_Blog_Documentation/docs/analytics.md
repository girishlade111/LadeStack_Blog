# Analytics, Measurement and Privacy-Aware Instrumentation

## Objectives

Measurement should answer whether original content is discoverable, useful and fast **without** compromising privacy or inflating client bundle weight. Analytics is optional for initial functionality and must not become a prerequisite for viewing articles or using search.

## Search visibility measurement

Set up Google Search Console on the production property and submit the XML sitemap. Track:

- Indexed pages and reasons pages are excluded.
- Search impressions, clicks, CTR and average position by page/query/locale.
- Category coverage, discoverability of translated articles and changes over time.
- Coverage errors, URL inspection outcomes, Core Web Vitals report and sitemap health.

Search Console clicks are **not** a complete site visitor count; they represent search click events. Do not compare them one-to-one with total visits in web analytics.

## Web usage analytics (optional)

Potential options include GA4 and Microsoft Clarity if the project owner chooses to enable them. Do **not** silently add either script. Before adding:

1. Confirm purpose, consent requirements and privacy policy text.
2. Implement correct consent gating where required.
3. Check privacy/cookie treatment and any regional requirements applicable to audience.
4. Measure impact of scripts on initial network and Core Web Vitals.
5. Ensure no sensitive search data or user identity is sent unintentionally.
6. Treat analytics as best-effort and aggregate; ad blockers/consent can reduce observed counts.

## Editorial KPIs

- Original stories published per week; published translation count per story and locale.
- Content freshness: days since review for time-sensitive stories.
- Article discovery: search clicks/impressions and internal navigation flows where measured.
- Organic landing pages by locale and category; do not equate category volume with quality.
- Top search queries with no results (only if collected in privacy-preserving manner, and disclosed).
- Reader experience: measured LCP/INP/CLS and template-level payload sizes.

## Build health KPIs

Track duration from Git push to successful production deploy, Astro build time, Pagefind generation time, total built pages, build failures and total output size. These operational metrics can be captured from CI/Vercel logs, without adding browser trackers.

## Reporting cadence

Weekly: failed publishing/checks, top broken content and source freshness. Monthly: search visibility by category/locale, Core Web Vitals, blog output growth and any build-time regressions. Quarterly: evaluate whether content and translation workload remains sustainable, with no automatic assumption that a new backend is required.

## Avoid false metrics

Do not label a manually curated story “trending” based only on editorial flag. Do not present view counts or estimated article reads without an actual measured data source. Distinguish “posts published” from “original stories”; 9 translation files represent one underlying story, not 9 independent original reports.

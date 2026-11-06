# Official References and Verification Notes

These URLs are references for the eventual implementation. APIs can evolve; verify documentation against the **installed package version** at coding time. Product decisions in this pack are authoritative unless explicitly changed; external docs determine how to implement them correctly.

## Astro

- Astro overview: https://docs.astro.build/
- Content Collections: https://docs.astro.build/en/guides/content-collections/
- Content Loader API / glob: https://docs.astro.build/en/reference/content-loader-reference/
- Markdown: https://docs.astro.build/en/guides/markdown-content/
- i18n routing: https://docs.astro.build/en/guides/internationalization/
- Astro `astro:i18n` module: https://docs.astro.build/en/reference/modules/astro-i18n/
- Images: https://docs.astro.build/en/guides/images/
- Sitemap integration: https://docs.astro.build/en/guides/integrations-guide/sitemap/
- Vercel deployment: https://docs.astro.build/en/guides/deploy/vercel/

## Search

- Pagefind documentation: https://pagefind.app/docs/
- Multilingual index behavior: https://pagefind.app/docs/multilingual/
- Section-level results: https://pagefind.app/docs/sub-results/
- Metadata/filters: https://pagefind.app/docs/metadata/ and https://pagefind.app/docs/filters/

## Search engine guidance

- Google localized versions / reciprocal `hreflang`: https://developers.google.com/search/docs/specialty/international/localized-versions
- Google canonical guidance: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Structured data: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data

## Quality and accessibility

- Web.dev Core Web Vitals: https://web.dev/articles/vitals
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- MDN IntersectionObserver: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- MDN prefers-reduced-motion: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion

## Operational note

At the planning date (November 2026), Astro's Content Layer glob loader and native static Vercel deployment are appropriate baseline approaches. Experimental optimization features should not be assumed suitable for production until their exact release/version and cache behavior are tested. Pagefind is a static search index generator, not a hosted search server. Google does not require providing multilingual page variants in multiple incompatible annotation systems; consistently implemented HTML alternates are sufficient.

## Truthfulness policy

This documentation includes planned paths and sample metadata. None of the example routes or files asserts that the finished application has already been deployed. Do not treat mock/demo records as production content or use examples as factual news articles.

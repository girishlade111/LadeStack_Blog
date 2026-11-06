# Content Model, Frontmatter and Validation

## Data philosophy

A **story** is a language-independent editorial item; a **localized article** is one Markdown file describing that story in a specific locale. The same story can have between 1 and 9 published variants, and may have drafts that are not public. Stable IDs are essential for reciprocal locale SEO and internal links.

## Directory pattern

`src/content/blog/{locale}/{YYYY}/{MM}/{editorial-file-slug}.md` — e.g., `src/content/blog/en/2026/11/astro-seo-basics.md`. The editor's file name need not be identical to `slug` but should usually match to reduce confusion. A central path validator enforces folder locale = frontmatter `lang` and date conventions. The public route uses the explicit `slug` field, not year/month.

## Full frontmatter contract

| Field | Type | Required | Semantics |
|---|---|---|---|
| `articleId` | nonempty string | yes | Immutable language-independent story ID, e.g. `story-2026-001` |
| `translationKey` | nonempty stable string | yes | Shared by every language version of same story |
| `lang` | locale enum | yes | One of exactly nine codes |
| `slug` | URL-safe string | yes | Public slug unique **within locale** |
| `title` | string | yes | Fully localized, descriptive, not clickbait |
| `description` | string | yes | Distinct localized summary/meta description |
| `category` | stable category ID | yes | Exactly one of 19 initial IDs |
| `tags` | string array | yes/default `[]` | Curated topic IDs, not free-form duplicates |
| `authorId` | string | yes | Known author record; do not fabricate a byline |
| `status` | enum | yes | `draft`, `review`, `published` |
| `publishedAt` | ISO date/time with zone | yes for published | First publication time for story version |
| `updatedAt` | ISO date/time with zone | optional | Real substantial revision timestamp |
| `featured` | boolean | default false | Editorially curated; not a popularity claim |
| `coverImage` | relative asset path/URL | optional | Cover asset validated at build or URL checked |
| `coverAlt` | localized text | conditional | Descriptive alt if informative cover |
| `coverCredit` | string | optional | Attribution/license if required |
| `summary` | localized string | optional | Longer teaser, if distinct from description |
| `sources` | list of label/URL/date | contextual | Verifiable citations for factual/trending posts |
| `noindex` | boolean | default false | Explicit exceptional publication handling |
| `reviewedAt` | timestamp | recommended for published translations | Editorial quality audit |
| `originalLang` | enum | recommended | Usually `en`, source for translations |

Published articles must have sensible word count, body headings and nonempty prose. Set minimum-length thresholds carefully for news briefs, explainers and visual stories; don't conflate quality with word count.

## Example complete frontmatter

```yaml
---
articleId: story-2026-001
translationKey: astro-seo-basics
lang: en
slug: astro-seo-basics
title: "Astro SEO Basics: A Practical Checklist"
description: "A clear, practical overview of technical SEO for static Astro websites."
category: technology
tags: [astro, seo, web-development]
authorId: editor-main
status: published
publishedAt: 2026-11-06T09:00:00+05:30
updatedAt: 2026-11-06T09:00:00+05:30
featured: false
noindex: false
sources:
  - label: "Astro documentation"
    url: "https://docs.astro.build/en/guides/"
---
```

Do **not** include the sample article as actual published content until the author and sources have been reviewed. Templates should use `status: draft` by default to prevent accidental publication.

## Cross-file invariants

1. `(translationKey, lang)` identifies **one** article file. Duplicates fail validation.
2. All files in a translation group have the same `articleId`, primary category and base story meaning.
3. One English original is mandatory for each publishing group; published non-English variant cannot reference a nonexistent source record.
4. Different locale versions can use different public slugs and translated titles.
5. `(lang, slug)` is globally unique across published posts; also check collisions with reserved routes.
6. Within each group, only variants with `status: published` and not `noindex` are indexable alternates. A published page with `noindex` may remain accessible but must not be advertised as indexable alternate or in XML sitemap.
7. A translation cannot have publication metadata older than the original in a misleading way; separate translation publication time from original story time if appropriate.
8. `updatedAt` cannot precede `publishedAt` when both represent the same localized version.
9. Category IDs must exist and cannot be localized strings in frontmatter.
10. `lang` must match the path locale folder. Optional author IDs must resolve to a trusted site author registry.

## Helper API contracts (conceptual)

- `getPublishedPosts(locale?)`: excludes drafts/review/noindex where listing policy requires; `noindex` articles may still need special rendering but never indexing.
- `getStoryGroup(translationKey)`: returns validated variants and publication states.
- `getPostUrl(entry)`: returns canonical relative path.
- `getAvailableTranslations(entry)`: returns only **published, indexable** alternates.
- `getCategoryPosts(categoryId, locale)`: bounded listing inputs sorted deterministically.
- `validateContentIndex(entries)`: throws actionable errors for cross-file invariants.

## Draft behavior

Use explicit statuses. Draft/review Markdown may exist in the repository and local dev but must **not** be included in production `getStaticPaths`, Pagefind, sitemap, feeds, related posts or public category counts. Optional preview UI must not accidentally create indexable preview routes.

## Slug mutations

After publication, changing a `slug` is an SEO migration, not an editorial rename. Add a permanent redirect from old URL to new, update internal links, canonical and hreflang references, check destination's published state, and retain redirect tests. Change only title freely without changing slug.

## Schema implementation guidance

Use a Zod schema in `src/content.config.ts` plus a cross-file validator script after loading all entries. Consider author ID/category enum generated from the data registry so schemas and UI use the same set. Treat dates consistently as actual instants, not browser-local guessed strings. Stable article IDs are strings, not ordinal position in an array.

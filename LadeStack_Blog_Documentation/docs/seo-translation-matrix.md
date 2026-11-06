# Multilingual SEO Test Matrix and Expected Outputs

## Matrix 1 — English-only story

**Input:** `translationKey=story-a`, published en only.  
**Expected:** `/posts/story-a/` exists; article page self canonical; `hreflang=en` may refer to itself; no `ja/ko/zh/ru/tr/fr/pt/es` alternates. Localized article routes absent, but all nine locale homepages remain available.

## Matrix 2 — Partially translated story

**Input:** `story-b` published in en, ja, fr; draft in es; no others.  
**Expected public URLs:** `/posts/story-b/`, `/ja/posts/story-b/`, `/fr/posts/histoire-b/`.  
**Expected SEO:** each URL canonical self; each page has `en`, `ja`, `fr` alternates, identical group; draft es page absent and no es alternate. `html lang` is en/ja/fr respectively.

## Matrix 3 — Complete story

**Input:** nine reviewed published variants.  
**Expected:** nine HTML pages, nine self canonicals and nine reciprocal hreflang entries on **each** article; no duplicate English `/en/` variant; correct translation switch to local slug.

## Matrix 4 — Unpublish one variant

**Input:** Change ja from published to review, while en/fr remain published.  
**Expected:** Japanese article URL not built for production; en/fr alternate groups shrink to en/fr; sitemap/search/related links drop ja; no stale Japanese URL accidentally served from the new deployment.

## Matrix 5 — Canonical redirect case

**Input:** Published French slug must change with explicit approval.  
**Expected:** old French slug permanently redirects to new, new French canonical self, all alternates point only to new URL, no two indexable French versions.

## Matrix 6 — Missing UI locale article

**Input:** Browse `/ko/` and open a story with English-only content.  
**Expected:** Korean homepage and categories translated; article not falsely available at `/ko/posts/...`. Any optional fallback-to-English link must clearly say the article is in English and go to its true canonical URL.

## Matrix 7 — Draft, noindex and deleted content

**Input:** A draft file; a review file; an exceptional `noindex` published file; one deleted article.  
**Expected:** drafts and reviews have no public routes; `noindex` page follows explicit indexing/linking policy; sitemap and Pagefind exclude all nonindexable content. Deleted article has reviewed 404/410/redirect behavior.

## Matrix 8 — Category and tag SEO

**Input:** 19 categories, one empty in a specific locale, listing with 3 pages.  
**Expected:** translated labels, correct archive URL paths, pagination, distinct canonical per unique listing, sensible noindex decision for thin empty archive, no draft cards.

## Test method

After a real Astro production build, parse `dist/` HTML and sitemap. Build a URL→metadata graph. Check alternate member existence/reciprocity and self-canonical consistency. Static tests should not rely on a web crawler being able to access a local dev server; file inspection is enough for first gate. Then run live spot-check against actual production after release.

## Correctness notes

`hreflang` is advisory to search engines, not a guarantee of ranking. Do not conflate it with `canonical`. Every complete localized article is independently indexable under its own URL when it contains real target-language substance. `x-default` is optional and must point to a meaningful fallback page, not an invented translated URL.

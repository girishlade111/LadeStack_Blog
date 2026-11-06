# Troubleshooting and Failure Diagnosis

## New Markdown post did not appear after Git push

1. Was the commit merged to the Vercel **production branch** (`main` as configured), or just a preview branch?
2. Did Vercel start and **successfully finish** the build? Push is not instantaneous publish.
3. Is frontmatter `status: published`, with allowed category, locale, slug and publication date?
4. Did the content collection loader include the file path? Check glob pattern.
5. Is there a duplicate slug/translationKey preventing generation?
6. Look for the route in generated `dist/` before diagnosing DNS/cache.
7. Confirm domain points to current production deployment, not an old project.

## Translated post returns 404

Check folder locale and `lang`, published status, `getStaticPaths` and route prefix. Ensure built output contains the actual localized slug. Missing/unreviewed translations should intentionally 404 or be absent; do not auto-serve English at the translated URL.

## hreflang mismatched / missing

Check shared translation registry, correct `translationKey`, published status, URL builder, canonical host and reciprocity. Inspect **all versions** in generated HTML, not only the English file. No alternative URL should point to a missing page.

## Two languages show same article text

Likely unsafe fallback implementation: remove body fallback. Keep UI dictionary fallback for development only; article translations require a real local-language Markdown body. Rebuild and validate `html lang` and Pagefind search indexes.

## Search returns no results

Ensure `npm run build` includes Pagefind **after** Astro. Confirm `dist/pagefind` exists and files deploy. Check document `html lang`, `data-pagefind-body`/exclude rules, whether content is actually published and Pagefind path loading. Look at network 404/errors in browser. Never solve by embedding all Markdown into client JS.

## Search shows wrong language

Check `<html lang>` output and Pagefind's multilingual index configuration; verify the search UI is instantiated in the document with correct language. Content may have wrong locale metadata/path or a shared UI reused without reinitializing.

## TOC headings don't scroll correctly

Confirm generated `href="#id"` matches the actual rendered heading ID. Add `scroll-margin-top` for sticky header. Inspect duplicate IDs, Unicode normalization and hash handling. Keep plain anchor navigation working without JS.

## Active TOC jumps or flickers

IntersectionObserver root margins and overlapping sections may be too aggressive; use a deterministic active selection rule, ensure only one active item and throttle expensive fallback handlers. Do not recalculate every frame if observer data suffices.

## Mobile page scrolls horizontally

Inspect code blocks, wide tables, long URLs, oversized images, header overflow, dropdown widths and fixed TOC. Localize overflow to content blocks; avoid global `overflow-x:hidden` masking inaccessible content.

## Dark theme unreadable

Audit CSS token application, code highlighter theme, SVG icon strokes, input placeholders, borders, focus, modal backdrop and images. Test both preference states before declaring fixed.

## Build too slow with thousands of posts

Measure Astro render, image processing and Pagefind separately; count outputs; check repeated expensive `getCollection` work and global data serialization; profile oversized images/font work. Repository splitting does not solve full build processing. Consider tested caching/build alternatives only after evidence.

## Vercel domain wrong / HTTPS issues

Verify Vercel project domain settings, DNS target from Vercel's current instructions, certificate issuance and redirects. Do not hard-code `http://` or an old domain into canonical/sitemap. Inspect actual response headers/redirect chains.

## Unexpected indexed empty category pages

Check category listing and noindex policy; ensure thin/empty pages have a thoughtful SEO strategy rather than blanket index or aggressive blanket noindex. Update sitemap accordingly.

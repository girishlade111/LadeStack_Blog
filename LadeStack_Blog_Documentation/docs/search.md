# Universal Search Specification — Static Pagefind

## User goal

A visible site-wide search affordance should find any **published article in the current interface language**, across all 19 categories, their tags, titles, summaries and main body sections. Search must work without a server, database or paid service. Global means all the blog's content in the current locale at initial launch; cross-language meta-search is explicitly future scope.

## Technical approach

1. Build Astro static pages into `dist/`.
2. Run Pagefind over the completed HTML output after the build.
3. Pagefind emits static chunked search indexes into `dist/pagefind/` (path may vary by actual tooling).
4. Header search button/keyboard shortcut opens an accessible dialog or navigates to a search page.
5. Load the Pagefind runtime and required index chunks **only when the user initiates search**, not on every homepage load.
6. Search results link to actual article URLs and, when available, matching H2/H3 anchors.

Pagefind multilingual indexing uses `<html lang>` to separate locale indexes. Verify correct language of every generated page, including empty/404 utility pages. Official reference: https://pagefind.app/docs/multilingual/

## UX states

- **Idle:** visible search action with descriptive prompt and shortcut hint (`Ctrl+K`/`Cmd+K`).
- **Open:** focus in search input, labeled dialog, close button, Escape to dismiss, focus returns to invoking control.
- **Typing:** accessible, short debounced query, no layout jumps; indicate loading only when meaningful.
- **Results:** title, category, summary/highlight, relevance, optional published date/tag and matching subsection link.
- **Empty:** clearly show no matches, suggested category links, spelling query suggestion (no fictitious results).
- **Error/offline:** explain that local static search assets could not load; allow normal category navigation.
- **Mobile:** full-width usable input/dialog, keyboard does not obscure close/action, scroll lock and visible result area.

## Indexing rules

Include article main text but exclude header/footer, duplicate related-post cards, TOC and other repeated navigation from the searchable body. Use Pagefind attributes (`data-pagefind-body`, metadata/filters/weights as supported by installed version) on article templates. Exclude draft, review and noindex pages. Category titles and tags should be indexed as metadata and filters; don't duplicate the article body across every card.

## Ranking and filters

Prefer title and heading matches over generic body text using Pagefind weighting. The filter set initially includes category ID and optionally tags. Use localized display labels in UI, while filter values remain stable IDs. Dates can be exposed for recency sorting if supported reliably, but do not pretend Pagefind's relevance score is trending popularity.

## Deep-link subresults

Pagefind can expose matching sections based on headings with IDs. A result for “sitemap” may show `Article title → SEO Setup`, linking to `/posts/astro-seo-basics/#seo-setup`. Test that generated IDs match TOC and are stable after content edits; existing shared anchors should not be changed casually.

## Integration details

Recommended package scripts (verify the installed Pagefind CLI syntax):

```json
{
  "scripts": {
    "build:site": "astro build",
    "build:search": "pagefind --site dist",
    "build": "npm run validate:content && npm run build:site && npm run build:search"
  }
}
```

Do not call `npm run build` from within an implementation of `validate:content` or from another `build` script (avoid recursion). Select one package manager and commit its lockfile. Vercel must run the **full** `build` command; output directory remains `dist`.

## Performance constraints

- Do not embed all article Markdown or search index JSON into site HTML.
- Defer loading search JS and chunk requests until user intent.
- Limit rendered results per batch (e.g. 10–20) with load-more/pagination.
- Avoid expensive fuzzy matching libraries loaded separately if Pagefind handles the query.
- Track index output size as locale count and article count grow.

## Regression cases

- Query matching title, summary, body and H3 respectively.
- Query with punctuation, Cyrillic, Japanese text and Turkish casing.
- No cross-locale language mismatch.
- Draft text absent; deleted post absent after a fresh build.
- Section result anchor exists and scrolls correctly.
- Escape, keyboard focus, screen-reader count and mobile input work.
- Build fails if Pagefind artifact is missing after a supposedly successful release build.

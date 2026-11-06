# Verification and Test Strategy

## Test layers

1. **Pure-unit:** category/locale helper functions, slug normalization, URL construction, canonical construction, date/reading time and translation grouping.
2. **Content integration:** load all Markdown, validate schemas and cross-file invariants; tests of partial translations, duplicate slug and drafts.
3. **Build artifact audits:** inspect generated HTML, sitemap, RSS, Pagefind assets and excluded routes in `dist`.
4. **Browser E2E:** navigation, search dialog, sticky TOC, theme, mobile menu, language switch and keyboard interactions.
5. **Manual:** long-form reading, responsive typography, special scripts, editorial correctness and source audits.

## Required fixtures

Create nonproduction test fixtures or content tests for: an English-only article, one article in en/ja/fr with differing slug, an article with all 9 translations, a draft-only article, a review translation, a 20-section article, duplicate H2 text, Unicode headings, a long title, missing cover, no search results, empty category and duplicated slug attempts. Fixtures must not accidentally appear as published production stories.

## Core content tests

- Schema rejects unknown locales, categories, empty title and invalid dates.
- File path locale equals metadata locale.
- `(translationKey, lang)` and `(lang, slug)` duplicates fail.
- Group identity/category is consistent across versions.
- Draft and review files do not render public routes.
- Published translation missing English original fails as designed.
- Updated date rules enforced, published slugs stable.

## SEO automated tests

Parse built HTML: assert exactly one canonical per indexable article; matching `html lang`; localized meta; all `hreflang` fully qualified and reciprocal; no references to nonexistent outputs; no self canonicals pointing to English for translated pages. Validate sitemap excludes drafts/noindex/404; check pagination and redirect targets. Validate actual generated output, not only helper return values.

## Search tests

Index must exist after build. Test keyword from title, body, tags/category and H3 text; verify current-locale language filter, section anchor result and no draft leakage. Search keyboard: Ctrl/Cmd+K, Escape, focus restore and no query behavior. Simulate index load failure and show readable error.

## TOC tests

Anchor click reaches heading below fixed header; `#fragment` URL and browser back work; active item follows scroll; empty/short article handles gracefully; mobile disclosure opens/closes; long rail scroll works; reduced-motion respected; no JS still leaves functional anchor links.

## Accessibility tests

Run automated checks plus keyboard-only pass on home, article, category, search and mobile nav. Verify one H1, semantics, link/button roles, focus, aria names, accessible status updates, touch targets and text scaling. Screen reader smoke test on at least one CJK page and one English long article.

## Responsive and theme tests

At 320, 390, 768, 1024, 1440 CSS px, both themes: header doesn't overflow; article line length remains comfortable; table/code overflow local only; TOC not blocking body; search on-screen keyboard usable; category long labels not clipped. Test font fallback on Japanese, Korean, Chinese, Russian, Turkish.

## Production QA gate

- `npm run validate:content`
- `npm run check` (if installed)
- `npm run test` / E2E suite as configured
- `npm run build` including Pagefind
- Generated output SEO/link inspection
- Lighthouse on representative routes
- Deploy preview and spot-check

Every release should record **which tests actually ran** and outcomes. An unexecuted checklist cannot be marked passed. For package-version changes, validate against official current docs.

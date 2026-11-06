# Design System — LadeStack Minimal Editorial

**Direction:** contemporary, original, calm, trustworthy editorial design. It should visibly belong to the LadeStack ecosystem without copying the parent website's exact component theme. Text and reading are the product; graphics are supporting elements.

## 1. Design principles

1. **Editorial first:** a strong typography hierarchy, not oversized decorative marketing graphics.
2. **Quiet confidence:** restrained colors, precise alignments, generous whitespace and subtle borders.
3. **Reading comfort:** consistent line length, contrast, leading and image captions.
4. **Rapid discovery:** category navigation and search are prominent but do not overpower stories.
5. **Universal:** responsive, internationalized, keyboard accessible and attractive in both themes.
6. **Originality:** avoid cookie-cutter documentation templates and generic AI SaaS landing page styling.

## 2. Proposed color tokens (design direction; validate with actual brand assets)

| Token | Light | Dark | Function |
|---|---|---|---|
| `--bg` | `#FAFAF8` | `#141615` | Page background |
| `--surface` | `#FFFFFF` | `#1C201E` | Cards, menus |
| `--surface-muted` | `#F1F2EF` | `#242825` | Secondary areas |
| `--text` | `#1B201D` | `#F1F3EF` | Primary text |
| `--text-muted` | `#5D6860` | `#A6B0A9` | Metadata and captions |
| `--border` | `#DCE1DC` | `#39413B` | Dividers |
| `--accent` | `#315F4E` | `#99CBAF` | Interactive and category accent |
| `--focus` | `#255FBA` | `#A4C4FF` | Focus indication |
| `--danger` | `#B3261E` | `#FFB4AB` | Errors |

Use tokens for all components; ensure contrast with actual font sizes and states. Accent color is a proposed UI accent, not a factual claim about the existing brand palette.

## 3. Typography

- **Display headings:** tasteful editorial serif such as Instrument Serif (licensed/loaded appropriately), with sensible sans fallback. Do not use serif for all UI chrome.
- **Body and interface:** Inter, Geist or similar clean sans-serif (choose **one** final family, verify license and font performance).
- **Code:** optional JetBrains Mono subset with system monospace fallback.
- Article body 17–19px desktop, 16–18px mobile; line-height about 1.65–1.8; measure and tune.
- Primary article reading width ~720–780px; TOC rail ~240–270px; gutter ~36–48px on wide desktop.
- Avoid excessive bold weights; H1/H2/H3 have distinct scale and visual rhythm. Use fluid CSS `clamp()` thoughtfully.
- Localized typography: do not assume Latin word lengths. Define font fallback stacks for CJK, Cyrillic and Turkish characters; test line wraps and punctuation.

## 4. Grids and spacing

- Global max container approximately 1200–1280px; article content column narrower.
- Mobile outer padding approximately 16–20px, tablet 24–32px, desktop 32–48px; adjust to viewport.
- Use 4/8px-based spacing values as a system, not dozens of arbitrary margins.
- Main header ~64–76px high; sticky behavior is optional but must not cover article anchors.
- Border radii small-to-medium: 6px compact elements, 10px cards, 12–14px dialogs. Avoid oversized bubble styling.
- Shadows subtle and primarily for open dropdowns/dialogs; rely on spacing and borders for static panels.

## 5. Header

Desktop: logo and wordmark left; Articles/Categories navigation, universal search trigger, locale selector, theme switch on the right. Mobile: recognizable logo, search icon, compact menu. Dropdown list must support all 19 categories, long labels and keyboard navigation. The header should never compete with article H1.

## 6. Homepage visual composition

1. Compact editorial masthead: short promise and clear navigation.
2. Hero/lead article: visually strong but not a giant slideshow; one main cover, concise title/deck, category and date.
3. Latest stories: consistent cards with cover, category, title, excerpt and reading time.
4. Category discovery: compact category chips/list, not 19 giant colored tiles.
5. Featured/editor's picks: curated content (manual/metadata) rather than fabricated popularity.
6. Footer: related LadeStack product link, editorial/about/legal, RSS, contact.

Prefer an engaging mix of one lead story and scalable grid; all lists use accessible semantic links and predictable pagination.

## 7. Article layout

Desktop: centered text column and right-side sticky **On this page** TOC, optional low-distraction metadata rail. Breadcrumbs, H1, subheading/deck, author/date/reading time, cover image/caption, body, sources where applicable, related articles, footer. Avoid disruptive full-viewport overlays. Article headings have scroll margins aligned with header. Mobile: TOC becomes a disclosure/drawer at top of article; body spans comfortable width.

The TOC background should be slightly quieter than article body, with a visible active indicator, no distracting animation, and independent scroll for very long outlines. Make headings intuitive with nested H3 indentation. Show a meaningful state when there are no H2/H3 headings.

## 8. Category, listing and search

- Category landing: meaningful category name/description plus bounded results and pagination. Empty state is deliberately designed.
- Article cards: clickable title/cover only as accessible anchors; hover/focus styles consistent; image missing state is text-based rather than broken icon.
- Search: header trigger styled as a compact command/search affordance; overlay/dialog or results page with clean result rows, excerpt, category, relevant tags and section sub-results. Support keyboard and mobile.
- Pagination should have next/previous and accessible labeled page numbers; do not rely on infinite scrolling as the sole discovery method.

## 9. Light/dark/system themes

Use CSS variables from the root theme selector and a tiny early-executed preference script to avoid flash where permitted by CSP. Default follows `prefers-color-scheme`; explicit user selection wins and may persist in `localStorage`. Theme control has accessible text/tooltip. Ensure syntax highlighting, inline links, tables, figures, diagrams, input fields and TOC active states are legible in both themes.

## 10. Components inventory

`SiteHeader`, `SiteFooter`, `BrandMark`, `CategoryDropdown`, `CategoryChip`, `SearchTrigger`, `SearchDialog`, `LocaleSwitcher`, `ThemeSwitcher`, `ArticleCard`, `FeaturedArticle`, `ArticleMeta`, `ArticleCover`, `Breadcrumbs`, `ArticleTOC`, `ReadingProgress`, `ShareLink`, `TagList`, `RelatedArticles`, `Pagination`, `EmptyState`, `Callout`, `CodeBlock`, `SourceList`, `ErrorState`, `BackToTop` (only if useful).

Each component requires documented semantics, props, responsive behavior, theme states, keyboard states and one source of data truth. No button or decorative icon may falsely imply an unimplemented action.

## 11. Motion

Use brief color/opacity/translate transitions in interaction affordances only. Respect `prefers-reduced-motion`. No marquee text, autoplay video, scroll hijacking, background canvas or layout-shifting card animations.

## 12. Editorial imagery

Use 16:9 or consistent proportion cards, relevant editorial imagery with usage rights, descriptive alt text, visible captions/credits when needed. Do not use random stock visuals merely to fill space. Missing covers may use a simple typography-led card rather than autogenerated illustration. Keep image aspect ratios fixed to prevent CLS.

## 13. Responsive breakpoints (guidance, adjust during actual design)

- 320–599px: one-column article/card lists, mobile menu, disclosure TOC.
- 600–899px: fluid cards, optional 2-column listing; do not squeeze TOC beside article.
- 900–1199px: article centered; optional compact rail if actual space allows.
- 1200px+: article column plus full sticky TOC; 3-column cards where content allows.

## 14. QA snapshots and rejection criteria

Review 320px phone, 390px phone, 768px tablet, 1024px laptop and 1440px desktop; both themes and at least English, Japanese, Russian and French for sample QA. Reject layouts with horizontal overflow, truncated nav strings, low-contrast metadata, visually lost keyboard focus, unreadable code overflow or TOC obscuring content. Keep only the nine supported locales from the shared registry.

## 15. Deliverables before full implementation

Approve visual design for homepage, article detail, category/listing, search overlay and mobile navigation. Translate that design into reusable tokens/components; do not separately redesign each page in code. Accessibility and speed take precedence over visual embellishment.

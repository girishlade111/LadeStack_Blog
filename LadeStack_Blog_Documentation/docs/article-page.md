# Article Reader, Sticky TOC and Reading Navigation

## Core reading layout

Desktop article consists of: breadcrumb, category, title, deck, byline/date/reading time, optional cover and credit, full Markdown article body, cited sources, tags, related posts and share/copy-link actions. Right rail is a sticky *On this page* TOC, not a feed of unrelated ads. Reading column approximately 720–780px; rail approximately 240–270px where viewport permits.

## TOC data contract

1. Render the Markdown file with Astro's content rendering function.
2. Read the **renderer-provided heading list** (check installed Astro's exact API).
3. Select H2/H3 by default and retain their generated IDs.
4. Render one semantic navigation list `<nav aria-label="On this page">`.
5. H3 items are visually nested under most recent H2; keep accessible hierarchical structure.
6. If fewer than two eligible headings, simplify or hide the desktop TOC rather than show mostly empty sidebar.
7. Never create client-side duplicate heading slugs that could differ from Markdown output.

## Interaction behavior

- Clicking topic link navigates to `#heading-id`; the target appears below sticky header using `scroll-margin-top`.
- Browser address bar shows anchor; Copy section link and browser Back/Forward work.
- An IntersectionObserver or lean scroll position strategy marks the current heading active as the user scrolls. At the bottom, last section can remain active; do not rapidly oscillate between items.
- Keep active topic visible inside long sticky sidebar while allowing rail's own vertical scroll. Avoid stealing wheel/keyboard focus from article.
- Smooth scroll only if user does not prefer reduced motion. Default native anchors always work without JS.
- Track reading progress in a subtle line/bar if implemented; progress math should be based on article, not arbitrary page height including footer.

## Mobile behavior

At compact widths, show an `On this page` disclosure near the top of the article (not permanently consuming half of screen). When opened, provide a list of topics and close/collapse after selecting a section, with focus managed appropriately. Avoid sticky overlay obstructing reading and do not require a horizontal swipe to reach headings.

## Content treatments

### Code blocks

Readable highlighting in light/dark themes, language label, safe copy-code button, horizontal scroll **inside code block**. If copying fails, do not claim success. Avoid huge JS highlighter on each visit when Astro can pre-highlight at build time.

### Images

Responsive sizing, aspect ratio reservation, descriptive alt text and caption/credit. No lazy-loading the primary LCP image by default; below-fold images may lazy load. Broken covers must not create layout collapse.

### Tables

Semantic `<table>` markup with headings/scope where possible; scrollable overflow container on small screens, not global horizontal page overflow. Very wide tables should remain usable with assistive technology.

### Links and quotes

External links are visually distinct and accessible. Use blockquotes for cited short quotations, not for decorative large text. Validate author source rights and avoid long copyrighted excerpts.

## Related posts

Choose a bounded number, such as 3–4, from the current locale based on category and overlapping tags. Exclude current article, drafts and unreviewed translations. Use a deterministic fallback of recent posts, not random ordering or fabricated popularity.

## Test matrix

- 0 eligible H2 headings; 1 H2; 20 H2/H3; duplicate heading text; Unicode headings.
- Direct URL with hash loads correct target.
- Back button returns prior anchor/position appropriately.
- Keyboard-only navigation reaches all TOC links and visible focus.
- 320px mobile article, 768px tablet and wide desktop rail.
- Light/dark code blocks, image captions, wide tables and responsive cover.
- Language switch from article with a missing target translation behaves explicitly.
- Reading progress and active TOC do not run expensive handlers every animation frame.

## Progressive enhancement rule

Even when scripts are disabled, article is readable, TOC anchors navigate, metadata appears and primary cross-page navigation works. Scripts add active highlighting, dialog behavior and preferences but never gate the article text itself.

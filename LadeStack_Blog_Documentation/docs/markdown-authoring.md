# Markdown Authoring Guide

## Why native Markdown

Content authors work directly in `.md` files; Astro renders this as HTML at build time. The visitor downloads only the page they request, not the source repository. Git history handles edits and review; no CMS/server is required.

## Create a new story

1. Pick primary category from `categories-taxonomy.md`, with stable ID and curated tags.
2. Assign a permanent `articleId` and `translationKey` not used by another story.
3. Copy `templates/article-template.md` into `src/content/blog/en/YYYY/MM/your-slug.md`.
4. Write truthful frontmatter; keep `status: draft` until reviewed.
5. Write original prose with a clear H1 represented by page title, and Markdown H2/H3 sections to feed the TOC.
6. Cite credible sources using descriptive hyperlinks; include publish/update dates as appropriate.
7. Add images with validated paths, meaningful alt text, proper licenses and dimensions.
8. Run content validator/build and preview at desktop/mobile.
9. Mark `status: published`, commit to `main` through appropriate review, verify Vercel production build.

## Recommended body hierarchy

The page template owns one visual/semantic **H1** from `title`; article Markdown starts with a short intro followed by **H2** headings and optionally nested **H3** subsections. H4 can exist for deep nesting but does not need TOC inclusion initially. Don't start Markdown body with a duplicate H1. Good outline:

```md
A clear opening paragraph with the main idea.

## Background
Context and definition.

## How It Works
Technical or factual explanation.

### Important Limitation
A focused subtopic.

## Practical Examples
Examples and comparisons.

## Conclusion
What readers should remember.
```

## Formatting rules

- Use plain Markdown paragraphs, headings, lists, tables, quotes, fenced code, inline code and links.
- Fenced code should provide a language ID (`ts`, `js`, `bash`, `json`, `html`), so syntax highlighting is meaningful.
- Tables must be readable on small screens; consider stacked display/wide-table overflow wrappers and explanatory labels.
- Prefer descriptive link text, not “click here”.
- Use image alt text that describes useful visual information, not “image of”. Decorative graphics use empty alt only if implemented intentionally.
- Avoid direct raw HTML, script tags or untrusted embeds unless explicitly allowed and reviewed.
- Keep paragraphs short enough for mobile scanning; paragraphs need substance, not keyword stuffing.
- Use a clear introduction, section sequencing, source links, corrected dates and a meaningful ending.

## Trending-article quality

Every current-events article should answer: What happened? When (absolute date/time/timezone)? Who/what is involved? What is confirmed versus claimed? Why does it matter? What credible primary sources support it? What could change next? News should not be presented as timeless fact. Update `updatedAt` only when materially revised, not for a meaningless formatting edit.

For health, medicine, law, politics and finance, avoid unsupported prescriptions and personalized advice; separate evidence from opinion. Don't copy entire third-party news pieces. Paraphrase fairly, attribute and link sources.

## Translation files

Copy `templates/translation-template.md`, keep same `articleId`/`translationKey`/category, set target `lang`, localized title, description, slug, body and alt text. Translate references contextually and preserve URLs where correct. A translation remains draft/review until proofread. You do not need all 9 files before publishing the original.

## Images and tables

For local image assets, prefer Astro-supported processed asset handling or preoptimized static files. Do not assume standard `public/` URLs are automatically optimized. Large inline images should load lazily when below fold and reserve aspect ratio; hero image may require higher fetch priority. Wide code blocks scroll horizontally without scrolling the entire page.

## Content revision and link stability

Do not change published slugs to match new headlines. Edit title/description while preserving URL, or add deliberate redirects for necessary URL migrations. When editing the original, check dependent translations and cite factual changes in the editorial log. Avoid updating `publishedAt` for minor revisions.

## Validations before status=published

- Accurate metadata and nonempty body.
- Correct author, dates, sources, category and tags.
- No unsupported claim, fabricated data or copied article.
- Headings form a reasonable TOC.
- All internal links resolve to published pages.
- No broken images, cover/license issues or unfriendly layout.
- Locale is correct and language of body matches the path.
- Search snippet and social preview are understandable.
- Production build, content validator and translation-group check pass.

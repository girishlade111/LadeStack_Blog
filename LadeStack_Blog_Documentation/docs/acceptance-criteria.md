# Launch Acceptance Criteria — Measurable Pass/Fail

This is the gating checklist for first production launch. All **P0** items must pass or have a documented owner-approved exception with risk and remediation plan.

## Foundation (P0)

- [ ] One repo contains Astro source plus Markdown content; **no** second content repo or runtime CMS required.
- [ ] Project uses Astro static build, with meaningful article/listing HTML present before JS.
- [ ] Vercel project connects to GitHub production branch and deploys automatically on push.
- [ ] Intended domain HTTPS resolves correctly, with consistent canonical hostname and slash policy.
- [ ] Build failure does not publish broken content over known-good production.

## Taxonomy and content (P0)

- [ ] All **19** specified categories appear in desktop/mobile navigation.
- [ ] Every article has one validated primary category; category filters don't leak other categories.
- [ ] Valid published `.md` article renders without a CMS; drafts/review do not render public routes.
- [ ] Duplicate slug/translation group and invalid locale fail the content check.
- [ ] At least one English sample and two reviewed non-English versions demonstrate publishing; sample must be editorially appropriate before production.
- [ ] Listing/category pages are paginated and safe at large article counts.

## Languages and technical SEO (P0)

- [ ] Nine locale UI architecture works: en, ja, ko, zh, ru, tr, fr, pt, es.
- [ ] English root, no `/en/` duplicate; non-English page prefixes correct.
- [ ] Localized pages set correct `html lang`, translated UI and date rendering.
- [ ] Each indexable localized post has correct self canonical and unique metadata.
- [ ] Reciprocal `hreflang` includes only real, published and indexable variants.
- [ ] Partial translations don't produce misleading translated stub pages or alternatives.
- [ ] sitemap, robots, OG and structured data validate; drafts not indexed.

## Reading, search and accessibility (P0)

- [ ] Sticky desktop TOC auto-generates from Markdown H2/H3 IDs.
- [ ] TOC click scrolls to correct section, active state updates, hash URL works.
- [ ] Mobile TOC is accessible, not permanently covering content.
- [ ] Universal search finds title/body/topic/section of current-locale posts; index built after Astro.
- [ ] Header search action and keyboard open/close/focus behavior work.
- [ ] Search does not show draft/review posts, and returns meaningful empty state.
- [ ] Light, dark and system themes are visually and functionally accessible.
- [ ] Site works on 320px phone without global horizontal overflow.
- [ ] Core content/navigation usable without JS (search exception is acceptable).

## Quality and operations (P0)

- [ ] Representative article/page templates have no significant keyboard/focus issues.
- [ ] Search/Pagefind assets load on demand, not as a sitewide initial payload.
- [ ] Cover/images reserve size and optimized delivery strategy is in place.
- [ ] Production `dist` output, Pagefind index, sitemaps and RSS tested.
- [ ] README and actual package scripts match; commit lockfile.
- [ ] Rollback and content correction workflow documented.
- [ ] No secrets, fake sources, unreviewed translations or unsupported claims published.

## P1 post-launch improvements

- [ ] Curated tags archive UX and optional filters are polished.
- [ ] Related posts/copy-link/reading progress tuned with no bloat.
- [ ] Post publishing analytics and freshness reports improved.
- [ ] Further build optimizations are benchmark-driven.

## Sign-off record template

| Item | Evidence link/log | Status | Owner | Date |
|---|---|---|---|---|
| Content validation | — | Not tested | — | — |
| Static build + Pagefind | — | Not tested | — | — |
| SEO alternates | — | Not tested | — | — |
| TOC/search browser QA | — | Not tested | — | — |
| Vercel production push | — | Not tested | — | — |

Do not convert “Not tested” to “Pass” without evidence.

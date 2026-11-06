# Editorial Workflow — 2–3 Original Posts Daily, Reviewed Localizations

## Publication rhythm

Target **2–3 original posts per day**, selected according to genuinely interesting and verifiable trending topics. An original post may belong to any of the 19 categories. Do not force quota per category. With 3 posts × 9 languages the potential ceiling is 27 Markdown versions/day, but publication is intentionally progressive: accuracy and review matter more than simultaneous translation.

## Stages and gates

### 1. Topic selection

Choose a topic based on editorial relevance, freshness and public value. Check if a near-duplicate article already exists. Select dominant category and curated tags. For trends, record observed date, source URLs and any uncertainty.

### 2. Research

Gather primary/credible evidence; verify names, dates, figures and claims against actual sources. Record publication dates of evidence. Avoid inferring certainty from rumors, unattributed social posts or copied summaries.

### 3. Original article draft

Create a `.md` with `status: draft` and stable identity. Write original prose, not a stitched set of quotations. Avoid a misleading headline; provide context and limitations. Add explicit source links, caption credits and image rights where relevant.

### 4. Editorial review

Review factual accuracy, plagiarism risk, tone, typo corrections, title/summary, classification, links, date and correct use of sensitive topic disclaimers. Confirm the post satisfies the article template and technically renders.

### 5. Translation preparation

For each target locale, create a separate full Markdown file with same `articleId` and `translationKey`. Translate title, description, headings, body, media alt and callouts. Preserve meaning; adapt expressions appropriately; use local style and technical terminology consistently.

### 6. Translation review

Reviewer verifies semantic equivalence, numbers, source context, links, currentness and grammar. Review must happen **before** status=published. Incomplete versions stay `draft`/`review` and must not appear in alternate tags, search, feeds or sitemaps.

### 7. Publish and verify

Merge/push to production branch; Git integration builds on Vercel. Check new article URL, metadata, language switcher, search index and XML sitemap after successful deployment. Do not assume a successful Git push equals a successful site publish.

### 8. Updates and corrections

When facts change, update the original with correction details and accurate `updatedAt`. Assess which translations became stale. Temporarily unpublish outdated translations if they materially mislead and cannot be corrected promptly. For legal risks or significant factual errors, implement correction/unpublish flow with URL behavior reviewed.

## Editorial standards per sensitive category

- **Health:** prioritize established medical/public-health sources; clearly distinguish emerging studies from clinical consensus; no personalized treatment claims.
- **Law and Government:** cite exact jurisdiction, date and primary legal/government material; laws change and vary by place.
- **Politics:** factual, neutral, attributed; distinguish claims, projections and confirmed results; publish exact dates.
- **Business and Finance:** separate general information from personal financial recommendations, date time-sensitive figures.
- **Science:** cite studies/institutions; note preliminary results, sample size or methodological uncertainty where relevant.
- **Shopping/Beauty/Food:** avoid affiliate or paid promotion without clear disclosure; verify product claims.

## Content lifecycle statuses

`draft` → `review` → `published`. Revisions to a published article can be edited in a branch/PR then deployed. An editorial takedown requires explicit documented behavior: appropriate response (404/410/redirect as warranted), removal from metadata/search/sitemap and cleanup of translations. No accidental deleted slug reuse.

## Minimal daily checklist

- Source freshness verified.
- Article uniquely identified and categorized.
- All links/source dates checked.
- H2/H3 navigation and readability checked.
- English source published only when ready.
- Translation status accurately set; hreflang updates automatically.
- New content appears only after successful Vercel deployment.
- Search and RSS/sitemap spot check completed.

## Editorial workflow should remain light

No proprietary CMS, admin dashboard, database or review SaaS is required. Local editor + Markdown + Git PRs can support the volume. If the team grows, introduce review roles/processes through repository permissions before changing architecture.

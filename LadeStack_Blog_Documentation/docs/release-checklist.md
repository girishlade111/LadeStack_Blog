# Production Release Checklist

Use this checklist for first launch and material changes. The connected Vercel project builds production from `main` automatically; manual deploys are for exceptional repair only.

## Before the merge/push

- [ ] Requirement and scope are clear; no unapproved architecture deviation.
- [ ] `git status` inspected; no unintended files, secrets or generated build output staged.
- [ ] Package lockfile consistent with selected package manager.
- [ ] Markdown article statuses, IDs, locales, slugs, categories and dates validated.
- [ ] Original and translated versions fact-checked; source links and image rights verified.
- [ ] Any slug redirects and content takedown behavior documented.
- [ ] Unit/integration tests pass; content validator fails on known invalid fixtures.
- [ ] Build includes Astro and Pagefind with expected `dist/` output.
- [ ] Article TOC/search/theme/locale/menus manually or automatically smoke-tested.
- [ ] Canonical and reciprocal hreflang outputs inspected for representative language groups.
- [ ] RSS/sitemap/robots output updated and free of draft URLs.
- [ ] Keyboard/mobile/light-dark QA completed for affected components.

## Preview deployment review

- [ ] Build status is successful, no hidden errors.
- [ ] Preview uses correct CSS/images/fonts and search assets.
- [ ] No unexpected layout regression or global horizontal scroll.
- [ ] SEO metadata points to intended production origin; previews not exposed as canonical duplicate domains.
- [ ] Preview-specific access/indexing controls appropriate.

## Production release

- [ ] Push or merge to connected production branch.
- [ ] Vercel production build completes successfully; no assumption of instant publication.
- [ ] Production domain resolves with valid HTTPS.
- [ ] New/changed article route returns 200 and correct localized content.
- [ ] Search returns the new article and correct section subresult after successful build.
- [ ] Sitemap/alternates/feeds updated; no old or draft URLs unexpectedly included.
- [ ] Core navigation and theme work on production.
- [ ] Monitor deployment errors and regressions.

## Release report format

```text
Change:
Commit / deployment:
Verification commands:
Routes tested:
Localization / SEO checked:
Search / TOC checked:
Performance observations:
Known issues:
Rollback strategy:
```

Never sign off unrun checks. Any production rollback should be accompanied by a repo-level correction, not just a dashboard toggle that the next push overwrites.

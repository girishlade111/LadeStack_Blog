# Expected Local and CI Commands

This document is an **implementation contract**. Until an Astro project is created, the commands are expected names, not proof that scripts already exist.

## Recommended npm scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "check": "astro check",
    "validate:content": "node scripts/validate-content.mjs",
    "build:site": "astro build",
    "build:search": "pagefind --site dist",
    "build": "npm run validate:content && npm run build:site && npm run build:search",
    "preview": "astro preview",
    "test": "node --test tests/unit/*.test.mjs",
    "verify:seo": "node scripts/verify-seo.mjs",
    "verify:links": "node scripts/audit-links.mjs",
    "verify:output": "node scripts/audit-output.mjs"
  }
}
```

Use an appropriate test runner if actual project uses a more capable framework; the paths and commands above are suggested, not all mandatory. `astro check` requires its package setup, and CI command order may differ to avoid redundant scanning. Never add scripts referencing nonexistent files and claim the setup is complete.

## Everyday authoring

```bash
npm install
npm run dev
# Edit or add src/content/blog/en/2026/11/my-new-story.md
npm run validate:content
npm run build
npm run preview
```

A `status: draft` post should remain absent in production output; check both direct output routes and search index. For localization, add a reviewed version under its corresponding locale folder with matching translationKey.

## Before merging to main

```bash
npm run validate:content
npm run check
npm run test
npm run build
npm run verify:seo
npm run verify:links
npm run verify:output
```

Adapt to installed test/build scripts; do not execute unsafe commands based solely on this outline if source files are not present. Run checks in CI so invalid content cannot be promoted.

## Deployment

No special release command is needed after the one-time Vercel Git integration. Push to connected branch; inspect build result. If a project is missing DNS/prod branch setup, complete configuration before expecting publication.

## Operational diagnostics

- `git status`: inspect working tree before modifying/pushing.
- `npm run build`: capture total duration/output size in build log.
- Check generated HTML under `dist/` for published URL, canonical and lang.
- Check generated `dist/pagefind/` for search assets.
- Use Vercel deployment logs to distinguish source failures from DNS or asset issues.

## Dependency discipline

Keep Astro, Pagefind and sitemap packages on reviewed compatible versions; check installed version before using specific APIs. Avoid automatic major upgrades during a production SEO/content release.

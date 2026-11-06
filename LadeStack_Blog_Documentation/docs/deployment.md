# Deployment and Automated Publishing — Single GitHub Repo → Vercel

## Final deployment architecture

One GitHub repo contains both application code and all Markdown. Connect **that same repo** to one Vercel project and map `blog.ladestack.in` as its production domain. No second repository, deploy hook, content fetch script, CMS webhook or special content sync job is needed.

```text
Write/edit .md under src/content/blog/
  → git commit
  → push/merge to GitHub main
  → Vercel Git integration triggers production build
  → content/schema tests
  → Astro static HTML build
  → Pagefind indexes generated HTML
  → successful deployment promoted to blog.ladestack.in
```

A Git push **initiates** deployment; content becomes live **after successful build and promotion**, not instantaneously at push time. A failing new build should not replace the prior successful production version.

## Initial setup

1. Create a single GitHub repository (suggested `ladestack-blog`).
2. Initialize Astro project with TypeScript and these context docs.
3. Choose npm or another package manager and commit lockfile.
4. Ensure `npm run build` includes validation → Astro → Pagefind in that order.
5. Push initial code to GitHub.
6. Import repo into Vercel, detect Astro framework, use output directory `dist` and a compatible Node version.
7. Select `main` as production branch; preview builds for PRs/other branches.
8. Add verified DNS record for `blog.ladestack.in` following actual Vercel domain instructions; verify HTTPS certificate.
9. Set `site` to `https://blog.ladestack.in` for absolute SEO URLs and test canonical host.
10. Run a realistic test post push and verify article, search, sitemap and locale alternates on live site.

Official Astro guidance says static Astro sites can deploy to Vercel without an on-demand adapter and connected Git pushes build automatically: https://docs.astro.build/en/guides/deploy/vercel/

## Build pipeline contract

Recommended order:

```text
validate:content
  ↓
astro check / unit tests (as CI policy dictates)
  ↓
astro build (static)
  ↓
pagefind --site dist
  ↓
verify generated index and SEO artifacts
  ↓
Vercel uploads dist
```

The Vercel Build Command must not stop at `astro build` if search index generation is not otherwise automated. If `astro check` is long on thousands of posts, place checks strategically in CI and always run critical content validation/build at deployment.

## Production settings

- Framework preset: Astro.
- Output: `dist`.
- Build: package script that includes Pagefind.
- Environment: none required for static core features; do not invent tokens/secrets.
- Domain: `blog.ladestack.in` canonical.
- Redirects: force HTTPS/canonical host and preserve intentionally migrated article slugs.
- Public cache: use Vercel CDN defaults/appropriate immutable asset caching; don't set stale-cache rules without verifying behavior.

## Changes and scenarios

**New English post:** add one published Markdown → push main → route appears after build.  
**New French translation:** add `fr` Markdown for same `translationKey` → push → English and French pages rebuild; language switch/hreflang and sitemap update automatically.  
**Draft:** commit Markdown `status: draft` → no public article route/SEO/search.  
**Corrected post:** update body/`updatedAt` → same slug, republished HTML.  
**Broken frontmatter:** build fails early with message; previous deployment stays in production.  
**Slug rename:** add redirect migration and test old URL; don't rename casually.

## Monitoring

Record build duration, generated page count, Pagefind index generation time, output size and production deploy status. Configure deployment failure notifications if available. Keep a simple manual recovery route: revert bad commit on `main` and let Git deployment rebuild, or restore prior known-good Vercel deployment if necessary.

## Preview and SEO safety

Preview URLs may be accessible, but should not become canonical indexable content. Ensure canonical metadata references production origin only when preview content is equivalent and search engine indexing rules for preview environments are explicitly handled. Consider deployment protection/noindex settings for previews. Test preview builds before main merges, especially for SEO-critical changes.

## No runtime promises

Site reading/search does not need a server. Client-only Pagefind search works from CDN assets. Integration of future analytics or third-party service is separate and may introduce external costs and privacy obligations.

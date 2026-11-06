# Operations, Maintenance and Content Lifecycle

## Daily workflow

- Review new articles for factual quality and link health.
- Merge/push approved Markdown changes to production branch.
- Check Vercel deployment result and article live URL.
- Spot-check search/sitemap/alternate updates for newly translated stories.
- Record any content issue or correction needed.

## Weekly workflow

- Check broken internal/external links and failed deploys.
- Validate category pages still work, translated UI strings complete and search index healthy.
- Review source freshness for time-sensitive posts, particularly health, law, politics, finance and science.
- Inspect dashboard metrics for search traffic and any unexpected indexing errors.

## Monthly workflow

- Build time and output size trend review; Pagefind index growth and bundle audit.
- Audit random translated articles for out-of-date figures and broken references.
- Review titles/meta/snippets for editorial quality and whether missing categories need actual content.
- Verify security updates for dependencies, image rights and policy pages.

## Content edit process

Correct text in `.md`, adjust `updatedAt` for substantive changes, run validation and push. Never manually patch generated HTML on Vercel. If the original changes materially, review corresponding translations; decide whether to revise or temporarily unpublish stale variants.

## Rollback and recovery

For bad content introduced in one commit, revert commit or edit article and publish a correction. If bad build is live, use prior known-good deployment restoration if available and align Git `main` to the corrected source; otherwise next push may reintroduce problem. After rollback, inspect Pagefind/sitemap and translation alternates to confirm removal.

## Unpublish / takedown policy

Set status to draft/review or remove content through reviewed commit. Decide whether old URL should become 404, 410 or redirect based on editorial reason and SEO consequences. Ensure article disappears from public menus, search index, sitemap, feeds and reciprocal alternate groups on new build. Communicate corrections transparently as appropriate.

## URL governance

Public slugs and category IDs are long-lived. Avoid deleting/renaming posts casually. Keep an explicit redirects list when migrations are necessary, with smoke tests of old and new URLs.

## Growth monitoring

The publishing cadence can create ~9,855 localized files/year at maximum nine versions for three daily originals. Track content library growth and build duration; continue with single repo until actual evidence demonstrates a need to change. If builds slow, profile hot spots before considering experimental caching or runtime rendering.

## Ownership and access

Protect GitHub/Vercel permissions, keep secrets out of Markdown and repo, and maintain at least one known production recovery owner. The site does not need application user accounts.

## Incident categories

- **Editorial misinformation:** urgent correction, affected translations review, link/SEO cleanup.
- **Broken deploy:** inspect logs, reproduce locally, fix/revert, verify previous production unaffected.
- **SEO regression:** compare generated metadata, translation registry and sitemap; redeploy corrected output.
- **Search unavailable:** Pagefind build/path/index check, restore only after validated rebuild.
- **Performance regression:** compare network, recent dependency/image changes and field/lab metrics.

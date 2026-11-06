# Security, Privacy and Content Trust

## Threat model

The core site is static and requires neither accounts nor application database, reducing attack surface. Main risks are compromised content/CI dependencies, malicious Markdown HTML/scripts, unauthorized Git changes, unsafe external embeds, injected third-party scripts, privacy leaks and configuration errors.

## Repository and publishing safeguards

- Use branch protection/review if practical; restrict production merges.
- Never commit Vercel tokens, API keys, deploy hooks, analytics credentials or private data.
- Use a package lockfile and review dependency additions; avoid supply-chain bloat.
- Validate frontmatter, links, assets and any custom HTML before production.
- Preserve a clear revert/rollback route via Git and Vercel deployment history.
- Preview builds should not be treated as automatically indexable public production sites; set appropriate access/indexing controls per actual Vercel configuration.

## Markdown trust and HTML

Git-authored Markdown is still input. Discourage raw HTML, iframe embeds, inline event handlers, script tags and unsafe protocols in links. If raw HTML is enabled, define a strict approved set and sanitize it or restrict merging to trusted reviewed content. Never inject arbitrary frontmatter fields into `set:html` without validation. Avoid client-side `innerHTML` on untrusted search snippets; Pagefind highlights need safe handling according to its API.

## Content integrity

- Avoid fabricated author names, citations, data, dates or localized pages.
- Prevent duplicate slugs and mismatched locale codes.
- A trending article requires source freshness and change log.
- Health, law, politics and finance articles require extra review and clear informational framing.
- Third-party images must have rights/credits; avoid hotlinking unstable untrusted assets.

## Data collection and consent

Core reading/search/theme can work without accounts or transmitting search terms to an application server. A minimal theme setting may use browser local storage. If GA4, Microsoft Clarity or other trackers are added later, update privacy disclosure, consent flow and CSP to match the real implementation. Never claim no tracking once analytics are enabled. Avoid collecting personally identifiable data unnecessarily.

## Content Security Policy and headers

Consider a restrictive CSP with appropriate Astro/Vercel asset behavior, `X-Content-Type-Options: nosniff`, sensible Referrer-Policy and permissions restrictions. Test scripts and third-party tooling before enforcing a strict policy. Do not copy a CSP policy blindly that breaks theme controls, Pagefind, images or essential fonts.

## External links and embed behavior

Use `rel="noopener noreferrer"` for new-window links as appropriate, clear visual cues, and avoid automatically opening new tabs where unnecessary. Prefer plain external links to third-party embeds; embeds load extra scripts and can track users.

## Sensitive editorial subject handling

- Political material: cite verifiable claims, avoid false certainty or unlabeled speculation.
- Health/medical: information is general; cannot substitute for qualified professional advice when such advice is needed.
- Financial: distinguish facts and general education from individual advice.
- Legal: specify jurisdiction/date; avoid universalizing local laws.
- Major updates: corrections/takedown procedure rather than quiet deletion.

## Incident response

For accidental secrets, revoke and rotate immediately; Git history rewrite alone is insufficient. For incorrect published article, correct/unpublish, purge necessary artifacts through deployment and verify links/SEO/search. For malicious dependency or repository compromise, lock production changes, revert to known safe deployment and investigate before redeploy.

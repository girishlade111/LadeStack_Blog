# Feature Task — [Short Title]

**Task ID:** [ID]  
**Status:** Proposed / In Progress / Blocked / Verified  
**Priority:** P0 / P1 / P2  
**Impacted documentation:** [linked files]

## Goal

Describe the user-visible outcome in one or two paragraphs. State why it matters and what it must **not** change.

## Inputs and constraints

- Existing source files, route templates and helpers to inspect.
- Supported locales and categories affected.
- Static-rendering, single-repository and privacy/performance limits.
- Content schemas, external API versions and accessibility requirements.

## Scope and implementation plan

1. Inspect existing implementation.
2. Define or reuse data contract.
3. Implement minimal vertical slice with typed helpers.
4. Integrate UI/SEO/i18n/search behaviors impacted.
5. Verify local and production build outputs.

## Acceptance criteria

- [ ] Core behavior works for actual content.
- [ ] Both English and applicable localized variants work.
- [ ] Mobile, keyboard and both themes work.
- [ ] Correct canonical/hreflang/sitemap/search consequences.
- [ ] No unnecessary runtime dependencies or bundle growth.
- [ ] Tests and build pass; evidence captured.

## Validation commands and outcomes

```text
Command:
Result:
Generated routes verified:
Browser scenarios verified:
```

## Risks and rollback

Document failure modes, content migration/redirect needs, unexpected dependencies, and how to revert safely.

## Completion report

**Files changed:** ...  
**Behavior delivered:** ...  
**Verified:** ...  
**Not tested / unresolved:** ...  
**Documentation updated:** ...

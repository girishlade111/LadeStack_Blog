# Implementation Backlog and Dependency Graph

This file translates the PRD into small independent deliverables. It is meant for precise implementation without overwhelming a single work session.

## Milestone A — Working static publishing loop

| ID | Task | Depends on | Exit test |
|---|---|---|---|
| A1 | Bootstrap Astro TS static project and scripts | None | `astro build` works |
| A2 | Create locale/taxonomy registries | A1 | 9 locale IDs/19 category IDs typed |
| A3 | Create Content Collection and schema | A1,A2 | valid article parses |
| A4 | Add cross-file translation/slug validator | A3 | invalid fixtures fail |
| A5 | Add article URL builder and static route | A2,A3 | English page generated in `dist` |
| A6 | Add one localized route example | A4,A5 | `/ja/posts/` and root English work |
| A7 | Connect one repo to preview Vercel | A1 | preview static build succeeds |

## Milestone B — Design and browsing

| ID | Task | Depends on | Exit test |
|---|---|---|---|
| B1 | Design tokens and light/dark/system | A1 | both theme contrast audits |
| B2 | Responsive shell header/footer/mobile nav | B1,A2 | 320px/desktop nav keyboard works |
| B3 | Homepage featured/recent articles | A5,B1 | real published posts, no dummy results |
| B4 | All-articles listing and pagination | A5,B1 | bounded output on 100+ fixtures |
| B5 | 19 category pages and empty states | A2,A5,B4 | all categories navigate |
| B6 | Localized sitewide dictionary UI | A2,B2 | nine locale shells meaningful |

## Milestone C — Reading, search, SEO

| ID | Task | Depends on | Exit test |
|---|---|---|---|
| C1 | Article Markdown typography/code/images | A5,B1 | readable long article and dark code |
| C2 | TOC from renderer headings and anchors | C1 | heading links work without JS |
| C3 | Scroll-aware active TOC/mobile disclosure | C2 | active section and mobile keyboard pass |
| C4 | Pagefind post-build generation | A5 | `dist/pagefind` and search result |
| C5 | Search UI and keyboard shortcut | B2,C4 | query and focus states verified |
| C6 | Translation registry and locale switching | A4,B6 | missing vs published variants correct |
| C7 | Canonical/hreflang/OG/JSON-LD helpers | A5,C6 | reciprocal output audit |
| C8 | Sitemap/RSS/robots generation | C7 | draft-free generated feeds |
| C9 | Search/SEO output audits | C4,C7,C8 | errors fail build |

## Milestone D — Production hardening

| ID | Task | Depends on | Exit test |
|---|---|---|---|
| D1 | Accessibility audits and keyboard QA | B2,C3,C5 | no high-impact critical defects |
| D2 | Media/font/performance profiling | B1,C1,C5 | documented metrics/budgets |
| D3 | 9-locale partial-translation regression | C6,C7,C9 | locale matrix passes |
| D4 | Vercel domain/DNS/HTTPS validation | A7 | production canonical host works |
| D5 | Git-push publication smoke test | C9,D4 | new test post published after build |
| D6 | Runbook/release evidence completed | D5 | release checklist signed |

## Work rules

Task order is flexible only when dependencies are respected. Avoid huge all-at-once rewrites. Each task should include required code, tests and doc changes. See `templates/feature-task-template.md`. All P0 tasks and cross-cutting validation are mandatory before calling the project production-ready.

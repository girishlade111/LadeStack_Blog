# Categories and Taxonomy — All 19 Required

## Permanent category registry

| ID (permanent) | English display label | Use cases / boundaries |
|---|---|---|
| `autos-vehicles` | Autos and Vehicles | Cars, EVs, auto tech, maintenance, mobility |
| `beauty-fashion` | Beauty and Fashion | Clothing, designers, personal style, cosmetics |
| `business-finance` | Business and Finance | Markets, startups, SaaS, banking, economics |
| `climate` | Climate | Climate science, environment, impacts, climate policy |
| `entertainment` | Entertainment | Film, music, TV, creators, popular culture |
| `food-drink` | Food and Drink | Food culture, cooking, beverages, hospitality |
| `games` | Games | Video games, game development, game industry |
| `health` | Health | Healthcare, wellness, public health, medical research |
| `hobbies-leisure` | Hobbies and Leisure | Crafts, hobbies, recreation and personal interests |
| `jobs-education` | Jobs and Education | Careers, learning, training, universities, workplace skills |
| `law-government` | Law and Government | Laws, regulators, public administration, civic institutions |
| `other` | Other | Topics clearly not fitting others; minimize usage |
| `pets-animals` | Pets and Animals | Pet care, wildlife, animal science and behavior |
| `politics` | Politics | Elections, political developments, parties, governance debates |
| `science` | Science | Scientific discoveries, physics, biology, space and method |
| `shopping` | Shopping | Consumer retail, e-commerce, buying guides, product shopping trends |
| `sports` | Sports | Sports news, competitions, athletes, analysis |
| `technology` | Technology | AI, software, developer tools, security, consumer tech |
| `travel-transportation` | Travel and Transportation | Travel experiences, destinations, public transit, logistics |

These are **exactly the 19 screenshot categories**. Never delete or silently rename them because a period has few articles. Category IDs are invariant; localized labels come from dictionaries.

## Taxonomy rules

1. Each article has **one** primary category to keep archive URLs deterministic.
2. Use 0–8 curated tags (not unlimited custom labels). Sample tags: `artificial-intelligence`, `web-development`, `software-engineering`, `space-research`, `electric-vehicles`.
3. Tags are topic identifiers, cross-cutting categories. Do not create a second category system accidentally.
4. Avoid broad duplicate tags such as `tech`, `technology-news`, `technology` unless they have different editorial meanings.
5. Choose primary category by the dominant story focus: AI-assisted medical diagnosis could be Technology or Health; prefer Health if medical implications dominate, Tech if algorithm engineering dominates.
6. Avoid using `other` as a convenience to skip editorial classification.
7. Category names translate; IDs and URL slugs remain fixed English kebab-case initially. Localized category slugs are possible later only with redirect/SEO migration.

## Category route behavior

- English `/category/technology/`; French `/fr/category/technology/`; other locales similarly prefixed.
- Category page title/description are localized and authored, not automatically translated placeholders.
- Show sorted, paginated articles published in the current locale.
- A category with zero localized articles still has a useful discovery state and adjacent categories; index policy should consider whether the page has unique editorial substance rather than indexing empty thin archives.
- Category navigation (desktop dropdown and mobile menu) must always list all 19 with readable long labels and search/focus support.

## Localization examples (illustrative, subject to editorial review)

- `technology`: English “Technology”; French “Technologie”; Japanese “テクノロジー”.
- `business-finance`: English “Business and Finance”; French “Économie et finance”.
- `science`: English “Science”; Spanish “Ciencia”.

Use complete locale dictionaries for all 19 before public launch. Do not leave fallback English keys visibly in translated UI without deliberate approval.

## Trending topic handling

Daily 2–3 original posts may belong to **any** 2–3 categories. This is normal. The feed is cross-category sorted by date; no promise of balanced daily posting. An article's category should not be changed to match trends after publication unless editorial correction requires it.

## Adding a new category later

Requires category ID, localized labels/descriptions for all nine UI locales, icon assignment, route and SEO tests, analytics mapping, editorial policy and acceptance approval. Do not allow a typo in frontmatter to create a new category automatically.

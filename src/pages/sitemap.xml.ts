import type { APIRoute } from 'astro';
import { SUPPORTED_LOCALES } from '../data/locales';
import { CATEGORY_IDS } from '../data/categories';
import { getPublishedPosts, getCategoryPosts, getAllTags } from '../lib/posts';
import {
  buildArticleAlternates,
  buildCategoryAlternates,
  buildStaticPageAlternates,
  buildArticlesArchiveAlternates,
  buildTagAlternates,
  isTagArchiveIndexable,
} from '../lib/seo';
import {
  buildCanonicalUrl,
  getHomeUrl,
  getArticlesUrl,
  getPostUrl,
  getCategoryUrl,
  getTagUrl,
  getAboutUrl,
  getEditorialPolicyUrl,
  getPrivacyUrl,
} from '../i18n/urls';

function formatXhtmlAlternates(
  alternates: { hreflang: string; href: string }[]
): string {
  return alternates
    .map(
      (alt) =>
        `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`
    )
    .join('\n');
}

export const GET: APIRoute = () => {
  const urlEntries: string[] = [];

  // 1. Homepages and static utility pages per locale (Search pages are noindex and excluded)
  const staticBuilders = [
    (loc: (typeof SUPPORTED_LOCALES)[number]) => getHomeUrl(loc),
    (loc: (typeof SUPPORTED_LOCALES)[number]) => getAboutUrl(loc),
    (loc: (typeof SUPPORTED_LOCALES)[number]) => getEditorialPolicyUrl(loc),
    (loc: (typeof SUPPORTED_LOCALES)[number]) => getPrivacyUrl(loc),
  ];

  for (const locale of SUPPORTED_LOCALES) {
    for (const builder of staticBuilders) {
      const relPath = builder(locale);
      const alternates = buildStaticPageAlternates(builder);
      urlEntries.push(`  <url>
    <loc>${buildCanonicalUrl(relPath)}</loc>
${formatXhtmlAlternates(alternates)}
  </url>`);
    }

    // All-articles archive root (only if locale has published posts)
    if (getPublishedPosts(locale).length > 0) {
      const articlesAlts = buildArticlesArchiveAlternates(locale, 1);
      urlEntries.push(`  <url>
    <loc>${buildCanonicalUrl(getArticlesUrl(locale, 1))}</loc>
${formatXhtmlAlternates(articlesAlts)}
  </url>`);
    }

    // 2. Category archives with published content in that locale (empty noindex categories excluded)
    for (const categoryId of CATEGORY_IDS) {
      const catPosts = getCategoryPosts(categoryId, locale);
      if (catPosts.length > 0) {
        const catAlts = buildCategoryAlternates(categoryId, locale, 1);
        urlEntries.push(`  <url>
    <loc>${buildCanonicalUrl(getCategoryUrl(locale, categoryId, 1))}</loc>
${formatXhtmlAlternates(catAlts)}
  </url>`);
      }
    }

    // 3. Substantive Tag archives that meet the indexability threshold (thin noindex tags excluded)
    for (const tag of getAllTags(locale)) {
      if (isTagArchiveIndexable(tag, locale)) {
        const tagAlts = buildTagAlternates(tag, locale);
        urlEntries.push(`  <url>
    <loc>${buildCanonicalUrl(getTagUrl(locale, tag))}</loc>
${formatXhtmlAlternates(tagAlts)}
  </url>`);
      }
    }
  }

  // 4. All published, indexable articles with xhtml:link hreflang alternates
  const publishedPosts = getPublishedPosts(undefined, false);
  for (const entry of publishedPosts) {
    const loc = buildCanonicalUrl(getPostUrl(entry.data.lang, entry.data.slug));
    const lastmod = (entry.data.updatedAt ?? entry.data.publishedAt).toISOString();
    const alternates = buildArticleAlternates(entry.data.translationKey);

    urlEntries.push(`  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
${formatXhtmlAlternates(alternates)}
  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};

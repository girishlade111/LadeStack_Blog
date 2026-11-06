import type { APIRoute } from 'astro';
import { SUPPORTED_LOCALES } from '../data/locales';
import { CATEGORY_IDS } from '../data/categories';
import { getPublishedPosts, getCategoryPosts } from '../lib/posts';
import { buildArticleAlternates } from '../lib/seo';
import {
  buildCanonicalUrl,
  getHomeUrl,
  getArticlesUrl,
  getPostUrl,
  getCategoryUrl,
  getAboutUrl,
  getEditorialPolicyUrl,
  getPrivacyUrl,
} from '../i18n/urls';

export const GET: APIRoute = () => {
  const urlEntries: string[] = [];

  // 1. Homepages and static utility pages per locale
  for (const locale of SUPPORTED_LOCALES) {
    const staticPaths = [
      getHomeUrl(locale),
      getArticlesUrl(locale),
      getAboutUrl(locale),
      getEditorialPolicyUrl(locale),
      getPrivacyUrl(locale),
    ];
    for (const relPath of staticPaths) {
      urlEntries.push(`  <url>
    <loc>${buildCanonicalUrl(relPath)}</loc>
  </url>`);
    }

    // 2. Category archives with published content in that locale
    for (const categoryId of CATEGORY_IDS) {
      const catPosts = getCategoryPosts(categoryId, locale);
      if (catPosts.length > 0) {
        urlEntries.push(`  <url>
    <loc>${buildCanonicalUrl(getCategoryUrl(locale, categoryId))}</loc>
  </url>`);
      }
    }
  }

  // 3. All published, indexable articles with xhtml:link hreflang alternates
  const publishedPosts = getPublishedPosts(undefined, false);
  for (const entry of publishedPosts) {
    const loc = buildCanonicalUrl(getPostUrl(entry.data.lang, entry.data.slug));
    const lastmod = (entry.data.updatedAt ?? entry.data.publishedAt).toISOString();
    const alternates = buildArticleAlternates(entry.data.translationKey);
    const xhtmlLinks = alternates
      .map(
        (alt) =>
          `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`
      )
      .join('\n');

    urlEntries.push(`  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
${xhtmlLinks}
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

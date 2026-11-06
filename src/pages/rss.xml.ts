import type { APIRoute } from 'astro';
import { SITE_CONFIG } from '../data/site';
import { getPublishedPosts } from '../lib/posts';
import { buildCanonicalUrl, getPostUrl } from '../i18n/urls';

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = () => {
  const posts = getPublishedPosts('en', false);

  const itemsXml = posts
    .map((entry) => {
      const link = buildCanonicalUrl(getPostUrl(entry.data.lang, entry.data.slug));
      return `    <item>
      <title>${escapeXml(entry.data.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(entry.data.description)}</description>
      <pubDate>${entry.data.publishedAt.toUTCString()}</pubDate>
      <category>${escapeXml(entry.data.category)}</category>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_CONFIG.name)}</title>
    <link>${SITE_CONFIG.origin}/</link>
    <description>Original multilingual technical and editorial publication by LadeStack.</description>
    <language>en</language>
    <atom:link href="${SITE_CONFIG.origin}/rss.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};

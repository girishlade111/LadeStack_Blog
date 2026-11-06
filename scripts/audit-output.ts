import fs from 'node:fs';
import path from 'node:path';
import { CATEGORY_IDS } from '../src/data/categories';
import { SUPPORTED_LOCALES } from '../src/data/locales';
import { loadAllBlogEntries } from '../src/lib/content-loader';
import { getPostsByCategory } from '../src/lib/posts';

const DIST_DIR = path.resolve(process.cwd(), 'dist');

function walkHtmlFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkHtmlFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

function main() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('Built output audit failed: dist/ directory does not exist. Run npm run build first.');
    process.exit(1);
  }

  const errors: string[] = [];

  // 1. Ensure /en/ directory is NOT generated
  if (fs.existsSync(path.join(DIST_DIR, 'en'))) {
    errors.push('Forbidden duplicate /en/ directory found in dist/. English must be unprefixed.');
  }

  // 2. Ensure official Pagefind search bundle exists and legacy index-*.json files do not exist
  const pagefindDir = path.join(DIST_DIR, 'pagefind');
  if (!fs.existsSync(path.join(pagefindDir, 'pagefind.js'))) {
    errors.push('Missing dist/pagefind/pagefind.js');
  }
  if (!fs.existsSync(path.join(pagefindDir, 'pagefind-entry.json'))) {
    errors.push('Missing official Pagefind manifest: dist/pagefind/pagefind-entry.json');
  }
  const pagefindFiles = fs.existsSync(pagefindDir) ? fs.readdirSync(pagefindDir) : [];
  if (!pagefindFiles.some((f) => f.endsWith('.pagefind') || f.endsWith('.pf_meta') || f.endsWith('.pf_index'))) {
    errors.push('Missing official Pagefind WASM/index chunks in dist/pagefind/');
  }
  for (const locale of SUPPORTED_LOCALES) {
    if (fs.existsSync(path.join(pagefindDir, `index-${locale}.json`))) {
      errors.push(`Legacy custom JSON search file still present: dist/pagefind/index-${locale}.json`);
    }
  }

  // 3. Ensure zero unnecessary category page/2 directories exist when totalPages <= 1
  for (const locale of SUPPORTED_LOCALES) {
    for (const category of CATEGORY_IDS) {
      const posts = getPostsByCategory(locale, category);
      const totalPages = Math.ceil(posts.length / 6);
      if (totalPages <= 1) {
        const page2Path =
          locale === 'en'
            ? path.join(DIST_DIR, 'category', category, 'page', '2', 'index.html')
            : path.join(DIST_DIR, locale, 'category', category, 'page', '2', 'index.html');
        if (fs.existsSync(page2Path)) {
          errors.push(`Unnecessary empty paginated route generated: ${path.relative(DIST_DIR, page2Path)}`);
        }
      }
    }
  }

  // 4. Ensure draft entries do NOT appear in dist/ or dist/sitemap.xml
  const allEntries = loadAllBlogEntries(true);
  const draftEntries = allEntries.filter(
    (e) => e.data.status !== 'published' || e.data.noindex
  );
  const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  const rssPath = path.join(DIST_DIR, 'rss.xml');
  if (!fs.existsSync(sitemapPath)) {
    errors.push('Missing dist/sitemap.xml');
  }
  if (!fs.existsSync(rssPath)) {
    errors.push('Missing dist/rss.xml');
  }
  const sitemapContent = fs.existsSync(sitemapPath)
    ? fs.readFileSync(sitemapPath, 'utf-8')
    : '';
  const sitemapLocs = new Set(
    [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((m) => m[1])
  );

  for (const draft of draftEntries) {
    const slug = draft.data.slug;
    if (sitemapContent.includes(slug)) {
      errors.push(`Draft slug "${slug}" leaked into dist/sitemap.xml`);
    }
    const draftRouteDir =
      draft.data.lang === 'en'
        ? path.join(DIST_DIR, 'posts', slug)
        : path.join(DIST_DIR, draft.data.lang, 'posts', slug);
    if (fs.existsSync(draftRouteDir)) {
      errors.push(`Draft route directory generated in dist/: ${draftRouteDir}`);
    }
  }

  // 5. Inspect every built HTML page for <html lang>, canonical tag, social images, robots, and reciprocal hreflang
  const htmlFiles = walkHtmlFiles(DIST_DIR);
  const hreflangMap = new Map<string, Map<string, string>>();
  const noindexUrls = new Set<string>();
  const indexableUrls = new Set<string>();

  for (const file of htmlFiles) {
    const rel = path.relative(DIST_DIR, file);
    const html = fs.readFileSync(file, 'utf-8');

    const langMatch = html.match(/<html[^>]*\blang="([^"]+)"/i);
    if (!langMatch) {
      errors.push(`Missing <html lang="..."> in ${rel}`);
    }

    const canonicalMatches = [
      ...html.matchAll(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/gi),
    ];
    if (canonicalMatches.length !== 1) {
      errors.push(
        `Expected exactly 1 canonical link in ${rel}, found ${canonicalMatches.length}`
      );
      continue;
    }

    const canonicalUrl = canonicalMatches[0][1];
    if (!canonicalUrl.startsWith('https://blog.ladestack.in/')) {
      errors.push(`Canonical URL in ${rel} does not start with https://blog.ladestack.in/: ${canonicalUrl}`);
    }

    // Check og:image and twitter:image URLs
    const ogImgMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i);
    const twitterImgMatch = html.match(/<meta[^>]*name="twitter:image"[^>]*content="([^"]+)"/i);
    for (const [label, match] of [
      ['og:image', ogImgMatch],
      ['twitter:image', twitterImgMatch],
    ] as const) {
      if (!match) {
        errors.push(`Missing ${label} meta tag in ${rel}`);
        continue;
      }
      const imgUrl = match[1];
      if (imgUrl.endsWith('/')) {
        errors.push(`${label} in ${rel} has forbidden trailing slash: ${imgUrl}`);
      }
      try {
        const parsed = new URL(imgUrl);
        const assetDiskPath = path.join(DIST_DIR, parsed.pathname.replace(/^\/+/, ''));
        if (!fs.existsSync(assetDiskPath) || !fs.statSync(assetDiskPath).isFile()) {
          errors.push(`${label} in ${rel} points to non-existent asset in dist/: ${imgUrl}`);
        }
      } catch {
        errors.push(`${label} in ${rel} is not a valid absolute URL: ${imgUrl}`);
      }
    }

    // Check robots directive
    const robotsMatch = html.match(/<meta[^>]*name="robots"[^>]*content="([^"]+)"/i);
    const isNoindex = robotsMatch ? robotsMatch[1].toLowerCase().includes('noindex') : false;

    const altMatches = [
      ...html.matchAll(
        /<link[^>]*rel="alternate"[^>]*hreflang="([^"]+)"[^>]*href="([^"]+)"/gi
      ),
    ];

    if (rel === '404.html') continue;

    if (isNoindex) {
      noindexUrls.add(canonicalUrl);
      if (altMatches.length > 0) {
        errors.push(`Noindex page ${rel} (${canonicalUrl}) must not emit hreflang alternate links (found ${altMatches.length}).`);
      }
      if (sitemapLocs.has(canonicalUrl)) {
        errors.push(`Noindex page ${rel} (${canonicalUrl}) must not appear in dist/sitemap.xml.`);
      }
    } else {
      indexableUrls.add(canonicalUrl);
      if (!sitemapLocs.has(canonicalUrl)) {
        errors.push(`Indexable page ${rel} (${canonicalUrl}) is missing from dist/sitemap.xml.`);
      }
      if (altMatches.length > 0) {
        const map = new Map<string, string>();
        for (const m of altMatches) {
          map.set(m[1], m[2]);
        }
        hreflangMap.set(canonicalUrl, map);
      }
    }
  }

  // 6. Verify reciprocity across built HTML files and ensure no hreflang points to a noindex page
  for (const [sourceUrl, alternates] of hreflangMap.entries()) {
    for (const [lang, targetUrl] of alternates.entries()) {
      if (noindexUrls.has(targetUrl)) {
        errors.push(
          `Hreflang on ${sourceUrl} (${lang}) points to a noindex page: ${targetUrl}`
        );
      }
      if (lang === 'x-default') continue;
      const targetAlternates = hreflangMap.get(targetUrl);
      if (!targetAlternates) {
        errors.push(
          `Built HTML hreflang target ${targetUrl} (referenced from ${sourceUrl}) has no corresponding indexable HTML page with hreflang`
        );
        continue;
      }
      const reverseValues = Array.from(targetAlternates.values());
      if (!reverseValues.includes(sourceUrl)) {
        errors.push(
          `Broken built HTML hreflang reciprocity: ${sourceUrl} -> ${targetUrl}, but ${targetUrl} does not link back to ${sourceUrl}`
        );
      }
    }
  }

  if (errors.length > 0) {
    console.error('Built output audit failed:');
    for (const err of errors) {
      console.error(`  - ${err}`);
    }
    process.exit(1);
  }

  console.log(
    `[verify:output] Audited ${htmlFiles.length} built HTML pages (${indexableUrls.size} indexable, ${noindexUrls.size} noindex), sitemap.xml (${sitemapLocs.size} URLs), rss.xml, social preview PNGs, and official Pagefind index with 0 errors.`
  );
}

main();

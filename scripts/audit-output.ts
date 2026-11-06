import fs from 'node:fs';
import path from 'node:path';
import { SUPPORTED_LOCALES } from '../src/data/locales';
import { loadAllBlogEntries } from '../src/lib/content-loader';

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

  // 2. Ensure Pagefind search index exists for all 9 locales
  const pagefindDir = path.join(DIST_DIR, 'pagefind');
  if (!fs.existsSync(path.join(pagefindDir, 'pagefind.js'))) {
    errors.push('Missing dist/pagefind/pagefind.js');
  }
  for (const locale of SUPPORTED_LOCALES) {
    if (!fs.existsSync(path.join(pagefindDir, `index-${locale}.json`))) {
      errors.push(`Missing Pagefind locale index: dist/pagefind/index-${locale}.json`);
    }
  }

  // 3. Ensure draft entries do NOT appear in dist/ or dist/sitemap.xml
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

  // 4. Inspect every built HTML page for <html lang>, canonical tag, and reciprocal hreflang
  const htmlFiles = walkHtmlFiles(DIST_DIR);
  const hreflangMap = new Map<string, Map<string, string>>();

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

    // Collect alternate hreflang tags (skip 404.html which is noindex)
    if (rel === '404.html') continue;
    const altMatches = [
      ...html.matchAll(
        /<link[^>]*rel="alternate"[^>]*hreflang="([^"]+)"[^>]*href="([^"]+)"/gi
      ),
    ];
    if (altMatches.length > 0) {
      const map = new Map<string, string>();
      for (const m of altMatches) {
        map.set(m[1], m[2]);
      }
      hreflangMap.set(canonicalUrl, map);
    }
  }

  // Verify reciprocity across built HTML files
  for (const [sourceUrl, alternates] of hreflangMap.entries()) {
    for (const [lang, targetUrl] of alternates.entries()) {
      if (lang === 'x-default') continue;
      const targetAlternates = hreflangMap.get(targetUrl);
      if (!targetAlternates) {
        errors.push(
          `Built HTML hreflang target ${targetUrl} (referenced from ${sourceUrl}) has no corresponding built HTML page`
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
    `[verify:output] Audited ${htmlFiles.length} built HTML pages, sitemap.xml, rss.xml, and 9 Pagefind locale indexes with 0 errors.`
  );
}

main();

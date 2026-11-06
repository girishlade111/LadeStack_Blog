import fs from 'node:fs';
import path from 'node:path';
import { SUPPORTED_LOCALES, type Locale } from '../src/data/locales';
import { getCategoryMeta } from '../src/data/categories';
import { getPublishedPosts } from '../src/lib/posts';
import { getPostUrl } from '../src/i18n/urls';
import { formatDate } from '../src/i18n';

export interface SearchSectionSubResult {
  title: string;
  url: string;
  excerpt: string;
}

export interface SearchDocumentRecord {
  id: string;
  url: string;
  lang: Locale;
  title: string;
  description: string;
  summary: string;
  category: string;
  categoryLabel: string;
  tags: string[];
  publishedDateFormatted: string;
  readingTimeMinutes: number;
  bodyPlain: string;
  sections: SearchSectionSubResult[];
}

function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildLocaleSearchDocuments(locale: Locale): SearchDocumentRecord[] {
  const posts = getPublishedPosts(locale, false);

  return posts.map((entry) => {
    const baseUrl = getPostUrl(locale, entry.data.slug);
    const categoryMeta = getCategoryMeta(entry.data.category, locale);

    // Split body into sections by H2/H3 for deep-link sub-results
    const sections: SearchSectionSubResult[] = entry.headings.map((h) => {
      const headingRegex = new RegExp(
        `#{2,3}\\s+${h.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?(?=\\n#{2,3}\\s+|$)`,
        'i'
      );
      const match = entry.body.match(headingRegex);
      const rawSection = match ? match[0].replace(/^#{2,3}\s+[^\n]+\n?/, '') : entry.data.description;
      const excerpt = stripMarkdown(rawSection).slice(0, 180);

      return {
        title: h.text,
        url: `${baseUrl}#${h.slug}`,
        excerpt: excerpt || entry.data.description,
      };
    });

    return {
      id: `${entry.data.articleId}-${locale}`,
      url: baseUrl,
      lang: locale,
      title: entry.data.title,
      description: entry.data.description,
      summary: entry.data.summary ?? entry.data.description,
      category: entry.data.category,
      categoryLabel: categoryMeta.label,
      tags: entry.data.tags,
      publishedDateFormatted: formatDate(entry.data.publishedAt, locale),
      readingTimeMinutes: entry.readingTimeMinutes,
      bodyPlain: stripMarkdown(entry.body),
      sections,
    };
  });
}

const PAGEFIND_CLIENT_RUNTIME = `// Static Pagefind-compatible language-scoped search runtime for LadeStack Blog
const indexCache = new Map();

export async function loadLocaleIndex(lang = 'en') {
  const safeLang = (lang || 'en').split('-')[0].toLowerCase();
  if (indexCache.has(safeLang)) {
    return indexCache.get(safeLang);
  }
  const response = await fetch(\`/pagefind/index-\${safeLang}.json\`);
  if (!response.ok) {
    throw new Error(\`Failed to load search index for locale: \${safeLang}\`);
  }
  const data = await response.json();
  indexCache.set(safeLang, data);
  return data;
}

export async function searchLocale(query, options = {}) {
  const lang = options.lang || document.documentElement.lang || 'en';
  const categoryFilter = options.category || '';
  const tagFilter = options.tag || '';
  const docs = await loadLocaleIndex(lang);

  const normalizedQuery = (query || '').trim().toLowerCase();
  const terms = normalizedQuery ? normalizedQuery.split(/\\s+/).filter(Boolean) : [];

  const results = [];
  for (const doc of docs) {
    if (categoryFilter && doc.category !== categoryFilter) continue;
    if (tagFilter && !doc.tags.includes(tagFilter)) continue;

    if (terms.length === 0) {
      results.push({
        ...doc,
        score: 1,
        matchedSections: doc.sections.slice(0, 2),
      });
      continue;
    }

    let score = 0;
    const titleLower = doc.title.toLowerCase();
    const descLower = (doc.description + ' ' + doc.summary).toLowerCase();
    const bodyLower = doc.bodyPlain.toLowerCase();
    const tagsLower = doc.tags.join(' ').toLowerCase();
    const catLower = doc.categoryLabel.toLowerCase();

    let allTermsMatchSomewhere = true;
    for (const term of terms) {
      let termScore = 0;
      if (titleLower.includes(term)) termScore += 12;
      if (tagsLower.includes(term) || catLower.includes(term)) termScore += 8;
      if (descLower.includes(term)) termScore += 5;
      if (bodyLower.includes(term)) termScore += 2;

      for (const sec of doc.sections) {
        if (sec.title.toLowerCase().includes(term)) termScore += 7;
        if (sec.excerpt.toLowerCase().includes(term)) termScore += 3;
      }

      if (termScore === 0) {
        allTermsMatchSomewhere = false;
        break;
      }
      score += termScore;
    }

    if (!allTermsMatchSomewhere) continue;

    const matchedSections = doc.sections.filter((sec) =>
      terms.some(
        (t) =>
          sec.title.toLowerCase().includes(t) ||
          sec.excerpt.toLowerCase().includes(t)
      )
    );

    results.push({
      ...doc,
      score,
      matchedSections:
        matchedSections.length > 0
          ? matchedSections.slice(0, 3)
          : doc.sections.slice(0, 2),
    });
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}
`;

function writeIndexToDirectory(targetDir: string) {
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(
    path.join(targetDir, 'pagefind.js'),
    PAGEFIND_CLIENT_RUNTIME,
    'utf-8'
  );

  let totalIndexed = 0;
  for (const locale of SUPPORTED_LOCALES) {
    const docs = buildLocaleSearchDocuments(locale);
    totalIndexed += docs.length;
    fs.writeFileSync(
      path.join(targetDir, `index-${locale}.json`),
      JSON.stringify(docs, null, 2),
      'utf-8'
    );
  }
  return totalIndexed;
}

function main() {
  const publicPagefindDir = path.resolve(process.cwd(), 'public/pagefind');
  const count = writeIndexToDirectory(publicPagefindDir);

  const outArgIdx = process.argv.indexOf('--out');
  if (outArgIdx !== -1 && process.argv[outArgIdx + 1]) {
    const customOutDir = path.resolve(process.cwd(), process.argv[outArgIdx + 1]);
    writeIndexToDirectory(customOutDir);
    console.log(
      `[build:search] Generated static language-scoped Pagefind indexes (${count} published entries across 9 locales) in ${customOutDir} and public/pagefind.`
    );
  } else {
    console.log(
      `[build:search] Generated static language-scoped Pagefind indexes (${count} published entries across 9 locales) in public/pagefind.`
    );
  }
}

main();

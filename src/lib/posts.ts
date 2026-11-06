import { loadAllBlogEntries } from './content-loader';
import type { BlogEntry } from './validators';
import type { Locale } from '../data/locales';
import type { CategoryId } from '../data/categories';
import { getPostUrl } from '../i18n/urls';

export function sortEntriesDeterministically(entries: readonly BlogEntry[]): BlogEntry[] {
  return [...entries].sort((a, b) => {
    const timeDiff = b.data.publishedAt.getTime() - a.data.publishedAt.getTime();
    if (timeDiff !== 0) return timeDiff;
    return a.data.articleId.localeCompare(b.data.articleId);
  });
}

let cachedSourceRef: BlogEntry[] | null = null;
let cachedPublishedAll: BlogEntry[] = [];
let cachedPublishedIndexable: BlogEntry[] = [];
const cachedByLocale = new Map<string, BlogEntry[]>();
const cachedByCategoryLocale = new Map<string, BlogEntry[]>();
const cachedByTagLocale = new Map<string, BlogEntry[]>();

function ensurePostIndexes(): void {
  const all = loadAllBlogEntries();
  if (cachedSourceRef === all) return;

  cachedSourceRef = all;
  cachedByLocale.clear();
  cachedByCategoryLocale.clear();
  cachedByTagLocale.clear();

  cachedPublishedAll = sortEntriesDeterministically(
    all.filter((e) => e.data.status === 'published')
  );
  cachedPublishedIndexable = cachedPublishedAll.filter((e) => !e.data.noindex);

  for (const entry of cachedPublishedIndexable) {
    const loc = entry.data.lang;
    const locList = cachedByLocale.get(loc) ?? [];
    locList.push(entry);
    cachedByLocale.set(loc, locList);

    const catKey = `${loc}::${entry.data.category}`;
    const catList = cachedByCategoryLocale.get(catKey) ?? [];
    catList.push(entry);
    cachedByCategoryLocale.set(catKey, catList);

    for (const tag of entry.data.tags) {
      const tagKey = `${loc}::${tag}`;
      const tagList = cachedByTagLocale.get(tagKey) ?? [];
      tagList.push(entry);
      cachedByTagLocale.set(tagKey, tagList);
    }
  }
}

export function getPublishedPosts(locale?: Locale, includeNoindex = false): BlogEntry[] {
  ensurePostIndexes();
  if (!includeNoindex) {
    if (!locale) return [...cachedPublishedIndexable];
    return [...(cachedByLocale.get(locale) ?? [])];
  }
  if (!locale) return [...cachedPublishedAll];
  return cachedPublishedAll.filter((e) => e.data.lang === locale);
}

export function getPostBySlug(locale: Locale, slug: string): BlogEntry | undefined {
  ensurePostIndexes();
  return cachedPublishedAll.find(
    (entry) => entry.data.lang === locale && entry.data.slug === slug
  );
}

export function getPostEntryUrl(entry: BlogEntry): string {
  return getPostUrl(entry.data.lang, entry.data.slug);
}

export function getFeaturedPost(locale: Locale): BlogEntry | undefined {
  const posts = getPublishedPosts(locale);
  return posts.find((p) => p.data.featured) ?? posts[0];
}

export function getCategoryPosts(categoryId: CategoryId, locale: Locale): BlogEntry[] {
  ensurePostIndexes();
  return [...(cachedByCategoryLocale.get(`${locale}::${categoryId}`) ?? [])];
}

export function getTagPosts(tag: string, locale: Locale): BlogEntry[] {
  ensurePostIndexes();
  return [...(cachedByTagLocale.get(`${locale}::${tag}`) ?? [])];
}

export function getAllPublishedTags(locale: Locale): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getPublishedPosts(locale)) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getAllTags(locale: Locale): string[] {
  return getAllPublishedTags(locale).map((item) => item.tag);
}

export function getRelatedPosts(current: BlogEntry, limit = 3): BlogEntry[] {
  const candidates = getPublishedPosts(current.data.lang).filter(
    (entry) => entry.data.slug !== current.data.slug
  );

  const scored = candidates.map((entry) => {
    let score = 0;
    if (entry.data.category === current.data.category) {
      score += 10;
    }
    for (const tag of entry.data.tags) {
      if (current.data.tags.includes(tag)) {
        score += 3;
      }
    }
    return { entry, score };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (
      b.entry.data.publishedAt.getTime() - a.entry.data.publishedAt.getTime()
    );
  });

  return scored.slice(0, limit).map((s) => s.entry);
}

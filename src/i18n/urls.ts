import { DEFAULT_LOCALE, LOCALE_REGISTRY, type Locale } from '../data/locales';
import { SITE_CONFIG } from '../data/site';
import type { CategoryId } from '../data/categories';

export function ensureTrailingSlash(path: string): string {
  if (!path || path === '/') return '/';
  const [pathname, hashOrQuery] = path.split(/(?=[?#])/);
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return hashOrQuery ? `${normalized}${hashOrQuery}` : normalized;
}

export function getLocalePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? '' : LOCALE_REGISTRY[locale].prefix;
}

export function getHomeUrl(locale: Locale = DEFAULT_LOCALE): string {
  const prefix = getLocalePrefix(locale);
  return prefix ? `${prefix}/` : '/';
}

export function getArticlesUrl(locale: Locale = DEFAULT_LOCALE, page = 1): string {
  const prefix = getLocalePrefix(locale);
  if (page <= 1) {
    return ensureTrailingSlash(`${prefix}/articles`);
  }
  return ensureTrailingSlash(`${prefix}/articles/page/${page}`);
}

export function getPostUrl(locale: Locale, slug: string): string {
  const prefix = getLocalePrefix(locale);
  return ensureTrailingSlash(`${prefix}/posts/${slug}`);
}

export function getCategoryUrl(
  locale: Locale,
  categoryId: CategoryId | string,
  page = 1
): string {
  const prefix = getLocalePrefix(locale);
  if (page <= 1) {
    return ensureTrailingSlash(`${prefix}/category/${categoryId}`);
  }
  return ensureTrailingSlash(`${prefix}/category/${categoryId}/page/${page}`);
}

export function getTagUrl(locale: Locale, tag: string): string {
  const prefix = getLocalePrefix(locale);
  return ensureTrailingSlash(`${prefix}/tags/${encodeURIComponent(tag)}`);
}

export function getSearchUrl(locale: Locale = DEFAULT_LOCALE): string {
  const prefix = getLocalePrefix(locale);
  return ensureTrailingSlash(`${prefix}/search`);
}

export function getAboutUrl(locale: Locale = DEFAULT_LOCALE): string {
  const prefix = getLocalePrefix(locale);
  return ensureTrailingSlash(`${prefix}/about`);
}

export function getEditorialPolicyUrl(locale: Locale = DEFAULT_LOCALE): string {
  const prefix = getLocalePrefix(locale);
  return ensureTrailingSlash(`${prefix}/editorial-policy`);
}

export function getPrivacyUrl(locale: Locale = DEFAULT_LOCALE): string {
  const prefix = getLocalePrefix(locale);
  return ensureTrailingSlash(`${prefix}/privacy`);
}

export function buildCanonicalUrl(relativePath: string): string {
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }
  const cleanRelative = relativePath.startsWith('/')
    ? relativePath
    : `/${relativePath}`;
  if (cleanRelative.endsWith('.xml') || cleanRelative.endsWith('.txt')) {
    return `${SITE_CONFIG.origin}${cleanRelative}`;
  }
  return `${SITE_CONFIG.origin}${ensureTrailingSlash(cleanRelative)}`;
}

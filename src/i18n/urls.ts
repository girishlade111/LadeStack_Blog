import { DEFAULT_LOCALE, LOCALE_REGISTRY, type Locale } from '../data/locales';
import { SITE_CONFIG } from '../data/site';
import type { CategoryId } from '../data/categories';

const FILE_EXTENSION_REGEX = /\/[^/?#]+\.[a-z0-9]{2,8}$/i;

export function isAssetPath(path: string): boolean {
  if (!path) return false;
  const [pathname] = path.split(/(?=[?#])/);
  return FILE_EXTENSION_REGEX.test(pathname);
}

export function ensureTrailingSlash(path: string): string {
  if (!path || path === '/') return '/';
  const [pathname, hashOrQuery] = path.split(/(?=[?#])/);
  if (FILE_EXTENSION_REGEX.test(pathname)) {
    const cleanFile = pathname.replace(/\/+$/, '');
    return hashOrQuery ? `${cleanFile}${hashOrQuery}` : cleanFile;
  }
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

/**
 * Builds an absolute canonical URL for an HTML page route (with trailing slash).
 * If passed a static file/feed path with an extension, delegates to buildAssetUrl.
 */
export function buildCanonicalUrl(relativePath: string): string {
  if (isAssetPath(relativePath)) {
    return buildAssetUrl(relativePath);
  }
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    const url = new URL(relativePath);
    if (!FILE_EXTENSION_REGEX.test(url.pathname) && !url.pathname.endsWith('/')) {
      url.pathname = `${url.pathname}/`;
    }
    return url.toString();
  }
  const cleanRelative = relativePath.startsWith('/')
    ? relativePath
    : `/${relativePath}`;
  return `${SITE_CONFIG.origin}${ensureTrailingSlash(cleanRelative)}`;
}

/**
 * Builds an absolute URL for a static asset (image, SVG, PNG, XML feed, etc.).
 * Never appends a trailing slash to asset paths.
 */
export function buildAssetUrl(assetPath: string): string {
  if (!assetPath) {
    return `${SITE_CONFIG.origin}${SITE_CONFIG.defaultOgImage}`;
  }
  if (assetPath.startsWith('http://') || assetPath.startsWith('https://')) {
    const url = new URL(assetPath);
    if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
      url.pathname = url.pathname.replace(/\/+$/, '');
    }
    return url.toString();
  }
  const [pathname, hashOrQuery] = assetPath.split(/(?=[?#])/);
  const cleanPathname = (pathname.startsWith('/') ? pathname : `/${pathname}`).replace(
    /\/+$/,
    ''
  );
  return `${SITE_CONFIG.origin}${cleanPathname}${hashOrQuery ?? ''}`;
}

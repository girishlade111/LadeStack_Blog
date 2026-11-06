import { SUPPORTED_LOCALES, type Locale } from '../data/locales';
import type { CategoryId } from '../data/categories';
import { AUTHOR_REGISTRY, SITE_CONFIG } from '../data/site';
import {
  buildCanonicalUrl,
  buildAssetUrl,
  getPostUrl,
  getCategoryUrl,
  getArticlesUrl,
  getTagUrl,
} from '../i18n/urls';
import { getAvailableTranslations } from './translations';
import { getCategoryPosts, getPublishedPosts, getTagPosts } from './posts';
import type { BlogEntry } from './validators';

export interface HreflangAlternate {
  hreflang: Locale | 'x-default';
  href: string;
}

/**
 * Resolves the raster social preview image URL (1200x630 PNG) for an article or fallback.
 * If an article specifies `/images/covers/foo.svg`, uses `/images/covers/foo.png` when available
 * for maximum OpenGraph/Twitter raster compatibility, or falls back to SITE_CONFIG.defaultOgImage.
 */
export function resolveSocialImageUrl(coverImage?: string): string {
  if (!coverImage) {
    return buildAssetUrl(SITE_CONFIG.defaultOgImage);
  }
  const pngCandidate = coverImage.endsWith('.svg')
    ? coverImage.replace(/\.svg$/i, '.png')
    : coverImage;
  return buildAssetUrl(pngCandidate);
}

export function buildArticleAlternates(translationKey: string): HreflangAlternate[] {
  const available = getAvailableTranslations(translationKey);
  const alternates: HreflangAlternate[] = available.map((variant) => ({
    hreflang: variant.locale,
    href: buildCanonicalUrl(variant.url),
  }));

  const enVariant = available.find((v) => v.locale === 'en');
  if (enVariant && available.length > 1) {
    alternates.push({
      hreflang: 'x-default',
      href: buildCanonicalUrl(enVariant.url),
    });
  }

  return alternates;
}

export function buildStaticPageAlternates(
  pathBuilder: (locale: Locale) => string
): HreflangAlternate[] {
  const alternates: HreflangAlternate[] = SUPPORTED_LOCALES.map((locale) => ({
    hreflang: locale,
    href: buildCanonicalUrl(pathBuilder(locale)),
  }));
  alternates.push({
    hreflang: 'x-default',
    href: buildCanonicalUrl(pathBuilder('en')),
  });
  return alternates;
}

/**
 * Builds reciprocal hreflang alternates for a category archive page.
 * Excludes any locale where the category is empty (noindex) or where `page` does not exist.
 * If the current locale's category page is itself empty/noindex, returns `[]`.
 */
export function buildCategoryAlternates(
  categoryId: CategoryId,
  currentLocale: Locale,
  page = 1
): HreflangAlternate[] {
  const eligibleLocales = SUPPORTED_LOCALES.filter((loc) => {
    const count = getCategoryPosts(categoryId, loc).length;
    if (count === 0) return false;
    const totalPages = Math.ceil(count / SITE_CONFIG.postsPerPage);
    return page >= 1 && page <= totalPages;
  });

  if (!eligibleLocales.includes(currentLocale)) {
    return [];
  }

  const alternates: HreflangAlternate[] = eligibleLocales.map((loc) => ({
    hreflang: loc,
    href: buildCanonicalUrl(getCategoryUrl(loc, categoryId, page)),
  }));

  if (eligibleLocales.includes('en') && eligibleLocales.length > 1) {
    alternates.push({
      hreflang: 'x-default',
      href: buildCanonicalUrl(getCategoryUrl('en', categoryId, page)),
    });
  }

  return alternates;
}

/**
 * Builds reciprocal hreflang alternates for the all-articles archive at a specific page number.
 * Never associates page N with page 1 of another locale.
 */
export function buildArticlesArchiveAlternates(
  currentLocale: Locale,
  page = 1
): HreflangAlternate[] {
  const eligibleLocales = SUPPORTED_LOCALES.filter((loc) => {
    const count = getPublishedPosts(loc).length;
    if (count === 0) return false;
    const totalPages = Math.ceil(count / SITE_CONFIG.postsPerPage);
    return page >= 1 && page <= totalPages;
  });

  if (!eligibleLocales.includes(currentLocale)) {
    return [];
  }

  const alternates: HreflangAlternate[] = eligibleLocales.map((loc) => ({
    hreflang: loc,
    href: buildCanonicalUrl(getArticlesUrl(loc, page)),
  }));

  if (eligibleLocales.includes('en') && eligibleLocales.length > 1) {
    alternates.push({
      hreflang: 'x-default',
      href: buildCanonicalUrl(getArticlesUrl('en', page)),
    });
  }

  return alternates;
}

/**
 * Determines whether a tag archive in a given locale meets the indexability threshold.
 */
export function isTagArchiveIndexable(tag: string, locale: Locale): boolean {
  return getTagPosts(tag, locale).length >= SITE_CONFIG.minIndexableTagPosts;
}

/**
 * Builds reciprocal hreflang alternates for indexable tag pages only.
 * Returns `[]` if the current tag page is `noindex`.
 */
export function buildTagAlternates(
  tag: string,
  currentLocale: Locale
): HreflangAlternate[] {
  if (!isTagArchiveIndexable(tag, currentLocale)) {
    return [];
  }

  const eligibleLocales = SUPPORTED_LOCALES.filter((loc) =>
    isTagArchiveIndexable(tag, loc)
  );

  const alternates: HreflangAlternate[] = eligibleLocales.map((loc) => ({
    hreflang: loc,
    href: buildCanonicalUrl(getTagUrl(loc, tag)),
  }));

  if (eligibleLocales.includes('en') && eligibleLocales.length > 1) {
    alternates.push({
      hreflang: 'x-default',
      href: buildCanonicalUrl(getTagUrl('en', tag)),
    });
  }

  return alternates;
}

export function buildArticleJsonLd(entry: BlogEntry): Record<string, unknown> {
  const canonicalUrl = buildCanonicalUrl(
    getPostUrl(entry.data.lang, entry.data.slug)
  );
  const author = AUTHOR_REGISTRY[entry.data.authorId];
  const socialPngUrl = resolveSocialImageUrl(entry.data.coverImage);
  const images = entry.data.coverImage
    ? Array.from(new Set([socialPngUrl, buildAssetUrl(entry.data.coverImage)]))
    : [socialPngUrl];

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: entry.data.title,
    description: entry.data.description,
    inLanguage: entry.data.lang,
    url: canonicalUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    image: images,
    datePublished: entry.data.publishedAt.toISOString(),
    dateModified: (
      entry.data.updatedAt ?? entry.data.publishedAt
    ).toISOString(),
    author: {
      '@type': 'Person',
      name: author?.name ?? entry.data.authorId,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.origin,
      logo: {
        '@type': 'ImageObject',
        url: buildAssetUrl('/favicon.svg'),
      },
    },
  };
}

export function buildBreadcrumbJsonLd(
  crumbs: { label: string; href: string }[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.label,
      item: buildCanonicalUrl(crumb.href),
    })),
  };
}

export function buildWebsiteJsonLd(
  locale: Locale,
  description: string
): Record<string, unknown>[] {
  const homeUrl = buildCanonicalUrl(locale === 'en' ? '/' : `/${locale}/`);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.origin,
      logo: buildAssetUrl('/favicon.svg'),
      parentOrganization: {
        '@type': 'Organization',
        name: SITE_CONFIG.parentBrand,
        url: SITE_CONFIG.parentUrl,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: homeUrl,
      inLanguage: locale,
      description,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: SITE_CONFIG.name,
      url: homeUrl,
      inLanguage: locale,
      description,
      publisher: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.origin,
      },
    },
  ];
}

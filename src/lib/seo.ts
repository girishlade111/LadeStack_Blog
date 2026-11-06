import { SUPPORTED_LOCALES, type Locale } from '../data/locales';
import { AUTHOR_REGISTRY, SITE_CONFIG } from '../data/site';
import { buildCanonicalUrl, getPostUrl } from '../i18n/urls';
import { getAvailableTranslations } from './translations';
import type { BlogEntry } from './validators';

export interface HreflangAlternate {
  hreflang: Locale | 'x-default';
  href: string;
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

export function buildArticleJsonLd(entry: BlogEntry): Record<string, unknown> {
  const canonicalUrl = buildCanonicalUrl(
    getPostUrl(entry.data.lang, entry.data.slug)
  );
  const author = AUTHOR_REGISTRY[entry.data.authorId];
  const imageUrl = buildCanonicalUrl(
    entry.data.coverImage || SITE_CONFIG.defaultOgImage
  );

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
    image: [imageUrl],
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

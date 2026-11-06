import { SUPPORTED_LOCALES, type Locale } from '../data/locales';
import { getPostUrl, getHomeUrl } from '../i18n/urls';
import { loadAllBlogEntries } from './content-loader';
import { getTagPosts } from './posts';
import type { BlogEntry } from './validators';

export interface TranslationVariantInfo {
  locale: Locale;
  url: string;
  title: string;
  slug: string;
  publishedAt: Date;
}

export function getStoryGroup(translationKey: string): Map<Locale, BlogEntry> {
  const all = loadAllBlogEntries();
  const group = new Map<Locale, BlogEntry>();
  for (const entry of all) {
    if (entry.data.translationKey === translationKey) {
      group.set(entry.data.lang, entry);
    }
  }
  return group;
}

export function getAvailableTranslations(
  translationKeyOrEntry: string | BlogEntry
): TranslationVariantInfo[] {
  const key =
    typeof translationKeyOrEntry === 'string'
      ? translationKeyOrEntry
      : translationKeyOrEntry.data.translationKey;

  const group = getStoryGroup(key);
  const result: TranslationVariantInfo[] = [];

  for (const locale of SUPPORTED_LOCALES) {
    const entry = group.get(locale);
    if (entry && entry.data.status === 'published' && !entry.data.noindex) {
      result.push({
        locale,
        url: getPostUrl(locale, entry.data.slug),
        title: entry.data.title,
        slug: entry.data.slug,
        publishedAt: entry.data.publishedAt,
      });
    }
  }

  return result;
}

export interface LocaleSwitchOption {
  locale: Locale;
  href: string;
  isAvailableArticleVariant: boolean;
  isCurrent: boolean;
}

export function buildLocaleSwitchOptions(
  currentLocale: Locale,
  options: {
    translationKey?: string;
    categorySlug?: string;
    tagSlug?: string;
    staticRoute?: 'home' | 'articles' | 'search' | 'about' | 'editorial-policy' | 'privacy';
  }
): LocaleSwitchOption[] {
  const publishedVariants = options.translationKey
    ? new Map(
        getAvailableTranslations(options.translationKey).map((v) => [
          v.locale,
          v.url,
        ])
      )
    : null;

  return SUPPORTED_LOCALES.map((locale) => {
    const prefix = locale === 'en' ? '' : `/${locale}`;
    let href = getHomeUrl(locale);
    let isAvailableArticleVariant = true;

    if (publishedVariants) {
      const variantUrl = publishedVariants.get(locale);
      if (variantUrl) {
        href = variantUrl;
        isAvailableArticleVariant = true;
      } else {
        href = getHomeUrl(locale);
        isAvailableArticleVariant = false;
      }
    } else if (options.categorySlug) {
      href = `${prefix}/category/${options.categorySlug}/`;
    } else if (options.tagSlug) {
      if (getTagPosts(options.tagSlug, locale).length > 0) {
        href = `${prefix}/tags/${encodeURIComponent(options.tagSlug)}/`;
        isAvailableArticleVariant = true;
      } else {
        href = getHomeUrl(locale);
        isAvailableArticleVariant = false;
      }
    } else if (options.staticRoute && options.staticRoute !== 'home') {
      href = `${prefix}/${options.staticRoute}/`;
    }

    return {
      locale,
      href,
      isAvailableArticleVariant,
      isCurrent: locale === currentLocale,
    };
  });
}

import test from 'node:test';
import assert from 'node:assert/strict';
import { SUPPORTED_LOCALES, isValidLocale } from '../data/locales';
import { CATEGORY_IDS, isValidCategoryId, getCategoryMeta } from '../data/categories';
import {
  getHomeUrl,
  getPostUrl,
  getCategoryUrl,
  buildCanonicalUrl,
} from '../i18n/urls';
import { loadAllBlogEntries, slugifyHeading } from './content-loader';
import { getPublishedPosts, getPostBySlug, getCategoryPosts } from './posts';
import { getAvailableTranslations, buildLocaleSwitchOptions } from './translations';
import { buildArticleAlternates } from './seo';
import { paginateItems } from './pagination';

test('supports exactly the 9 locked locales with English as unprefixed default', () => {
  assert.equal(SUPPORTED_LOCALES.length, 9);
  assert.equal(isValidLocale('en'), true);
  assert.equal(isValidLocale('ja'), true);
  assert.equal(isValidLocale('de'), false);
  assert.equal(getHomeUrl('en'), '/');
  assert.equal(getHomeUrl('ja'), '/ja/');
  assert.equal(getPostUrl('en', 'astro-seo-basics'), '/posts/astro-seo-basics/');
  assert.equal(getPostUrl('fr', 'guide-seo-astro'), '/fr/posts/guide-seo-astro/');
});

test('supports all 19 permanent categories with localized labels across all 9 locales', () => {
  assert.equal(CATEGORY_IDS.length, 19);
  for (const id of CATEGORY_IDS) {
    assert.equal(isValidCategoryId(id), true);
    for (const locale of SUPPORTED_LOCALES) {
      const meta = getCategoryMeta(id, locale);
      assert.ok(meta.label.length > 0, `Missing label for ${id} in ${locale}`);
      assert.ok(meta.description.length > 0, `Missing description for ${id} in ${locale}`);
    }
  }
  assert.equal(getCategoryUrl('en', 'technology'), '/category/technology/');
  assert.equal(getCategoryUrl('fr', 'technology', 2), '/fr/category/technology/page/2/');
});

test('loads and validates all Markdown content entries and excludes drafts from published queries', () => {
  const allEntries = loadAllBlogEntries(true);
  const publishedEntries = getPublishedPosts();

  assert.ok(allEntries.length > publishedEntries.length, 'Should include at least one draft test file');
  const draftFr = getPostBySlug('fr', 'corridors-ferroviaires-grande-vitesse');
  assert.equal(draftFr, undefined, 'Draft French article must never appear in getPostBySlug');
});

test('builds reciprocal hreflang alternates only for published variants and handles English-only stories', () => {
  // Multi-locale story: astro-seo-basics has en, ja, ru, fr, es
  const astroAlts = buildArticleAlternates('astro-seo-basics');
  const langs = astroAlts.map((a) => a.hreflang);
  assert.ok(langs.includes('en'));
  assert.ok(langs.includes('ja'));
  assert.ok(langs.includes('fr'));
  assert.ok(langs.includes('es'));
  assert.ok(langs.includes('ru'));
  assert.ok(!langs.includes('ko'), 'Unwritten Korean variant must not appear in hreflang');

  const frAlt = astroAlts.find((a) => a.hreflang === 'fr');
  assert.equal(frAlt?.href, 'https://blog.ladestack.in/fr/posts/guide-seo-astro/');

  // English-only story with a draft French file: high-speed-rail-corridors
  const railAlts = buildArticleAlternates('high-speed-rail-corridors');
  assert.equal(railAlts.length, 1);
  assert.equal(railAlts[0].hreflang, 'en');
  assert.equal(
    railAlts[0].href,
    buildCanonicalUrl('/posts/high-speed-rail-corridors/')
  );
});

test('locale switcher links to translated article when published, and falls back honestly to locale home when unavailable', () => {
  const options = buildLocaleSwitchOptions('en', {
    translationKey: 'astro-seo-basics',
  });
  const frOption = options.find((o) => o.locale === 'fr');
  const koOption = options.find((o) => o.locale === 'ko');

  assert.equal(frOption?.isAvailableArticleVariant, true);
  assert.equal(frOption?.href, '/fr/posts/guide-seo-astro/');
  assert.equal(koOption?.isAvailableArticleVariant, false);
  assert.equal(koOption?.href, '/ko/');
});

test('extracts H2 and H3 headings with deterministic slugs and paginates deterministically', () => {
  const enArticle = getPostBySlug('en', 'astro-seo-basics');
  assert.ok(enArticle);
  assert.ok(enArticle.headings.length >= 4);
  assert.equal(enArticle.headings[0].slug, slugifyHeading(enArticle.headings[0].text));

  const paged = paginateItems([1, 2, 3, 4, 5], 2, 2);
  assert.deepEqual(paged.items, [3, 4]);
  assert.equal(paged.totalPages, 3);
  assert.equal(paged.hasPrev, true);
  assert.equal(paged.hasNext, true);
});

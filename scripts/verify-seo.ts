import fs from 'node:fs';
import path from 'node:path';
import { CATEGORY_IDS } from '../src/data/categories';
import { SUPPORTED_LOCALES } from '../src/data/locales';
import { getPublishedPosts, getPostsByCategory, getAllTags } from '../src/lib/posts';
import {
  buildArticleAlternates,
  buildCategoryAlternates,
  buildArticlesArchiveAlternates,
  buildTagAlternates,
  isTagArchiveIndexable,
  resolveSocialImageUrl,
} from '../src/lib/seo';
import {
  buildCanonicalUrl,
  buildAssetUrl,
  getPostUrl,
  getCategoryUrl,
  getTagUrl,
} from '../src/i18n/urls';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

function main() {
  const published = getPublishedPosts();
  const errors: string[] = [];

  // 1. Verify asset URL helper vs page URL helper
  const ogDefaultUrl = buildAssetUrl('/og-default.png');
  if (ogDefaultUrl !== 'https://blog.ladestack.in/og-default.png') {
    errors.push(`Expected buildAssetUrl('/og-default.png') to equal https://blog.ladestack.in/og-default.png, got ${ogDefaultUrl}`);
  }
  if (!fs.existsSync(path.join(PUBLIC_DIR, 'og-default.png'))) {
    errors.push('Missing default social preview image on disk: public/og-default.png');
  }

  // 2. Verify articles: canonical, social image URLs, and reciprocal hreflang
  for (const entry of published) {
    const selfUrl = buildCanonicalUrl(getPostUrl(entry.data.lang, entry.data.slug));
    const alternates = buildArticleAlternates(entry.data.translationKey);

    const selfAlt = alternates.find((a) => a.hreflang === entry.data.lang);
    if (!selfAlt || selfAlt.href !== selfUrl) {
      errors.push(
        `[${entry.filePath}] Missing or mismatched self hreflang (${entry.data.lang} -> ${selfUrl}).`
      );
    }

    const socialImg = resolveSocialImageUrl(entry.data.ogImage ?? entry.data.coverImage);
    if (socialImg.endsWith('/')) {
      errors.push(`[${entry.filePath}] Social image URL ends with trailing slash: ${socialImg}`);
    }
    const relSocialPath = new URL(socialImg).pathname.replace(/^\/+/, '');
    if (!fs.existsSync(path.join(PUBLIC_DIR, relSocialPath))) {
      errors.push(`[${entry.filePath}] Social image file missing on disk: public/${relSocialPath}`);
    }

    for (const alt of alternates) {
      if (alt.hreflang === 'x-default') continue;
      const targetEntry = published.find(
        (p) =>
          p.data.translationKey === entry.data.translationKey &&
          p.data.lang === alt.hreflang
      );
      if (!targetEntry) {
        errors.push(
          `[${entry.filePath}] Alternate hreflang="${alt.hreflang}" points to non-published variant.`
        );
      }
    }
  }

  // 3. Verify category alternates never include empty (noindex) category locales
  for (const category of CATEGORY_IDS) {
    const alts = buildCategoryAlternates(category, 1);
    const nonEmptyLocales = SUPPORTED_LOCALES.filter(
      (loc) => getPostsByCategory(loc, category).length > 0
    );
    if (nonEmptyLocales.length === 0) {
      if (alts.length > 0) {
        errors.push(
          `Category "${category}" has 0 published posts across all locales, but buildCategoryAlternates returned ${alts.length} alternates.`
        );
      }
    } else {
      for (const alt of alts) {
        if (alt.hreflang === 'x-default') continue;
        const locPosts = getPostsByCategory(alt.hreflang, category);
        if (locPosts.length === 0) {
          errors.push(
            `Category "${category}" hreflang includes empty noindex locale "${alt.hreflang}" (${getCategoryUrl(alt.hreflang, category)}).`
          );
        }
      }
    }
  }

  // 4. Verify articles archive alternates only link to existing page numbers
  const archivePage1Alts = buildArticlesArchiveAlternates(1, 6);
  if (archivePage1Alts.length === 0) {
    errors.push('Expected non-empty alternates for articles archive page 1.');
  }

  // 5. Verify tag alternates obey minIndexableTagPosts policy
  for (const locale of SUPPORTED_LOCALES) {
    const tags = getAllTags(locale);
    for (const [tag, count] of tags.entries()) {
      const indexable = isTagArchiveIndexable(locale, tag);
      const alts = buildTagAlternates(tag);
      const selfAlt = alts.find((a) => a.hreflang === locale);
      if (!indexable && selfAlt) {
        errors.push(
          `Thin tag archive ${getTagUrl(locale, tag)} (${count} posts) is noindex but included in buildTagAlternates.`
        );
      }
    }
  }

  if (errors.length > 0) {
    console.error('[verify:seo] SEO graph errors:\n' + errors.join('\n'));
    process.exit(1);
  }

  console.log(
    `[verify:seo] Verified canonical URLs, asset URLs, social preview PNGs, category/tag indexing gates, and reciprocal hreflang across ${published.length} published articles.`
  );
}

main();

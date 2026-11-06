import { getPublishedPosts } from '../src/lib/posts';
import { buildArticleAlternates } from '../src/lib/seo';
import { buildCanonicalUrl, getPostUrl } from '../src/i18n/urls';

function main() {
  const published = getPublishedPosts();
  const errors: string[] = [];

  for (const entry of published) {
    const selfUrl = buildCanonicalUrl(getPostUrl(entry.data.lang, entry.data.slug));
    const alternates = buildArticleAlternates(entry.data.translationKey);

    const selfAlt = alternates.find((a) => a.hreflang === entry.data.lang);
    if (!selfAlt || selfAlt.href !== selfUrl) {
      errors.push(
        `[${entry.filePath}] Missing or mismatched self hreflang (${entry.data.lang} -> ${selfUrl}).`
      );
    }

    // Verify reciprocity across all alternates in group
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

  if (errors.length > 0) {
    console.error('[verify:seo] SEO graph errors:\n' + errors.join('\n'));
    process.exit(1);
  }

  console.log(
    `[verify:seo] Verified canonical URLs and reciprocal hreflang sets across ${published.length} published articles.`
  );
}

main();

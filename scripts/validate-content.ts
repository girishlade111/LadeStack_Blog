import { loadAllBlogEntries } from '../src/lib/content-loader';
import { getPublishedPosts } from '../src/lib/posts';
import { SUPPORTED_LOCALES } from '../src/data/locales';

function main() {
  const entries = loadAllBlogEntries(true);
  const published = getPublishedPosts();

  const byLocale = Object.fromEntries(
    SUPPORTED_LOCALES.map((loc) => [loc, getPublishedPosts(loc).length])
  );

  console.log(
    `[validate:content] Verified ${entries.length} Markdown files (${published.length} published, ${entries.length - published.length} draft/review).`
  );
  console.log('[validate:content] Published counts by locale:', JSON.stringify(byLocale));
}

main();

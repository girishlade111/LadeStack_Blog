import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import { SUPPORTED_LOCALES, type Locale } from '../data/locales';
import { CATEGORY_IDS, type CategoryId } from '../data/categories';
import { AUTHOR_REGISTRY } from '../data/site';

export const sourceCitationSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
  date: z.string().optional(),
});

export const articleFrontmatterSchema = z.object({
  articleId: z.string().min(1),
  translationKey: z.string().min(1),
  lang: z.enum(SUPPORTED_LOCALES),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase URL-safe kebab-case'),
  title: z.string().min(1),
  description: z.string().min(1),
  summary: z.string().optional(),
  category: z.enum(CATEGORY_IDS),
  tags: z.array(z.string().min(1)).max(8).default([]),
  authorId: z
    .string()
    .min(1)
    .refine((id) => Boolean(AUTHOR_REGISTRY[id]), {
      message: 'authorId must exist in AUTHOR_REGISTRY',
    }),
  status: z.enum(['draft', 'review', 'published']),
  translationType: z.enum(['full', 'adaptation', 'summary']).default('full'),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  reviewedAt: z.coerce.date().optional(),
  originalLang: z.enum(SUPPORTED_LOCALES).default('en'),
  featured: z.boolean().default(false),
  noindex: z.boolean().default(false),
  coverImage: z.string().optional(),
  coverAlt: z.string().optional(),
  coverCredit: z.string().optional(),
  sources: z.array(sourceCitationSchema).default([]),
});

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;

export interface TocHeading {
  depth: 2 | 3;
  text: string;
  slug: string;
}

export interface BlogEntry {
  id: string;
  filePath: string;
  folderLocale: string;
  data: ArticleFrontmatter;
  body: string;
  html: string;
  headings: TocHeading[];
  readingTimeMinutes: number;
}

const RESERVED_SLUGS = new Set([
  'admin',
  'api',
  'articles',
  'category',
  'posts',
  'search',
  'tags',
  'about',
  'editorial-policy',
  'privacy',
  'rss.xml',
  'sitemap.xml',
]);

export function validateContentIndex(entries: readonly BlogEntry[]): string[] {
  const errors: string[] = [];

  const translationLangPairs = new Map<string, string>();
  const langSlugPairs = new Map<string, string>();
  const groups = new Map<
    string,
    {
      articleId: string;
      category: CategoryId;
      variants: Map<Locale, BlogEntry>;
    }
  >();

  for (const entry of entries) {
    const { data, filePath, folderLocale } = entry;

    // Invariant 10: lang must match folder locale
    if (folderLocale !== data.lang) {
      errors.push(
        `[${filePath}] Frontmatter lang "${data.lang}" does not match folder locale "${folderLocale}".`
      );
    }

    // Cover image requires coverAlt and physical file in public/
    if (data.coverImage) {
      if (!data.coverAlt || !data.coverAlt.trim()) {
        errors.push(
          `[${filePath}] coverAlt is required when coverImage is provided.`
        );
      }
      const cleanRel = data.coverImage.replace(/^\/+/, '');
      const absCoverPath = path.resolve(process.cwd(), 'public', cleanRel);
      if (!fs.existsSync(absCoverPath)) {
        errors.push(
          `[${filePath}] coverImage "${data.coverImage}" does not exist at public/${cleanRel}.`
        );
      }
    }

    // Invariant 8: updatedAt cannot precede publishedAt
    if (data.updatedAt && data.updatedAt.getTime() < data.publishedAt.getTime()) {
      errors.push(
        `[${filePath}] updatedAt (${data.updatedAt.toISOString()}) cannot precede publishedAt (${data.publishedAt.toISOString()}).`
      );
    }

    // Reserved slug check
    if (RESERVED_SLUGS.has(data.slug)) {
      errors.push(
        `[${filePath}] Slug "${data.slug}" collides with a reserved route name.`
      );
    }

    // Invariant 1: (translationKey, lang) is unique
    const tkKey = `${data.translationKey}::${data.lang}`;
    if (translationLangPairs.has(tkKey)) {
      errors.push(
        `[${filePath}] Duplicate (translationKey, lang) pair "${tkKey}" already defined in ${translationLangPairs.get(tkKey)}.`
      );
    } else {
      translationLangPairs.set(tkKey, filePath);
    }

    // Invariant 5: (lang, slug) is unique across published posts
    if (data.status === 'published') {
      const lsKey = `${data.lang}::${data.slug}`;
      if (langSlugPairs.has(lsKey)) {
        errors.push(
          `[${filePath}] Duplicate published (lang, slug) pair "${lsKey}" already defined in ${langSlugPairs.get(lsKey)}.`
        );
      } else {
        langSlugPairs.set(lsKey, filePath);
      }
    }

    // Group consistency tracking
    const existingGroup = groups.get(data.translationKey);
    if (!existingGroup) {
      groups.set(data.translationKey, {
        articleId: data.articleId,
        category: data.category,
        variants: new Map([[data.lang, entry]]),
      });
    } else {
      // Invariant 2: same articleId and primary category across translation group
      if (existingGroup.articleId !== data.articleId) {
        errors.push(
          `[${filePath}] Mismatched articleId "${data.articleId}" in translationKey "${data.translationKey}" (expected "${existingGroup.articleId}").`
        );
      }
      if (existingGroup.category !== data.category) {
        errors.push(
          `[${filePath}] Mismatched category "${data.category}" in translationKey "${data.translationKey}" (expected "${existingGroup.category}").`
        );
      }
      existingGroup.variants.set(data.lang, entry);
    }
  }

  // Invariant 3, 7 & Translation Structural Completeness
  for (const [translationKey, group] of groups.entries()) {
    const enEntry = group.variants.get('en');
    const publishedNonEn = Array.from(group.variants.values()).filter(
      (v) => v.data.lang !== 'en' && v.data.status === 'published'
    );

    if (publishedNonEn.length > 0) {
      if (!enEntry || enEntry.data.status !== 'published') {
        errors.push(
          `[translationKey:${translationKey}] Published non-English variants exist (${publishedNonEn
            .map((v) => v.data.lang)
            .join(', ')}), but the English original is missing or not published.`
        );
      } else {
        const enTableLines = (enEntry.body.match(/^\|/gm) ?? []).length;
        const enCodeFences = (enEntry.body.match(/```/g) ?? []).length;

        for (const variant of publishedNonEn) {
          if (
            variant.data.publishedAt.getTime() <
            enEntry.data.publishedAt.getTime()
          ) {
            errors.push(
              `[${variant.filePath}] Translation publishedAt (${variant.data.publishedAt.toISOString()}) precedes English original publishedAt (${enEntry.data.publishedAt.toISOString()}).`
            );
          }

          if (variant.data.translationType === 'full') {
            if (variant.headings.length !== enEntry.headings.length) {
              errors.push(
                `[${variant.filePath}] Incomplete translation heading structure: found ${variant.headings.length} H2/H3 headings, expected ${enEntry.headings.length} matching English source.`
              );
            }
            const varTableLines = (variant.body.match(/^\|/gm) ?? []).length;
            if (varTableLines !== enTableLines) {
              errors.push(
                `[${variant.filePath}] Incomplete translation table structure: found ${varTableLines} table rows, expected ${enTableLines} matching English source.`
              );
            }
            const varCodeFences = (variant.body.match(/```/g) ?? []).length;
            if (varCodeFences !== enCodeFences) {
              errors.push(
                `[${variant.filePath}] Incomplete translation code blocks: found ${varCodeFences / 2} code blocks, expected ${enCodeFences / 2} matching English source.`
              );
            }
            if (variant.data.sources.length !== enEntry.data.sources.length) {
              errors.push(
                `[${variant.filePath}] Incomplete translation citations: found ${variant.data.sources.length} sources, expected ${enEntry.data.sources.length} matching English source.`
              );
            }
          }
        }
      }
    }
  }

  return errors;
}

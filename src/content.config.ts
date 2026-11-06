import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { articleFrontmatterSchema } from './lib/validators';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: articleFrontmatterSchema,
});

export const collections = { blog };

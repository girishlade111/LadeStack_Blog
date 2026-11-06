import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import {
  articleFrontmatterSchema,
  validateContentIndex,
  type BlogEntry,
  type TocHeading,
} from './validators';
import { calculateReadingTimeMinutes } from './reading-time';

export function slugifyHeading(rawText: string, seenCounts?: Map<string, number>): string {
  const stripped = rawText
    .replace(/<[^>]+>/g, '')
    .replace(/[`*_~[\]()]/g, '')
    .trim()
    .toLowerCase();

  let base = stripped
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  if (!base) {
    base = 'section';
  }

  if (!seenCounts) {
    return base;
  }

  const count = seenCounts.get(base) ?? 0;
  seenCounts.set(base, count + 1);
  return count === 0 ? base : `${base}-${count}`;
}

function parseSimpleYamlFrontmatter(rawFile: string, filePath: string): {
  frontmatter: Record<string, unknown>;
  body: string;
} {
  const normalized = rawFile.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) {
    throw new Error(`[${filePath}] Missing opening YAML frontmatter delimiter ---`);
  }

  const endMarkerIndex = normalized.indexOf('\n---\n', 4);
  if (endMarkerIndex === -1) {
    throw new Error(`[${filePath}] Missing closing YAML frontmatter delimiter ---`);
  }

  const yamlText = normalized.slice(4, endMarkerIndex);
  const body = normalized.slice(endMarkerIndex + 5).trim();

  const result: Record<string, unknown> = {};
  const lines = yamlText.split('\n');
  let i = 0;

  const stripQuotes = (val: string): string => {
    const trimmed = val.trim();
    if (
      (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))
    ) {
      return trimmed.slice(1, -1);
    }
    return trimmed;
  };

  const parseScalar = (val: string): unknown => {
    const trimmed = val.trim();
    if (trimmed === 'true') return true;
    if (trimmed === 'false') return false;
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      const inner = trimmed.slice(1, -1).trim();
      if (!inner) return [];
      return inner.split(',').map((item) => stripQuotes(item));
    }
    return stripQuotes(trimmed);
  };

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith('#')) {
      i++;
      continue;
    }

    const match = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!match) {
      i++;
      continue;
    }

    const key = match[1];
    const rest = match[2].trim();

    if (rest !== '') {
      result[key] = parseScalar(rest);
      i++;
    } else {
      // Multi-line array of strings or objects
      const arrayItems: unknown[] = [];
      i++;
      while (i < lines.length && (lines[i].startsWith('  ') || !lines[i].trim())) {
        const subLine = lines[i];
        if (!subLine.trim() || subLine.trim().startsWith('#')) {
          i++;
          continue;
        }
        const itemMatch = subLine.match(/^\s*-\s+(.*)$/);
        if (itemMatch) {
          const itemRest = itemMatch[1].trim();
          const kvMatch = itemRest.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
          if (kvMatch) {
            const obj: Record<string, unknown> = {
              [kvMatch[1]]: parseScalar(kvMatch[2]),
            };
            i++;
            while (
              i < lines.length &&
              /^\s{4,}[A-Za-z0-9_]+:/.test(lines[i])
            ) {
              const propMatch = lines[i].match(/^\s+([A-Za-z0-9_]+):\s*(.*)$/);
              if (propMatch) {
                obj[propMatch[1]] = parseScalar(propMatch[2]);
              }
              i++;
            }
            arrayItems.push(obj);
          } else {
            arrayItems.push(parseScalar(itemRest));
            i++;
          }
        } else {
          i++;
        }
      }
      result[key] = arrayItems;
    }
  }

  return { frontmatter: result, body };
}

export function renderMarkdownWithToc(markdown: string): {
  html: string;
  headings: TocHeading[];
} {
  const headings: TocHeading[] = [];
  const seenSlugs = new Map<string, number>();

  const renderer = new marked.Renderer();

  renderer.heading = ({ tokens, depth }) => {
    const text = tokens.map((t) => ('raw' in t ? t.raw : '')).join('').replace(/[`*_~]/g, '').trim();
    const inlineHtml = marked.Parser.parseInline(tokens);
    const slug = slugifyHeading(text, seenSlugs);

    if (depth === 2 || depth === 3) {
      headings.push({
        depth: depth as 2 | 3,
        text,
        slug,
      });
    }

    return `<h${depth} id="${slug}" class="article-heading article-h${depth}"><a href="#${slug}" class="heading-anchor" aria-label="${text.replace(/"/g, '&quot;')}">${inlineHtml}</a></h${depth}>\n`;
  };

  renderer.code = ({ text, lang }) => {
    const language = (lang || 'text').trim();
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<div class="code-block-wrapper" data-code-block><div class="code-block-header"><span class="code-lang">${language}</span><button type="button" class="code-copy-btn" data-copy-code aria-label="Copy ${language} code">Copy</button></div><pre tabindex="0"><code class="language-${language}">${escaped}</code></pre></div>\n`;
  };

  renderer.table = (token) => {
    const headerCells = token.header
      .map((cell) => `<th scope="col">${marked.Parser.parseInline(cell.tokens)}</th>`)
      .join('');
    const bodyRows = token.rows
      .map(
        (row) =>
          `<tr>${row
            .map((cell) => `<td>${marked.Parser.parseInline(cell.tokens)}</td>`)
            .join('')}</tr>`
      )
      .join('');
    return `<div class="table-scroll-container" tabindex="0" role="region" aria-label="Data table"><table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table></div>\n`;
  };

  const html = marked.parse(markdown, {
    renderer,
    gfm: true,
    breaks: false,
  }) as string;

  return { html, headings };
}

function walkMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const results: string[] = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      results.push(...walkMarkdownFiles(full));
    } else if (item.isFile() && item.name.endsWith('.md')) {
      results.push(full);
    }
  }
  return results.sort();
}

let cachedEntries: BlogEntry[] | null = null;

export function loadAllBlogEntries(forceReload = false): BlogEntry[] {
  if (cachedEntries && !forceReload) {
    return cachedEntries;
  }

  const contentRoot = path.resolve(process.cwd(), 'src/content/blog');
  const files = walkMarkdownFiles(contentRoot);
  const entries: BlogEntry[] = [];

  for (const absPath of files) {
    const relPath = path.relative(contentRoot, absPath).replace(/\\/g, '/');
    const folderLocale = relPath.split('/')[0] || '';
    const raw = fs.readFileSync(absPath, 'utf-8');
    const { frontmatter, body } = parseSimpleYamlFrontmatter(raw, relPath);
    const parsedData = articleFrontmatterSchema.parse(frontmatter);
    const { html, headings } = renderMarkdownWithToc(body);
    const readingTimeMinutes = calculateReadingTimeMinutes(body, parsedData.lang);

    entries.push({
      id: relPath.replace(/\.md$/, ''),
      filePath: `src/content/blog/${relPath}`,
      folderLocale,
      data: parsedData,
      body,
      html,
      headings,
      readingTimeMinutes,
    });
  }

  const invariantErrors = validateContentIndex(entries);
  if (invariantErrors.length > 0) {
    throw new Error(
      `Content validation failed:\n${invariantErrors.map((e) => ` - ${e}`).join('\n')}`
    );
  }

  cachedEntries = entries;
  return entries;
}

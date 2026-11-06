import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve(process.cwd(), 'dist');

function walkHtmlFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkHtmlFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

function resolveInternalTarget(href: string): boolean {
  const withoutHash = href.split('#')[0].split('?')[0];
  if (!withoutHash || withoutHash === '/') {
    return fs.existsSync(path.join(DIST_DIR, 'index.html'));
  }

  const relativePath = withoutHash.replace(/^\/+/, '');
  const directFile = path.join(DIST_DIR, relativePath);
  const indexFile = path.join(DIST_DIR, relativePath, 'index.html');
  const htmlFile = path.join(DIST_DIR, `${relativePath.replace(/\/+$/, '')}.html`);

  return (
    (fs.existsSync(directFile) && fs.statSync(directFile).isFile()) ||
    fs.existsSync(indexFile) ||
    fs.existsSync(htmlFile)
  );
}

function main() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('Link audit failed: dist/ directory does not exist. Run npm run build first.');
    process.exit(1);
  }

  const htmlFiles = walkHtmlFiles(DIST_DIR);
  const brokenLinks: string[] = [];
  let totalChecked = 0;

  for (const file of htmlFiles) {
    const rel = path.relative(DIST_DIR, file);
    const html = fs.readFileSync(file, 'utf-8');
    const hrefMatches = [...html.matchAll(/\bhref="([^"]+)"/gi)];

    for (const match of hrefMatches) {
      const href = match[1];
      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#')
      ) {
        if (href.startsWith('#') && href.length > 1) {
          const targetId = href.slice(1);
          if (!html.includes(`id="${targetId}"`)) {
            brokenLinks.push(`${rel}: missing in-page anchor ${href}`);
          }
        }
        continue;
      }

      if (href.startsWith('/')) {
        totalChecked++;
        if (!resolveInternalTarget(href)) {
          brokenLinks.push(`${rel}: broken internal link "${href}"`);
        }
      }
    }
  }

  if (brokenLinks.length > 0) {
    console.error('Internal link audit failed:');
    for (const err of brokenLinks) {
      console.error(`  - ${err}`);
    }
    process.exit(1);
  }

  console.log(
    `[verify:links] Verified ${totalChecked} internal links and in-page anchors across ${htmlFiles.length} built HTML pages with 0 broken links.`
  );
}

main();

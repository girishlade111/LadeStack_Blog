import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

function copyDirectoryRecursive(src: string, dest: string) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirectoryRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function main() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const distPagefindDir = path.join(distDir, 'pagefind');
  const publicPagefindDir = path.resolve(process.cwd(), 'public/pagefind');
  const pagefindBin = path.resolve(process.cwd(), 'node_modules/.bin/pagefind');

  if (!fs.existsSync(distDir)) {
    // During initial `npm run dev` before `dist` exists, if public/pagefind already has pagefind.js, keep it
    if (fs.existsSync(path.join(publicPagefindDir, 'pagefind.js'))) {
      console.log('[build:search] Using existing official Pagefind bundle in public/pagefind.');
      return;
    }
    console.log('[build:search] dist/ not found; running astro build first to generate HTML for Pagefind.');
    const astroBin = path.resolve(process.cwd(), 'node_modules/.bin/astro');
    execFileSync(astroBin, ['build'], { stdio: 'inherit' });
  }

  // Clean any legacy custom index-*.json files from public/pagefind and dist/pagefind
  if (fs.existsSync(publicPagefindDir)) {
    fs.rmSync(publicPagefindDir, { recursive: true, force: true });
  }
  if (fs.existsSync(distPagefindDir)) {
    fs.rmSync(distPagefindDir, { recursive: true, force: true });
  }

  // Run the official Pagefind CLI on the built static HTML in dist/
  execFileSync(
    pagefindBin,
    ['--site', distDir, '--output-subdir', 'pagefind'],
    { stdio: 'inherit' }
  );

  // Sync dist/pagefind to public/pagefind so `astro dev` serves the exact same official Pagefind bundle
  copyDirectoryRecursive(distPagefindDir, publicPagefindDir);
  console.log('[build:search] Official Pagefind index generated in dist/pagefind and synced to public/pagefind.');
}

main();

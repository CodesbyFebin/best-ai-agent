#!/usr/bin/env tsx

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';

type LegacyManifest = { canonicalUrl?: string; slug?: string; id?: string };

const root = resolve(import.meta.dirname, '..');
const quarantinePath = join(root, 'quarantine', '21k-manifest-data.json');

if (!existsSync(quarantinePath)) {
  console.error('Quarantine check failed: quarantine/21k-manifest-data.json is missing.');
  process.exit(1);
}

const manifests = JSON.parse(readFileSync(quarantinePath, 'utf8')) as LegacyManifest[];
const quarantinedPaths = new Set(
  manifests.flatMap((manifest) => {
    if (!manifest.canonicalUrl) return [];
    try {
      const pathname = new URL(manifest.canonicalUrl).pathname;
      return [normalizePath(pathname)];
    } catch {
      return [normalizePath(manifest.canonicalUrl)];
    }
  }),
);

function normalizePath(value: string): string {
  const withoutQuery = value.split(/[?#]/, 1)[0] || '/';
  const withLeadingSlash = withoutQuery.startsWith('/') ? withoutQuery : `/${withoutQuery}`;
  return withLeadingSlash === '/' ? '/' : withLeadingSlash.replace(/\/+$/, '');
}

function walk(directory: string): string[] {
  if (!existsSync(directory)) return [];
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const routeRegistry = join(root, 'src', 'routing', 'routeRegistry.ts');
const routeSource = readFileSync(routeRegistry, 'utf8');
const routePaths = [...routeSource.matchAll(/\b(?:path|canonicalPath):\s*['"]([^'"]+)['"]/g)]
  .map((match) => normalizePath(match[1]));

const sitemapFiles = [
  ...walk(join(root, 'public')),
  ...walk(join(root, 'dist')),
].filter((file) => extname(file) === '.xml');

const sitemapPaths = sitemapFiles.flatMap((file) => {
  const xml = readFileSync(file, 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
    try {
      return normalizePath(new URL(match[1]).pathname);
    } catch {
      return normalizePath(match[1]);
    }
  });
});

const conflicts = new Map<string, Set<string>>();
for (const path of routePaths) {
  if (quarantinedPaths.has(path)) {
    (conflicts.get(path) ?? conflicts.set(path, new Set()).get(path)!).add(relative(root, routeRegistry));
  }
}
for (const path of sitemapPaths) {
  if (quarantinedPaths.has(path)) {
    (conflicts.get(path) ?? conflicts.set(path, new Set()).get(path)!).add('generated sitemap XML');
  }
}

if (conflicts.size > 0) {
  console.error(`Quarantine check failed: ${conflicts.size} legacy URL(s) entered a route or sitemap.`);
  for (const [path, sources] of [...conflicts].slice(0, 50)) {
    console.error(`- ${path} (${[...sources].join(', ')})`);
  }
  process.exit(1);
}

console.log(`Quarantine check passed: ${manifests.length.toLocaleString()} legacy manifests remain isolated.`);

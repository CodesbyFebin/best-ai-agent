/**
 * ATLAS P01 — Canonical URL utilities.
 * Single, enforced site origin. Every canonical, sitemap URL, JSON-LD
 * identifier, OG URL and absolute internal link must go through here.
 */
export const SITE_ORIGIN = 'https://bestaiagent.in';

/**
 * Build an absolute canonical URL for a path.
 * - Root stays root.
 * - Non-root paths get a trailing slash (the site's established convention).
 * - Fragments, query strings and duplicate slashes are stripped.
 */
export function canonicalUrl(path: string): string {
  const clean = normalizePathForCanonical(path);
  if (clean === '/') return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${clean}/`;
}

/** Canonical path only (no origin), with trailing slash for non-root. */
export function canonicalPathWithSlash(path: string): string {
  const clean = normalizePathForCanonical(path);
  return clean === '/' ? '/' : `${clean}/`;
}

/** Path with no origin, no trailing slash (used for registry keys / matching). */
export function normalizePathForCanonical(path: string): string {
  let p = (path || '').trim();
  // Strip fragment and query
  p = p.split('#')[0].split('?')[0];
  // Lowercase the path (hostnames/paths are case-insensitive for SEO canonicalization)
  p = p.toLowerCase();
  // Collapse duplicate slashes
  p = p.replace(/\/{2,}/g, '/');
  // Remove index.html
  p = p.replace(/\/index\.html$/, '/');
  // Remove trailing slash unless root
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  if (!p.startsWith('/')) p = `/${p}`;
  return p || '/';
}

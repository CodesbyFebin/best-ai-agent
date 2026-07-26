/**
 * ATLAS P01 — Path normalization for route resolution.
 * Handles duplicate slashes, trailing slash, uppercase, encoded segments,
 * index.html aliases, fragments and query strings.
 *
 * Fragments are NEVER used for application routing (enforced by build check).
 */
export function normalizePath(input: string): string {
  let p = (input || '').trim();

  // Strip fragment + query entirely (no hash routing)
  p = p.split('#')[0].split('?')[0];

  // Lowercase (paths are case-insensitive for SEO)
  p = p.toLowerCase();

  // Decode percent-encoded path segments (e.g. %20 → space) then re-normalize.
  try {
    p = decodeURIComponent(p);
  } catch {
    // malformed encoding — leave as-is so resolver returns 404 for junk
  }

  // Collapse duplicate slashes
  p = p.replace(/\/{2,}/g, '/');

  // index.html alias
  p = p.replace(/\/index\.html$/, '/');

  // Remove trailing slash unless root
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);

  if (!p.startsWith('/')) p = `/${p}`;
  return p || '/';
}

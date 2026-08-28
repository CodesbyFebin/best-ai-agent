/**
 * ATLAS W0/W1 — Registry routes.
 *
 * Exports Wave 0 (trust/methodology) and Wave 1 (Pillar 01 + 10 clusters) routes
 * as RouteRecord-shaped entries. The routing layer merges these into the canonical
 * route registry, or consumes them independently.
 *
 * Trust routes are exposed at /trust/<slug>; pillar and cluster routes are exposed
 * at their canonical paths (e.g. /ai-agents, /agentic-workflows).
 *
 * Lifecycle discipline: only entries with `publicationEligible === true` and
 * `lifecycleStatus === 'published'` should enter the live sitemap. Evidence-ready
 * entries are routed but not indexed until they pass review.
 */

import type { RouteRecord } from '../../routing/types.js';
import { CONTENT_REGISTRY, type ContentRecord } from './content-registry.js';

function mapToRouteRecord(record: ContentRecord): RouteRecord {
  const indexable =
    record.publicationEligible && record.lifecycleStatus === 'published';
  return {
    id: `registry:${record.inventoryId}`,
    path: record.canonicalUrl,
    canonicalPath: record.canonicalUrl,
    type: record.pageClass === 'pillar' ? 'pillar' : 'cluster',
    status: record.lifecycleStatus === 'published' ? 'published' : 'draft',
    indexable,
    title: record.inventoryId, // Title is rendered from MDX frontmatter at runtime.
    description: '',            // Description is rendered from MDX frontmatter.
    sitemapGroup: 'pages',
    parentPath: record.parentPillarSlug ? `/${record.parentPillarSlug}` : undefined,
    updatedAt: record.lastReviewed,
  };
}

/** All Wave 0 + Wave 1 registry entries projected to RouteRecord. */
export const W0W1_ROUTES: RouteRecord[] = CONTENT_REGISTRY.map(mapToRouteRecord);

/** Map from canonical URL -> RouteRecord for fast lookup. */
export const W0W1_ROUTE_MAP: Record<string, RouteRecord> = Object.fromEntries(
  W0W1_ROUTES.map((r) => [r.canonicalPath, r]),
);

/** Indexable subset for sitemap inclusion. */
export const W0W1_INDEXABLE: RouteRecord[] = W0W1_ROUTES.filter((r) => r.indexable);

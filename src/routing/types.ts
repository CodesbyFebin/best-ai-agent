export type RouteType =
  | 'home'
  | 'pillar'
  | 'cluster'
  | 'category'
  | 'directory'
  | 'agent'
  | 'comparison'
  | 'pricing'
  | 'alternative'
  | 'research'
  | 'benchmark'
  | 'guide'
  | 'tutorial'
  | 'glossary'
  | 'author'
  | 'mcp-server'
  | 'mcp-category'
  | 'governance'
  | 'calculator';

export type PublicationStatus =
  | 'published'
  | 'draft'
  | 'review'
  | 'archived'
  | 'redirect';

export type SitemapGroup =
  | 'pages'
  | 'agents'
  | 'categories'
  | 'comparisons'
  | 'reviews'
  | 'pricing'
  | 'alternatives'
  | 'frameworks'
  | 'mcp'
  | 'research'
  | 'authors';

export interface RouteRecord {
  /**
   * Stable unique id (e.g. "agent:cursor"). Required for dynamically-resolved
   * routes; for static registry records it is derived from the path key when absent.
   */
  id?: string;
  path: string;
  canonicalPath: string;
  type: RouteType;
  title: string;
  description: string;
  status: PublicationStatus;
  indexable: boolean;
  sitemapGroup: SitemapGroup;
  /** Optional: the data-layer entity backing this route.
   */
  entityId?: string;
  /** Optional: parent pillar path for breadcrumbs / internal linking.
   */
  parentPath?: string;
  /** Optional: semantic cluster id.
   */
  clusterId?: string;
  /** Optional: view hint for UI rendering (e.g. 'home', 'silo-pillar', 'article').
   */
  view?: string;
  updatedAt?: string;
  /** Optional: destination for redirect-status routes.
   */
  redirectTo?: string;
  /** Optional: alternate paths that resolve to this canonical route.
   */
  aliases?: string[];
}
// ============================================
// Content OS Contracts — Phase C
// File: engine/content/contracts/ContentManifest.ts
// Status: Frozen (v1.0.0)
// Contract Only — No Implementation
// ============================================

/**
 * Entity type enumeration — canonical entity kinds in the Knowledge Graph.
 */
export enum EntityType {
  AGENT = 'agent',
  CATEGORY = 'category',
  COMPARISON = 'comparison',
  RESEARCH = 'research'
}

/**
 * Content type enumeration — page templates the Blueprint Engine can render.
 */
export enum ContentType {
  PRODUCT_DETAIL = 'product_detail',
  CATEGORY_OVERVIEW = 'category_overview',
  COMPARISON_PAGE = 'comparison_page',
  RESEARCH_ARTICLE = 'research_article',
  LANDING_PAGE = 'landing_page'
}

/**
 * Editorial state machine — tracks content status through the lifecycle.
 */
export enum EditorialState {
  DRAFTING = 'drafting',
  READY_FOR_REVIEW = 'ready_for_review',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PUBLISHED = 'published'
}

/**
 * Publication status — high-level lifecycle state.
 */
export enum ContentStatus {
  DRAFT = 'draft',
  IN_REVIEW = 'in_review',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

/**
 * SEO metadata — search engine optimization fields.
 */
export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

/**
 * Build metadata — CI/build provenance.
 */
export interface BuildMetadata {
  buildId: string;
  generatedAt: string;
  blueprintVersion: string;
  contentVersion: string;
}

/**
 * Quality metadata — validation results and scoring.
 */
export interface QualityMetadata {
  score: number;
  passed: boolean;
  lastValidated: string;
  validatorVersion: string;
}

/**
 * Editorial metadata — workflow and review info.
 */
export interface EditorialMetadata {
  state: EditorialState;
  reviewer?: string;
  reviewedAt?: string;
  revisionNotes?: string;
}

/**
 * Manifest metadata bundle — aggregates all metadata into one field.
 */
export interface ManifestMetadata {
  seo: SeoMetadata;
  build: BuildMetadata;
  quality: QualityMetadata;
  editorial: EditorialMetadata;
}

/**
 * ContentManifest — the single source of truth for every page.
 *
 * Invariants (immutable rules):
 * 1. id is globally unique (format: "manifest:page:{contentType}:{slug}")
 * 2. canonicalUrl matches https://bestaiagent.in/* and is unique
 * 3. entityId is "{type}/{slug}" and references an existing graph node
 * 4. blueprintId exists in blueprint registry
 * 5. For PUBLISHED pages: metadata.quality.passed === true
 * 6. Build metadata (generatedAt) is immutable after publication
 * 7. slug is URL-safe (alphanumeric, hyphens only)
 * 8. Manifest fields are immutable after PUBLISHED (except build metadata)
 */
export interface ContentManifest {
  // Identity
  id: string;                    // Globally unique: "manifest:page:product:slug"
  slug: string;                  // URL-safe identifier: "cursor-ai"
  canonicalUrl: string;          // Full URL: "https://bestaiagent.in/agents/cursor-ai/"

  // Entity association
  entityId: string;              // Graph node ID: "agent/cursor-ai"
  entityType: EntityType;        // Canonical entity type
  blueprintId: string;           // Blueprint to use: "product-detail-v1"

  // Graph integration
  graphNodeId: string;           // Same as entityId (canonical)

  // Lifecycle
  contentType: ContentType;
  status: ContentStatus;
  language: string;              // BCP 47: "en-US"
  version: string;               // Semantic: "1.0.0"

  // Timestamps
  createdAt: string;             // ISO 8601
  updatedAt: string;             // ISO 8601

  // Metadata bundle
  metadata: ManifestMetadata;
}

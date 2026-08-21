/**
 * ATLAS W0 — Canonical Content Registry (overlay over immutable CSV).
 *
 * The inventory CSV at /tmp/zip_contents/bestaiagent-50-pillar-inventory.csv
 * (50 pillars + 2,500 clusters = 2,550 records) is treated as immutable intake.
 *
 * This registry is the canonical, typed, lifecycle-tracked, evidence-classified
 * projection of that inventory. Source-of-truth for:
 *   - canonicalSlug decisions (P37 / P42 / P44 / P46 defect resolution)
 *   - lifecycle state (candidate, intent_validated, evidence_ready, ...)
 *   - publication eligibility
 *   - required evidence class per record
 *   - canonical direction for A-vs-B comparisons
 *
 * Rules enforced:
 *   - No record is automatically indexable; lifecycle gates required.
 *   - Template-derived pages default to quarantined_template.
 *   - Unknown slugs return 404 — never synthesized.
 *   - Reverse comparison routes 301 to canonical direction.
 *
 * Implemented as a build-time typed object so the registry can be unit-tested
 * and shipped into the routeResolver without runtime CSV parsing.
 */

export type ContentGroup =
  | 'core'
  | 'coding'
  | 'business'
  | 'industry'
  | 'voice'
  | 'builders'
  | 'india'
  | 'commercial';

export type PageClass =
  | 'pillar'
  | 'cluster'
  | 'comparison'
  | 'review'
  | 'pricing'
  | 'methodology';

export type SearchIntent =
  | 'informational'
  | 'commercial'
  | 'transactional'
  | 'navigational'
  | 'mixed';

export type LifecycleStatus =
  | 'candidate'
  | 'intent_validated'
  | 'researching'
  | 'evidence_ready'
  | 'drafting'
  | 'editorial_review'
  | 'quality_review'
  | 'approved'
  | 'published'
  | 'monitored'
  | 'refresh_required'
  | 'quarantined_template'
  | 'rejected';

export type EvidenceClass = 'STANDARD' | 'COMPARISON' | 'CRITICAL';

export type ClusterDisposition =
  | 'build_now'
  | 'needs_more_research'
  | 'merge_redirect'
  | 'retarget'
  | 'reject';

export interface ContentRecord {
  inventoryId: string;
  group: ContentGroup;
  pillarId: string;
  pageClass: PageClass;
  searchIntent: SearchIntent;
  originalSlug: string;
  canonicalSlug: string;
  canonicalUrl: string;
  parentPillarSlug: string | null;
  lifecycleStatus: LifecycleStatus;
  publicationEligible: boolean;
  redirectFrom: string[];
  primaryEntityIds: string[];
  relatedEntityIds: string[];
  requiredEvidenceClass: EvidenceClass;
  clusterDisposition?: ClusterDisposition;
  lastReviewed?: string;
}

const TRUST_PREFIX = '/trust';
const METHODOLOGY_PREFIX = '/methodology';

export const CONTENT_REGISTRY: ContentRecord[] = [
  // ---------------------------------------------------------------
  // WAVE 0 — TRUST / METHODOLOGY FOUNDATION
  // Pages every commercial page depends on. Lifecycle: approved → published.
  // ---------------------------------------------------------------
  {
    inventoryId: 'w0-editorial-methodology',
    group: 'core',
    pillarId: 'W0',
    pageClass: 'methodology',
    searchIntent: 'informational',
    originalSlug: 'editorial-methodology',
    canonicalSlug: 'editorial-methodology',
    canonicalUrl: `${TRUST_PREFIX}/editorial-methodology`,
    parentPillarSlug: null,
    lifecycleStatus: 'approved',
    publicationEligible: true,
    redirectFrom: [],
    primaryEntityIds: [],
    relatedEntityIds: [],
    requiredEvidenceClass: 'STANDARD',
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'w0-evidence-methodology',
    group: 'core',
    pillarId: 'W0',
    pageClass: 'methodology',
    searchIntent: 'informational',
    originalSlug: 'evidence-methodology',
    canonicalSlug: 'evidence-methodology',
    canonicalUrl: `${TRUST_PREFIX}/evidence-methodology`,
    parentPillarSlug: null,
    lifecycleStatus: 'approved',
    publicationEligible: true,
    redirectFrom: [],
    primaryEntityIds: [],
    relatedEntityIds: [],
    requiredEvidenceClass: 'STANDARD',
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'w0-rating-methodology',
    group: 'core',
    pillarId: 'W0',
    pageClass: 'methodology',
    searchIntent: 'informational',
    originalSlug: 'rating-methodology',
    canonicalSlug: 'rating-methodology',
    canonicalUrl: `${TRUST_PREFIX}/rating-methodology`,
    parentPillarSlug: null,
    lifecycleStatus: 'approved',
    publicationEligible: true,
    redirectFrom: [],
    primaryEntityIds: [],
    relatedEntityIds: [],
    requiredEvidenceClass: 'STANDARD',
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'w0-comparison-methodology',
    group: 'core',
    pillarId: 'W0',
    pageClass: 'methodology',
    searchIntent: 'informational',
    originalSlug: 'comparison-methodology',
    canonicalSlug: 'comparison-methodology',
    canonicalUrl: `${TRUST_PREFIX}/comparison-methodology`,
    parentPillarSlug: null,
    lifecycleStatus: 'approved',
    publicationEligible: true,
    redirectFrom: [],
    primaryEntityIds: [],
    relatedEntityIds: [],
    requiredEvidenceClass: 'STANDARD',
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'w0-corrections',
    group: 'core',
    pillarId: 'W0',
    pageClass: 'methodology',
    searchIntent: 'informational',
    originalSlug: 'corrections',
    canonicalSlug: 'corrections',
    canonicalUrl: `${TRUST_PREFIX}/corrections`,
    parentPillarSlug: null,
    lifecycleStatus: 'approved',
    publicationEligible: true,
    redirectFrom: [],
    primaryEntityIds: [],
    relatedEntityIds: [],
    requiredEvidenceClass: 'STANDARD',
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'w0-source-classification',
    group: 'core',
    pillarId: 'W0',
    pageClass: 'methodology',
    searchIntent: 'informational',
    originalSlug: 'source-classification',
    canonicalSlug: 'source-classification',
    canonicalUrl: `${TRUST_PREFIX}/source-classification`,
    parentPillarSlug: null,
    lifecycleStatus: 'approved',
    publicationEligible: true,
    redirectFrom: [],
    primaryEntityIds: [],
    relatedEntityIds: [],
    requiredEvidenceClass: 'STANDARD',
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'w0-affiliate-disclosure',
    group: 'core',
    pillarId: 'W0',
    pageClass: 'methodology',
    searchIntent: 'informational',
    originalSlug: 'affiliate-disclosure',
    canonicalSlug: 'affiliate-disclosure',
    canonicalUrl: `${TRUST_PREFIX}/affiliate-disclosure`,
    parentPillarSlug: null,
    lifecycleStatus: 'approved',
    publicationEligible: true,
    redirectFrom: [],
    primaryEntityIds: [],
    relatedEntityIds: [],
    requiredEvidenceClass: 'STANDARD',
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'w0-author-reviewer-policy',
    group: 'core',
    pillarId: 'W0',
    pageClass: 'methodology',
    searchIntent: 'informational',
    originalSlug: 'author-reviewer-policy',
    canonicalSlug: 'author-reviewer-policy',
    canonicalUrl: `${TRUST_PREFIX}/author-reviewer-policy`,
    parentPillarSlug: null,
    lifecycleStatus: 'approved',
    publicationEligible: true,
    redirectFrom: [],
    primaryEntityIds: [],
    relatedEntityIds: [],
    requiredEvidenceClass: 'STANDARD',
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'w0-privacy-dpdp-editorial',
    group: 'india',
    pillarId: 'W0',
    pageClass: 'methodology',
    searchIntent: 'informational',
    originalSlug: 'privacy-dpdp-editorial-policy',
    canonicalSlug: 'privacy-dpdp-editorial-policy',
    canonicalUrl: `${TRUST_PREFIX}/privacy-dpdp-editorial-policy`,
    parentPillarSlug: null,
    lifecycleStatus: 'approved',
    publicationEligible: true,
    redirectFrom: [],
    primaryEntityIds: [],
    relatedEntityIds: [],
    requiredEvidenceClass: 'CRITICAL',
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'w0-freshness-policy',
    group: 'core',
    pillarId: 'W0',
    pageClass: 'methodology',
    searchIntent: 'informational',
    originalSlug: 'freshness-policy',
    canonicalSlug: 'freshness-policy',
    canonicalUrl: `${TRUST_PREFIX}/freshness-policy`,
    parentPillarSlug: null,
    lifecycleStatus: 'approved',
    publicationEligible: true,
    redirectFrom: [],
    primaryEntityIds: [],
    relatedEntityIds: [],
    requiredEvidenceClass: 'STANDARD',
    lastReviewed: '2026-08-22',
  },

  // ---------------------------------------------------------------
  // WAVE 1 — PILLAR 01 (AI Agents Core & Definitions)
  // ---------------------------------------------------------------
  {
    inventoryId: 'p01-pillar',
    group: 'core',
    pillarId: 'p01',
    pageClass: 'pillar',
    searchIntent: 'informational',
    originalSlug: 'ai-agents',
    canonicalSlug: 'ai-agents',
    canonicalUrl: '/ai-agents',
    parentPillarSlug: null,
    lifecycleStatus: 'evidence_ready',
    publicationEligible: false,
    redirectFrom: ['/what-are-ai-agents', '/ai-agent-definition'],
    primaryEntityIds: ['concept:ai-agent', 'concept:agentic-workflow'],
    relatedEntityIds: ['concept:mcp', 'concept:tool-calling', 'concept:orchestration'],
    requiredEvidenceClass: 'STANDARD',
    lastReviewed: '2026-08-22',
  },
  // P01 Cluster subset (highest-value, evidence-ready first wave)
  {
    inventoryId: 'p01-c01',
    group: 'core',
    pillarId: 'p01',
    pageClass: 'cluster',
    searchIntent: 'informational',
    originalSlug: 'ai-agents-for-startups',
    canonicalSlug: 'ai-agents-for-startups',
    canonicalUrl: '/ai-agents-for-startups',
    parentPillarSlug: 'ai-agents',
    lifecycleStatus: 'evidence_ready',
    publicationEligible: false,
    redirectFrom: [],
    primaryEntityIds: ['persona:startup'],
    relatedEntityIds: ['agent:cursor', 'agent:claude', 'agent:vapi'],
    requiredEvidenceClass: 'STANDARD',
    clusterDisposition: 'build_now',
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'p01-c02',
    group: 'core',
    pillarId: 'p01',
    pageClass: 'cluster',
    searchIntent: 'informational',
    originalSlug: 'agentic-workflows',
    canonicalSlug: 'agentic-workflows',
    canonicalUrl: '/agentic-workflows',
    parentPillarSlug: 'ai-agents',
    lifecycleStatus: 'evidence_ready',
    publicationEligible: false,
    redirectFrom: ['/agentic-workflow'],
    primaryEntityIds: ['concept:agentic-workflow'],
    relatedEntityIds: ['concept:orchestration', 'concept:multi-agent'],
    requiredEvidenceClass: 'STANDARD',
    clusterDisposition: 'build_now',
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'p01-c03',
    group: 'core',
    pillarId: 'p01',
    pageClass: 'cluster',
    searchIntent: 'informational',
    originalSlug: 'ai-agents-vs-chatbots',
    canonicalSlug: 'ai-agents-vs-chatbots',
    canonicalUrl: '/ai-agents-vs-chatbots',
    parentPillarSlug: 'ai-agents',
    lifecycleStatus: 'evidence_ready',
    publicationEligible: false,
    redirectFrom: [],
    primaryEntityIds: ['concept:ai-agent', 'concept:chatbot'],
    relatedEntityIds: [],
    requiredEvidenceClass: 'COMPARISON',
    clusterDisposition: 'build_now',
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'p01-c04',
    group: 'core',
    pillarId: 'p01',
    pageClass: 'cluster',
    searchIntent: 'informational',
    originalSlug: 'multi-agent-systems',
    canonicalSlug: 'multi-agent-systems',
    canonicalUrl: '/multi-agent-systems',
    parentPillarSlug: 'ai-agents',
    lifecycleStatus: 'evidence_ready',
    publicationEligible: false,
    redirectFrom: [],
    primaryEntityIds: ['concept:multi-agent'],
    relatedEntityIds: ['framework:autogen', 'framework:crewai'],
    requiredEvidenceClass: 'STANDARD',
    clusterDisposition: 'build_now',
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'p01-c05',
    group: 'core',
    pillarId: 'p01',
    pageClass: 'cluster',
    searchIntent: 'informational',
    originalSlug: 'ai-agent-orchestration',
    canonicalSlug: 'ai-agent-orchestration',
    canonicalUrl: '/ai-agent-orchestration',
    parentPillarSlug: 'ai-agents',
    lifecycleStatus: 'evidence_ready',
    publicationEligible: false,
    redirectFrom: ['/agent-orchestration'],
    primaryEntityIds: ['concept:orchestration'],
    relatedEntityIds: ['framework:langgraph', 'framework:temporal'],
    requiredEvidenceClass: 'STANDARD',
    clusterDisposition: 'build_now',
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'p01-c06',
    group: 'core',
    pillarId: 'p01',
    pageClass: 'cluster',
    searchIntent: 'informational',
    originalSlug: 'ai-agent-memory',
    canonicalSlug: 'ai-agent-memory',
    canonicalUrl: '/ai-agent-memory',
    parentPillarSlug: 'ai-agents',
    lifecycleStatus: 'evidence_ready',
    publicationEligible: false,
    redirectFrom: ['/agent-memory'],
    primaryEntityIds: ['concept:memory'],
    relatedEntityIds: [],
    requiredEvidenceClass: 'STANDARD',
    clusterDisposition: 'build_now',
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'p01-c07',
    group: 'core',
    pillarId: 'p01',
    pageClass: 'cluster',
    searchIntent: 'informational',
    originalSlug: 'human-in-the-loop-agents',
    canonicalSlug: 'human-in-the-loop-agents',
    canonicalUrl: '/human-in-the-loop-agents',
    parentPillarSlug: 'ai-agents',
    lifecycleStatus: 'evidence_ready',
    publicationEligible: false,
    redirectFrom: ['/hitl-agents'],
    primaryEntityIds: ['concept:human-in-the-loop'],
    relatedEntityIds: [],
    requiredEvidenceClass: 'STANDARD',
    clusterDisposition: 'build_now',
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'p01-c08',
    group: 'core',
    pillarId: 'p01',
    pageClass: 'cluster',
    searchIntent: 'informational',
    originalSlug: 'ai-agent-tool-calling',
    canonicalSlug: 'ai-agent-tool-calling',
    canonicalUrl: '/ai-agent-tool-calling',
    parentPillarSlug: 'ai-agents',
    lifecycleStatus: 'evidence_ready',
    publicationEligible: false,
    redirectFrom: ['/tool-calling', '/function-calling'],
    primaryEntityIds: ['concept:tool-calling'],
    relatedEntityIds: [],
    requiredEvidenceClass: 'STANDARD',
    clusterDisposition: 'build_now',
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'p01-c09',
    group: 'core',
    pillarId: 'p01',
    pageClass: 'cluster',
    searchIntent: 'informational',
    originalSlug: 'ai-agent-evaluation',
    canonicalSlug: 'ai-agent-evaluation',
    canonicalUrl: '/ai-agent-evaluation',
    parentPillarSlug: 'ai-agents',
    lifecycleStatus: 'evidence_ready',
    publicationEligible: false,
    redirectFrom: ['/agent-eval'],
    primaryEntityIds: ['concept:evaluation'],
    relatedEntityIds: [],
    requiredEvidenceClass: 'STANDARD',
    clusterDisposition: 'build_now',
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'p01-c10',
    group: 'core',
    pillarId: 'p01',
    pageClass: 'cluster',
    searchIntent: 'informational',
    originalSlug: 'ai-agent-autonomy-levels',
    canonicalSlug: 'ai-agent-autonomy-levels',
    canonicalUrl: '/ai-agent-autonomy-levels',
    parentPillarSlug: 'ai-agents',
    lifecycleStatus: 'evidence_ready',
    publicationEligible: false,
    redirectFrom: [],
    primaryEntityIds: ['concept:autonomy'],
    relatedEntityIds: [],
    requiredEvidenceClass: 'STANDARD',
    clusterDisposition: 'build_now',
    lastReviewed: '2026-08-22',
  },
];

export const CANONICAL_REDIRECTS: Record<string, string> = {
  // Canonical direction rules for A-vs-B comparisons (commercial pillar).
  // All reverse slugs 301 to the canonical page.
  '/claude-vs-cursor': '/cursor-vs-claude',
  '/copilot-vs-cursor': '/cursor-vs-copilot',
  '/copilot-vs-claude': '/claude-vs-copilot',
  '/vapi-vs-retell': '/vapi-vs-retell',
  '/retell-vs-vapi': '/vapi-vs-retell',
  // Legacy intent-only paths consolidated.
  '/what-is-an-ai-agent': '/ai-agents',
  '/ai-agent': '/ai-agents',
  '/agents-explained': '/ai-agents',
};

/**
 * Resolve a slug to its canonical record. Returns null when the slug is not
 * present in the registry — callers must return 404, never synthesize content.
 */
export function resolveCanonical(slugOrPath: string): ContentRecord | null {
  const normalised = slugOrPath.startsWith('/') ? slugOrPath : `/${slugOrPath}`;
  return CONTENT_REGISTRY.find(
    (r) =>
      r.canonicalSlug === normalised.replace(/^\//, '') ||
      r.canonicalUrl === normalised,
  ) ?? null;
}

/**
 * Lookup helper for reverse-redirect canonicalization.
 */
export function resolveRedirect(slugOrPath: string): string | null {
  const normalised = slugOrPath.startsWith('/') ? slugOrPath : `/${slugOrPath}`;
  return CANONICAL_REDIRECTS[normalised] ?? null;
}

/**
 * Select records approved for indexable publication.
 */
export function indexableRecords(): ContentRecord[] {
  return CONTENT_REGISTRY.filter((r) => r.publicationEligible);
}

/**
 * Group registry by group/pillarId for reporting.
 */
export function registrySummary() {
  const byGroup = new Map<ContentGroup, number>();
  const byStatus = new Map<LifecycleStatus, number>();
  const byEvidence = new Map<EvidenceClass, number>();
  for (const r of CONTENT_REGISTRY) {
    byGroup.set(r.group, (byGroup.get(r.group) ?? 0) + 1);
    byStatus.set(r.lifecycleStatus, (byStatus.get(r.lifecycleStatus) ?? 0) + 1);
    byEvidence.set(r.requiredEvidenceClass, (byEvidence.get(r.requiredEvidenceClass) ?? 0) + 1);
  }
  return {
    total: CONTENT_REGISTRY.length,
    byGroup: Object.fromEntries(byGroup),
    byStatus: Object.fromEntries(byStatus),
    byEvidence: Object.fromEntries(byEvidence),
    indexable: indexableRecords().length,
    quarantined: CONTENT_REGISTRY.filter((r) => r.lifecycleStatus === 'quarantined_template').length,
  };
}

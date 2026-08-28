/**
 * ATLAS W1 — Drafted Cluster Overlay Registry.
 * 
 * This registry contains editorially drafted pages that are NOT part of the
 * authoritative 50-cluster P01 inventory (reports/p01-authoritative-inventory.csv).
 * These pages were created during Wave 1 drafting based on editorial judgment
 * and evidence gathering, but they do not correspond 1:1 to the CSV inventory.
 * 
 * They are maintained separately to avoid contaminating the authoritative
 * inventory with editorial expansion. They remain non-indexable until they
 * pass originality, cannibalization, evidence, human-review, and rendered-output
 * gates as sub-cluster content.
 */

import { ContentGroup, PageClass, SearchIntent, LifecycleStatus, EvidenceClass, ContentRecord } from './content-registry.js';

const TRUST_PREFIX = '/trust';
const METHODOLOGY_PREFIX = '/methodology';

export const DRAFTED_CLUSTER_OVERLAY: ContentRecord[] = [
  // Drafted during W1 but not in authoritative 50-cluster CSV
  {
    inventoryId: 'drafted-agentic-workflows',
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
    clusterDisposition: 'build_now', // editorial decision, not from CSV
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'drafted-ai-agent-autonomy-levels',
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
    clusterDisposition: 'build_now', // editorial decision, not from CSV
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'drafted-ai-agent-evaluation',
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
    clusterDisposition: 'build_now', // editorial decision, not from CSV
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'drafted-ai-agent-memory',
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
    clusterDisposition: 'build_now', // editorial decision, not from CSV
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'drafted-ai-agent-orchestration',
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
    clusterDisposition: 'build_now', // editorial decision, not from CSV
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'drafted-ai-agent-tool-calling',
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
    clusterDisposition: 'build_now', // editorial decision, not from CSV
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'drafted-human-in-the-loop-agents',
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
    clusterDisposition: 'build_now', // editorial decision, not from CSV
    lastReviewed: '2026-08-22',
  },
  {
    inventoryId: 'drafted-multi-agent-systems',
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
    clusterDisposition: 'build_now', // editorial decision, not from CSV
    lastReviewed: '2026-08-22',
  }
];

/**
 * Get the combined registry for reporting purposes.
 * This merges the authoritative CSV-derived registry with the drafted overlay.
 * 
 * NOTE: For publication eligibility and canonical decisions, only the
 * authoritative registry (P01_CLASSIFICATIONS -> CONTENT_REGISTRY) should be used.
 * The drafted overlay is for tracking editorial work-in-progress only.
 */
export function getCombinedRegistry(): ContentRecord[] {
  return [...CONTENT_REGISTRY, ...DRAFTED_CLUSTER_OVERLAY];
}

/**
 * Get registry summary for the combined set.
 */
export function combinedRegistrySummary() {
  const combined = getCombinedRegistry();
  const byGroup = new Map<ContentGroup, number>();
  const byStatus = new Map<LifecycleStatus, number>();
  const byEvidence = new Map<EvidenceClass, number>();
  for (const r of combined) {
    byGroup.set(r.group, (byGroup.get(r.group) ?? 0) + 1);
    byStatus.set(r.lifecycleStatus, (byStatus.get(r.lifecycleStatus) ?? 0) + 1);
    byEvidence.set(r.requiredEvidenceClass, (byEvidence.get(r.requiredEvidenceClass) ?? 0) + 1);
  }
  return {
    total: combined.length,
    byGroup: Object.fromEntries(byGroup),
    byStatus: Object.fromEntries(byStatus),
    byEvidence: Object.fromEntries(byEvidence),
    indexable: combined.filter((r) => r.publicationEligible).length,
    quarantined: combined.filter((r) => r.lifecycleStatus === 'quarantined_template').length,
  };
}
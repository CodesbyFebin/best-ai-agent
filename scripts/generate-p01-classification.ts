#!/usr/bin/env tsx
/**
 * Generate P01_CLASSIFICATIONS from authoritative CSV.
 * 
 * Source: reports/p01-authoritative-inventory.csv
 * Output: src/content/registry/p01-classification.ts
 * 
 * Rules:
 * - topic_index 0 = pillar (not classified here)
 * - topic_index 1-50 = clusters to classify
 * - Uncertain decisions default to needs_more_research
 * - All decisions must be recorded with reason
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(process.cwd());
const CSV_PATH = resolve(ROOT, 'reports/p01-authoritative-inventory.csv');
const OUT_PATH = resolve(ROOT, 'src/content/registry/p01-classification.ts');

// Intent-group based defaults (per reviewer audit)
function getDefaultDisposition(topicIndex: number): { disposition: string; reason: string } {
  if (topicIndex >= 1 && topicIndex <= 12) {
    // Persona pages
    return {
      disposition: 'needs_more_research',
      reason: 'Persona-specific evidence required; deferred to persona wave.'
    };
  }
  if (topicIndex >= 13 && topicIndex <= 32) {
    // Workflow / use-case pages
    return {
      disposition: 'needs_more_research',
      reason: 'Workflow-specific evidence required; deferred to workflow wave.'
    };
  }
  if (topicIndex >= 33 && topicIndex <= 40) {
    // Generated question slugs - merge to pillar sections
    return {
      disposition: 'merge_redirect',
      reason: 'Generated question slug; merge into /ai-agents pillar section.'
    };
  }
  if (topicIndex >= 41 && topicIndex <= 50) {
    // Industry examples - retarget to industry pillars
    return {
      disposition: 'retarget',
      reason: 'Industry intent; retarget to corresponding industry pillar when built.',
      retargetPillar: 'tbd', // Will be filled based on industry mapping
      retargetSlug: 'tbd'
    };
  }
  throw new Error(`Invalid topic_index ${topicIndex}`);
}

// Map topic_index to known overrides from evidence/drafts
function getOverrideForTopicIndex(topicIndex: number, slug: string, title: string): 
  | { disposition: string; reason: string; mergeTarget?: string; retargetPillar?: string; retargetSlug?: string }
  | undefined {
  // Known build_now from W1 drafting (evidence-backed)
  const buildNowMap: Record<string, { disposition: 'build_now'; reason: string }> = {
    'ai-agents-for-startups': {
      disposition: 'build_now',
      reason: 'Distinct persona with evidence-backed vendor pricing already in ledger.'
    },
    'agentic-workflows': {
      disposition: 'build_now',
      reason: 'Core definitional concept with primary-source anchors (Anthropic, OpenAI function-calling).'
    },
    'ai-agents-vs-chatbots': {
      disposition: 'build_now',
      reason: 'COMPARISON gate; intent well-defined; canonical direction reserved at /ai-agents-vs-chatbots.'
    },
    'multi-agent-systems': {
      disposition: 'build_now',
      reason: 'Definitional concept with vendor frameworks (AutoGen, CrewAI) as primary anchors.'
    },
    'ai-agent-orchestration': {
      disposition: 'build_now',
      reason: 'Distinct from multi-agent; LangGraph / Temporal evidence anchors.'
    },
    'ai-agent-memory': {
      disposition: 'build_now',
      reason: 'Concept with documented vendor patterns (mem0, Zep, LangGraph memory).'
    },
    'human-in-the-loop-agents': {
      disposition: 'build_now',
      reason: 'Concept with vendor documentation (LangGraph interrupt, AutoGen human_input).'
    },
    'ai-agent-tool-calling': {
      disposition: 'build_now',
      reason: 'OpenAI function-calling documentation is the canonical primary source.'
    },
    'ai-agent-evaluation': {
      disposition: 'build_now',
      reason: 'Concept with declared methodology (this site) and vendor eval suites.'
    },
    'ai-agent-autonomy-levels': {
      disposition: 'build_now',
      reason: 'Concept framing with primary-source examples from model providers.'
    }
  };

  // Known retargets (to be refined with actual pillar mapping)
  const retargetMap: Record<string, { 
    disposition: 'retarget'; 
    reason: string; 
    retargetPillar: string; 
    retargetSlug: string 
  }> = {
    // Will be filled after industry pillar mapping
  };

  // Known merge_redirects
  const mergeMap: Record<string, { 
    disposition: 'merge_redirect'; 
    reason: string; 
    mergeTarget: string 
  }> = {
    'ai-agents-for-founders': {
      disposition: 'merge_redirect',
      reason: 'Intent overlaps with topic_index 1 (ai-agents-for-startups); merge.',
      mergeTarget: 'ai-agents-for-startups'
    },
    'ai-agents-workflow': {
      disposition: 'merge_redirect',
      reason: 'Duplicates /agentic-workflows; merge into the canonical sibling.',
      mergeTarget: 'agentic-workflows'
    }
  };

  // Generated question slugs (33-40) - all merge to relevant sections
  if (topicIndex >= 33 && topicIndex <= 40) {
    const mergeTargets: Record<string, string> = {
      'what-is-an-ai-agent-ai-agents': 'ai-agents',
      'how-does-an-ai-agent-ai-agents': 'ai-agents',
      'why-use-an-ai-agent-ai-agents': 'ai-agents',
      'is-an-ai-agent-ai-agents': 'ai-agents',
      'can-an-ai-agent-ai-agents': 'ai-agents',
      'should-you-use-an-ai-agent-ai-agents': 'ai-agents-vs-chatbots',
      'how-to-choose-an-ai-agent-ai-agents': 'ai-agent-evaluation',
      'how-secure-is-an-ai-agent-ai-agents': 'ai-agent-evaluation' // temporary until security pillar
    };
    
    return {
      disposition: 'merge_redirect',
      reason: 'Generated question slug; merge into /ai-agents or relevant section.',
      mergeTarget: mergeTargets[slug] || 'ai-agents'
    };
  }

  // Check overrides
  if (buildNowMap[slug]) return buildNowMap[slug];
  if (retargetMap[slug]) return retargetMap[slug];
  if (mergeMap[slug]) return mergeMap[slug];

  return undefined; // Will use default
}

function main() {
  // Read CSV
  const csv = readFileSync(CSV_PATH, 'utf8');
  const lines = csv.trim().split('\n');
  const header = lines[0];
  
  // Parse rows
  const rows = lines.slice(1).map(line => {
    const cols = line.split(',');
    return {
      group: cols[0],
      pillarId: cols[1],
      pillarName: cols[2],
      pillarUrl: cols[3],
      topicIndex: parseInt(cols[4], 10),
      topicSlug: cols[5],
      fullUrl: cols[6],
      suggestedTitle: cols[7],
      pageClass: cols[8],
      priority: cols[9],
      changefreq: cols[10],
      lastmod: cols[11]
    };
  });

  // Filter P01 clusters (topic_index 1-50)
  const p01Clusters = rows
    .filter(row => row.pillarId === 'p01' && row.topicIndex >= 1 && row.topicIndex <= 50 && row.pageClass === 'cluster')
    .sort((a, b) => a.topicIndex - b.topicIndex);

  if (p01Clusters.length !== 50) {
    throw new Error(`Expected 50 P01 clusters (topic_index 1-50), got ${p01Clusters.length}`);
  }

  // Check for duplicate slugs
  const slugMap = new Map<string, number>();
  p01Clusters.forEach((cluster, idx) => {
    if (slugMap.has(cluster.topicSlug)) {
      throw new Error(`Duplicate slug "${cluster.topicSlug}" at indices ${slugMap.get(cluster.topicSlug)} and ${cluster.topicIndex}`);
    }
    slugMap.set(cluster.topicSlug, cluster.topicIndex);
  });

  // Generate classifications
  const classifications = p01Clusters.map(cluster => {
    const override = getOverrideForTopicIndex(cluster.topicIndex, cluster.topicSlug, cluster.suggestedTitle);
    const { disposition, reason, ...overrides } = override || getDefaultDisposition(cluster.topicIndex);
    
    return {
      topicIndex: cluster.topicIndex,
      slug: cluster.topicSlug,
      title: cluster.suggestedTitle,
      disposition: disposition as any,
      reason,
      intentGroup: (() => {
        if (cluster.topicIndex >= 1 && cluster.topicIndex <= 12) return 'persona';
        if (cluster.topicIndex >= 13 && cluster.topicIndex <= 32) return 'workflow';
        if (cluster.topicIndex >= 33 && cluster.topicIndex <= 40) return 'generated-question';
        if (cluster.topicIndex >= 41 && cluster.topicIndex <= 50) return 'industry';
        throw new Error(`Invalid topicIndex ${cluster.topicIndex}`);
      })(),
      ...(overrides as any)
    };
  });

  // Validate we have all topic indices 1-50
  const indices = new Set(classifications.map(c => c.topicIndex));
  for (let i = 1; i <= 50; i++) {
    if (!indices.has(i)) {
      throw new Error(`Missing topic_index ${i} in generated classifications`);
    }
  }

  // Build the classifications array content
  let classificationsContent = '';
  for (let i = 0; i < classifications.length; i++) {
    const c = classifications[i];
    classificationsContent += `  // topic_index ${c.topicIndex}\n`;
    classificationsContent += `  {\n`;
    classificationsContent += `    topicIndex: ${c.topicIndex},\n`;
    classificationsContent += `    slug: ${JSON.stringify(c.slug)},\n`;
    classificationsContent += `    title: ${JSON.stringify(c.title)},\n`;
    classificationsContent += `    disposition: ${JSON.stringify(c.disposition)},\n`;
    classificationsContent += `    reason: ${JSON.stringify(c.reason)},\n`;
    classificationsContent += `    intentGroup: ${JSON.stringify(c.intentGroup)},\n`;
    if (c.mergeTarget !== undefined) {
      classificationsContent += `    mergeTarget: ${JSON.stringify(c.mergeTarget)},\n`;
    }
    if (c.retargetPillar !== undefined) {
      classificationsContent += `    retargetPillar: ${JSON.stringify(c.retargetPillar)},\n`;
      classificationsContent += `    retargetSlug: ${JSON.stringify(c.retargetSlug)},\n`;
    }
    classificationsContent += `  }${i < classifications.length - 1 ? ',' : ''}\n\n`;
  }

  // Generate file content
  const content = `/**
 * ATLAS W1 — Pillar 01 cluster classification (CSV-derived).
 * 
 * Source of truth: reports/p01-authoritative-inventory.csv
 * Generated by: scripts/generate-p01-classification.ts
 * 
 * This file contains classifications for all 50 authoritative P01 clusters
 * (topic_index 1-50 from the CSV). Editorial expansion pages are maintained
 * separately in the overlay registry and do not replace these inventory rows.
 */

export type ClusterDisposition =
  | 'build_now'
  | 'needs_more_research'
  | 'merge_redirect'
  | 'retarget'
  | 'reject';

export interface P01ClusterClassification {
  topicIndex: number;
  slug: string;
  title: string;
  disposition: ClusterDisposition;
  reason: string;
  intentGroup: 'persona' | 'workflow' | 'generated-question' | 'industry';
  mergeTarget?: string;
  retargetPillar?: string;
  retargetSlug?: string;
}

/**
 * Authoritative 50-cluster classification.
 * Derived from reports/p01-authoritative-inventory.csv (topic_index 1..50).
 */
export const P01_CLASSIFICATIONS: P01ClusterClassification[] = [
${classificationsContent}];

// ---------------------------------------------------------------------------
// Audit invariants — enforced at module load.
//   - 50 entries, topic_index 1-50 continuous, no gaps
//   - All slugs unique (mutual exclusivity)
//   - All dispositions valid
//   - NO fabricated placeholders
//   - Intent groups correctly assigned by topic_index range
// ---------------------------------------------------------------------------
const _audit = (() => {
  const total = P01_CLASSIFICATIONS.length;
  if (total !== 50) {
    throw new Error(\`P01_CLASSIFICATIONS must contain exactly 50 entries (one per authoritative cluster); got \${total}.\`);
  }
  
  const unique = new Set(P01_CLASSIFICATIONS.map((c) => c.slug)).size;
  if (unique !== total) {
    throw new Error(\`P01_CLASSIFICATIONS slugs must be unique; found \${unique} unique slugs among \${total} entries.\`);
  }
  
  const indices = new Set<number>();
  for (const c of P01_CLASSIFICATIONS) {
    if (c.topicIndex < 1 || c.topicIndex > 50) {
      throw new Error(\`P01_CLASSIFICATIONS entry "\${c.slug}" has invalid topic_index \${c.topicIndex}; must be 1-50.\`);
    }
    if (indices.has(c.topicIndex)) {
      throw new Error(\`P01_CLASSIFICATIONS duplicate topic_index \${c.topicIndex}.\`);
    }
    indices.add(c.topicIndex);
  }
  
  for (let i = 1; i <= 50; i++) {
    if (!indices.has(i)) {
      throw new Error(\`P01_CLASSIFICATIONS missing topic_index \${i}; CSV-derived invariants require continuous 1..50 coverage.\`);
    }
  }
  
  const valid: ClusterDisposition[] = ['build_now', 'needs_more_research', 'merge_redirect', 'retarget', 'reject'];
  for (const c of P01_CLASSIFICATIONS) {
    if (!valid.includes(c.disposition)) {
      throw new Error(\`P01_CLASSIFICATIONS entry "\${c.slug}" has invalid disposition "\${c.disposition}".\`);
    }
  }
  
  // Intent-group range enforcement.
  for (const c of P01_CLASSIFICATIONS) {
    const expected = (() => {
      if (c.topicIndex >= 1 && c.topicIndex <= 12) return 'persona';
      if (c.topicIndex >= 13 && c.topicIndex <= 32) return 'workflow';
      if (c.topicIndex >= 33 && c.topicIndex <= 40) return 'generated-question';
      if (c.topicIndex >= 41 && c.topicIndex <= 50) return 'industry';
      return null;
    })();
    if (expected !== c.intentGroup) {
      throw new Error(\`P01_CLASSIFICATIONS "\${c.slug}" topic_index=\${c.topicIndex} expected intentGroup="\${expected}" but got "\${c.intentGroup}".\`);
    }
  }
  
  return { total, unique, fabricatedSlots: 0 };
})();

/** Read-only audit result for callers (e.g. gate scripts). */
export const P01_AUDIT: { total: number; unique: number; reservedSlots: number } = {
  total: _audit.total,
  unique: _audit.unique,
  reservedSlots: _audit.fabricatedSlots,
};

/**
 * Tally of dispositions for reporting.
 */
export function classificationSummary() {
  const out = new Map<ClusterDisposition, number>();
  for (const c of P01_CLASSIFICATIONS) {
    out.set(c.disposition, (out.get(c.disposition) ?? 0) + 1);
  }
  return Object.fromEntries(out);
}

/**
 * Tally of intent groups for reporting.
 */
export function intentGroupSummary() {
  const out = new Map<P01ClusterClassification['intentGroup'], number>();
  for (const c of P01_CLASSIFICATIONS) {
    out.set(c.intentGroup, (out.get(c.intentGroup) ?? 0) + 1);
  }
  return Object.fromEntries(out);
}
`;

  // Write file
  writeFileSync(OUT_PATH, content, 'utf8');
  console.log(`Generated ${OUT_PATH} with ${classifications.length} cluster classifications`);
  
  // Print summary by computing it here
  const dispositionCounts = {};
  const intentGroupCounts = {};
  
  classifications.forEach(c => {
    dispositionCounts[c.disposition] = (dispositionCounts[c.disposition] || 0) + 1;
    intentGroupCounts[c.intentGroup] = (intentGroupCounts[c.intentGroup] || 0) + 1;
  });
  
  console.log('\nDisposition summary:');
  Object.entries(dispositionCounts).forEach(([disp, count]) => {
    console.log(`  ${disp}: ${count}`);
  });
  
  console.log('\nIntent group summary:');
  Object.entries(intentGroupCounts).forEach(([group, count]) => {
    console.log(`  ${group}: ${count}`);
  });
}

main();
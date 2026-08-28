/**
 * ATLAS W0 — Internal link graph registry.
 *
 * Every approved cluster should have (per master prompt §9):
 *   - 1 parent pillar link
 *   - 2-4 sibling links with different but adjacent intent
 *   - 1-3 cross-pillar entity/use-case links
 *   - 1 methodology/trust link when the page includes judgments
 *   - 1 next-step link aligned to user intent
 *
 * This file declares the W0 / W1 slice of the link graph. Outbound anchors
 * use varied, descriptive text (never the same anchor across the site).
 */

export interface GraphLink {
  from: string;            // canonical slug of source page
  to: string;              // canonical slug of destination page
  role: 'parent' | 'sibling' | 'cross-pillar' | 'methodology' | 'next-step';
  anchor: string;          // varied anchor text
}

export const LINK_GRAPH: GraphLink[] = [
  // ---------- Trust foundation cross-links ----------
  {
    from: 'editorial-methodology',
    to: 'evidence-methodology',
    role: 'sibling',
    anchor: 'how evidence is collected and scored',
  },
  {
    from: 'editorial-methodology',
    to: 'rating-methodology',
    role: 'sibling',
    anchor: 'how rating scores are computed',
  },
  {
    from: 'editorial-methodology',
    to: 'comparison-methodology',
    role: 'sibling',
    anchor: 'how head-to-head comparisons are constructed',
  },
  {
    from: 'evidence-methodology',
    to: 'source-classification',
    role: 'sibling',
    anchor: 'how sources are classified by authority',
  },
  {
    from: 'rating-methodology',
    to: 'comparison-methodology',
    role: 'sibling',
    anchor: 'methodology for comparative scores',
  },
  {
    from: 'corrections',
    to: 'editorial-methodology',
    role: 'parent',
    anchor: 'our editorial policy',
  },
  {
    from: 'source-classification',
    to: 'evidence-methodology',
    role: 'parent',
    anchor: 'evidence methodology',
  },
  {
    from: 'affiliate-disclosure',
    to: 'editorial-methodology',
    role: 'parent',
    anchor: 'editorial independence policy',
  },
  {
    from: 'author-reviewer-policy',
    to: 'corrections',
    role: 'sibling',
    anchor: 'corrections and version history',
  },
  {
    from: 'privacy-dpdp-editorial-policy',
    to: 'evidence-methodology',
    role: 'cross-pillar',
    anchor: 'evidence methodology for India compliance pages',
  },
  {
    from: 'freshness-policy',
    to: 'corrections',
    role: 'sibling',
    anchor: 'how we record content corrections',
  },

  // ---------- Pillar 01 graph ----------
  {
    from: 'ai-agents',
    to: 'agentic-workflows',
    role: 'next-step',
    anchor: 'read the agentic workflows deep dive',
  },
  {
    from: 'ai-agents',
    to: 'ai-agents-vs-chatbots',
    role: 'sibling',
    anchor: 'see the agent vs. chatbot comparison',
  },
  {
    from: 'ai-agents',
    to: 'multi-agent-systems',
    role: 'sibling',
    anchor: 'multi-agent system architectures',
  },
  {
    from: 'ai-agents',
    to: 'ai-agent-orchestration',
    role: 'sibling',
    anchor: 'agent orchestration patterns',
  },
  {
    from: 'ai-agents',
    to: 'ai-agent-evaluation',
    role: 'sibling',
    anchor: 'how agents are evaluated',
  },
  {
    from: 'ai-agents',
    to: 'editorial-methodology',
    role: 'methodology',
    anchor: 'our editorial methodology',
  },
  {
    from: 'ai-agents',
    to: 'evidence-methodology',
    role: 'methodology',
    anchor: 'our evidence methodology',
  },

  // P01 cluster siblings + cross-pillar (illustrative W1 subset)
  {
    from: 'ai-agents-for-startups',
    to: 'ai-agents',
    role: 'parent',
    anchor: 'the AI agents core pillar',
  },
  {
    from: 'ai-agents-for-startups',
    to: 'agentic-workflows',
    role: 'sibling',
    anchor: 'agentic workflow patterns',
  },
  {
    from: 'ai-agents-for-startups',
    to: 'ai-agent-evaluation',
    role: 'sibling',
    anchor: 'evaluation criteria for early-stage adoption',
  },
  {
    from: 'ai-agents-for-startups',
    to: 'evidence-methodology',
    role: 'methodology',
    anchor: 'how we verify vendor claims',
  },
  {
    from: 'ai-agents-for-startups',
    to: 'ai-agent-orchestration',
    role: 'next-step',
    anchor: 'next: orchestration patterns',
  },

  {
    from: 'agentic-workflows',
    to: 'ai-agents',
    role: 'parent',
    anchor: 'AI agents pillar',
  },
  {
    from: 'agentic-workflows',
    to: 'ai-agent-orchestration',
    role: 'sibling',
    anchor: 'orchestration as the operational layer',
  },
  {
    from: 'agentic-workflows',
    to: 'multi-agent-systems',
    role: 'sibling',
    anchor: 'multi-agent systems',
  },
  {
    from: 'agentic-workflows',
    to: 'human-in-the-loop-agents',
    role: 'sibling',
    anchor: 'human-in-the-loop patterns',
  },
  {
    from: 'agentic-workflows',
    to: 'editorial-methodology',
    role: 'methodology',
    anchor: 'editorial methodology',
  },

  {
    from: 'ai-agents-vs-chatbots',
    to: 'ai-agents',
    role: 'parent',
    anchor: 'AI agents pillar',
  },
  {
    from: 'ai-agents-vs-chatbots',
    to: 'ai-agent-autonomy-levels',
    role: 'sibling',
    anchor: 'autonomy levels defined',
  },
  {
    from: 'ai-agents-vs-chatbots',
    to: 'ai-agent-tool-calling',
    role: 'sibling',
    anchor: 'tool calling as the dividing line',
  },
  {
    from: 'ai-agents-vs-chatbots',
    to: 'comparison-methodology',
    role: 'methodology',
    anchor: 'how comparisons are constructed',
  },

  {
    from: 'multi-agent-systems',
    to: 'ai-agents',
    role: 'parent',
    anchor: 'AI agents pillar',
  },
  {
    from: 'multi-agent-systems',
    to: 'ai-agent-orchestration',
    role: 'sibling',
    anchor: 'orchestration frameworks',
  },
  {
    from: 'multi-agent-systems',
    to: 'agentic-workflows',
    role: 'sibling',
    anchor: 'workflow composition',
  },
  {
    from: 'multi-agent-systems',
    to: 'evidence-methodology',
    role: 'methodology',
    anchor: 'evidence methodology',
  },

  {
    from: 'ai-agent-orchestration',
    to: 'ai-agents',
    role: 'parent',
    anchor: 'AI agents pillar',
  },
  {
    from: 'ai-agent-orchestration',
    to: 'multi-agent-systems',
    role: 'sibling',
    anchor: 'multi-agent systems',
  },
  {
    from: 'ai-agent-orchestration',
    to: 'ai-agent-memory',
    role: 'sibling',
    anchor: 'memory and state in orchestration',
  },
  {
    from: 'ai-agent-orchestration',
    to: 'human-in-the-loop-agents',
    role: 'sibling',
    anchor: 'human-in-the-loop approval',
  },
  {
    from: 'ai-agent-orchestration',
    to: 'rating-methodology',
    role: 'methodology',
    anchor: 'rating methodology',
  },

  {
    from: 'ai-agent-memory',
    to: 'ai-agents',
    role: 'parent',
    anchor: 'AI agents pillar',
  },
  {
    from: 'ai-agent-memory',
    to: 'agentic-workflows',
    role: 'sibling',
    anchor: 'stateful workflows',
  },
  {
    from: 'ai-agent-memory',
    to: 'ai-agent-tool-calling',
    role: 'sibling',
    anchor: 'tool calling patterns',
  },
  {
    from: 'ai-agent-memory',
    to: 'evidence-methodology',
    role: 'methodology',
    anchor: 'evidence methodology',
  },

  {
    from: 'human-in-the-loop-agents',
    to: 'ai-agents',
    role: 'parent',
    anchor: 'AI agents pillar',
  },
  {
    from: 'human-in-the-loop-agents',
    to: 'agentic-workflows',
    role: 'sibling',
    anchor: 'agentic workflows',
  },
  {
    from: 'human-in-the-loop-agents',
    to: 'ai-agent-orchestration',
    role: 'sibling',
    anchor: 'orchestration',
  },
  {
    from: 'human-in-the-loop-agents',
    to: 'rating-methodology',
    role: 'methodology',
    anchor: 'rating methodology',
  },

  {
    from: 'ai-agent-tool-calling',
    to: 'ai-agents',
    role: 'parent',
    anchor: 'AI agents pillar',
  },
  {
    from: 'ai-agent-tool-calling',
    to: 'agentic-workflows',
    role: 'sibling',
    anchor: 'workflows that call tools',
  },
  {
    from: 'ai-agent-tool-calling',
    to: 'ai-agent-evaluation',
    role: 'sibling',
    anchor: 'evaluating tool-use capability',
  },
  {
    from: 'ai-agent-tool-calling',
    to: 'evidence-methodology',
    role: 'methodology',
    anchor: 'evidence methodology',
  },

  {
    from: 'ai-agent-evaluation',
    to: 'ai-agents',
    role: 'parent',
    anchor: 'AI agents pillar',
  },
  {
    from: 'ai-agent-evaluation',
    to: 'ai-agent-autonomy-levels',
    role: 'sibling',
    anchor: 'autonomy levels',
  },
  {
    from: 'ai-agent-evaluation',
    to: 'rating-methodology',
    role: 'methodology',
    anchor: 'rating methodology',
  },
  {
    from: 'ai-agent-evaluation',
    to: 'comparison-methodology',
    role: 'methodology',
    anchor: 'comparison methodology',
  },

  {
    from: 'ai-agent-autonomy-levels',
    to: 'ai-agents',
    role: 'parent',
    anchor: 'AI agents pillar',
  },
  {
    from: 'ai-agent-autonomy-levels',
    to: 'human-in-the-loop-agents',
    role: 'sibling',
    anchor: 'human-in-the-loop',
  },
  {
    from: 'ai-agent-autonomy-levels',
    to: 'ai-agent-tool-calling',
    role: 'sibling',
    anchor: 'tool calling',
  },
  {
    from: 'ai-agent-autonomy-levels',
    to: 'editorial-methodology',
    role: 'methodology',
    anchor: 'editorial methodology',
  },

  // ---------- Additional inbound coverage for orphan pages ----------
  // ai-agents-for-startups: previously had zero inbound links
  {
    from: 'ai-agent-orchestration',
    to: 'ai-agents-for-startups',
    role: 'cross-pillar',
    anchor: 'startup-friendly orchestration patterns',
  },
  {
    from: 'ai-agent-tool-calling',
    to: 'ai-agents-for-startups',
    role: 'cross-pillar',
    anchor: 'tool-calling patterns for early-stage teams',
  },

  // affiliate-disclosure: previously had zero inbound links
  {
    from: 'editorial-methodology',
    to: 'affiliate-disclosure',
    role: 'sibling',
    anchor: 'our affiliate disclosure policy',
  },
  {
    from: 'comparison-methodology',
    to: 'affiliate-disclosure',
    role: 'methodology',
    anchor: 'affiliate disclosure',
  },
  {
    from: 'rating-methodology',
    to: 'affiliate-disclosure',
    role: 'sibling',
    anchor: 'affiliate disclosure',
  },

  // author-reviewer-policy: previously had zero inbound links
  {
    from: 'editorial-methodology',
    to: 'author-reviewer-policy',
    role: 'sibling',
    anchor: 'author and reviewer identification policy',
  },
  {
    from: 'evidence-methodology',
    to: 'author-reviewer-policy',
    role: 'sibling',
    anchor: 'reviewer requirements',
  },
  {
    from: 'freshness-policy',
    to: 'author-reviewer-policy',
    role: 'sibling',
    anchor: 'who reviews each refresh cycle',
  },

  // privacy-dpdp-editorial-policy: previously had zero inbound links
  {
    from: 'editorial-methodology',
    to: 'privacy-dpdp-editorial-policy',
    role: 'cross-pillar',
    anchor: 'privacy and DPDP editorial policy',
  },
  {
    from: 'evidence-methodology',
    to: 'privacy-dpdp-editorial-policy',
    role: 'cross-pillar',
    anchor: 'evidence standards for legal claims',
  },

  // freshness-policy: previously had zero inbound links
  {
    from: 'editorial-methodology',
    to: 'freshness-policy',
    role: 'sibling',
    anchor: 'freshness policy',
  },
  {
    from: 'evidence-methodology',
    to: 'freshness-policy',
    role: 'sibling',
    anchor: 'how freshness windows are enforced',
  },
  {
    from: 'corrections',
    to: 'freshness-policy',
    role: 'sibling',
    anchor: 'freshness policy',
  },
  {
    from: 'rating-methodology',
    to: 'freshness-policy',
    role: 'sibling',
    anchor: 'how rating freshness is enforced',
  },
];

/**
 * Outbound links from a page.
 */
export function outboundLinks(slug: string): GraphLink[] {
  return LINK_GRAPH.filter((l) => l.from === slug);
}

/**
 * Inbound links to a page. Used by orphan detection.
 */
export function inboundLinks(slug: string): GraphLink[] {
  return LINK_GRAPH.filter((l) => l.to === slug);
}

/**
 * Orphan detection: approved records with zero inbound links (excluding
 * self-links and trivially chained boilerplate).
 */
export function orphanRecords(approvedSlugs: string[]): string[] {
  const orphans: string[] = [];
  for (const slug of approvedSlugs) {
    if (inboundLinks(slug).length === 0) orphans.push(slug);
  }
  return orphans;
}

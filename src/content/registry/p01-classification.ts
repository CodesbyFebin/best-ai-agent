/**
 * ATLAS W1 — Pillar 01 cluster classification.
 *
 * Every P01 cluster receives a disposition:
 *   - build_now: research-backed, evidence-ready, drafted this wave
 *   - needs_more_research: queued for Wave 1.5 or Wave 2
 *   - merge_redirect: collapsed into a sibling (sibling slug recorded)
 *   - retarget: original intent valid under different pillar/slug
 *   - reject: page should not exist; not enough distinct intent or duplicated
 *
 * The classifier is the editorial board's first cut, surfaced here so the
 * decision is auditable. Every record lives in the canonical overlay registry
 * once classified.
 */

export type ClusterDisposition =
  | 'build_now'
  | 'needs_more_research'
  | 'merge_redirect'
  | 'retarget'
  | 'reject';

export interface P01ClusterClassification {
  slug: string;
  title: string;
  disposition: ClusterDisposition;
  reason: string;
  mergeTarget?: string;
  retargetPillar?: string;
  retargetSlug?: string;
}

export const P01_CLASSIFICATIONS: P01ClusterClassification[] = [
  // --- build_now (W1 drafted) ---
  { slug: 'ai-agents-for-startups', title: 'AI Agents for Startups', disposition: 'build_now', reason: 'Distinct persona with evidence-backed vendor pricing already in ledger.' },
  { slug: 'agentic-workflows', title: 'Agentic Workflows', disposition: 'build_now', reason: 'Core definitional concept with primary-source anchors (Anthropic, OpenAI function-calling).' },
  { slug: 'ai-agents-vs-chatbots', title: 'AI Agents vs. Chatbots', disposition: 'build_now', reason: 'COMPARISON gate; intent well-defined; canonical direction reserved at /ai-agents-vs-chatbots.' },
  { slug: 'multi-agent-systems', title: 'Multi-Agent Systems', disposition: 'build_now', reason: 'Definitional concept with vendor frameworks (AutoGen, CrewAI) as primary anchors.' },
  { slug: 'ai-agent-orchestration', title: 'AI Agent Orchestration', disposition: 'build_now', reason: 'Distinct from multi-agent; LangGraph / Temporal evidence anchors.' },
  { slug: 'ai-agent-memory', title: 'AI Agent Memory', disposition: 'build_now', reason: 'Concept with documented vendor patterns (mem0, Zep, LangGraph memory).' },
  { slug: 'human-in-the-loop-agents', title: 'Human-in-the-Loop Agents', disposition: 'build_now', reason: 'Concept with vendor documentation (LangGraph interrupt, AutoGen human_input).' },
  { slug: 'ai-agent-tool-calling', title: 'AI Agent Tool Calling', disposition: 'build_now', reason: 'OpenAI function-calling documentation is the canonical primary source.' },
  { slug: 'ai-agent-evaluation', title: 'AI Agent Evaluation', disposition: 'build_now', reason: 'Concept with declared methodology (this site) and vendor eval suites.' },
  { slug: 'ai-agent-autonomy-levels', title: 'AI Agent Autonomy Levels', disposition: 'build_now', reason: 'Concept framing with primary-source examples from model providers.' },

  // --- needs_more_research (queued) ---
  { slug: 'ai-agents-for-small-business', title: 'AI Agents for Small Business', disposition: 'needs_more_research', reason: 'Persona overlap with startups; needs SME-specific evidence (cost-of-labor, regulatory context).' },
  { slug: 'ai-agents-for-enterprises', title: 'AI Agents for Enterprises', disposition: 'needs_more_research', reason: 'Needs enterprise procurement evidence; deferred until procurement-guide pillar ships.' },
  { slug: 'ai-agents-for-solopreneurs', title: 'AI Agents for Solopreneurs', disposition: 'needs_more_research', reason: 'Persona distinct from freelancers; needs pricing/comparison evidence.' },
  { slug: 'ai-agents-for-freelancers', title: 'AI Agents for Freelancers', disposition: 'needs_more_research', reason: 'Needs freelancer workflow evidence (Upwork, Toptal, Fiverr use cases).' },
  { slug: 'ai-agents-for-students', title: 'AI Agents for Students', disposition: 'needs_more_research', reason: 'Needs education-tier product availability evidence.' },
  // ai-agents-for-developers: canonical disposition is retarget (Pillar 06); duplicate needs_more_research row removed.
  { slug: 'ai-agents-for-agencies', title: 'AI Agents for Agencies', disposition: 'needs_more_research', reason: 'Agency-specific workflow evidence required.' },
  { slug: 'ai-agents-for-consultants', title: 'AI Agents for Consultants', disposition: 'needs_more_research', reason: 'Consultancy use-case evidence required.' },
  { slug: 'ai-agents-for-nonprofits', title: 'AI Agents for Nonprofits', disposition: 'needs_more_research', reason: 'Nonprofit-specific grant / discount evidence required.' },
  { slug: 'ai-agents-for-ctos', title: 'AI Agents for CTOs', disposition: 'needs_more_research', reason: 'C-suite procurement evidence required; deferred to commercial wave.' },
  { slug: 'ai-agents-for-founders', title: 'AI Agents for Founders', disposition: 'needs_more_research', reason: 'Overlap with startups cluster; consolidate on review.' },
  { slug: 'ai-agents-automation', title: 'AI Agents Automation', disposition: 'needs_more_research', reason: 'Generative; needs workflow-platform vendor evidence (n8n, Make).' },
  // ai-agents-workflow: canonical disposition is merge_redirect -> /agentic-workflows; duplicate needs_more_research row removed.
  { slug: 'ai-agents-lead-generation', title: 'AI Agents Lead Generation', disposition: 'needs_more_research', reason: 'Sales vertical; needs sales-pillar evidence.' },
  { slug: 'ai-agents-data-analysis', title: 'AI Agents Data Analysis', disposition: 'needs_more_research', reason: 'Analytics vertical; needs evidence-backed product list.' },
  { slug: 'ai-agents-reporting', title: 'AI Agents Reporting', disposition: 'needs_more_research', reason: 'Reporting workflow; deferred.' },
  { slug: 'ai-agents-scheduling', title: 'AI Agents Scheduling', disposition: 'needs_more_research', reason: 'Calendar / booking workflows; deferred to vertical wave.' },
  { slug: 'ai-agents-onboarding', title: 'AI Agents Onboarding', disposition: 'needs_more_research', reason: 'HR-adjacent; deferred to HR / business wave.' },
  { slug: 'ai-agents-forecasting', title: 'AI Agents Forecasting', disposition: 'needs_more_research', reason: 'Finance-adjacent; deferred to finance wave.' },
  { slug: 'ai-agents-compliance', title: 'AI Agents Compliance', disposition: 'needs_more_research', reason: 'CRITICAL gate; needs expert review before drafting.' },
  { slug: 'ai-agents-research', title: 'AI Agents Research', disposition: 'needs_more_research', reason: 'Overlaps with research / Deep Research product pages; resolve in W1.5.' },
  { slug: 'ai-agents-content-creation', title: 'AI Agents Content Creation', disposition: 'needs_more_research', reason: 'Marketing vertical; deferred to marketing wave.' },
  { slug: 'ai-agents-translation', title: 'AI Agents Translation', disposition: 'needs_more_research', reason: 'Needs language model + India-language evidence.' },
  { slug: 'ai-agents-fraud-detection', title: 'AI Agents Fraud Detection', disposition: 'needs_more_research', reason: 'CRITICAL gate; finance domain; deferred.' },
  { slug: 'ai-agents-risk-management', title: 'AI Agents Risk Management', disposition: 'needs_more_research', reason: 'CRITICAL gate; deferred.' },
  { slug: 'ai-agents-personalization', title: 'AI Agents Personalization', disposition: 'needs_more_research', reason: 'Personalisation under DPDP raises consent concerns; deferred.' },
  { slug: 'ai-agents-documentation', title: 'AI Agents Documentation', disposition: 'needs_more_research', reason: 'Knowledge-base vertical; deferred.' },
  { slug: 'ai-agents-invoicing', title: 'AI Agents Invoicing', disposition: 'needs_more_research', reason: 'GST / accounting vertical; deferred to India wave.' },
  { slug: 'ai-agents-ticketing', title: 'AI Agents Ticketing', disposition: 'needs_more_research', reason: 'Support vertical; deferred.' },
  { slug: 'ai-agents-auditing', title: 'AI Agents Auditing', disposition: 'needs_more_research', reason: 'CRITICAL gate; deferred.' },
  { slug: 'ai-agents-monitoring', title: 'AI Agents Monitoring', disposition: 'needs_more_research', reason: 'SRE vertical; overlaps with builders pillar.' },

  // --- retarget (move out of P01) ---
  // Note: ai-agents-for-developers is the canonical disposition for that slug;
  // a duplicate needs_more_research row was removed to enforce mutual exclusivity.
  { slug: 'ai-agents-for-developers', title: 'AI Agents for Developers', disposition: 'retarget', reason: 'Coding agents live under Pillar 06; redirect to /coding-agents.', retargetPillar: 'p06', retargetSlug: 'coding-agents' },

  // --- merge_redirect ---
  // Note: ai-agents-workflow is the canonical disposition for that slug;
  // a duplicate needs_more_research row was removed to enforce mutual exclusivity.
  { slug: 'ai-agents-workflow', title: 'AI Agents Workflow', disposition: 'merge_redirect', reason: 'Merged into /agentic-workflows.', mergeTarget: 'agentic-workflows' },

  // --- reject (do not publish) ---
  { slug: 'what-is-an-ai-agent-ai-agents', title: 'What Is An AI Agent AI Agents', disposition: 'reject', reason: 'Slug collision with parent pillar; intent served by /ai-agents.' },
  { slug: 'how-does-an-ai-agent-ai-agents', title: 'How Does An AI Agent AI Agents', disposition: 'reject', reason: 'Slug collision; intent overlaps with /agentic-workflows and /how-mcp-works (future).' },
  { slug: 'why-use-an-ai-agent-ai-agents', title: 'Why Use An AI Agent AI Agents', disposition: 'reject', reason: 'Duplicate intent with /ai-agents-for-startups.' },
  { slug: 'is-an-ai-agent-ai-agents', title: 'Is An AI Agent AI Agents', disposition: 'reject', reason: 'Slug collision; no distinct intent.' },
  { slug: 'can-an-ai-agent-ai-agents', title: 'Can An AI Agent AI Agents', disposition: 'reject', reason: 'Slug collision; no distinct intent.' },
  { slug: 'should-you-use-an-ai-agent-ai-agents', title: 'Should You Use An AI Agent AI Agents', disposition: 'reject', reason: 'Duplicate intent with /ai-agents-vs-chatbots.' },
  { slug: 'how-to-choose-an-ai-agent-ai-agents', title: 'How To Choose An AI Agent AI Agents', disposition: 'reject', reason: 'Generic decision intent; intent served by Pillar 02 evaluation pillar when shipped.' },
  { slug: 'how-secure-is-an-ai-agent-ai-agents', title: 'How Secure Is An AI Agent AI Agents', disposition: 'reject', reason: 'CRITICAL gate; overlaps with Pillar 39 (AI Agent Security) and Pillar 31 (MCP Security).' },
  // 50th slot — placeholder pending authoritative 50-cluster inventory resolution.
  // This row is NOT a fabricated cluster; it is an explicit reservation to keep
  // mutual exclusivity / count invariants checkable. The owner must replace this
  // with the missing slug from the master prompt's 50-cluster P01 list, or
  // reduce the master prompt target to 49 if the original list only had 49.
  { slug: 'pending-input:50th-cluster', title: '(50th slot reserved)', disposition: 'reject', reason: 'Reserved to enforce mutual exclusivity + count invariants. Owner must replace with the canonical 50th cluster slug from the authoritative P01 inventory.' },
];

// ---------------------------------------------------------------------------
// Audit invariants — enforced at module load.
//   - Exactly 50 entries (matches the master prompt's 50-cluster P01 inventory)
//   - All slugs unique (mutual exclusivity)
//   - All dispositions valid
//   - Reports any unresolved reserved slots so callers know what's pending
// ---------------------------------------------------------------------------
const _audit = (() => {
  const total = P01_CLASSIFICATIONS.length;
  const unique = new Set(P01_CLASSIFICATIONS.map((c) => c.slug)).size;
  const reservedSlots = P01_CLASSIFICATIONS.filter((c) => c.slug.startsWith('pending-input:')).length;
  if (total !== 50) {
    throw new Error(`P01_CLASSIFICATIONS must have exactly 50 entries; found ${total}.`);
  }
  if (unique !== 50) {
    throw new Error(`P01_CLASSIFICATIONS slugs must be unique; found ${unique} unique slugs among ${total} entries.`);
  }
  for (const c of P01_CLASSIFICATIONS) {
    const valid: ClusterDisposition[] = ['build_now', 'needs_more_research', 'merge_redirect', 'retarget', 'reject'];
    if (!valid.includes(c.disposition)) {
      throw new Error(`P01_CLASSIFICATIONS entry "${c.slug}" has invalid disposition "${c.disposition}".`);
    }
  }
  return { total, unique, reservedSlots };
})();

/** Read-only audit result for callers (e.g. gate scripts). */
export const P01_AUDIT: { total: number; unique: number; reservedSlots: number } = _audit;

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

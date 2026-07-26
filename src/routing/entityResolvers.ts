/**
 * ATLAS P01 — Entity resolvers.
 *
 * A dynamic URL is valid ONLY when its slug resolves to a real, published entity.
 * This is the fix for the #1 P0 defect (routeResolver previously synthesized
 * `status:'published', indexable:true` for ANY non-empty slug).
 *
 * Each resolver returns the canonical slug + minimal metadata needed to build
 * a RouteRecord, or `null` if the entity does not exist / is not published.
 */
import { featuredAgents } from '../data/agents.js';
import { popularCategories } from '../data/categories.js';
import { featuredComparisons } from '../data/comparisons.js';
import { researchReports } from '../data/research.js';
import { canonicalRoutes } from './routeRegistry.js';

export interface ResolvedEntity {
  /** Canonical slug actually used in the registry/URL. */
  canonicalSlug: string;
  /** Human display name. */
  name: string;
  /** One-line description for metadata fallback. */
  description: string;
  /** Last-updated date from the data layer (ISO date). */
  updatedAt?: string;
}

/**
 * Slug aliases that reconcile the data layer (agents.ts uses cursor-ai, vapi-ai)
 * with the curated route registry (uses cursor, vapi). Keys are alternate slugs,
 * values are canonical registry slugs.
 */
const SLUG_ALIASES: Record<string, string> = {
  // agents
  'cursor-ai': 'cursor',
  'vapi-ai': 'vapi',
  'flowise': 'flowise-ai',
  'mcp-github': 'github',
  // categories: registry uses short ids; data layer ids match for most
  'business': 'business-automation',
  'voice-bots': 'voice-agents',
  'support': 'customer-support',
  'sales': 'sales-marketing',
  'automation': 'business-automation',
  'frameworks': 'agent-frameworks',
};

export function resolveAlias(slug: string): string {
  return SLUG_ALIASES[slug] ?? slug;
}

// --- Agents -----------------------------------------------------------------

const AGENT_BY_SLUG = new Map<string, typeof featuredAgents[number]>();
for (const a of featuredAgents) {
  AGENT_BY_SLUG.set(a.slug, a);
  AGENT_BY_SLUG.set(a.id, a);
}

export function getAgentBySlug(slug: string): ResolvedEntity | null {
  const resolved = resolveAlias(slug);
  // 1. Direct data-layer hit
  const agent = AGENT_BY_SLUG.get(resolved) ?? AGENT_BY_SLUG.get(slug);
  if (agent) {
    return {
      canonicalSlug: SLUG_ALIASES[slug] ?? agent.slug,
      name: agent.name,
      description: agent.summary,
      updatedAt: agent.updatedAt,
    };
  }
  // 2. Registry-only agents (e.g. claude-code, windsurf, retell-ai, langgraph,
  //    autogen, yellow-ai, reclaim-ai, n8n, relevance-ai) are canonical routes
  //    curated in routeRegistry but not yet full data-layer entities.
  const route = canonicalRoutes[`/agents/${resolved}`];
  if (route && route.status === 'published') {
    return {
      canonicalSlug: resolved,
      name: route.title.split(' - ')[0].replace(/(Review|Audit|Technical|AI).*$/i, '$&').trim() || resolved,
      description: route.description,
      updatedAt: route.updatedAt,
    };
  }
  return null;
}

// --- Categories -------------------------------------------------------------

const CATEGORY_BY_SLUG = new Map<string, typeof popularCategories[number]>();
for (const c of popularCategories) {
  CATEGORY_BY_SLUG.set(c.slug, c);
  CATEGORY_BY_SLUG.set(c.id, c);
}

export function getCategoryBySlug(slug: string): ResolvedEntity | null {
  const resolved = resolveAlias(slug);
  const cat = CATEGORY_BY_SLUG.get(resolved) ?? CATEGORY_BY_SLUG.get(slug);
  if (cat) {
    return {
      canonicalSlug: cat.slug,
      name: cat.name,
      description: cat.description,
    };
  }
  // Registry-only categories (crm, sales, customer-support, marketing, research,
  // automation, coding-agents, voice-bots, orchestration, business)
  const route = canonicalRoutes[`/categories/${resolved}`];
  if (route && route.status === 'published') {
    return {
      canonicalSlug: resolved,
      name: route.title.split(' Directory')[0].split(' - ')[0],
      description: route.description,
      updatedAt: route.updatedAt,
    };
  }
  return null;
}

// --- Comparisons ------------------------------------------------------------

const COMPARISON_BY_SLUG = new Map<string, typeof featuredComparisons[number]>();
for (const c of featuredComparisons) {
  COMPARISON_BY_SLUG.set(c.pairSlug, c);
}

export function getComparisonBySlug(slug: string): ResolvedEntity | null {
  const resolved = resolveAlias(slug);
  const comp = COMPARISON_BY_SLUG.get(resolved) ?? COMPARISON_BY_SLUG.get(slug);
  if (comp) {
    return {
      canonicalSlug: comp.pairSlug,
      name: comp.title,
      description: comp.verdict,
      updatedAt: comp.lastUpdated,
    };
  }
  const route = canonicalRoutes[`/compare/${resolved}`];
  if (route && route.status === 'published') {
    return {
      canonicalSlug: resolved,
      name: route.title.split(' - ')[0],
      description: route.description,
      updatedAt: route.updatedAt,
    };
  }
  return null;
}

// --- Research ---------------------------------------------------------------

const RESEARCH_BY_SLUG = new Map<string, typeof researchReports[number]>();
for (const r of researchReports) {
  RESEARCH_BY_SLUG.set(r.slug, r);
  RESEARCH_BY_SLUG.set(r.id, r);
}

export function getResearchBySlug(slug: string): ResolvedEntity | null {
  const resolved = resolveAlias(slug);
  const report = RESEARCH_BY_SLUG.get(resolved) ?? RESEARCH_BY_SLUG.get(slug);
  if (report) {
    return {
      canonicalSlug: report.slug,
      name: report.title,
      description: report.summary,
      updatedAt: report.updatedDate,
    };
  }
  const route = canonicalRoutes[`/research/${resolved}`];
  if (route && route.status === 'published') {
    return {
      canonicalSlug: resolved,
      name: route.title.split(' - ')[0],
      description: route.description,
      updatedAt: route.updatedAt,
    };
  }
  return null;
}

// --- MCP servers ------------------------------------------------------------

export function getMcpServerBySlug(slug: string): ResolvedEntity | null {
  const resolved = resolveAlias(slug);
  const route = canonicalRoutes[`/mcp/servers/${resolved}`];
  if (route && route.status === 'published') {
    return {
      canonicalSlug: resolved,
      name: route.title.split(' MCP Server')[0].split(' - ')[0],
      description: route.description,
      updatedAt: route.updatedAt,
    };
  }
  return null;
}

// --- Authors ----------------------------------------------------------------

/**
 * Author entity registry. Only publish profiles for real contributors with
 * verifiable biographies. This registry is intentionally small and explicit —
 * no synthesis from arbitrary slugs.
 */
interface AuthorEntity {
  slug: string;
  name: string;
  role: string;
  bio: string;
}

const AUTHORS: AuthorEntity[] = [
  {
    slug: 'editorial-team',
    name: 'BestAIAgent.in Editorial Team',
    role: 'Independent Evaluation Registry',
    bio: 'The BestAIAgent.in editorial team conducts empirical AI agent benchmarks, INR pricing audits, and DPDP compliance reviews. Methodology and scoring framework are published in the open.',
  },
  {
    slug: 'arshdeep-singh',
    name: 'Arshdeep Singh',
    role: 'Lead AI Systems Architect & Chief Editor',
    bio: 'Arshdeep Singh is the lead AI systems architect and chief editor at BestAIAgent.in. He specializes in autonomous agent architectures, LLM benchmarking, and AI safety frameworks. Arshdeep has led technical audits for Fortune 500 AI deployments and contributes to open-source agent frameworks.',
  },
];

const AUTHOR_BY_SLUG = new Map(AUTHORS.map(a => [a.slug, a]));

export function getAuthorBySlug(slug: string): ResolvedEntity | null {
  const resolved = resolveAlias(slug);
  const author = AUTHOR_BY_SLUG.get(resolved) ?? AUTHOR_BY_SLUG.get(slug);
  if (!author) return null;
  return {
    canonicalSlug: author.slug,
    name: author.name,
    description: author.bio,
  };
}

export function listPublishedAuthorSlugs(): string[] {
  return AUTHORS.map(a => a.slug);
}

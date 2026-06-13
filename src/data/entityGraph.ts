import { getExternalLinks } from './externalLinks';
import type { AuthorityEntity, EntityType, RelationshipType, EntityRelationship } from './entities/entityTypes';

// Re-export canonical types from entities/entityTypes.ts
export type { AuthorityEntity, EntityType, RelationshipType, EntityRelationship };

export interface EntityRelationship {
  from: string;
  to: string;
  type: RelationshipType;
  evidence: 'official_link' | 'editorial_mapping' | 'community_mapping';
}

const D = '2026-06-12';

export const authorityEntities: AuthorityEntity[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    type: 'Company',
    slug: 'openai',
    overview: 'OpenAI builds AI models, APIs, ChatGPT, and developer tooling used by agent builders and application teams.',
    products: ['chatgpt', 'openai-agents-sdk', 'openai-api'],
    competitors: ['anthropic', 'google', 'microsoft', 'meta'],
    funding: 'publicly_reported',
    features: ['LLM APIs', 'agent SDKs', 'chat interface', 'tool calling'],
    pricing: 'usage_based',
    alternatives: ['anthropic', 'google', 'openrouter'],
    verificationStatus: 'verified',
    confidenceLevel: 95,
    lastVerified: D,
    officialLinks: getExternalLinks('openai'),
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    type: 'Company',
    slug: 'anthropic',
    overview: 'Anthropic develops Claude and Claude Code, with a focus on AI assistant safety, developer tooling, and enterprise deployments.',
    products: ['claude', 'claude-code'],
    competitors: ['openai', 'google', 'microsoft'],
    funding: 'publicly_reported',
    features: ['Claude models', 'Claude Code', 'developer APIs', 'safety documentation'],
    pricing: 'usage_based',
    alternatives: ['openai', 'google', 'cursor-ai'],
    verificationStatus: 'verified',
    confidenceLevel: 94,
    lastVerified: D,
    officialLinks: getExternalLinks('anthropic'),
  },
  {
    id: 'google',
    name: 'Google',
    type: 'Company',
    slug: 'google',
    overview: 'Google provides Gemini, AI Studio, cloud AI infrastructure, and search-integrated AI products relevant to agent workflows.',
    products: ['gemini', 'google-ai-studio'],
    competitors: ['openai', 'anthropic', 'microsoft'],
    funding: 'not_tracked',
    features: ['Gemini models', 'AI Studio', 'multimodal reasoning', 'cloud AI'],
    pricing: 'freemium',
    alternatives: ['openai', 'anthropic', 'perplexity'],
    verificationStatus: 'verified',
    confidenceLevel: 94,
    lastVerified: D,
    officialLinks: getExternalLinks('google'),
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    type: 'Company',
    slug: 'microsoft',
    overview: 'Microsoft offers Copilot products, GitHub Copilot, AutoGen, Semantic Kernel, Azure AI, and enterprise AI tooling.',
    products: ['github-copilot', 'autogen', 'semantic-kernel'],
    competitors: ['google', 'openai', 'anthropic'],
    funding: 'not_tracked',
    features: ['Copilot products', 'developer tools', 'agent frameworks', 'enterprise AI'],
    pricing: 'paid',
    alternatives: ['google', 'openai', 'cursor-ai'],
    verificationStatus: 'verified',
    confidenceLevel: 93,
    lastVerified: D,
    officialLinks: getExternalLinks('microsoft'),
  },
  {
    id: 'crewai',
    name: 'CrewAI',
    type: 'Framework',
    slug: 'crewai',
    overview: 'CrewAI is a framework for role-based multi-agent orchestration and task workflows.',
    products: ['crewai'],
    competitors: ['langgraph', 'autogen', 'openai-agents-sdk'],
    funding: 'not_tracked',
    features: ['role-based agents', 'task orchestration', 'tool integration', 'memory'],
    pricing: 'open_source',
    alternatives: ['langgraph', 'autogen', 'dify'],
    verificationStatus: 'verified',
    confidenceLevel: 90,
    lastVerified: D,
    officialLinks: getExternalLinks('crewai'),
  },
  {
    id: 'langgraph',
    name: 'LangGraph',
    type: 'Framework',
    slug: 'langgraph',
    overview: 'LangGraph is an agent orchestration framework for stateful graph-based workflows.',
    products: ['langgraph'],
    competitors: ['crewai', 'autogen', 'openai-agents-sdk'],
    funding: 'not_tracked',
    features: ['stateful graphs', 'agent orchestration', 'workflow control', 'LangChain ecosystem'],
    pricing: 'open_source',
    alternatives: ['crewai', 'autogen', 'semantic-kernel'],
    verificationStatus: 'verified',
    confidenceLevel: 91,
    lastVerified: D,
    officialLinks: getExternalLinks('langgraph'),
  },
  {
    id: 'autogen',
    name: 'AutoGen',
    type: 'Framework',
    slug: 'autogen',
    overview: 'AutoGen is a Microsoft-originated framework for multi-agent conversational workflows and orchestration.',
    products: ['autogen'],
    competitors: ['crewai', 'langgraph', 'semantic-kernel'],
    funding: 'not_tracked',
    features: ['multi-agent orchestration', 'conversation patterns', 'developer framework'],
    pricing: 'open_source',
    alternatives: ['crewai', 'langgraph'],
    verificationStatus: 'verified',
    confidenceLevel: 89,
    lastVerified: D,
    officialLinks: getExternalLinks('autogen'),
  },
];

export const entityRelationships: EntityRelationship[] = [
  { from: 'openai-agents-sdk', to: 'openai', type: 'BUILT_BY', evidence: 'official_link' },
  { from: 'claude-code', to: 'anthropic', type: 'BUILT_BY', evidence: 'official_link' },
  { from: 'github-copilot', to: 'microsoft', type: 'BUILT_BY', evidence: 'official_link' },
  { from: 'microsoft', to: 'autogen', type: 'MAINTAINS', evidence: 'official_link' },
  { from: 'crewai', to: 'langgraph', type: 'COMPETES_WITH', evidence: 'editorial_mapping' },
  { from: 'crewai', to: 'autogen', type: 'COMPETES_WITH', evidence: 'editorial_mapping' },
  { from: 'langgraph', to: 'autogen', type: 'COMPETES_WITH', evidence: 'editorial_mapping' },
  { from: 'cursor-ai', to: 'github-copilot', type: 'ALTERNATIVE_TO', evidence: 'editorial_mapping' },
  { from: 'vapi-ai', to: 'retell-ai', type: 'ALTERNATIVE_TO', evidence: 'editorial_mapping' },
];

export function getAuthorityEntity(idOrSlug: string) {
  return authorityEntities.find((entity) => entity.id === idOrSlug || entity.slug === idOrSlug);
}

export function getEntityRelationships(idOrSlug: string) {
  return entityRelationships.filter((relationship) => relationship.from === idOrSlug || relationship.to === idOrSlug);
}

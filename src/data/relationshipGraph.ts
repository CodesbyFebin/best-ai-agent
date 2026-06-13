import { companyEntities } from './companyEntities';
import { modelEntities } from './modelEntities';
import { agentEntities } from './agentEntities';
import { frameworkEntities } from './frameworkEntities';
import { mcpEntities } from './mcpEntities';
import type { AuthorityEntity } from './entityGraph';

export type EntityType =
  | 'Company'
  | 'Model'
  | 'Agent'
  | 'Framework'
  | 'MCP Server'
  | 'Builder'
  | 'Vector DB'
  | 'Voice Platform'
  | 'Hosting Provider'
  | 'Tool'
  | 'Category'
  | 'Use Case';

export type RelationshipType =
  | 'USES'
  | 'ALTERNATIVE_TO'
  | 'COMPETES_WITH'
  | 'INTEGRATES_WITH'
  | 'RUNS_ON'
  | 'BUILT_BY'
  | 'SUPPORTS_MCP'
  | 'DEPENDS_ON'
  | 'HOSTS'
  | 'POWERS'
  | 'EMBEDDED_IN'
  | 'FUNDED_BY'
  | 'ACQUIRED'
  | 'PARTNERS_WITH'
  | 'RECOMMENDED_FOR';

export interface EntityRelationship {
  from: string;
  to: string;
  type: RelationshipType;
  evidence: 'official_link' | 'editorial_mapping' | 'community_mapping' | 'api_documentation';
  strength: 'strong' | 'medium' | 'weak';
  bidirectional: boolean;
}

export interface GraphNode {
  id: string;
  name: string;
  type: EntityType;
  slug: string;
  weight: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  type: RelationshipType;
  weight: number;
}

export interface EntityGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export const entityRelationships: EntityRelationship[] = [
  { from: 'openai', to: 'gpt-4o', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'openai', to: 'chatgpt', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'openai', to: 'openai-agents-sdk', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'anthropic', to: 'claude-sonnet-4', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'anthropic', to: 'claude-code', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'anthropic', to: 'claude', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'google', to: 'gemini-2.5-pro', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'google', to: 'gemini', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'microsoft', to: 'github-copilot', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'microsoft', to: 'autogen', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'microsoft', to: 'microsoft-copilot', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'microsoft', to: 'semantic-kernel', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'meta', to: 'llama-4-maverick', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'mistral', to: 'mistral-large-3', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'cursor', to: 'cursor-ai', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'vapi', to: 'vapi-ai', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'yellow-ai', to: 'yellow-ai-platform', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'n8n', to: 'n8n-agent', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'perplexity', to: 'perplexity-ai', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'cohere', to: 'command-r-plus', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'xai', to: 'grok-3', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'elevenlabs', to: 'eleven-v3', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'elevenlabs', to: 'elevenlabs-voice-agents', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'retell', to: 'retell-ai', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'bland', to: 'bland-ai', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'dify', to: 'dify-agent', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'langchain', to: 'langchain-framework', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'langchain', to: 'langgraph', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'pinecone', to: 'pinecone-db', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'weaviate', to: 'weaviate-db', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'flowise', to: 'flowise-agent', type: 'BUILT_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'cursor-ai', to: 'claude-sonnet-4', type: 'USES', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'cursor-ai', to: 'gpt-4o', type: 'USES', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'github-copilot', to: 'gpt-4o', type: 'USES', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'github-copilot', to: 'claude-sonnet-4', type: 'USES', evidence: 'official_link', strength: 'medium', bidirectional: false },
  { from: 'claude-code', to: 'claude-sonnet-4', type: 'USES', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'claude-code', to: 'claude-opus-4', type: 'USES', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'windsurf', to: 'claude-sonnet-4', type: 'USES', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'windsurf', to: 'gpt-4o', type: 'USES', evidence: 'official_link', strength: 'medium', bidirectional: false },
  { from: 'vapi-ai', to: 'gpt-4o', type: 'USES', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'vapi-ai', to: 'eleven-v3', type: 'USES', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'retell-ai', to: 'gpt-4o', type: 'USES', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'bland-ai', to: 'gpt-4o', type: 'USES', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'chatgpt', to: 'gpt-4o', type: 'USES', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'claude', to: 'claude-sonnet-4', type: 'USES', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'gemini', to: 'gemini-2.5-pro', type: 'USES', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'microsoft-copilot', to: 'gpt-4o', type: 'USES', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'n8n-agent', to: 'gpt-4o', type: 'USES', evidence: 'official_link', strength: 'medium', bidirectional: false },
  { from: 'dify-agent', to: 'gpt-4o', type: 'USES', evidence: 'official_link', strength: 'medium', bidirectional: false },
  { from: 'dify-agent', to: 'claude-sonnet-4', type: 'USES', evidence: 'official_link', strength: 'medium', bidirectional: false },
  { from: 'flowise-agent', to: 'gpt-4o', type: 'USES', evidence: 'official_link', strength: 'medium', bidirectional: false },
  { from: 'crewai', to: 'langchain', type: 'INTEGRATES_WITH', evidence: 'official_link', strength: 'strong', bidirectional: true },
  { from: 'langgraph', to: 'langchain', type: 'DEPENDS_ON', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'llamaindex', to: 'langchain', type: 'INTEGRATES_WITH', evidence: 'official_link', strength: 'medium', bidirectional: true },
  { from: 'cursor-ai', to: 'mcp-filesystem', type: 'SUPPORTS_MCP', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'cursor-ai', to: 'mcp-github', type: 'SUPPORTS_MCP', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'cursor-ai', to: 'mcp-postgres', type: 'SUPPORTS_MCP', evidence: 'official_link', strength: 'medium', bidirectional: false },
  { from: 'claude-code', to: 'mcp-filesystem', type: 'SUPPORTS_MCP', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'claude-code', to: 'mcp-github', type: 'SUPPORTS_MCP', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'claude-code', to: 'mcp-postgres', type: 'SUPPORTS_MCP', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'claude-code', to: 'mcp-puppeteer', type: 'SUPPORTS_MCP', evidence: 'official_link', strength: 'medium', bidirectional: false },
  { from: 'claude-code', to: 'mcp-brave-search', type: 'SUPPORTS_MCP', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'claude-code', to: 'mcp-memory', type: 'SUPPORTS_MCP', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'n8n-agent', to: 'mcp-filesystem', type: 'SUPPORTS_MCP', evidence: 'community_mapping', strength: 'medium', bidirectional: false },
  { from: 'dify-agent', to: 'mcp-filesystem', type: 'SUPPORTS_MCP', evidence: 'community_mapping', strength: 'medium', bidirectional: false },
  { from: 'flowise-agent', to: 'mcp-filesystem', type: 'SUPPORTS_MCP', evidence: 'community_mapping', strength: 'medium', bidirectional: false },
  { from: 'cursor-ai', to: 'github-copilot', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'cursor-ai', to: 'windsurf', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'cursor-ai', to: 'replit-ai', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'medium', bidirectional: true },
  { from: 'github-copilot', to: 'windsurf', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'claude-code', to: 'cursor-ai', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'claude-code', to: 'github-copilot', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'vapi-ai', to: 'retell-ai', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'vapi-ai', to: 'bland-ai', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'vapi-ai', to: 'elevenlabs-voice-agents', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'medium', bidirectional: true },
  { from: 'retell-ai', to: 'bland-ai', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'yellow-ai', to: 'intercom-fin', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'yellow-ai', to: 'haptik', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'intercom-fin', to: 'zendesk', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'n8n-agent', to: 'make', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'n8n-agent', to: 'zapier', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'make', to: 'zapier', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'crewai', to: 'langgraph', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'crewai', to: 'autogen', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'langgraph', to: 'autogen', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'dify-agent', to: 'flowise-agent', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'openai', to: 'anthropic', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'openai', to: 'google', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'anthropic', to: 'google', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'chatgpt', to: 'claude', type: 'ALTERNATIVE_TO', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'chatgpt', to: 'gemini', type: 'ALTERNATIVE_TO', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'claude', to: 'gemini', type: 'ALTERNATIVE_TO', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'cursor-ai', to: 'claude-code', type: 'ALTERNATIVE_TO', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'github-copilot', to: 'cursor-ai', type: 'ALTERNATIVE_TO', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'vapi-ai', to: 'retell-ai', type: 'ALTERNATIVE_TO', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'yellow-ai', to: 'haptik', type: 'ALTERNATIVE_TO', evidence: 'editorial_mapping', strength: 'medium', bidirectional: true },
  { from: 'n8n-agent', to: 'zapier', type: 'ALTERNATIVE_TO', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'crewai', to: 'langgraph', type: 'ALTERNATIVE_TO', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'dify-agent', to: 'flowise-agent', type: 'ALTERNATIVE_TO', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'langsmith', to: 'agentops', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'langsmith', to: 'arize-phoenix', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'agentops', to: 'helicone', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'medium', bidirectional: true },
  { from: 'pinecone', to: 'weaviate', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'pinecone', to: 'qdrant', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'weaviate', to: 'qdrant', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'pinecone', to: 'chroma', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'replicate', to: 'together-ai', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'replicate', to: 'fireworks', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'together-ai', to: 'fireworks', type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'ollama', to: 'lm-studio', type: 'ALTERNATIVE_TO', evidence: 'editorial_mapping', strength: 'strong', bidirectional: true },
  { from: 'cursor-ai', to: 'mcp-github', type: 'INTEGRATES_WITH', evidence: 'official_link', strength: 'strong', bidirectional: true },
  { from: 'claude-code', to: 'mcp-github', type: 'INTEGRATES_WITH', evidence: 'official_link', strength: 'strong', bidirectional: true },
  { from: 'claude-code', to: 'mcp-slack', type: 'INTEGRATES_WITH', evidence: 'official_link', strength: 'medium', bidirectional: true },
  { from: 'n8n-agent', to: 'slack', type: 'INTEGRATES_WITH', evidence: 'official_link', strength: 'strong', bidirectional: true },
  { from: 'n8n-agent', to: 'google-sheets', type: 'INTEGRATES_WITH', evidence: 'official_link', strength: 'strong', bidirectional: true },
  { from: 'yellow-ai', to: 'whatsapp', type: 'INTEGRATES_WITH', evidence: 'official_link', strength: 'strong', bidirectional: true },
  { from: 'vapi-ai', to: 'twilio', type: 'INTEGRATES_WITH', evidence: 'official_link', strength: 'strong', bidirectional: true },
  { from: 'retell-ai', to: 'twilio', type: 'INTEGRATES_WITH', evidence: 'official_link', strength: 'strong', bidirectional: true },
  { from: 'replit-ai', to: 'github', type: 'INTEGRATES_WITH', evidence: 'official_link', strength: 'strong', bidirectional: true },
  { from: 'github-copilot', to: 'github', type: 'EMBEDDED_IN', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'cursor-ai', to: 'vscode', type: 'RUNS_ON', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'github-copilot', to: 'vscode', type: 'RUNS_ON', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'windsurf', to: 'vscode', type: 'RUNS_ON', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'chatgpt', to: 'gpt-4o', type: 'POWERS', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'claude', to: 'claude-sonnet-4', type: 'POWERS', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'gemini', to: 'gemini-2.5-pro', type: 'POWERS', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'perplexity-ai', to: 'claude-sonnet-4', type: 'USES', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'perplexity-ai', to: 'gpt-4o', type: 'USES', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'qodo', to: 'claude-sonnet-4', type: 'USES', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'qodo', to: 'gpt-4o', type: 'USES', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'intercom-fin', to: 'gpt-4o', type: 'USES', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'microsoft-copilot', to: 'phi-4', type: 'USES', evidence: 'official_link', strength: 'medium', bidirectional: false },
  { from: 'openai', to: 'microsoft', type: 'FUNDED_BY', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'mistral', to: 'microsoft', type: 'PARTNERS_WITH', evidence: 'official_link', strength: 'medium', bidirectional: true },
  { from: 'haptik', to: 'reliance', type: 'ACQUIRED', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'zendesk', to: 'hellman-friedman', type: 'ACQUIRED', evidence: 'official_link', strength: 'strong', bidirectional: false },
  { from: 'cursor-ai', to: 'coding', type: 'RECOMMENDED_FOR', evidence: 'editorial_mapping', strength: 'strong', bidirectional: false },
  { from: 'github-copilot', to: 'coding', type: 'RECOMMENDED_FOR', evidence: 'editorial_mapping', strength: 'strong', bidirectional: false },
  { from: 'claude-code', to: 'coding', type: 'RECOMMENDED_FOR', evidence: 'editorial_mapping', strength: 'strong', bidirectional: false },
  { from: 'vapi-ai', to: 'voice-agents', type: 'RECOMMENDED_FOR', evidence: 'editorial_mapping', strength: 'strong', bidirectional: false },
  { from: 'retell-ai', to: 'voice-agents', type: 'RECOMMENDED_FOR', evidence: 'editorial_mapping', strength: 'strong', bidirectional: false },
  { from: 'yellow-ai', to: 'whatsapp-automation', type: 'RECOMMENDED_FOR', evidence: 'editorial_mapping', strength: 'strong', bidirectional: false },
  { from: 'n8n-agent', to: 'workflow-automation', type: 'RECOMMENDED_FOR', evidence: 'editorial_mapping', strength: 'strong', bidirectional: false },
  { from: 'crewai', to: 'multi-agent', type: 'RECOMMENDED_FOR', evidence: 'editorial_mapping', strength: 'strong', bidirectional: false },
  { from: 'langgraph', to: 'multi-agent', type: 'RECOMMENDED_FOR', evidence: 'editorial_mapping', strength: 'strong', bidirectional: false },
  { from: 'perplexity-ai', to: 'research', type: 'RECOMMENDED_FOR', evidence: 'editorial_mapping', strength: 'strong', bidirectional: false },
  { from: 'chatgpt', to: 'general-purpose', type: 'RECOMMENDED_FOR', evidence: 'editorial_mapping', strength: 'strong', bidirectional: false },
];

export function getRelationshipsForEntity(entityId: string): EntityRelationship[] {
  const outgoing = _relationshipIndex.get(entityId) || [];
  const incoming = entityRelationships.filter(r => r.to === entityId && !r.bidirectional);
  return [...outgoing, ...incoming];
}

export function getRelationshipsByType(type: RelationshipType): EntityRelationship[] {
  return entityRelationships.filter(r => r.type === type);
}

export function getOutgoingRelationships(entityId: string): EntityRelationship[] {
  return _relationshipIndex.get(entityId) || [];
}

export function getIncomingRelationships(entityId: string): EntityRelationship[] {
  return entityRelationships.filter(r => r.to === entityId && !r.bidirectional);
}

export function getRelatedEntities(entityId: string): string[] {
  const related = new Set<string>();
  const rels = getRelationshipsForEntity(entityId);
  rels.forEach(r => {
    if (r.from === entityId) related.add(r.to);
    if (r.to === entityId) related.add(r.from);
  });
  return Array.from(related);
}

export function getCompetitors(entityId: string): string[] {
  const rels = _relationshipIndex.get(entityId) || [];
  return rels
    .filter(r => r.type === 'COMPETES_WITH')
    .map(r => r.from === entityId ? r.to : r.from);
}

export function getAlternatives(entityId: string): string[] {
  const rels = _relationshipIndex.get(entityId) || [];
  return rels
    .filter(r => r.type === 'ALTERNATIVE_TO')
    .map(r => r.from === entityId ? r.to : r.from);
}

export function getIntegrations(entityId: string): string[] {
  const rels = _relationshipIndex.get(entityId) || [];
  return rels
    .filter(r => r.type === 'INTEGRATES_WITH')
    .map(r => r.from === entityId ? r.to : r.from);
}

// Pre-built index for O(1) relationship lookups
const _relationshipIndex: Map<string, EntityRelationship[]> = (() => {
  const index = new Map<string, EntityRelationship[]>();
  entityRelationships.forEach(r => {
    if (!index.has(r.from)) index.set(r.from, []);
    index.get(r.from)!.push(r);
    if (r.bidirectional) {
      if (!index.has(r.to)) index.set(r.to, []);
      index.get(r.to)!.push(r);
    }
  });
  return index;
})();

export function buildEntityGraph(): EntityGraph {
  const nodeMap = new Map<string, GraphNode>();
  const edgeList: GraphEdge[] = [];

  const allEntities = [
    ...companyEntities.map(e => ({ id: e.id, name: e.name, type: e.type as EntityType, slug: e.slug })),
    ...modelEntities.map(e => ({ id: e.id, name: e.name, type: e.type as EntityType, slug: e.slug })),
    ...agentEntities.map(e => ({ id: e.id, name: e.name, type: e.type as EntityType, slug: e.slug })),
    ...frameworkEntities.map(e => ({ id: e.id, name: e.name, type: e.type as EntityType, slug: e.slug })),
    ...mcpEntities.map(e => ({ id: e.id, name: e.name, type: e.type as EntityType, slug: e.slug })),
  ];

  allEntities.forEach(e => {
    if (!nodeMap.has(e.id)) {
      nodeMap.set(e.id, { id: e.id, name: e.name, type: e.type, slug: e.slug, weight: 1 });
    } else {
      const node = nodeMap.get(e.id)!;
      node.weight++;
    }
  });

  entityRelationships.forEach(r => {
    edgeList.push({
      source: r.from,
      target: r.to,
      type: r.type,
      weight: r.strength === 'strong' ? 3 : r.strength === 'medium' ? 2 : 1,
    });
    if (r.bidirectional) {
      edgeList.push({
        source: r.to,
        target: r.from,
        type: r.type,
        weight: r.strength === 'strong' ? 3 : r.strength === 'medium' ? 2 : 1,
      });
    }
  });

  return { nodes: Array.from(nodeMap.values()), edges: edgeList };
}

export function getEntityGraphJson(): string {
  return JSON.stringify(buildEntityGraph(), null, 2);
}

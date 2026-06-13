import {
  authorityEntities,
  entityRelationships,
  EntityRelationship,
  RelationshipType,
} from '../data/entityGraph';
import { companyEntities } from '../data/entities/companyEntities';
import { modelEntities } from '../data/entities/modelEntities';
import { agentEntities } from '../data/entities/agentEntities';
import { frameworkEntities } from '../data/entities/frameworkEntities';
import { mcpEntities } from '../data/entities/mcpEntities';
import { vectorDbEntities } from '../data/entities/vectorDbEntities';
import { voicePlatformEntities } from '../data/entities/voicePlatformEntities';

export interface Entity {
  id: string;
  name: string;
  type: string;
  description: string;
  url?: string;
  logo?: string;
  relationships: Relationship[];
}

export type Relationship =
  | 'USES'
  | 'ALTERNATIVE_TO'
  | 'COMPETES_WITH'
  | 'INTEGRATES_WITH'
  | 'RUNS_ON'
  | 'BUILT_BY'
  | 'SUPPORTS_MCP';

export interface SuggestedLink {
  id: string;
  name: string;
  url: string;
  reason: string;
  relationship?: Relationship;
}

type EntityLike = {
  id: string;
  name: string;
  type: string;
  slug?: string;
  overview?: string;
  products?: string[];
  competitors?: string[];
  alternatives?: string[];
  url?: string;
  logo?: string;
};

const allEntitySources: EntityLike[][] = [
  companyEntities as EntityLike[],
  modelEntities as EntityLike[],
  agentEntities as EntityLike[],
  frameworkEntities as EntityLike[],
  mcpEntities as EntityLike[],
  vectorDbEntities as EntityLike[],
  voicePlatformEntities as EntityLike[],
  authorityEntities as unknown as EntityLike[],
];

const derivedRelationships: EntityRelationship[] = [
  { from: 'cursor-ai', to: 'claude-3-5-sonnet', type: 'USES', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'cursor-ai', to: 'gpt-4o', type: 'USES', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'github-copilot', to: 'gpt-4o', type: 'USES', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'claude-code', to: 'claude-3-5-sonnet', type: 'USES', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'chatgpt', to: 'gpt-4o', type: 'USES', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'claude', to: 'claude-3-5-sonnet', type: 'USES', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'gemini', to: 'gemini-1-5-pro', type: 'USES', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'vapi-ai', to: 'gpt-4o', type: 'USES', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'vapi-ai', to: 'claude-3-5-sonnet', type: 'USES', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'retell-ai', to: 'gpt-4o', type: 'USES', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'yellow-ai', to: 'gpt-4o', type: 'USES', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'flowise', to: 'langchain', type: 'USES', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'dify', to: 'langchain', type: 'USES', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'langgraph', to: 'langchain', type: 'USES', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'semantic-kernel', to: 'azure-openai', type: 'RUNS_ON', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'openai-agents-sdk', to: 'gpt-4o', type: 'USES', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'gpt-4o', to: 'openai', type: 'BUILT_BY', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'gpt-4-turbo', to: 'openai', type: 'BUILT_BY', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'gpt-4-1', to: 'openai', type: 'BUILT_BY', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'o3-mini', to: 'openai', type: 'BUILT_BY', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'claude-3-5-sonnet', to: 'anthropic', type: 'BUILT_BY', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'claude-3-5-haiku', to: 'anthropic', type: 'BUILT_BY', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'claude-3-opus', to: 'anthropic', type: 'BUILT_BY', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'gemini-1-5-pro', to: 'google', type: 'BUILT_BY', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'gemini-2-0-flash', to: 'google', type: 'BUILT_BY', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'gemma-2', to: 'google', type: 'BUILT_BY', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'phi-4', to: 'microsoft', type: 'BUILT_BY', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'llama-3-3-70b', to: 'meta', type: 'BUILT_BY', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'llama-3-1-405b', to: 'meta', type: 'BUILT_BY', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'mixtral-8x7b', to: 'mistralai', type: 'BUILT_BY', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'mistral-small', to: 'mistralai', type: 'BUILT_BY', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'qwen-2-5-72b', to: 'qwen', type: 'BUILT_BY', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'deepseek-r1', to: 'deepseek', type: 'BUILT_BY', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'nemotron-4-340b', to: 'nvidia', type: 'BUILT_BY', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'watsonx-llm', to: 'ibm', type: 'BUILT_BY', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'bedrock-anthropic-claude', to: 'aws', type: 'RUNS_ON', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'aws-titan', to: 'aws', type: 'BUILT_BY', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'azure-openai', to: 'microsoft', type: 'RUNS_ON', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'pinecone', to: 'langchain', type: 'INTEGRATES_WITH', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'weaviate', to: 'langchain', type: 'INTEGRATES_WITH', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'qdrant', to: 'langchain', type: 'INTEGRATES_WITH', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'milvus', to: 'llamaindex', type: 'INTEGRATES_WITH', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'chromadb', to: 'llamaindex', type: 'INTEGRATES_WITH', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'filesystem-server', to: 'cursor-ai', type: 'SUPPORTS_MCP', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'filesystem-server', to: 'claude-code', type: 'SUPPORTS_MCP', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'postgres-server', to: 'cursor-ai', type: 'SUPPORTS_MCP', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'postgres-server', to: 'claude-code', type: 'SUPPORTS_MCP', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'redis-server', to: 'cursor-ai', type: 'SUPPORTS_MCP', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'slack-server', to: 'cursor-ai', type: 'SUPPORTS_MCP', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'github-server', to: 'cursor-ai', type: 'SUPPORTS_MCP', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'notion-server', to: 'cursor-ai', type: 'SUPPORTS_MCP', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'stripe-server', to: 'chatgpt', type: 'SUPPORTS_MCP', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'stripe-server', to: 'claude-code', type: 'SUPPORTS_MCP', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'mongodb-server', to: 'cursor-ai', type: 'SUPPORTS_MCP', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'gcs-server', to: 'chatgpt', type: 'SUPPORTS_MCP', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'azure-blob-server', to: 'claude-code', type: 'SUPPORTS_MCP', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'twilio-server', to: 'vapi-ai', type: 'SUPPORTS_MCP', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
  { from: 'gitlab-server', to: 'claude-code', type: 'SUPPORTS_MCP', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false },
];


const entityMap = new Map<string, EntityLike>();

for (const source of allEntitySources) {
  for (const entity of source) {
    if (!entityMap.has(entity.id)) {
      entityMap.set(entity.id, entity);
    }
  }
}

const relationships = dedupeRelationships([
  ...entityRelationships,
  ...derivedRelationships,
  ...deriveRelationshipsFromEntityFields(),
]);

function deriveRelationshipsFromEntityFields(): EntityRelationship[] {
  const relationships: EntityRelationship[] = [];
  for (const entity of entityMap.values()) {
    for (const competitor of entity.competitors || []) {
      relationships.push({ from: entity.id, to: competitor, type: 'COMPETES_WITH', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false });
    }
    for (const alternative of entity.alternatives || []) {
      relationships.push({ from: entity.id, to: alternative, type: 'ALTERNATIVE_TO', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false });
    }
    for (const product of entity.products || []) {
      if (entityMap.has(product)) {
        relationships.push({ from: product, to: entity.id, type: 'BUILT_BY', evidence: 'editorial_mapping', strength: 'medium', bidirectional: false });
      }
    }
  }
  return relationships;
}

function dedupeRelationships(items: EntityRelationship[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = `${item.from}->${item.to}:${item.type}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function getEntity(entityId: string): Entity | undefined {
  const entity = entityMap.get(entityId);
  return entity ? toPublicEntity(entity) : undefined;
}

export function getAllEntities(): Entity[] {
  return Array.from(entityMap.values()).map(toPublicEntity);
}

export function getRelationshipsForEntity(entityId: string, relationshipType?: string): EntityRelationship[] {
  return relationships.filter((relationship) => {
    const matchesEntity = relationship.from === entityId || relationship.to === entityId;
    const matchesType = !relationshipType || relationship.type === relationshipType;
    return matchesEntity && matchesType;
  });
}

export function getRelatedEntities(entityId: string, relationshipType?: string): Entity[] {
  const relatedIds = new Set<string>();
  for (const relationship of getRelationshipsForEntity(entityId, relationshipType)) {
    relatedIds.add(relationship.from === entityId ? relationship.to : relationship.from);
  }

  return Array.from(relatedIds)
    .map((relatedId) => getEntity(relatedId))
    .filter((entity): entity is Entity => Boolean(entity));
}

export function suggestInternalLinks(content: string, currentEntityId: string): SuggestedLink[] {
  const currentEntity = getEntity(currentEntityId);
  if (!currentEntity) return [];

  const lowerContent = content.toLowerCase();
  const currentUrl = currentEntity.url || `/entity/${currentEntity.id}`;
  const related = getRelatedEntities(currentEntityId);
  const keywordMatches = getAllEntities().filter((entity) => {
    if (entity.id === currentEntityId || entity.url === currentUrl) return false;
    if (lowerContent.includes((entity.url || '').toLowerCase())) return false;
    const haystack = `${entity.name} ${entity.description} ${entity.type}`.toLowerCase();
    return lowerContent.split(/\s+/).filter((word) => word.length > 4).some((word) => haystack.includes(word));
  });

  const candidates = [
    ...related.map((entity) => ({
      entity,
      reason: relationshipLabel(getRelationshipsForEntity(currentEntityId).find((relationship) => {
        const other = relationship.from === currentEntityId ? relationship.to : relationship.from;
        return other === entity.id;
      })?.type as Relationship),
    })),
    ...keywordMatches.slice(0, 8).map((entity) => ({
      entity,
      reason: 'Content keyword relevance',
    })),
  ];

  const seen = new Set<string>();
  return candidates
    .filter(({ entity }) => {
      if (seen.has(entity.id)) return false;
      seen.add(entity.id);
      return true;
    })
    .slice(0, 8)
    .map(({ entity, reason }) => ({
      id: entity.id,
      name: entity.name,
      url: entity.url || `/entity/${entity.id}`,
      reason,
      relationship: getRelationshipsForEntity(currentEntityId).find((relationship) => {
        const other = relationship.from === currentEntityId ? relationship.to : relationship.from;
        return other === entity.id;
      })?.type as Relationship,
    }));
}

function relationshipLabel(type?: Relationship) {
  if (!type) return 'Related entity';
  return type.toLowerCase().replaceAll('_', ' ');
}

function toPublicEntity(entity: EntityLike): Entity {
  return {
    id: entity.id,
    name: entity.name,
    type: entity.type,
    description: entity.overview || '',
    url: entity.url || `/entity/${entity.slug || entity.id}`,
    logo: entity.logo,
    relationships: getRelationshipsForEntity(entity.id).map((relationship) => relationship.type as Relationship),
  };
}

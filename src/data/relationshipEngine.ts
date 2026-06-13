import { AuthorityEntity, entityRelationships, authorityEntities } from './entityGraph';
import { companyEntities } from './companyEntities';
import { modelEntities } from './modelEntities';
import { agentEntities } from './agentEntities';
import { frameworkEntities } from './frameworkEntities';
import { mcpEntities } from './mcpEntities';
import { builderEntities } from './builderEntities';
import { vectorDbEntities } from './vectorDbEntities';
import { voicePlatformEntities } from './voicePlatformEntities';
import { hostingEntities } from './hostingEntities';

type AnyAuthorityEntity = AuthorityEntity & Record<string, unknown>;

// Combine all entities into a single array
export const allEntities: AnyAuthorityEntity[] = [
  ...(authorityEntities as unknown as AnyAuthorityEntity[]),
  ...(companyEntities as unknown as AnyAuthorityEntity[]),
  ...(modelEntities as unknown as AnyAuthorityEntity[]),
  ...(agentEntities as unknown as AnyAuthorityEntity[]),
  ...(frameworkEntities as unknown as AnyAuthorityEntity[]),
  ...(mcpEntities as unknown as AnyAuthorityEntity[]),
  ...(builderEntities as unknown as AnyAuthorityEntity[]),
  ...(vectorDbEntities as unknown as AnyAuthorityEntity[]),
  ...(voicePlatformEntities as unknown as AnyAuthorityEntity[]),
  ...(hostingEntities as unknown as AnyAuthorityEntity[]),
];

// Create a map for quick lookup by id or slug
const entityMap = new Map<string, AnyAuthorityEntity>();
allEntities.forEach(entity => {
  entityMap.set(entity.id, entity);
  entityMap.set(entity.slug, entity);
});

/**
 * Get an entity by its ID or slug.
 * @param idOrSlug The entity's ID or slug
 * @returns The entity if found, undefined otherwise
 */
export function getEntity(idOrSlug: string): AnyAuthorityEntity | undefined {
  return entityMap.get(idOrSlug);
}

/**
 * Get all relationships where the given entity is either the 'from' or 'to'.
 * @param idOrSlug The entity's ID or slug
 * @returns Array of relationships involving the entity
 */
export function getRelationshipsForEntity(idOrSlug: string): typeof entityRelationships {
  return entityRelationships.filter(rel =>
    rel.from === idOrSlug || rel.to === idOrSlug
  );
}

/**
 * Get related entities for the given entity.
 * @param idOrSlug The entity's ID or slug
 * @param max Optional maximum number of related entities to return
 * @returns Array of related entities (without duplicates)
 */
export function getRelatedEntities(idOrSlug: string, max?: number): AnyAuthorityEntity[] {
  const relationships = getRelationshipsForEntity(idOrSlug);
  const relatedIds = new Set<string>();

  // Collect related entity IDs from both directions
  relationships.forEach(rel => {
    if (rel.from === idOrSlug) {
      relatedIds.add(rel.to);
    } else if (rel.to === idOrSlug) {
      relatedIds.add(rel.from);
    }
  });

  // Convert IDs to entities, filtering out undefined
  const relatedEntities = Array.from(relatedIds)
    .map(id => getEntity(id))
    .filter((entity): entity is AnyAuthorityEntity => entity !== undefined);

  // Limit if max is specified
  if (max !== undefined) {
    return relatedEntities.slice(0, max);
  }
  return relatedEntities;
}

/**
 * Suggest internal links for an article about the given entity.
 * Returns a list of related entities that could be linked to, up to maxLinks.
 * @param idOrSlug The entity's ID or slug (the main topic of the article)
 * @param maxLinks Maximum number of links to suggest (default 10)
 * @returns Array of suggested entities to link to
 */
export function suggestInternalLinks(idOrSlug: string, maxLinks: number = 10): AnyAuthorityEntity[] {
  // For now, we simply return related entities.
  // In a more advanced implementation, we would analyze the content to find mentions of other entities.
  return getRelatedEntities(idOrSlug, maxLinks);
}

/**
 * Get a list of all entity slugs for reference.
 */
export function getAllEntitySlugs(): string[] {
  return allEntities.map(entity => entity.slug);
}

/**
 * Get a list of all entity IDs for reference.
 */
export function getAllEntityIds(): string[] {
  return allEntities.map(entity => entity.id);
}
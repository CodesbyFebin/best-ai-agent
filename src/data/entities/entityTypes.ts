export type EntityType =
  | 'Company'
  | 'Model'
  | 'Agent'
  | 'Framework'
  | 'Builder'
  | 'MCP Server'
  | 'Tool'
  | 'Hosting'
  | 'VectorDb'
  | 'VoicePlatform'
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
  | 'RECOMMENDED_FOR'
  | 'MAINTAINS';

export interface EntityRelationship {
  from: string;
  to: string;
  type: RelationshipType;
  evidence: 'official_link' | 'editorial_mapping' | 'community_mapping' | 'api_documentation';
  strength: 'strong' | 'medium' | 'weak';
  bidirectional: boolean;
}

export interface AuthorityEntity {
  id: string;
  name: string;
  type: EntityType;
  slug: string;
  overview: string;
  products: string[];
  competitors: string[];
  funding: 'not_tracked' | 'publicly_reported' | 'unknown';
  features: string[];
  pricing: 'free' | 'freemium' | 'paid' | 'open_source' | 'enterprise' | 'usage_based' | 'not_tracked';
  alternatives: string[];
  verificationStatus: 'verified' | 'partially_verified' | 'community_verified' | 'pending_verification';
  confidenceLevel: number;
  lastVerified: string;
  officialLinks?: unknown;
}

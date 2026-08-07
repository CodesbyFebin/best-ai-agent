export type RegistryPresence =
  | 'OFFICIAL_REGISTRY'
  | 'VENDOR_SOURCE_ONLY'
  | 'COMMUNITY_SOURCE_ONLY'
  | 'NOT_VERIFIED';

export type PublisherRelationship =
  | 'OFFICIAL'
  | 'COMMUNITY'
  | 'THIRD_PARTY'
  | 'UNKNOWN';

export interface DirectoryEntry {
  name: string;
  title: string;
  description: string;
  url: string;
  category: string;
  registry_presence: RegistryPresence;
  publisher_relationship: PublisherRelationship;
  official_registry_entry?: {
    serverName: string;
    latestVersion: string;
    packages: Array<{
      registryType: 'npm' | 'pypi' | 'cargo' | 'oci' | 'nuget' | 'mcpb';
      identifier: string;
      version: string;
      transport: 'stdio' | 'streamable-http' | 'sse';
      url?: string;
    }>;
    remotes?: Array<{
      type: 'streamable-http' | 'sse';
      url: string;
    }>;
    status: 'active' | 'deprecated' | 'deleted';
    publishedAt: string;
    updatedAt: string;
  };
  spec_compatibility: 'VERIFIED' | 'PARTIAL' | 'UNKNOWN' | 'NOT_COMPATIBLE';
  transport_support: {
    stdio: 'VERIFIED' | 'UNKNOWN' | 'NO';
    streamable_http: 'VERIFIED' | 'UNKNOWN' | 'NO';
  };
  auth_model: 'VERIFIED' | 'PARTIAL' | 'UNKNOWN';
  last_verified: string;
  evidence: string[];
}

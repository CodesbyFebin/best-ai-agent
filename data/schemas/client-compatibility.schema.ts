export type Relationship = 'OFFICIAL' | 'THIRD_PARTY' | 'UNKNOWN';
export type SupportLevel = 'VERIFIED' | 'PARTIAL' | 'UNKNOWN' | 'NO';

export interface CapabilityCompatibility {
  capability: string;
  supported: SupportLevel;
  notes?: string;
  evidence: string[];
}

export interface ClientCompatibilityEntry {
  client: string;
  official_source: string;
  relationship: Relationship;
  mcp_support: SupportLevel;
  stdio: SupportLevel;
  streamable_http: SupportLevel;
  auth_model: SupportLevel;
  spec_version: string;
  last_verified: string;
  capabilities: CapabilityCompatibility[];
  evidence: string[];
}

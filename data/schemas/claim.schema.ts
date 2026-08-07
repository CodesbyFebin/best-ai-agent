export type ClaimStatus =
  | 'SUPPORTED'
  | 'FALSE'
  | 'UNSUPPORTED'
  | 'PARTIAL'
  | 'UNKNOWN';

export type ClaimType =
  | 'COUNT_CLAIM'
  | 'SPEC_COMPATIBILITY'
  | 'COMPATIBILITY_BADGE'
  | 'PARTNERSHIP'
  | 'REGISTRY_LISTING'
  | 'PROTOCOL_ASSUMPTION'
  | 'AUTH_ASSUMPTION'
  | 'STATEMENT';

export interface Claim {
  id: string;
  page: string;
  claim_text: string;
  claim_type: ClaimType;
  status: ClaimStatus;
  entity_provenance: string;
  spec_compatibility: 'VERIFIED' | 'PARTIAL' | 'UNKNOWN' | 'NOT_COMPATIBLE';
  compatibility: 'VERIFIED' | 'PARTIAL' | 'UNKNOWN';
  evidence: string[];
  last_verified: string;
  remediation_required: boolean;
  remediation_notes?: string;
}

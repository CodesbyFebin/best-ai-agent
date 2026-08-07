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

export type ClaimScope =
  | 'PROTOCOL'
  | 'SDK'
  | 'OPERATIONS'
  | 'EDITORIAL';

export type FreshnessStatus =
  | 'CURRENT'
  | 'STALE_REVIEW_REQUIRED'
  | 'EXPIRED';

export interface TemporalEvidence {
  as_of: string;
  source: string;
  source_type: 'PRIMARY' | 'SECONDARY' | 'REPORTED' | 'INFERRED';
  retrieved_at: string;
  review_interval_days: number;
  next_review_due: string;
  freshness_status: FreshnessStatus;
}

export interface Claim {
  id: string;
  page: string;
  claim_text: string;
  claim_type: ClaimType;
  claim_scope: ClaimScope;
  status: ClaimStatus;
  entity_provenance: string;
  spec_compatibility: 'VERIFIED' | 'PARTIAL' | 'UNKNOWN' | 'NOT_COMPATIBLE';
  compatibility: 'VERIFIED' | 'PARTIAL' | 'UNKNOWN';
  evidence: string[];
  temporal_evidence?: TemporalEvidence;
  last_verified: string;
  remediation_required: boolean;
  remediation_notes?: string;
}

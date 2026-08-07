export type PhaseDState =
  | 'LEGACY_LIVE'
  | 'CLASSIFIED'
  | 'INTENT_VALIDATED'
  | 'CLAIMS_AUDITED'
  | 'EVIDENCE_VALIDATED'
  | 'REMEDIATED'
  | 'LINKS_VALIDATED'
  | 'SCHEMA_VALIDATED'
  | 'EDITORIAL_REVIEWED'
  | 'AUTHORITY_READY';

export type RiskCohort = 'P0' | 'P1' | 'P2' | 'P3';

export type FreshnessStatus = 'CURRENT' | 'STALE_REVIEW_REQUIRED' | 'EXPIRED';

export interface PageStateRecord {
  url: string;
  state: PhaseDState;
  risk_cohort: RiskCohort;
  authority_contract: {
    intent_owned: boolean;
    canonical_valid: boolean;
    claim_scopes_valid: boolean;
    critical_claims_supported: boolean;
    spec_freshness_valid: boolean;
    temporal_evidence_valid: boolean;
    entity_provenance_valid: boolean;
    internal_links_valid: boolean;
    schema_valid: boolean;
    manual_review_required: boolean;
  };
  false_critical_claims: number;
  unsupported_high_claims: number;
  fabricated_counts: number;
  canonical_conflicts: number;
  schema_contradictions: number;
  broken_internal_links: number;
  stale_protocol_claims: number;
  expired_temporal_evidence: number;
  remediation_required: boolean;
  remediation_notes?: string;
  reviewed_at: string;
  reviewed_by: string;
}

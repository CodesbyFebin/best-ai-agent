export interface AuthorityContract {
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
}

export interface CodeExampleRecord {
  example_id: string;
  page: string;
  language: string;
  claim_scope: 'PROTOCOL' | 'SDK' | 'OPERATIONS' | 'EDITORIAL';
  verification_state: 'TESTED' | 'SOURCE_VERIFIED' | 'ILLUSTRATIVE' | 'STALE' | 'UNVERIFIED';
  sdk_or_package: string;
  version_or_commit: string;
  source: string;
  verified_at: string;
  test_command?: string;
  test_result?: 'PASS' | 'FAIL';
  remediation_required: boolean;
  remediation_notes?: string;
}

export interface TemporalEvidence {
  as_of: string;
  source: string;
  source_type: 'PRIMARY' | 'SECONDARY' | 'REPORTED' | 'INFERRED';
  retrieved_at: string;
  review_interval_days: number;
  next_review_due: string;
  freshness_status: 'CURRENT' | 'STALE_REVIEW_REQUIRED' | 'EXPIRED';
}

export type GlossaryGateResult = 'PASS' | 'FAIL';

export interface GlossaryAntiThinnessGate {
  page: string;
  gates: {
    definition: GlossaryGateResult;
    mcp_relationship: GlossaryGateResult;
    practical_context: GlossaryGateResult;
    limitation_boundary: GlossaryGateResult;
    evidence: GlossaryGateResult;
    graph_linkage: GlossaryGateResult;
  };
  failed_count: number;
  disposition: 'PUBLISH' | 'ENRICH' | 'MERGE_OR_REMOVE_REVIEW';
}

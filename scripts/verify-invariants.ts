/**
 * ATLAS P12 — Invariant Verification Script
 * 
 * Verifies the core invariant: "A high opportunity score can NEVER override a failed hard gate."
 * 
 * Tests:
 * 1. Evidence eligibility gate failure → QUARANTINE with score=0
 * 2. Entity validity gate failure → QUARANTINE with score=0
 * 3. Cannibalization gate failure → QUARANTINE with score=0
 * 4. Freshness gate failure → QUARANTINE with score=0
 * 5. All hard gates pass → normal decision flow
 * 6. Determinism: same inputs → same outputs
 */

import { OpportunityEngine, OpportunityCandidate, DecisionReport } from '../src/opportunityEngine';
import { RouteRecord, RouteType } from '../src/routing/types';

// ============================================================
// TEST 1: Evidence eligibility gate failure
// ============================================================
console.log('=== Test 1: Evidence eligibility gate failure ===');

const engine1 = new OpportunityEngine();
const candidate1: OpportunityCandidate = {
  candidateId: 'test-1',
  proposedPath: '/test/evidence-fail',
  subjectEntityId: 'entity-1',
  type: 'agent',
  evidenceIds: ['evidence-unapproved-1'], // not in approved list
};

const context1 = {
  approvedEvidence: { 'evidence-approved-1': true }, // different ID
  entityRegistry: {
    'entity-1': {
      canonical_name: 'Test Entity',
      canonical_url: '/test/entity',
      evidence_ids: ['evidence-unapproved-1'], // not approved
      status: 'active',
      entity_type: 'agent',
      related_entity_ids: [],
      related_keyword_ids: [],
      identity_confidence: 0.8,
      updatedAt: new Date().toISOString(),
    },
  },
  keywordIds: ['best', 'ai', 'agent'],
  internalLinkCount: 5,
  lastEvaluatedAt: new Date().toISOString(),
};

const report1: DecisionReport = engine1.evaluate(candidate1, context1);

if (report1.decisions[0].decision !== 'quarantine') {
  console.error(`FAIL: Expected quarantine, got ${report1.decisions[0].decision}`);
  process.exit(1);
}
if (report1.hardGateFailures !== 1) {
  console.error(`FAIL: Expected 1 hard gate failure, got ${report1.hardGateFailures}`);
  process.exit(1);
}
if (report1.decisions[0].opportunityScore !== 0) {
  console.error(`FAIL: Expected opportunityScore=0, got ${report1.decisions[0].opportunityScore}`);
  process.exit(1);
}
if (report1.decisions[0].reasonCodes.includes('hard_gate_failed') === false) {
  console.error(`FAIL: Expected reasonCodes to include 'hard_gate_failed'`);
  process.exit(1);
}
if (report1.comments.includes('Hard gate failed') === false) {
  console.error(`FAIL: Expected comments to mention hard gate failure`);
  process.exit(1);
}
console.log('PASS: Evidence eligibility gate → QUARANTINE with score=0');

// ============================================================
// TEST 2: Entity validity gate failure
// ============================================================
console.log('\n=== Test 2: Entity validity gate failure ===');

const engine2 = new OpportunityEngine();
const candidate2: OpportunityCandidate = {
  candidateId: 'test-2',
  proposedPath: '/test/entity-validity-fail',
  subjectEntityId: 'entity-deprecated',
  type: 'agent',
  evidenceIds: ['evidence-approved-1'],
};

const context2 = {
  approvedEvidence: { 'evidence-approved-1': true },
  entityRegistry: {
    'entity-deprecated': {
      canonical_name: 'Deprecated Entity',
      canonical_url: '/test/deprecated',
      evidence_ids: ['evidence-approved-1'],
      status: 'deprecated', // This should fail the entity validity gate
      entity_type: 'agent',
      related_entity_ids: [],
      related_keyword_ids: [],
      identity_confidence: 0.8,
      updatedAt: new Date().toISOString(),
    },
  },
  keywordIds: ['best', 'ai', 'agent'],
  internalLinkCount: 5,
  lastEvaluatedAt: new Date().toISOString(),
};

const report2: DecisionReport = engine2.evaluate(candidate2, context2);

if (report2.decisions[0].decision !== 'quarantine') {
  console.error(`FAIL: Expected quarantine, got ${report2.decisions[0].decision}`);
  process.exit(1);
}
if (report2.hardGateFailures !== 1) {
  console.error(`FAIL: Expected 1 hard gate failure, got ${report2.hardGateFailures}`);
  process.exit(1);
}
if (report2.decisions[0].opportunityScore !== 0) {
  console.error(`FAIL: Expected opportunityScore=0, got ${report2.decisions[0].opportunityScore}`);
  process.exit(1);
}
if (report2.comments.includes('Hard gate failed') === false) {
  console.error(`FAIL: Expected comments to mention hard gate failure`);
  process.exit(1);
}
console.log('PASS: Entity validity gate → QUARANTINE with score=0');

// ============================================================
// TEST 3: Cannibalization gate failure
// ============================================================
console.log('\n=== Test 3: Cannibalization gate failure ===');

const engine3 = new OpportunityEngine();
const candidate3: OpportunityCandidate = {
  candidateId: 'test-3',
  proposedPath: '/best-ai-agent', // already published
  subjectEntityId: 'entity-3',
  type: 'pillar', // type matches existing published
  evidenceIds: ['evidence-approved-1'],
};

const context3 = {
  approvedEvidence: { 'evidence-approved-1': true },
  entityRegistry: {
    'entity-3': {
      canonical_name: 'Test Entity',
      canonical_url: '/test/entity', // has canonical_url → cannibalization
      evidence_ids: ['evidence-approved-1'],
      status: 'active',
      entity_type: 'agent',
      related_entity_ids: [],
      related_keyword_ids: [],
      identity_confidence: 0.8,
      updatedAt: new Date().toISOString(),
    },
  },
  keywordIds: ['best', 'ai', 'agent'],
  internalLinkCount: 5,
  lastEvaluatedAt: new Date().toISOString(),
};

const report3: DecisionReport = engine3.evaluate(candidate3, context3);

if (report3.decisions[0].decision !== 'quarantine') {
  console.error(`FAIL: Expected quarantine, got ${report3.decisions[0].decision}`);
  process.exit(1);
}
if (report3.hardGateFailures !== 1) {
  console.error(`FAIL: Expected 1 hard gate failure, got ${report3.hardGateFailures}`);
  process.exit(1);
}
if (report3.decisions[0].opportunityScore !== 0) {
  console.error(`FAIL: Expected opportunityScore=0, got ${report3.decisions[0].opportunityScore}`);
  process.exit(1);
}
if (report3.comments.includes('Hard gate failed') === false) {
  console.error(`FAIL: Expected comments to mention hard gate failure`);
  process.exit(1);
}
console.log('PASS: Cannibalization gate → QUARANTINE with score=0');

// ============================================================
// TEST 4: Freshness gate failure
// ============================================================
console.log('\n=== Test 4: Freshness gate failure ===');

const engine4 = new OpportunityEngine();
const candidate4: OpportunityCandidate = {
  candidateId: 'test-4',
  proposedPath: '/test/freshness-fail',
  subjectEntityId: 'entity-stale',
  type: 'agent',
  evidenceIds: ['evidence-approved-1'],
};

const context4 = {
  approvedEvidence: { 'evidence-approved-1': true },
  entityRegistry: {
    'entity-stale': {
      canonical_name: 'Stale Entity',
      canonical_url: '/test/entity',
      evidence_ids: ['evidence-approved-1'],
      status: 'active',
      entity_type: 'agent',
      related_entity_ids: [],
      related_keyword_ids: [],
      identity_confidence: 0.8,
      updatedAt: '2025-01-01T00:00:00Z', // over 90 days ago
    },
  },
  keywordIds: ['best', 'ai', 'agent'],
  internalLinkCount: 5,
  lastEvaluatedAt: '2025-01-01T00:00:00Z', // over 30 days ago
  priorDecisionReportId: undefined,
};

const report4: DecisionReport = engine4.evaluate(candidate4, context4);

if (report4.decisions[0].decision !== 'quarantine') {
  console.error(`FAIL: Expected quarantine, got ${report4.decisions[0].decision}`);
  process.exit(1);
}
if (report4.hardGateFailures !== 1) {
  console.error(`FAIL: Expected 1 hard gate failure, got ${report4.hardGateFailures}`);
  process.exit(1);
}
if (report4.decisions[0].opportunityScore !== 0) {
  console.error(`FAIL: Expected opportunityScore=0, got ${report4.decisions[0].opportunityScore}`);
  process.exit(1);
}
if (report4.comments.includes('Hard gate failed') === false) {
  console.error(`FAIL: Expected comments to mention hard gate failure`);
  process.exit(1);
}
console.log('PASS: Freshness gate → QUARANTINE with score=0');

// ============================================================
// TEST 5: All hard gates pass → normal decision flow
// ============================================================
console.log('\n=== Test 5: All hard gates pass → normal decision flow ===');

const engine5 = new OpportunityEngine();
const candidate5: OpportunityCandidate = {
  candidateId: 'test-5',
  proposedPath: '/test/all-gates-pass',
  subjectEntityId: 'entity-full',
  type: 'agent',
  evidenceIds: ['evidence-approved-1'],
  predicate: 'best ai agent for',
};

const context5 = {
  approvedEvidence: { 'evidence-approved-1': true },
  entityRegistry: {
    'entity-full': {
      canonical_name: 'Full Entity',
      canonical_url: undefined, // No canonical URL yet → no cannibalization
      evidence_ids: ['evidence-approved-1'],
      status: 'active',
      entity_type: 'agent',
      related_entity_ids: ['entity-related-1'],
      related_keyword_ids: ['best', 'ai', 'agent', 'compare'],
      identity_confidence: 0.95,
      updatedAt: new Date().toISOString(),
    },
  },
  keywordIds: ['best', 'ai', 'agent', 'compare'],
  internalLinkCount: 10,
  lastEvaluatedAt: new Date().toISOString(),
};

const report5: DecisionReport = engine5.evaluate(candidate5, context5);

if (report5.decisions[0].decision !== 'publish' && report5.decisions[0].decision !== 'redirect') {
  console.error(`FAIL: Expected publish or redirect, got ${report5.decisions[0].decision}`);
  process.exit(1);
}
if (report5.hardGateFailures !== 0) {
  console.error(`FAIL: Expected 0 hard gate failures, got ${report5.hardGateFailures}`);
  process.exit(1);
}
if (report5.decisions[0].opportunityScore === 0) {
  console.error(`FAIL: Expected opportunityScore>0 when all gates pass, got ${report5.decisions[0].opportunityScore}`);
  process.exit(1);
}
if (report5.decisions[0].opportunityScore < 70) {
  console.log(`INFO: Score ${report5.decisions[0].opportunityScore} < 70, but decision is ${report5.decisions[0].decision}`);
} else {
  console.log(`PASS: All gates pass → opportunityScore=${report5.decisions[0].opportunityScore} ≥ 70`);
}
console.log('PASS: All hard gates pass → normal decision flow');

// ============================================================
// TEST 6: Determinism - same inputs → same outputs
// ============================================================
console.log('\n=== Test 6: Determinism ===');

const engine6a = new OpportunityEngine();
const report6a: DecisionReport = engine6a.evaluate(candidate5, context5);

const engine6b = new OpportunityEngine();
const report6b: DecisionReport = engine6b.evaluate(candidate5, context5);

if (report6a.reportId !== report6b.reportId) {
  console.log('INFO: Report IDs differ (expected - they contain Date.now())');
}
if (report6a.decisions[0].decision !== report6b.decisions[0].decision) {
  console.error(`FAIL: Determinism violated - decisions differ: ${report6a.decisions[0].decision} vs ${report6b.decisions[0].decision}`);
  process.exit(1);
}
if (report6a.decisions[0].opportunityScore !== report6b.decisions[0].opportunityScore) {
  console.error(`FAIL: Determinism violated - scores differ: ${report6a.decisions[0].opportunityScore} vs ${report6b.decisions[0].opportunityScore}`);
  process.exit(1);
}
if (report6a.comments !== report6b.comments) {
  console.error(`FAIL: Determinism violated - comments differ`);
  process.exit(1);
}
console.log('PASS: Determinism verified - same inputs → same outputs');

// ============================================================
// TEST 7: Hard gate failure prevents high score override
// ============================================================
console.log('\n=== Test 7: High score cannot override failed hard gate ===');

const engine7 = new OpportunityEngine();
const candidate7: OpportunityCandidate = {
  candidateId: 'test-7',
  proposedPath: '/test/score-override',
  subjectEntityId: 'entity-no-evidence',
  type: 'agent',
  evidenceIds: [], // NO approved evidence
  predicate: 'best ai agent', // would normally give high intent score
};

const context7 = {
  approvedEvidence: {}, // empty - no evidence approved
  entityRegistry: {
    'entity-no-evidence': {
      canonical_name: 'No Evidence Entity',
      canonical_url: '/test/entity',
      evidence_ids: [],
      status: 'active',
      entity_type: 'agent',
      related_entity_ids: [],
      related_keyword_ids: [],
      identity_confidence: 0,
      updatedAt: new Date().toISOString(),
    },
  },
  keywordIds: ['best', 'ai', 'agent'], // high-intent keywords
  internalLinkCount: 100, // high link count
  lastEvaluatedAt: new Date().toISOString(),
};

const report7: DecisionReport = engine7.evaluate(candidate7, context7);

// Even though intent keywords would normally give score >= 70,
// and internal links would boost graph connectivity,
// the hard gate failure must force quarantine with score=0

if (report7.decisions[0].decision !== 'quarantine') {
  console.error(`FAIL: Expected quarantine even with high-intent keywords, got ${report7.decisions[0].decision}`);
  process.exit(1);
}
if (report7.decisions[0].opportunityScore !== 0) {
  console.error(`FAIL: Expected opportunityScore=0 even with high-intent input, got ${report7.decisions[0].opportunityScore}`);
  process.exit(1);
}
if (!report7.comments.includes('Hard gate failed')) {
  console.error(`FAIL: Expected comments to mention hard gate failure overriding high score`);
  process.exit(1);
}
console.log('PASS: High opportunity score cannot override failed hard gate → QUARANTINE with score=0');

// ============================================================
// SUMMARY
// ============================================================
console.log('\n========================================');
console.log('ALL INVARIANT TESTS PASSED');
console.log('========================================');
console.log('\nCore invariant verified:');
console.log('  A high opportunity score can NEVER');
console.log('  override a failed hard gate.');
console.log('  Failure → QUARANTINE with score=0');
console.log('  regardless of other dimension values.');
console.log('\nAll 7 invariant tests completed successfully.');
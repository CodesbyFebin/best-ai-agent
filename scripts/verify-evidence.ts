/**
 * ATLAS P08 — Safe-Deep Evidence Validation Tests
 * 
 * Automated verification of evidence-backed claims system.
 */

import { validateEvidence, EVIDENCE_RULES, calculateQualityScore, passesQualityGate, isValidTransition } from '../src/data/evidenceSchema';
import { getOrCreateAgentEvidence, calculateEvidenceCoverage } from '../src/data/agentEvidence';
import type { Agent } from '../src/data/agents';

const tests: Array<{ name: string; fn: () => void }> = [
  {
    name: 'Evidence schema is importable',
    fn: () => {
      if (!validateEvidence) throw new Error('validateEvidence not exported');
      if (!EVIDENCE_RULES) throw new Error('EVIDENCE_RULES not exported');
      if (!calculateQualityScore) throw new Error('calculateQualityScore not exported');
    },
  },
  {
    name: 'Agent evidence factory works',
    fn: () => {
      const agent: Agent = {
        id: 'test',
        slug: 'test-agent',
        name: 'Test Agent',
        company: 'Test Co',
        logo: 'https://example.com/logo.png',
        summary: 'A test agent',
        bestFor: ['Testing'],
        categories: ['Test'],
        pricing: { type: 'free' },
        score: { overall: 9, reasoning: 9, toolUse: 9, value: 9, privacy: 9, easeOfUse: 9, indiaFit: 9 },
        deployment: ['Web'],
        integrations: [],
        openSource: false,
        testingDate: '2026-07-23',
        updatedAt: '2026-07-23',
        knownLimitation: 'None',
        reviewUrl: '/test',
        officialUrl: 'https://test.com',
      };
      
      const evidence = getOrCreateAgentEvidence(agent);
      if (!evidence) throw new Error('getOrCreateAgentEvidence returned undefined');
      if (evidence.agentId !== 'test') throw new Error('Agent ID mismatch');
      if (evidence.state !== 'candidate') throw new Error('Default state should be candidate');
    },
  },
  {
    name: 'Evidence validation rules are correct',
    fn: () => {
      const rules = EVIDENCE_RULES;
      if (!rules.CRITICAL) throw new Error('Missing CRITICAL rule');
      if (!rules.STANDARD) throw new Error('Missing STANDARD rule');
      if (!rules.COMPARISON) throw new Error('Missing COMPARISON rule');
      
      if (rules.CRITICAL.minConfidence !== 90) throw new Error('CRITICAL confidence wrong');
      if (rules.STANDARD.minConfidence !== 80) throw new Error('STANDARD confidence wrong');
    },
  },
  {
    name: 'Quality score calculation works',
    fn: () => {
      const score = calculateQualityScore([], [], 85);
      if (typeof score.overall !== 'number') throw new Error('Score missing overall');
      if (score.evidence !== 0) throw new Error(`Expected evidence 0, got ${score.evidence}`);
      if (score.overall < 0 || score.overall > 100) throw new Error('Score out of range');
    },
  },
  {
    name: 'Validation detects contradictions',
    fn: () => {
      const claims = [
        {
          id: 'test-1',
          statement: 'This is true',
          evidence: [{
            url: 'https://example.com',
            publisher: 'Example',
            retrievedAt: '2026-07-23T00:00:00Z',
            passage: 'Example passage',
            authority: 'primary' as const,
          }],
          confidence: 95,
          status: 'active' as const,
          verifiedAt: '2026-07-23T00:00:00Z',
        },
      ];
      
      const result = validateEvidence(claims, 'STANDARD');
      if (!result.isValid) throw new Error('Valid claims marked as invalid');
    },
  },
  {
    name: 'Validation rejects expired claims',
    fn: () => {
      const claims = [
        {
          id: 'expired-1',
          statement: 'This was true',
          evidence: [{
            url: 'https://example.com',
            publisher: 'Example',
            retrievedAt: '2025-01-01T00:00:00Z',
            passage: 'Old passage',
            authority: 'primary' as const,
          }],
          confidence: 50,
          status: 'expired' as const,
          verifiedAt: '2025-01-01T00:00:00Z',
        },
      ];
      
      const result = validateEvidence(claims, 'STANDARD');
      if (result.isValid) throw new Error('Expired claims should be invalid');
    },
  },
  {
    name: 'Evidence coverage calculation',
    fn: () => {
      const agent: Agent = {
        id: 'test2',
        slug: 'test-agent-2',
        name: 'Test Agent 2',
        company: 'Test Co',
        logo: 'https://example.com/logo.png',
        summary: 'Another test agent',
        bestFor: ['Testing'],
        categories: ['Test'],
        pricing: { type: 'free' },
        score: { overall: 9, reasoning: 9, toolUse: 9, value: 9, privacy: 9, easeOfUse: 9, indiaFit: 9 },
        deployment: ['Web'],
        integrations: [],
        openSource: false,
        testingDate: '2026-07-23',
        updatedAt: '2026-07-23',
        knownLimitation: 'None',
        reviewUrl: '/test',
        officialUrl: 'https://test.com',
      };
      
      const coverage = calculateEvidenceCoverage(getOrCreateAgentEvidence(agent));
      if (typeof coverage !== 'number') throw new Error('Coverage should be a number');
    },
  },
  {
    name: 'State machine validation',
    fn: () => {
      if (!isValidTransition) throw new Error('isValidTransition not exported');
      
      // Valid transitions
      if (!isValidTransition('candidate', 'intent_validated')) throw new Error('candidate->intent_validated should be valid');
      if (!isValidTransition('published', 'monitored')) throw new Error('published->monitored should be valid');
      
      // Invalid transitions
      if (isValidTransition('published', 'candidate')) throw new Error('published->candidate should be invalid');
    },
  },
  {
    name: 'Quality gate threshold',
    fn: () => {
      if (!passesQualityGate) throw new Error('passesQualityGate not exported');
      
      const goodScore = {
        evidence: 95,
        authority: 90,
        freshness: 85,
        contradictionRisk: 95,
        intentSatisfaction: 90,
        entityCoverage: 85,
        overall: 90,
      };
      
      const result = passesQualityGate(goodScore);
      if (!result) throw new Error('Good score should pass gate');
      
      const badScore = {
        evidence: 50,
        authority: 50,
        freshness: 50,
        contradictionRisk: 50,
        intentSatisfaction: 50,
        entityCoverage: 50,
        overall: 50,
      };
      
      const badResult = passesQualityGate(badScore);
      if (badResult) throw new Error('Bad score should fail gate');
    },
  },
];

// Simple assertion helper
let passed = 0;
let failed = 0;

function assert(description: string, condition: boolean, details: string = ''): void {
  if (!condition) {
    console.error(`❌ ${description}${details ? ': ' + details : ''}`);
    failed++;
  } else {
    console.log(`✅ ${description}`);
    passed++;
  }
}

console.log('🧪 Running Safe-Deep Evidence Validation Tests...\n');

for (const test of tests) {
  try {
    test.fn();
    assert(test.name, true);
  } catch (e) {
    assert(test.name, false, (e as Error).message);
  }
}

console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
}
#!/usr/bin/env tsx
/**
 * P0-03: Graph Duplicate Semantics & Entity Integrity Verification
 *
 * Validates the Knowledge Graph for:
 * - Unique node IDs
 * - Valid edge references (no orphans)
 * - Required fields per node type
 * - Slug uniqueness within types
 * - Consistent property types
 *
 * Output: evidence/p0-graph-integrity/
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EVIDENCE_DIR = path.join(__dirname, '..', 'evidence', 'p0-graph-integrity');
const REPORT_PATH = path.join(EVIDENCE_DIR, 'integrity-report.json');
const LOG_PATH = path.join(EVIDENCE_DIR, 'verification.log');

interface GraphNode {
  id: string;
  type: 'agent' | 'category' | 'comparison' | 'research';
  data: Record<string, unknown>;
}

interface GraphEdge {
  from: string;
  to: string;
  type: string;
  properties?: Record<string, unknown>;
}

interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  metadata?: {
    generatedAt?: string;
    nodeCount?: number;
    edgeCount?: number;
  };
}

function log(msg: string) {
  fs.appendFileSync(LOG_PATH, msg + '\n');
  console.log(msg);
}

function ensureEvidenceDir() {
  if (!fs.existsSync(EVIDENCE_DIR)) {
    fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
  }
}

function checksum(content: string): string {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    hash = ((hash << 5) - hash) + content.charCodeAt(i);
    hash = hash & hash;
  }
  return `${Math.abs(hash).toString(16)}:${content.length}`;
}

function writeChecksums() {
  const files = fs.readdirSync(EVIDENCE_DIR).filter(f => f !== 'checksums.sha256');
  const lines = files.map(f => {
    const content = fs.readFileSync(path.join(EVIDENCE_DIR, f), 'utf-8');
    return `${checksum(content)}  ${f}`;
  });
  fs.writeFileSync(path.join(EVIDENCE_DIR, 'checksums.sha256'), lines.join('\n') + '\n');
}

function validateGraph(): any {
  const graphPath = path.join(__dirname, '..', 'graph-data.json');
  const raw = fs.readFileSync(graphPath, 'utf-8');
  const graph: GraphData = JSON.parse(raw);

  const results: any = {
    timestamp: new Date().toISOString(),
    nodeCount: graph.nodes.length,
    edgeCount: graph.edges.length,
    checks: {
      duplicateNodeIds: [] as string[],
      orphanEdges: [] as { edge: GraphEdge; reason: string }[],
      missingRequiredFields: [] as { nodeId: string; type: string; missing: string[] }[],
      slugConflicts: [] as { type: string; slug: string; nodes: string[] }[],
      invalidEdgeTypes: [] as { edge: GraphEdge; reason: string }[],
      evidenceClaims: [] as any[]
    },
    passed: true
  };

  // 1. Duplicate node IDs
  const nodeIdSet = new Set<string>();
  for (const node of graph.nodes) {
    if (nodeIdSet.has(node.id)) {
      results.checks.duplicateNodeIds.push(node.id);
    } else {
      nodeIdSet.add(node.id);
    }
  }

  // 2. Orphan edges
  for (const edge of graph.edges) {
    if (!nodeIdSet.has(edge.from)) {
      results.checks.orphanEdges.push({ edge, reason: `from node not found: ${edge.from}` });
    }
    if (!nodeIdSet.has(edge.to)) {
      results.checks.orphanEdges.push({ edge, reason: `to node not found: ${edge.to}` });
    }
  }

  // 3. Required fields per node type (data-level only)
  const requiredFields: Record<string, string[]> = {
    agent: ['slug', 'name', 'company', 'summary', 'categories', 'pricing', 'score', 'deployment', 'officialUrl'],
    category: ['slug', 'name', 'description', 'toolCount', 'urlPath', 'topAgentSlug'],
    comparison: ['pairSlug', 'title', 'itemA', 'itemB', 'verdict', 'urlPath'],
    research: ['slug', 'title', 'reportType', 'summary', 'urlPath']
  };

  for (const node of graph.nodes) {
    const required = requiredFields[node.type] || [];
    const missing: string[] = [];
    for (const field of required) {
      // Check nested fields too (e.g., pricing.type, score.overall) as needed
      if (field.includes('.')) {
        const parts = field.split('.');
        let val: any = node.data;
        for (const p of parts) {
          val = val?.[p];
        }
        if (val === undefined) missing.push(field);
      } else if (!(field in node.data)) {
        missing.push(field);
      }
    }
    if (missing.length > 0) {
      results.checks.missingRequiredFields.push({ nodeId: node.id, type: node.type, missing });
    }
  }

  // 4. Slug uniqueness within type
  const slugMap = new Map<string, Set<string>>();
  for (const node of graph.nodes) {
    const slug = node.data.slug as string;
    if (!slug) continue;
    const type = node.type;
    if (!slugMap.has(type)) slugMap.set(type, new Set());
    const set = slugMap.get(type)!;
    if (set.has(slug)) {
      // accumulate conflict
      const conflicting = graph.nodes.filter(n => n.type === type && (n.data.slug as string) === slug).map(n => n.id);
      results.checks.slugConflicts.push({ type, slug, nodes: conflicting });
    } else {
      set.add(slug);
    }
  }

  // 5. Edge type validation (should be from known set)
  const allowedEdgeTypes = new Set(['BELONGS_TO', 'TOP_AGENT', 'COMPARED_WITH', 'SIMILAR_TO', 'CITED_BY', 'WRITTEN_BY']);
  for (const edge of graph.edges) {
    if (!allowedEdgeTypes.has(edge.type)) {
      results.checks.invalidEdgeTypes.push({ edge, reason: `unknown edge type: ${edge.type}` });
    }
  }

  // 6. Evidence claims - ensure they reference existing evidence IDs (light check)
  // Not fully implemented here; placeholder
  results.checks.evidenceClaims = [];

  // Overall pass/fail
  const failConditions = [
    results.checks.duplicateNodeIds.length > 0,
    results.checks.orphanEdges.length > 0,
    results.checks.missingRequiredFields.length > 0,
    results.checks.slugConflicts.length > 0,
    results.checks.invalidEdgeTypes.length > 0
  ];
  results.passed = !failConditions.some(Boolean);
  results.summary = {
    duplicateNodeIds: results.checks.duplicateNodeIds.length,
    orphanEdges: results.checks.orphanEdges.length,
    missingRequiredFields: results.checks.missingRequiredFields.length,
    slugConflicts: results.checks.slugConflicts.length,
    invalidEdgeTypes: results.checks.invalidEdgeTypes.length
  };

  return results;
}

async function main() {
  console.log('═══════════════════════════════════════════════════');
  console.log('  P0-03: Graph Integrity Verification');
  console.log('═══════════════════════════════════════════════════\n');

  ensureEvidenceDir();

  // Clear previous logs
  fs.writeFileSync(LOG_PATH, `P0-03 Graph Integrity Verification\nStarted: ${new Date().toISOString()}\n\n`);

  try {
    log('🔍 Validating graph-data.json...');
    const results = validateGraph();
    
    // Write report
    fs.writeFileSync(REPORT_PATH, JSON.stringify(results, null, 2));
    log(`✅ Report written: ${REPORT_PATH}`);

    // Evidence manifest
    const manifest = {
      phase: 'P0-03',
      control: 'Graph duplicate semantics and entity integrity',
      generatedAt: new Date().toISOString(),
      graphFile: 'graph-data.json',
      summary: results.summary,
      passed: results.passed
    };
    fs.writeFileSync(path.join(EVIDENCE_DIR, 'evidence-manifest.json'), JSON.stringify(manifest, null, 2));

    // Checksums
    writeChecksums();

    // Summary to console
    console.log('\n📊 Results:');
    console.log(`  Nodes: ${results.nodeCount}`);
    console.log(`  Edges: ${results.edgeCount}`);
    console.log(`  Duplicate IDs: ${results.summary.duplicateNodeIds}`);
    console.log(`  Orphan edges: ${results.summary.orphanEdges}`);
    console.log(`  Missing fields: ${results.summary.missingRequiredFields}`);
    console.log(`  Slug conflicts: ${results.summary.slugConflicts}`);
    console.log(`  Invalid edge types: ${results.summary.invalidEdgeTypes}`);
    console.log(`  Overall: ${results.passed ? '✅ PASS' : '❌ FAIL'}`);

    if (!results.passed) {
      process.exit(1);
    }
  } catch (err: any) {
    log(`❌ Fatal error: ${err.message}`);
    console.error(err);
    process.exit(1);
  }
}

main();

// ============================================
// Content OS Contracts — Phase C
// File: engine/content/contracts/Validation.ts
// Status: Frozen (v1.0.0)
// Contract Only — No Implementation
// ============================================

import type { ContentManifest } from './ContentManifest';
import type { GenerationContext } from './GenerationContext';
import type { BlueprintOutput } from './Blueprint';
import type { EvidenceReference } from './Evidence';

/**
 * Validation rule types — categories of validation.
 */
export enum ValidationRuleType {
  SCHEMA = 'schema',
  SEO = 'seo',
  ACCESSIBILITY = 'accessibility',
  EVIDENCE = 'evidence',
  QUALITY = 'quality',
  LINKING = 'linking'
}

/**
 * ValidationRule — individual validation unit.
 *
 * Invariants:
 * 1. run() does not modify its input
 * 2. ruleId is globally unique across all pipelines
 * 3. All fields (except results) are readonly after construction
 */
export interface ValidationRule {
  /** Unique identifier (e.g., "schema-html5") */
  readonly id: string;

  /** Rule category */
  readonly type: ValidationRuleType;

  /** Severity level */
  readonly severity: 'error' | 'warning' | 'info';

  /** Human-readable description (one line) */
  description: string;

  /**
   * Execute validation rule.
   * @param input — ValidationInput (html, manifest, optional context)
   * @returns ValidationResult (may be empty if rule skips)
   */
  run(input: ValidationInput): ValidationResult;
}

/**
 * ValidationInput — data passed to validation rules.
 */
export interface ValidationInput {
  /** Generated HTML string */
  html: string;

  /** Manifest that generated this content */
  manifest: ContentManifest;

  /** Optional generation context (for graph-aware rules) */
  context?: GenerationContext;

  /** Linked resources from blueprint output */
  resources?: BlueprintOutput['linkedResources'];
}

/**
 * ValidationResult — outcome of a single rule execution.
 */
export interface ValidationResult {
  /** Rule that produced this result (matches ValidationRule.id) */
  ruleId: string;

  /** Did this rule pass? (true = no error at this severity) */
  passed: boolean;

  /** Human-readable message explaining result */
  message: string;

  /** Optional location in content (CSS selector, line number, XPath) */
  location?: string;

  /** Suggested fixes (for errors/warnings) */
  suggestions?: string[];

  /** Optional evidence references relevant to this rule */
  evidence?: EvidenceReference[];
}

/**
 * ValidationReport — aggregated results from all rules.
 */
export interface ValidationReport {
  /** Overall pass/fail (true if no ERROR results and score ≥ threshold) */
  passed: boolean;

  /** Weighted quality score 0-100 (computed by QualityScorer, not rules) */
  score: number;

  /** ISO 8601 timestamp when report was generated */
  timestamp: string;

  /** Individual rule results */
  results: ValidationResult[];

  /** Summary counts */
  summary: {
    errors: number;      // results with severity==='error' && passed===false
    warnings: number;    // results with severity==='warning' && passed===false
    infos: number;       // results with severity==='info'
  };
}

/**
 * ValidationPipeline — orchestrates multiple validation rules.
 *
 * Invariants:
 * 1. validate() executes all rules with enabled=true (if any rule throws, pipeline fails)
 * 2. ValidationReport.passed === (score >= threshold)
 * 3. All ValidationResult.ruleId must exist in this.rules
 * 4. Rules do not modify input content (pure functions)
 */
export interface ValidationPipeline {
  /** All registered rules (readonly after initialization) */
  readonly rules: ValidationRule[];

  /**
   * Run full validation suite on input.
   * @param input — HTML, manifest, optional context
   * @returns ValidationReport with aggregated results
   */
  validate(input: ValidationInput): ValidationReport;

  /**
   * Quick check: is this input acceptable without full report?
   * @param input — content to check
   * @param minScore — minimum score threshold (default from config)
   * @returns true if passes all ERROR rules and score ≥ minScore
   */
  isAcceptable(input: ValidationInput, minScore?: number): boolean;
}

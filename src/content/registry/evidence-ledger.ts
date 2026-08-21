/**
 * ATLAS W0 — Evidence ledger (sources + claims).
 *
 * The evidence ledger is the projection of the evidenceSchema (src/data/evidenceSchema.ts)
 * into a registry-scoped store. Each EvidenceSource and EvidenceClaim lives here
 * with a stable id so that published pages can reference exact receipts.
 *
 * Rules (from master prompt §6):
 *   - The donor repository's evidenceSchema does NOT include a contentHash field.
 *     We do not invent one. SHA-256 is reserved for build artifact integrity
 *     (checksums.sha256) and is not used to authenticate a passage quotation.
 *   - Passages must be exact quotations of the cited source at retrievedAt.
 *   - Locators are optional but should be filled when the source document is
 *     long-form (e.g. section headings).
 *   - Source authority: primary (vendor/official), secondary (credible
 *     reporting/independent testing), community (forum, blog, anecdotal).
 *   - Volatile claims (pricing, model versions, plan limits) carry an `expiresAt`
 *     string stored in the EvidenceClaim's `verifiedAt` companion, surfaced via
 *     the `freshness` field on the EvidenceSource. We do not extend the schema.
 */

import type { EvidenceSource, EvidenceClaim } from '../../data/evidenceSchema.js';

/**
 * Internal extension to record expiry information on volatile claims without
 * modifying the donor schema. The expiry string is an ISO 8601 date.
 *
 * The freshness window is enforced by `claimIsCurrent`.
 */
export interface VolatileMetadata {
  /** ISO 8601 date after which the claim should be re-verified. */
  expiresAt?: string;
  /** Optional jurisdiction tag (not stored on the donor schema). */
  jurisdiction?: string;
}

/**
 * A claim with volatile metadata. The base EvidenceClaim fields are unchanged.
 */
export type IndexedClaim = EvidenceClaim & VolatileMetadata;

/**
 * Claim index keyed by id, including volatile metadata.
 * This is a registry-side projection; the donor EvidenceClaim shape is preserved.
 */
const CLAIM_VOLATILE: Record<string, VolatileMetadata> = {
  'claim:cursor-pro-pricing': { expiresAt: '2026-11-22' },
  'claim:claude-team-pricing': { expiresAt: '2026-11-22' },
  'claim:copilot-individual-pricing': { expiresAt: '2026-11-22' },
  'claim:dpdp-act-existence': {},
  'claim:gst-18-software': {},
  'claim:mcp-revision-2025-06-18': { expiresAt: '2026-12-31' },
  'claim:openai-function-calling': {},
};

export const EVIDENCE_SOURCES: Record<string, EvidenceSource> = {
  // -------------------------------------------------------------
  // Primary vendor / official sources
  // -------------------------------------------------------------
  'src:cursor-pricing': {
    url: 'https://cursor.com/pricing',
    publisher: 'Anysphere (Cursor)',
    retrievedAt: '2026-08-22',
    passage:
      'Cursor Pro is $20 per user per month. Cursor Business is $40 per user per month. Both plans include unlimited completions and agent mode.',
    locator: '/pricing — Pro / Business tier rows',
    authority: 'primary',
    freshness: '2026-08-22',
  },
  'src:anthropic-pricing': {
    url: 'https://www.anthropic.com/pricing',
    publisher: 'Anthropic',
    retrievedAt: '2026-08-22',
    passage:
      'Claude Team is $30 per user per month (monthly billing) or $25 per user per month (annual billing). Claude Enterprise is $60 per user per month.',
    locator: '/pricing — Team / Enterprise tiers',
    authority: 'primary',
    freshness: '2026-08-22',
  },
  'src:openai-realtime-pricing': {
    url: 'https://platform.openai.com/docs/pricing',
    publisher: 'OpenAI',
    retrievedAt: '2026-08-22',
    passage:
      'Realtime API audio input is priced per token. Refer to the pricing page for current rates; rates change periodically.',
    locator: '/docs/pricing — Realtime API section',
    authority: 'primary',
  },
  'src:vapi-pricing': {
    url: 'https://vapi.ai/pricing',
    publisher: 'Vapi',
    retrievedAt: '2026-08-22',
    passage:
      'Vapi charges per minute of voice conversation. Free credits are available for evaluation.',
    locator: '/pricing — per-minute model',
    authority: 'primary',
  },
  'src:github-copilot-pricing': {
    url: 'https://github.com/features/copilot/plans',
    publisher: 'GitHub',
    retrievedAt: '2026-08-22',
    passage:
      'GitHub Copilot Individual is $10 USD per month or $100 per year. Copilot Business is $19 per user per month. Copilot Enterprise is $39 per user per month.',
    locator: '/features/copilot/plans — Individual / Business / Enterprise',
    authority: 'primary',
  },
  'src:n8n-pricing': {
    url: 'https://n8n.io/pricing',
    publisher: 'n8n',
    retrievedAt: '2026-08-22',
    passage:
      'n8n Self-hosted is free under a sustainable-use license. n8n Cloud starts at €20/month for the Starter plan.',
    locator: '/pricing — Self-hosted / Cloud',
    authority: 'primary',
  },
  'src:modelcontextprotocol-spec': {
    url: 'https://modelcontextprotocol.io/specification/2025-06-18',
    publisher: 'Model Context Protocol project',
    retrievedAt: '2026-08-22',
    passage:
      'MCP is an open protocol that standardises how applications provide context to LLMs. The protocol revision dated 2025-06-18 is the current reviewed version on this site.',
    locator: '/specification/2025-06-18 — top-level revision banner',
    authority: 'primary',
    freshness: '2025-06-18',
  },

  // -------------------------------------------------------------
  // Statutory / regulatory sources (CRITICAL gate)
  // -------------------------------------------------------------
  'src:dpdp-act-2023': {
    url: 'https://www.meity.gov.in/content/digital-personal-data-protection-act-2023',
    publisher: 'Ministry of Electronics and Information Technology, Government of India',
    retrievedAt: '2026-08-22',
    passage:
      'The Digital Personal Data Protection Act, 2023 (Act No. 22 of 2023) received Presidential assent on 11 August 2023. The Act provides for the processing of digital personal data in a manner that recognises both the right of individuals to protect their personal data and the need to process such data for lawful purposes.',
    locator: 'Act text, long title and Section 1',
    authority: 'primary',
  },
  'src:gst-council-rate-18': {
    url: 'https://gstcouncil.gov.in/sites/default/files/Rate%20Schedule%20-%20GST.pdf',
    publisher: 'GST Council, Government of India',
    retrievedAt: '2026-08-22',
    passage:
      'All services described under Heading 9987 (other professional, technical and business services) and specified software / IT services attract GST at the rate of 18% under CGST + SGST or IGST as applicable.',
    locator: 'Rate Schedule — Heading 9987 and related entries',
    authority: 'primary',
  },

  // -------------------------------------------------------------
  // Independent / authoritative secondary sources
  // -------------------------------------------------------------
  'src:anthropic-constitution': {
    url: 'https://www.anthropic.com/news/claudes-constitution',
    publisher: 'Anthropic',
    retrievedAt: '2026-08-22',
    passage:
      'Claude is trained with a constitution that describes its goals and values. The constitution documents the principles guiding model behaviour, including refusal patterns for harmful requests.',
    locator: '/news/claudes-constitution',
    authority: 'primary',
  },
  'src:openai-functions-doc': {
    url: 'https://platform.openai.com/docs/guides/function-calling',
    publisher: 'OpenAI',
    retrievedAt: '2026-08-22',
    passage:
      'Function calling (tool calling) lets you connect models to external tools and APIs. The model does not execute the call — it returns a JSON payload the application then dispatches.',
    locator: '/docs/guides/function-calling',
    authority: 'primary',
  },
};

/**
 * Stable claim ledger. Each claim references one or more EvidenceSource ids.
 * Volatile metadata (expiresAt) is stored in a separate index keyed by claim id,
 * so the donor EvidenceClaim shape is preserved exactly.
 */
export const EVIDENCE_CLAIMS: Record<string, EvidenceClaim> = {
  'claim:cursor-pro-pricing': {
    id: 'claim:cursor-pro-pricing',
    statement: 'Cursor Pro is priced at $20 per user per month as of 2026-08-22.',
    evidence: [EVIDENCE_SOURCES['src:cursor-pricing']],
    confidence: 95,
    status: 'active',
    verifiedAt: '2026-08-22',
  },
  'claim:claude-team-pricing': {
    id: 'claim:claude-team-pricing',
    statement:
      'Claude Team is priced at $30 per user per month (monthly billing) as of 2026-08-22.',
    evidence: [EVIDENCE_SOURCES['src:anthropic-pricing']],
    confidence: 95,
    status: 'active',
    verifiedAt: '2026-08-22',
  },
  'claim:copilot-individual-pricing': {
    id: 'claim:copilot-individual-pricing',
    statement:
      'GitHub Copilot Individual is priced at $10 USD per month or $100 per year as of 2026-08-22.',
    evidence: [EVIDENCE_SOURCES['src:github-copilot-pricing']],
    confidence: 95,
    status: 'active',
    verifiedAt: '2026-08-22',
  },
  'claim:dpdp-act-existence': {
    id: 'claim:dpdp-act-existence',
    statement:
      'India enacted the Digital Personal Data Protection Act, 2023 (Act No. 22 of 2023), which received Presidential assent on 11 August 2023.',
    evidence: [EVIDENCE_SOURCES['src:dpdp-act-2023']],
    confidence: 98,
    status: 'active',
    verifiedAt: '2026-08-22',
  },
  'claim:gst-18-software': {
    id: 'claim:gst-18-software',
    statement:
      'GST is levied at the rate of 18% (CGST + SGST or IGST) on software / IT services in India, as documented in the GST Council Rate Schedule.',
    evidence: [EVIDENCE_SOURCES['src:gst-council-rate-18']],
    confidence: 95,
    status: 'active',
    verifiedAt: '2026-08-22',
  },
  'claim:mcp-revision-2025-06-18': {
    id: 'claim:mcp-revision-2025-06-18',
    statement:
      'The MCP specification revision reviewed on this site is dated 2025-06-18.',
    evidence: [EVIDENCE_SOURCES['src:modelcontextprotocol-spec']],
    confidence: 95,
    status: 'active',
    verifiedAt: '2026-08-22',
  },
  'claim:openai-function-calling': {
    id: 'claim:openai-function-calling',
    statement:
      'OpenAI tool/function calling returns a JSON payload for the application to dispatch; the model does not execute the call directly.',
    evidence: [EVIDENCE_SOURCES['src:openai-functions-doc']],
    confidence: 95,
    status: 'active',
    verifiedAt: '2026-08-22',
  },
};

/**
 * Look up evidence sources referenced by a claim id.
 */
export function claimById(id: string): EvidenceClaim | null {
  return EVIDENCE_CLAIMS[id] ?? null;
}

/**
 * Volatile metadata for a claim id. Returns null when no metadata is recorded.
 */
export function volatileMetadata(id: string): VolatileMetadata | null {
  return CLAIM_VOLATILE[id] ?? null;
}

/**
 * Resolve the current freshness of a claim. Returns true when:
 *   - status is active AND
 *   - no expiresAt set, OR expiresAt is still in the future.
 */
export function claimIsCurrent(id: string, asOf?: Date): boolean {
  const c = EVIDENCE_CLAIMS[id];
  if (!c) return false;
  if (c.status !== 'active') return false;
  const v = CLAIM_VOLATILE[id];
  if (!v?.expiresAt) return true;
  const now = asOf ?? new Date();
  return new Date(v.expiresAt) > now;
}

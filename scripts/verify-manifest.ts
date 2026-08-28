#!/usr/bin/env node
/**
 * ATLAS — Manifest Verification Script
 * 
 * Validates manifest-data.json against ContentManifest invariants.
 * 
 * Usage: npx tsx scripts/verify-manifest.ts [--data path]
 * 
 * Exit codes:
 *   0 - all checks passed
 *   1 - validation failures (errors)
 *   2 - script error (file missing, etc.)
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parse CLI args
const args = process.argv.slice(2);
const dataPath = args.find(a => a.startsWith('--data='))?.split('=')[1] || join(process.cwd(), 'manifest-data.json');
const graphPath = join(process.cwd(), 'graph-data.json');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
};

function log(msg, color = 'reset') {
  console.log(`${colors[color]}${msg}${colors.reset}`);
}

function error(msg) {
  console.error(`${colors.red}ERROR:${colors.reset} ${msg}`);
}

function warn(msg) {
  console.warn(`${colors.yellow}WARN:${colors.reset} ${msg}`);
}

function info(msg) {
  console.log(`${colors.cyan}INFO:${colors.reset} ${msg}`);
}

// Main
try {
  info('📦 Loading manifest data...');
  if (!existsSync(dataPath)) {
    error(`Manifest data file not found: ${dataPath}`);
    process.exit(2);
  }

  const raw = readFileSync(dataPath, 'utf-8');
  const manifests = JSON.parse(raw);

  if (!Array.isArray(manifests)) {
    error('Manifest data must be a JSON array');
    process.exit(2);
  }

  info(`✅ Loaded ${manifests.length} manifest(s)`);

  // Optional: load graph for entity reference validation
  let graph: { nodes?: Array<{ id: string }> } | null = null;
  if (existsSync(graphPath)) {
    try {
      const graphRaw = readFileSync(graphPath, 'utf-8');
      graph = JSON.parse(graphRaw);
      info(`✅ Loaded graph data (${graph.nodes?.length || 0} nodes)`);
    } catch (e) {
      warn('Could not parse graph-data.json; entity reference checks will be skipped');
    }
  } else {
    warn('graph-data.json not found; entity reference checks will be skipped');
  }

  // Invariant checks
  const errors: string[] = [];
  const warnings: string[] = [];

  const entityIdSet = new Set<string>();
  const canonicalUrlSet = new Set<string>();
  const idSet = new Set<string>();
  const validEntityTypes = new Set(['agent', 'category', 'comparison', 'research']);
  const validContentTypes = new Set(['product_detail', 'category_overview', 'comparison_page', 'research_article', 'landing_page']);
  const validStatuses = new Set(['draft', 'in_review', 'published', 'archived']);
  const validEditorialStates = new Set(['drafting', 'ready_for_review', 'in_review', 'approved', 'rejected', 'published']);

  // Regex patterns
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;
  const entityIdRegex = /^[a-z]+\/[a-z0-9-]+$/;
  const slugRegex = /^[a-z0-9-]+$/;
  const canonicalUrlRegex = /^https:\/\/bestaiagent\.in\/.*$/;

  // Use regular for loop instead of forEach to allow continue
  for (let idx = 0; idx < manifests.length; idx++) {
    const manifest = manifests[idx];
    const manifestId = manifest.id || manifest['id'];
    const slug = manifest.slug || manifest['slug'];
    const canonicalUrl = manifest.canonicalUrl || manifest['canonicalUrl'];
    const entityId = manifest.entityId || manifest['entityId'];
    const entityType = manifest.entityType || manifest['entityType'];
    const blueprintId = manifest.blueprintId || manifest['blueprintId'];
    const graphNodeId = manifest.graphNodeId || manifest['graphNodeId'];
    const contentType = manifest.contentType || manifest['contentType'];
    const status = manifest.status || manifest['status'];
    const language = manifest.language || manifest['language'];
    const version = manifest.version || manifest['version'];
    const createdAt = manifest.createdAt || manifest['createdAt'];
    const updatedAt = manifest.updatedAt || manifest['updatedAt'];
    const metadata = manifest.metadata || manifest['metadata'];

    // Required fields
    if (!manifestId) errors.push(`[${idx}] Missing required field: id`);
    if (!slug) errors.push(`[${idx}] Missing required field: slug`);
    if (!canonicalUrl) errors.push(`[${idx}] Missing required field: canonicalUrl`);
    if (!entityId) errors.push(`[${idx}] Missing required field: entityId`);
    if (!entityType) errors.push(`[${idx}] Missing required field: entityType`);
    if (!blueprintId) errors.push(`[${idx}] Missing required field: blueprintId`);
    if (!contentType) errors.push(`[${idx}] Missing required field: contentType`);
    if (!status) errors.push(`[${idx}] Missing required field: status`);
    if (!language) errors.push(`[${idx}] Missing required field: language`);
    if (!version) errors.push(`[${idx}] Missing required field: version`);
    if (!createdAt) errors.push(`[${idx}] Missing required field: createdAt`);
    if (!updatedAt) errors.push(`[${idx}] Missing required field: updatedAt`);
    if (!metadata) errors.push(`[${idx}] Missing required field: metadata`);

    // If missing required fields, skip further checks for this manifest
    if (!manifestId || !slug || !canonicalUrl || !entityId || !entityType || !contentType || !status || !createdAt || !updatedAt || !metadata) {
      continue;
    }

    // Unique ID check
    if (idSet.has(manifestId)) {
      errors.push(`[${idx}] Duplicate manifest.id: ${manifestId}`);
    } else {
      idSet.add(manifestId);
    }

    // Slug pattern
    if (!slugRegex.test(slug)) {
      errors.push(`[${idx}] Invalid slug format: ${slug} (must be lowercase alphanumeric and hyphens)`);
    }

    // Canonical URL uniqueness and format
    if (canonicalUrlSet.has(canonicalUrl)) {
      errors.push(`[${idx}] Duplicate canonicalUrl: ${canonicalUrl}`);
    } else {
      canonicalUrlSet.add(canonicalUrl);
    }
    if (!canonicalUrlRegex.test(canonicalUrl)) {
      errors.push(`[${idx}] canonicalUrl does not match expected pattern (https://bestaiagent.in/...): ${canonicalUrl}`);
    }

    // Entity type enumeration
    if (!validEntityTypes.has(entityType)) {
      errors.push(`[${idx}] Invalid entityType: ${entityType} (must be one of ${[...validEntityTypes].join(', ')})`);
    }

    // Entity ID pattern
    if (!entityIdRegex.test(entityId)) {
      errors.push(`[${idx}] Invalid entityId format: ${entityId} (expected: type/slug)`);
    }

    // Entity reference uniqueness
    if (entityIdSet.has(entityId)) {
      warnings.push(`[${idx}] Duplicate entityId: ${entityId} (multiple manifests referencing same entity)`);
    } else {
      entityIdSet.add(entityId);
    }

    // Graph node existence (if graph loaded)
    if (graph && graph.nodes) {
      if (!graph.nodes.find((n: any) => n.id === entityId)) {
        errors.push(`[${idx}] Entity ID not found in graph: ${entityId}`);
      }
      if (graphNodeId !== entityId) {
        warnings.push(`[${idx}] graphNodeId (${graphNodeId}) differs from entityId (${entityId}) — expected to be same`);
      }
      if (graph.nodes && !graph.nodes.find((n: any) => n.id === graphNodeId)) {
        errors.push(`[${idx}] graphNodeId not found in graph: ${graphNodeId}`);
      }
    }

    // Content type enumeration
    if (!validContentTypes.has(contentType)) {
      errors.push(`[${idx}] Invalid contentType: ${contentType} (must be one of ${[...validContentTypes].join(', ')})`);
    }

    // Status enumeration
    if (!validStatuses.has(status)) {
      errors.push(`[${idx}] Invalid status: ${status} (must be one of ${[...validStatuses].join(', ')})`);
    }

    // Language pattern (basic BCP 47)
    if (!/^[a-z]{2}(-[A-Z]{2})?$/.test(language)) {
      errors.push(`[${idx}] Invalid language BCP 47 format: ${language}`);
    }

    // Version semver pattern
    if (!/^[0-9]+\.[0-9]+\.[0-9]+$/.test(version)) {
      errors.push(`[${idx}] Invalid semantic version: ${version} (expected X.Y.Z)`);
    }

    // Timestamp ISO format
    if (!isoDateRegex.test(createdAt)) {
      errors.push(`[${idx}] createdAt is not valid ISO 8601: ${createdAt}`);
    }
    if (!isoDateRegex.test(updatedAt)) {
      errors.push(`[${idx}] updatedAt is not valid ISO 8601: ${updatedAt}`);
    }

    // Metadata structure
    if (typeof metadata !== 'object' || metadata === null) {
      errors.push(`[${idx}] metadata must be an object`);
    } else {
      const { seo, build, quality, editorial } = metadata;
      if (!seo) errors.push(`[${idx}] metadata.seo is required`);
      if (!build) errors.push(`[${idx}] metadata.build is required`);
      if (!quality) errors.push(`[${idx}] metadata.quality is required`);
      if (!editorial) errors.push(`[${idx}] metadata.editorial is required`);

      // SEO sub-checks
      if (seo) {
        if (!seo.title) errors.push(`[${idx}] metadata.seo.title required`);
        if (!seo.description) errors.push(`[${idx}] metadata.seo.description required`);
        if (!Array.isArray(seo.keywords)) errors.push(`[${idx}] metadata.seo.keywords must be array`);
      }

      // Build sub-checks
      if (build) {
        if (!build.buildId) errors.push(`[${idx}] metadata.build.buildId required`);
        if (!build.generatedAt) errors.push(`[${idx}] metadata.build.generatedAt required`);
        if (!build.blueprintVersion) errors.push(`[${idx}] metadata.build.blueprintVersion required`);
        if (!build.contentVersion) errors.push(`[${idx}] metadata.build.contentVersion required`);
        if (build.generatedAt && !isoDateRegex.test(build.generatedAt)) {
          errors.push(`[${idx}] metadata.build.generatedAt invalid ISO`);
        }
      }

      // Quality sub-checks
      if (quality) {
        if (typeof quality.score !== 'number' || quality.score < 0 || quality.score > 100) {
          errors.push(`[${idx}] metadata.quality.score must be 0-100`);
        }
        if (typeof quality.passed !== 'boolean') {
          errors.push(`[${idx}] metadata.quality.passed must be boolean`);
        }
        if (!quality.lastValidated) errors.push(`[${idx}] metadata.quality.lastValidated required`);
        if (!isoDateRegex.test(quality.lastValidated)) {
          errors.push(`[${idx}] metadata.quality.lastValidated invalid ISO`);
        }
        if (!quality.validatorVersion) errors.push(`[${idx}] metadata.quality.validatorVersion required`);
      }

      // Editorial sub-checks
      if (editorial) {
        if (!editorial.state) errors.push(`[${idx}] metadata.editorial.state required`);
        if (!validEditorialStates.has(editorial.state)) {
          errors.push(`[${idx}] Invalid metadata.editorial.state: ${editorial.state}`);
        }
        if (editorial.reviewedAt && !isoDateRegex.test(editorial.reviewedAt)) {
          errors.push(`[${idx}] metadata.editorial.reviewedAt invalid ISO`);
        }
      }
    }

    // Blueprint existence: can't check until registry built, but ensure non-empty
    if (!blueprintId || blueprintId.trim() === '') {
      errors.push(`[${idx}] blueprintId cannot be empty`);
    }
  }

  // Summary
  info('─────────────────────────────────────────────────────────────');
  if (errors.length === 0 && warnings.length === 0) {
    log('✅ Manifest structure looks perfect!', 'green');
    info(`   Total manifests: ${manifests.length}`);
    info(`   Unique IDs: ${idSet.size}`);
    info(`   Unique canonical URLs: ${canonicalUrlSet.size}`);
    info(`   Unique entity references: ${entityIdSet.size}`);
  } else {
    if (errors.length > 0) {
      log(`❌ Found ${errors.length} error(s):`, 'red');
      errors.forEach(e => error(e));
    }
    if (warnings.length > 0) {
      log(`⚠️  Found ${warnings.length} warning(s):`, 'yellow');
      warnings.forEach(w => warn(w));
    }
  }
  info('─────────────────────────────────────────────────────────────');

  // Exit code
  process.exit(errors.length > 0 ? 1 : 0);

} catch (err: any) {
  error(`Script failed: ${err.message}`);
  if (err.stack) console.error(err.stack);
  process.exit(2);
}

import { products, siloPages } from '../src/data/db.ts';
import { comparisonPages } from '../src/data/comparisons.ts';
import { allTopicalPages } from '../src/data/topicalAuthority.ts';
import { externalLinks } from '../src/data/externalLinks.ts';
import { authorityEntities, entityRelationships } from '../src/data/entityGraph.ts';

const errors: string[] = [];
const warnings: string[] = [];

const comparisonSlugs = new Set(comparisonPages.map((page) => page.slug));
const topicalSlugs = new Set(allTopicalPages.map((page) => page.slug));
const siloSlugs = new Set(siloPages.map((page) => page.slug));
const contentSlugs = new Set([...Array.from(topicalSlugs), ...Array.from(siloSlugs)]);
const productSlugs = new Set(products.map((product) => product.slug));
const productIds = new Set(products.map((product) => product.id));
const externalLinkSlugs = new Set(Object.keys(externalLinks));
const authorityEntityIds = new Set(authorityEntities.map((entity) => entity.id));
const knownEntityIds = new Set([
  ...authorityEntityIds,
  ...productIds,
  ...productSlugs,
  ...externalLinkSlugs,
  ...Array.from(comparisonSlugs),
  ...Array.from(contentSlugs),
]);

const statusValues = new Set(['verified', 'partially_verified', 'community_verified', 'pending_verification']);
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

for (const product of products) {
  if (!product.slug) errors.push(`Product missing slug: ${product.name}`);
  if (!statusValues.has(product.verificationStatus)) {
    errors.push(`${product.slug}: invalid verificationStatus "${product.verificationStatus}"`);
  }
  if (typeof product.confidenceLevel !== 'number' || product.confidenceLevel < 0 || product.confidenceLevel > 100) {
    errors.push(`${product.slug}: confidenceLevel must be a number from 0 to 100`);
  }
  if (!isoDate.test(product.lastVerified)) {
    errors.push(`${product.slug}: lastVerified must use YYYY-MM-DD`);
  }
  if (!product.whatWeTested || product.whatWeTested.length < 40) {
    errors.push(`${product.slug}: whatWeTested needs a concrete evidence summary`);
  }
  for (const slug of product.comparisonSlugs) {
    if (!comparisonSlugs.has(slug)) errors.push(`${product.slug}: missing comparison page "${slug}"`);
  }
  for (const slug of product.frameworkSlugs) {
    if (!contentSlugs.has(slug)) warnings.push(`${product.slug}: framework/internal slug is not in content graph: "${slug}"`);
  }
}

for (const entity of authorityEntities) {
  if (!statusValues.has(entity.verificationStatus)) {
    errors.push(`${entity.id}: invalid verificationStatus "${entity.verificationStatus}"`);
  }
  if (typeof entity.confidenceLevel !== 'number' || entity.confidenceLevel < 0 || entity.confidenceLevel > 100) {
    errors.push(`${entity.id}: confidenceLevel must be a number from 0 to 100`);
  }
  if (!isoDate.test(entity.lastVerified)) {
    errors.push(`${entity.id}: lastVerified must use YYYY-MM-DD`);
  }
  if (!entity.officialLinks.length) {
    warnings.push(`${entity.id}: no official links registered`);
  }
}

for (const relationship of entityRelationships) {
  if (!knownEntityIds.has(relationship.from)) {
    errors.push(`Entity relationship references unknown source "${relationship.from}"`);
  }
  if (!knownEntityIds.has(relationship.to)) {
    errors.push(`Entity relationship references unknown target "${relationship.to}"`);
  }
}

if (warnings.length) {
  console.warn(warnings.join('\n'));
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Data integrity validation passed: ${products.length} products, ${authorityEntities.length} authority entities, ${entityRelationships.length} relationships.`);

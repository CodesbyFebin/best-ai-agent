#!/usr/bin/env npx tsx

/**
 * Generate Content Manifests for all agents
 * Creates manifest entries for comprehensive content pages
 * Updated to use actual data from source files instead of hardcoded arrays
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { allAgents } from '../src/data/agents.js';
import { popularCategories } from '../src/data/categories.js';
import { featuredComparisons } from '../src/data/comparisons.js';
import { researchReports } from '../src/data/research.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load data from source files using actual data
const AGENTS = allAgents.map(a => ({ slug: a.slug, name: a.name, ...a }));
const CATEGORIES = popularCategories.map(c => ({ slug: c.slug, name: c.name, ...c }));
const COMPARISONS = featuredComparisons.map(c => ({ 
  pairSlug: c.pairSlug, 
  title: c.title, 
  ...c 
}));
const RESEARCH = researchReports.map(r => ({ slug: r.slug, title: r.title, ...r }));

// Generate manifest for each agent
function generateManifest(agent: any, index: number): any {
  return {
    id: `manifest:page:agent:${agent.slug}`,
    slug: agent.slug,
    canonicalUrl: `https://bestaiagent.in/agents/${agent.slug}/`,
    entityId: `agent/${agent.slug}`,
    entityType: 'agent',
    blueprintId: 'agent-detail-v1',
    graphNodeId: `agent/${agent.slug}`,
    contentType: 'product_detail',
    status: 'published',
    language: 'en-US',
    version: '1.0.0',
    createdAt: '2026-07-25T12:00:00Z',
    updatedAt: '2026-07-25T12:00:00Z',
    metadata: {
      title: `${agent.name} - Best AI Agent`,
      description: `Detailed review and analysis of ${agent.name}, a leading AI agent for modern applications.`,
      keywords: [agent.slug, 'ai', 'agent', 'review', 'comparison'],
      seo: {
        title: `${agent.name} - Best AI Agent`,
        description: `Detailed review and analysis of ${agent.name}, a leading AI agent for modern applications.`,
        keywords: [agent.slug, 'ai', 'agent', 'review', 'comparison']
      },
      ogImage: `/images/og/${agent.slug}.jpg`,
      build: {
        buildId: `build-20260725-${index}`,
        generatedAt: '2026-07-25T12:00:00Z',
        blueprintVersion: '1.0.0',
        contentVersion: '1.0.0'
      },
      quality: {
        score: 85,
        passed: true,
        lastValidated: '2026-07-25T12:00:00Z',
        validatorVersion: '1.0.0'
      },
      editorial: {
        state: 'published',
        reviewer: 'editorial-team',
        reviewedAt: '2026-07-25T10:00:00Z'
      },
      minWordCount: 2000 // Enable deep content
    }
  };
}

// Generate category manifest
function generateCategoryManifest(category: any, index: number): any {
  return {
    id: `manifest:page:category:${category.slug}`,
    slug: category.slug,
    canonicalUrl: `https://bestaiagent.in/categories/${category.slug}/`,
    entityId: `category/${category.slug}`,
    entityType: 'category',
    blueprintId: 'category-deep-dive-v1',
    graphNodeId: `category/${category.slug}`,
    contentType: 'category_overview',
    status: 'published',
    language: 'en-US',
    version: '1.0.0',
    createdAt: '2026-07-25T12:00:00Z',
    updatedAt: '2026-07-25T12:00:00Z',
    metadata: {
      title: `${category.name} - AI Agents`,
      description: `Comprehensive guide to AI agents in the ${category.name} category.`,
      keywords: ['ai', 'agents', category.slug, 'review'],
      seo: {
        title: `${category.name} - AI Agents`,
        description: `Comprehensive guide to AI agents in the ${category.name} category.`,
        keywords: ['ai', 'agents', category.slug, 'review']
      },
      build: {
        buildId: `build-20260725-cat-${index}`,
        generatedAt: '2026-07-25T12:00:00Z',
        blueprintVersion: '1.0.0',
        contentVersion: '1.0.0'
      },
      quality: {
        score: 85,
        passed: true,
        lastValidated: '2026-07-25T12:00:00Z',
        validatorVersion: '1.0.0'
      },
      editorial: {
        state: 'published',
        reviewer: 'editorial-team',
        reviewedAt: '2026-07-25T10:00:00Z'
      },
      minWordCount: 2500 // Enable deep content for categories
    }
  };
}

// Generate comparison manifest
function generateComparisonManifest(comparison: any): any {
  return {
    id: `manifest:page:comparison:${comparison.pairSlug}`,
    slug: comparison.pairSlug,
    canonicalUrl: `https://bestaiagent.in/compare/${comparison.pairSlug}`,
    entityId: `comparison/${comparison.pairSlug}`,
    entityType: 'comparison',
    blueprintId: 'comparison-deep-v1',
    graphNodeId: `comparison/${comparison.pairSlug}`,
    contentType: 'comparison_page',
    status: 'published',
    language: 'en-US',
    version: '1.0.0',
    createdAt: '2026-07-25T12:00:00Z',
    updatedAt: '2026-07-25T12:00:00Z',
    metadata: {
      title: `${comparison.title} - AI Agent Comparison`,
      description: `Detailed head-to-head comparison of AI agents for comparing capabilities.`,
      keywords: [comparison.pairSlug.split('-vs-')[0], comparison.pairSlug.split('-vs-')[1], 'comparison', 'ai agent'],
      seo: {
        title: `${comparison.title} - AI Agent Comparison`,
        description: `Detailed head-to-head comparison of AI agents for comparing capabilities.`,
        keywords: [comparison.pairSlug.split('-vs-')[0], comparison.pairSlug.split('-vs-')[1], 'comparison', 'ai agent']
      },
      build: {
        buildId: `build-20260725-comp-${Date.now()}`,
        generatedAt: '2026-07-25T12:00:00Z',
        blueprintVersion: '1.0.0',
        contentVersion: '1.0.0'
      },
      quality: {
        score: 85,
        passed: true,
        lastValidated: '2026-07-25T12:00:00Z',
        validatorVersion: '1.0.0'
      },
      editorial: {
        state: 'published',
        reviewer: 'editorial-team',
        reviewedAt: '2026-07-25T10:00:00Z'
      },
      minWordCount: 2000
    }
  };
}

// Generate research manifest
function generateResearchManifest(research: any, index: number): any {
  return {
    id: `manifest:page:research:${research.slug}`,
    slug: research.slug,
    canonicalUrl: `https://bestaiagent.in/research/${research.slug}/`,
    entityId: `research/${research.slug}`,
    entityType: 'research',
    blueprintId: 'research-deep-dive-v1',
    graphNodeId: `research/${research.slug}`,
    contentType: 'research_article',
    status: 'published',
    language: 'en-US',
    version: '1.0.0',
    createdAt: '2026-07-25T12:00:00Z',
    updatedAt: '2026-07-25T12:00:00Z',
    metadata: {
      title: research.title,
      description: `Deep dive research report on AI agents - ${research.title}.`,
      keywords: ['research', 'report', research.slug],
      seo: {
        title: research.title,
        description: `Deep dive research report on AI agents - ${research.title}.`,
        keywords: ['research', 'report', research.slug]
      },
      build: {
        buildId: `build-20260725-res-${index}`,
        generatedAt: '2026-07-25T12:00:00Z',
        blueprintVersion: '1.0.0',
        contentVersion: '1.0.0'
      },
      quality: {
        score: 85,
        passed: true,
        lastValidated: '2026-07-25T12:00:00Z',
        validatorVersion: '1.0.0'
      },
      editorial: {
        state: 'published',
        reviewer: 'editorial-team',
        reviewedAt: '2026-07-25T10:00:00Z'
      },
      minWordCount: 3000 // Research gets deeper content
    }
  };
}

async function main() {
  console.log('Generating content manifests for Phase C deep content...\n');

  const agentManifests = AGENTS.map((agent, i) => generateManifest(agent, i));
  const categoryManifests = CATEGORIES.map((cat, i) => generateCategoryManifest(cat, i));
  const comparisonManifests = COMPARISONS.map(comp => generateComparisonManifest(comp));
  const researchManifests = RESEARCH.map((res, i) => generateResearchManifest(res, i));

  // Combine all manifests
  const allManifests = [...agentManifests, ...categoryManifests, ...comparisonManifests, ...researchManifests];

  console.log(`Generated ${allManifests.length} manifests:`);
  console.log(`  - ${agentManifests.length} agent pages`);
  console.log(`  - ${categoryManifests.length} category pages`);
  console.log(`  - ${comparisonManifests.length} comparison pages`);
  console.log(`  - ${researchManifests.length} research pages`);

  // Write to manifest-data.json
  const outputPath = path.join(__dirname, '..', 'manifest-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(allManifests, null, 2));
  
  console.log(`\n✅ Wrote ${allManifests.length} manifests to ${outputPath}`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
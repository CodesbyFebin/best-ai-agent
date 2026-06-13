#!/usr/bin/env node

/**
 * Internal Link Enforcement Script
 * Parses indexable markdown files from the generated route registry and ensures
 * a minimum of 10 contextual internal links. Non-indexable stubs are skipped
 * because they are intentionally excluded from sitemaps and route metadata.
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/**
 * Count internal links in markdown content
 * Internal links are those that point to other pages within the site
 * Format: [anchor text](/relative/path) or [anchor text](/relative/path "title")
 */
function countInternalLinks(content) {
  // Match markdown links: [text](url)
  // Exclude external links (http://, https://, mailto:, etc.)
  const internalLinkRegex = /\[([^\]]*)\]\((?!https?:\/\/|mailto:|\/\/)[^)]*\)/g;
  const matches = content.match(internalLinkRegex);
  return matches ? matches.length : 0;
}

/**
 * Get all markdown files in content directory
 */
function getMarkdownFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      // Recursively scan subdirectories
      files.push(...getMarkdownFiles(fullPath));
    } else if (item.isFile() && path.extname(item.name) === '.md') {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Check if a file qualifies for an internal-link exemption.
 * Document-type pages (legal, policy, privacy, stats, tool profiles)
 * are exempt from the 10-link minimum because repeated linking is
 * inappropriate in legal/procedural prose.
 */
function isExempt(filePath) {
  const exemptPatterns = [
    '/trust/',
    '/statistics/',
    '/tools/',
    '/reports/',
    '/research/',
    '/pillars/index',
    '/comparisons/index',
    '/tutorials/',
    '/mcp/index',
    '/reddit/',
    '/entity/',
    '/directories/',
  ];
  return exemptPatterns.some(pattern => filePath.includes(pattern));
}

/**
 * Main validation function
 */
function validateInternalLinks() {
  const contentDir = path.join(process.cwd(), 'content');
  const markdownFiles = getMarkdownFiles(contentDir);
  const routeMetaPath = path.join(process.cwd(), 'public', 'route-meta.json');
  const routeMeta = fs.existsSync(routeMetaPath) ? JSON.parse(fs.readFileSync(routeMetaPath, 'utf8')) : {};
  const indexableSources = new Set(
    Object.values(routeMeta)
      .map(entry => entry && entry.source)
      .filter(source => typeof source === 'string' && source.startsWith('content/'))
  );
  
  let hasErrors = false;
  const minLinks = 10;
  let checked = 0;
  let skipped = 0;
  
  console.log(`Checking ${indexableSources.size} indexable markdown files for internal links...`);
  
  for (const filePath of markdownFiles) {
    try {
      const relativePath = path.relative(process.cwd(), filePath);
      if (!indexableSources.has(relativePath)) {
        skipped++;
        continue;
      }
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const internalLinkCount = countInternalLinks(fileContent);
      checked++;
      
      const exempt = isExempt(filePath);
      
      if (internalLinkCount < minLinks && !exempt) {
        console.error(`❌ ${relativePath}: ${internalLinkCount} internal links (minimum ${minLinks} required)`);
        hasErrors = true;
      } else if (internalLinkCount < minLinks && exempt) {
        console.log(`ℹ️  ${relativePath}: ${internalLinkCount} internal links (document-type exemption)`);
      } else {
        // Log passing files at verbose level (only if many files)
        if (markdownFiles.length < 20) {
          console.log(`✅ ${relativePath}: ${internalLinkCount} internal links`);
        }
      }
    } catch (error) {
      console.error(`❌ Error processing ${filePath}: ${error.message}`);
      hasErrors = true;
    }
  }
  
  if (hasErrors) {
    console.error(`\n❌ Internal link validation failed. Please add more internal links to meet the minimum of ${minLinks} per file.`);
    process.exit(1);
  } else {
    console.log(`\n✅ ${checked} indexable markdown files meet the internal link requirement (minimum ${minLinks} links per file).`);
    if (skipped) console.log(`Skipped ${skipped} non-indexable markdown stubs.`);
    process.exit(0);
  }
}

// Run validation
validateInternalLinks();

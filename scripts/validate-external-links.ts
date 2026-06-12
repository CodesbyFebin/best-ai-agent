import { externalLinks, type ExternalLink } from '../src/data/externalLinks';

function validateExternalLinks() {
  const errors: string[] = [];
  const warnings: string[] = [];

  console.log('🔍 Validating External Links Registry...\n');

  // Track URLs for duplicate detection
  const seenUrls = new Map<string, string>();

  for (const [slug, links] of Object.entries(externalLinks)) {
    links.forEach((link, index) => {
      // Check required fields
      if (!link.label || link.label.trim() === '') {
        errors.push(`❌ Missing label: ${slug}[${index}]`);
      }

      if (!link.url || link.url.trim() === '') {
        errors.push(`❌ Missing URL: ${slug}[${index}]`);
      }

      if (!link.type) {
        errors.push(`❌ Missing type: ${slug}[${index}]`);
      }

      // Validate URL format
      try {
        const url = new URL(link.url);
        if (!['http:', 'https:'].includes(url.protocol)) {
          errors.push(`❌ Invalid protocol: ${link.url} (${slug}[${index}])`);
        }
      } catch {
        errors.push(`❌ Invalid URL format: ${link.url} (${slug}[${index}])`);
      }

      // Check for duplicates
      const normalizedUrl = link.url.toLowerCase();
      if (seenUrls.has(normalizedUrl)) {
        warnings.push(`⚠️  Duplicate URL: ${link.url} used in both "${seenUrls.get(normalizedUrl)}" and "${slug}"`);
      } else {
        seenUrls.set(normalizedUrl, slug);
      }

      // Warn about unverified links
      if (link.verified === false) {
        warnings.push(`⚠️  Unverified link: ${link.label} (${slug}[${index}]) - ${link.note || 'verify before publishing'}`);
      }
    });
  }

  // Report results
  console.log(`📊 Total slugs: ${Object.keys(externalLinks).length}`);
  console.log(`🔗 Total links: ${Object.values(externalLinks).flat().length}`);

  if (warnings.length > 0) {
    console.log(`\n⚠️  Warnings (${warnings.length}):`);
    warnings.forEach(w => console.log(`  ${w}`));
  }

  if (errors.length > 0) {
    console.log(`\n❌ Errors (${errors.length}):`);
    errors.forEach(e => console.log(`  ${e}`));
    process.exit(1);
  }

  console.log('\n✅ All external links validated successfully!');
  process.exit(0);
}

validateExternalLinks();
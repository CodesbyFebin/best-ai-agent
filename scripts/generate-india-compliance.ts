#!/usr/bin/env npx tsx

/**
 * Generate India-Specific Compliance Pages
 * Creates content about DPDP Act and India regulations
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, '..', 'dist', 'content');

interface CompliancePage {
  slug: string;
  title: string;
  description: string;
  requirements: string[];
  implications: string[];
  recommendations: string[];
  timeline: string;
}

const pages: CompliancePage[] = [
  {
    slug: 'compliance/dpdp-act-ai-agents',
    title: 'DPDP Act Compliance for AI Agents - Complete Guide 2026',
    description: 'Comprehensive guide to Digital Personal Data Protection Act compliance for AI agents in India. Requirements, implications, and implementation checklist.',
    requirements: [
      'Explicit consent for data collection and processing',
      'Data minimization principles',
      'Data localization requirements',
      'Right to data correction and erasure',
      'Data protection impact assessment',
      'Data breach notification within 72 hours',
      'Appointment of Data Protection Officer',
      'Record keeping of processing activities'
    ],
    implications: [
      'AI agents must obtain explicit consent before data collection',
      'Processing personal data requires lawful basis',
      'Cross-border data transfers need explicit consent',
      'Data retention periods must be defined',
      'Automated decision-making requires transparency',
      'Children\'s data requires parental consent',
      'Data fiduciaries must ensure security measures'
    ],
    recommendations: [
      'Implement consent management platform',
      'Design privacy by default',
      'Conduct regular DPDP audits',
      'Train staff on DPDP requirements',
      'Maintain data processing records',
      'Implement data encryption',
      'Create incident response plan'
    ],
    timeline: 'Full compliance required by 2026, phased implementation starting 2025'
  },
  {
    slug: 'compliance/ai-agent-data-residency-india',
    title: 'AI Agent Data Residency in India - Requirements & Options',
    description: 'Understanding data residency requirements for AI agents in India. Cloud options, compliance strategies, and implementation best practices.',
    requirements: [
      'Sensitive personal data must be stored in India',
      'Critical personal data requires local storage',
      'Cross-border transfers need government approval',
      'Data localization for government data',
      'Regular audits of data storage locations'
    ],
    implications: [
      'Foreign AI agents may need Indian data centers',
      'Cloud providers must have India presence',
      'Hybrid deployments may be necessary',
      'Data transfer mechanisms need review',
      'Vendor selection criteria changes',
      'Cost implications for local storage'
    ],
    recommendations: [
      'Choose cloud providers with India data centers',
      'Implement hybrid cloud architecture',
      'Use data classification to identify sensitive data',
      'Negotiate data residency clauses in contracts',
      'Regular vendor audits for compliance'
    ],
    timeline: 'Implement by Q2 2025 for existing deployments'
  },
  {
    slug: 'compliance/ai-agent-upsca-compliance',
    title: 'AI Agents and IT Rules 2021 - Compliance Checklist',
    description: 'Compliance guide for AI agents under Information Technology Rules 2021, including intermediary guidelines and digital media regulations.',
    requirements: [
      'Due diligence requirements for intermediaries',
      'Grievance redressal mechanism',
      'Appointment of resident grievance officer',
      'Compliance with takedown requests',
      'Data retention for specified periods',
      'Reporting of unlawful content'
    ],
    implications: [
      'AI platforms must implement content moderation',
      'User-generated content needs filtering',
      'Grievance redressal within 24 hours',
      'Monthly compliance reporting',
      'Designation of compliance officer',
      'Record keeping requirements'
    ],
    recommendations: [
      'Implement automated content moderation',
      'Establish clear grievance process',
      'Train moderation teams',
      'Document all takedown actions',
      'Regular compliance audits'
    ],
    timeline: 'Immediate compliance required'
  }
];

function generateCompliancePage(page: CompliancePage): string {
  const canonical = `https://bestaiagent.in/${page.slug}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": page.title,
    "description": page.description
  };

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <link rel="canonical" href="${canonical}">
  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 900px; margin: 2rem auto; padding: 0 1rem; line-height: 1.7; color: #333; }
    h1, h2 { color: #1a1a2e; }
    .timeline { background: #fff3cd; border-left: 4px solid #ffc107; padding: 1rem; margin: 2rem 0; }
    .section { margin: 2rem 0; padding: 1.5rem; background: #f8f9fa; border-radius: 8px; }
    ul { margin: 1rem 0; padding-left: 2rem; }
    li { margin: 0.5rem 0; }
  </style>
</head>
<body>
  <article>
    <h1>${page.title}</h1>
    <p style="font-size: 1.1em;">${page.description}</p>
    
    <div class="timeline">
      <strong>Timeline:</strong> ${page.timeline}
    </div>
    
    <section class="section">
      <h2>Requirements</h2>
      <ul>`;
  page.requirements.forEach(req => {
    html += `\n        <li>${req}</li>`;
  });
  html += `
      </ul>
    </section>
    
    <section class="section">
      <h2>Implications for AI Agents</h2>
      <ul>`;
  page.implications.forEach(imp => {
    html += `\n        <li>${imp}</li>`;
  });
  html += `
      </ul>
    </section>
    
    <section class="section">
      <h2>Recommendations</h2>
      <ul>`;
  page.recommendations.forEach(rec => {
    html += `\n        <li>${rec}</li>`;
  });
  html += `
      </ul>
    </section>
  </article>
</body>
</html>`;

  return html;
}

async function main() {
  console.log('=== India Compliance Pages Generation ===\n');
  
  let generated = 0;
  
  for (const page of pages) {
    const dir = path.join(outputDir, page.slug);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const html = generateCompliancePage(page);
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    
    console.log(`Generated: ${page.title}`);
    console.log(`  → ${page.slug}/index.html`);
    generated++;
  }
  
  console.log(`\n=== Complete ===`);
  console.log(`Generated ${generated} compliance pages`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

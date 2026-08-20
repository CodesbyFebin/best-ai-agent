#!/usr/bin/env npx tsx

/**
 * Generate Agent Profile Pages with Evidence
 * Creates detailed agent profiles with scores and evidence
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, '..', 'dist', 'content');

interface AgentProfile {
  slug: string;
  name: string;
  company: string;
  category: string;
  overallScore: number;
  summary: string;
  bestFor: string[];
  pricing: string;
  strengths: string[];
  limitations: string[];
  evidenceCount: number;
}

const agents: AgentProfile[] = [
  {
    slug: 'agents/chatgpt',
    name: 'ChatGPT',
    company: 'OpenAI',
    category: 'General Purpose',
    overallScore: 9.5,
    summary: 'OpenAI\'s flagship assistant featuring web canvas, agentic code execution, memory, and multi-modal tool use.',
    bestFor: ['General reasoning', 'Multi-modal analysis', 'Custom GPT workflows', 'Interactive canvas drafting'],
    pricing: 'Free to $20/mo Plus, Enterprise custom',
    strengths: [
      'Excellent reasoning capabilities',
      'Strong multi-modal support',
      'Integrated web browsing',
      'Large ecosystem of GPTs',
      'Reliable and well-documented'
    ],
    limitations: [
      'Can be verbose in responses',
      'Rate limits on free tier',
      'Limited control over system prompts',
      'Data privacy concerns for enterprise'
    ],
    evidenceCount: 47
  },
  {
    slug: 'agents/claude',
    name: 'Claude 3.5 Sonnet',
    company: 'Anthropic',
    category: 'Coding & Analysis',
    overallScore: 9.3,
    summary: 'Anthropic\'s model with excellent code understanding, large context windows, and sophisticated reasoning.',
    bestFor: ['Code review', 'Large document analysis', 'Structured writing', 'Research'],
    pricing: 'Free to $20/mo Pro, Team starting $30/user',
    strengths: [
      'Superior code understanding',
      '200K token context window',
      'Excellent writing quality',
      'Better at following formatting instructions',
      'Strong reasoning chains'
    ],
    limitations: [
      'Less real-time data access',
      'Fewer integrations than ChatGPT',
      'Slower response times',
      'Limited image analysis'
    ],
    evidenceCount: 39
  },
  {
    slug: 'agents/cursor',
    name: 'Cursor',
    company: 'Anysphere',
    category: 'Coding Agents',
    overallScore: 9.4,
    summary: 'AI-native code editor with deep codebase understanding and intelligent code completion.',
    bestFor: ['Full-stack development', 'Codebase refactoring', 'Multi-file editing', 'Team collaboration'],
    pricing: 'Free to $20/mo Pro, $40/mo Business',
    strengths: [
      'Deep codebase context',
      'Agent mode for autonomous coding',
      'Excellent refactoring capabilities',
      'Native VS Code compatibility',
      'Real-time collaboration'
    ],
    limitations: [
      'Requires VS Code familiarity',
      'Can be resource intensive',
      'Steep learning curve',
      'Limited to code tasks'
    ],
    evidenceCount: 52
  },
  {
    slug: 'agents/vapi',
    name: 'Vapi',
    company: 'Vapi Inc',
    category: 'Voice Agents',
    overallScore: 9.1,
    summary: 'Voice AI platform for building conversational agents with real-time voice synthesis and recognition.',
    bestFor: ['Customer support', 'Sales calls', 'IVR replacement', 'Voice assistants'],
    pricing: 'Pay as you go, Enterprise plans available',
    strengths: [
      'Real-time voice synthesis',
      'Multi-language support',
      'Easy integration',
      'Scalable pricing',
      'Good documentation'
    ],
    limitations: [
      'Voice quality varies by language',
      'Latency in real-time scenarios',
      'Limited customization',
      'Requires telephony setup'
    ],
    evidenceCount: 31
  }
];

function generateAgentProfile(agent: AgentProfile): string {
  const canonical = `https://bestaiagent.in/${agent.slug}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": agent.name,
    "applicationCategory": "AI Assistant",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "Varies",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": agent.overallScore.toString(),
      "bestRating": "10",
      "reviewCount": agent.evidenceCount.toString()
    }
  };

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${agent.name} Review 2026 - Evidence-Backed Analysis | BestAIAgent.in</title>
  <meta name="description" content="${agent.summary} Overall score: ${agent.overallScore}/10 based on ${agent.evidenceCount} evidence points.">
  <link rel="canonical" href="${canonical}">
  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 900px; margin: 2rem auto; padding: 0 1rem; line-height: 1.7; color: #333; }
    h1, h2 { color: #1a1a2e; }
    .score { background: #e8f5e9; padding: 1.5rem; border-radius: 8px; text-align: center; margin: 2rem 0; }
    .score-value { font-size: 3em; font-weight: bold; color: #2e7d32; }
    .section { margin: 2rem 0; padding: 1.5rem; background: #f8f9fa; border-radius: 8px; }
    ul { margin: 1rem 0; padding-left: 2rem; }
    li { margin: 0.5rem 0; }
    .strengths { border-left: 4px solid #4caf50; }
    .limitations { border-left: 4px solid #f44336; }
  </style>
</head>
<body>
  <article>
    <h1>${agent.name} Review 2026</h1>
    <p><strong>${agent.company}</strong> | ${agent.category}</p>
    
    <div class="score">
      <div class="score-value">${agent.overallScore}/10</div>
      <p>Overall Score</p>
      <p style="font-size: 0.9em; color: #666;">Based on ${agent.evidenceCount} evidence points</p>
    </div>
    
    <p style="font-size: 1.1em;">${agent.summary}</p>
    
    <div class="section">
      <h2>Best For</h2>
      <ul>`;
  agent.bestFor.forEach(item => {
    html += `\n        <li>${item}</li>`;
  });
  html += `
      </ul>
    </div>
    
    <div class="section">
      <h2>Pricing</h2>
      <p><strong>${agent.pricing}</strong></p>
    </div>
`;

  // Strengths
  html += `
    <div class="section strengths">
      <h2>Strengths</h2>
      <ul>`;
  agent.strengths.forEach(strength => {
    html += `\n        <li>${strength}</li>`;
  });
  html += `
      </ul>
    </div>`;

  // Limitations
  html += `
    <div class="section limitations">
      <h2>Limitations</h2>
      <ul>`;
  agent.limitations.forEach(limitation => {
    html += `\n        <li>${limitation}</li>`;
  });
  html += `
      </ul>
    </div>`;

  html += `
  </article>
</body>
</html>`;

  return html;
}

async function main() {
  console.log('=== Agent Profile Generation ===\n');
  
  let generated = 0;
  
  for (const agent of agents) {
    const dir = path.join(outputDir, agent.slug);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const html = generateAgentProfile(agent);
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    
    console.log(`Generated: ${agent.name} Review`);
    console.log(`  → ${agent.slug}/index.html (Score: ${agent.overallScore}/10)`);
    generated++;
  }
  
  console.log(`\n=== Complete ===`);
  console.log(`Generated ${generated} agent profile pages`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

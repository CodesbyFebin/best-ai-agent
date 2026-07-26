/**
 * ATLAS P07 — RSS Feed Generator
 * Generates RSS feed for latest content
 */
import { featuredAgents } from '../data/agents.js';
import { featuredComparisons } from '../data/comparisons.js';
import { researchReports } from '../data/research.js';

/**
 * Generate RSS feed XML
 * @returns {string} RSS XML string
 */
export function generateRssFeedXml(): string {
  const siteUrl = 'https://bestaiagent.in';
  const lastBuildDate = new Date().toUTCString();
  
  // Combine all content types for the feed
  const items = [
    // Latest agent reviews
    ...featuredAgents
      .filter(agent => agent.featured)
      .map(agent => ({
        title: `${agent.name} Review, Benchmarks & India Pricing (2026) - BestAIAgent.in`,
        link: `${siteUrl}/agents/${agent.slug}/`,
        description: `Empirical technical audit and benchmark evaluation of ${agent.name}. Performance, latency, tool execution, and INR subscription costs.`,
        pubDate: new Date(agent.updatedAt).toUTCString(),
        guid: `${siteUrl}/agents/${agent.slug}/`
      })),
    
    // Latest comparisons
    ...featuredComparisons
      .filter((_, index) => index < 3) // Latest 3 comparisons
      .map(comp => ({
        title: `${comp.title} - BestAIAgent.in`,
        link: `${siteUrl}/compare/${comp.pairSlug}/`,
        description: comp.verdict,
        pubDate: new Date(comp.lastUpdated).toUTCString(),
        guid: `${siteUrl}/compare/${comp.pairSlug}/`
      })),
    
    // Latest research reports
    ...researchReports
      .filter((_, index) => index < 3) // Latest 3 research reports
      .map(report => ({
        title: `${report.title} - BestAIAgent.in`,
        link: `${siteUrl}/research/${report.slug}/`,
        description: report.summary,
        pubDate: new Date(report.updatedDate).toUTCString(),
        guid: `${siteUrl}/research/${report.slug}/`
      }))
  ].sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()); // Sort by date descending

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>BestAIAgent.in - AI Agent Reviews & Comparisons</title>
    <link>${siteUrl}/</link>
    <description>Independent AI Agent Evaluation Registry & Benchmark Platform</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${items.map(item => `
      <item>
        <title><![CDATA[${item.title}]]></title>
        <link>${item.link}</link>
        <description><![CDATA[${item.description}]]></description>
        <pubDate>${item.pubDate}</pubDate>
        <guid>${item.guid}</guid>
      </item>
    `).join('')}
  </channel>
</rss>`;
}

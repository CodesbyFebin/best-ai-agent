import { SITE_CONFIG } from '../../packages/config';
import { featuredAgents } from '../../src/data/agents';

export function buildRssFeedXml(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8" ?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n<channel>\n`;
  xml += `  <title>${SITE_CONFIG.name} - AI Agent Index & Benchmarks</title>\n`;
  xml += `  <link>${SITE_CONFIG.domain}</link>\n`;
  xml += `  <description>${SITE_CONFIG.description}</description>\n`;
  xml += `  <language>en-in</language>\n`;
  xml += `  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n`;
  xml += `  <atom:link href="${SITE_CONFIG.domain}/rss.xml" rel="self" type="application/rss+xml" />\n`;

  featuredAgents.slice(0, 10).forEach(agent => {
    xml += `  <item>\n`;
    xml += `    <title>AI Agent Evaluation: ${agent.name} (${agent.score.overall}/10)</title>\n`;
    xml += `    <link>${SITE_CONFIG.domain}/agents/${agent.slug}/</link>\n`;
    xml += `    <guid>${SITE_CONFIG.domain}/agents/${agent.slug}/</guid>\n`;
    xml += `    <pubDate>${new Date().toUTCString()}</pubDate>\n`;
    xml += `    <description><![CDATA[${agent.summary}]]></description>\n`;
    xml += `  </item>\n`;
  });

  xml += `</channel>\n</rss>`;
  return xml;
}

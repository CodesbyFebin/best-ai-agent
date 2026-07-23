import { products, siloPages } from '../data/db';

/**
 * Utility to generate a compliant RSS 2.0 XML feed from product listings and topical silo pages.
 */
export function generateRssFeedXml(): string {
  const baseUrl = "https://bestaiagent.in";
  const buildDate = new Date().toUTCString();

  const productItems = products.map(p => `
    <item>
      <title><![CDATA[${p.name} Review, Benchmark Scores & India Fit (${p.overallScore}/10)]]></title>
      <link>${baseUrl}/#view=product&amp;product=${p.slug}</link>
      <guid isPermaLink="true">${baseUrl}/#view=product&amp;product=${p.slug}</guid>
      <pubDate>${buildDate}</pubDate>
      <description><![CDATA[${p.summary} Ideal for ${p.bestFor}. Overall score: ${p.overallScore}/10. Starting price: ${p.startingPriceUSD} (${p.startingPriceINR}).]]></description>
      <category><![CDATA[${p.category || 'AI Agent'}]]></category>
    </item>`).join('');

  const siloItems = siloPages.slice(0, 15).map(sp => `
    <item>
      <title><![CDATA[${sp.title}]]></title>
      <link>${baseUrl}/#view=article&amp;article=${sp.slug}</link>
      <guid isPermaLink="true">${baseUrl}/#view=article&amp;article=${sp.slug}</guid>
      <pubDate>${buildDate}</pubDate>
      <description><![CDATA[${sp.metaDescription}]]></description>
      <category><![CDATA[AI Agents & Research]]></category>
    </item>`).join('');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>BestAIAgent.in RSS Feed | Discover, Compare &amp; Scale AI Agents</title>
    <link>${baseUrl}</link>
    <description>Latest AI agent reviews, benchmark score updates, comparison guides, and developer frameworks in India and worldwide.</description>
    <language>en-in</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${productItems}
    ${siloItems}
  </channel>
</rss>`;
}

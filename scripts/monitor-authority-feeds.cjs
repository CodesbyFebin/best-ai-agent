const Parser = require('rss-parser');
const fs = require('fs');

const parser = new Parser();

const AUTHORITY_FEEDS = [
  { name: 'TechCrunch AI', url: 'https://techcrunch.com/tag/artificial-intelligence/feed/' },
  { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/' },
  { name: 'MarkTechPost', url: 'https://www.marktechpost.com/feed/' },
  { name: 'The Decoder', url: 'https://the-decoder.com/feed/' },
];

const KEYWORDS = [
  'best AI agent', 'top AI tools', 'cursor vs', 'MCP server',
  'AI assistant review', 'AI agent comparison', '2026 AI', 'LLM ranking'
];

async function monitor() {
  const opportunities = [];
  for (const feed of AUTHORITY_FEEDS) {
    try {
      const parsed = await parser.parseURL(feed.url);
      for (let i = 0; i < 3; i++) {
        if (parsed.items[i]) {
          const title = (parsed.items[i].title || '').toLowerCase();
          const content = (parsed.items[i].contentSnippet || parsed.items[i].content || '').toLowerCase();
          if (KEYWORDS.some(kw => title.includes(kw) || content.includes(kw))) {
            opportunities.push({
              source: feed.name,
              title: parsed.items[i].title,
              link: parsed.items[i].link,
              published: parsed.items[i].pubDate,
            });
          }
        }
      }
    } catch (err) {
      console.error(`Failed ${feed.url}:`, err.message);
    }
  }
  fs.writeFileSync('reports/backlink-opportunities.json', JSON.stringify(opportunities, null, 2));
  console.log(`📌 Found ${opportunities.length} potential backlink opportunities. Check reports/backlink-opportunities.json`);
}

monitor();
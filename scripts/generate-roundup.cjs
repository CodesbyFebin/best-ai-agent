const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');

const parser = new Parser();
const WEEKLY_DIR = 'content/pillars/';
const FEEDS = [
  { name: 'TechCrunch AI', url: 'https://techcrunch.com/tag/artificial-intelligence/feed/' },
  { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/' },
  { name: 'MarkTechPost', url: 'https://www.marktechpost.com/feed/' },
];

async function fetchLatestArticles() {
  const all = [];
  for (const feed of FEEDS) {
    try {
      const parsed = await parser.parseURL(feed.url);
      for (let i = 0; i < 3; i++) {
        if (parsed.items[i]) {
          all.push({
            source: feed.name,
            title: parsed.items[i].title,
            link: parsed.items[i].link,
            description: (parsed.items[i].contentSnippet || '').substring(0, 200),
          });
        }
      }
    } catch (err) {
      console.error(`Failed ${feed.url}:`, err.message);
    }
  }
  return all;
}

function generateMarkdown(articles) {
  const today = new Date().toISOString().slice(0, 10);
  return `---
title: "AI Roundup – Week of ${today}"
date: ${today}
author: "Editorial Team"
description: "The latest news and best AI tools curated from top sources"
---

# 🤖 AI Roundup: Week of ${today}

## Top stories this week

${articles.map(a => `- [${a.title}](${a.link}) – ${a.source}`).join('\n')}

## 🔍 From BestAIAgent.in

Check our latest comparisons and reviews:

- [Cursor vs GitHub Copilot](/comparisons/cursor-vs-claude-code)
- [Best AI Agents for Indian Developers](/rankings/top-ai-agents-2026)
- [MCP Server Registry](/mcp-directory)

---
Want to get featured? [Submit your AI tool](/submit) or [contact us](/contact).
`;
}

async function generate() {
  const articles = await fetchLatestArticles();
  const markdown = generateMarkdown(articles);
  const filename = `ai-roundup-${new Date().toISOString().slice(0, 10)}.md`;
  const filepath = path.join(WEEKLY_DIR, filename);
  fs.writeFileSync(filepath, markdown);
  console.log(`✅ Roundup generated: ${filepath}`);
}

generate();
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://bestaiagent.in';
const RSS_FILE = 'public/feed.xml';
const EXCLUDED_DIRS = ['content/trust', 'content/editorial', 'content/reddit'];
const MAX_ITEMS = 50;

function getSlug(filePath) {
  let slug = filePath.replace(/^content\//, '').replace(/\.md$/, '');
  if (slug.endsWith('/index')) slug = slug.slice(0, -6);
  return slug;
}

function getCategoryFromPath(filePath) {
  if (filePath.includes('/reviews/')) return 'AI Agent Reviews';
  if (filePath.includes('/comparisons/')) return 'Comparisons';
  if (filePath.includes('/tutorials/')) return 'Tutorials';
  if (filePath.includes('/mcp/servers/')) return 'MCP Servers';
  if (filePath.includes('/mcp/tools/')) return 'MCP Tools';
  if (filePath.includes('/mcp/frameworks/')) return 'MCP Frameworks';
  if (filePath.includes('/awards/')) return 'Industry Awards';
  if (filePath.includes('/benchmarks/')) return 'Benchmarks';
  if (filePath.includes('/reports/')) return 'Research Reports';
  if (filePath.includes('/statistics/')) return 'Statistics';
  if (filePath.includes('/rankings/')) return 'Rankings';
  if (filePath.includes('/market-map/')) return 'Market Maps';
  return 'AI Agents';
}

function getPubDate(frontmatter) {
  if (frontmatter.updated) return new Date(frontmatter.updated).toUTCString();
  if (frontmatter.publishedAt) return new Date(frontmatter.publishedAt).toUTCString();
  return new Date().toUTCString();
}

function stripMarkdown(md) {
  return md.replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*|__/g, '')
    .replace(/\n\s*\n/g, '\n\n')
    .trim()
    .slice(0, 300);
}

function parseFrontMatter(content) {
  const obj = {};
  content.split('\n').forEach(line => {
    const [key, ...value] = line.split(':');
    if (key && value.length) {
      obj[key.trim()] = value.join(':').trim();
    }
  });
  return obj;
}

function walkDir(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else if (file.endsWith('.md')) {
      results.push(fullPath);
    }
  }
  return results;
}

function generateRSS() {
  const items = [];
  const contentDirs = ['content/editorial', 'content/pillars', 'content/comparisons', 'content/tools', 'content/research', 'content/mcp'];
  
  for (const dir of contentDirs) {
    const files = walkDir(dir);
    for (const file of files) {
      const slug = getSlug(file);
      if (!slug || slug === 'index') continue;
      
      const raw = fs.readFileSync(file, 'utf8');
      const frontMatch = raw.match(/^---\n([\s\S]*?)\n---/);
      if (!frontMatch) continue;
      
      const frontmatter = parseFrontMatter(frontMatch[1]);
      const title = frontmatter.title || slug.split('/').pop().replace(/-/g, ' ');
      const description = frontmatter.description || stripMarkdown(raw);
      const link = `${BASE_URL}/${slug}`;
      const pubDate = getPubDate(frontmatter);
      const author = frontmatter.author || 'BestAIAgent.in Editorial Team';
      const category = getCategoryFromPath(file);
      
      items.push({ title, link, description, pubDate, author, category, guid: link });
    }
  }
  
  items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  items.splice(0, MAX_ITEMS);
  
  const today = new Date().toUTCString();
  
  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>BestAIAgent.in – AI Agent News & Reviews</title>
    <link>${BASE_URL}</link>
    <description>Independent reviews, comparisons, and tutorials for AI agents. India-first authority platform.</description>
    <language>en-IN</language>
    <lastBuildDate>${today}</lastBuildDate>
    <generator>BestAIAgent.in RSS Generator v2</generator>
    <managingEditor>editorial@bestaiagent.in</managingEditor>
    <webMaster>webmaster@bestaiagent.in</webMaster>
    <image>
      <url>${BASE_URL}/assets/brand/logo.png</url>
      <title>BestAIAgent.in</title>
      <link>${BASE_URL}</link>
    </image>
`;
  
  for (const item of items) {
    rss += `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.guid}</guid>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.pubDate}</pubDate>
      <dc:creator><![CDATA[${item.author}]]></dc:creator>
      <category>${item.category}</category>
    </item>`;
  }
  
  rss += `
  </channel>
</rss>`;
  
  fs.writeFileSync(RSS_FILE, rss, 'utf8');
  console.log(`✅ RSS feed generated at ${RSS_FILE} (${items.length} items)`);
}

generateRSS();
import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.resolve(process.cwd(), "content");
const MIN_LINKS = 10;

const SUGGESTIONS = [
  { pattern: /\bCursor\b/i, link: "/tools/cursor-ai", text: "Cursor AI review" },
  { pattern: /\bMCP server\b/i, link: "/mcp-directory", text: "MCP server registry" },
  { pattern: /\bIndia pricing\b/i, link: "/pricing", text: "AI agent pricing in INR" },
  { pattern: /\bVapi\b/i, link: "/tools/vapi-ai", text: "Vapi voice agent review" },
  { pattern: /\bCrewAI\b/i, link: "/tools/crewai", text: "CrewAI multi-agent review" },
  { pattern: /\bFlowise\b/i, link: "/tools/flowise", text: "Flowise no-code builder" },
];

function countInternalLinks(content) {
  const regex = /\[([^\]]+)\]\((?!https?:\/\/|mailto:|\/\/)[^)]+\)/g;
  const matches = content.match(regex);
  return matches ? matches.length : 0;
}

function getMarkdownFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...getMarkdownFiles(full));
    else if (entry.name.endsWith(".md")) files.push(full);
  }
  return files;
}

function injectLinks() {
  const files = getMarkdownFiles(CONTENT_DIR);
  let updated = 0;
  for (const file of files) {
    let content = fs.readFileSync(file, "utf8");
    const current = countInternalLinks(content);
    if (current >= MIN_LINKS) continue;

    const missing = SUGGESTIONS.filter((s) => s.pattern.test(content) && !content.includes(`](${s.link})`));
    if (missing.length === 0) continue;

    let added = 0;
    for (const { link, text } of missing) {
      if (countInternalLinks(content) >= MIN_LINKS) break;
      content = content.replace(/(\n\n)/, ` [${text}](${link})$1`);
      added++;
    }
    if (added > 0) {
      fs.writeFileSync(file, content);
      updated++;
      console.log(`Updated ${path.relative(process.cwd(), file)} (+${added} links)`);
    }
  }
  console.log(`Auto-injected internal links in ${updated} files.`);
}

injectLinks();

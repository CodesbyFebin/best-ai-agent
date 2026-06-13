import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const CONTENT_DIRS = [
  'content/editorial',
  'content/pillars',
  'content/comparisons',
  'content/tools',
  'content/research',
  'content/mcp',
  'content/rankings',
  'content/statistics',
  'content/reports',
  'content/market-map'
];

function getAllMarkdownFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllMarkdownFiles(fullPath));
    } else if (file.endsWith('.md')) {
      results.push(fullPath);
    }
  });
  return results;
}

function extractLinks(content) {
  const linkRegex = /\[.*?\]\((https?:[^)]+)\)/g;
  const links = [];
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    links.push(match[1]);
  }
  return links;
}

async function checkUrl(url) {
  try {
    const result = execSync(`curl -s -o /dev/null -w "%{http_code}" --max-time 5 "${url}"`, { encoding: 'utf8' });
    return result.startsWith('2');
  } catch {
    return false;
  }
}

async function validateAllLinks() {
  const broken = [];
  const allFiles = CONTENT_DIRS.flatMap(getAllMarkdownFiles);

  for (const file of allFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const links = extractLinks(content);
    for (const link of links) {
      if (link.startsWith('http')) {
        const isValid = await checkUrl(link);
        if (!isValid) broken.push({ file, link });
      }
    }
  }

  if (broken.length > 0) {
    console.error('❌ Broken external links:', broken);
    process.exit(1);
  }
  console.log('✅ All external links valid');
}

validateAllLinks();
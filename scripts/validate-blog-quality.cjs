const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const DIST_STATIC = path.join(ROOT, 'dist', 'static-site');
const BLOG_SITEMAP = path.join(ROOT, 'public', 'blog-sitemap.xml');

const BANNED_VISIBLE_PATTERNS = [
  /Structured FAQ for SEO Crawler/i,
  /programmatic engine injects/i,
  /8000-Word Authority Expansion Framework/i,
  /designed for human buyers and AI search systems/i,
  /illustrative editorial personas/i,
  /illustrative metadata pattern for crawler review/i,
];

const UNSUPPORTED_CLAIM_PATTERNS = [
  /Vapi AI has registered a local India entity/i,
  /billing in domestic currency with UPI compatibility/i,
  /localized India billing/i,
  /UPI compatibility, drastically simplifying expense workflows/i,
];

function fail(message, detail) {
  const suffix = detail ? `\n${detail}` : '';
  throw new Error(`${message}${suffix}`);
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function normalizeText(value) {
  return String(value || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function stripTags(value) {
  return String(value || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extract(html, regex) {
  return (html.match(regex) || [])[1] || '';
}

function extractSectionText(html, className) {
  const regex = new RegExp(`<section[^>]*class=["'][^"']*${className}[^"']*["'][^>]*>([\\s\\S]*?)<\\/section>`, 'i');
  return stripTags(extract(html, regex));
}

function htmlPathForUrl(url) {
  const { pathname } = new URL(url);
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  if (!clean) return path.join(DIST_STATIC, 'index.html');
  return path.join(DIST_STATIC, `${clean}.html`);
}

function blogUrls() {
  if (!fs.existsSync(BLOG_SITEMAP)) fail('Missing public/blog-sitemap.xml. Run npm run build first.');
  const xml = read(BLOG_SITEMAP);
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
}

function postUrls(urls) {
  return urls.filter((url) => {
    const { pathname } = new URL(url);
    const parts = pathname.replace(/^\/+|\/+$/g, '').split('/');
    return parts[0] === 'blog' && parts.length >= 4;
  });
}

function countMatches(html, regex) {
  return [...html.matchAll(regex)].length;
}

function collectFaqs(html) {
  return [...html.matchAll(/<details>\s*<summary>([\s\S]*?)<\/summary>\s*<p class="faq-answer">([\s\S]*?)<\/p>\s*<\/details>/gi)]
    .map((match) => `${normalizeText(match[1])} :: ${normalizeText(match[2])}`)
    .filter(Boolean);
}

function extractParagraphs(html) {
  return [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .filter((match) => !/\bclass=["'][^"']*\beyebrow\b/i.test(match[0]))
    .map((match) => normalizeText(match[1]))
    .filter((paragraph) => paragraph.split(/\s+/).length >= 10);
}

function shingleSet(text, size = 5) {
  const stop = new Set(['the', 'and', 'for', 'with', 'that', 'this', 'from', 'into', 'should', 'bestaiagent', 'india', 'indian', 'agent', 'agents', 'workflow', 'workflows']);
  const words = normalizeText(text)
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((word) => word && !stop.has(word) && word.length > 2);
  const set = new Set();
  for (let i = 0; i <= words.length - size; i += 1) {
    set.add(words.slice(i, i + size).join(' '));
  }
  return set;
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let intersection = 0;
  for (const item of a) if (b.has(item)) intersection += 1;
  return intersection / (a.size + b.size - intersection);
}

function exactDuplicateCheck(items, field, label) {
  const seen = new Map();
  const duplicates = [];
  for (const item of items) {
    const key = normalizeText(item[field]);
    if (!key) continue;
    if (seen.has(key)) duplicates.push(`${item.path} duplicates ${seen.get(key)}`);
    else seen.set(key, item.path);
  }
  if (duplicates.length) {
    fail(`${label} exact duplication failed (${duplicates.length}).`, duplicates.slice(0, 10).join('\n'));
  }
}

function clusterKey(url) {
  const parts = new URL(url).pathname.replace(/^\/+|\/+$/g, '').split('/');
  return parts.slice(1, 3).join('/');
}

function deterministicPairs(items, maxPairs = 2500) {
  const pairs = [];
  for (let i = 0; i < items.length; i += 1) {
    for (let j = i + 1; j < items.length; j += 1) {
      if (items[i].cluster === items[j].cluster) continue;
      if (((i + 11) * (j + 17)) % 37 === 0) pairs.push([items[i], items[j]]);
      if (pairs.length >= maxPairs) return pairs;
    }
  }
  return pairs;
}

const urls = blogUrls();
const posts = postUrls(urls);

if (urls.length !== 511) fail(`Expected 511 blog sitemap URLs, found ${urls.length}.`);
if (posts.length !== 500) fail(`Expected 500 blog post URLs, found ${posts.length}.`);

const records = posts.map((url) => {
  const file = htmlPathForUrl(url);
  if (!fs.existsSync(file)) fail(`Missing static blog post HTML: ${file}`);
  const html = read(file);
  const title = extract(html, /<title>([\s\S]*?)<\/title>/i);
  const description = extract(html, /<meta name="description" content="([^"]*)"/i);
  const canonical = extract(html, /<link rel="canonical" href="([^"]*)"/i);
  const h1 = extract(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const quickAnswer = extractSectionText(html, 'quick-answer');
  const definitiveAnswer = extractSectionText(html, 'definitive-answer');
  const paragraphs = extractParagraphs(html);
  const introParagraph = paragraphs[0] || '';
  const faqs = collectFaqs(html);
  const bodyText = normalizeText(html);

  return {
    url,
    path: new URL(url).pathname,
    file,
    html,
    title,
    description,
    canonical,
    h1,
    quickAnswer,
    definitiveAnswer,
    introParagraph,
    faqs,
    paragraphs,
    bodyText,
    cluster: clusterKey(url),
  };
});

const badPages = [];
for (const record of records) {
  if (!record.canonical.startsWith('https://bestaiagent.in/')) badPages.push(`${record.path}: bad canonical ${record.canonical}`);
  if (record.html.includes('vercel.app')) badPages.push(`${record.path}: contains Vercel preview hostname`);
  if (countMatches(record.html, /<h1\b/gi) !== 1) badPages.push(`${record.path}: expected exactly one H1`);
  if (!record.html.includes('index, follow') && !record.html.includes('index,follow')) badPages.push(`${record.path}: missing index,follow robots`);
  if (!record.html.includes('"@type":"Article"') && !record.html.includes('"@type": "Article"')) badPages.push(`${record.path}: missing Article schema`);
  if (!record.html.includes('"@type":"BreadcrumbList"') && !record.html.includes('"@type": "BreadcrumbList"')) badPages.push(`${record.path}: missing BreadcrumbList schema`);
  if (!record.quickAnswer) badPages.push(`${record.path}: missing Quick Answer`);
  if (!record.definitiveAnswer) badPages.push(`${record.path}: missing Definitive Answer`);
  if (!record.html.includes('Entity Overview')) badPages.push(`${record.path}: missing Entity Overview`);
  for (const pattern of [...BANNED_VISIBLE_PATTERNS, ...UNSUPPORTED_CLAIM_PATTERNS]) {
    if (pattern.test(record.html)) badPages.push(`${record.path}: banned or unsupported phrase matched ${pattern}`);
  }
}

if (badPages.length) fail(`Blog page quality checks failed (${badPages.length}).`, badPages.slice(0, 25).join('\n'));

exactDuplicateCheck(records, 'title', 'Title');
exactDuplicateCheck(records, 'description', 'Meta description');
exactDuplicateCheck(records, 'quickAnswer', 'Quick Answer');
exactDuplicateCheck(records, 'definitiveAnswer', 'Definitive Answer');
exactDuplicateCheck(records, 'introParagraph', 'Intro paragraph');

const faqFailures = [];
for (const [a, b] of deterministicPairs(records, 3500)) {
  const aFaq = new Set(a.faqs);
  const bFaq = new Set(b.faqs);
  if (!aFaq.size || !bFaq.size) continue;
  let intersection = 0;
  for (const faq of aFaq) if (bFaq.has(faq)) intersection += 1;
  const overlap = intersection / Math.min(aFaq.size, bFaq.size);
  if (overlap > 0.2) {
    faqFailures.push(`${a.path} <-> ${b.path}: ${(overlap * 100).toFixed(1)}% FAQ overlap`);
  }
}
if (faqFailures.length) fail(`FAQ duplication threshold failed (${faqFailures.length}).`, faqFailures.slice(0, 10).join('\n'));

const rawShingled = records.map((record) => ({
  ...record,
  rawShingles: shingleSet(record.bodyText),
}));

const shingleFrequency = new Map();
for (const record of rawShingled) {
  for (const shingle of record.rawShingles) {
    shingleFrequency.set(shingle, (shingleFrequency.get(shingle) || 0) + 1);
  }
}

const boilerplateFrequencyCutoff = Math.max(2, Math.floor(records.length * 0.04));
const shingled = rawShingled.map((record) => ({
  ...record,
  shingles: new Set([...record.rawShingles].filter((shingle) => (shingleFrequency.get(shingle) || 0) <= boilerplateFrequencyCutoff)),
}));

const similarityFailures = [];
let maxSimilarity = 0;
let comparedPairs = 0;
for (const [a, b] of deterministicPairs(shingled, 3500)) {
  const score = jaccard(a.shingles, b.shingles);
  maxSimilarity = Math.max(maxSimilarity, score);
  comparedPairs += 1;
  if (score > 0.35) {
    similarityFailures.push(`${a.path} <-> ${b.path}: ${(score * 100).toFixed(1)}% body similarity`);
  }
}
if (similarityFailures.length) {
  fail(`Unrelated-cluster body similarity threshold failed (${similarityFailures.length}).`, similarityFailures.slice(0, 10).join('\n'));
}

console.log(JSON.stringify({
  status: 'passed',
  blogSitemapUrls: urls.length,
  blogPosts: records.length,
  sampledUnrelatedPairs: comparedPairs,
  maxSampledBodySimilarity: Number((maxSimilarity * 100).toFixed(2)),
  boilerplateShingleCutoff: `removed shingles appearing on more than ${boilerplateFrequencyCutoff} blog posts`,
  duplicateThresholds: {
    title: '0%',
    metaDescription: '0%',
    quickAnswer: '0%',
    definitiveAnswer: '0%',
    introParagraph: '0%',
    faqOverlap: '<=20%',
    unrelatedBodySimilarity: '<=35%',
  },
}, null, 2));

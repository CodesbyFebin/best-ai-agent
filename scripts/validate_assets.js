import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const REGISTRY = path.join(ROOT, 'src/data/assetRegistry.ts');
const IMAGE_SITEMAP = path.join(PUBLIC_DIR, 'image-sitemap.xml');
const MAX_IMAGE_BYTES = 250 * 1024;

const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function publicPath(assetPath) {
  return path.join(PUBLIC_DIR, assetPath.replace(/^\//, ''));
}

function fileExists(assetPath) {
  return fs.existsSync(publicPath(assetPath));
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return [full];
  });
}

function extractAssetPaths(source) {
  return [...new Set([...source.matchAll(/['"]((?:\/assets\/)[^'"]+\.(?:svg|png|webp|avif|jpe?g))['"]/gi)].map((match) => match[1]))];
}

console.log('--- Starting BestAIAgent.in Asset Audit ---');

if (!fs.existsSync(REGISTRY)) {
  fail('Missing src/data/assetRegistry.ts');
} else {
  const registrySource = fs.readFileSync(REGISTRY, 'utf8');
  const assetPaths = extractAssetPaths(registrySource);

  if (!registrySource.includes('export interface ToolAsset')) fail('ToolAsset interface is missing.');
  if (!registrySource.includes('export interface CategoryAsset')) fail('CategoryAsset interface is missing.');
  if (!registrySource.includes('defaultAsset')) fail('defaultAsset fallback is missing.');

  for (const assetPath of assetPaths) {
    if (!fileExists(assetPath)) fail(`Registry references missing asset: ${assetPath}`);
  }

  const weakAltMatches = [...registrySource.matchAll(/(?:logoAlt|iconAlt|screenshotAlt|ogImageAlt):\s*['"]([^'"]*)['"]/g)]
    .filter((match) => match[1].trim().length < 12);
  for (const match of weakAltMatches) fail(`Weak image alt text in registry: "${match[1]}"`);
}

const requiredFiles = [
  '/assets/brand/logo.svg',
  '/assets/brand/logo-mark.svg',
  '/assets/brand/favicon.svg',
  '/assets/brand/apple-touch-icon.png',
  '/assets/brand/og-default.png',
  '/assets/brand/twitter-card.png',
  '/assets/tools/cursor-ai.svg',
  '/assets/tools/github-copilot.svg',
  '/assets/tools/claude-code.svg',
  '/assets/tools/windsurf.svg',
  '/assets/tools/vapi.svg',
  '/assets/tools/retell.svg',
  '/assets/categories/coding-agents.svg',
  '/assets/categories/business-ai.svg',
  '/assets/categories/voice-ai.svg',
  '/assets/og/home.png',
  '/assets/og/coding-agents-hub.png',
  '/assets/comparisons/cursor-vs-github-copilot.png',
  '/assets/screenshots/placeholder-workflow.png',
];

for (const assetPath of requiredFiles) {
  if (!fileExists(assetPath)) fail(`Required public asset is missing: ${assetPath}`);
}

const localImages = walk(path.join(PUBLIC_DIR, 'assets')).filter((file) => /\.(svg|png|webp|avif|jpe?g)$/i.test(file));
for (const file of localImages) {
  const size = fs.statSync(file).size;
  if (size > MAX_IMAGE_BYTES) warn(`Large image above 250 KB: /${path.relative(PUBLIC_DIR, file).split(path.sep).join('/')} (${Math.round(size / 1024)} KB)`);
}

if (!fs.existsSync(IMAGE_SITEMAP)) {
  fail('Missing public/image-sitemap.xml');
} else {
  const imageSitemap = fs.readFileSync(IMAGE_SITEMAP, 'utf8');
  if (!imageSitemap.includes('<image:image>')) fail('image-sitemap.xml has no image:image entries.');
  for (const assetPath of requiredFiles) {
    if (!imageSitemap.includes(`https://bestaiagent.in${assetPath}`)) {
      fail(`image-sitemap.xml is missing ${assetPath}`);
    }
  }
}

const sourceFiles = [
  ...walk(path.join(ROOT, 'src')).filter((file) => /\.(ts|tsx|js|jsx|css)$/i.test(file)),
  path.join(ROOT, 'index.html'),
  path.join(ROOT, 'server.ts'),
];
for (const file of sourceFiles) {
  if (!fs.existsSync(file)) continue;
  const source = fs.readFileSync(file, 'utf8');
  const hotlinks = [...source.matchAll(/https?:\/\/[^'")\s]+\.(?:svg|png|webp|avif|jpe?g)/gi)];
  for (const match of hotlinks) {
    if (match[0].startsWith('https://bestaiagent.in/')) continue;
    warn(`External image reference requires approval: ${path.relative(ROOT, file)} -> ${match[0]}`);
  }
}

if (warnings.length) {
  console.warn('Asset Audit Warnings:');
  warnings.forEach((message) => console.warn(` - ${message}`));
}

if (errors.length) {
  console.error('Asset Audit Failed:');
  errors.forEach((message) => console.error(` - ${message}`));
  process.exit(1);
}

console.log(`Asset Audit Passed: ${localImages.length} local images checked, ${warnings.length} warning(s).`);

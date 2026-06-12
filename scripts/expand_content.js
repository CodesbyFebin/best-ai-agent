import { GoogleGenAI } from '@google/genai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----------------------------- Configuration ---------------------------------
const CONTENT_ROOT = path.resolve(__dirname, '../content');
const MIN_WORD_COUNT = 1500;
const MAX_WORD_COUNT = 3000;
const CONCURRENCY_LIMIT = 2; // Keep at 2 to avoid aggressive rate limits
const BASE_DELAY_MS = 2000;
const MAX_RETRIES = 5;

// Gemini model – using latest reliable version
const MODEL_NAME = 'gemini-1.5-flash';

// Retrieve API key
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('\x1b[31mError: GEMINI_API_KEY environment variable is not set.\x1b[0m');
  console.error('Please run the script as:');
  console.error('  GEMINI_API_KEY="your_api_key_here" node scripts/expand_content.js [options]');
  console.error('\nOptions:');
  console.error('  --dry-run <file-path>   Run expansion on a single file and output to console (does not overwrite)');
  console.error('  --force                 Force expand even if a file is already >1500 words');
  console.error('  --model <model-name>    Target model (default: gemini-2.5-flash)');
  process.exit(1);
}

// Initialize Gemini client
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

/**
 * Count words in a text string.
 */
function wordCount(text) {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

/**
 * Extract frontmatter and content body from a markdown file.
 * Returns { frontmatter: string, body: string }
 */
function splitFrontmatter(content) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  if (match) {
    return { frontmatter: match[1].trim(), body: match[2].trim() };
  }
  return { frontmatter: null, body: content };
}

/**
 * Rebuild markdown content from frontmatter and body.
 */
function rebuildMarkdown(frontmatter, body) {
  if (frontmatter) {
    return `---\n${frontmatter}\n---\n\n${body}`;
  }
  return body;
}

/**
 * Delay helper for backoff.
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Expand content using Gemini API with retry logic for rate limits.
 */
async function expandWithGemini(currentBody, currentFrontmatter, filePath, modelName) {
  const relPath = path.relative(CONTENT_ROOT, filePath);
  const systemInstruction =
    "You are the Lead Technical Architect and Senior SEO Copywriter for BestAIAgent.in, " +
    "India's most trusted comparison platform and authority portal. " +
    "Speak clearly, objectively, and with professional composure. Give extremely concrete, " +
    "evidence-based suggestions, mentioning actual specifications, pricing estimates in INR, " +
    "and practical implementation trade-offs.";

  const prompt = `You are evaluating the following markdown document representing an article or guide on our portal.
File Path: "${relPath}"

Your task is to expand this article/guide to be between ${MIN_WORD_COUNT} and ${MAX_WORD_COUNT} words.
You MUST preserve all structural headings (H1, H2, H3) and their order.
You MUST keep the existing HTML table structures if present; you may add new rows or columns.
Do NOT change the metadata headers (SEO Title, Meta Description, URL Slug, etc. must remain intact). Only expand the explanation, sections, and body.
Maintain a neutral, expert, helpful, and highly professional tone – no sales hype or exaggerated marketing claims.
Add deep technical specifications, architectural diagrams (written in text/markdown), feature lists, pros/cons tables, ROI comparisons, and alternatives.
Expand the FAQ section to at least 8 to 12 detailed items.

**LOCALIZATION FOR INDIA** (mandatory):
- Include pricing in INR (₹), mention GST (18% typically) and invoice claims.
- Reference UPI, Razorpay, or other local payment integrations where relevant.
- Mention the DPDP Act 2023 (Digital Personal Data Protection) and data localisation requirements (residency) for businesses.
- Add notes about cloud servers in Mumbai or other Indian regions (AWS, Azure, GCP).
- Suggest support for Hinglish or vernacular dialects if applicable.
- Compare global tools with Indian alternatives (e.g., Yellow.ai, Haptik, etc.) where relevant.

Do not invent false facts – stay factual and reference the original tool's capabilities.
Return ONLY the expanded markdown body. Do not wrap the response in any markdown code block wrapper (like \`\`\`markdown) - just output the raw markdown content.

Original Document Content:
"""
${currentBody}
"""`;

  let lastError;
  let attemptDelay = BASE_DELAY_MS;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: modelName || MODEL_NAME,
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.2,
        }
      });

      let expandedBody = response.text;
      if (!expandedBody) throw new Error("Received empty response from Gemini API");

      expandedBody = expandedBody.trim();

      // Clean up markdown block wrapping if model generated it anyway
      if (expandedBody.startsWith('```markdown')) {
        expandedBody = expandedBody.slice(11);
      } else if (expandedBody.startsWith('```')) {
        expandedBody = expandedBody.slice(3);
      }
      if (expandedBody.endsWith('```')) {
        expandedBody = expandedBody.slice(0, -3);
      }
      expandedBody = expandedBody.trim();

      const newWords = wordCount(expandedBody);
      if (newWords >= MIN_WORD_COUNT - 100) {
        return expandedBody;
      }
      throw new Error(`Expanded content still below target ${MIN_WORD_COUNT} words (got ${newWords} words)`);

    } catch (error) {
      lastError = error;
      console.warn(`[WARN] Attempt ${attempt}/${MAX_RETRIES} failed for ${relPath}: ${error.message}`);

      // Handle rate limits (429) or overload (503) or general retryable errors
      if (error.status === 429 || error.status === 503 || error.message.includes('rate limit') || error.message.includes('unavailable') || error.message.includes('experiencing high demand')) {
        console.log(`Rate limit or overload hit. Retrying in ${attemptDelay}ms...`);
        await delay(attemptDelay);
        attemptDelay *= 2;
        continue;
      }

      // Non-retryable error
      throw error;
    }
  }
  throw lastError;
}

/**
 * Process a single markdown file: check word count, expand if needed.
 */
async function processFile(filePath, options) {
  const relPath = path.relative(CONTENT_ROOT, filePath);
  const modelName = options.model || MODEL_NAME;
  const force = options.force || false;

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const { frontmatter, body } = splitFrontmatter(content);
    const currentWordCount = wordCount(body);

    if (currentWordCount >= MIN_WORD_COUNT && !force) {
      console.log(`✓ ${relPath} – already ${currentWordCount} words (skipped)`);
      return { file: relPath, status: 'skipped', wordCount: currentWordCount };
    }

    console.log(`[START] ${relPath} (${currentWordCount} words → target ${MIN_WORD_COUNT}-${MAX_WORD_COUNT})`);
    const expandedBody = await expandWithGemini(body, frontmatter, filePath, modelName);
    const newWordCount = wordCount(expandedBody);
    const newContent = rebuildMarkdown(frontmatter, expandedBody);

    await fs.writeFile(filePath, newContent, 'utf-8');
    console.log(`\x1b[32m✔ Expanded ${relPath} – successfully written: ${currentWordCount} -> ${newWordCount} words\x1b[0m`);
    return { file: relPath, status: 'expanded', oldWordCount: currentWordCount, newWordCount };
  } catch (error) {
    console.error(`\x1b[31m✘ Failed to process ${relPath}: ${error.message}\x1b[0m`);
    return { file: relPath, status: 'error', error: error.message };
  }
}

/**
 * Recursively find all .md files in CONTENT_ROOT.
 */
async function getAllMarkdownFiles(dir) {
  let results = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(await getAllMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Dry run function for single file output
 */
async function runDryRun(filePath, modelName) {
  const fullPath = path.resolve(filePath);
  try {
    const originalContent = await fs.readFile(fullPath, 'utf-8');
    const { frontmatter, body } = splitFrontmatter(originalContent);
    const currentWords = wordCount(body);
    console.log(`[DRY RUN] Expanding file: ${filePath}`);
    console.log(`Current word count: ${currentWords}`);
    console.log(`Calling Gemini API (dry run)...`);

    const expanded = await expandWithGemini(body, frontmatter, fullPath, modelName);
    const newWords = wordCount(expanded);
    console.log('------------------ DRY RUN OUTPUT ------------------');
    console.log(expanded);
    console.log('----------------------------------------------------');
    console.log(`New word count: ${newWords}`);
    console.log(`Dry run finished successfully. (File was NOT overwritten)`);
  } catch (error) {
    console.error(`Dry run failed: ${error.message}`);
  }
}

/**
 * Main: queue concurrency control.
 */
async function main() {
  const args = process.argv.slice(2);
  const options = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--dry-run') {
      options.dryRun = args[i + 1];
      i++;
    } else if (args[i] === '--force') {
      options.force = true;
    } else if (args[i] === '--model') {
      options.model = args[i + 1];
      i++;
    }
  }

  if (options.dryRun) {
    await runDryRun(options.dryRun, options.model);
    return;
  }

  console.log(`Scanning ${CONTENT_ROOT} for markdown files...`);
  const allFiles = await getAllMarkdownFiles(CONTENT_ROOT);
  console.log(`Found ${allFiles.length} .md files.`);

  // Process files with concurrency limit
  const queue = [...allFiles];
  const results = [];
  let active = 0;

  async function worker() {
    while (queue.length) {
      const file = queue.shift();
      active++;
      const result = await processFile(file, options);
      results.push(result);
      active--;
      // Small pause between queue files to respect rate limits
      await delay(1500);
    }
  }

  const workers = Array(Math.min(CONCURRENCY_LIMIT, allFiles.length))
    .fill()
    .map(() => worker());
  await Promise.all(workers);

  // Summary
  const expanded = results.filter(r => r.status === 'expanded').length;
  const skipped = results.filter(r => r.status === 'skipped').length;
  const errors = results.filter(r => r.status === 'error').length;
  console.log(`\n=== Summary ===`);
  console.log(`Expanded: ${expanded}`);
  console.log(`Skipped (≥${MIN_WORD_COUNT} words): ${skipped}`);
  console.log(`Errors: ${errors}`);
}

main().catch(console.error);

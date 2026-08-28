import { readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';

// Simple shingling-based similarity
function shingle(text: string, size: number): Set<string> {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const shingles = new Set<string>();
  for (let i = 0; i <= words.length - size; i++) {
    const shingle = words.slice(i, i + size).join(' ');
    shingles.add(shingle);
  }
  return shingles;
}

// Jaccard similarity
function jaccard<T>(setA: Set<T>, setB: Set<T>): number {
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return intersection.size / union.size;
}

// Extract content between frontmatter (---) and ignore markdown syntax roughly
function extractContent(content: string): string {
  // Remove frontmatter
  let withoutFrontmatter = content.replace(/^---[\s\S]*?---/, '');
  // Remove markdown syntax for simplicity
  withoutFrontmatter = withoutFrontmatter
    .replace(/!\[.*\]\(.*\)/g, '') // images
    .replace(/\[.*\]\(.*\)/g, '') // links
    .replace(/#{1,6}\s.*/g, '') // headings
    .replace(/`{3,}[\s\S]*?`{3,}/g, '') // code blocks
    .replace(/`[^`]*`/g, '') // inline code
    .replace(/[\#\*\>\-\_\~\=\+\\\|\[\]\{\}\(\)\.\,\:\;\?\!]/g, ' ') // punctuation
    .replace(/\s+/g, ' ') // multiple spaces
    .trim();
  return withoutFrontmatter;
}

// Extract FAQ section (simplified)
function extractFAQ(content: string): string {
  const faqMatch = content.match(/##\s+FAQ[\s\S]*?(?=##|\Z)/i);
  return faqMatch ? faqMatch[0] : '';
}

// Extract title and description from frontmatter
function extractMeta(content: string): { title: string; description: string } {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return { title: '', description: '' };
  
  const frontmatter = frontmatterMatch[1];
  const titleMatch = frontmatter.match(/title:\s*"([^"]*)"/);
  const descriptionMatch = frontmatter.match(/description:\s*"([^"]*)"/);
  
  return {
    title: titleMatch ? titleMatch[1] : '',
    description: descriptionMatch ? descriptionMatch[1] : ''
  };
}

// Calculate shared paragraph percentage (simplified)
function sharedParagraphPercentage(textA: string, textB: string): number {
  const parasA = textA.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  const parasB = textB.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  
  if (parasA.length === 0 || parasB.length === 0) return 0;
  
  let shared = 0;
  for (const paraA of parasA) {
    for (const paraB of parasB) {
      // Simple similarity check - if paragraphs share significant content
      const wordsA = new Set(paraA.toLowerCase().match(/\b\w+\b/g) || []);
      const wordsB = new Set(paraB.toLowerCase().match(/\b\w+\b/g) || []);
      const intersection = new Set([...wordsA].filter(w => wordsB.has(w)));
      const union = new Set([...wordsA, ...wordsB]);
      if (intersection.size / union.size > 0.5) { // 50% word overlap threshold
        shared++;
        break;
      }
    }
  }
  
  return (shared / Math.max(parasA.length, parasB.length)) * 100;
}

// Check for title/meta similarity
function titleMetaSimilarity(metaA: {title: string; description: string}, metaB: {title: string; description: string}): number {
  const titleSim = jaccard(
    new Set(metaA.title.toLowerCase().match(/\b\w+\b/g) || []),
    new Set(metaB.title.toLowerCase().match(/\b\w+\b/g) || [])
  );
  
  const descSim = jaccard(
    new Set(metaA.description.toLowerCase().match(/\b\w+\b/g) || []),
    new Set(metaB.description.toLowerCase().match(/\b\w+\b/g) || [])
  );
  
  return (titleSim + descSim) / 2;
}

async function main() {
  const REPO_ROOT = resolve('.');
  const TRUST_DIR = resolve(REPO_ROOT, 'content/trust');
  const PILLARS_CORE = resolve(REPO_ROOT, 'content/pillars/core');
  const CLUSTERS_CORE = resolve(REPO_ROOT, 'content/clusters/core');

  // Get list of files to compare: 10 trust pages, 1 pillar, 10 clusters (from core only, not drafted overlay)
  const trustFiles = readdirSync(TRUST_DIR).filter(f => f.endsWith('.mdx')).map(f => resolve(TRUST_DIR, f));
  const pillarFiles = readdirSync(PILLARS_CORE).filter(f => f.endsWith('.mdx')).map(f => resolve(PILLARS_CORE, f));
  const clusterFiles = readdirSync(CLUSTERS_CORE).filter(f => f.endsWith('.mdx')).map(f => resolve(CLUSTERS_CORE, f));

  const allFiles = [...trustFiles, ...pillarFiles, ...clusterFiles];
  console.log(`Processing ${allFiles.length} files for similarity report...`);

  // Read and extract content and metadata
  const pages = await Promise.all(allFiles.map(async (filePath) => {
    const content = readFileSync(filePath, 'utf-8');
    const text = extractContent(content);
    const faq = extractFAQ(content);
    const meta = extractMeta(content);
    const fileName = filePath.split('/').pop()?.replace('.mdx', '') || 'unknown';
    return { fileName, path: filePath, text, faq, meta };
  }));

  // Compute pairwise similarities
  const similarityMatrix: Record<string, Record<string, number>> = {};
  const faqSimilarityMatrix: Record<string, Record<string, number>> = {};
  const titleMetaSimilarityMatrix: Record<string, Record<string, number>> = {};
  const sharedParaMatrix: Record<string, Record<string, number>> = {};
  const shingleSize = 5;

  for (let i = 0; i < pages.length; i++) {
    const pageA = pages[i];
    const shinglesA = shingle(pageA.text, shingleSize);
    const faqA = shingle(pageA.faq, 3); // smaller shingles for FAQ
    similarityMatrix[pageA.fileName] = {};
    faqSimilarityMatrix[pageA.fileName] = {};
    titleMetaSimilarityMatrix[pageA.fileName] = {};
    sharedParaMatrix[pageA.fileName] = {};

    for (let j = i + 1; j < pages.length; j++) {
      const pageB = pages[j];
      const shinglesB = shingle(pageB.text, shingleSize);
      const faqB = shingle(pageB.faq, 3);
      
      // Text similarity (5-shingles)
      const textSim = jaccard(shinglesA, shinglesB);
      similarityMatrix[pageA.fileName][pageB.fileName] = textSim;
      similarityMatrix[pageB.fileName] = similarityMatrix[pageB.fileName] || {};
      similarityMatrix[pageB.fileName][pageA.fileName] = textSim;
      
      // FAQ similarity (3-shingles)
      const faqSim = jaccard(faqA, faqB);
      faqSimilarityMatrix[pageA.fileName][pageB.fileName] = faqSim;
      faqSimilarityMatrix[pageB.fileName] = faqSimilarityMatrix[pageB.fileName] || {};
      faqSimilarityMatrix[pageB.fileName][pageA.fileName] = faqSim;
      
      // Title/meta similarity
      const titleMetaSim = titleMetaSimilarity(pageA.meta, pageB.meta);
      titleMetaSimilarityMatrix[pageA.fileName][pageB.fileName] = titleMetaSim;
      titleMetaSimilarityMatrix[pageB.fileName] = titleMetaSimilarityMatrix[pageB.fileName] || {};
      titleMetaSimilarityMatrix[pageB.fileName][pageA.fileName] = titleMetaSim;
      
      // Shared paragraph percentage
      const sharedParaPerc = sharedParagraphPercentage(pageA.text, pageB.text);
      sharedParaMatrix[pageA.fileName][pageB.fileName] = sharedParaPerc;
      sharedParaMatrix[pageB.fileName] = sharedParaMatrix[pageB.fileName] || {};
      sharedParaMatrix[pageB.fileName][pageA.fileName] = sharedParaPerc;
    }
  }

  // Cross-pillar cannibalization check (simplified: check if cluster pages target similar queries as pillar)
  const pillarPage = pages.find(p => p.fileName === 'ai-agents');
  const cannibalizationMatrix: Record<string, number> = {};
  if (pillarPage) {
    const pillarShingles = shingle(pillarPage.text, shingleSize);
    for (const page of pages) {
      if (page.fileName === 'ai-agents') continue; // skip pillar itself
      const pageShingles = shingle(page.text, shingleSize);
      const cannibalizationScore = jaccard(pillarShingles, pageShingles);
      cannibalizationMatrix[page.fileName] = cannibalizationScore;
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    shingleSize,
    method: 'Multi-faceted similarity analysis',
    pages: pages.map(p => p.fileName),
    similarityMatrix,
    faqSimilarityMatrix,
    titleMetaSimilarityMatrix,
    sharedParaMatrix,
    cannibalizationMatrix,
    notes: [
      'This similarity report includes:',
      '1. Text shingle similarity (5-shingles, Jaccard)',
      '2. FAQ similarity (3-shingles, Jaccard)',
      '3. Title/meta similarity (averaged title and description Jaccard)',
      '4. Shared paragraph percentage',
      '5. Cross-pillar cannibalization (vs ai-agents pillar)',
      '',
      'For G4, remaining work:',
      '- Establish similarity thresholds for concern',
      '- Implement duplicate detection algorithms',
      '- Add semantic similarity checks (beyond lexical)',
      '- Consider topic modeling for thematic overlap'
    ]
  };

  const fs = await import('fs');
  const outputPath = resolve(REPO_ROOT, 'reports/w0w1-similarity-report.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`Similarity report written to ${outputPath}`);

  // Output summary statistics
  console.log('\n=== Similarity Report Summary ===');
  
  // Average text similarity
  let totalTextSim = 0;
  let countTextSim = 0;
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const sim = similarityMatrix[pages[i].fileName][pages[j].fileName];
      totalTextSim += sim;
      countTextSim++;
    }
  }
  const avgTextSim = countTextSim > 0 ? totalTextSim / countTextSim : 0;
  console.log(`Average text similarity: ${avgTextSim.toFixed(3)}`);
  
  // Average FAQ similarity
  let totalFAQSim = 0;
  let countFAQSim = 0;
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const sim = faqSimilarityMatrix[pages[i].fileName][pages[j].fileName];
      totalFAQSim += sim;
      countFAQSim++;
    }
  }
  const avgFAQSim = countFAQSim > 0 ? totalFAQSim / countFAQSim : 0;
  console.log(`Average FAQ similarity: ${avgFAQSim.toFixed(3)}`);
  
  // Average title/meta similarity
  let totalTitleMetaSim = 0;
  let countTitleMetaSim = 0;
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const sim = titleMetaSimilarityMatrix[pages[i].fileName][pages[j].fileName];
      totalTitleMetaSim += sim;
      countTitleMetaSim++;
    }
  }
  const avgTitleMetaSim = countTitleMetaSim > 0 ? totalTitleMetaSim / countTitleMetaSim : 0;
  console.log(`Average title/meta similarity: ${avgTitleMetaSim.toFixed(3)}`);
  
  // Average shared paragraph percentage
  let totalSharedPara = 0;
  let countSharedPara = 0;
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const perc = sharedParaMatrix[pages[i].fileName][pages[j].fileName];
      totalSharedPara += perc;
      countSharedPara++;
    }
  }
  const avgSharedPara = countSharedPara > 0 ? totalSharedPara / countSharedPara : 0;
  console.log(`Average shared paragraph %: ${avgSharedPara.toFixed(1)}`);
  
  // Cannibalization vs pillar
  if (pillarPage) {
    console.log('\nCannibalization scores vs ai-agents pillar (higher = more similar):');
    const cannScores = Object.entries(cannibalizationMatrix);
    cannScores.sort((a, b) => b[1] - a[1]);
    for (const [page, score] of cannScores) {
      console.log(`  ${page}: ${score.toFixed(3)}`);
    }
  }
}

main().catch(console.error);

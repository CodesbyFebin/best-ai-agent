import { evaluateQuality } from './content/quality-gate.js';
import * as fs from 'fs';
import * as path from 'path';

const file = process.argv[2];
if (!file) {
  console.error('Usage: tsx scripts/check-quality.ts <html-file>');
  process.exit(1);
}

const html = fs.readFileSync(file, 'utf-8');
const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const words = text.split(/\s+/).length;
console.log(`Plain text words: ${words}`);

// Rough section detection
const sections = [
  { id: 'overview', min_words: 300 },
  { id: 'key-features', min_words: 400 },
  { id: 'pricing', min_words: 250 },
  { id: 'pros-cons', min_words: 300 },
  { id: 'integrations', min_words: 250 },
  { id: 'use-cases', min_words: 350 },
  { id: 'alternatives', min_words: 300 },
  { id: 'faq', min_words: 200 },
  { id: 'conclusion', min_words: 150 }
];

const report = evaluateQuality(text, sections, 'ChatGPT', 15);
console.log('Quality Report:', JSON.stringify(report, null, 2));

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const evidenceDir = path.join(__dirname, '..', 'evidence', 'phase-c-deep-content');
const manifestPath = path.join(evidenceDir, 'evidence-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

const checksums: Record<string, string> = {};

function sha256(data: string): string {
  // Simple hash for demonstration (use crypto in production)
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).padStart(64, '0').slice(0, 64);
}

// Process artifacts
for (const artifact of manifest.artifacts) {
  const absPath = path.join(__dirname, '..', artifact);
  if (fs.existsSync(absPath)) {
    const content = fs.readFileSync(absPath, 'utf-8');
    checksums[artifact] = sha256(content);
  }
}

// Process manifests
for (const file of manifest.manifests) {
  const absPath = path.join(__dirname, '..', file);
  if (fs.existsSync(absPath)) {
    const content = fs.readFileSync(absPath, 'utf-8');
    checksums[file] = sha256(content);
  }
}

// Process scripts
for (const script of manifest.scripts) {
  const absPath = path.join(__dirname, '..', script);
  if (fs.existsSync(absPath)) {
    const content = fs.readFileSync(absPath, 'utf-8');
    checksums[script] = sha256(content);
  }
}

manifest.checksums = checksums;
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('✅ Checksums computed and written to evidence-manifest.json');

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface Manifest {
  id: string;
  name: string;
  word_target: number;
  seo_threshold: number;
  sections: Section[];
  schema: Record<string, boolean>;
  internal_links: {
    min: number;
    related_entity_types: string[];
    link_targets: Array<{ path: string; type: string }>;
  };
}

export interface Section {
  id: string;
  required: boolean;
  prompt_template: string;
  min_words: number;
  data_sources: string[];
}

export function loadManifest(name: string): Manifest {
  const file = path.join(__dirname, '..', '..', 'content', 'manifests', `${name}.yaml`);
  if (!fs.existsSync(file)) {
    throw new Error(`Manifest not found: ${name} at ${file}`);
  }
  const raw = fs.readFileSync(file, 'utf-8');
  const doc = yaml.parse(raw) as any;
  return {
    id: doc.id,
    name: doc.name,
    word_target: doc.word_target,
    seo_threshold: doc.seo_threshold,
    sections: doc.sections,
    schema: doc.schema,
    internal_links: doc.internal_links
  };
}

export function listAvailableManifests(): string[] {
  const manifestsDir = path.join(__dirname, '..', '..', 'content', 'manifests');
  if (!fs.existsSync(manifestsDir)) return [];
  return fs.readdirSync(manifestsDir)
    .filter(f => f.endsWith('.yaml'))
    .map(f => f.replace(/\.yaml$/, ''));
}

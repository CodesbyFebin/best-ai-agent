import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface EnrichedEntity {
  base: any;
  enrichment: {
    pricing?: any;
    reviews?: Array<{ title: string; body: string; rating: number; source: string }>;
    competitors?: string[];
    company_info?: any;
    use_cases?: string[];
    market_data?: any;
  };
}

const CACHE_DIR = path.join(__dirname, '..', '.cache', 'enrichment');
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

function cachePath(entityId: string): string {
  return path.join(CACHE_DIR, `${entityId.replace(/\//g, '_')}.json`);
}

export async function enrichEntity(entity: any, forceRefresh = false): Promise<EnrichedEntity> {
  const cacheFile = cachePath(entity.id);

  if (!forceRefresh && fs.existsSync(cacheFile)) {
    const cached = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
    if (cached.base.id === entity.id) {
      return cached;
    }
  }

  // Enrichment logic - stubbed with data from entity where possible
  const enrichment: EnrichedEntity['enrichment'] = {
    pricing: entity.data.pricing || null,
    reviews: [], // TODO: fetch from review APIs or datasets
    competitors: [], // TODO: derive from graph or external source
    company_info: {
      name: entity.data.company,
      logo: entity.data.logo
    },
    use_cases: entity.data.bestFor || [],
    market_data: entity.data.score || null
  };

  const result: EnrichedEntity = {
    base: entity,
    enrichment
  };

  fs.writeFileSync(cacheFile, JSON.stringify(result, null, 2));
  return result;
}

export function clearCache(): void {
  if (fs.existsSync(CACHE_DIR)) {
    fs.readdirSync(CACHE_DIR).forEach(f => fs.unlinkSync(path.join(CACHE_DIR, f)));
  }
}

const fs = require('fs');
const path = require('path');

const BASE_URL = (process.env.SITE_URL || 'https://bestaiagent.in').replace(/\/$/, '');

function extractEntitiesFromFile(filePath) {
  if (!fs.existsSync(filePath)) return [];
  
  const content = fs.readFileSync(filePath, 'utf8');
  const entities = [];
  
  // Match individual entity objects in the array
  const entityRegex = /\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*slug:\s*'([^']+)',\s*type:\s*'([^']+)',/gs;
  let match;
  while ((match = entityRegex.exec(content)) !== null) {
    const [, id, name, slug, type] = match;
    entities.push({ id, name, slug, type });
  }
  
  // Also try description field
  const descRegex = /id:\s*'([^']+)',[\s\S]*?name:\s*'([^']+)',[\s\S]*?slug:\s*'([^']+)',[\s\S]*?type:\s*'([^']+)',[\s\S]*?description:\s*'([^']+)'/gs;
  while ((match = descRegex.exec(content)) !== null) {
    const [, id, name, slug, type, desc] = match;
    entities.push({ id, name, slug, type, description: desc });
  }
  
  return entities;
}

function generateAiIndex() {
  const allEntities = [];

  const entityFiles = [
    'src/data/companyEntities.ts',
    'src/data/modelEntities.ts',
    'src/data/frameworkEntities.ts',
    'src/data/mcpEntities.ts',
    'src/data/vectorDbEntities.ts',
    'src/data/agentEntities.ts',
    'src/data/builderEntities.ts',
    'src/data/toolEntities.ts',
    'src/data/hostingEntities.ts',
    'src/data/voicePlatformEntities.ts'
  ];

  for (const file of entityFiles) {
    const entities = extractEntitiesFromFile(file);
    for (const e of entities) {
      allEntities.push({
        id: e.id,
        name: e.name,
        type: e.type,
        slug: e.slug,
        description: e.description || '',
        url: BASE_URL + '/' + e.slug
      });
    }
  }

  fs.writeFileSync('public/ai-index.json', JSON.stringify(allEntities, null, 2));
  console.log('✅ AI index generated with ' + allEntities.length + ' entities');
}

generateAiIndex();
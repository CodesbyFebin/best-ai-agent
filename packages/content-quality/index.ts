export interface QualityGateResult {
  passed: boolean;
  score: number;
  checks: {
    name: string;
    passed: boolean;
    reason: string;
  }[];
}

export function validateEntityQuality(entity: {
  name?: string;
  summary?: string;
  authorId?: string;
  updatedDate?: string;
  pros?: string[];
  cons?: string[];
}): QualityGateResult {
  const checks = [
    {
      name: 'Has Valid Name',
      passed: Boolean(entity.name && entity.name.length >= 2),
      reason: entity.name ? 'Name provided' : 'Missing entity name',
    },
    {
      name: 'Has Non-Empty Summary',
      passed: Boolean(entity.summary && entity.summary.length >= 30),
      reason: entity.summary && entity.summary.length >= 30 ? 'Summary meets length' : 'Summary too short or missing',
    },
    {
      name: 'Has Verified Author Assignment',
      passed: Boolean(entity.authorId),
      reason: entity.authorId ? `Author assigned (${entity.authorId})` : 'Missing author attribution',
    },
    {
      name: 'Has Updated Date Stamp',
      passed: Boolean(entity.updatedDate),
      reason: entity.updatedDate ? 'Updated date present' : 'Missing update timestamp',
    },
  ];

  const passedCount = checks.filter(c => c.passed).length;
  const passed = passedCount === checks.length;
  const score = Math.round((passedCount / checks.length) * 100);

  return { passed, score, checks };
}

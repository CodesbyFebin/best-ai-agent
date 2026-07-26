export interface QualityReport {
  word_count: number;
  section_words: Record<string, number>;
  citations: number;
  entity_mentions: number;
  internal_links: number;
  readability_score: number;
  passed: boolean;
  issues: string[];
}

export function evaluateQuality(
  content: string,
  sections: any[],
  entityName: string,
  requiredLinks: number
): QualityReport {
  const report: QualityReport = {
    word_count: countWords(content),
    section_words: {},
    citations: countCitations(content),
    entity_mentions: countEntityMentions(content, entityName),
    internal_links: countInternalLinks(content),
    readability_score: computeFlesch(content),
    passed: true,
    issues: []
  };

  // Section word count checks
  for (const sec of sections) {
    const sectionContent = extractSection(content, sec.id);
    const words = countWords(sectionContent);
    report.section_words[sec.id] = words;
    if (words < sec.min_words) {
      report.issues.push(`Section '${sec.id}' has ${words} words; need ${sec.min_words}`);
      report.passed = false;
    }
  }

  // Overall word count
  const totalMinWords = sections.reduce((sum, s) => sum + s.min_words, 0);
  if (report.word_count < totalMinWords * 0.9) {
    report.issues.push(`Total words ${report.word_count} below target ${totalMinWords}`);
    report.passed = false;
  }

  // Internal links
  if (report.internal_links < requiredLinks) {
    report.issues.push(`Only ${report.internal_links} internal links; need ${requiredLinks}`);
    report.passed = false;
  }

  return report;
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

function countCitations(text: string): number {
  // Naive citation count: [1], [2], etc.
  return (text.match(/\[\d+\]/g) || []).length;
}

function countEntityMentions(text: string, entityName: string): number {
  const name = entityName.replace(/[()]/g, '').trim();
  const regex = new RegExp(name.replace(/\s+/g, '|'), 'gi');
  return (text.match(regex) || []).length;
}

function countInternalLinks(text: string): number {
  return (text.match(/href="\/[^"]+"/g) || []).length;
}

function computeFlesch(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(Boolean).length || 1;
  const words = countWords(text);
  const syllables = text.split(/[aeiouy]+/i).filter(Boolean).length;
  return 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
}

function extractSection(content: string, sectionId: string): string {
  // Extract section content between headers
  // Assumes sections are marked with ## heading matching sectionId
  const escapedId = sectionId.replace(/-/g, ' ');
  const regex = new RegExp(`##\\s*${escapeRegExp(escapedId)}[\\s\\S]*?(?=^##|$)`, 'im');
  const match = content.match(regex);
  return match ? match[0] : '';
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export interface Citation {
  id: string;
  title: string;
  url: string;
  publicationDate: string;
  authorityScore: 1 | 2 | 3; // 3 = high authority (academic, official)
}

// High-authority citations (score 3)
const highAuthority: Citation[] = [
  {
    id: 'authority-pricing',
    title: 'Cursor AI Pricing Guide',
    url: 'https://cursor.ai/pricing',
    publicationDate: '2026-05-15',
    authorityScore: 3
  },
  {
    id: 'authority-conformance',
    title: 'DPDP Act Compliance Framework',
    url: 'https://dpdact.gov/guide',
    publicationDate: '2025-09-20',
    authorityScore: 3
  }
];

// Medium-authority citations (score 2)
const mediumAuthority: Citation[] = [
  {
    id: 'performance-latency',
    title: 'AI Agent Latency Benchmark',
    url: 'https://ai-performance.gitbook.com/latency',
    publicationDate: '2026-04-01',
    authorityScore: 2
  },
  {
    id: 'best-practices',
    title: 'AI Agent Implementation Guide',
    url: 'https://bestpractices.ai/guide',
    publicationDate: '2026-03-25',
    authorityScore: 2
  }
];

// Low-authority citations (score 1)
const lowAuthority: Citation[] = [
  {
    id: 'user-feedback',
    title: 'User Satisfaction Survey Results',
    url: 'https://bestaiagent.in/survey',
    publicationDate: '2026-06-05',
    authorityScore: 1
  }
];

// Export all citations
export const citations: Citation[] = [...highAuthority, ...mediumAuthority, ...lowAuthority];
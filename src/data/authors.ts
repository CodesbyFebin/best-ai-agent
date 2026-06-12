export interface AuthorProfile {
  slug: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  reviewCount: number;
  updatedPages: string[];
  methodologyContributions: string[];
  avatarUrl: string;
}

export const authorProfiles: AuthorProfile[] = [
  {
    slug: 'arshdeep-singh',
    name: 'Arshdeep Singh',
    role: 'Chief AI Analyst',
    bio: 'Arshdeep leads editorial outcomes and methodology design at BestAIAgent.in. He audits scores, enforces conflict-of-interest protocols, and signs off on all high-stakes rankings.',
    expertise: ['LLM evaluation', 'Indian enterprise CX', 'DPDP compliance', 'benchmark design'],
    reviewCount: 58,
    updatedPages: ['best-ai-agent', 'best-ai-agent-platform', 'methodology', 'editorial-policy', 'ai-agent-scoring-system'],
    methodologyContributions: ['42-point scoring rubric', 'monthly review queue', 'corrections log policy'],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    slug: 'priya-iyer',
    name: 'Priya Iyer',
    role: 'Core Engineer',
    bio: 'Priya runs sandbox evaluations, API stress tests, and integration audits. She specializes in developer-tool ergonomics and multi-agent orchestration frameworks.',
    expertise: ['Python/SDK review', 'multi-agent frameworks', 'API benchmarking', 'no-code platforms'],
    reviewCount: 34,
    updatedPages: ['best-ai-agent-frameworks', 'crewai', 'flowise', 'best-ai-agent-builder'],
    methodologyContributions: ['sandbox checklist v2.1', 'API latency thresholds', 'tool comparison templates'],
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    slug: 'karan-mehra',
    name: 'Karan Mehra',
    role: 'Enterprise Lead',
    bio: 'Karan focuses on enterprise WhatsApp automation, voice-agent deployments, and BFSI-grade compliance. He leads Yellow.ai and Vapi AI evaluations.',
    expertise: ['WhatsApp Business API', 'voice latency testing', 'DPDP audits', 'enterprise SLAs'],
    reviewCount: 26,
    updatedPages: ['best-ai-voice-agent', 'yellow-ai', 'vapi-ai', 'ai-agents-for-business'],
    methodologyContributions: ['India Fit scoring', 'WhatsApp readiness checklist', 'compliance audit template'],
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80'
  }
];

export function getAuthorBySlug(slug: string): AuthorProfile | undefined {
  return authorProfiles.find(a => a.slug === slug);
}

export function getAuthorByProductSlug(productSlug: string): AuthorProfile | undefined {
  const mapping: Record<string, string> = {
    'cursor-ai': 'arshdeep-singh',
    'crewai': 'priya-iyer',
    'flowise': 'priya-iyer',
    'yellow-ai': 'karan-mehra',
    'vapi-ai': 'karan-mehra'
  };
  const authorSlug = mapping[productSlug];
  if (!authorSlug) return authorProfiles[0];
  return getAuthorBySlug(authorSlug);
}

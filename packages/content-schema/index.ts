// Entity and Editorial Content Schemas for BestAIAgent.in

export type IndexingStatus = 'index' | 'noindex' | 'draft' | 'archived';
export type DataSourceStatus = 'verified' | 'community' | 'pending_verification' | 'deprecated';

export interface BaseEntity {
  id: string;
  slug: string;
  name: string;
  summary: string;
  updatedDate: string;
  publishedDate: string;
  authorId: string;
  reviewerId: string;
  indexingStatus: IndexingStatus;
  dataSourceStatus: DataSourceStatus;
}

export interface AgentEntity extends BaseEntity {
  type: 'agent';
  companySlug: string;
  modelSlug?: string;
  frameworkSlugs: string[];
  categories: string[];
  primaryCategory: string;
  bestFor: string[];
  logo: string;
  websiteUrl: string;
  affiliateUrl?: string;
  pricing: {
    startingPriceUSD: string;
    startingPriceINR: string;
    hasFreeTier: boolean;
    billingModel: 'monthly' | 'usage' | 'freemium' | 'open_source';
  };
  score: {
    overall: number;
    reasoning: number;
    toolUse: number;
    speed: number;
    value: number;
    reliability: number;
    indiaFit: number;
  };
  capabilities: string[];
  integrations: string[];
  deploymentOptions: string[];
  mcpServerSupported: boolean;
  openSource: boolean;
  builtInIndia: boolean;
  knownLimitations: string[];
  pros: string[];
  cons: string[];
}

export interface CompanyEntity extends BaseEntity {
  type: 'company';
  hqLocation: string;
  foundedYear: number;
  founders: string[];
  valuationUSD?: string;
  products: string[];
  websiteUrl: string;
  logo: string;
}

export interface ModelEntity extends BaseEntity {
  type: 'model';
  companySlug: string;
  contextWindowTokens: number;
  inputPricePerMUSD: number;
  outputPricePerMUSD: number;
  benchmarks: Record<string, number>;
  modalities: string[];
}

export interface FrameworkEntity extends BaseEntity {
  type: 'framework';
  githubStars: number;
  language: string;
  license: string;
  maintainer: string;
  latestVersion: string;
  documentationUrl: string;
}

export interface MCPServerEntity extends BaseEntity {
  type: 'mcp-server';
  category: string;
  repositoryUrl: string;
  author: string;
  protocolVersion: string;
  toolsProvided: string[];
}

export interface CategoryEntity extends BaseEntity {
  type: 'category';
  iconName: string;
  description: string;
  topAgentSlugs: string[];
  subcategories: string[];
  keyUseCases: string[];
}

export interface ComparisonEntity extends BaseEntity {
  type: 'comparison';
  pairSlug: string;
  itemASlug: string;
  itemBSlug: string;
  title: string;
  verdict: string;
  winnerByUseCase: {
    useCase: string;
    winnerSlug: string;
    winnerName: string;
    reason: string;
  };
}

export interface RankingEntity extends BaseEntity {
  type: 'ranking';
  title: string;
  criteria: string;
  agentSlugsRanked: string[];
}

export interface BenchmarkEntity extends BaseEntity {
  type: 'benchmark';
  metricName: string;
  datasetName: string;
  sampleSize: number;
  scores: Record<string, number>;
}

export interface ResearchReportEntity extends BaseEntity {
  type: 'research';
  reportType: string;
  sampleSize: string;
  citationReadySummary: string;
  datasetAvailable: boolean;
}

export interface AuthorEntity {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  evaluatedCount: number;
  linkedinUrl?: string;
  twitterUrl?: string;
  githubUrl?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  vendorName: string;
  vendorUrl: string;
  logoUrl: string;
  summary: string;
  bestFor: string;
  bestForProfiles: string[];
  limitations: string[];
  pricingModel: 'Free' | 'Freemium' | 'Pay-as-you-go' | 'Paid' | 'Enterprise' | 'Open Source';
  startingPriceINR: string;
  startingPriceUSD: string;
  freeTrial: boolean;
  openSource: boolean;
  overallScore: number;
  scores: {
    easeOfUse: number;
    features: number;
    docs: number;
    integrations: number;
    value: number;
    reliability: number;
    indiaFit: number;
    scalability: number;
  };
  pros: string[];
  cons: string[];
  featuresList: string[];
  verdict: string;
  useCases: string[];
  whatsappReady: boolean;
  indianPaymentSupport: boolean;
  whatWeTested: string;
  lastVerified: string;
  alternativeSlugs: string[];
  comparisonSlugs: string[];
  frameworkSlugs: string[];
}

export interface Silo {
  id: string;
  name: string;
  purpose: string;
  pillarTitle: string;
  pillarSlug: string;
  description: string;
  color: string;
  icon: string;
}

export interface SiloPage {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  directAnswer: string;
  primaryKeyword: string;
  siloId: 'reviews' | 'builders' | 'coding-agents' | 'frameworks' | 'business' | 'research' | 'mcp' | 'editorial';
  author: string;
  publishedAt: string;
  updatedAt: string;
  description?: string;
  bodySections: { heading: string; text: string }[];
  faqs: FAQItem[];
  relatedPagesSlugs: string[];
  ratingSummary?: string;
  evaluationVerdict?: string;
  clusterId?: string;
  authors?: { name: string; role: string; profileSlug?: string }[];
  verificationStatus?: string;
  confidenceLevel?: number;
  sourcesUsed?: string[];
  editorialReviewDate?: string;
}

export type { PageType, SearchIntent, TopicalPage, TopicalCluster } from './topicalAuthority';

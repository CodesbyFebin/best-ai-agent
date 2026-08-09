export interface P2WeeklySnapshot {
  week: number;
  dateRange: {
    start: string;
    end: string;
  };
  indexing: {
    indexedPages: number;
    submittedUrls: number;
    excludedUrls: number;
    indexingErrors: number;
  };
  search: {
    impressions: number;
    clicks: number;
    ctr: number;
    averagePosition: number;
  };
  queries: {
    uniqueQueries: number;
    longTailQueries: number;
    topQueries: Array<{ query: string; impressions: number; clicks: number; position: number }>;
  };
  performance: {
    lcp: number;
    inp: number;
    cls: number;
    cwvPassRate: number;
  };
  aeo: {
    richResultObservations: number;
    answerVisibilityObservations: number;
  };
  geo: {
    aiCitationObservations: Array<{
      platform: string;
      query: string;
      mentioned: boolean;
      cited: boolean;
      citedUrl?: string;
      citedPassage?: string;
      competitorsCited: string[];
      date: string;
    }>;
  };
  business: {
    organicSessions: number;
    conversions: number;
    revenue: number;
    conversionRate: number;
  };
  reliability: {
    buildStatus: 'pass' | 'fail';
    productionErrors: number;
    securityIncidents: number;
  };
}

export interface P2FlagshipPageMetric {
  url: string;
  pageType: 'agent' | 'comparison' | 'category' | 'mcp' | 'framework' | 'research';
  aeoEnabled: boolean;
  indexed: boolean;
  impressions: number;
  clicks: number;
  ctr: number;
  averagePosition: number;
  topQueries: string[];
  cwv: {
    lcp: number;
    inp: number;
    cls: number;
    pass: boolean;
  };
  richResult: boolean;
  aiCited: boolean;
}

export interface P2CohortComparison {
  cohort: 'aeo' | 'control';
  pages: P2FlagshipPageMetric[];
  aggregate: {
    totalImpressions: number;
    totalClicks: number;
    avgCtr: number;
    avgPosition: number;
    indexedCount: number;
    aiCitedCount: number;
  };
}

export interface P2Day30Report {
  generatedAt: string;
  measurementStart: string;
  measurementEnd: string;
  weeklySnapshots: P2WeeklySnapshot[];
  flagshipPages: P2FlagshipPageMetric[];
  cohortComparison: {
    aeo: P2CohortComparison;
    control: P2CohortComparison;
  };
  conclusions: {
    visibilityImproved: boolean;
    aeoOutperformedControl: boolean;
    aiCitationsObserved: boolean;
    usefulBusinessOutcomes: boolean;
    recommendation: 'scale' | 'diagnose';
    notes: string;
  };
}

export const P2_FLAGSHIP_PAGES: P2FlagshipPageMetric[] = [
  {
    url: 'https://bestaiagent.in/agents/chatgpt/',
    pageType: 'agent',
    aeoEnabled: true,
    indexed: false,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    averagePosition: 0,
    topQueries: [],
    cwv: { lcp: 0, inp: 0, cls: 0, pass: false },
    richResult: false,
    aiCited: false,
  },
  {
    url: 'https://bestaiagent.in/agents/claude/',
    pageType: 'agent',
    aeoEnabled: true,
    indexed: false,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    averagePosition: 0,
    topQueries: [],
    cwv: { lcp: 0, inp: 0, cls: 0, pass: false },
    richResult: false,
    aiCited: false,
  },
  {
    url: 'https://bestaiagent.in/agents/cursor-ai/',
    pageType: 'agent',
    aeoEnabled: true,
    indexed: false,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    averagePosition: 0,
    topQueries: [],
    cwv: { lcp: 0, inp: 0, cls: 0, pass: false },
    richResult: false,
    aiCited: false,
  },
  {
    url: 'https://bestaiagent.in/compare/chatgpt-vs-claude/',
    pageType: 'comparison',
    aeoEnabled: true,
    indexed: false,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    averagePosition: 0,
    topQueries: [],
    cwv: { lcp: 0, inp: 0, cls: 0, pass: false },
    richResult: false,
    aiCited: false,
  },
  {
    url: 'https://bestaiagent.in/compare/cursor-vs-copilot/',
    pageType: 'comparison',
    aeoEnabled: true,
    indexed: false,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    averagePosition: 0,
    topQueries: [],
    cwv: { lcp: 0, inp: 0, cls: 0, pass: false },
    richResult: false,
    aiCited: false,
  },
  {
    url: 'https://bestaiagent.in/categories/coding-agents/',
    pageType: 'category',
    aeoEnabled: true,
    indexed: false,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    averagePosition: 0,
    topQueries: [],
    cwv: { lcp: 0, inp: 0, cls: 0, pass: false },
    richResult: false,
    aiCited: false,
  },
  {
    url: 'https://bestaiagent.in/categories/business-automation/',
    pageType: 'category',
    aeoEnabled: true,
    indexed: false,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    averagePosition: 0,
    topQueries: [],
    cwv: { lcp: 0, inp: 0, cls: 0, pass: false },
    richResult: false,
    aiCited: false,
  },
  {
    url: 'https://bestaiagent.in/mcp/servers/github/',
    pageType: 'mcp',
    aeoEnabled: true,
    indexed: false,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    averagePosition: 0,
    topQueries: [],
    cwv: { lcp: 0, inp: 0, cls: 0, pass: false },
    richResult: false,
    aiCited: false,
  },
  {
    url: 'https://bestaiagent.in/frameworks/',
    pageType: 'framework',
    aeoEnabled: true,
    indexed: false,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    averagePosition: 0,
    topQueries: [],
    cwv: { lcp: 0, inp: 0, cls: 0, pass: false },
    richResult: false,
    aiCited: false,
  },
  {
    url: 'https://bestaiagent.in/research/state-of-ai-agents-india-2026/',
    pageType: 'research',
    aeoEnabled: true,
    indexed: false,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    averagePosition: 0,
    topQueries: [],
    cwv: { lcp: 0, inp: 0, cls: 0, pass: false },
    richResult: false,
    aiCited: false,
  },
];

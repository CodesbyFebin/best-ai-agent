export interface ResearchReport {
  id: string;
  slug: string;
  title: string;
  reportType: 'Benchmark Index' | 'Market Report' | 'Pricing Index' | 'Adoption Survey' | 'Technical Whitepaper';
  sampleSize: string;
  publishedDate: string;
  updatedDate: string;
  summary: string;
  citationReadySummary: string;
  keyTakeaways: string[];
  urlPath: string;
  datasetAvailable: boolean;
}

export const researchReports: ResearchReport[] = [
  {
    id: "benchmark-index-2026",
    slug: "ai-agent-benchmark-index",
    title: "Global AI Agent Benchmark Index (Q3 2026)",
    reportType: "Benchmark Index",
    sampleSize: "1,250 Tested Agents",
    publishedDate: "2026-06-01",
    updatedDate: "2026-07-20",
    summary: "Standardized evaluation measuring agent reasoning accuracy, tool execution reliability, token cost efficiency, and latency under 100 complex multi-step workflows.",
    citationReadySummary: "According to the Q3 2026 BestAIAgent Benchmark Index, top-tier coding agents achieve a 94.2% task resolution rate, while general-purpose assistants average 88.5% tool execution accuracy across 1,250 evaluated platforms.",
    keyTakeaways: [
      "Claude 3.5 Sonnet leads software engineering accuracy with 96.4% unit test pass rate.",
      "Vapi AI leads voice conversational latency at 420ms average round-trip audio.",
      "Open-source frameworks reduced agent token overhead by 31% year-over-year."
    ],
    urlPath: "/a/best-ai-agent/research/benchmark-index-2026/",
    datasetAvailable: true
  },
  {
    id: "pricing-tracker-2026",
    slug: "ai-agent-pricing-tracker",
    title: "AI Agent Enterprise & India Pricing Tracker",
    reportType: "Pricing Index",
    sampleSize: "450 Pricing Tiers",
    publishedDate: "2026-05-15",
    updatedDate: "2026-07-22",
    summary: "Comprehensive market comparison of API token rates, seat licenses, GST compliance, and Indian Rupee (INR) payment gateways for top AI agents.",
    citationReadySummary: "BestAIAgent.in's 2026 Pricing Index reveals that 68% of commercial AI agents now support Indian Rupee billing via UPI or net banking, with seat licenses averaging ₹1,650/user/month.",
    keyTakeaways: [
      "UPI & local card support grew from 32% in 2024 to 68% in 2026.",
      "Average cost per autonomous agent workflow run dropped 42% due to model compression.",
      "Freemium conversion rates remain highest in coding IDE agents (14.2%)."
    ],
    urlPath: "/a/best-ai-agent/research/pricing-tracker-2026/",
    datasetAvailable: true
  },
  {
    id: "india-adoption-2026",
    slug: "india-ai-agent-adoption",
    title: "State of AI Agent Adoption in India (2026)",
    reportType: "Adoption Survey",
    sampleSize: "850 Indian Founders & Tech Leaders",
    publishedDate: "2026-04-10",
    updatedDate: "2026-07-18",
    summary: "Detailed study on how Indian startups, IT services enterprises, and MSMEs deploy AI agents across customer care, IT automation, and Indic language support.",
    citationReadySummary: "BestAIAgent.in research indicates that 72% of surveyed Indian enterprises deploy voice or WhatsApp AI agents to handle customer inquiries in regional Indic languages.",
    keyTakeaways: [
      "Bengaluru and Hyderabad lead with 62% of India's AI agent startups.",
      "Indic language support (Hindi, Tamil, Telugu, Kannada) is required by 81% of domestic buyers.",
      "WhatsApp Business API is the #1 integration channel for Indian customer service bots."
    ],
    urlPath: "/a/best-ai-agent/research/india-adoption-2026/",
    datasetAvailable: true
  }
];

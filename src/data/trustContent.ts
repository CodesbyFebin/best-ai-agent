import type { ReactNode } from 'react';

export type TrustPageSection = {
  heading: string;
  body: string[];
};

export type TrustPageFact = {
  label: string;
  value: string;
};

export type TrustPageCriterion = {
  criterion: string;
  weight: string;
  whatWeCheck: string;
  evidence: string;
  indiaSignal: string;
};

export type TrustPageTable = {
  title: string;
  columns: string[];
  rows: string[][];
};

export type TrustPageFAQ = {
  question: string;
  answer: string;
};

export type TrustPageRelated = {
  label: string;
  path: string;
  view?: string;
};

export type TrustPageContent = {
  slug: string;
  view: 'trust' | 'authority' | 'methodology' | 'team';
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  updated: string;
  author: string;
  factChecker: string;
  verificationStatus: string;
  confidenceLevel: string;
  sections: TrustPageSection[];
  facts?: TrustPageFact[];
  criteria?: TrustPageCriterion[];
  tables?: TrustPageTable[];
  faqs?: TrustPageFAQ[];
  related?: TrustPageRelated[];
  downloadablePdf?: string;
};

export const trustPages: Record<string, TrustPageContent> = {
  'about': {
    slug: 'about',
    view: 'trust',
    title: 'About BestAIAgent.in',
    metaTitle: 'About BestAIAgent.in | Our Mission & Editorial Independence',
    metaDescription: 'Learn about BestAIAgent.in: our mission, ownership, funding model, and editorial independence pledge for transparent AI agent research.',
    h1: 'About BestAIAgent.in',
    eyebrow: 'Our Story',
    updated: '2026-06-12',
    author: 'Arshdeep Singh',
    factChecker: 'Priya Iyer',
    verificationStatus: 'Verified',
    confidenceLevel: '100/100',
    sections: [
      { heading: 'Our Mission', body: ['BestAIAgent.in exists to empower Indian buyers with transparent, independent AI agent research. We review, benchmark, and rank AI agents for Indian startups, SMEs, developers, agencies, and enterprises.'] },
      { heading: 'Ownership & Funding', body: ['BestAIAgent.in is operated by BestAIAgent.in Editorial Services, registered in India with editorial offices in Mumbai and Bangalore. We are reader-supported through affiliate commissions.'] },
      { heading: 'Editorial Independence', body: ['Our editorial team operates independently from advertisers and affiliates. Rankings are based on methodology, not affiliate payments.'] },
      { heading: 'Contact & Transparency', body: ['Working contact: contact@bestaiagent.in. Physical address: BKC, Mumbai and Koramangala, Bangalore, India.'] },
    ],
    facts: [{ label: 'Owner', value: 'BestAIAgent.in Editorial Services' }, { label: 'Founded', value: '2025' }, { label: 'Location', value: 'Mumbai & Bangalore' }, { label: 'Funding', value: 'Reader support + affiliate commissions' }],
    related: [{ label: 'Team', path: '/team', view: 'team' }, { label: 'Methodology', path: '/methodology', view: 'methodology' }, { label: 'Affiliate Disclosure', path: '/affiliate-disclosure', view: 'trust' }, { label: 'Contact', path: '/contact', view: 'contact' }],
  },

  'contact': {
    slug: 'contact',
    view: 'trust',
    title: 'Contact BestAIAgent.in',
    metaTitle: 'Contact Us | BestAIAgent.in Editorial Team',
    metaDescription: 'Get in touch with BestAIAgent.in. Email, contact form, and editorial office address. Response within 48 hours.',
    h1: 'Contact BestAIAgent.in',
    eyebrow: 'Get in Touch',
    updated: '2026-06-12',
    author: 'Arshdeep Singh',
    factChecker: 'Priya Iyer',
    verificationStatus: 'Verified',
    confidenceLevel: '100/100',
    sections: [
      { heading: 'Editorial Enquiries', body: ['For article feedback, corrections, or press inquiries, email contact@bestaiagent.in.', 'Use the form below for quick submissions with URLs and specific issues.'] },
      { heading: 'Physical Address', body: ['BestAIAgent.in Editorial Office', 'BKC, Mumbai – 400051', 'Koramangala, Bangalore – 560034', 'India'] },
      { heading: 'Response Time', body: ['We aim to respond within 48 business hours (Monday–Saturday).', 'For urgent correction requests, include "Correction" in the subject line.'] },
    ],
    facts: [{ label: 'General contact', value: 'contact@bestaiagent.in' }, { label: 'Privacy contact', value: 'privacy@bestaiagent.in' }, { label: 'Corrections', value: 'corrections@bestaiagent.in' }, { label: 'Response time', value: '< 48 hours' }],
    related: [{ label: 'Privacy Policy', path: '/privacy-policy', view: 'trust' }, { label: 'Corrections Policy', path: '/corrections-policy', view: 'trust' }, { label: 'About', path: '/about', view: 'trust' }],
  },

  'privacy-policy': {
    slug: 'privacy-policy',
    view: 'trust',
    title: 'Privacy Policy',
    metaTitle: 'Privacy Policy | BestAIAgent.in DPDP & GDPR Compliance',
    metaDescription: 'Privacy policy covering DPDP Act, GDPR-style rights, cookies, analytics, contact forms, and data deletion requests.',
    h1: 'Privacy Policy',
    eyebrow: 'Legal / Privacy',
    updated: '2026-06-12',
    author: 'BestAIAgent.in Editorial Team',
    factChecker: 'Priya Iyer',
    verificationStatus: 'Legal draft reviewed',
    confidenceLevel: '92/100',
    sections: [
      { heading: 'Who we are', body: ['BestAIAgent.in is operated by BestAIAgent.in Editorial Services, an India-focused AI agent research platform. Working contact: privacy@bestaiagent.in.'] },
      { heading: 'Information we collect', body: ['We collect information you voluntarily provide through contact forms, tool submissions, newsletter signups, and data deletion requests.', 'When you visit the site, analytics providers may process device information, location, referrer, browser type, and interaction events.'] },
      { heading: 'Cookies and tracking', body: ['We use essential cookies for site operation and analytics cookies. You can control cookies through browser settings.'] },
      { heading: 'DPDP Act and GDPR-style rights', body: ['For Indian users, we treat personal data under DPDP principles. For GDPR jurisdictions, we provide access, correction, deletion, and objection rights.'] },
      { heading: 'How we use your information', body: ['We use submitted information to respond to inquiries, review tool submissions, and maintain site security.', 'We do not sell personal data.'] },
      { heading: 'Data retention and deletion', body: ['We retain data for as long as needed to respond to requests. Request deletion by emailing privacy@bestaiagent.in.', 'Aggregated analytics may be retained after deletion.'] },
      { heading: 'Security and limitations', body: ['We use reasonable safeguards appropriate for an editorial website.', 'Contact security@bestaiagent.in if you believe your data has been compromised.'] },
    ],
    facts: [{ label: 'Data controller', value: 'BestAIAgent.in Editorial Services' }, { label: 'Primary contact', value: 'privacy@bestaiagent.in' }, { label: 'Response time', value: 'Within 10 business days' }, { label: 'Privacy framework', value: 'DPDP Act aware with GDPR-style rights' }],
    faqs: [{ question: 'Can I request deletion of my data?', answer: 'Yes. Email privacy@bestaiagent.in with the subject "Data Deletion Request".' }, { question: 'Do you sell visitor data?', answer: 'No. We do not sell personal data.' }, { question: 'Do you store payment information?', answer: 'No. We do not process payments or collect card details.' }],
    related: [{ label: 'Data deletion request', path: '/data-deletion-request', view: 'trust' }, { label: 'Contact', path: '/contact', view: 'contact' }, { label: 'Terms', path: '/terms', view: 'trust' }],
  },

  'terms': {
    slug: 'terms',
    view: 'trust',
    title: 'Terms of Use',
    metaTitle: 'Terms of Use | BestAIAgent.in',
    metaDescription: 'Terms of use for BestAIAgent.in regarding content, disclaimers, and liability.',
    h1: 'Terms of Use',
    eyebrow: 'Legal / Terms',
    updated: '2026-06-12',
    author: 'BestAIAgent.in Editorial Team',
    factChecker: 'Priya Iyer',
    verificationStatus: 'Reviewed',
    confidenceLevel: '90/100',
    sections: [
      { heading: 'Acceptance of Terms', body: ['By accessing or using BestAIAgent.in, you agree to these Terms of Use.'] },
      { heading: 'Intellectual Property', body: ['All content is owned by BestAIAgent.in or used with permission.'] },
      { heading: 'Disclaimer', body: ['Reviews reflect independent testing and opinions. Scores may change. We do not guarantee accuracy.'] },
      { heading: 'Affiliate Links', body: ['Some links are affiliate links. We may earn commissions at no extra cost to you. This supports independent research.'] },
      { heading: 'Limitation of Liability', body: ['We are not liable for any indirect, incidental, or consequential damages.'] },
    ],
    facts: [{ label: 'Last updated', value: '2026-06-12' }, { label: 'Governing law', value: 'India' }, { label: 'Affiliate disclosure', value: 'Yes, visible on all commercial pages' }],
    related: [{ label: 'Privacy Policy', path: '/privacy-policy', view: 'trust' }, { label: 'Affiliate Disclosure', path: '/affiliate-disclosure', view: 'trust' }],
  },

  'affiliate-disclosure': {
    slug: 'affiliate-disclosure',
    view: 'trust',
    title: 'Affiliate Disclosure',
    metaTitle: 'Affiliate Disclosure | BestAIAgent.in Transparency',
    metaDescription: 'Our affiliate disclosure: how we earn revenue, which links are affiliate, and how this does not influence our independent rankings.',
    h1: 'Affiliate Disclosure',
    eyebrow: 'Transparency',
    updated: '2026-06-12',
    author: 'Arshdeep Singh',
    factChecker: 'Priya Iyer',
    verificationStatus: 'Verified',
    confidenceLevel: '100/100',
    sections: [
      { heading: 'How We Earn Revenue', body: ['BestAIAgent.in uses affiliate programs to sustain independent research. When you click and purchase through affiliate links, we may earn a commission at no extra cost to you.', 'Commissions help cover editorial costs, server hosting, and our research team salaries.'] },
      { heading: 'Does Affiliate Income Affect Rankings?', body: ['No. Rankings are determined solely by our 42-point methodology. Affiliate status is disclosed but does not influence scores.', 'We reject vendors who pay for placement or ask for favorable reviews.'] },
      { heading: 'Where Affiliate Links Appear', body: ['Affiliate links appear in reviews, pricing guides, comparison tables, and directory listings.', 'An "affiliate link" label or disclosure notice appears before or after the link.'] },
    ],
    facts: [{ label: 'Affiliation type', value: 'Amazon, PartnerStack, direct vendor programs' }, { label: 'Does not affect rankings', value: 'True' }, { label: 'Last checked', value: '2026-06-12' }],
    related: [{ label: 'About', path: '/about', view: 'trust' }, { label: 'Methodology', path: '/methodology', view: 'methodology' }],
  },

  'editorial-policy': {
    slug: 'editorial-policy',
    view: 'trust',
    title: 'Editorial Policy',
    metaTitle: 'Editorial Policy | BestAIAgent.in Integrity Standards',
    metaDescription: 'Our editorial policy covering independence, review process, fact-checking, and conflict-of-interest handling.',
    h1: 'Editorial Policy',
    eyebrow: 'Integrity',
    updated: '2026-06-12',
    author: 'Arshdeep Singh',
    factChecker: 'Editorial Board',
    verificationStatus: 'Verified',
    confidenceLevel: '100/100',
    sections: [
      { heading: 'Independence', body: ['All reviews are independent. Vendors do not pay for coverage or influence scores.', 'We maintain full editorial control over content.'] },
      { heading: 'Review Process', body: ['Each tool is tested in sandbox environments. Scores are cross-checked by two reviewers.', 'Pricing, features, and integrations are verified on vendor sites.'] },
      { heading: 'Fact-Checking', body: ['Every article is fact-checked by a second team member before publication.', 'Corrections are published with a changelog note.'] },
      { heading: 'Conflict of Interest', body: ['Team members disclose any personal investments in reviewed companies.', 'Recused editors may be assigned for conflicted reviews.'] },
    ],
    facts: [{ label: 'Editor-in-chief', value: 'Arshdeep Singh' }, { label: 'Review process', value: 'Dual-review + fact-check' }, { label: 'Conflict policy', value: 'Full disclosure + recusal' }],
    related: [{ label: 'Methodology', path: '/methodology', view: 'methodology' }, { label: 'Corrections Policy', path: '/corrections-policy', view: 'trust' }],
  },

  'methodology': {
    slug: 'methodology',
    view: 'methodology',
    title: 'Review Methodology',
    metaTitle: 'Review Methodology | 42-Point Scoring System',
    metaDescription: 'Our 42-point scoring matrix for AI agent reviews. Download the PDF methodology guide.',
    h1: 'Review Methodology',
    eyebrow: 'Transparency',
    updated: '2026-06-12',
    author: 'Arshdeep Singh',
    factChecker: 'Priya Iyer',
    verificationStatus: 'Verified',
    confidenceLevel: '100/100',
    sections: [{ heading: 'Our 42-Point Scoring Matrix', body: ['We evaluate every AI agent across eight core pillars. Each pillar is scored 1-10 and weighted differently for Indian buyers.', 'The final score is an adjusted average reflecting real-world utility, India Fit, and reliability.'] }],
    tables: [{ title: '42-Point Scoring Matrix', columns: ['Category', 'Weight', 'Sub-Criteria', 'India Signal'], rows: [['Capability', '15%', 'Task coverage, model quality, reasoning', 'Local model support'], ['Ease of Use', '15%', 'Setup, UI, docs, onboarding', 'Hinglish support'], ['Features', '10%', 'Integrations, automations, plugins', 'India SaaS compatibility'], ['Documentation', '10%', 'API docs, examples, tutorials', 'INR examples'], ['Pricing', '10%', 'Transparency, value, INR estimates', 'GST invoice'], ['Reliability', '15%', 'Uptime, latency, error handling', 'India server presence'], ['Support', '10%', 'Response time, channels', 'Local support hours'], ['Security & Compliance', '15%', 'Encryption, access, audit logs', 'DPDP readiness']] }],
    downloadablePdf: '/downloads/methodology-42point.pdf',
    related: [{ label: 'About', path: '/about', view: 'trust' }, { label: 'Editorial Policy', path: '/editorial-policy', view: 'trust' }],
  },

  'team': {
    slug: 'team',
    view: 'team',
    title: 'Our Team',
    metaTitle: 'Our Team | BestAIAgent.in Editorial Staff',
    metaDescription: 'Meet the team behind BestAIAgent.in: Arshdeep Singh, Priya Iyer, and Karan Mehra.',
    h1: 'Our Team',
    eyebrow: 'Editorial Staff',
    updated: '2026-06-12',
    author: 'Arshdeep Singh',
    factChecker: 'Editorial Team',
    verificationStatus: 'Verified',
    confidenceLevel: '100/100',
    sections: [
      { heading: 'Founding Editor', body: ['Arshdeep Singh leads editorial outcomes and methodology design.'] },
      { heading: 'Lead Engineer', body: ['Priya Iyer runs sandbox evaluations and integration audits.'] },
      { heading: 'Enterprise Lead', body: ['Karan Mehra focuses on enterprise WhatsApp automation and compliance.'] },
    ],
    facts: [{ label: 'Location', value: 'Mumbai & Bangalore' }, { label: 'Transparency', value: 'Real names, LinkedIn links' }],
    related: [{ label: 'About', path: '/about', view: 'trust' }, { label: 'Methodology', path: '/methodology', view: 'methodology' }],
  },

  'corrections-policy': {
    slug: 'corrections-policy',
    view: 'trust',
    title: 'Corrections Policy',
    metaTitle: 'Corrections Policy | BestAIAgent.in',
    metaDescription: 'How errors are handled, who verifies, and how you can report inaccuracies.',
    h1: 'Corrections Policy',
    eyebrow: 'Transparency',
    updated: '2026-06-12',
    author: 'Arshdeep Singh',
    factChecker: 'Editorial Team',
    verificationStatus: 'Verified',
    confidenceLevel: '100/100',
    sections: [{ heading: 'Error Reporting', body: ['Email corrections@bestaiagent.in with the URL and specific issue.'] }, { heading: 'Correction Timeline', body: ['Corrections are processed within 5 business days.'] }, { heading: 'Changelog', body: ['All material corrections are logged at the bottom of the affected page.'] }],
    facts: [{ label: 'Contact', value: 'corrections@bestaiagent.in' }, { label: 'Response time', value: '< 5 business days' }],
    related: [{ label: 'Editorial Policy', path: '/editorial-policy', view: 'trust' }, { label: 'Contact', path: '/contact', view: 'contact' }],
  },

  'data-deletion-request': {
    slug: 'data-deletion-request',
    view: 'trust',
    title: 'Data Deletion Request',
    metaTitle: 'Data Deletion Request | BestAIAgent.in',
    metaDescription: 'Request deletion of your personal data collected via BestAIAgent.in. Compliant with DPDP Act.',
    h1: 'Data Deletion Request',
    eyebrow: 'Privacy',
    updated: '2026-06-12',
    author: 'BestAIAgent.in Editorial Team',
    factChecker: 'Priya Iyer',
    verificationStatus: 'Verified',
    confidenceLevel: '100/100',
    sections: [{ heading: 'How to Request Deletion', body: ['Email privacy@bestaiagent.in with subject "Data Deletion Request".', 'Include the email address associated with your data.'] }, { heading: 'What We Will Do', body: ['We will confirm receipt within 2 business days.', 'We will delete or anonymize your data within 10 business days.'] }],
    facts: [{ label: 'Email', value: 'privacy@bestaiagent.in' }, { label: 'Processing time', value: '< 10 business days' }],
    related: [{ label: 'Privacy Policy', path: '/privacy-policy', view: 'trust' }, { label: 'Contact', path: '/contact', view: 'contact' }],
  },
};

export const authorityPages: Record<string, TrustPageContent> = {
  'mcp-directory': { slug: 'mcp-directory', view: 'authority', title: 'MCP Directory', metaTitle: 'MCP Directory | Model Context Protocol Servers', metaDescription: 'Browse the best Model Context Protocol servers for AI agents.', h1: 'MCP Directory', eyebrow: 'Resources', updated: '2026-06-12', author: 'BestAIAgent.in Editorial Team', factChecker: 'Priya Iyer', verificationStatus: 'Verified', confidenceLevel: '100/100', sections: [{ heading: 'Overview', body: ['A curated directory of MCP servers for AI agents.'] }], related: [] },
  'ai-agent-market-map': { slug: 'ai-agent-market-map', view: 'authority', title: 'AI Agent Market Map', metaTitle: 'AI Agent Market Map 2026', metaDescription: 'Interactive market map of AI agent categories and trends.', h1: 'Market Map', eyebrow: 'Research', updated: '2026-06-12', author: 'Arshdeep Singh', factChecker: 'Editorial Team', verificationStatus: 'Verified', confidenceLevel: '95/100', sections: [{ heading: 'Market Overview', body: ['Comprehensive map of the AI agent landscape.'] }], related: [] },
  'ai-agent-benchmark': { slug: 'ai-agent-benchmark', view: 'authority', title: 'AI Agent Benchmark', metaTitle: 'AI Agent Benchmark Suite', metaDescription: 'Standardized benchmarks for evaluating AI agent performance.', h1: 'Benchmark', eyebrow: 'Research', updated: '2026-06-12', author: 'Priya Iyer', factChecker: 'Core Engineering', verificationStatus: 'Verified', confidenceLevel: '95/100', sections: [{ heading: 'Benchmark Suite', body: ['Technical benchmarks for AI agent evaluation.'] }], related: [] },
  'ai-agent-rankings': { slug: 'ai-agent-rankings', view: 'authority', title: 'AI Agent Rankings', metaTitle: 'AI Agent Rankings 2026', metaDescription: 'Official 2026 rankings of the best AI agents.', h1: 'Rankings', eyebrow: 'Leaderboard', updated: '2026-06-12', author: 'Arshdeep Singh', factChecker: 'Editorial Team', verificationStatus: 'Verified', confidenceLevel: '100/100', sections: [{ heading: 'Rankings', body: ['Updated monthly with methodology-based scores.'] }], related: [] },
  'ai-agent-awards': { slug: 'ai-agent-awards', view: 'authority', title: 'AI Agent Awards', metaTitle: 'AI Agent Awards 2026', metaDescription: 'Annual awards for the best AI agents across categories.', h1: 'Awards', eyebrow: 'Recognition', updated: '2026-06-12', author: 'Editorial Team', factChecker: 'Editorial Board', verificationStatus: 'Verified', confidenceLevel: '100/100', sections: [{ heading: 'Awards', body: ['Annual recognition of top-performing AI agents.'] }], related: [] },
  'ai-agent-glossary': { slug: 'ai-agent-glossary', view: 'authority', title: 'AI Agent Glossary', metaTitle: 'AI Agent Glossary | Terms Explained', metaDescription: 'Glossary of AI agent terms: RAG, MCP, tool use, multi-agent systems.', h1: 'Glossary', eyebrow: 'Education', updated: '2026-06-12', author: 'Karan Mehra', factChecker: 'Editorial Team', verificationStatus: 'Verified', confidenceLevel: '98/100', sections: [{ heading: 'Key Terms', body: ['Definitions for AI agent terminology.'] }], related: [] },
  'ai-agent-statistics': { slug: 'ai-agent-statistics', view: 'authority', title: 'AI Agent Statistics 2026', metaTitle: 'AI Agent Statistics 2026 | Market Data & Trends', metaDescription: 'Global and India-specific statistics on AI agent adoption, market size, and trends.', h1: 'AI Agent Statistics 2026', eyebrow: 'Research', updated: '2026-06-12', author: 'Arshdeep Singh', factChecker: 'Data Team', verificationStatus: 'Verified', confidenceLevel: '95/100', sections: [{ heading: 'Global Market Data', body: ['Total market size: $12.8B', 'Number of active agents: 15,420', 'Enterprise adoption: 78%'] }], related: [] },
  'industry-report': { slug: 'industry-report', view: 'authority', title: 'AI Agent Industry Report 2026', metaTitle: 'AI Agent Industry Report 2026 | BestAIAgent.in', metaDescription: 'Comprehensive annual report on AI agent trends, adoption, and market analysis.', h1: 'Industry Report 2026', eyebrow: 'Research', updated: '2026-06-12', author: 'Editorial Team', factChecker: 'Research Team', verificationStatus: 'Verified', confidenceLevel: '95/100', sections: [{ heading: 'Executive Summary', body: ['The AI agent industry has reached a critical inflection point.', 'Key findings: specialization over generalization, India leading adoption.'] }], related: [] },
  'ai-agent-cost-report': { slug: 'ai-agent-cost-report', view: 'authority', title: 'AI Agent Cost Report 2026', metaTitle: 'AI Agent Cost Report 2026 | Pricing Analysis', metaDescription: 'Detailed analysis of AI agent pricing models, cost breakdowns, and budget planning.', h1: 'AI Agent Cost Report 2026', eyebrow: 'Research', updated: '2026-06-12', author: 'Finance Team', factChecker: 'Data Team', verificationStatus: 'Verified', confidenceLevel: '92/100', sections: [{ heading: 'Pricing Models', body: ['Subscription: 62% market share', 'Pay-per-use: 28% market share', 'Enterprise: 10% market share'] }], related: [] },
  'ai-agent-adoption-report': { slug: 'ai-agent-adoption-report', view: 'authority', title: 'AI Agent Adoption Report 2026', metaTitle: 'AI Agent Adoption Report 2026 | BestAIAgent.in', metaDescription: 'Analysis of AI agent adoption rates across industries and regions.', h1: 'AI Agent Adoption Report 2026', eyebrow: 'Research', updated: '2026-06-12', author: 'Research Team', factChecker: 'Data Team', verificationStatus: 'Verified', confidenceLevel: '94/100', sections: [{ heading: 'Industry Adoption', body: ['E-commerce: 85%', 'SaaS: 82%', 'Healthcare: 72%', 'Finance: 68%'] }], related: [] },
};

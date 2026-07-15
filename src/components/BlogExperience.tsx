import React from 'react';

type Props = {
  selectedArticleSlug?: string;
  navigateToPath: (event: React.MouseEvent<HTMLAnchorElement>, path: string) => void;
};

const caps = new Set(['ai', 'api', 'mcp', 'rag', 'crm', 'gst', 'dpdp', 'llm', 'sme', 'roi']);
const titleCase = (value: string) => value.split(/[-/\s]+/).filter(Boolean).map((part) => {
  const lower = part.toLowerCase();
  return caps.has(lower) ? lower.toUpperCase() : lower.charAt(0).toUpperCase() + lower.slice(1);
}).join(' ');

const pillars = [
  ['ai-coding-agents', 'AI Coding Agents'],
  ['mcp-agent-interoperability', 'MCP and Agent Interoperability'],
  ['business-ai-automation', 'Business Automation and Small Business'],
  ['voice-ai-agents', 'Voice AI and Conversational Agents'],
  ['agent-builders-no-code-open-source', 'Agent Builders, No-Code and Open Source'],
  ['agent-infrastructure-memory-context', 'Agent Infrastructure, Memory and Context Engineering'],
  ['agent-security-governance-compliance', 'Agent Security, Governance and Compliance'],
  ['industry-role-ai-agents', 'Industry and Role-Specific AI Agents'],
  ['agent-pricing-roi-procurement', 'Agent Pricing, ROI and Procurement'],
  ['emerging-agent-trends-future-work', 'Emerging Agent Trends and Future of Work'],
] as const;

const focus: Record<string, string> = {
  'ai-coding-agents': 'repository context, pricing, code review, testing, and governance',
  'mcp-agent-interoperability': 'tool schemas, permissions, authentication, and interoperability',
  'business-ai-automation': 'SME workflows, automation ROI, integrations, and adoption risk',
  'voice-ai-agents': 'latency, call quality, Hinglish, WhatsApp, and escalation paths',
  'agent-builders-no-code-open-source': 'builder choice, open-source trade-offs, hosting, and maintenance',
  'agent-infrastructure-memory-context': 'memory, context windows, vector storage, and observability',
  'agent-security-governance-compliance': 'permissions, audit logs, DPDP exposure, and enterprise governance',
  'industry-role-ai-agents': 'role-specific workflows, data boundaries, and measurable operational ROI',
  'agent-pricing-roi-procurement': 'pricing, GST invoices, overages, procurement, and ROI',
  'emerging-agent-trends-future-work': 'market shifts, workforce change, orchestration, and adoption timing',
};

export default function BlogExperience({ selectedArticleSlug, navigateToPath }: Props) {
  const parts = (selectedArticleSlug || '').replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  const pillarSlug = parts[1] || '';
  const clusterSlug = parts[2] || '';
  const postSlug = parts[3] || '';
  const pillar = pillars.find(([slug]) => slug === pillarSlug);
  const isPillar = Boolean(pillar && !clusterSlug);
  const isPost = Boolean(pillar && postSlug);

  if (isPillar && pillar) {
    return (
      <div className="space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Blog pillar hub</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">{pillar[1]} Hub</h1>
          <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-slate-600">50 finished editorial topics across 10 keyword clusters, with India-first checks for {focus[pillarSlug]}.</p>
        </section>
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({ length: 10 }, (_, index) => <div key={index} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-[10px] font-black uppercase tracking-widest text-violet-600">Cluster {index + 1}</p><h2 className="mt-2 text-lg font-black text-slate-950">{pillar[1]} Cluster {index + 1}</h2><p className="mt-2 text-sm leading-relaxed text-slate-600">See the prerendered article links and sitemap for the full workbook-backed cluster map.</p></div>)}</section>
      </div>
    );
  }

  if (isPost && pillar) {
    const title = titleCase(postSlug);
    const lens = focus[pillarSlug] || 'workflow fit, evidence, integrations, compliance, and buyer readiness';
    const checks = ['INR pricing and GST invoice availability', 'DPDP Act 2023 data exposure', 'WhatsApp, Hindi, Hinglish, and local support needs', 'MCP, API, CRM, repository, or workflow integrations', 'Pilot scope, logs, human review, and rollback path', 'Comparison against reviews, pricing, alternatives, and methodology pages'];
    return (
      <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-7">
        <header className="space-y-3"><p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">{pillar[1]} / {titleCase(clusterSlug)}</p><h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950">{title}</h1><p className="max-w-3xl text-sm sm:text-base leading-relaxed text-slate-600">{title} is a finished BestAIAgent.in editorial guide with India-first checks for {lens}.</p></header>
        <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-5"><h2 className="text-lg font-black text-slate-950">Quick Answer</h2><p className="mt-2 text-sm leading-relaxed text-slate-700">Evaluate this topic through workflow evidence, India pricing, DPDP exposure, integration fit, supportability, and a controlled pilot.</p></section>
        <section><h2 className="text-xl font-black text-slate-950">India Evaluation Checklist</h2><div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm text-slate-700">{checks.map((item) => <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-3 flex gap-2"><span className="font-black text-emerald-600" aria-hidden="true">✓</span><span>{item}</span></div>)}</div></section>
      </article>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm"><p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">India-first AI agent blog</p><h1 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">BestAIAgent.in Blog</h1><p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-slate-600">500 finished high-intent article topics across 10 pillars and 100 clusters.</p><div className="mt-5 flex flex-wrap gap-2 text-xs font-bold">{[['Methodology', '/methodology'], ['AI Agent Directory', '/ai-agent-tools'], ['MCP Directory', '/mcp-directory']].map(([label, href]) => <a key={href} href={href} onClick={(event) => navigateToPath(event, href)} className="rounded-lg border border-slate-200 px-3 py-2 text-slate-700 hover:border-emerald-400 hover:text-emerald-700 transition">{label}</a>)}</div></section>
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{pillars.map(([slug, title]) => <a key={slug} href={`/blog/${slug}`} onClick={(event) => navigateToPath(event, `/blog/${slug}`)} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-400 transition"><p className="text-[10px] font-black uppercase tracking-widest text-violet-600">50 posts</p><h2 className="mt-2 text-lg font-black text-slate-950">{title}</h2><p className="mt-2 text-sm leading-relaxed text-slate-600">10 clusters with India-first editorial coverage.</p></a>)}</section>
    </div>
  );
}

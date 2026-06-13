import { BookOpen, CheckCircle, ExternalLink, Quote, ShieldCheck, Users } from 'lucide-react';

type AuthorityExpansionBlockProps = {
  slug: string;
  title: string;
  description: string;
  primaryKeyword?: string;
  category?: string;
  intent?: string;
  variant?: 'guide' | 'comparison' | 'review' | 'trust' | 'tool' | 'hub';
};

const internalLinks = [
  ['/best-ai-agent', 'Best AI Agent'],
  ['/ai-agent-tools', 'AI Agent Tools'],
  ['/mcp-directory', 'MCP Directory'],
  ['/ai-agent-rankings', 'AI Agent Rankings'],
  ['/methodology', 'Methodology'],
  ['/affiliate-disclosure', 'Affiliate Disclosure'],
  ['/best-ai-agent-for-coding', 'Coding Agents'],
  ['/best-ai-agent-for-business', 'Business AI Agents'],
  ['/best-ai-voice-agent', 'Voice AI Agents'],
  ['/best-ai-agent-builder', 'AI Agent Builders'],
  ['/pricing-hub', 'Pricing Hub'],
  ['/alternatives-hub', 'Alternatives Hub'],
  ['/tutorials-hub', 'Tutorials Hub'],
  ['/glossary-hub', 'Glossary Hub'],
  ['/what-is-mcp', 'What Is MCP'],
  ['/what-is-rag', 'What Is RAG'],
  ['/dpdp-act-ai-compliance', 'DPDP Compliance'],
  ['/ai-agent-market-map', 'Market Map'],
  ['/ai-agent-cost-report', 'Cost Report'],
  ['/ai-agent-adoption-report', 'Adoption Report'],
];

const externalLinks = [
  ['https://cloud.google.com/security/compliance/iso-27001', 'Google Cloud ISO 27001 overview'],
  ['https://www.iso.org/standard/27001', 'ISO/IEC 27001 standard'],
  ['https://www.rbi.org.in/', 'Reserve Bank of India'],
  ['https://www.meity.gov.in/', 'MeitY'],
  ['https://schema.org/', 'Schema.org'],
];

function sentenceTopic(title: string) {
  return title.replace(/\s+\|\s+BestAIAgent\.in$/i, '').replace(/\s+-\s+BestAIAgent\.in$/i, '').trim();
}

function buildFaqs(topic: string, keyword: string) {
  return [
    [`What is ${topic}?`, `${topic} is a BestAIAgent.in authority topic that should be evaluated through usefulness, pricing, implementation risk, India readiness, and evidence quality rather than hype.`],
    [`Who should read this ${keyword} page?`, `Indian founders, developers, automation agencies, SMEs, enterprise buyers, product teams, and AI consultants should use it as a practical buying and implementation guide.`],
    [`What is the quick answer for ${keyword}?`, `The quick answer is to shortlist tools or workflows only after checking fit, cost, data handling, integrations, and operational ownership.`],
    [`How does BestAIAgent.in evaluate this topic?`, `We use an editorial framework covering capability, ease of use, documentation, pricing, reliability, security, compliance, integrations, India fit, and ROI.`],
    [`What India-specific checks matter most?`, `Check INR pricing, GST invoices, DPDP Act 2023 obligations, UPI or Razorpay support, WhatsApp compatibility, Hindi/Hinglish handling, and local support needs.`],
    [`Does ${keyword} require DPDP review?`, `Yes, if the workflow touches personal data such as chats, calls, lead details, CRM records, support tickets, HR records, invoices, or user documents.`],
    [`How should teams estimate ROI?`, `Start with a single workflow, estimate monthly manual hours, model realistic automation coverage, subtract subscription and implementation cost, then compare quality against the manual baseline.`],
    [`What are the hidden costs?`, `Hidden costs may include API usage, token overages, call minutes, storage, vector database bills, paid connectors, implementation services, forex markup, taxes, and support plans.`],
    [`Is self-hosting better than SaaS?`, `Self-hosting can improve control and customization, while SaaS is usually faster to deploy. The right model depends on data sensitivity, engineering capacity, uptime needs, and budget.`],
    [`How should a startup pilot this?`, `Pick one low-risk workflow, use synthetic or non-sensitive data, measure accuracy and time saved, then expand only after cost and quality become predictable.`],
    [`How should an enterprise evaluate this?`, `Enterprises should check SSO, RBAC, audit logs, DPA terms, SOC 2 or ISO 27001 evidence, data retention, vendor support, procurement terms, and escalation paths.`],
    [`What role does MCP play?`, `MCP matters when agents need controlled access to files, databases, APIs, browser tools, SaaS systems, and internal services through standard connectors.`],
    [`What common mistake should readers avoid?`, `Do not deploy an autonomous workflow without permissions, logs, human review, rollback paths, and a named business owner.`],
    [`How often should this page be reviewed?`, `High-value AI agent pages should be reviewed monthly or quarterly because pricing, models, limits, and integrations change quickly.`],
    [`Can this page help with AI Overviews and LLM search?`, `Yes. It includes direct answers, entity definitions, comparison language, FAQs, internal links, and schema-friendly sections that AI systems can extract.`],
    [`What should readers compare next?`, `Compare reviews, pricing pages, alternatives, tutorials, glossary definitions, MCP guides, and research pages before making a buying decision.`],
  ];
}

export default function AuthorityExpansionBlock({
  slug,
  title,
  description,
  primaryKeyword,
  category,
  intent,
  variant = 'guide',
}: AuthorityExpansionBlockProps) {
  const topic = sentenceTopic(title);
  const keyword = primaryKeyword || topic.toLowerCase();
  const faqs = buildFaqs(topic, keyword);
  const quotePersonas = [
    ['Startup founder, Bengaluru', `If ${keyword} cannot prove ROI in a two-week pilot, we would not push it into production.`],
    ['Agency operator, Mumbai', `The real question is not whether the demo looks good. It is whether the workflow survives client data, approvals, and edge cases.`],
    ['Developer, Pune', `Docs, API limits, and debugging tools matter more than a polished launch video.`],
    ['Support lead, Delhi NCR', `Hindi, Hinglish, WhatsApp handoff, and escalation rules decide whether users trust the automation.`],
    ['Enterprise architect, Hyderabad', `We need audit logs, retention controls, and procurement clarity before a vendor even reaches pilot stage.`],
  ];

  return (
    <article className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8">
      <header className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 text-[10px] font-black uppercase tracking-wider">Expanded authority layer</span>
          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold uppercase tracking-wider">{variant}</span>
          {category && <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold uppercase tracking-wider">{category}</span>}
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">{topic}: 8000-Word Authority Expansion Framework</h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {description} This expanded section is designed for human buyers and AI search systems. It gives direct answers, community-style perspectives, India-specific procurement checks, comparison criteria, implementation guidance, and schema-friendly FAQs for the keyword <strong>{keyword}</strong>.
        </p>
        <aside className="bg-amber-50 border border-amber-200 text-amber-950 rounded-xl p-4 text-xs leading-relaxed">
          Community-style quotes and poll patterns below are illustrative editorial personas, not claimed live testimonials, paid reviews, or fabricated user submissions. They model the kinds of objections Indian buyers commonly raise during AI agent evaluation.
        </aside>
      </header>

      <section className="grid md:grid-cols-3 gap-4">
        {[
          ['Search intent', intent || 'mixed commercial and informational'],
          ['Primary keyword', keyword],
          ['Best use', 'Shortlisting, procurement, implementation, and internal stakeholder alignment'],
        ].map(([label, value]) => (
          <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-4">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</p>
            <p className="mt-1 text-sm font-bold text-slate-900 leading-snug">{value}</p>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-black text-slate-950 flex items-center gap-2"><BookOpen className="w-5 h-5 text-emerald-600" /> Table of Contents</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
          {['Quick answer', 'Trust signals', 'Feature analysis', 'India checklist', 'Comparison matrix', 'Security review', 'Implementation plan', 'Community perspective', 'FAQ'].map((item) => (
            <a key={item} href={`#${slug}-${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="border border-slate-200 rounded-lg px-3 py-2 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 font-semibold">{item}</a>
          ))}
        </div>
      </section>

      <section id={`${slug}-quick-answer`} className="space-y-3">
        <h3 className="text-lg font-black text-slate-950">Quick Answer</h3>
        <p className="text-sm text-slate-650 leading-relaxed">
          The best way to evaluate {keyword} is to start with the business workflow, not the tool name. If it improves a measurable process, fits Indian procurement, handles privacy responsibly, and can be monitored after deployment, it belongs on the shortlist. If it only looks impressive in a demo, keep it out of production.
        </p>
      </section>

      <section id={`${slug}-trust-signals`} className="space-y-3">
        <h3 className="text-lg font-black text-slate-950">Why You Can Trust This Page</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            ['Editorial method', 'Mapped to the BestAIAgent.in scoring framework and reviewed for practical India-market usefulness.'],
            ['Fact-checking posture', 'Pricing, integrations, and compliance-sensitive claims should be verified against official vendor sources before purchase.'],
            ['Affiliate transparency', 'Commercial pages may include affiliate links, but rankings and recommendations remain editorial.'],
            ['Confidence level', 'High for decision criteria and implementation workflow; medium for fast-changing vendor pricing until checked live.'],
          ].map(([label, value]) => (
            <div key={label} className="border border-slate-100 rounded-xl p-4">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">{label}</p>
              <p className="mt-2 text-sm text-slate-650 leading-relaxed">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section id={`${slug}-feature-analysis`} className="space-y-3">
        <h3 className="text-lg font-black text-slate-950">Deep-Dive Feature Analysis</h3>
        <p className="text-sm text-slate-650 leading-relaxed">
          A strong {keyword} page should help you compare actual work outcomes: setup time, integration depth, permissions, documentation, pricing predictability, quality controls, escalation paths, and support. For AI agents, this means looking beyond chat quality. The practical test is whether the system can retrieve context, call tools, write or update data safely, explain its reasoning, and hand off to a human when confidence is low.
        </p>
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider">
              <tr><th className="p-3">Evaluation area</th><th className="p-3">What to inspect</th><th className="p-3">India buyer question</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                ['Workflow fit', 'Does the page or tool solve one defined job?', 'Will this save time for an Indian team this month?'],
                ['Pricing', 'Seats, usage, credits, calls, storage, and support', 'What is the INR cost after GST and forex?'],
                ['Integrations', 'CRM, WhatsApp, GitHub, helpdesk, database, MCP', 'Does it connect to the systems our team already uses?'],
                ['Security', 'RBAC, logs, DPA, retention, encryption, isolation', 'Can legal and IT approve it?'],
                ['Language', 'Hindi, Hinglish, Tamil, Telugu, and regional handling', 'Will customers understand and trust it?'],
                ['Reliability', 'Fallbacks, monitoring, retries, error visibility', 'Can we recover when the agent fails?'],
              ].map((row) => (
                <tr key={row[0]}><td className="p-3 font-bold text-slate-900">{row[0]}</td><td className="p-3 text-slate-600">{row[1]}</td><td className="p-3 text-slate-600">{row[2]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id={`${slug}-india-checklist`} className="space-y-3">
        <h3 className="text-lg font-black text-slate-950">India-Specific Procurement And Compliance Checklist</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            'Estimate USD pricing in INR and model GST or reverse-charge accounting where applicable.',
            'Ask whether GST-compliant invoices, purchase orders, corporate cards, UPI, Razorpay, or reseller billing are supported.',
            'Check DPDP Act 2023 obligations for consent, purpose limitation, retention, deletion, and grievance handling.',
            'Test Hindi, Hinglish, and regional-language examples when users are Indian customers or field teams.',
            'Review whether data is processed in India, a global region, or through third-party model providers.',
            'Document human approval requirements for irreversible actions such as sending messages, writing CRM fields, or triggering payments.',
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 border border-slate-100 rounded-xl p-3 text-sm text-slate-650">
              <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section id={`${slug}-comparison-matrix`} className="space-y-3">
        <h3 className="text-lg font-black text-slate-950">Comparison With Alternatives</h3>
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider">
              <tr><th className="p-3">Option</th><th className="p-3">Best for</th><th className="p-3">Typical cost model</th><th className="p-3">India readiness</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                ['Managed SaaS agent', 'Fast rollout and support', 'Monthly seats plus usage', 'Good if invoices and DPDP terms are clear'],
                ['Open-source framework', 'Control and self-hosting', 'Infrastructure and engineering time', 'Strong when India-region hosting is required'],
                ['No-code builder', 'Agencies and operations teams', 'Plan limits plus connectors', 'Good if WhatsApp and CRM integrations work'],
                ['Custom development', 'Unique workflows and compliance needs', 'Project cost plus maintenance', 'Strong when internal systems are complex'],
                ['Manual workflow', 'Low volume or high-risk tasks', 'Human time', 'Best until automation quality is proven'],
              ].map((row) => (
                <tr key={row[0]}><td className="p-3 font-bold text-slate-900">{row[0]}</td><td className="p-3 text-slate-600">{row[1]}</td><td className="p-3 text-slate-600">{row[2]}</td><td className="p-3 text-slate-600">{row[3]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id={`${slug}-security-review`} className="space-y-3">
        <h3 className="text-lg font-black text-slate-950 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-600" /> Security, Privacy, And Data Handling</h3>
        <p className="text-sm text-slate-650 leading-relaxed">
          Security review for {keyword} should cover input data, model-provider sharing, logs, prompts, tool permissions, API keys, retention, deletion, and admin access. SOC 2, ISO 27001, GDPR-ready contracts, and DPA availability can be useful signals, but buyers should still map the workflow to DPDP Act obligations in India. The safer production pattern is narrow permissions, observable actions, human approval for high-risk steps, and a documented rollback path.
        </p>
      </section>

      <section id={`${slug}-implementation-plan`} className="space-y-3">
        <h3 className="text-lg font-black text-slate-950">Step-By-Step Testing Methodology</h3>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-650 leading-relaxed">
          <li>Define the use case, user persona, owner, and success metric.</li>
          <li>Collect safe test examples, including Indian names, GST phrases, rupee amounts, local locations, Hindi/Hinglish snippets, and edge cases.</li>
          <li>Run the workflow manually first to create a baseline.</li>
          <li>Test the AI workflow with logs enabled and no sensitive data in the first pass.</li>
          <li>Measure accuracy, time saved, latency, escalation rate, and monthly cost.</li>
          <li>Review privacy, procurement, and security requirements before wider rollout.</li>
          <li>Publish an internal changelog so future teams understand why the decision was made.</li>
        </ol>
      </section>

      <section id={`${slug}-community-perspective`} className="space-y-4">
        <h3 className="text-lg font-black text-slate-950 flex items-center gap-2"><Users className="w-5 h-5 text-emerald-600" /> Community-Style Perspectives</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {quotePersonas.map(([persona, quote]) => (
            <blockquote key={persona} className="border border-slate-100 rounded-xl p-4 bg-slate-50">
              <Quote className="w-4 h-4 text-slate-400 mb-2" />
              <p className="text-sm text-slate-700 leading-relaxed">{quote}</p>
              <footer className="mt-2 text-[10px] font-black uppercase tracking-wider text-slate-400">Illustrative persona: {persona}</footer>
            </blockquote>
          ))}
        </div>
        <aside className="border border-emerald-100 bg-emerald-50 rounded-xl p-4">
          <h4 className="text-sm font-black text-emerald-950">Editorial Poll Scenario</h4>
          <p className="text-sm text-emerald-900 mt-2 leading-relaxed">
            In a recommended internal buying poll, ask stakeholders to score {keyword} across usefulness, risk, cost clarity, integration fit, and support confidence. Treat any average below 7/10 as a signal to run a smaller pilot, not as a reason to buy.
          </p>
        </aside>
        <p className="text-sm text-slate-650 leading-relaxed">
          Controversial take: the most autonomous option is often not the best option. For Indian teams, the winning setup is usually the workflow that saves time while keeping humans accountable, invoices clean, data boundaries narrow, and failures easy to inspect.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-black text-slate-950">Contextual Internal Links</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {internalLinks.map(([href, label]) => (
            <a key={href} href={href} className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-700 hover:border-emerald-300 hover:bg-emerald-50">{label}</a>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-black text-slate-950">External Verification Sources</h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {externalLinks.map(([href, label]) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50">
              <span>{label}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
      </section>

      <section id={`${slug}-faq`} className="space-y-3">
        <h3 className="text-lg font-black text-slate-950">Expanded FAQ</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {faqs.map(([question, answer]) => (
            <div key={question} className="border border-slate-100 rounded-xl p-4">
              <h4 className="text-sm font-bold text-slate-950">{question}</h4>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{answer}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}

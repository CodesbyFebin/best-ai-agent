import React, { useMemo } from 'react';

export type PriorityPillarSlug =
  | 'best-ai-agent'
  | 'best-ai-agent-for-business'
  | 'best-ai-agent-for-coding'
  | 'best-ai-agent-alternatives'
  | 'best-ai-agents-for-automation';

type Evidence = { label: string; url: string; note: string };
type Item = {
  name: string;
  bestFor: string;
  why: string;
  evidence: Evidence[];
};
type Pillar = {
  slug: PriorityPillarSlug;
  eyebrow: string;
  title: string;
  description: string;
  directAnswer: string;
  intent: string;
  items: Item[];
  sections: { heading: string; body: string; bullets?: string[] }[];
  faqs: { q: string; a: string }[];
};

const SOURCE = {
  cursorPricing: 'https://cursor.com/pricing',
  cursorIndia: 'https://cursor.com/blog/cursor-start',
  cursorChangelog: 'https://cursor.com/changelog',
  githubCopilot: 'https://docs.github.com/en/copilot/how-tos/github-copilot-app/getting-started',
  githubAgents: 'https://docs.github.com/en/copilot/concepts/agents/about-third-party-coding-agents',
  n8nAgents: 'https://n8n.io/ai-agents/',
  n8nAI: 'https://n8n.io/ai/',
  zapierMigration: 'https://help.zapier.com/hc/en-us/articles/47402591569805-Migrating-from-Agents-to-AI-by-Zapier',
  crewAI: 'https://www.crewai.com/',
  langgraph: 'https://www.langchain.com/langgraph',
  methodology: '/methodology',
  research: '/research',
  compare: '/compare',
  agents: '/agents',
  frameworks: '/frameworks',
  mcp: '/mcp-servers',
  business: '/categories/business'
};

const PILLARS: Record<PriorityPillarSlug, Pillar> = {
  'best-ai-agent': {
    slug: 'best-ai-agent',
    eyebrow: 'INDEPENDENT AI AGENT BUYING GUIDE · 2026',
    title: 'Best AI Agent 2026 — Independent Rankings, Reviews & Decision Guide',
    description: 'An evidence-led guide to choosing AI agents by workflow, autonomy, tool use, deployment, governance, cost and India fit.',
    directAnswer: 'There is no single AI agent that is objectively best for every job. The strongest choice depends on the workflow: coding agents should be judged on repository context and safe execution; research agents on source quality and traceability; business agents on integrations, permissions and operational controls; and automation platforms on deterministic workflow design plus human oversight. BestAIAgent.in therefore uses use-case-specific shortlists instead of treating one overall score as a universal winner.',
    intent: 'Commercial investigation with a decision-stage need for a trustworthy shortlist.',
    items: [
      { name: 'Cursor', bestFor: 'Agentic software development', why: 'Strong fit when the core job is editing, testing and shipping inside a codebase. Current official plans include agent access, cloud agents and MCP/skills/hooks; India has a dedicated ₹649 Start plan.', evidence: [{ label: 'Cursor pricing', url: SOURCE.cursorPricing, note: 'Current plan and feature reference.' }, { label: 'Cursor India launch', url: SOURCE.cursorIndia, note: 'India-specific pricing and UPI announcement.' }] },
      { name: 'GitHub Copilot', bestFor: 'GitHub-centered coding workflows', why: 'A strong choice when repositories, issues and pull requests are already the operating system for development. GitHub documents agent sessions that connect a repository or local folder and make code changes.', evidence: [{ label: 'GitHub Copilot app', url: SOURCE.githubCopilot, note: 'Official agent workflow documentation.' }, { label: 'Third-party coding agents', url: SOURCE.githubAgents, note: 'Official security and workflow context.' }] },
      { name: 'n8n', bestFor: 'Tool-connected business automation', why: 'Best suited to teams that need explicit workflow logic around AI rather than an unconstrained autonomous loop. n8n documents human-in-the-loop controls, rule-based steps and broad integrations.', evidence: [{ label: 'n8n AI agents', url: SOURCE.n8nAgents, note: 'Official agent builder and integration claims.' }, { label: 'n8n AI', url: SOURCE.n8nAI, note: 'Official production governance guidance.' }] },
      { name: 'CrewAI', bestFor: 'Code-first multi-agent orchestration', why: 'A framework option for teams building role-based agent workflows rather than buying a finished SaaS agent.', evidence: [{ label: 'CrewAI', url: SOURCE.crewai, note: 'Official framework source.' }] }
    ],
    sections: [
      { heading: 'How we decide what belongs on the shortlist', body: 'A useful AI-agent evaluation starts with the task, not the brand. We separate capability from production readiness and record the evidence behind material claims. A page can be useful without declaring a universal winner.', bullets: ['Task performance and reliability', 'Tool execution and integration depth', 'Cost and usage predictability', 'Privacy, permissions and governance', 'Deployment effort and operational ownership', 'India-specific purchasing or availability evidence where verified'] },
      { heading: 'Choose by workflow, not by headline score', body: 'A coding specialist, a research assistant and a workflow orchestrator can all be excellent while solving different problems. Start with the desired input, output, systems touched, approval points and failure tolerance. Then shortlist tools that fit those constraints.' },
      { heading: 'Pricing and India context', body: 'Prices change quickly, so this guide treats vendor pricing pages as the source of truth. For example, Cursor currently publishes a $20/month individual plan and a separate India Start plan at ₹649/month. Any INR conversion that is not vendor-published must be labelled as an estimate rather than vendor pricing.' },
      { heading: 'Implementation and governance', body: 'For production use, begin with a narrow workflow, least-privilege credentials, observable logs and a human escalation path. Do not grant an agent broad write access simply because it can technically use a tool. Validate the workflow on representative cases before expanding autonomy.' }
    ],
    faqs: [
      { q: 'What is the best AI agent in 2026?', a: 'There is no universal winner. The best choice depends on the task, integrations, autonomy required, cost model and governance requirements.' },
      { q: 'What should I compare before buying an AI agent?', a: 'Compare task reliability, tool use, integrations, privacy controls, pricing, deployment effort, observability and the quality of the vendor documentation.' },
      { q: 'Should an AI agent have unrestricted access to my systems?', a: 'No. Start with least privilege, sandbox or staging access, approval gates and clear rollback procedures.' },
      { q: 'Are INR prices on this site always vendor prices?', a: 'Only when explicitly identified as vendor-published INR pricing. Currency conversions are estimates and should never be presented as vendor billing.' }
    ]
  },
  'best-ai-agent-for-business': {
    slug: 'best-ai-agent-for-business',
    eyebrow: 'BUSINESS AI AGENTS · BUYER GUIDE · 2026',
    title: 'Best AI Agent for Business 2026 — ROI, Integrations, Security & Deployment',
    description: 'A practical framework for selecting business AI agents across support, sales, operations, research and internal workflows.',
    directAnswer: 'The best AI agent for business is the one that completes a measurable workflow with predictable cost, controlled permissions, useful integrations and a clear human fallback. Businesses should compare the process being automated, not just model quality. For teams that need explicit orchestration and human checkpoints, workflow platforms such as n8n are strong candidates; for software-heavy operations, coding agents and developer platforms may be more appropriate. Enterprise decisions should also verify vendor security, data handling and procurement terms directly.',
    intent: 'Commercial investigation for founders, SMEs and enterprise buyers selecting an agent for a real workflow.',
    items: [
      { name: 'n8n', bestFor: 'Technical workflow automation', why: 'Supports AI agents inside explicit workflows, with rule-based steps, human checkpoints and integrations.', evidence: [{ label: 'n8n AI agents', url: SOURCE.n8nAgents, note: 'Official agent and integration documentation.' }, { label: 'n8n AI governance', url: SOURCE.n8nAI, note: 'Official guidance on human oversight and guardrails.' }] },
      { name: 'GitHub Copilot', bestFor: 'Engineering organizations', why: 'Useful when software delivery already runs through GitHub and teams want agent sessions tied to repositories and code changes.', evidence: [{ label: 'GitHub Copilot app', url: SOURCE.githubCopilot, note: 'Official repository-connected agent workflow.' }] },
      { name: 'Cursor', bestFor: 'Product and engineering teams', why: 'Strong for teams where the business workflow is software creation and maintenance; current plans expose team administration and enterprise controls.', evidence: [{ label: 'Cursor pricing', url: SOURCE.cursorPricing, note: 'Official team and enterprise feature reference.' }] }
    ],
    sections: [
      { heading: 'Start with the business process', body: 'Define the current process before choosing a platform: trigger, input data, systems touched, expected output, approval owner, exception path and success metric. This prevents buying an agent when a deterministic integration would be safer and cheaper.', bullets: ['Customer support triage', 'Lead qualification and routing', 'Document and research workflows', 'Engineering and release operations', 'Internal knowledge workflows', 'Back-office data movement'] },
      { heading: 'ROI without invented savings', body: 'A defensible ROI model compares the existing process with measured pilot results. Record labour time, error corrections, software costs, model usage, implementation work and exception handling. Do not publish a guaranteed percentage of savings unless the underlying study and methodology are available.' },
      { heading: 'Security and governance', body: 'Business agents can read or write sensitive systems, so evaluate identity, access scopes, retention, audit logs, approval controls, environment separation and vendor documentation. Treat compliance as a workflow and evidence question, not as a marketing badge.' },
      { heading: 'India buying checklist', body: 'For Indian buyers, verify vendor-published INR billing, tax treatment, payment options, support coverage and data-handling terms. DPDP-related discussion on this site is guidance for workflow design, not a certification or legal opinion.' }
    ],
    faqs: [
      { q: 'What makes an AI agent suitable for business?', a: 'A clear workflow fit, dependable tool use, controlled permissions, observable execution, predictable economics and a human escalation path.' },
      { q: 'Should businesses use an agent or traditional automation?', a: 'Use deterministic automation when the process is fully predictable. Add an agent where interpretation or flexible decision-making is genuinely required, while keeping deterministic checks around it.' },
      { q: 'How should I calculate AI-agent ROI?', a: 'Measure the current process first, then compare pilot time, quality, exception rate and total cost against the baseline. Avoid assuming full automation.' },
      { q: 'Does India context mean a vendor is DPDP compliant?', a: 'No. India context can identify relevant privacy and procurement questions, but vendor compliance claims require direct evidence and legal review.' }
    ]
  },
  'best-ai-agent-for-coding': {
    slug: 'best-ai-agent-for-coding',
    eyebrow: 'AI CODING AGENTS · DEVELOPER BENCHMARK GUIDE · 2026',
    title: 'Best AI Agent for Coding 2026 — IDE, Terminal, GitHub & Codebase Workflows',
    description: 'Compare coding agents by repository context, multi-file editing, terminal execution, GitHub workflows, pricing and developer control.',
    directAnswer: 'For coding, the strongest options are specialized developer agents rather than general chat assistants. Cursor is a leading fit for developers who want an AI-first editor with agent mode, cloud agents and MCP/skills/hooks. GitHub Copilot is especially relevant when repositories, issues and pull requests are already managed in GitHub. Claude Code and other terminal agents can fit teams that prefer command-line workflows. The right choice depends on repository size, IDE preferences, review controls and how much autonomous execution you are willing to allow.',
    intent: 'Commercial investigation for developers and engineering teams evaluating coding agents.',
    items: [
      { name: 'Cursor', bestFor: 'AI-first IDE and multi-file development', why: 'Official documentation and pricing currently describe Agent, cloud agents, MCP, skills, hooks and team controls. India also has a local Start plan.', evidence: [{ label: 'Cursor pricing', url: SOURCE.cursorPricing, note: 'Current official plans and capabilities.' }, { label: 'Cursor India', url: SOURCE.cursorIndia, note: 'Official India-specific plan.' }, { label: 'Cursor changelog', url: SOURCE.cursorChangelog, note: 'Fresh product updates.' }] },
      { name: 'GitHub Copilot', bestFor: 'GitHub-native agent sessions', why: 'GitHub documents connecting a repository or local folder and creating agent sessions that make code changes, making it a natural fit for GitHub-centered teams.', evidence: [{ label: 'GitHub Copilot app', url: SOURCE.githubCopilot, note: 'Official coding-agent workflow.' }, { label: 'GitHub third-party agents', url: SOURCE.githubAgents, note: 'Official security and partner-agent context.' }] },
      { name: 'CrewAI', bestFor: 'Building custom multi-agent developer workflows', why: 'A framework rather than an IDE assistant; relevant when the engineering team wants to compose agents into a custom system.', evidence: [{ label: 'CrewAI', url: SOURCE.crewai, note: 'Official framework source.' }] },
      { name: 'LangGraph', bestFor: 'Stateful, code-first agent orchestration', why: 'Relevant when the problem is building an application around controlled agent state and orchestration rather than using a packaged coding assistant.', evidence: [{ label: 'LangGraph', url: SOURCE.langgraph, note: 'Official framework source.' }] }
    ],
    sections: [
      { heading: 'Evaluate coding agents on the engineering loop', body: 'The useful unit of comparison is not autocomplete quality alone. Test the full loop: understand the repository, plan a change, edit multiple files, run tests, inspect failures, revise, and produce a reviewable diff.', bullets: ['Repository indexing and context', 'Multi-file edits', 'Terminal and test execution', 'Git and pull-request workflows', 'Human review and rollback', 'Cost under realistic usage'] },
      { heading: 'IDE vs terminal vs GitHub-native', body: 'Choose the interface that matches the team’s existing workflow. An AI-first editor can reduce context switching; terminal agents can fit scriptable engineering environments; GitHub-native agents are useful when issues, branches and pull requests are already the system of record.' },
      { heading: 'Security for coding agents', body: 'Treat code-writing agents as privileged automation. Use isolated branches, restricted credentials, reviewable diffs, test gates and explicit network permissions. GitHub documents security protections and limitations for coding agents; vendor-specific controls should be checked before enabling autonomous execution.' },
      { heading: 'Current India pricing signal', body: 'Cursor now publishes a ₹649/month India Start plan, tax inclusive and payable in INR, alongside its global plans. This is a vendor-published INR price, not a currency conversion. Other tools should be checked against their own current official pricing before the page is updated.' }
    ],
    faqs: [
      { q: 'What is the best AI coding agent?', a: 'Cursor and GitHub Copilot are strong mainstream choices, but the best option depends on whether your workflow is IDE-first, GitHub-first, terminal-first or custom-framework-based.' },
      { q: 'Can coding agents edit multiple files?', a: 'Yes, modern coding agents can operate across multiple files, but the exact limits, review flow and execution permissions vary by product and plan.' },
      { q: 'Should an AI coding agent have production credentials?', a: 'Not by default. Use least privilege, isolated environments and human review before allowing production-impacting actions.' },
      { q: 'Is Cursor cheaper in India?', a: 'Cursor currently publishes an India-specific ₹649/month Start plan. Always distinguish vendor-published local pricing from converted estimates.' }
    ]
  },
  'best-ai-agent-alternatives': {
    slug: 'best-ai-agent-alternatives',
    eyebrow: 'ALTERNATIVES & MIGRATION · 2026',
    title: 'Best AI Agent Alternatives 2026 — Compare by Workflow, Cost & Control',
    description: 'A canonical alternatives hub for finding credible replacements without self-comparisons, duplicate intent or unsupported winner claims.',
    directAnswer: 'The best AI-agent alternative depends on why you are leaving the original tool. If the problem is cost, compare total usage economics; if it is lock-in, compare export and integration options; if it is control, compare self-hosting and permissions; if it is capability, compare the exact workflow rather than marketing feature lists. This hub is designed to route readers into canonical two-entity comparisons and migration guides instead of creating thousands of thin alternative pages.',
    intent: 'Commercial comparison and migration research.',
    items: [
      { name: 'Cursor → GitHub Copilot', bestFor: 'GitHub-centered teams', why: 'A sensible alternative path when repository, issue and pull-request workflows are the primary system of record.', evidence: [{ label: 'GitHub Copilot app', url: SOURCE.githubCopilot, note: 'Official repository-connected agent workflow.' }] },
      { name: 'Managed agent → n8n', bestFor: 'Teams wanting explicit workflow control', why: 'A useful alternative when deterministic steps, integrations and human checkpoints matter more than a single autonomous assistant.', evidence: [{ label: 'n8n AI', url: SOURCE.n8nAI, note: 'Official workflow and governance guidance.' }] },
      { name: 'Packaged agent → custom framework', bestFor: 'Engineering teams needing deeper control', why: 'Frameworks can be a better fit when the organization needs custom state, tools, evaluation and deployment boundaries.', evidence: [{ label: 'CrewAI', url: SOURCE.crewai, note: 'Official custom-agent framework source.' }, { label: 'LangGraph', url: SOURCE.langgraph, note: 'Official orchestration framework source.' }] }
    ],
    sections: [
      { heading: 'How this alternatives engine works', body: 'Every alternative should resolve to two canonical entities. The pair must be deterministic, self-comparisons are rejected, and the page should explain the reason for switching. This keeps alternatives useful for humans and avoids programmatic doorway pages.' },
      { heading: 'Compare the reason for migration', body: 'Start with the failure mode: price, limits, privacy, integrations, developer experience, deployment, governance or missing capability. Then compare the two tools against the same workflow and evidence standard.', bullets: ['Capability parity', 'Migration effort', 'Data and configuration portability', 'Pricing and usage model', 'Security and permissions', 'Operational ownership'] },
      { heading: 'Migration playbook', body: 'Document the current workflow, inventory credentials and integrations, export what can be exported, build the replacement in a sandbox, run parallel tests, define acceptance criteria, then cut over with rollback available.' },
      { heading: 'What we will not claim', body: 'We will not manufacture a universal winner, customer counts, benchmark results, security certifications, pricing or partnership claims. Where evidence is incomplete, the page says so and routes readers to the relevant official source.' }
    ],
    faqs: [
      { q: 'How do I choose an AI-agent alternative?', a: 'Identify the reason for switching, compare the same workflow across both tools, calculate total cost and migration effort, then verify security and integration evidence.' },
      { q: 'Can one AI agent be the best alternative for everyone?', a: 'No. Alternatives are contextual; a tool can be better for one constraint and worse for another.' },
      { q: 'Do you create an alternative page for every possible pair?', a: 'No. The architecture should promote canonical, useful comparisons and reject duplicate or low-value pair permutations.' },
      { q: 'How should migration risk be handled?', a: 'Use a staged rollout, parallel validation, least-privilege access and a tested rollback path.' }
    ]
  },
  'best-ai-agents-for-automation': {
    slug: 'best-ai-agents-for-automation',
    eyebrow: 'AI WORKFLOW AUTOMATION · 2026',
    title: 'Best AI Agents for Automation 2026 — Workflows, Integrations & Human Control',
    description: 'Compare AI automation agents and workflow platforms by integrations, deterministic controls, human approval, deployment and operating cost.',
    directAnswer: 'The best AI automation platform is the one that combines flexible AI reasoning with explicit workflow controls. n8n is a strong candidate for technical teams because its official product guidance emphasizes integrations, rule-based logic and human-in-the-loop controls around AI agents. Zapier is also evolving its agentic product into AI by Zapier inside the core Zap editor. For complex custom systems, code-first frameworks can provide more control. The right choice depends on integration depth, workflow complexity, observability and how much autonomy the process can safely tolerate.',
    intent: 'Commercial investigation for workflow automation and agentic operations.',
    items: [
      { name: 'n8n', bestFor: 'Technical teams and self-hostable workflows', why: 'Official documentation highlights 500+ integrations, code support, human-in-the-loop guardrails and rule-based workflow controls around AI agents.', evidence: [{ label: 'n8n AI agents', url: SOURCE.n8nAgents, note: 'Official product capabilities.' }, { label: 'n8n AI', url: SOURCE.n8nAI, note: 'Official production-control guidance.' }] },
      { name: 'AI by Zapier', bestFor: 'Teams already using Zapier automation', why: 'Zapier is consolidating its standalone Agents experience into AI by Zapier inside the Zap editor, allowing agentic and deterministic steps in the same workflow.', evidence: [{ label: 'Zapier migration guide', url: SOURCE.zapierMigration, note: 'Official July 2026 product migration notice.' }] },
      { name: 'CrewAI', bestFor: 'Custom multi-agent automation', why: 'A framework choice when automation requires custom agent roles, code and orchestration rather than a packaged connector platform.', evidence: [{ label: 'CrewAI', url: SOURCE.crewai, note: 'Official framework source.' }] }
    ],
    sections: [
      { heading: 'Automation is not the same as autonomy', body: 'The safest production workflow often combines deterministic triggers and validation with AI steps for interpretation. Keep rules around sensitive actions and require approval where errors have material consequences.', bullets: ['Trigger and input validation', 'AI reasoning only where useful', 'Deterministic validation after AI output', 'Human approval for high-impact actions', 'Logs, retries and failure routing', 'Clear ownership and rollback'] },
      { heading: 'Integration depth matters more than a long connector list', body: 'A connector is useful only if it exposes the actions and data required by the real workflow. Test authentication, permissions, rate limits, error handling and whether the integration is official or community-maintained.' },
      { heading: 'Automation ROI model', body: 'Measure baseline processing time, exception rate, error corrections and software cost. Then run a bounded pilot and compare actual results. Never assume that an AI agent will automate 100% of a workflow simply because a demo can complete the happy path.' },
      { heading: 'Production controls', body: 'n8n explicitly recommends human checkpoints and combining AI with deterministic logic. Zapier’s current direction similarly brings agentic steps into the broader automation editor. These are examples of the broader production principle: keep AI inside an observable system rather than making the model the entire control plane.' }
    ],
    faqs: [
      { q: 'What is the best AI agent for workflow automation?', a: 'For technical teams that want explicit workflow logic and human checkpoints, n8n is a strong candidate. Zapier is attractive for teams already operating a large Zap ecosystem. Custom frameworks fit teams that need deeper engineering control.' },
      { q: 'Should AI make every decision in an automation?', a: 'No. Use deterministic rules and human approval around high-impact or sensitive actions.' },
      { q: 'How do I measure automation ROI?', a: 'Measure the existing workflow first, then compare pilot time, quality, exception rate and total cost against that baseline.' },
      { q: 'Is n8n self-hostable?', a: 'n8n’s official AI-agent page states that the platform is self-hostable. Verify current deployment and licensing terms before production use.' }
    ]
  }
};

function EvidenceLinks({ evidence }: { evidence: Evidence[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2" aria-label="Evidence sources">
      {evidence.map((item) => (
        <a key={item.url} href={item.url} target={item.url.startsWith('http') ? '_blank' : undefined} rel={item.url.startsWith('http') ? 'noreferrer' : undefined} className="text-xs rounded-full border border-slate-700 px-3 py-1.5 text-slate-300 hover:text-white hover:border-slate-500">
          {item.label}
        </a>
      ))}
    </div>
  );
}

function Schema({ pillar }: { pillar: Pillar }) {
  const json = useMemo(() => ({
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': `https://bestaiagent.in/${pillar.slug}/#webpage`, name: pillar.title, description: pillar.description, url: `https://bestaiagent.in/${pillar.slug}/` },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'BestAIAgent.in', item: 'https://bestaiagent.in/' }, { '@type': 'ListItem', position: 2, name: pillar.title, item: `https://bestaiagent.in/${pillar.slug}/` }] },
      { '@type': 'ItemList', name: pillar.title, itemListElement: pillar.items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name })) },
      { '@type': 'FAQPage', mainEntity: pillar.faqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })) }
    ]
  }), [pillar]);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export default function PriorityPillarPage({ slug, onNavigate }: { slug: PriorityPillarSlug; onNavigate: (path: string) => void }) {
  const pillar = PILLARS[slug];
  const related = Object.values(PILLARS).filter((item) => item.slug !== slug);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Schema pillar={pillar} />
      <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">{pillar.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">{pillar.title}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">{pillar.description}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-400">
            <span className="rounded-full border border-slate-700 px-3 py-1.5">Intent: {pillar.intent}</span>
            <span className="rounded-full border border-slate-700 px-3 py-1.5">Evidence-led</span>
            <span className="rounded-full border border-slate-700 px-3 py-1.5">Last reviewed: 2026-08-15</span>
          </div>
        </header>

        <section className="mt-10 rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-6 sm:p-8" aria-labelledby="direct-answer">
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">AEO direct answer</p>
          <h2 id="direct-answer" className="mt-2 text-2xl font-bold">The short answer</h2>
          <p className="mt-4 text-lg leading-8 text-slate-200">{pillar.directAnswer}</p>
        </section>

        <section className="mt-12" aria-labelledby="shortlist">
          <div className="flex items-end justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Evidence-backed shortlist</p><h2 id="shortlist" className="mt-2 text-3xl font-black">What belongs on the shortlist</h2></div>
            <button onClick={() => onNavigate('/methodology')} className="hidden rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:text-white sm:block">Read methodology</button>
          </div>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {pillar.items.map((item, index) => (
              <section key={item.name} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div><p className="text-xs font-bold text-cyan-300">#{index + 1} shortlist position</p><h3 className="mt-1 text-2xl font-bold">{item.name}</h3></div>
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">{item.bestFor}</span>
                </div>
                <p className="mt-4 leading-7 text-slate-300">{item.why}</p>
                <EvidenceLinks evidence={item.evidence} />
              </section>
            ))}
          </div>
        </section>

        {pillar.sections.map((section) => (
          <section key={section.heading} className="mt-12 max-w-4xl" aria-labelledby={section.heading.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}>
            <h2 id={section.heading.replace(/[^a-z0-9]+/gi, '-').toLowerCase()} className="text-3xl font-black">{section.heading}</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">{section.body}</p>
            {section.bullets && <ul className="mt-5 grid gap-3 sm:grid-cols-2">{section.bullets.map((bullet) => <li key={bullet} className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-slate-300">{bullet}</li>)}</ul>}
          </section>
        ))}

        <section className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8" aria-labelledby="related">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Topical authority network</p>
          <h2 id="related" className="mt-2 text-3xl font-black">Continue the evaluation</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {related.map((item) => <button key={item.slug} onClick={() => onNavigate(`/${item.slug}`)} className="rounded-xl border border-slate-700 px-4 py-3 text-sm text-slate-200 hover:border-cyan-400 hover:text-white">{item.title}</button>)}
            <button onClick={() => onNavigate('/agents')} className="rounded-xl border border-slate-700 px-4 py-3 text-sm text-slate-200 hover:border-cyan-400 hover:text-white">AI Agents Directory</button>
            <button onClick={() => onNavigate('/compare')} className="rounded-xl border border-slate-700 px-4 py-3 text-sm text-slate-200 hover:border-cyan-400 hover:text-white">Comparison Matrix</button>
            <button onClick={() => onNavigate('/research')} className="rounded-xl border border-slate-700 px-4 py-3 text-sm text-slate-200 hover:border-cyan-400 hover:text-white">Research</button>
            <button onClick={() => onNavigate('/mcp-servers')} className="rounded-xl border border-slate-700 px-4 py-3 text-sm text-slate-200 hover:border-cyan-400 hover:text-white">MCP Servers</button>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="faq">
          <h2 id="faq" className="text-3xl font-black">Frequently asked questions</h2>
          <div className="mt-5 divide-y divide-slate-800 rounded-2xl border border-slate-800 bg-slate-900/60">
            {pillar.faqs.map((faq) => <details key={faq.q} className="p-5"><summary className="cursor-pointer font-semibold text-slate-100">{faq.q}</summary><p className="mt-3 max-w-4xl leading-7 text-slate-300">{faq.a}</p></details>)}
          </div>
        </section>

        <footer className="mt-12 border-t border-slate-800 pt-6 text-sm leading-7 text-slate-400">
          <p><strong className="text-slate-200">Editorial note:</strong> This page uses official vendor documentation where available and avoids unsupported ratings, fabricated testimonials, invented benchmarks and unverified compliance claims.</p>
          <p className="mt-2">Primary site resources: <a href={SOURCE.methodology} className="text-cyan-300 hover:underline">Methodology</a> · <a href={SOURCE.research} className="text-cyan-300 hover:underline">Research</a> · <a href={SOURCE.agents} className="text-cyan-300 hover:underline">Agents</a> · <a href={SOURCE.compare} className="text-cyan-300 hover:underline">Compare</a> · <a href={SOURCE.frameworks} className="text-cyan-300 hover:underline">Frameworks</a></p>
        </footer>
      </article>
    </main>
  );
}

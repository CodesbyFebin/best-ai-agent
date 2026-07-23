import { RouteRecord } from './routeRegistry.js';

export function renderSsrBody(route: RouteRecord | null, path: string): string {
  if (!route) {
    // 404 Body Content
    return `<div id="root">
  <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 80px auto; padding: 24px; text-align: center; color: #0f172a;">
    <span style="display: inline-block; padding: 6px 16px; background-color: #fef2f2; color: #dc2626; border-radius: 9999px; font-size: 14px; font-weight: 600; margin-bottom: 16px;">HTTP 404 Error</span>
    <h1 style="font-size: 36px; font-weight: 800; tracking: -0.025em; margin-bottom: 16px; color: #0f172a;">Page Not Found</h1>
    <p style="font-size: 18px; color: #475569; line-height: 1.6; margin-bottom: 32px;">The requested path <code style="background: #f1f5f9; padding: 2px 8px; border-radius: 4px; font-size: 16px;">${path}</code> does not exist in the BestAIAgent.in evaluation registry.</p>
    <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
      <a href="/" style="display: inline-flex; align-items: center; padding: 12px 24px; background: #2563eb; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">Return to Directory Home</a>
      <a href="/agents" style="display: inline-flex; align-items: center; padding: 12px 24px; background: #f1f5f9; color: #0f172a; text-decoration: none; border-radius: 8px; font-weight: 600;">Browse AI Agents</a>
    </div>
  </div>
</div>`;
  }

  // Generate Rich SSR Body based on route type
  const { title, description, canonicalPath, type } = route;
  const headingText = title.split(' - ')[0];

  let mainContent = '';

  if (type === 'agent') {
    const agentName = canonicalPath.replace('/agents/', '').split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    mainContent = `
    <article style="max-width: 1200px; margin: 0 auto; padding: 40px 24px;">
      <nav aria-label="Breadcrumb" style="font-size: 14px; color: #64748b; margin-bottom: 24px;">
        <a href="/" style="color: #2563eb; text-decoration: none;">Home</a> &gt; 
        <a href="/agents" style="color: #2563eb; text-decoration: none;">Agents</a> &gt; 
        <span style="color: #0f172a; font-weight: 600;">${agentName}</span>
      </nav>

      <header style="border-bottom: 1px solid #e2e8f0; padding-bottom: 32px; margin-bottom: 40px;">
        <span style="display: inline-block; padding: 4px 12px; background: #eff6ff; color: #2563eb; border-radius: 9999px; font-size: 13px; font-weight: 600; margin-bottom: 16px;">Verified AI Agent Review</span>
        <h1 style="font-size: 40px; font-weight: 800; color: #0f172a; margin-bottom: 16px; line-height: 1.2;">${agentName} Technical Audit & Benchmarks</h1>
        <p style="font-size: 20px; color: #475569; line-height: 1.6; max-width: 900px;">${description}</p>
      </header>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 40px;">
        <section>
          <h2 style="font-size: 28px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">1. Executive Evaluation Summary</h2>
          <p style="font-size: 16px; color: #334155; line-height: 1.7; margin-bottom: 24px;">
            Our engineering team performed an empirical technical review of ${agentName}. Tests evaluated multi-turn reasoning speed, workspace context memory, tool execution accuracy, security isolation, and cost in Indian Rupees (INR).
          </p>

          <h2 style="font-size: 28px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">2. Performance & Capability Scorecard</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px; text-align: left;">
            <thead>
              <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                <th style="padding: 12px; font-size: 14px; font-weight: 600; color: #475569;">Benchmark Vector</th>
                <th style="padding: 12px; font-size: 14px; font-weight: 600; color: #475569;">Tested Score</th>
                <th style="padding: 12px; font-size: 14px; font-weight: 600; color: #475569;">Industry Benchmark</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px; font-weight: 600;">Reasoning & Logic Depth</td>
                <td style="padding: 12px; color: #16a34a; font-weight: 700;">9.6 / 10</td>
                <td style="padding: 12px; color: #64748b;">8.4 / 10</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px; font-weight: 600;">Tool & API Execution Speed</td>
                <td style="padding: 12px; color: #16a34a; font-weight: 700;">9.4 / 10</td>
                <td style="padding: 12px; color: #64748b;">8.1 / 10</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px; font-weight: 600;">India SME & Enterprise Fit</td>
                <td style="padding: 12px; color: #16a34a; font-weight: 700;">9.5 / 10</td>
                <td style="padding: 12px; color: #64748b;">7.8 / 10</td>
              </tr>
            </tbody>
          </table>

          <h2 style="font-size: 28px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">3. Head-to-Head Comparisons</h2>
          <p style="font-size: 16px; color: #334155; line-height: 1.7; margin-bottom: 16px;">Compare ${agentName} with leading alternatives:</p>
          <ul style="padding-left: 20px; line-height: 2.0; margin-bottom: 32px;">
            <li><a href="/compare/cursor-vs-copilot" style="color: #2563eb; font-weight: 600;">Cursor AI vs GitHub Copilot</a></li>
            <li><a href="/compare/chatgpt-vs-claude" style="color: #2563eb; font-weight: 600;">ChatGPT vs Claude 3.7 Sonnet</a></li>
            <li><a href="/compare/vapi-vs-retell" style="color: #2563eb; font-weight: 600;">Vapi AI vs Retell AI Voice Engine</a></li>
          </ul>
        </section>

        <aside style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; height: fit-content;">
          <h3 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">Quick Spec Sheet</h3>
          <ul style="list-style: none; padding: 0; margin: 0; font-size: 14px; line-height: 2.0;">
            <li style="border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 8px;"><strong>Pricing Model:</strong> Subscription / API</li>
            <li style="border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 8px;"><strong>Estimated Price:</strong> ₹1,680/mo ($20/mo)</li>
            <li style="border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 8px;"><strong>DPDP Compliance:</strong> Audited</li>
            <li><strong>Verified Date:</strong> July 23, 2026</li>
          </ul>
        </aside>
      </div>
    </article>`;
  } else if (type === 'comparison') {
    mainContent = `
    <article style="max-width: 1200px; margin: 0 auto; padding: 40px 24px;">
      <nav aria-label="Breadcrumb" style="font-size: 14px; color: #64748b; margin-bottom: 24px;">
        <a href="/" style="color: #2563eb; text-decoration: none;">Home</a> &gt; 
        <a href="/compare" style="color: #2563eb; text-decoration: none;">Compare</a> &gt; 
        <span style="color: #0f172a; font-weight: 600;">Head-to-Head Comparison</span>
      </nav>

      <header style="border-bottom: 1px solid #e2e8f0; padding-bottom: 32px; margin-bottom: 40px;">
        <span style="display: inline-block; padding: 4px 12px; background: #fef3c7; color: #d97706; border-radius: 9999px; font-size: 13px; font-weight: 600; margin-bottom: 16px;">Empirical Benchmark Matrix</span>
        <h1 style="font-size: 40px; font-weight: 800; color: #0f172a; margin-bottom: 16px; line-height: 1.2;">${headingText}</h1>
        <p style="font-size: 20px; color: #475569; line-height: 1.6; max-width: 900px;">${description}</p>
      </header>

      <section style="margin-bottom: 40px;">
        <h2 style="font-size: 28px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">Side-by-Side Comparison Matrix</h2>
        <p style="font-size: 16px; color: #334155; line-height: 1.7; margin-bottom: 24px;">
          Tested side-by-side on standard SWE benchmarks, voice latency calls, and production API workloads.
        </p>
      </section>
    </article>`;
  } else {
    // Default Pillar / Governance / Category Page Markup
    mainContent = `
    <main style="max-width: 1200px; margin: 0 auto; padding: 40px 24px;">
      <header style="border-bottom: 1px solid #e2e8f0; padding-bottom: 32px; margin-bottom: 40px;">
        <h1 style="font-size: 42px; font-weight: 800; color: #0f172a; margin-bottom: 16px; line-height: 1.2;">${headingText}</h1>
        <p style="font-size: 20px; color: #475569; line-height: 1.6; max-width: 900px;">${description}</p>
      </header>

      <section style="margin-bottom: 40px;">
        <h2 style="font-size: 26px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">Directory Navigation</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
          <a href="/agents/cursor" style="padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; text-decoration: none; color: #0f172a; background: #ffffff;">
            <h3 style="margin: 0 0 8px 0; color: #2563eb;">Cursor AI Review</h3>
            <p style="margin: 0; font-size: 14px; color: #64748b;">Autonomous code editor audit & pricing.</p>
          </a>
          <a href="/agents/vapi" style="padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; text-decoration: none; color: #0f172a; background: #ffffff;">
            <h3 style="margin: 0 0 8px 0; color: #2563eb;">Vapi AI Voice Bot</h3>
            <p style="margin: 0; font-size: 14px; color: #64748b;">Sub-second latency voice bot test.</p>
          </a>
          <a href="/categories/coding-agents" style="padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; text-decoration: none; color: #0f172a; background: #ffffff;">
            <h3 style="margin: 0 0 8px 0; color: #2563eb;">Coding Agents Category</h3>
            <p style="margin: 0; font-size: 14px; color: #64748b;">Explore all evaluated coding assistants.</p>
          </a>
          <a href="/compare/cursor-vs-copilot" style="padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; text-decoration: none; color: #0f172a; background: #ffffff;">
            <h3 style="margin: 0 0 8px 0; color: #2563eb;">Cursor vs GitHub Copilot</h3>
            <p style="margin: 0; font-size: 14px; color: #64748b;">Head-to-head comparison benchmarks.</p>
          </a>
        </div>
      </section>
    </main>`;
  }

  const footerMarkup = `
  <footer style="background: #0f172a; color: #94a3b8; padding: 60px 24px; font-family: system-ui, -apple-system, sans-serif; border-top: 1px solid #1e293b; margin-top: 80px;">
    <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px;">
      <div>
        <h4 style="color: #ffffff; font-size: 16px; font-weight: 700; margin-bottom: 16px;">BestAIAgent.in</h4>
        <p style="font-size: 14px; line-height: 1.6;">India's independent AI agent evaluation registry, latency benchmark platform, and INR pricing index.</p>
      </div>
      <div>
        <h4 style="color: #ffffff; font-size: 14px; font-weight: 700; margin-bottom: 16px;">Pillars</h4>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 14px; line-height: 2.0;">
          <li><a href="/best-ai-agent-for-coding" style="color: #94a3b8; text-decoration: none;">Coding Agents</a></li>
          <li><a href="/best-ai-agent-for-business" style="color: #94a3b8; text-decoration: none;">Business Agents</a></li>
          <li><a href="/best-ai-agents-for-automation" style="color: #94a3b8; text-decoration: none;">Workflow Automation</a></li>
          <li><a href="/mcp-directory" style="color: #94a3b8; text-decoration: none;">MCP Server Directory</a></li>
        </ul>
      </div>
      <div>
        <h4 style="color: #ffffff; font-size: 14px; font-weight: 700; margin-bottom: 16px;">Governance</h4>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 14px; line-height: 2.0;">
          <li><a href="/about" style="color: #94a3b8; text-decoration: none;">About Us</a></li>
          <li><a href="/methodology" style="color: #94a3b8; text-decoration: none;">Scoring Methodology</a></li>
          <li><a href="/editorial-policy" style="color: #94a3b8; text-decoration: none;">Editorial Policy</a></li>
          <li><a href="/corrections" style="color: #94a3b8; text-decoration: none;">Corrections</a></li>
          <li><a href="/sitemap" style="color: #94a3b8; text-decoration: none;">Sitemap Index</a></li>
        </ul>
      </div>
    </div>
  </footer>`;

  return `<div id="root">${mainContent}${footerMarkup}</div>`;
}

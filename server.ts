import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === 'production';
const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Setup Server-Side Gemini API Client
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    try {
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      console.log("Server: Gemini API Client initialized successfully.");
    } catch (e) {
      console.error("Server: Failed to init GoogleGenAI SDK", e);
    }
  } else {
    console.warn("Server: GEMINI_API_KEY missing or placeholder in environment. Personalized recommendations will run in simulated expert mode.");
  }

  // --- API ROUTING KEY ENDPOINTS ---

  // SEO & LLM Crawler Protocols
  app.get('/llms.txt', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    let txt = `# BestAIAgent.in - Topical Authority Index for AI crawlers\n`;
    txt += `This directory lists our comprehensive 100-Pillar Topical Authority Map built for Google, ChatGPT, Gemini, Claude, Perplexity, Copilot, and AI Overviews.\n\n`;
    
    const clusters = [
      { name: "AI Agent Core", slugs: ["best-ai-agent", "best-ai-agents", "what-is-an-ai-agent", "ai-agent-examples", "ai-agent-use-cases", "ai-agent-trends", "ai-agent-news", "ai-agent-benchmarks", "ai-agent-ranking", "ai-agent-comparison"] },
      { name: "AI Agent Builders", slugs: ["best-ai-agent-builder", "best-ai-agent-creator", "best-ai-agent-maker", "best-ai-agent-platform", "best-ai-agent-app-builder", "best-ai-agent-workflow-builder", "best-ai-agent-no-code-platform", "best-ai-agent-development-platform", "best-ai-agent-orchestration-platform", "best-ai-agent-management-platform"] },
      { name: "Coding Agents", slugs: ["ai-coding-agents", "best-ai-agent-for-coding", "best-ai-agent-for-vs-code", "best-ai-agent-extension-for-vs-code", "best-ai-agent-for-ides", "best-ai-agent-for-code-review", "best-ai-agent-for-frontend-development", "best-ai-agent-for-backend-development", "best-ai-agent-for-python", "best-ai-agent-for-javascript"] },
      { name: "Frameworks & SDKs", slugs: ["best-ai-agent-frameworks", "best-ai-agent-framework", "best-ai-agent-orchestration-tools", "best-ai-agent-sdks", "best-ai-agent-libraries", "best-open-source-ai-agent-tools", "best-ai-agent-development-tools", "best-ai-agent-prompt-tools", "best-ai-agent-memory-systems", "best-ai-agent-observability-tools"] },
      { name: "Business & SME Agents", slugs: ["ai-agents-for-business", "ai-agents-for-enterprises", "ai-agents-for-smes", "ai-agents-for-workflow-automation", "ai-agents-for-support-automation", "ai-agents-for-finance", "ai-agents-for-security", "ai-agents-for-healthcare", "ai-agents-for-hr", "ai-agents-for-procurement"] },
      { name: "Research & Education", slugs: ["best-ai-agent-course", "best-ai-agent-certification", "best-ai-agent-course-for-beginners", "best-ai-agent-course-reddit", "how-to-build-an-ai-agent", "how-to-create-an-ai-agent", "ai-agent-projects", "ai-agent-project-ideas", "ai-agent-github-projects", "ai-agent-learning-path"] },
      { name: "Personal & Productivity", slugs: ["best-ai-agent-for-personal-use", "best-ai-agent-personal-assistant", "best-ai-agent-for-research", "best-ai-agent-for-email", "best-ai-agent-for-presentations", "best-ai-agent-for-data-analysis", "best-ai-agent-for-job-search", "best-ai-agent-for-job-applications", "best-ai-agent-for-productivity", "best-ai-agent-with-memory"] },
      { name: "Voice & Automation", slugs: ["best-ai-voice-agent", "best-ai-voice-agent-platform", "best-ai-agent-for-whatsapp", "best-ai-agent-for-customer-support", "best-ai-agent-for-call-centers", "best-ai-agent-for-sales", "best-ai-agent-for-marketing", "best-ai-agent-for-crm", "best-ai-agent-automation-platform", "best-ai-agent-workflow-tools"] },
      { name: "Tool Comparisons", slugs: ["chatgpt-vs-claude", "chatgpt-vs-gemini", "chatgpt-vs-perplexity", "cursor-vs-copilot", "cursor-vs-claude", "crewai-vs-autogen", "langgraph-vs-crewai", "flowise-vs-dify", "vapi-vs-retell", "yellow-ai-vs-vapi"] },
      { name: "MCP & Next-Gen Hub", slugs: ["what-is-mcp", "best-mcp-servers", "mcp-directory", "mcp-marketplace", "mcp-hosting", "mcp-security", "mcp-use-cases", "mcp-for-ai-agents", "mcp-vs-api", "future-of-ai-agents"] }
    ];

    clusters.forEach(c => {
      txt += `\n## ${c.name}\n`;
      c.slugs.forEach(s => {
        txt += `- https://bestaiagent.in/#view=article&article=${s}\n`;
      });
    });

    res.send(txt);
  });

  const getSitemapXML = (urls: string[]) => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    urls.forEach(u => {
      xml += `  <url>\n`;
      xml += `    <loc>https://bestaiagent.in/#view=article&amp;article=${u}</loc>\n`;
      xml += `    <lastmod>2026-06-11</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.80</priority>\n`;
      xml += `  </url>\n`;
    });
    xml += `</urlset>`;
    return xml;
  };

  app.get('/ai-agent-sitemap.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    const slugs = [
      "best-ai-agent", "best-ai-agents", "what-is-an-ai-agent", "ai-agent-examples", "ai-agent-use-cases", "ai-agent-trends", "ai-agent-news", "ai-agent-benchmarks", "ai-agent-ranking", "ai-agent-comparison",
      "best-ai-agent-builder", "best-ai-agent-creator", "best-ai-agent-maker", "best-ai-agent-platform", "best-ai-agent-app-builder", "best-ai-agent-workflow-builder", "best-ai-agent-no-code-platform", "best-ai-agent-development-platform", "best-ai-agent-orchestration-platform", "best-ai-agent-management-platform",
      "ai-coding-agents", "best-ai-agent-for-coding", "best-ai-agent-for-vs-code", "best-ai-agent-extension-for-vs-code", "best-ai-agent-for-ides", "best-ai-agent-for-code-review", "best-ai-agent-for-frontend-development", "best-ai-agent-for-backend-development", "best-ai-agent-for-python", "best-ai-agent-for-javascript",
      "best-ai-agent-frameworks", "best-ai-agent-framework", "best-ai-agent-orchestration-tools", "best-ai-agent-sdks", "best-ai-agent-libraries", "best-open-source-ai-agent-tools", "best-ai-agent-development-tools", "best-ai-agent-prompt-tools", "best-ai-agent-memory-systems", "best-ai-agent-observability-tools",
      "ai-agents-for-business", "ai-agents-for-enterprises", "ai-agents-for-smes", "ai-agents-for-workflow-automation", "ai-agents-for-support-automation", "ai-agents-for-finance", "ai-agents-for-security", "ai-agents-for-healthcare", "ai-agents-for-hr", "ai-agents-for-procurement",
      "best-ai-agent-course", "best-ai-agent-certification", "best-ai-agent-course-for-beginners", "best-ai-agent-course-reddit", "how-to-build-an-ai-agent", "how-to-create-an-ai-agent", "ai-agent-projects", "ai-agent-project-ideas", "ai-agent-github-projects", "ai-agent-learning-path",
      "best-ai-agent-for-personal-use", "best-ai-agent-personal-assistant", "best-ai-agent-for-research", "best-ai-agent-for-email", "best-ai-agent-for-presentations", "best-ai-agent-for-data-analysis", "best-ai-agent-for-job-search", "best-ai-agent-for-job-applications", "best-ai-agent-for-productivity", "best-ai-agent-with-memory",
      "best-ai-voice-agent", "best-ai-voice-agent-platform", "best-ai-agent-for-whatsapp", "best-ai-agent-for-customer-support", "best-ai-agent-for-call-centers", "best-ai-agent-for-sales", "best-ai-agent-for-marketing", "best-ai-agent-for-crm", "best-ai-agent-automation-platform", "best-ai-agent-workflow-tools",
      "what-is-mcp", "best-mcp-servers", "mcp-directory", "mcp-marketplace", "mcp-hosting", "mcp-security", "mcp-use-cases", "mcp-for-ai-agents", "mcp-vs-api", "future-of-ai-agents"
    ];
    res.send(getSitemapXML(slugs));
  });

  app.get('/tool-sitemap.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    const tools = ['cursor', 'vapi', 'crewai', 'yellow-ai', 'flowise-ai', 'reclaim-ai', 'n8n', 'relevance-ai'];
    res.send(getSitemapXML(tools));
  });

  app.get('/comparison-sitemap.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    const comparisons = ["chatgpt-vs-claude", "chatgpt-vs-gemini", "chatgpt-vs-perplexity", "cursor-vs-copilot", "cursor-vs-claude", "crewai-vs-autogen", "langgraph-vs-crewai", "flowise-vs-dify", "vapi-vs-retell", "yellow-ai-vs-vapi"];
    res.send(getSitemapXML(comparisons));
  });

  // 0. Google Drive Document Analyzer using Gemini API
  app.post('/api/analyze-doc', async (req, res) => {
    try {
      const { content, filename, mimeType } = req.body;
      if (!content || typeof content !== 'string') {
        return res.status(400).json({ error: 'Content payload is required for review.' });
      }

      console.log(`Server: Analyzing Google Drive document "${filename}" (${mimeType}), length: ${content.length}`);

      if (ai) {
        const model = 'gemini-3.5-flash';
        const formattedPrompt = `You are the Principal AI Architect at BestAIAgent.in. Evaluate the following document retrieved from our user's secure Google Drive.
File Name: "${filename}"
Mime Type: "${mimeType}"

Document Content Snippet:
"""
${content.slice(0, 5000)}
"""

Please run an expert "AI Agent Capability Review" and "SME Workflow Fitness Audit" on this text.
Provide:
1. **Executive Summary**: 2-sentence capture of what the document is about and its technology context.
2. **Identified Automation Gaps**: Highlight 2 or 3 opportunities where deploying specific AI agents (e.g. Cursor AI for code, Vapi for voice, Yellow.ai for WhatsApp, n8n/Flowise for CRM workflows) would yield immediate cost savings or speed up operations.
3. **Actionable Implementation Checklist**: Give concrete, step-by-step guidance tailored to India (using INR cost estimates, DPDP compliance suggestions, or local server nodes).
4. **Tool Recommendations Scorecard**: List 2 exact recommendation tools from our platform, detailing exactly how they can integrate with this content.

Write in a helpful, analytical, professional, and sophisticated tone. Output in clean Markdown format.`;

        const response = await ai.models.generateContent({
          model,
          contents: formattedPrompt,
          config: {
            systemInstruction: "You are the Lead Technical Architect for BestAIAgent.in, India's most trusted comparison platform and authority portal for AI agents. Speak clearly, objectively, and with professional composure. Give extremely concrete, evidence-based suggestions, mentioning actual specifications, pricing estimates in INR, and practical implementation trade-offs."
          }
        });

        res.json({ text: response.text });
      } else {
        // High-quality expert-engineered simulated review when API key is simulated
        console.log("Server: Running document analysis in simulated expert mode...");
        
        // Custom report matching different document keywords
        const cLower = content.toLowerCase() + " " + filename.toLowerCase();
        let report = "";

        if (cLower.includes('code') || cLower.includes('software') || cLower.includes('github') || cLower.includes('bug') || cLower.includes('develop') || cLower.includes('api')) {
          report = `### 📊 AI Agent Capability Review & Audit: Software Development Focus
**Document Analyzed:** \`${filename}\` | **Audit Time:** June 2026

#### 1. Executive Summary
This document addresses software development procedures, code frameworks, or engineering workflows. Transitioning this scope in part or in full to high-benchmark coding agents can reduce time-to-production by **40% to 65%**.

#### 2. Identified Automation Gaps & Opportunities
* **Inline Composer Integration**: The file highlights routine boilerplate or testing structures that developers spend **10+ hours/week** manually writing.
* **Continuous Integration Agent Checks**: PR validations can be expedited by wiring agentic pipelines to review logs and correct syntactas.

#### 3. Recommended Tools Scorecard
* **Cursor AI (Silo C - Developer Rating: 9.6)**
  - *SME Fitness:* High. Ideal for indexing your workspace, locating duplicate definitions, and completing large refactor blocks.
  - *INR Price:* Free tier / Pro tier at **₹1,680/mo ($20/mo)**.
* **CrewAI (Silo D - Orchestration Rating: 9.4)**
  - *SME Fitness:* Exceptional for setting up task-oriented multi-agent validation loops to test API payloads before merge.
  - *INR Price:* Free (Open Source framework).

#### 4. Actionable India-Sovereign Checklist
- [ ] **Establish Sandbox Memory Controls:** Ensure Cursor is configured to exclude your custom private source files from background foundational training models to retain security.
- [ ] **Deploy local Flowise RAG Nodes:** Wire your files securely using local API endpoints housed on Mumbai cloud storage configurations for absolute DPDP data stability.`;
        } else if (cLower.includes('customer') || cLower.includes('support') || cLower.includes('sales') || cLower.includes('lead') || cLower.includes('chat') || cLower.includes('whatsapp') || cLower.includes('voice')) {
          report = `### 📊 AI Agent Capability Review & Audit: CRM & Outreach Focus
**Document Analyzed:** \`${filename}\` | **Audit Time:** June 2026

#### 1. Executive Summary
This workspace document focuses on consumer outreach, client inquiries, or customer support touchpoints. Automating these workflows using regional NLP bots will resolve **70%+** of routine queries instantly.

#### 2. Identified Automation Gaps & Opportunities
* **Indian Dialect Conversational Support**: Customer queries require rapid, localized conversational feedback. Voice agents can process Hinglish requests without losing context.
* **Direct CRM & WhatsApp Integration**: Manual logging of lead sheets can be fully bypassed by linking meta messaging APIs directly to database endpoints.

#### 3. Recommended Tools Scorecard
* **Yellow.ai (Silo E - Enterprise Rating: 9.3)**
  - *SME Fitness:* Unmatched for sovereign Indian enterprise WhatsApp automation, enabling seamless payment trigger links (UPI) inside active chat sessions.
  - *INR Price:* Customized quote with introductory SME tiers.
* **Vapi AI (Silo E - Voice Rating: 9.5)**
  - *SME Fitness:* Ultra-fast sub-second speech agents perfect for handling incoming regional inquiries in Hinglish, Hindi, or Tamil.
  - *INR Price:* Low pay-as-you-go billing starting at **₹12/hr**.

#### 4. Actionable India-Sovereign Checklist
- [ ] **Consent Separability Notices:** Format your WhatsApp entry dialogues to separate company terms from operations, keeping interactions 100% compliant with the DPDP Act of 2023.
- [ ] **Configure Regional Twilio Trunks:** Setup your support voice lines utilizing localized telecom access protocols to assure low-latency audio transmission.`;
        } else {
          report = `### 📊 AI Agent Capability Review & Audit: Operational SME Workflows
**Document Analyzed:** \`${filename}\` | **Audit Time:** June 2026

#### 1. Executive Summary
This document concerns operational guidelines, office checklists, or internal SME administrative templates. Infusing basic RAG pipelines can automate routine search times and retrieve institutional knowledge in seconds.

#### 2. Identified Automation Gaps & Opportunities
* **Semantic File Retrieval**: Team members lose substantial productivity digging for static manual definitions or checklist guidelines.
* **Automated Status Checking**: Task assignments and reporting status lines can be programmatically updated based on emails or notes.

#### 3. Recommended Tools Scorecard
* **Flowise AI (Silo B - No-Code Builder: 9.1)**
  - *SME Fitness:* Perfect for small business teams wanting visual drag-and-drop orchestration to link Drive files with private local database search indexes.
  - *INR Price:* **₹0 (Free & Open Source)**.
* **Reclaim AI (Silo E - Productivity Rating: 8.8)**
  - *SME Fitness:* Best suited for automating administrative calendar slotting, optimizing team meetings, and protecting deep focus slots.
  - *INR Price:* Free basic capabilities / Pro is **₹670/mo ($8/mo)**.

#### 4. Actionable India-Sovereign Checklist
- [ ] **Localize Repository Databases:** Keep any sensitive business sheets or compliance archives mapped specifically within local sovereign data structures.
- [ ] **Setup Flowise n8n Integrations:** Build a simple automated flow to update calendar slots whenever a status cell is updated in Google Sheets logs.`;
        }

        res.json({ text: report });
      }
    } catch (error: any) {
      console.error("Server: Analyze doc API error:", error);
      res.status(500).json({ error: error.message || 'Error processing document analysis' });
    }
  });

  // 1. Personalized AI Recommendation Engine
  app.post('/api/recommend', async (req, res) => {
    try {
      const { prompt, industry, budget, languagePreference } = req.body;
      
      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Prompt description is required.' });
      }

      console.log(`Server: Requesting recommendations for description: "${prompt.slice(0, 50)}...", industry: ${industry}, budget: ${budget}`);

      if (ai) {
        // Prepare prompt using the user guidelines
        const model = 'gemini-3.5-flash';
        const formattedPrompt = `Suggest the best AI Agents, Visual Builders, or Orchestration Frameworks for this scenario:
User Query: "${prompt}"
Business Sector: ${industry || 'Unspecified'}
Budget Target / Deployment Strategy: ${budget || 'Unspecified'}
Language Preference: ${languagePreference || 'English / Hinglish'}

Guidelines:
1. Suggest 2 or 3 exact tools. Specify why they match this request.
2. We highly recommend and review these specific tools inside our database:
   - Cursor AI (for autonomous development/front-end coding, score: 9.6)
   - CrewAI (for multi-agent orchestration/Python, score: 9.4)
   - Vapi AI (for real-time low-latency voice bots/supports Hindi/Tamil/Hinglish, score: 9.5)
   - Yellow.ai (for official corporate WhatsApp checkouts and payments, score: 9.3)
   - Flowise (for drag-and-drop no-code RAG/APIs workflows, score: 9.1)
3. Incorporate local Indian business nuances (e.g., mention WhatsApp Business APIs, UPI payment gates, Hinglish dialect settings, DPDP Act compliance, and Mumbai servers) where applicable.
4. Highlight estimated costs in INR (Indian Rupee) and give an immediate practical first step for starting.
5. Double check that you do not generate placeholder or generic text. Return your final guidance in elegant Markdown format with bullet points and clear sections.`;

        const response = await ai.models.generateContent({
          model,
          contents: formattedPrompt,
          config: {
            systemInstruction: "You are the Lead Technical Architect for BestAIAgent.in, India's most trusted comparison platform and authority portal for AI agents. Speak clearly, objectively, and with professional composure. Give extremely concrete, evidence-based suggestions, mentioning actual specifications, pricing estimates in INR, and practical implementation trade-offs."
          }
        });

        res.json({ text: response.text });
      } else {
        // High-quality simulated responses when API key is not yet set
        console.log("Server: Running recommendation in simulated expert mode...");
        
        let customDoc = "";
        const pLower = prompt.toLowerCase();
        
        if (pLower.includes('vs code') || pLower.includes('code') || pLower.includes('program') || pLower.includes('frontend') || pLower.includes('backend') || pLower.includes('developer')) {
          customDoc = `### Recommendations for AI Coding & Software Engineering:

Here is our expert analysis based on your coding, IDE, and developer assistant request:

1. **Cursor AI (Silo C Champion)** 
   - **Best For:** Absolute code generation speed, inline editing, and deep workspace context indexing.
   - **Indian Context:** Fully supports international payment profiles for Indian developers. Trusted across Bangalore, Pune, and Hyderabad tech startups.
   - **INR Price Estimate:** Free tier includes basic queries. Pro tier is **₹1,680/mo ($20/mo)**.
   - **Why it fits:** It operates as a direct VS Code fork, meaning you don't lose any of your existing keyboard macros or theme extensions.

2. **CrewAI (Silo D Platform)**
   - **Best For:** Creating role-based multi-agent assemblies that write, test, and package software modules sequentially.
   - **INR Price Estimate:** **₹0 (Open Source)**. You only pay for your model tokens (e.g., GPT-4o or Gemini Flash direct API costs).
   - **Why it fits:** Extremely clean Python code structure. Allowing teams to automate routine PR validation and software unit-testing.

**Next Action Step:** We suggest downloading Cursor AI, indexing your local server source folder, and prompting "composer" (Cmd+I) to draft your initial endpoint. Let our interactive charts compare these in Silo C for deep specs.`;
        } else if (pLower.includes('whatsapp') || pLower.includes('customer') || pLower.includes('support') || pLower.includes('voice') || pLower.includes('phone') || pLower.includes('call')) {
          customDoc = `### Recommendations for Personalized Customer Support & Local Outreach:

Here is our expert evaluation for client-centric automations, localized helplines, and WhatsApp bots in India:

1. **Vapi AI (Voice Leader)**
   - **Best For:** Immediate, millisecond, human-like voice conversationalists covering phone lines and web agents.
   - **Indian Context:** Incredible dialect handling. Handles Hinglish words seamlessly without breaking character, plus Tamil, Telugu, and Hindi accents.
   - **INR Price Estimate:** Pay-as-you-go starting at approximately **₹12 per hour of call time**.
   - **Why it fits:** Easily hooks into Twilio numbers and routes customer summaries direct to Zoho CRM.

2. **Yellow.ai (Omnichannel Enterprise Leader)**
   - **Best For:** Scale and DPDP compliance. Officially integrated with verified Meta WhatsApp Business APIs.
   - **Indian Context:** Incorporates UPI checkouts. Customers can purchase products and confirm COD shipping natively inside WhatsApp.
   - **INR Price Estimate:** Custom quote (Enterprise tier). Free trial is available.

**Next Action Step:** Check out our visual comparators for Vapi and Yellow.ai. We suggest booting a free Vapi account, typing a Hinglish prompt, and requesting a test phone-call demo in 2 minutes.`;
        } else {
          customDoc = `### Recommendations for Business Operations & SME Workflow Automation:

Based on your custom workflow requirements, here are our top recommend tools evaluated in our index:

1. **Flowise AI (No-Code/Low-Code Champion)**
   - **Best For:** Cost-focused SMEs seeking to connect company databases to AI chatbots visually.
   - **Indian Context:** Can be hosted on affordable Indian cloud instances (e.g., AWS Mumbai region) keeping data strictly sovereign.
   - **INR Price Estimate:** **₹0 (Free, Open Source)**.
   - **Why it fits:** Easy drag-and-drop nodes to parse legacy excel spreadsheets and query them in plain English.

2. **CrewAI Framework (Technical Orchestrator)**
   - **Best For:** Automated research pipelines, commercial email triage, and multi-step marketing drafts.
   - **INR Price Estimate:** **₹0 (Open Source)**. Setup on AWS Mumbai or digital environments.

**Next Action Step:** Try our visual Score Customizer. Increase the weight for "Value for Money" and "Developer Ease" to see how Flowise ranks as the ultimate SMB solution.`;
        }

        res.json({ text: customDoc });
      }
    } catch (error: any) {
      console.error("Server: Recommendation API error:", error);
      res.status(500).json({ error: error.message || 'Error processing recommendation' });
    }
  });

  // 2. Lead Capture
  app.post('/api/submit-lead', (req, res) => {
    console.log("Server: Lead captured successfully:", req.body);
    res.json({
      success: true,
      message: "Lead captured. Our technical automation advisor will reach out to schedule your consult within 24 business hours."
    });
  });

  // 3. Tool Submission
  app.post('/api/submit-tool', (req, res) => {
    console.log("Server: Tool suggestion received:", req.body);
    res.json({
      success: true,
      message: "Tool successfully entered into the pipeline. Our chief editor will inspect your system benchmarks and docs within 3-5 standard business days."
    });
  });

  // 4. Newsletter Subscription
  app.post('/api/subscribe', (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email address is required.' });
    }
    console.log(`Server: New newsletter subscriber: ${email}`);
    res.json({
      success: true,
      message: "Subscribed! Welcome to BestAIAgent.in. Receive our curated weekly comparison checklists every Thursday."
    });
  });

  // --- VITE MIDDLEWARE CONFIGURATION ---

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.resolve('./dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server: Running on http://0.0.0.0:${PORT} (isProd: ${isProd})`);
  });
}

startServer();

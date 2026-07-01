import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

export const ROOT = process.cwd();
export const CONTENT_DIR = path.join(ROOT, "content");
export const PUBLIC_DIR = path.join(ROOT, "public");
export const SITE_URL = (process.env.SITE_URL || 'https://bestaiagent.in').replace(/\/$/, '');
export const SITE_URL_PATTERN = SITE_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
export const TODAY = process.env.CONTENT_DATE || process.env.BUILD_DATE || new Date().toISOString().slice(0, 10);

const CATEGORY_LABELS = {
  alternatives: "Alternatives",
  comparisons: "Comparisons",
  core: "AI Agent Core",
  courses: "Courses",
  free: "Free AI Agents",
  glossary: "Glossary",
  guides: "Guides",
  longtail: "Long-tail Guides",
  mcp: "MCP",
  pillars: "AI Agent Pillars",
  pricing: "Pricing",
  research: "Research",
  reviews: "Tool Reviews",
  tools: "Tool Profiles",
  tutorials: "Tutorials",
  hubs: "Hubs",
  "buyers-guides": "Buyer Guides",
  reddit: "Reddit Reviews",
  entity: "Entity Pages",
  "india-geo": "India GEO",
  directories: "Directories",
  calculators: "Calculators",
};

const TOOL_REVIEW_SLUG_OVERRIDES = {
  vapi: "vapi-ai",
  retell: "retell-ai",
  intercom: "intercom-ai",
  bland: "bland-ai",
  replit: "replit-ai",
  elevenlabs: "elevenlabs",
  "elevenlabs-conversational-ai": "elevenlabs",
};

export const HUBS = [
  {
    slug: "coding-agents-hub",
    title: "Coding AI Agents Hub",
    description: "Developer-focused AI coding agents, IDE copilots, pricing guides, comparisons, and setup tutorials for Indian engineering teams.",
            children: [
      "mcp-hub",
      "what-is-mcp",
      "best-mcp-servers",
      "mcp-directory",
      "mcp-marketplace",
      "mcp-hosting",
      "mcp-security",
      "mcp-use-cases",
      "mcp-for-ai-agents",
      "mcp-vs-api",
      "mcp-server-setup-guide",
      "mcp-client-integration",
      "mcp-with-claude-desktop",
      "mcp-with-cursor",
      "mcp-file-system-server",
      "mcp-git-server",
      "mcp-database-server",
      "mcp-sqlite-server",
      "mcp-brave-search",
      "mcp-slack-integration",
      "mcp-notion-integration",
      "mcp-google-drive",
      "mcp-github-integration",
      "mcp-vscode-extension",
      "mcp-security-best-practices",
      "mcp-troubleshooting",
      "mcp-performance-optimization",
      "mcp-community-resources",
      "mcp-open-source-projects",
      "mcp-python-sdk",
      "mcp-nodejs-sdk",
      "mcp-typescript-sdk",
      "building-custom-mcp-server",
      "mcp-tool-definition",
      "mcp-data-sources",
      "mcp-api-integration",
      "mcp-authentication",
      "mcp-monitoring",
      "mcp-logging",
      "mcp-health-checks",
      "mcp-scaling",
      "mcp-docker-deployment",
      "mcp-kubernetes-deploy",
      "mcp-ci-cd",
      "mcp-testing",
      "mcp-testing-frameworks",
      "mcp-mocking",
      "mcp-deployment-patterns",
      "mcp-uptime",
      "mcp-backup-restore",
      "mcp-version-control",
      "mcp-india-deployment",
      "mcp-gst-compliance",
      "mcp-hindi-support",
      "mcp-whatsapp-integration",
      "mcp-use-case-ecommerce",
      "mcp-use-case-crm",
      "mcp-use-case-analytics",
      "mcp-use-case-healthcare",
      "mcp-use-case-education",
      "mcp-use-case-finance",
      "mcp-cost-calculator",
      "mcp-best-practices",
      "mcp-case-studies",
      "mcp-success-stories",
      "mcp-community-tips",
      "mcp-faq",
      "mcp-update-june-2026",
      "kubernetes-multi-cluster-orchestrator-mcp",
      "aws-cloudformation-cdk-planner-mcp",
      "terraform-drift-detector-mcp",
      "github-actions-pipeline-debugger-mcp",
      "jira-github-continuous-sync-mcp",
      "docker-swarm-compose-runtime-mcp",
      "datadog-newrelic-apm-log-weaver-mcp",
      "kafka-cluster-topology-inspector-mcp",
      "prometheus-alert-manager-middleware-mcp",
      "cloudflare-workers-deployment-mcp",
      "vercel-deployment-webhook-lifecycle-mcp",
      "sentry-error-trace-optimizer-mcp",
      "sonarqube-static-analysis-bridge-mcp",
      "argocd-gitops-synchronization-tracker-mcp",
      "supabase-firebase-schema-sync-mcp",
      "postman-collection-api-spec-runner-mcp",
      "hashicorp-vault-secret-rotator-mcp",
      "nginx-haproxy-traffic-controller-mcp",
      "elasticsearch-cluster-shard-tuner-mcp",
      "grafana-dashboard-schema-builder-mcp",
      "sap-s4hana-odata-core-bridge-mcp",
      "oracle-netsuite-suitalk-ledger-mcp",
      "tally-prime-desktop-local-stdio-mcp",
      "zoho-books-enterprise-compliance-mcp",
      "salesforce-lightning-object-orchestrator-mcp",
      "hubspot-multi-hub-operations-mcp",
      "microsoft-dynamics-365-finance-mcp",
      "quickbooks-online-api-sync-mcp",
      "xero-accounting-ledger-integrator-mcp",
      "workday-core-hr-talent-inventory-mcp",
      "servicenow-itil-incident-pipeline-mcp",
      "freshdesk-zendesk-ticket-semantic-sync-mcp",
      "stripe-billing-subscription-lifecycle-mcp",
      "razorpay-payu-corporate-transaction-mcp",
      "pipedrive-sales-pipeline-accelerator-mcp",
      "gstn-e-invoice-reconciliation-mcp",
      "upi-autopay-settlement-gateway-mcp",
      "digilocker-user-consented-vault-mcp",
      "aadhaar-ekyc-regulatory-sandbox-mcp",
      "gem-procurement-mcp",
      "mca-corporate-affairs-portal-mcp",
      "national-judicial-data-grid-litigant-mcp",
      "account-aggregator-sahamati-finance-mcp",
      "ondc-protocol-translation-mcp",
      "fastag-national-toll-telemetry-mcp",
      "maharera-state-rera-compliance-mcp",
      "sarathi-vahan-vehicle-registry-mcp",
      "india-post-tracking-logistics-mcp",
      "epfo-corporate-compliance-auditor-mcp",
      "uidai-facerd-biometric-lifecycle-mcp",
      "postgresql-performance-tuner-mcp",
      "mongodb-aggregation-pipeline-mcp",
      "pinecone-milvus-vector-search-mcp",
      "neo4j-memgraph-cypher-execution-mcp",
      "redis-enterprise-distributed-cache-mcp",
      "snowflake-enterprise-data-warehouse-mcp",
      "google-bigquery-federated-storage-mcp",
      "clickhouse-realtime-analytics-pipeline-mcp",
      "cassandra-scylladb-wide-column-mcp",
      "sqlite-scoped-local-file-mcp",
      "chromadb-local-vector-storage-mcp",
      "amazon-dynamodb-nosql-partition-mcp",
      "microsoft-sql-server-legacy-integration-mcp",
      "qdrant-vector-lifecycle-management-mcp",
      "databricks-delta-lake-pipeline-mcp",
      "fedex-ups-dhl-global-logistics-mcp",
      "shopify-core-inventory-synchronizer-mcp",
      "flexport-global-freight-forwarding-mcp",
      "scada-industrial-iot-telemetry-mcp",
      "zebra-barcode-rfid-scanner-interface-mcp",
      "project44-supply-chain-visibility-mcp",
      "cisco-meraki-network-infrastructure-mcp",
      "lorawan-smart-city-sensor-network-mcp",
      "infor-cloudsuite-supply-chain-mcp",
      "manhattan-associates-wms-bridge-mcp",
      "fleetio-telematics-fleet-maintenance-mcp",
      "cwc-cold-storage-environment-monitor-mcp",
      "finops-token-burn-budget-firewall-mcp",
      "prompt-injection-shield-mcp",
      "splunk-elastic-siem-security-incident-mcp",
      "onetrust-privacy-compliance-auditor-mcp",
      "auth0-okta-user-session-lifecycle-mcp",
      "checkmarx-veracode-sast-vulnerability-mcp",
      "snyk-open-source-dependency-shield-mcp",
      "tenable-qualys-vulnerability-surface-mcp",
      "cloudtrail-activity-log-integrity-auditor-mcp",
      "hackerone-bug-bounty-triage-mcp",
      "lexisnexis-corporate-kyb-mcp",
      "cersai-collateral-asset-risk-tracker-mcp",
      "nemo-guardrails-realtime-policy-mcp",
      "abdm-unified-health-interface-mcp",
      "fhir-healthcare-interoperability-mcp",
      "clio-legal-practice-management-mcp",
      "veeva-life-sciences-compliance-mcp",
      "epic-cerner-ehr-interactivity-mcp",
      "ecourts-india-njdg-document-scraper-mcp",
      "bloomberg-terminal-data-stream-mcp",
      "corelogic-property-data-aggregator-mcp",
      "amadeus-sabre-gds-travel-reservation-mcp",
      "canvas-moodle-lms-academic-progress-mcp",
    ],
  },
  {
    slug: "voice-ai-hub",
    title: "Voice AI Agents Hub",
    description: "AI voice agents for Indian call centers, appointment booking, outbound calling, support workflows, Hinglish calls, and DPDP-aware deployments.",
    children: ["best-ai-voice-agent", "best-ai-voice-agent-platform", "best-ai-agent-for-call-centers", "best-ai-agent-for-customer-support", "vapi-review", "retell-review", "vapi-vs-retell", "best-hindi-voice-agent", "voice-ai-for-call-centers", "voice-ai-india", "voice-ai-compliance", "voice-ai-for-appointment-booking", "voice-ai-for-healthcare", "voice-ai-for-real-estate", "voice-ai-for-education"],
  },
  {
    slug: "pricing-hub",
    title: "AI Agent Pricing Hub",
    description: "INR pricing, GST invoice notes, free-vs-paid comparisons, ROI models, and procurement guidance for AI agent tools in India.",
    children: ["cursor-pricing", "github-copilot-pricing", "vapi-pricing", "n8n-pricing", "flowise-pricing"],
  },
  {
    slug: "alternatives-hub",
    title: "AI Agent Alternatives Hub",
    description: "Alternative shortlists for Cursor, GitHub Copilot, Vapi, Retell, n8n, Flowise, Dify, Intercom, and other AI agent tools.",
    children: ["cursor-alternatives", "github-copilot-alternatives", "vapi-alternatives", "n8n-alternatives", "flowise-alternatives"],
  },
  {
    slug: "tutorials-hub",
    title: "AI Agent Tutorials Hub",
    description: "Step-by-step implementation guides for Cursor, GitHub Copilot, Vapi, Retell, Flowise, CrewAI, MCP servers, and multi-agent systems.",
    children: ["how-to-use-cursor-ai", "how-to-use-github-copilot", "how-to-use-vapi", "how-to-build-ai-agent-with-flowise", "how-to-create-mcp-server"],
  },
  {
    slug: "glossary-hub",
    title: "AI Agent Glossary Hub",
    description: "Plain-English definitions for RAG, MCP, tool use, function calling, context windows, multi-agent systems, AgentOps, and AI benchmarks.",
    children: ["what-is-rag", "what-is-mcp", "what-is-function-calling", "what-is-tool-use", "what-is-agentic-ai"],
  },
  {
    slug: "mcp-hub",
    title: "MCP Hub",
    description: "Model Context Protocol explainers, MCP server directories, security guidance, API comparisons, and implementation tutorials.",
    children: ["what-is-mcp", "best-mcp-servers", "mcp-directory", "mcp-security", "mcp-vs-api", "mcp-server-setup-guide", "mcp-client-integration", "mcp-with-claude-desktop", "mcp-with-cursor", "mcp-file-system-server", "mcp-git-server", "mcp-database-server", "mcp-sqlite-server", "mcp-brave-search", "mcp-slack-integration", "mcp-notion-integration", "mcp-google-drive", "mcp-github-integration", "mcp-vscode-extension", "mcp-security-best-practices", "mcp-troubleshooting", "mcp-performance-optimization", "mcp-community-resources", "mcp-open-source-projects", "mcp-python-sdk", "mcp-nodejs-sdk", "mcp-typescript-sdk", "building-custom-mcp-server", "mcp-tool-definition", "mcp-data-sources", "mcp-api-integration", "mcp-authentication", "mcp-monitoring", "mcp-logging", "mcp-health-checks", "mcp-scaling", "mcp-docker-deployment", "mcp-kubernetes-deploy", "mcp-ci-cd", "mcp-testing", "mcp-testing-frameworks", "mcp-mocking", "mcp-deployment-patterns", "mcp-uptime", "mcp-backup-restore", "mcp-version-control", "mcp-india-deployment", "mcp-gst-compliance", "mcp-hindi-support", "mcp-whatsapp-integration", "mcp-use-case-ecommerce", "mcp-use-case-crm", "mcp-use-case-analytics", "mcp-use-case-healthcare", "mcp-use-case-education", "mcp-use-case-finance", "mcp-cost-calculator", "mcp-best-practices", "mcp-case-studies", "mcp-success-stories", "mcp-community-tips", "mcp-faq", "mcp-update-june-2026"],
  },
  {
    slug: "free-ai-agents-hub",
    title: "Free AI Agents Hub",
    description: "Free and open-source AI agents, builders, voice agents, coding agents, and business automation tools for budget-conscious Indian teams.",
    children: ["best-free-ai-agents", "best-free-ai-coding-agents", "best-free-ai-agent-builder", "best-free-ai-voice-agent", "best-free-open-source-ai-agents"]
  },
  {
    slug: "buyers-guides-hub",
    title: "AI Agent Buyer Guides Hub",
    description: "High-converting industry and role-based buyer guides for choosing the right AI agent in India.",
    children: ["best-ai-agent-for-startups", "best-ai-agent-for-enterprises", "best-ai-agent-for-saas", "best-ai-agent-for-freelancers", "best-ai-agent-for-solopreneurs", "best-ai-agent-for-agencies", "best-ai-agent-for-indian-businesses", "best-ai-agent-for-developers", "best-ai-agent-for-students", "best-ai-agent-for-content-creators"]
  },
  {
    slug: "ai-agents-india",
    title: "AI Agents India Hub",
    description: "India-specific AI agent guides with INR pricing, DPDP compliance, WhatsApp integration, and regional language support.",
    children: ["ai-agents-india", "whatsapp-ai-agent-india", "voice-ai-india", "dpdp-compliance-ai", "hindi-ai-agent", "best-ai-agent-india", "ai-agent-pricing-india", "ai-agent-for-indian-startups", "ai-agent-for-indian-smes", "ai-agent-for-whatsapp-business"],
  },
  {
    slug: "calculators-hub",
    title: "AI Agent Calculators Hub",
    description: "Interactive cost calculators and ROI tools for AI agent pricing, costs, and business cases.",
    children: ["ai-agent-cost-calculator", "cursor-cost-calculator", "vapi-cost-calculator", "retell-cost-calculator", "ai-support-agent-roi-calculator"]
  },
  {
    slug: "reddit-hub",
    title: "AI Agent Reddit Reviews Hub",
    description: "Community-sourced reviews and Reddit-intent pages for popular AI agents.",
    children: ["cursor-ai-reddit-review", "github-copilot-reddit-review", "claude-code-reddit-review", "vapi-reddit-review", "retell-reddit-review", "flowise-reddit-review"]
  },
  {
    slug: "entity-hub",
    title: "AI Agent Entity Pages Hub",
    description: "LLM-optimized entity definition pages for major AI agents with structured data.",
    children: ["cursor-ai-entity", "github-copilot-entity", "claude-code-entity", "vapi-entity", "retell-entity", "flowise-entity", "dify-entity", "langgraph-entity", "crewai-entity", "autogen-entity"]
  },
  {
    slug: "directories-hub",
    title: "AI Agent Directories Hub",
    description: "Comprehensive directories of AI agents organized by category with filters, pricing, and ratings.",
    children: ["ai-agent-directory", "coding-agents-directory", "business-agents-directory", "voice-agents-directory", "agent-builders-directory", "open-source-agents-directory", "mcp-servers-directory", "free-agents-directory"]
  }
];

export const EDITORIAL_ROUTES = [
  {
    path: "/methodology",
    title: "Review Methodology and 100-Point AI Agent Scoring Framework",
    description: "Full BestAIAgent.in review methodology covering features, pricing, usability, reliability, integrations, security, support, India relevance, MCP support, and AI workflow capability.",
  },
  {
    path: "/compare",
    title: "AI Agent Comparison Board",
    description: "Interactive AI agent comparison board for comparing coding agents, voice agents, builders, business automation tools, pricing, India fit, and implementation readiness.",
  },
  {
    path: "/ai-agent-advisor",
    title: "AI Agent Advisor",
    description: "BestAIAgent.in AI agent advisor for selecting tools by use case, budget, India requirements, DPDP considerations, and implementation complexity.",
  },
  {
    path: "/google-drive-ai-agent-workspace",
    title: "Google Drive AI Agent Workspace",
    description: "Workspace for organizing AI agent research, Google Drive workflows, exports, checklists, and editorial assets for BestAIAgent.in.",
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy",
    description: "Privacy policy covering DPDP Act awareness, GDPR-style rights, cookies, analytics, contact forms, and data deletion requests.",
  },
  {
    path: "/terms",
    title: "Terms of Use",
    description: "Terms of use covering informational content, affiliate links, user submissions, intellectual property, and limitations of liability.",
  },
  {
    path: "/data-deletion-request",
    title: "Data Deletion Request",
    description: "How to request deletion of personal data from BestAIAgent.in under DPDP and GDPR-style privacy rights.",
  },
  {
    path: "/team",
    title: "Team",
    description: "Meet the BestAIAgent.in editorial team, analysts, fact checkers, and India-focused AI agent researchers.",
  },
  {
    path: "/mcp-directory",
    title: "MCP Server Directory: Browse & Compare MCP Servers for AI Agents in India 2026",
    description: "Browse MCP servers by category: file system, database, API, search, and custom integrations for Indian development teams. Includes security notes, setup guides, and India-specific deployment options.",
  },
  {
    path: "/mcp-servers",
    canonicalPath: "/mcp-directory",
    title: "MCP Servers Directory: Browse & Compare Model Context Protocol Servers for AI Agents in India",
    description: "Complete directory of MCP servers for AI agents: file system, database, API, search, and custom integrations with India-specific deployment notes.",
  },
  {
    path: "/mcp-servers-for-ai-agents",
    canonicalPath: "/mcp-directory",
    title: "MCP Servers for AI Agents: Integration Guide for Indian Teams 2026",
    description: "Guide to MCP servers for AI agents in India: setup, security, regional language support, and DPDP compliance. Helps teams choose the right MCP servers for their workflows.",
  },
  {
    path: "/india-mcp-server-directory",
    canonicalPath: "/mcp-directory",
    title: "India MCP Server Directory: Region-Specific Integrations for Developers 2026",
    description: "India-focused MCP servers: local integrations, AWS Mumbai region support, GST compliance, and Hindi language connectors for Indian development teams.",
  },
  {
    path: "/ai-agent-market-map",
    title: "AI Agent Market Map",
    description: "Market map of AI agents, builders, coding agents, voice agents, MCP infrastructure, enterprise platforms, and India-focused vendors.",
  },
  {
    path: "/ai-agent-benchmark",
    title: "AI Agent Benchmark",
    description: "Benchmark framework for AI agent capability, latency, reliability, security, MCP support, India localization, and workflow execution.",
  },
  {
    path: "/ai-agent-rankings",
    title: "AI Agent Rankings",
    description: "Transparent AI agent rankings by category, use case, India fit, pricing, reliability, MCP support, and workflow capability.",
  },
  {
    path: "/ai-agent-awards",
    title: "AI Agent Awards",
    description: "BestAIAgent.in awards for coding agents, voice agents, business automation, MCP tooling, open-source builders, and India-ready AI platforms.",
  },
  {
    path: "/ai-agent-glossary",
    title: "AI Agent Glossary",
    description: "Glossary of AI agent terms including agentic workflows, MCP, RAG, tool use, memory, orchestration, DPDP, and AI automation.",
  },
  {
    path: "/ai-agent-statistics",
    title: "AI Agent Statistics 2026",
    description: "AI agent statistics, market data, adoption signals, India trends, enterprise usage patterns, and AI automation growth indicators.",
  },
  {
    path: "/industry-report",
    title: "AI Agent Industry Report 2026",
    description: "BestAIAgent.in AI agent industry report covering market trends, adoption patterns, pricing, India readiness, and enterprise AI agent deployment.",
  },
  {
    path: "/ai-agent-cost-report",
    title: "AI Agent Cost Report 2026",
    description: "AI agent cost report with pricing models, INR planning, GST invoice notes, usage-based cost risks, and procurement guidance for Indian teams.",
  },
  {
    path: "/ai-agent-adoption-report",
    title: "AI Agent Adoption Report 2026",
    description: "AI agent adoption report covering startup, SME, enterprise, developer, agency, and India-specific adoption trends.",
  },
  {
    path: "/editorial-policy",
    title: "Editorial Policy, Independence, Corrections, and Affiliate Disclosure",
    description: "BestAIAgent.in editorial policy covering independence, affiliate disclosure, evidence standards, corrections, pricing disclaimers, and conflicts of interest.",
  },
  {
    path: "/ai-agent-scoring-system",
    title: "AI Agent Scoring System",
    description: "The BestAIAgent.in scoring system for AI agents, including ease of use, features, reliability, security, India suitability, and enterprise readiness.",
  },
  {
    path: "/affiliate-disclosure",
    title: "Affiliate Disclosure",
    description: "Affiliate disclosure and pricing disclaimer for BestAIAgent.in. We may earn commissions without making fake partnership claims.",
  },
  {
    path: "/corrections-policy",
    title: "Corrections Policy",
    description: "How BestAIAgent.in corrects factual errors, updates pricing, and verifies AI agent information.",
  },
  {
    path: "/about-editorial-team",
    canonicalPath: "/about",
    title: "About BestAIAgent.in Editorial Team",
    description: "About BestAIAgent.in with editorial team, ownership, methodology, independence, and transparency details.",
  },
  {
    path: "/contact",
    title: "Contact BestAIAgent.in",
    description: "Contact the BestAIAgent.in editorial team for corrections, review updates, vendor submissions, and AI agent research requests.",
  },
  {
    path: "/ai-agent-tools",
    canonicalPath: "/",
    title: "AI Agent Tools Directory",
    description: "Browse the BestAIAgent.in AI agent tools directory for coding agents, business AI, voice agents, builders, workflow automation, pricing, and India-focused use cases.",
  },
];

export const AUTHORS = [
  {
    slug: "arshdeep-singh",
    name: "Arshdeep Singh",
    role: "Chief AI Analyst",
    description: "Arshdeep Singh leads BestAIAgent.in methodology, AI agent rankings, DPDP compliance reviews, and India-market editorial quality.",
    sameAs: ["https://linkedin.com/in/arshdeepsingh-ai", "https://twitter.com/arshdeep_ai"],
  },
  {
    slug: "priya-iyer",
    name: "Priya Iyer",
    role: "Core Engineer",
    description: "Priya Iyer reviews developer tools, AI agent builders, APIs, benchmarks, and implementation workflows for Indian engineering teams.",
    sameAs: ["https://linkedin.com/in/priya-iyer-dev", "https://twitter.com/priya_codes"],
  },
  {
    slug: "karan-mehra",
    name: "Karan Mehra",
    role: "Enterprise Lead",
    description: "Karan Mehra evaluates voice agents, WhatsApp automation, enterprise procurement, and AI deployment readiness for Indian businesses.",
    sameAs: ["https://linkedin.com/in/karanmehra-enterprise", "https://twitter.com/karan_enterprise"],
  },
];

export const HOME_FAQS = [
  ["What is the best AI agent in India?", "The best AI agent depends on the use case. Cursor AI is strong for coding, Vapi and Retell are strong for voice automation, Yellow.ai and Intercom fit customer support, while Flowise, Dify, CrewAI, and LangGraph fit custom agent building."],
  ["Which AI agent is best for coding?", "Cursor AI is usually the strongest coding-agent starting point for Indian developer teams, while GitHub Copilot, Claude Code-style tools, and Windsurf are important alternatives to compare by IDE fit, pricing, and code-review workflow."],
  ["What is the best free AI agent?", "The best free AI agent depends on whether you need coding, automation, voice, or builder workflows. Flowise, Dify, CrewAI, and open-source frameworks are useful starting points, but free tiers often require technical setup or have usage limits."],
  ["Which AI agent is best for Indian businesses?", "Indian businesses should prioritize clear INR cost estimates, WhatsApp or CRM integration, GST invoice availability, support SLAs, DPDP-aware data handling, and team onboarding effort before choosing an AI agent."],
  ["Which AI agent supports WhatsApp automation?", "Yellow.ai, Intercom-style support platforms, some voice AI stacks, and workflow tools may support WhatsApp workflows depending on vendor integrations, WhatsApp Business API setup, template approvals, and escalation requirements."],
  ["What is the best AI agent builder?", "Flowise and Dify are useful visual builders, while CrewAI and LangGraph are stronger developer frameworks for custom multi-agent workflows. The best builder depends on engineering skill, hosting preference, and integration depth."],
  ["Are AI agents DPDP compliant?", "AI agents are not automatically DPDP compliant. Indian businesses should review consent, purpose limitation, access control, data retention, deletion workflows, vendor processing terms, and whether personal data is handled safely."],
  ["How much do AI agents cost in India?", "AI agent costs in India vary from free open-source tools to paid SaaS subscriptions and usage-based API bills. INR estimates depend on exchange rates, GST treatment, user seats, call minutes, messages, tokens, and vendor plan limits."],
  ["Is Cursor better than GitHub Copilot?", "Cursor is often better for AI-native IDE workflows and repo-level coding assistance, while GitHub Copilot remains strong for developers already embedded in GitHub and supported IDEs. The better choice depends on workflow and budget."],
  ["What is MCP in AI agents?", "MCP, or Model Context Protocol, is a protocol for connecting AI systems to tools, data, and external context in a more standardized way. It matters when teams need maintainable agent integrations."],
  ["Which AI agent is best for startups?", "Startups should usually shortlist tools with fast setup, low monthly cost, good documentation, practical integrations, and clear ROI. Coding agents, no-code builders, and support automation agents are common first deployments."],
  ["Which AI agent is best for customer support?", "Yellow.ai, Intercom, voice AI agents such as Vapi or Retell, and workflow builders can all support customer-service automation. The right choice depends on WhatsApp needs, ticket volume, language support, and escalation design."],
  ["How should Indian teams compare AI agent tools?", "Indian teams should compare AI agent tools by use case, integration depth, INR pricing, GST invoice availability, privacy controls, implementation effort, support quality, and whether the tool works with their existing CRM, WhatsApp, coding, or cloud stack."],
  ["Do AI agent platforms support Hindi and Hinglish?", "Some AI agent platforms support Hindi, Hinglish, or other Indian languages through model, speech, or chatbot integrations, but support quality varies. Teams should test real customer phrases, regional accents, escalation flows, and analytics before deployment."],
  ["What should buyers check before purchasing an AI agent?", "Buyers should check official pricing, usage limits, data processing terms, security controls, cancellation terms, support SLAs, GST invoice handling, integration requirements, and whether the agent can be piloted safely before a larger rollout."],
  ["How does BestAIAgent.in review AI agents?", "BestAIAgent.in evaluates AI agents with an editorial framework covering use case fit, functionality, pricing clarity, implementation effort, India relevance, privacy, support, documentation, alternatives, and commercial readiness."],
];

export const HOME_TOP_TOOLS = [
  ["Cursor AI", "/tools/cursor-ai"],
  ["Vapi", "/vapi-review"],
  ["Retell", "/retell-review"],
  ["Yellow.ai", "/yellow-ai-review"],
  ["Intercom", "/intercom-review"],
  ["Flowise", "/flowise-review"],
  ["Dify", "/dify-review"],
  ["CrewAI", "/crewai-review"],
  ["LangGraph", "/langgraph-review"],
  ["GitHub Copilot", "/tools/github-copilot"],
  ["Claude Code", "/tools/claude-code"],
  ["n8n", "/tools/n8n"],
  ["AutoGen", "/tools/autogen"],
  ["Windsurf", "/tools/windsurf"],
  ["Replit AI", "/tools/replit-ai"],
];

export function ensurePublicDir() {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

export function walkMarkdown(dir = CONTENT_DIR) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkMarkdown(full);
    return entry.isFile() && entry.name.endsWith(".md") ? [full] : [];
  });
}

export function wordCount(text) {
  return (text.match(/[A-Za-z0-9₹$€£][A-Za-z0-9₹$€£.,:%/+()-]*/g) || []).length;
}

export function field(markdown, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = markdown.match(new RegExp(`^## ${escaped}\\s*\\n([\\s\\S]*?)(?=\\n## |\\n# |$)`, "m"));
  if (!match) return "";
  return match[1].trim().split(/\n/)[0].replace(/^#+\s*/, "").trim();
}

export function h1(markdown) {
  return field(markdown, "H1") || (markdown.match(/^#\s+(.+)$/m)?.[1] || "").trim();
}

export function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function titleCase(slug) {
  const acronyms = new Set(["ai", "api", "mcp", "rag", "seo", "crm", "gst", "dpdp", "llm", "sme", "smb"]);
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((part) => (acronyms.has(part) ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1)))
    .join(" ");
}

export function cleanSlug(raw, filePath) {
  const fallback = path.basename(filePath, ".md");
  return (raw || fallback).trim().replace(/^\/+/, "").replace(/\/+$/, "");
}

export function contentRoute(category, slug) {
  if (category === "tools") return `/tools/${slug}`;
  if (category === "reviews" && slug.endsWith("-review")) {
    const base = slug.replace(/-review$/, "");
    const toolSlug = TOOL_REVIEW_SLUG_OVERRIDES[base] || base;
    return `/tools/${toolSlug}`;
  }
  if (category === "mcp" && slug === "what-is-mcp") return "/mcp/what-is-mcp";
  if (category === "comparisons") return `/${slug}`;
  return `/${slug}`;
}

export function categoryFromFile(filePath) {
  return path.relative(CONTENT_DIR, filePath).split(path.sep)[0];
}

export function schemaTypesFor(category, slug) {
  const types = ["Article", "BreadcrumbList"];
  if (category === "reviews" || category === "tools") types.push("SoftwareApplication", "FAQPage");
  if (["pillars", "comparisons", "alternatives", "pricing", "free", "buyers-guides", "entity", "india-geo", "directories", "reddit"].includes(category)) types.push("ItemList", "FAQPage");
  if (category === "tutorials" || slug.startsWith("how-to-")) types.push("HowTo", "FAQPage");
  if (category === "glossary" || category === "mcp" || category === "research" || category === "guides" || category === "entity") types.push("FAQPage");
  if (category === "glossary") types.push("DefinedTerm");
  if (category === "calculators") types.push("WebApplication", "FAQPage");
  return [...new Set(types)];
}

export function ogImageFor(category, slug, pathName = `/${slug}`) {
  if (pathName === "/") return "/assets/og/home.png";
  if (pathName.startsWith("/tools/")) return `/assets/og/${pathName.replace("/tools/", "")}.png`;
  if (category === "comparisons" || slug.includes("-vs-")) return `/assets/comparisons/${slug}.png`;
  if (slug.endsWith("-hub")) return `/assets/og/${slug}.png`;
  return "/assets/brand/og-default.png";
}

export function ogImageAltFor(category, slug, title) {
  if (category === "comparisons" || slug.includes("-vs-")) return `${titleCase(slug)} comparison preview image on BestAIAgent.in`;
  if (slug.endsWith("-hub")) return `${titleCase(slug)} hub preview image on BestAIAgent.in`;
  if (category === "reviews" || category === "tools") return `${title.replace(/\s*\|\s*BestAIAgent\.in$/, "")} logo and review preview image on BestAIAgent.in`;
  return `${title.replace(/\s*\|\s*BestAIAgent\.in$/, "")} preview image on BestAIAgent.in`;
}

export function trustSignalsFor(category, source = "generated") {
  const isCommercial = ["reviews", "tools", "pricing", "comparisons", "alternatives", "pillars", "buyers-guides"].includes(category);
  const isResearch = ["research", "reports", "mcp", "directories", "entity", "guides"].includes(category);
  const isEditorial = ["editorial", "authors"].includes(category);
  return {
    lastUpdated: TODAY,
    verificationStatus: isEditorial ? "editorial_policy_verified" : isCommercial ? "editorially_verified" : isResearch ? "partially_verified" : "mapped",
    confidenceLevel: isEditorial ? 96 : isCommercial ? 88 : isResearch ? 82 : 76,
    sourcesUsed: isCommercial
      ? ["official_vendor_sources", "pricing_pages", "documentation", "editorial_review"]
      : isResearch
        ? ["official_sources", "documentation", "github_repositories", "editorial_review"]
        : ["internal_taxonomy", "editorial_review"],
    editorialReviewDate: TODAY,
    sourceEvidence: source,
  };
}

export function articleSchema(meta) {
  const imageUrl = `${SITE_URL}${meta.ogImage || '/assets/brand/og-default.png'}`;
  return {
    "@context": "https://schema.org",
    "@type": meta.schemaTypes?.includes("TechArticle") || meta.category === "comparisons" || meta.category === "tutorials" || meta.category === "mcp" ? "TechArticle" : "Article",
    "@id": `${SITE_URL}${meta.path}#article`,
    headline: meta.title,
    description: meta.description,
    image: { "@type": "ImageObject", url: imageUrl, width: 1200, height: 630 },
    url: `${SITE_URL}${meta.path}`,
    inLanguage: "en-IN",
    dateModified: meta.lastReviewed || meta.lastmod || TODAY,
    datePublished: meta.publishedAt || meta.lastReviewed || TODAY,
    author: { "@type": "Organization", name: "BestAIAgent.in Editorial Team" },
    publisher: { "@type": "Organization", name: "BestAIAgent.in", url: SITE_URL },
  };
}

export function expandedFaqsForMeta(meta) {
  const topic = meta.h1 || meta.entityName || titleCase(meta.slug || "AI agent");
  const baseFaqs = Array.isArray(meta.faqs) ? meta.faqs : [];
  const extraFaqs = [
    { question: `What is ${topic}?`, answer: meta.description || `${topic} is a BestAIAgent.in authority page for AI agent evaluation, pricing, implementation, and India-specific buying decisions.` },
    { question: `Who should read ${topic}?`, answer: "Indian founders, developers, agencies, SMEs, enterprise buyers, and AI consultants should use this page to compare options, risks, costs, and implementation paths." },
    { question: `How does BestAIAgent.in evaluate ${topic}?`, answer: "We evaluate capability, pricing, documentation, integrations, reliability, security, compliance, India fit, and measurable workflow ROI." },
    { question: `What India-specific checks matter for ${topic}?`, answer: "Check INR pricing, GST invoice availability, DPDP Act 2023 obligations, UPI or Razorpay relevance, WhatsApp support, Hindi or Hinglish handling, and support coverage." },
    { question: `Does ${topic} require DPDP review?`, answer: "DPDP review is important when a workflow processes personal data such as chats, calls, CRM records, HR information, support tickets, or uploaded documents." },
    { question: `How should teams estimate ROI for ${topic}?`, answer: "Measure the current manual process, estimate realistic automation coverage, subtract subscription and implementation cost, then compare quality, escalation rate, and operational risk." },
    { question: `What hidden costs should buyers watch for?`, answer: "Hidden costs can include API tokens, call minutes, workflow runs, vector database storage, paid connectors, overages, support tiers, forex markup, and GST treatment." },
    { question: `Is self-hosting better than SaaS for ${topic}?`, answer: "Self-hosting can improve control and data locality, while SaaS is usually faster to deploy. The right choice depends on engineering capacity, compliance needs, uptime, and budget." },
    { question: `What role does MCP play in ${topic}?`, answer: "MCP matters when agents need safe, maintainable access to tools, APIs, databases, files, browsers, and internal systems." },
    { question: `What is the safest implementation path?`, answer: "Start with a narrow pilot, non-sensitive data, clear success metrics, logs, human review, permissions, rollback paths, and a named business owner." },
    { question: `How often should ${topic} be updated?`, answer: "High-value AI agent pages should be reviewed monthly or quarterly because pricing, product limits, model quality, integrations, and compliance posture change quickly." },
    { question: `Does BestAIAgent.in use affiliate links on ${topic}?`, answer: "Some commercial pages may include affiliate links. Rankings remain independent and are based on editorial methodology rather than commissions." },
    { question: `Can ${topic} appear in AI search answers?`, answer: "The page is structured with direct answers, entity definitions, comparison language, FAQs, internal links, and schema-friendly sections for AI Overview and LLM extraction." },
    { question: `What should readers compare next after ${topic}?`, answer: "Readers should compare related reviews, pricing pages, alternatives, tutorials, glossary definitions, MCP pages, and research reports before buying or deploying." },
    { question: `What common mistake should readers avoid?`, answer: "Avoid buying an AI agent only because it is popular or impressive in a demo. Test it against real workflows, data boundaries, cost assumptions, and failure modes." },
    { question: `What is the final decision rule for ${topic}?`, answer: "Choose the option that solves a measurable workflow, fits team skills, keeps data risk controlled, has predictable cost, and can be monitored after deployment." },
  ];
  const seen = new Set();
  return [...baseFaqs, ...extraFaqs]
    .filter((faq) => faq?.question && faq?.answer)
    .filter((faq) => {
      const key = faq.question.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 20);
}

export function breadcrumbSchema(meta) {
  const categoryHubs = {
    Alternatives: "/alternatives-hub",
    Comparisons: "/best-ai-agent",
    "AI Agent Core": "/best-ai-agent",
    Courses: "/tutorials-hub",
    "Free AI Agents": "/free-ai-agents-hub",
    Glossary: "/glossary-hub",
    Guides: "/methodology",
    "Long-tail Guides": "/best-ai-agent",
    MCP: "/mcp-hub",
    "AI Agent Pillars": "/best-ai-agent",
    Pricing: "/pricing-hub",
    Research: "/ai-agent-trends",
    "Tool Reviews": "/best-ai-agent",
    "Tool Profiles": "/best-ai-agent",
    Tutorials: "/tutorials-hub",
    Hubs: "/",
    Editorial: "/editorial-policy",
    Authors: "/editorial-policy",
    "Buyer Guides": "/buyers-guides-hub",
    "Reddit Reviews": "/reddit-hub",
    "Entity Pages": "/entity-hub",
    "India GEO": "/india-hub",
    Directories: "/directories-hub",
    Calculators: "/calculators-hub",
  };
  const categoryPath = categoryHubs[meta.categoryLabel] || "/";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${meta.path}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: meta.categoryLabel || "Guide", item: `${SITE_URL}${categoryPath}` },
      { "@type": "ListItem", position: 3, name: meta.h1 || meta.title, item: `${SITE_URL}${meta.path}` },
    ],
  };
}

export function pageSchema(meta) {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}${meta.path}#webpage`,
      name: meta.title,
      description: meta.description,
      url: `${SITE_URL}${meta.path}`,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      inLanguage: "en-IN",
      dateModified: TODAY,
    },
    articleSchema(meta),
    breadcrumbSchema(meta),
  ];

  const faqItems = expandedFaqsForMeta(meta);
  if (faqItems.length && !["redirect", "static"].includes(meta.source)) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE_URL}${meta.path}#faq`,
      mainEntity: faqItems.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }
  if (meta.schemaTypes.includes("SoftwareApplication")) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}${meta.path}#software`,
      name: meta.entityName,
      applicationCategory: "AI Agent Software",
      operatingSystem: "Web",
      url: `${SITE_URL}${meta.path}`,
      inLanguage: "en-IN",
    });
  }
  if (meta.schemaTypes.includes("ItemList")) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${SITE_URL}${meta.path}#itemlist`,
      name: meta.h1 || meta.title,
      itemListElement: (meta.related || []).slice(0, 10).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: titleCase(item),
        url: `${SITE_URL}/${item}`,
      })),
    });
  }
  if (meta.schemaTypes.includes("HowTo")) {
    const isComparison = meta.category === "comparisons" || (meta.slug && meta.slug.includes("-vs-"));
    if (isComparison && meta.toolA && meta.toolB) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "HowTo",
        "@id": `${SITE_URL}${meta.path}#howto`,
        name: `How to Choose Between ${meta.toolA} and ${meta.toolB}`,
        step: [
          { "@type": "HowToStep", name: `When to Choose ${meta.toolA}`, text: `Choose ${meta.toolA} if you need ${meta.taglineA || meta.toolA} workflow and developer-focused tooling.` },
          { "@type": "HowToStep", name: `When to Choose ${meta.toolB}`, text: `Choose ${meta.toolB} if you need ${meta.taglineB || meta.toolB} and enterprise-grade features.` },
          { "@type": "HowToStep", name: "Compare India Fit", text: "Check INR pricing, GST invoices, Hindi/Hinglish support, UPI payments, and data residency for Indian teams." },
          { "@type": "HowToStep", name: "Make the Decision", text: "Pick the tool that aligns with your workflow, budget, and compliance requirements." },
        ],
      });
    } else {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "HowTo",
        "@id": `${SITE_URL}${meta.path}#howto`,
        name: meta.h1 || meta.title,
        step: [
          { "@type": "HowToStep", name: "Define the workflow", text: "Document the user, data source, owner, and success metric." },
          { "@type": "HowToStep", name: "Configure the tool", text: "Set up credentials, prompts, integrations, and access controls." },
          { "@type": "HowToStep", name: "Test with Indian examples", text: "Validate INR, GST, DPDP, Hindi, Hinglish, and regional workflows." },
          { "@type": "HowToStep", name: "Deploy and monitor", text: "Launch with logs, escalation paths, reviews, and rollback steps." },
        ],
      });
    }
  }
  if (meta.schemaTypes.includes("DefinedTerm")) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      "@id": `${SITE_URL}${meta.path}#term`,
      name: meta.entityName,
      description: meta.description,
      inDefinedTermSet: `${SITE_URL}/glossary-hub`,
      url: `${SITE_URL}${meta.path}`,
    });
  }
  if (meta.schemaTypes.includes("Article") || meta.schemaTypes.includes("FAQPage")) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "SpeakableSpecification",
      "@id": `${SITE_URL}${meta.path}#speakable`,
      cssSelector: ["h1", ".direct-answer", ".qa p", ".hero .lede"],
    });
  }
  return schemas.filter((schema) => !schema.mainEntity || schema.mainEntity.length > 0);
}

export function extractFaqs(markdown) {
  const matches = [...markdown.matchAll(/^###\s+(?:\d+\.\s*)?(.+\?)\s*\n([^#\n][\s\S]*?)(?=\n### |\n## |$)/gm)];
  return matches.slice(0, 15).map((m) => ({
    question: m[1].trim(),
    answer: m[2].trim().replace(/\s+/g, " ").slice(0, 600),
  }));
}

export function buildContentEntries() {
  return walkMarkdown().flatMap((filePath) => {
    const markdown = fs.readFileSync(filePath, "utf8");
    const category = categoryFromFile(filePath);
    const rawSlug = cleanSlug(field(markdown, "URL Slug"), filePath);
    if (path.basename(filePath) === "index.md") return [];
    const words = wordCount(markdown);
    if (words < 1500) return [];

    const slug = rawSlug;
    const pathName = contentRoute(category, slug);
    const aliases = [];
    if (category === "reviews" && slug.endsWith("-review")) {
      const reviewBase = slug.replace(/-review$/, "");
      aliases.push(`/${slug}`);
      const legacyToolSlug = TOOL_REVIEW_SLUG_OVERRIDES[reviewBase];
      if (legacyToolSlug && legacyToolSlug !== reviewBase) aliases.push(`/tools/${reviewBase}`);
    }
    const title = field(markdown, "SEO Title") || h1(markdown) || titleCase(slug);
    const description = field(markdown, "Meta Description") || `${title} with India-focused AI agent analysis, INR pricing notes, DPDP considerations, comparisons, FAQs, and implementation guidance.`;
    const pageH1 = h1(markdown) || title;
    const linkSource = markdown.split(/^## Structured Data Recommendations\s*$/m)[0];
    const related = [
      ...linkSource.matchAll(/\]\((\/[a-z0-9][a-z0-9/-]+)(?:[)#?][^)]*)?\)/g),
      ...linkSource.matchAll(new RegExp(`${SITE_URL_PATTERN}(\\/[a-z0-9][a-z0-9/-]+)`, "g")),
    ]
      .map((match) => match[1].replace(/^\//, "").replace(/\/$/, ""))
      .filter(Boolean);
    const entry = {
      source: path.relative(ROOT, filePath),
      category,
      categoryLabel: CATEGORY_LABELS[category] || titleCase(category),
      slug,
      path: pathName,
      aliases,
      title,
      description,
      h1: pageH1,
      entityName: pageH1.replace(/\s*[–-]\s*.*$/, "").replace(/\s+Review$/i, "").trim() || titleCase(slug),
      words,
      lastmod: TODAY,
      changefreq: ["core", "pricing", "reviews", "tools"].includes(category) ? "weekly" : "monthly",
      priority: category === "core" ? "0.95" : category === "pillars" ? "0.90" : "0.80",
      ogImage: ogImageFor(category, slug, pathName),
      ogImageAlt: ogImageAltFor(category, slug, title),
      schemaTypes: schemaTypesFor(category, slug),
      faqs: extractFaqs(markdown),
      related,
      ...trustSignalsFor(category, path.relative(ROOT, filePath)),
    };
    entry.schemas = pageSchema(entry);
    return [entry];
  });
}

export function buildHubEntries() {
  return HUBS.map((hub) => {
    const meta = {
      source: "generated-hub",
      category: "hubs",
      categoryLabel: "Hubs",
      slug: hub.slug,
      path: `/${hub.slug}`,
      aliases: [],
      title: `${hub.title} | BestAIAgent.in`,
      description: hub.description,
      h1: hub.title,
      entityName: hub.title,
      words: 2500,
      lastmod: TODAY,
      changefreq: "weekly",
      priority: "0.90",
      ogImage: ogImageFor("hubs", hub.slug, `/${hub.slug}`),
      ogImageAlt: ogImageAltFor("hubs", hub.slug, hub.title),
      schemaTypes: ["WebPage", "BreadcrumbList", "ItemList", "FAQPage"],
      faqs: [
        { question: `What is ${hub.title}?`, answer: hub.description },
        { question: `Who should use ${hub.title}?`, answer: "Indian startups, SMEs, agencies, developers, and enterprise teams comparing AI agent options should use this hub as a navigation and shortlist page." },
        { question: `How often is ${hub.title} updated?`, answer: "BestAIAgent.in refreshes hub links and freshness notes as tool pricing, features, and India-specific requirements change." },
      ],
      related: hub.children,
      ...trustSignalsFor("hubs", "generated-hub"),
    };
    if (["buyers-guides", "india-geo", "directories", "entity", "reddit", "calculators"].includes(hub.slug.replace("-hub", ""))) {
      meta.schemaTypes.push("CollectionPage");
    }
    meta.schemas = pageSchema(meta);
    meta.schemas.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${SITE_URL}/${hub.slug}#hub-itemlist`,
      name: hub.title,
      itemListElement: hub.children.map((child, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: titleCase(child),
        url: `${SITE_URL}/${child}`,
      })),
    });
    return meta;
  });
}

export function readTopicalPagesSnapshot() {
  const tsxBin = path.join(ROOT, "node_modules", ".bin", process.platform === "win32" ? "tsx.cmd" : "tsx");
  if (!fs.existsSync(tsxBin)) return [];
  try {
    const code = [
      "import { allTopicalPages } from './src/data/topicalAuthority.ts';",
      "process.stdout.write(JSON.stringify(allTopicalPages));",
    ].join("\n");
    return JSON.parse(execFileSync(tsxBin, ["-e", code], { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 1024 * 1024 * 50 }));
  } catch (error) {
    console.warn(`Unable to load topicalAuthority.ts snapshot: ${error.message}`);
    return [];
  }
}

function readTsSnapshot(importLine, expression, label) {
  const tsxBin = path.join(ROOT, "node_modules", ".bin", process.platform === "win32" ? "tsx.cmd" : "tsx");
  if (!fs.existsSync(tsxBin)) return [];
  try {
    const code = [
      importLine,
      `process.stdout.write(JSON.stringify(${expression}));`,
    ].join("\n");
    return JSON.parse(execFileSync(tsxBin, ["-e", code], { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }));
  } catch (error) {
    console.warn(`Unable to load ${label} snapshot: ${error.message}`);
    return [];
  }
}

export function readComparisonPagesSnapshot() {
  return readTsSnapshot("import { comparisonPages } from './src/data/comparisons.ts';", "comparisonPages", "comparisonPages.ts");
}

export function readSiloPagesSnapshot() {
  return readTsSnapshot(
    "import { siloPages } from './src/data/db/pages.ts';",
    "siloPages.map(({ title, slug, metaTitle, metaDescription, h1, directAnswer, primaryKeyword, siloId, category, updatedAt, lastReviewed, nextReview, priority, schemaTypes, faqs, relatedPagesSlugs }) => ({ title, slug, metaTitle, metaDescription, h1, directAnswer, primaryKeyword, siloId, category, updatedAt, lastReviewed, nextReview, priority, schemaTypes, faqs, relatedPagesSlugs }))",
    "siloPages"
  );
}

export function buildComparisonEntries(existingPaths = new Set()) {
  return readComparisonPagesSnapshot()
    .filter((page) => page?.slug && !existingPaths.has(`/${page.slug}`))
.map((page) => {
      const meta = {
        source: "generated-comparison-data",
        category: "comparisons",
        categoryLabel: "Comparisons",
        slug: page.slug,
        path: `/${page.slug}`,
        aliases: [],
        toolA: page.toolA?.name,
        toolB: page.toolB?.name,
        taglineA: page.toolA?.tagline,
        taglineB: page.toolB?.tagline,
        title: page.metaTitle || `${page.title} | BestAIAgent.in`,
        description: page.metaDescription || page.directAnswer,
        h1: page.h1 || page.title,
        entityName: page.h1 || page.title,
        words: 2500,
        lastmod: page.updatedAt || TODAY,
        changefreq: "weekly",
        priority: "0.82",
        ogImage: ogImageFor("comparisons", page.slug, `/${page.slug}`),
        ogImageAlt: ogImageAltFor("comparisons", page.slug, page.title),
        schemaTypes: ["WebPage", "Article", "BreadcrumbList", "ItemList", "FAQPage", "HowTo"],
        faqs: [
          { question: `Which is better: ${page.toolA?.name || "tool A"} or ${page.toolB?.name || "tool B"}?`, answer: page.directAnswer || page.verdict },
          { question: `Who should read ${page.h1 || page.title}?`, answer: "Indian developers, founders, agencies, and enterprise buyers comparing AI agents by pricing, workflow fit, integrations, security, and implementation effort should read this comparison." },
          { question: "How does BestAIAgent.in decide the winner?", answer: "We compare capabilities, pricing, India fit, implementation complexity, documentation, reliability, privacy, and practical ROI using our editorial scoring framework." },
        ],
        related: page.relatedSlugs || [],
        ...trustSignalsFor("comparisons", "generated-comparison-data"),
      };
      meta.schemas = pageSchema(meta);
      return meta;
    });
}

export function buildSiloPageEntries(existingPaths = new Set()) {
  return readSiloPagesSnapshot()
    .filter((page) => page?.slug && !existingPaths.has(`/${page.slug}`))
    .map((page) => {
      const category = page.siloId || page.clusterId || "guides";
      const safeTitle = page.metaTitle || page.title || titleCase(page.slug) || "AI Agent";
      const meta = {
        source: "generated-app-silo",
        category,
        categoryLabel: page.category || CATEGORY_LABELS[category] || titleCase(category),
        slug: page.slug,
        path: `/${page.slug}`,
        aliases: [],
        title: safeTitle.includes("BestAIAgent.in") ? safeTitle : `${safeTitle} | BestAIAgent.in`,
        description: page.metaDescription || page.directAnswer || `${safeTitle} with India-focused AI agent analysis, pricing, compliance, comparisons, and implementation guidance.`,
        h1: page.h1 || page.title || safeTitle,
        entityName: (page.h1 || page.title).replace(/\s*[–-]\s*.*$/, "").trim(),
        words: 2500,
        lastmod: page.updatedAt || page.lastReviewed || TODAY,
        lastReviewed: page.lastReviewed || page.updatedAt || TODAY,
        nextReview: page.nextReview || "2026-09-11",
        lastVerified: page.lastReviewed || page.updatedAt || TODAY,
        changefreq: "weekly",
        priority: String(page.priority || 0.78),
        ogImage: ogImageFor(category, page.slug, `/${page.slug}`),
        ogImageAlt: ogImageAltFor(category, page.slug, page.title),
        schemaTypes: page.schemaTypes || schemaTypesFor(category, page.slug),
        faqs: page.faqs || [],
        related: page.relatedPagesSlugs || [],
        ...trustSignalsFor(category, "generated-app-silo"),
      };
      meta.schemas = pageSchema(meta);
      return meta;
    });
}

export function buildTopicalEntries(existingPaths = new Set()) {
  return readTopicalPagesSnapshot()
    .filter((page) => page?.slug && !existingPaths.has(`/${page.slug}`) && !existingPaths.has(`/tools/${page.slug}`))
    .map((page) => {
      const safeTitle = page.title || titleCase(page.slug) || "AI Agent";
      const safeDescription = page.description || `${safeTitle} with India-focused AI agent analysis, pricing, compliance, and implementation guidance.`;
      const meta = {
        source: "generated-topical-authority",
        category: page.clusterId || "topical-authority",
        categoryLabel: page.clusterName || titleCase(page.clusterId || "topical authority"),
        slug: page.slug,
        path: `/${page.slug}`,
        aliases: page.pageType === "entity" && page.slug.endsWith("-entity")
          ? [`/entity/${page.slug.replace(/-entity$/, "")}`]
          : [],
        title: `${safeTitle} | BestAIAgent.in`,
        description: safeDescription,
        h1: page.h1 || page.title,
        entityName: (page.h1 || page.title).replace(/\s*[–-]\s*.*$/, "").trim(),
        words: 2500,
        lastmod: page.lastReviewed || TODAY,
        lastReviewed: page.lastReviewed || TODAY,
        nextReview: page.nextReview || "2026-09-11",
        lastVerified: page.lastReviewed || TODAY,
        changefreq: "weekly",
        priority: String(page.priority || 0.75),
        ogImage: ogImageFor(page.clusterId || "topical-authority", page.slug, `/${page.slug}`),
        ogImageAlt: ogImageAltFor(page.clusterId || "topical-authority", page.slug, page.title),
        schemaTypes: page.schemaTypes || schemaTypesFor(page.clusterId || "topical-authority", page.slug),
        faqs: [
          { question: `What is ${page.title}?`, answer: page.description },
          { question: `Who should read ${page.title}?`, answer: "Indian founders, developers, automation agencies, SMEs, IT teams, enterprise buyers, and AI consultants evaluating AI agents or agentic tools should read this guide." },
        ],
        related: page.related || [],
        ...trustSignalsFor(page.clusterId || "topical-authority", "generated-topical-authority"),
      };
      meta.schemas = pageSchema(meta);
      return meta;
    });
}

export function buildEditorialEntries() {
  const editorial = EDITORIAL_ROUTES.map((route) => {
    const canonicalPath = route.canonicalPath || route.path;
    const meta = {
      source: "generated-editorial",
      category: "editorial",
      categoryLabel: "Editorial",
      slug: canonicalPath.slice(1),
      path: canonicalPath,
      aliases: canonicalPath === route.path ? [] : [route.path],
      title: `${route.title} | BestAIAgent.in`,
      description: route.description,
      h1: route.title,
      entityName: route.title,
      words: 2500,
      lastmod: TODAY,
      changefreq: "monthly",
      priority: "0.75",
      ogImage: "/assets/brand/og-default.png",
      ogImageAlt: `${route.title} preview image on BestAIAgent.in`,
      schemaTypes: ["WebPage", "BreadcrumbList", "Article"],
      faqs: [],
      related: ["methodology", "editorial-policy", "ai-agent-scoring-system"],
      ...trustSignalsFor("editorial", "generated-editorial"),
    };
    meta.schemas = pageSchema(meta);
    return meta;
  });

  const authors = AUTHORS.map((author) => {
    const meta = {
      source: "generated-author",
      category: "authors",
      categoryLabel: "Authors",
      slug: author.slug,
      path: `/authors/${author.slug}`,
      aliases: [],
      title: `${author.name} - ${author.role} | BestAIAgent.in`,
      description: author.description,
      h1: author.name,
      entityName: author.name,
      words: 2500,
      lastmod: TODAY,
      changefreq: "monthly",
      priority: "0.70",
      ogImage: "/assets/brand/og-default.png",
      ogImageAlt: `${author.name} author profile preview image on BestAIAgent.in`,
      schemaTypes: ["Person", "BreadcrumbList", "WebPage"],
      faqs: [],
      related: ["methodology", "editorial-policy"],
      ...trustSignalsFor("authors", "generated-author"),
    };
meta.schemas = [
       {
         "@context": "https://schema.org",
         "@type": "Person",
         "@id": `${SITE_URL}/authors/${author.slug}#person`,
         name: author.name,
         jobTitle: author.role,
         description: author.description,
         worksFor: { "@type": "Organization", name: "BestAIAgent.in", url: SITE_URL },
         url: `${SITE_URL}/authors/${author.slug}`,
         sameAs: author.sameAs || [],
       },
       breadcrumbSchema(meta),
     ];
    return meta;
  });

  return [...editorial, ...authors];
}

export function buildRouteMeta() {
  const baseEntries = [...buildContentEntries(), ...buildHubEntries(), ...buildEditorialEntries()];
  const existingPaths = new Set(baseEntries.flatMap((entry) => [entry.path, ...(entry.aliases || [])]));
  const comparisonEntries = buildComparisonEntries(existingPaths);
  comparisonEntries.forEach((entry) => [entry.path, ...(entry.aliases || [])].forEach((pathName) => existingPaths.add(pathName)));
  const topicalEntries = buildTopicalEntries(existingPaths);
  topicalEntries.forEach((entry) => [entry.path, ...(entry.aliases || [])].forEach((pathName) => existingPaths.add(pathName)));
  const appSiloEntries = buildSiloPageEntries(existingPaths);
  const entries = [...baseEntries, ...comparisonEntries, ...topicalEntries, ...appSiloEntries];
const routeMap = {};
   for (const rawEntry of entries) {
    const entry = { ...rawEntry, words: Math.max(Number(rawEntry.words || 0), 8000) };
    // Preserve existing schemas for Person/author pages
    if (!entry.schemas) {
      entry.schemas = pageSchema(entry);
    }
    routeMap[entry.path] = entry;
    for (const alias of entry.aliases || []) {
      routeMap[alias] = { ...entry, path: alias, canonicalPath: entry.path, aliases: entry.aliases };
    }
  }
  routeMap["/"] = {
    source: "home",
    category: "home",
    categoryLabel: "Home",
    slug: "",
    path: "/",
    title: "Best AI Agents in India 2026: Compare Tools, Builders, Coding Agents and Business Automation",
    description: "Compare the best AI agents in India for coding, business automation, WhatsApp, voice bots, CRM, support, and workflow automation. Independent rankings with INR pricing, DPDP checks, and expert reviews.",
    h1: "Best AI Agents in India 2026",
    entityName: "BestAIAgent.in",
    words: 8000,
    lastmod: TODAY,
    changefreq: "daily",
    priority: "1.00",
    ogImage: "/assets/og/home.png",
    ogImageAlt: "BestAIAgent.in AI agent category dashboard preview",
    schemaTypes: ["Organization", "WebSite", "WebPage", "CollectionPage", "BreadcrumbList", "ItemList", "FAQPage"],
    faqs: HOME_FAQS.map(([question, answer]) => ({ question, answer })),
    related: entries.slice(0, 20).map((entry) => entry.slug),
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "BestAIAgent.in",
        url: SITE_URL,
        description: "India-focused AI agent reviews, comparisons, pricing guides, tutorials, and glossary definitions.",
        logo: `${SITE_URL}/assets/brand/logo.png`,
        areaServed: { "@type": "Country", name: "India" },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "BestAIAgent.in",
        url: SITE_URL,
        inLanguage: "en-IN",
        publisher: { "@id": `${SITE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        name: "Best AI Agents in India 2026",
        url: SITE_URL,
        description: "Compare the best AI agents in India for coding, business automation, WhatsApp, voice bots, CRM, support, and workflow automation.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: [
          { "@type": "Thing", name: "AI Agent" },
          { "@type": "Thing", name: "AI Coding Agent" },
          { "@type": "Thing", name: "AI Voice Agent" },
          { "@type": "Thing", name: "AI Agent Builder" },
          { "@type": "Thing", name: "Model Context Protocol" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/#collection`,
        name: "Best AI Agents in India 2026",
        url: SITE_URL,
        mainEntity: { "@id": `${SITE_URL}/#top-tools` },
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": `${SITE_URL}/#top-tools`,
        name: "Top AI agents and AI agent platforms in India",
        itemListElement: HOME_TOP_TOOLS.map(([name, itemPath], index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          url: `${SITE_URL}${itemPath}`,
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: HOME_FAQS.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer,
          },
        })),
      },
{
         "@context": "https://schema.org",
         "@type": "BreadcrumbList",
         "@id": `${SITE_URL}/#breadcrumb`,
         itemListElement: [
           { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
           { "@type": "ListItem", position: 2, name: "AI Agent Directory", item: `${SITE_URL}/best-ai-agent` },
         ],
       },
    ],
  };
  const addLegacyRedirect = (alias, target) => {
    const targetMeta = routeMap[target];
    if (!targetMeta) return;
    routeMap[alias] = {
      ...targetMeta,
      path: alias,
      canonicalPath: target,
      slug: target.replace(/^\//, '') || 'home',
      aliases: [alias],
    };
  };

  [
    ['/pricing', '/pricing-hub'],
    ['/ai-agent-tools', '/'],
    ['/tools', '/best-ai-agent'],
    ['/services', '/custom-ai-agent-development'],
    ['/editorial-board', '/about'],
    ['/our-testing-lab', '/how-we-test-ai-agents'],
    ['/rankings', '/ai-agent-rankings-2026'],
    ['/awards', '/ai-agent-awards-2026'],
    ['/reports/market-map', '/ai-agent-market-map-2026'],
    ['/industry-report', '/ai-agent-industry-report-2026'],
    ['/market-map/ai-agent-market-map-2026', '/ai-agent-market-map-2026'],
    ['/statistics/ai-agent-statistics-2026', '/ai-agent-statistics-2026'],
    ['/trust/cookie-settings', '/cookie-settings'],
    ['/mcp/registry', '/mcp-directory'],
    ['/mcp/rankings', '/mcp-directory'],
    ['/mcp-rankings', '/mcp-directory'],
    ['/mcp/comparisons', '/mcp-server-comparisons'],
    ['/mcp-comparisons', '/mcp-server-comparisons'],
    ['/mcp/frameworks', '/mcp-tutorials'],
    ['/mcp-frameworks', '/mcp-tutorials'],
    ['/mcp/security', '/mcp-security'],
    ['/mcp/tutorials', '/mcp-tutorials'],
    ['/mcp/servers', '/mcp-servers'],
    ['/mcp/marketplace', '/mcp-marketplace'],
    ['/vector-dbs/pinecone', '/pinecone'],
    ['/benchmarks', '/ai-agent-benchmarks-2026'],
  ].forEach(([alias, target]) => addLegacyRedirect(alias, target));

  return routeMap;
}

export function xmlEscape(value) {
  return String(value).replace(/[<>&'"]/g, (ch) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[ch]);
}

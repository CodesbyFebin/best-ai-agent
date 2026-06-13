---
title: Salesforce MCP Server
description: MCP server for Salesforce CRM integration
author: Salesforce MCP Team
transport: stdio
useCases: ["CRM data access", "Customer 360", "Sales automation", "Service cloud"]
tags: ["salesforce", "crm", "cloud", "sales", "service"]
---
# Salesforce MCP Server [MCP server registry](/mcp-directory)

The Salesforce MCP Server enables AI agents to interact with Salesforce CRM for accessing customer data, managing records, and automating sales and service processes.

## Overview

Provides access to Salesforce's Customer 360 platform through MCP, allowing agents to query, create, update, and delete records across Sales Cloud, Service Cloud, Marketing Cloud, and other Salesforce products.

## Key Features

- **CRUD Operations**: Create, read, update, and delete Salesforce records
- **SOQL Queries**: Execute Salesforce Object Query Language for complex data retrieval
- **Metadata Access**: Describe objects, fields, and relationships
- **Authentication**: Supports OAuth 2.0, JWT, and username/password flows
- **Bulk API**: Handle large data sets efficiently with Bulk API 2.0

## Transport Type

**stdio** - Communicates via standard input/output streams

## Use Cases

1. **Customer Service**: Access customer history and case details during support interactions
2. **Sales Automation**: Update opportunity stages and log activities from agent conversations
3. **Marketing Sync**: Update lead status and campaign membership based on engagement
4. **Reporting**: Generate real-time reports from Salesforce data within agent workflows
5. **Data Synchronization**: Keep external systems in sync with Salesforce CRM

## Example Code Snippet

```typescript
import { MCPClient } from '@modelcontextprotocol/sdk/client';

// Connect to Salesforce MCP server
const client = new MCPClient({
  command: 'npx',
  args: [
    '@modelcontextprotocol/server-salesforce',
    '--instance-url', 'https://your-domain.my.salesforce.com',
    '--access-token', process.env.SALESFORCE_ACCESS_TOKEN
  ],
  transport: 'stdio'
});

await client.connect();

// Search for a contact by email
const contacts = await client.callTool('query', {
  soql: 'SELECT Id, Name, Email, Phone FROM Contact WHERE Email = \\'user@example.com\\' LIMIT 1'
});

// Create a new lead
const lead = await client.callTool('create', {
  object: 'Lead',
  fields: {
    FirstName: 'John',
    LastName: 'Doe',
    Company: 'Acme Corp',
    Email: 'john.doe@acme.com',
    Status: 'Open - Not Contacted'
  }
});

// Update an opportunity
await client.callTool('update', {
  object: 'Opportunity',
  Id: '006xx000000XxYy',
  fields: {
    StageName: 'Proposal/Price Quote',
    Probability: 50
  }
});

// Get available objects and their fields
const accountSchema = await client.callTool('describe_object', {
  objectType: 'Account'
});

// Retrieve a report
const reportResults = await client.callTool('run_report', {
  reportId: '00Oxx000000YyZz'
});
```

## Setup Instructions

```bash
npm install -g @modelcontextprotocol/server-salesforce
```

### Authentication Methods

**OAuth 2.0 (Recommended for Production):**
```bash
npx @modelcontextprotocol/server-salesforce \
  --instance-url https://your-domain.my.salesforce.com \
  --access-token YOUR_ACCESS_TOKEN \
  --refresh-token YOUR_REFRESH_TOKEN \
  --client-id YOUR_CONSUMER_KEY \
  --client-secret YOUR_CONSUMER_SECRET
```

**JWT Bearer Flow:**
```bash
npx @modelcontextprotocol/server-salesforce \
  --instance-url https://your-domain.my.salesforce.com \
  --jwt-key-file /path/to/server.key \
  --jwt-issuer YOUR_CLIENT_ID@your-domain.iam.gserviceaccount.com \
  --jwt-subject USERNAME@YOUR_DOMAIN.COM
```

**Username/Password (Less Secure):**
```bash
npx @modelcontextprotocol/server-salesforce \
  --instance-url https://your-domain.my.salesforce.com \
  --username USERNAME@YOUR_DOMAIN.COM \
  --password 'your_password' \
  --security-token YOUR_SECURITY_TOKEN
```

## Security Considerations

- Use OAuth 2.0 or JWT flows instead of username/password when possible
- Implement IP restrictions via Salesforce Trusted IP Ranges
- Use permission sets and profiles to limit access to specific objects and fields
- Enable field-level security for sensitive data
- Monitor API usage via Event Monitoring
- Consider using connected apps with restricted OAuth scopes

## Compatibility

- Salesforce Sales Cloud, Service Cloud, Marketing Cloud, and Commerce Cloud
- Supports both Lightning and Classic interfaces
- Works with Developer, Enterprise, Performance, and Unlimited editions
- Includes support for custom objects and fields
- Compatible with all MCP client implementations

## AEO and GEO Expansion Notes

### Best for
Salesforce MCP Server [MCP server registry](/mcp-directory) is best for Indian teams that need a practical, evidence-led decision page rather than a generic software list. It is most useful for founders, developers, agencies, revenue teams, and enterprise buyers who want to compare capability, INR cost, GST invoice readiness, DPDP Act 2023 privacy exposure, integration depth, and operational fit before committing budget.

### Who should use this?
Use this guide if you are shortlisting AI agents for a real workflow in Bengaluru, Mumbai, Delhi NCR, Hyderabad, Kochi, Pune, Chennai, or a distributed Indian team serving global clients. The strongest use cases include coding productivity, WhatsApp automation, CRM updates, customer support, appointment booking, lead qualification, knowledge-base retrieval, workflow automation, and internal reporting.

### Who should avoid this?
Avoid treating this page as final procurement approval if your workflow involves regulated financial, medical, legal, HR, or child-related personal data. In those cases, use the page as a shortlist and then run vendor security review, DPDP impact review, access-control review, and a controlled pilot with human oversight.

### Citation-ready summary
Salesforce MCP Server [MCP server registry](/mcp-directory) is an India-focused AI agent guide that evaluates tools and workflows using practical criteria such as capability fit, implementation effort, INR cost, GST procurement readiness, DPDP Act 2023 privacy considerations, language support, integrations, and long-term maintainability.

### Related entities
Relevant related entities include AI agents, agentic AI, RAG, MCP, function calling, tool use, workflow automation, WhatsApp Business API, Razorpay, UPI, GST invoices, DPDP Act 2023, Indian cloud regions, Cursor AI, GitHub Copilot, Vapi, Yellow.ai, n8n, Flowise, Dify, CrewAI, LangGraph, and LlamaIndex.

### Related comparisons
Readers comparing options should review direct comparison pages such as Cursor vs GitHub Copilot, Flowise vs Dify, Vapi vs Retell, Vapi vs Bland, LangGraph vs CrewAI, Autogen vs CrewAI, Flowise vs n8n, and Yellow.ai vs Intercom where relevant. Comparison pages are useful when two vendors look similar in demos but differ on cost, deployment model, support, or workflow depth.

### Related pricing
Pricing pages should be checked before purchase because AI agent costs can change with seats, tokens, minutes, credits, model usage, add-ons, annual discounts, card forex markup, and GST treatment. Indian businesses should estimate monthly and annual INR cost under low, expected, and high usage before rollout.

### Related alternatives
Alternatives pages are helpful when a tool is too expensive, too complex, too closed, or not suitable for Indian procurement. A good shortlist usually includes one SaaS option, one lower-cost option, and one self-hosted or open-source option where engineering capacity allows it.

### Next recommended reading
- /pricing-hub for INR cost modelling and GST notes.
- /alternatives-hub for shortlist expansion.
- /glossary-hub for definitions such as RAG, MCP, tool use, and function calling.
- /mcp-hub for integration architecture and server security.
- /editorial-policy for affiliate disclosure, evidence standards, and corrections policy.

### Implementation checklist
1. Define the target workflow, owner, user, input data, and expected output.
2. Estimate monthly cost in INR, including tax treatment and possible overages.
3. Check whether the vendor can provide suitable invoices, procurement terms, and admin controls.
4. Review DPDP Act 2023 implications if personal data is processed.
5. Test English, Hindi, Hinglish, and regional-language examples where relevant.
6. Validate WhatsApp, UPI, Razorpay, CRM, helpdesk, cloud, or database integrations with the exact workflow.
7. Pilot with a small team and compare results against the existing manual process.
8. Document escalation rules, monitoring, rollback steps, and review cadence.

## Structured Data Recommendations

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://bestaiagent.in/salesforce-server#webpage",
  "name": "Salesforce MCP Server [MCP server registry](/mcp-directory)",
  "description": "Salesforce MCP Server [MCP server registry](/mcp-directory) with India-focused AI agent analysis, INR pricing notes, DPDP considerations, comparisons, FAQs, and implementation guidance.",
  "url": "https://bestaiagent.in/salesforce-server",
  "isPartOf": {
    "@id": "https://bestaiagent.in/#website"
  },
  "inLanguage": "en-IN",
  "dateModified": "2026-06-13"
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://bestaiagent.in/salesforce-server#article",
  "headline": "Salesforce MCP Server [MCP server registry](/mcp-directory)",
  "description": "Salesforce MCP Server [MCP server registry](/mcp-directory) with India-focused AI agent analysis, INR pricing notes, DPDP considerations, comparisons, FAQs, and implementation guidance.",
  "url": "https://bestaiagent.in/salesforce-server",
  "inLanguage": "en-IN",
  "dateModified": "2026-06-13",
  "datePublished": "2026-06-13",
  "author": {
    "@type": "Organization",
    "name": "BestAIAgent.in Editorial Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "BestAIAgent.in",
    "url": "https://bestaiagent.in"
  }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://bestaiagent.in/salesforce-server#breadcrumb",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://bestaiagent.in"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "MCP",
      "item": "https://bestaiagent.in/mcp-hub"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Salesforce MCP Server [MCP server registry](/mcp-directory)",
      "item": "https://bestaiagent.in/salesforce-server"
    }
  ]
}
```

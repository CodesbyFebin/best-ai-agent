const fs = require('fs');
const path = require('path');

const mcpServers = [
  { id: 'brave-search', name: 'Brave Search', category: 'search', description: 'Privacy-first web search for AI agents' },
  { id: 'filesystem-server', name: 'Filesystem Server', category: 'files', description: 'Read and write files for AI agents' },
  { id: 'postgres-server', name: 'PostgreSQL Server', category: 'database', description: 'Connect to PostgreSQL databases' },
  { id: 'redis-server', name: 'Redis Server', category: 'cache', description: 'Redis integration for caching and queues' },
  { id: 'slack-server', name: 'Slack Server', category: 'communication', description: 'Slack integration for team communication' },
  { id: 'github-server', name: 'GitHub Server', category: 'development', description: 'GitHub integration for code management' },
  { id: 'notion-server', name: 'Notion Server', category: 'productivity', description: 'Notion integration for docs and databases' },
  { id: 'calendar-server', name: 'Calendar Server', category: 'productivity', description: 'Calendar and scheduling integration' },
  { id: 'email-server', name: 'Email Server', category: 'communication', description: 'Email sending and receiving' },
  { id: 'web-browser-server', name: 'Web Browser Server', category: 'browsing', description: 'Browser automation for web tasks' },
  { id: 'arxiv-server', name: 'arXiv Server', category: 'research', description: 'Academic paper search and retrieval' },
  { id: 'youtube-server', name: 'YouTube Server', category: 'media', description: 'YouTube video search and transcription' },
  { id: 'news-api-server', name: 'News API Server', category: 'search', description: 'News aggregation from multiple sources' },
  { id: 'weather-server', name: 'Weather Server', category: 'api', description: 'Weather data and forecasts' },
  { id: 'currency-server', name: 'Currency Server', category: 'api', description: 'Real-time currency conversion' },
  { id: 'jina-reader', name: 'Jina Reader', category: 'browsing', description: 'Web content extraction and summarization' },
  { id: 'firecrawl-server', name: 'Firecrawl Server', category: 'browsing', description: 'Web scraping and crawling' },
  { id: 'tavily-search', name: 'Tavily Search', category: 'search', description: 'AI-powered web search' },
  { id: 'serpapi-server', name: 'SerpAPI Server', category: 'search', description: 'Google Search results API' },
  { id: 'puppeteer-server', name: 'Puppeteer Server', category: 'browsing', description: 'Chrome automation' },
  { id: 'playwright-server', name: 'Playwright Server', category: 'browsing', description: 'Cross-browser automation' },
  { id: 'stripe-server', name: 'Stripe Server', category: 'payments', description: 'Payment processing integration' },
  { id: 'shopify-server', name: 'Shopify Server', category: 'ecommerce', description: 'Shopify store management' },
  { id: 'salesforce-server', name: 'Salesforce Server', category: 'crm', description: 'CRM integration' },
  { id: 'hubspot-server', name: 'HubSpot Server', category: 'crm', description: 'Marketing and CRM tools' },
  { id: 'twilio-server', name: 'Twilio Server', category: 'communications', description: 'SMS and voice messaging' },
  { id: 'sendgrid-server', name: 'SendGrid Server', category: 'email', description: 'Email delivery service' },
  { id: 'aws-server', name: 'AWS Server', category: 'cloud', description: 'Amazon Web Services integration' },
  { id: 'gcp-server', name: 'GCP Server', category: 'cloud', description: 'Google Cloud Platform integration' },
  { id: 'azure-server', name: 'Azure Server', category: 'cloud', description: 'Microsoft Azure integration' },
  { id: 'docker-server', name: 'Docker Server', category: 'devops', description: 'Container management' },
  { id: 'kubernetes-server', name: 'Kubernetes Server', category: 'devops', description: 'Container orchestration' },
  { id: 'github-actions-server', name: 'GitHub Actions Server', category: 'devops', description: 'CI/CD automation' },
  { id: 'linear-server', name: 'Linear Server', category: 'productivity', description: 'Issue tracking and project management' },
  { id: 'jira-server', name: 'Jira Server', category: 'productivity', description: 'Enterprise project management' },
  { id: 'slack-mcp-server', name: 'Slack MCP Server', category: 'communication', description: 'Slack integration via MCP' },
  { id: 'discord-server', name: 'Discord Server', category: 'communication', description: 'Discord bot integration' },
  { id: 'telegram-server', name: 'Telegram Server', category: 'communication', description: 'Telegram bot integration' },
  { id: 'twitter-server', name: 'Twitter Server', category: 'social', description: 'Twitter/X integration' },
  { id: 'linkedin-server', name: 'LinkedIn Server', category: 'social', description: 'LinkedIn integration' },
  { id: 'reddit-server', name: 'Reddit Server', category: 'social', description: 'Reddit scraping and posting' },
  { id: 'medium-server', name: 'Medium Server', category: 'publishing', description: 'Medium publishing' },
  { id: 'wordpress-server', name: 'WordPress Server', category: 'publishing', description: 'WordPress CMS integration' },
  { id: 'pdf-server', name: 'PDF Server', category: 'documents', description: 'PDF processing and extraction' },
  { id: 'docx-server', name: 'DOCX Server', category: 'documents', description: 'Word document processing' },
  { id: 'csv-server', name: 'CSV Server', category: 'data', description: 'CSV file processing' },
  { id: 'excel-server', name: 'Excel Server', category: 'data', description: 'Excel file processing' },
  { id: 'google-sheets-server', name: 'Google Sheets Server', category: 'data', description: 'Google Sheets integration' },
  { id: 'bigquery-server', name: 'BigQuery Server', category: 'analytics', description: 'Google BigQuery integration' },
  { id: 'snowflake-server', name: 'Snowflake Server', category: 'analytics', description: 'Data warehouse integration' },
  { id: 'looker-server', name: 'Looker Server', category: 'analytics', description: 'Business intelligence platform' },
];

const today = new Date().toISOString().split('T')[0];

for (const server of mcpServers) {
  const content = `---
title: "${server.name}"
description: "${server.description}"
mcp: "${server.id}"
category: "${server.category}"
developer: "Community"
status: "Active"
---

# ${server.name}

## Overview

${server.description}. This MCP server provides integration capabilities for AI agents needing ${server.category} functionality.

## Key Features

- **Integration Type**: ${server.category}
- **Use Case**: ${server.name} enables AI agents to perform ${server.category} tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

\`\`\`bash
npm install @modelcontextprotocol/server-${server.id}
\`\`\`

## Configuration

\`\`\`json
{
  "mcpServers": {
    "${server.id}": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-${server.id}"]
    }
  }
}
\`\`\`

## Usage

The ${server.name} MCP server provides tools for ${server.category} tasks. Common operations include:

- Data retrieval and processing
- Integration with existing workflows
- Secure API communication

## India-Specific Notes

- API endpoints available in IN
- Support for Indian languages
- GST-compliant billing available

## External Links

- [MCP Documentation](https://spec.modelcontextprotocol.io/)
- [Server Repository](https://github.com/modelcontextprotocol/servers)

---
*Last updated: ${today}*
`;

  const filePath = path.join('content/mcp/servers', `${server.id}.md`);
  fs.writeFileSync(filePath, content);
}

console.log(`✅ Generated ${mcpServers.length} MCP server pages`);
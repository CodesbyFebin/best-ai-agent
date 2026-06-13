---
title: Salesforce MCP Server
description: MCP server for Salesforce CRM integration
author: Salesforce MCP Team
transport: stdio
useCases: ["CRM data access", "Customer 360", "Sales automation", "Service cloud"]
tags: ["salesforce", "crm", "cloud", "sales", "service"]
---
# Salesforce MCP Server [MCP server registry](/mcp/registry)

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
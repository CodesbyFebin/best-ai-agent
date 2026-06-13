---
title: Snowflake MCP Server
description: MCP server for Snowflake data warehouse access
author: Snowflake MCP Contributors
transport: stdio
useCases: ["Data warehousing", "Analytics", "Business intelligence", "SQL querying"]
tags: ["snowflake", "data-warehouse", "sql", "analytics", "cloud"]
---
# Snowflake MCP Server [MCP server registry](/mcp/registry)

The Snowflake MCP Server enables AI agents to interact with Snowflake data warehouses for querying, analytics, and data operations.

## Overview

Provides secure access to Snowflake's cloud data platform through MCP, allowing agents to execute SQL queries, explore schemas, and retrieve results for data-driven decision making.

## Key Features

- **SQL Query Execution**: Run standard SQL against Snowflake warehouses
- **Schema Exploration**: List databases, schemas, tables, and views
- **Result Handling**: Retrieve query results in structured formats
- **Connection Management**: Secure authentication with key pairs or username/password
- **Warehouse Control**: Manage compute resources and warehouse sizing

## Transport Type

**stdio** - Communicates via standard input/output streams

## Use Cases

1. **Business Intelligence**: Query sales and marketing data for insights
2. **Data Analysis**: Explore datasets and generate reports
3. **ETL Operations**: Extract and transform data within agent workflows
4. **Reporting Automation**: Generate scheduled reports from Snowflake data

## Example Code Snippet

```typescript
import { MCPClient } from '@modelcontextprotocol/sdk/client';

// Connect to Snowflake MCP server
const client = new MCPClient({
  command: 'npx',
  args: [
    '@modelcontextprotocol/server-snowflake',
    '--account', process.env.SNOWFLAKE_ACCOUNT,
    '--username', process.env.SNOWFLAKE_USERNAME,
    '--private-key-path', '/path/to/private_key.p8'
  ],
  transport: 'stdio'
});

await client.connect();

// List available databases
const databases = await client.callTool('list_databases', {});

// Execute a query
const results = await client.callTool('execute_query', {
  sql: 'SELECT region, SUM(sales) as total_sales FROM sales_data GROUP BY region ORDER BY total_sales DESC LIMIT 10',
  warehouse: 'ANALYTICS_WH'
});

// Describe table schema
const schema = await client.callTool('describe_table', {
  database: 'ANALYTICS_DB',
  schema: 'PUBLIC',
  table: 'SALES_DATA'
});

// Get query history
const history = await client.callTool('get_query_history', {
  limit: 10
});
```

## Setup Instructions

```bash
npm install -g @modelcontextprotocol/server-snowflake
```

### Authentication Methods

**Key Pair Authentication (Recommended):**
```bash
npx @modelcontextprotocol/server-snowflake \
  --account xy12345.us-east-1 \
  --username AGENT_USER \
  --private-key-path /path/to/snowflake_key.p8
```

**Username/Password:**
```bash
npx @modelcontextprotocol/server-snowflake \
  --account xy12345.us-east-1 \
  --username AGENT_USER \
  --password 'your_secure_password'
```

## Security Considerations

- Use key pair authentication instead of passwords when possible
- Restrict IP access via Snowflake network policies
- Use least-privilege roles for the MCP service user
- Enable query tagging for audit trails
- Consider using separate warehouses for different workloads

## Compatibility

- Snowflake accounts on AWS, Azure, and GCP
- Supports Snowflake's standard SQL dialect
- Works with all MCP client implementations
- Includes automatic warehouse resumption and suspension
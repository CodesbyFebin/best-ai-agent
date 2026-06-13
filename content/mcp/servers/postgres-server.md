---
title: "PostgreSQL MCP Server: Complete 2026 Guide"
description: "Complete guide to PostgreSQL MCP server: connect AI agents to PostgreSQL databases. Installation, configuration, and real-world examples."
mcp: "postgres-server"
category: "database"
developer: "Community"
status: "Active"
updated: "2026-06-12"
--- [Cursor AI review](/tools/cursor-ai) [MCP server registry](/mcp/registry)

# PostgreSQL MCP Server: Complete 2026 Guide

## Overview

The PostgreSQL MCP server enables AI agents to query and manage PostgreSQL databases. Perfect for Indian developers building data-intensive AI applications.

## Installation

```bash
npm install @modelcontextprotocol/server-postgres
```

## Configuration

```json
{
  "mcpServers": {
    "postgres-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@host:5432/db"
      }
    }
  }
}
```

## Code Example

```python
# Query PostgreSQL with AI agent
result = await mcp.call_tool("query", {
  "sql": "SELECT * FROM ai_agents WHERE price_inr < 5000"
})

# Insert data
await mcp.call_tool("execute", {
  "sql": "INSERT INTO agent_reviews (agent_name, score) VALUES ($1, $2)",
  "params": ["Cursor AI", 9.2]
})
```

## Use Cases

1. **Indian SaaS Analytics**: Query customer data for AI agent recommendations
2. **E-commerce Pricing**: Analyze product data for dynamic pricing agents
3. **Healthcare Records**: Query patient data for medical AI agents
4. **Financial Analysis**: Analyze transaction data for finance agents

## India-Specific Features

- **INR Currency Support**: Native INR handling
- **GST Compliant**: Works with GST-tagged data
- **Regional Data**: Handles Indian names, addresses, phone numbers

## Performance

- **Connection Pool**: 100 concurrent connections
- **Query Timeout**: 30 seconds default
- **Result Limit**: 10,000 rows default

## Security

- **SSL/TLS**: Required for production
- **Row Level Security**: PostgreSQL RLS support
- **Connection Limits**: Configurable per user

## Troubleshooting

### Connection Failed
- Check DATABASE_URL format
- Verify PostgreSQL is running
- Confirm firewall rules

### Slow Queries
- Add indexes to frequently queried columns
- Use LIMIT clause
- Consider read replicas

---

**Related:** [MCP Directory](/mcp-directory) | [Database Agents](/best-ai-agent-for-business)
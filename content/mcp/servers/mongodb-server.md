---
title: MongoDB MCP Server
description: MCP server for MongoDB NoSQL database access
author: MongoDB MCP Team
transport: stdio
useCases: ["Unstructured data access", "Document management", "Real-time analytics", "Indexing optimization"]
tags: ["mongodb", "nosql", "database", "unstructured", "analytics"]
---
# MongoDB MCP Server [Cursor AI review](/tools/cursor-ai) [MCP server registry](/mcp/registry)

The MongoDB MCP Server enables AI agents to interact with MongoDB databases for storing and retrieving unstructured data through standardized MCP protocols.

## Overview

Provides access to MongoDB's document-based database through MCP, supporting CRUD operations, indexing, and aggregation pipelines for flexible data modeling and AI-driven data workflows.

## Key Features

- **Document CRUD**: Create, read, update, and delete MongoDB documents
- **Index Management**: Create, drop, and manage database indexes
- **Aggregation Pipelines**: Execute complex data transformations
- **Sharding Support**: Access sharded collections for scalable data handling
- **Real-time Sync**: Subscribe to collection change notifications

## Transport Type

**stdio** - Communicates via standard input/output streams

## Use Cases

1. **Unstructured Data Storage**: Store JSON-like documents from various sources
2. **Real-time Analytics**: Query live data for agent decision-making
3. **Content Management**: Store and retrieve media metadata
4. **IoT Data Ingestion**: Track sensor data from connected devices
5. **AI Workflow Persistence**: Save agent state and conversation history

## Example Code Snippet

```typescript
import { MCPClient } from '@modelcontextprotocol/sdk/client';

// Connect to MongoDB MCP server
const client = new MCPClient({
  command: 'npx',
  args: [
    '@modelcontextprotocol/server-mongodb',
    '--uri', 'mongodb://user:pass@localhost:27017/mydb',
    '--auth-db', 'admin'
  ],
  transport: 'stdio'
});

await client.connect();

// Create a document
const doc = await client.callTool('insert_one', {
  collection: 'ai-agents',
  document: {
    id: 'agent-001',
    model: 'cursor-ai',
    capabilities: ['coding', 'debugging'],
    performanceMetrics: { accuracy: 95, costPerToken: 12 }
  }
});

// Query documents
const agents = await client.callTool('find', {
  collection: 'ai-agents',
  filter: {
    capabilities: {'$elemMatch': {'$eq': 'coding'}}
  }
});

// Get collection statistics
const stats = await client.callTool('coll_stats', {
  collection: 'ai-agents'
});

// Create an index
await client.callTool('create_index', {
  collection: 'ai-agents',
  key: 'model',
  options: { sparse: false }
});
```

## Setup Instructions

```bash
npm install -g @modelcontextprotocol/server-mongodb
```

### MongoDB Configuration

```bash
# Option 1: Application Default Credentials
export MONGODB_URI="mongodb+srv://<username>:<password>@cluster.example.com/db?retryWrites=true&w=majority"

# Option 2: Local Development
npx @modelcontextprotocol/server-mongodb \
  --uri 'mongodb://localhost:27017/mydb' \
  --auth-db admin
```

### Security Settings

1. Recommended: Use MongoDB Atlas for managed security
2. Rotate credentials regularly
3. Enable network authentication
4. Set connection string permissions carefully

## Compatibility

- MongoDB 6.0+ recommended
- Works with all MCP client implementations
- Supports authentication via SSL/TLS
- Includes retry logic for network failures
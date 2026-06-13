---
title: Notion MCP Server
description: MCP server for Notion workspace and knowledge base access
author: Notion MCP Contributors
transport: stdio
useCases: ["Documentation access", "Knowledge management", "Project tracking", "Database queries"]
tags: ["notion", "knowledge-base", "documentation", "productivity", "collaboration"]
---
# Notion MCP Server [MCP server registry](/mcp/registry)

The Notion MCP Server enables AI agents to interact with Notion workspaces for accessing pages, databases, and managing knowledge within AI workflows.

## Overview

Provides access to Notion's API through MCP, allowing agents to read and write pages, query databases, and manage content in Notion workspaces for documentation, project management, and knowledge base operations.

## Key Features

- **Page Operations**: Create, read, update, and delete Notion pages
- **Database Queries**: Query and filter Notion databases with advanced filtering
- **Block Manipulation**: Work with individual content blocks (text, images, tables, etc.)
- **Search**: Full-text search across workspace content
- **Comments**: Add and retrieve comments on pages
- **Properties**: Manage database properties and page metadata

## Transport Type

**stdio** - Communicates via standard input/output streams

## Use Cases

1. **Knowledge Base Access**: Retrieve documentation and FAQs during customer support
2. **Project Management**: Update task status and retrieve project details
3. **Content Generation**: Draft documentation and update wikis based on agent analysis
4. **Meeting Notes**: Automatically create and update meeting documentation
5. **CRM Integration**: Sync customer data between Notion and other systems
6. **Research Assistance**: Gather information from internal knowledge bases

## Example Code Snippet

```typescript
import { MCPClient } from '@modelcontextprotocol/sdk/client';

// Connect to Notion MCP server
const client = new MCPClient({
  command: 'npx',
  args: [
    '@modelcontextprotocol/server-notion',
    '--token', process.env.NOTION_INTEGRATION_TOKEN
  ],
  transport: 'stdio'
});

await client.connect();

// Search for pages
const searchResults = await client.callTool('search', {
  query: 'product roadmap',
  filter: {
    value: 'page',
    property: 'object'
  }
});

// Retrieve a specific page
const page = await client.callTool('get_page', {
  pageId: 'abcdef1234567890'
});

// Query a database
const databaseResults = await client.callTool('query_database', {
  databaseId: '1234567890abcdef',
  filter: {
    property: 'Status',
    select: {
      equals: 'In Progress'
    }
  },
  sorts: [
    {
      property: 'Last Edited',
      direction: 'descending'
    }
  ]
});

// Create a new page in a database
const newPage = await client.callTool('create_page', {
  parent: { database_id: '1234567890abcdef' },
  properties: {
    Name: {
      title: [
        {
          text: {
            content: 'New Feature Spec'
          }
        }
      ]
    },
    Status: {
      select: {
        name: 'Not Started'
      }
    }
  },
  children: [
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: 'Overview'
            }
          }
        ]
      }
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: 'This feature will improve user onboarding flow.'
            }
          }
        ]
      }
    }
  ]
});

// Append blocks to a page
await client.callTool('append_block_children', {
  blockId: 'page-id-here',
  children: [
    {
      object: 'block',
      type: 'toggle',
      toggle: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: 'Technical Details'
            }
          }
        ],
        children: [
          {
            object: 'block',
            type: 'bulleted_list_item',
            bulleted_list_item: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: 'Built with React and TypeScript'
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
});

// Get page properties
const properties = await client.callTool('get_page_properties', {
  pageId: 'page-id-here'
});
```

## Setup Instructions

```bash
npm install -g @modelcontextprotocol/server-notion
```

### Authentication

```bash
npx @modelcontextprotocol/server-notion \
  --token secret_your_integration_token_here
```

### Integration Setup

1. Create an integration in your Notion workspace:
   - Go to Settings & Members → Integrations → Develop your own integrations
   - Name: "MCP AI Agent Integration"
   - Copy the Internal Integration Token

2. Share pages/databases with the integration:
   - Navigate to the page/database you want to access
   - Click Share → Invite → Search for your integration name
   - Enable "Can edit" if you need write access

## Security Considerations

- Use the principle of least privilege - share only necessary pages/databases
- Regularly rotate integration tokens
- Monitor integration audit logs in Notion workspace settings
- Consider using separate integrations for different environments (dev/staging/prod)
- Review shared content periodically to ensure appropriate access levels

## Compatibility

- Notion API version 2022-06-28+
- Works with Personal, Team, and Enterprise plans
- Supports all block types (text, image, video, embed, etc.)
- Compatible with all MCP client implementations
- Includes rate limiting handling and retry logic
- Supports pagination for large database queries
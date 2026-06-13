---
title: "Tavily Search"
description: "AI-powered web search"
mcp: "tavily-search"
category: "search"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# Tavily Search

## Overview

AI-powered web search. This MCP server provides integration capabilities for AI agents needing search functionality.

## Key Features

- **Integration Type**: search
- **Use Case**: Tavily Search enables AI agents to perform search tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-tavily-search
```

## Configuration

```json
{
  "mcpServers": {
    "tavily-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-tavily-search"]
    }
  }
}
```

## Usage

The Tavily Search MCP server provides tools for search tasks. Common operations include:

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
*Last updated: 2026-06-13*

---
title: "SerpAPI Server"
description: "Google Search results API"
mcp: "serpapi-server"
category: "search"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# SerpAPI Server

## Overview

Google Search results API. This MCP server provides integration capabilities for AI agents needing search functionality.

## Key Features

- **Integration Type**: search
- **Use Case**: SerpAPI Server enables AI agents to perform search tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-serpapi-server
```

## Configuration

```json
{
  "mcpServers": {
    "serpapi-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-serpapi-server"]
    }
  }
}
```

## Usage

The SerpAPI Server MCP server provides tools for search tasks. Common operations include:

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

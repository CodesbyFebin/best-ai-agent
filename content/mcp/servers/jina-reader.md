---
title: "Jina Reader"
description: "Web content extraction and summarization"
mcp: "jina-reader"
category: "browsing"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# Jina Reader

## Overview

Web content extraction and summarization. This MCP server provides integration capabilities for AI agents needing browsing functionality.

## Key Features

- **Integration Type**: browsing
- **Use Case**: Jina Reader enables AI agents to perform browsing tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-jina-reader
```

## Configuration

```json
{
  "mcpServers": {
    "jina-reader": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-jina-reader"]
    }
  }
}
```

## Usage

The Jina Reader MCP server provides tools for browsing tasks. Common operations include:

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

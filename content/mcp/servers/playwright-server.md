---
title: "Playwright Server"
description: "Cross-browser automation"
mcp: "playwright-server"
category: "browsing"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# Playwright Server

## Overview

Cross-browser automation. This MCP server provides integration capabilities for AI agents needing browsing functionality.

## Key Features

- **Integration Type**: browsing
- **Use Case**: Playwright Server enables AI agents to perform browsing tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-playwright-server
```

## Configuration

```json
{
  "mcpServers": {
    "playwright-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-playwright-server"]
    }
  }
}
```

## Usage

The Playwright Server MCP server provides tools for browsing tasks. Common operations include:

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

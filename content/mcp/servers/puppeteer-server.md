---
title: "Puppeteer Server"
description: "Chrome automation"
mcp: "puppeteer-server"
category: "browsing"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# Puppeteer Server

## Overview

Chrome automation. This MCP server provides integration capabilities for AI agents needing browsing functionality.

## Key Features

- **Integration Type**: browsing
- **Use Case**: Puppeteer Server enables AI agents to perform browsing tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-puppeteer-server
```

## Configuration

```json
{
  "mcpServers": {
    "puppeteer-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer-server"]
    }
  }
}
```

## Usage

The Puppeteer Server MCP server provides tools for browsing tasks. Common operations include:

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

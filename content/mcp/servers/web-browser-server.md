---
title: "Web Browser Server"
description: "Browser automation for web tasks"
mcp: "web-browser-server"
category: "browsing"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# Web Browser Server

## Overview

Browser automation for web tasks. This MCP server provides integration capabilities for AI agents needing browsing functionality.

## Key Features

- **Integration Type**: browsing
- **Use Case**: Web Browser Server enables AI agents to perform browsing tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-web-browser-server
```

## Configuration

```json
{
  "mcpServers": {
    "web-browser-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-web-browser-server"]
    }
  }
}
```

## Usage

The Web Browser Server MCP server provides tools for browsing tasks. Common operations include:

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

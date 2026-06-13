---
title: "Looker Server"
description: "Business intelligence platform"
mcp: "looker-server"
category: "analytics"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# Looker Server

## Overview

Business intelligence platform. This MCP server provides integration capabilities for AI agents needing analytics functionality.

## Key Features

- **Integration Type**: analytics
- **Use Case**: Looker Server enables AI agents to perform analytics tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-looker-server
```

## Configuration

```json
{
  "mcpServers": {
    "looker-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-looker-server"]
    }
  }
}
```

## Usage

The Looker Server MCP server provides tools for analytics tasks. Common operations include:

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

---
title: "Slack MCP Server"
description: "Slack integration via MCP"
mcp: "slack-mcp-server"
category: "communication"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# Slack MCP Server

## Overview

Slack integration via MCP. This MCP server provides integration capabilities for AI agents needing communication functionality.

## Key Features

- **Integration Type**: communication
- **Use Case**: Slack MCP Server enables AI agents to perform communication tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-slack-mcp-server
```

## Configuration

```json
{
  "mcpServers": {
    "slack-mcp-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack-mcp-server"]
    }
  }
}
```

## Usage

The Slack MCP Server MCP server provides tools for communication tasks. Common operations include:

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

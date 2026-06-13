---
title: "Jira Server"
description: "Enterprise project management"
mcp: "jira-server"
category: "productivity"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# Jira Server

## Overview

Enterprise project management. This MCP server provides integration capabilities for AI agents needing productivity functionality.

## Key Features

- **Integration Type**: productivity
- **Use Case**: Jira Server enables AI agents to perform productivity tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-jira-server
```

## Configuration

```json
{
  "mcpServers": {
    "jira-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-jira-server"]
    }
  }
}
```

## Usage

The Jira Server MCP server provides tools for productivity tasks. Common operations include:

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

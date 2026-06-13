---
title: "WordPress Server"
description: "WordPress CMS integration"
mcp: "wordpress-server"
category: "publishing"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# WordPress Server

## Overview

WordPress CMS integration. This MCP server provides integration capabilities for AI agents needing publishing functionality.

## Key Features

- **Integration Type**: publishing
- **Use Case**: WordPress Server enables AI agents to perform publishing tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-wordpress-server
```

## Configuration

```json
{
  "mcpServers": {
    "wordpress-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-wordpress-server"]
    }
  }
}
```

## Usage

The WordPress Server MCP server provides tools for publishing tasks. Common operations include:

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

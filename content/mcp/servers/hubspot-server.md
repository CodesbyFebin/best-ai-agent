---
title: "HubSpot Server"
description: "Marketing and CRM tools"
mcp: "hubspot-server"
category: "crm"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# HubSpot Server

## Overview

Marketing and CRM tools. This MCP server provides integration capabilities for AI agents needing crm functionality.

## Key Features

- **Integration Type**: crm
- **Use Case**: HubSpot Server enables AI agents to perform crm tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-hubspot-server
```

## Configuration

```json
{
  "mcpServers": {
    "hubspot-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-hubspot-server"]
    }
  }
}
```

## Usage

The HubSpot Server MCP server provides tools for crm tasks. Common operations include:

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

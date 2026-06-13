---
title: "GCP Server"
description: "Google Cloud Platform integration"
mcp: "gcp-server"
category: "cloud"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# GCP Server

## Overview

Google Cloud Platform integration. This MCP server provides integration capabilities for AI agents needing cloud functionality.

## Key Features

- **Integration Type**: cloud
- **Use Case**: GCP Server enables AI agents to perform cloud tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-gcp-server
```

## Configuration

```json
{
  "mcpServers": {
    "gcp-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-gcp-server"]
    }
  }
}
```

## Usage

The GCP Server MCP server provides tools for cloud tasks. Common operations include:

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

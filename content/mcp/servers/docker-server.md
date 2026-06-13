---
title: "Docker Server"
description: "Container management"
mcp: "docker-server"
category: "devops"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# Docker Server

## Overview

Container management. This MCP server provides integration capabilities for AI agents needing devops functionality.

## Key Features

- **Integration Type**: devops
- **Use Case**: Docker Server enables AI agents to perform devops tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-docker-server
```

## Configuration

```json
{
  "mcpServers": {
    "docker-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-docker-server"]
    }
  }
}
```

## Usage

The Docker Server MCP server provides tools for devops tasks. Common operations include:

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

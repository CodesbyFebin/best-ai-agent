---
title: "Kubernetes Server"
description: "Container orchestration"
mcp: "kubernetes-server"
category: "devops"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# Kubernetes Server

## Overview

Container orchestration. This MCP server provides integration capabilities for AI agents needing devops functionality.

## Key Features

- **Integration Type**: devops
- **Use Case**: Kubernetes Server enables AI agents to perform devops tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-kubernetes-server
```

## Configuration

```json
{
  "mcpServers": {
    "kubernetes-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-kubernetes-server"]
    }
  }
}
```

## Usage

The Kubernetes Server MCP server provides tools for devops tasks. Common operations include:

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

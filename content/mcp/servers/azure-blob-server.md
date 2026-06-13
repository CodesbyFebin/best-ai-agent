---
title: Azure Blob Storage MCP Server
description: MCP server for Azure Blob Storage object access
author: Microsoft Azure MCP Team
transport: stdio
useCases: ["Azure storage", "Blob management", "Data lake access", "Enterprise backup"]
tags: ["azure", "blob-storage", "microsoft", "objects", "enterprise"]
---
# Azure Blob Storage MCP Server [MCP server registry](/mcp/registry)

The Azure Blob Storage MCP Server enables AI agents to interact with Microsoft Azure Blob Storage for enterprise-grade object storage and data lake access.

## Overview

Provides access to Azure Blob Storage through MCP, allowing agents to upload, download, manage blobs, and configure containers for scalable cloud storage in Azure environments.

## Key Features

- **Blob Operations**: Upload, download, copy, and delete blob objects
- **Container Management**: Create, configure, and manage storage containers
- **Hierarchical Namespaces**: Support for Azure Data Lake Storage Gen2
- **Access Tiers**: Manage hot, cool, and archive access tiers
- **Security Integration**: Azure AD authentication and SAS tokens

## Transport Type

**stdio** - Communicates via standard input/output streams

## Use Cases

1. **Enterprise Backup**: Store agent-generated reports and logs
2. **Data Lake Access**: Query structured and unstructured data in ADLS Gen2
3. **Model Deployment**: Store and serve ML models from Azure
4. **Media Processing**: Handle large file uploads and processing workflows
5. **Compliance Storage**: Archive data with immutable blob policies

## Example Code Snippet

```typescript
import { MCPClient } from '@modelcontextprotocol/sdk/client';

// Connect to Azure Blob MCP server
const client = new MCPClient({
  command: 'npx',
  args: [
    '@modelcontextprotocol/server-azure-blob',
    '--account-name', 'mystorageaccount',
    '--container-name', 'ai-agent-data'
  ],
  transport: 'stdio'
});

await client.connect();

// List blobs in container
const blobs = await client.callTool('list_blobs', {
  containerName: 'ai-agent-data',
  prefix: '2024/'
});

// Upload a blob
await client.callTool('upload_blob', {
  containerName: 'ai-agent-data',
  blobName: '2024/reports/monthly-summary.pdf',
  filePath: '/path/to/report.pdf',
  contentType: 'application/pdf'
});

// Download a blob
await client.callTool('download_blob', {
  containerName: 'ai-agent-data',
  blobName: 'models/latest-model.onnx',
  destinationPath: '/tmp/model.onnx'
});

// Set blob metadata
await client.callTool('set_blob_metadata', {
  containerName: 'ai-agent-data',
  blobName: 'models/latest-model.onnx',
  metadata: {
    'model-version': '1.5.0',
    'created-by': 'ai-agent'
  }
});

// Generate SAS token
const sasToken = await client.callTool('generate_sas_token', {
  containerName: 'ai-agent-data',
  blobName: 'reports/monthly-summary.pdf',
  permissions: 'r',
  expiryHours: 24
});
```

## Setup Instructions

```bash
npm install -g @modelcontextprotocol/server-azure-blob
```

### Authentication

```bash
# Option 1: Environment variables
export AZURE_STORAGE_ACCOUNT=mystorageaccount
export AZURE_STORAGE_KEY=your_storage_key

# Option 2: Azure CLI
az login

# Option 3: Managed Identity (in Azure environments)
# No configuration needed if running in Azure
```

## Security Considerations

- Use Azure AD Managed Identities when possible
- Rotate storage account keys regularly
- Restrict network access via service endpoints
- Enable Azure Storage logging for audit trails
- Use customer-managed keys for encryption

## Compatibility

- Azure Blob Storage Gen2
- Works with all MCP client implementations
- Supports Azure Data Lake Storage Gen2
- Compatible with Azure Virtual Network integration
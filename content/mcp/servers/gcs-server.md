---
title: Google Cloud Storage MCP Server
description: MCP server for Google Cloud Storage object access
author: Google Cloud MCP Team
transport: stdio
useCases: ["Cloud storage", "Data lake access", "Model artifact storage", "Backup and archiving"]
tags: ["gcp", "cloud-storage", "gcs", "objects", "storage"]
---
# Google Cloud Storage MCP Server [MCP server registry](/mcp/registry)

The Google Cloud Storage MCP Server enables AI agents to interact with Google Cloud Storage for object storage, data lake access, and model artifact management.

## Overview

Provides access to Google Cloud Storage through MCP, allowing agents to upload, download, list, and manage objects in GCS buckets for scalable cloud storage workflows.

## Key Features

- **Object Operations**: Upload, download, list, and delete GCS objects
- **Bucket Management**: Create, configure, and inspect bucket metadata
- **Access Control**: Integrate with IAM and signed URLs
- **Large File Handling**: Efficient streaming for large artifacts
- **Lifecycle Rules**: Manage retention and archival policies

## Transport Type

**stdio** - Communicates via standard input/output streams

## Use Cases

1. **Model Artifact Storage**: Store and retrieve trained ML models
2. **Data Lake Access**: Query large datasets for analysis
3. **Backup and Archiving**: Manage long-term storage of agent outputs
4. **Media Processing**: Store and process large files in cloud workflows
5. **Cross-Platform Sync**: Transfer files between systems via GCS

## Example Code Snippet

```typescript
import { MCPClient } from '@modelcontextprotocol/sdk/client';

// Connect to GCS MCP server
const client = new MCPClient({
  command: 'npx',
  args: [
    '@modelcontextprotocol/server-gcs',
    '--project-id', 'my-gcp-project',
    '--bucket', 'ai-agent-artifacts'
  ],
  transport: 'stdio'
});

await client.connect();

// List objects in bucket
const objects = await client.callTool('list_objects', {
  bucket: 'ai-agent-artifacts',
  prefix: 'models/'
});

// Upload a file
await client.callTool('upload_file', {
  bucket: 'ai-agent-artifacts',
  object: 'models/model-v1.bin',
  filePath: '/path/to/model.bin'
});

// Download an object
await client.callTool('download_file', {
  bucket: 'ai-agent-artifacts',
  object: 'models/model-v1.bin',
  destination: '/tmp/model-v1.bin'
});

// Generate signed URL
const url = await client.callTool('generate_signed_url', {
  bucket: 'ai-agent-artifacts',
  object: 'reports/summary.pdf',
  ttl: 3600
});
```

## Setup Instructions

```bash
npm install -g @modelcontextprotocol/server-gcs
```

### Authentication

```bash
# Option 1: Application Default Credentials
gcloud auth application-default login

# Option 2: Service account key
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
```

## Security Considerations

- Use IAM roles with least privilege
- Enable bucket encryption with Cloud KMS
- Restrict access via VPC Service Controls
- Use signed URLs with short expiration times
- Monitor object access logs in Cloud Audit Logs

## Compatibility

- Google Cloud Storage APIs
- Works with all MCP client implementations
- Supports object versioning and lifecycle policies
- Compatible with Cloud Storage Transfer Service
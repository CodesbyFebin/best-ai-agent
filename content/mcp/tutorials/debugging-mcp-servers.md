---
title: "Debugging MCP Servers - Complete Troubleshooting Guide"
author: "MCP Operations Team"
fact_checker: "James Wilson"
last_updated: "2026-06-12"
estimated_time_minutes: 75
difficulty: "Advanced"
--- [Cursor AI review](/tools/cursor-ai) [MCP server registry](/mcp/registry)

# Debugging MCP Servers - Complete Troubleshooting Guide

## Understanding MCP Debugging Challenges

Debugging MCP servers presents unique challenges compared to traditional applications. The stdio-based communication protocol, asynchronous tool invocation, and security boundaries create a debugging environment that requires specific tools and techniques. This guide provides systematic approaches for diagnosing and resolving common MCP server issues.

MCP servers operate as child processes spawned by AI clients, communicating through JSON-RPC messages over standard input/output. This architecture enables secure isolation but complicates traditional debugging workflows. Understanding these constraints is essential for effective troubleshooting.

## Diagnostic Tools and Setup

### MCP Inspector

The MCP Inspector provides real-time debugging capabilities:

```bash
# Install the inspector
npm install -g @modelcontextprotocol/inspector

# Run with your server
mcp-inspector npx @modelcontextprotocol/server-filesystem ~/Documents
```

The inspector provides:
- Real-time tool invocation interface
- Request/response logging
- Error visualization
- Performance profiling
- Resource browsing

### Log Analysis Strategy

Enable comprehensive logging first:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem", "~/Documents"],
      "env": {
        "LOG_LEVEL": "debug",
        "LOG_PRETTY": "true",
        "LOG_OUTPUT": "stderr"
      }
    }
  }
}
```

Logs appear in:
- Claude Desktop: Developer Console (Cmd/Ctrl + Option + I)
- Cursor: Output panel (View -> Output -> "MCP Servers")
- Terminal: Direct server output when run manually

### Manual Server Testing

Test servers directly outside AI clients:

```bash
# Start the server
npx @modelcontextprotocol/server-filesystem ~/Documents &

# Send test requests
echo '{"jsonrpc": "2.0", "method": "tools/list", "id": 1}' | nc localhost 9090
```

This approach isolates MCP client issues from server problems.

### Profiling and Performance Monitoring

Monitor resource usage during debugging:

```bash
# Monitor process resource usage
htop -p $(pgrep -f "mcp-server")

# Monitor network activity
netstat -anp | grep mcp

# Monitor file access
lsof -p $(pgrep -f "mcp-server")
```

## Common Debugging Scenarios

### Tool Registration Failures

When AI clients can't see your tools:

```bash
# Verify server starts
npx @modelcontextprotocol/server-filesystem --help

# Check tool registration response
echo '{"jsonrpc": "2.0", "method": "initialize", "id": 1, "params": {}}' | node dist/index.js
echo '{"jsonrpc": "2.0", "method": "tools/list", "id": 2}' | node dist/index.js
```

Common causes:
- Malformed inputSchema JSON
- Missing required capability declarations
- Server crash before registration completes
- Version incompatibility with MCP client

### Path Access Issues

Filesystem server path problems usually stem from configuration:

```bash
# Verify directory exists and is readable
ls -la ~/Documents
stat ~/Documents

# Test server with explicit path
npx @modelcontextprotocol/server-filesystem /Users/$(whoami)/Documents

# Check symbolic link issues
readlink -f ~/Documents
```

Debug configuration by checking resolved paths:
```javascript
// Add to server for debugging
console.error('Allowed directories:', process.argv.slice(2));
console.error('Resolved paths:', process.argv.slice(2).map(p => require('path').resolve(p)));
```

### Authentication and Credential Problems

API-based servers failing authentication:

```bash
# Test credentials independently
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user

# Verify environment variable substitution
env | grep -E "(GITHUB|DATABASE|API)"

# Check token scopes
gh api /user --jq '.login' 2>&1
```

For OAuth-based servers, verify:
- Redirect URI configuration matches
- Client ID and secret are correct
- Required scopes are granted
- Token hasn't expired

### Resource Not Found Errors

When MCP resources return 404:

```bash
# List available resources
echo '{"jsonrpc": "2.0", "method": "resources/list", "id": 1}' | node server.js

# Test specific URI
echo '{"jsonrpc": "2.0", "method": "resources/read", "id": 2, "params": {"uri": "file:///path/to/file"}}' | node server.js
```

Check that:
- Resource URIs match expected format
- Path resolution is correct
- File permissions allow reading
- File hasn't been modified/deleted

## Advanced Debugging Techniques

### Protocol-Level Debugging

Inspect raw MCP protocol traffic:

```javascript
// Debug proxy script
const net = require('net');

const server = net.createServer((socket) => {
  const client = net.connect(9090, 'localhost');
  
  socket.pipe(process.stdout);
  client.pipe(socket);
  
  socket.on('data', (data) => {
    console.error('Client -> Server:', data.toString());
    client.write(data);
  });
  
  client.on('data', (data) => {
    console.error('Server -> Client:', data.toString());
    socket.write(data);
  });
});

server.listen(9091);
```

This reveals protocol-level issues that higher-level tools might miss.

### Memory and Resource Leak Detection

Monitor for resource leaks:

```bash
# Track file descriptor usage
watch -n 1 'lsof -p $(pgrep -f mcp) | wc -l'

# Track memory growth
while true; do 
  ps -p $(pgrep -f mcp) -o pid,vsz,rss,comm 2>/dev/null
  sleep 5
done

# Track database connections
netstat -an | grep :5432 | grep ESTABLISHED
```

Common leak sources:
- Unclosed file handles
- Persistent database connections
- Browser instances not disposed
- Timer/interval references

### Race Condition Testing

Test concurrent operation handling:

```bash
# Stress test tool invocations
for i in {1..10}; do
  echo '{"jsonrpc": "2.0", "method": "tools/call", "id": '$i', "params": {"name": "read_file", "arguments": {"path": "test.txt"}}}' &
done
wait
```

Verify:
- Requests complete successfully
- No corrupted responses
- Consistent state between operations
- Proper error handling

## Error Diagnosis Patterns

### Timeout Errors

When operations timeout:

```bash
# Check operation duration
time echo '{"jsonrpc": "2.0", "method": "tools/call", "id": 1, "params": {"name": "slow_operation", "arguments": {}}}' | node server.js

# Verify configured timeouts
echo $MCP_TIMEOUT
echo $OPERATION_TIMEOUT_MS
```

Solutions:
- Increase timeout values
- Optimize slow operations
- Implement streaming for large results
- Add progress callbacks

### Rate Limit Violations

API rate limit errors require backoff strategies:

```bash
# Check rate limit headers
curl -i https://api.github.com/rate_limit

# Monitor your usage
gh api /user --include --jq '[.headers["x-ratelimit-remaining"], .headers["x-ratelimit-reset"]]'
```

Implement exponential backoff:
```typescript
async function withBackoff<T>(
  operation: () => Promise<T>,
  maxRetries = 5
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (error.status === 403 && error.message?.includes('rate limit')) {
        const delay = Math.pow(2, i) * 1000;
        await new Promise(res => setTimeout(res, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error('Max retries exceeded');
}
```

### Authentication Expiration

Handle token refresh gracefully:

```typescript
let tokenExpiry = Date.now() + 3600000; // 1 hour

async function getValidToken(): Promise<string> {
  if (Date.now() > tokenExpiry - 300000) { // 5 min buffer
    const newToken = await refreshAccessToken();
    tokenExpiry = Date.now() + 3600000;
    return newToken;
  }
  return process.env.API_TOKEN;
}
```

### Network Resilience

Handle intermittent connectivity:

```typescript
async function resilientRequest(url: string, retries = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      const delay = Math.random() * 1000 + 500;
      await new Promise(res => setTimeout(res, delay));
    }
  }
}
```

## Production Debugging Strategies

### Health Check Endpoints

Implement health monitoring for production servers:

```typescript
server.registerTool('health_check', {
  description: 'Check server health and resource usage',
  inputSchema: z.object({})
}, async () => {
  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        connections: getActiveConnectionCount(),
        lastError: getLastErrorMessage() || null,
      }, null, 2)
    }]
  };
});
```

### Structured Logging

Implement searchable logging:

```typescript
import { pino } from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  base: {
    server: 'mcp-filesystem',
    pid: process.pid,
  },
});

// Log every operation
logger.info({
  tool: request.params.name,
  path: request.params.arguments?.path,
  durationMs: Date.now() - startTime,
}, 'tool.invoked');
```

### Metrics Collection

Expose Prometheus-style metrics:

```typescript
import { Counter, Histogram, register } from 'prom-client';

const toolInvocations = new Counter({
  name: 'mcp_tool_invocations_total',
  help: 'Total tool invocations',
  labelNames: ['tool', 'status'],
});

const operationDuration = new Histogram({
  name: 'mcp_operation_duration_seconds',
  help: 'Operation duration in seconds',
  labelNames: ['tool'],
});

// Use in tool handlers
const end = operationDuration.startTimer({ tool: 'read_file' });
try {
  // ... operation ...
  toolInvocations.inc({ tool: 'read_file', status: 'success' });
} catch (error) {
  toolInvocations.inc({ tool: 'read_file', status: 'error' });
  throw error;
} finally {
  end();
}
```

## Diagnostic Checklist

### Quick Verification Steps

When MCP stops working:

1. **Check configuration syntax**:
   ```bash
   jq . ~/.config/Claude/claude_desktop_config.json
   ```

2. **Verify server binaries**:
   ```bash
   which node
   node --version
   npm list -g @modelcontextprotocol/server-filesystem
   ```

3. **Test server directly**:
   ```bash
   echo '{"jsonrpc": "2.0", "method": "tools/list", "id": 1}' | npx @modelcontextprotocol/server-filesystem
   ```

4. **Check environment variables**:
   ```bash
   env | grep MCP
   env | grep -E "(GITHUB|DATABASE|API)"
   ```

5. **Review recent changes**:
   ```bash
   git log --oneline -10
   ```

### Log Analysis Patterns

Identify common issues through log patterns:

**Authentication failures**:
```
ERROR [github-server] 401 Unauthorized - Invalid token
WARN  [rate-limit] Approaching API limit (remaining: 5)
ERROR [database] Connection refused - check DATABASE_URL
```

**Performance issues**:
```
WARN  [performance] Operation took 25.3s (timeout: 30s)
ERROR [memory] Heap limit reached, restarting
WARN  [concurrency] Queue depth: 50, consider batching
```

**Protocol errors**:
```
ERROR [protocol] Invalid JSON-RPC request
WARN  [validation] Schema validation failed for read_file
ERROR [resource] Resource URI malformed: file://
```

## Recovery Procedures

### Graceful Restart

When servers become unresponsive:

```bash
# Find and kill stuck processes
pkill -f "mcp-server-filesystem"
sleep 2

# Restart through MCP client
# Claude Desktop: Restart from menu
# Cursor: Reload window
```

### Backup and Rollback

Maintain rollback capability:

```bash
# Backup working configuration
cp ~/.config/Claude/claude_desktop_config.json ~/.config/Claude/claude_desktop_config.json.backup

# Version control for team configs
git add .cursor/mcp.json
git commit -m "Update MCP configuration with new servers"
```

### Emergency Disable

Quickly disable problematic servers:

```json
{
  "mcpServers": {
    "filesystem": {
      "disabled": true,
      "reason": "Investigating authentication issues"
    }
  }
}
```

## Prevention Strategies

### Configuration Validation

Prevent issues through proactive validation:

```bash
# Pre-deployment checks
npm run validate-config
npm run test-servers
npm run audit-security
```

### Monitoring Alerts

Set up proactive monitoring:

```yaml
# Alert on critical issues
- metric: mcp_server_crash_count
  threshold: "> 0"
  duration: "5m"
  notify: "#engineering-alerts"

- metric: mcp_error_rate
  threshold: "> 0.05"
  duration: "10m"
  notify: "#engineering"
```

### Regular Maintenance

Schedule maintenance tasks:

```bash
# Weekly server updates
0 9 * * 1 mcp update-servers

# Monthly configuration review
0 10 1 * * mcp audit-config

# Daily log rotation
0 0 * * * logrotate /etc/logrotate.d/mcp
```

## Conclusion

Effective MCP debugging requires understanding the protocol's unique characteristics and having the right tools available. By implementing structured logging, proactive monitoring, and systematic troubleshooting procedures, most issues can be resolved quickly before impacting productivity.

Start with the MCP Inspector for interactive debugging, add comprehensive logging for production servers, and establish team practices around configuration management. The MCP ecosystem's rapid evolution means staying current with server versions and best practices.

Bookmark this guide for quick reference when issues arise, and contribute improvements back to the community. Robust debugging capabilities benefit everyone building with MCP.
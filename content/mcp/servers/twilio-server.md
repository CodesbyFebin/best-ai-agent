---
title: Twilio MCP Server
description: MCP server for Twilio communications API (SMS, Voice, WhatsApp)
author: Twilio MCP Team
transport: stdio
useCases: ["SMS messaging", "Voice calls", "WhatsApp Business", "Two-way communication"]
tags: ["twilio", "communications", "sms", "voice", "whatsapp", "telephony"]
---
# Twilio MCP Server [MCP server registry](/mcp/registry)

The Twilio MCP Server enables AI agents to send SMS, make voice calls, and interact with WhatsApp for two-way customer communication.

## Overview

Provides programmatic access to Twilio's communications platform through MCP, allowing agents to send messages, make calls, and manage communication workflows for customer engagement.

## Key Features

- **SMS Messaging**: Send and receive text messages globally
- **Voice Calls**: Initiate and manage voice calls with TwiML instructions
- **WhatsApp Business**: Send and receive WhatsApp messages
- **Phone Number Management**: Search and purchase phone numbers
- **Message Status Webhooks**: Receive real-time delivery status updates

## Transport Type

**stdio** - Communicates via standard input/output streams

## Use Cases

1. **Customer Notifications**: Send alerts and updates via SMS/Voice
2. **Two-Factor Authentication**: Verify user identity with OTP codes
3. **Appointment Reminders**: Automated scheduling confirmations
4. **Support Automation**: Route customer inquiries to appropriate channels
5. **Survey Distribution**: Collect feedback via SMS surveys

## Example Code Snippet

```typescript
import { MCPClient } from '@modelcontextprotocol/sdk/client';

// Connect to Twilio MCP server
const client = new MCPClient({
  command: 'npx',
  args: [
    '@modelcontextprotocol/server-twilio',
    '--account-sid', process.env.TWILIO_ACCOUNT_SID,
    '--auth-token', process.env.TWILIO_AUTH_TOKEN
  ],
  transport: 'stdio'
});

await client.connect();

// Send an SMS message
const message = await client.callTool('send_sms', {
  from: '+1234567890',
  to: '+919876543210',
  body: 'Your OTP code is 123456. Valid for 10 minutes.'
});

// Send a WhatsApp message
const whatsappMsg = await client.callTool('send_whatsapp', {
  from: 'whatsapp:+14155238886',
  to: 'whatsapp:+919876543210',
  body: 'Hello from BestAIAgent.in! How can we help you today?'
});

// Make a voice call
const call = await client.callTool('make_call', {
  from: '+1234567890',
  to: '+919876543210',
  url: 'https://handler.twilio.com/twiml/EHxxxxxxxx'
});

// Get message delivery status
const status = await client.callTool('get_message_status', {
  messageSid: message.sid
});

// Search available phone numbers
const numbers = await client.callTool('search_phone_numbers', {
  countryCode: 'IN',
  capabilities: ['SMS', 'MMS']
});
```

## Setup Instructions

```bash
npm install -g @modelcontextprotocol/server-twilio
```

### Authentication

```bash
export TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxx
export TWILIO_AUTH_TOKEN=your_auth_token
npx @modelcontextprotocol/server-twilio
```

## Security Considerations

- Never expose auth token in client-side code
- Use webhook URLs with HTTPS
- Validate webhook signatures to prevent spoofing
- Implement rate limiting to prevent abuse
- Consider using Twilio short codes for high-volume messaging
- Enable two-factor authentication on Twilio account

## Compatibility

- Twilio API v2010
- Works with all MCP client implementations
- Supports global phone numbers (195+ countries)
- Includes automatic retry logic for failed requests
- Compatible with Twilio Programmable Voice
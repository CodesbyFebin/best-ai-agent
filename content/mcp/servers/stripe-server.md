---
title: Stripe MCP Server
description: MCP server for Stripe payment processing integration
author: Stripe MCP Team
transport: stdio
useCases: ["Payment processing", "Subscription management", "Billing automation", "Financial data access"]
tags: ["stripe", "payments", "billing", "subscriptions", "finance"]
---
# Stripe MCP Server [MCP server registry](/mcp/registry)

The Stripe MCP Server enables AI agents to interact with Stripe's payment processing platform for managing payments, subscriptions, customers, and financial data.

## Overview

Provides access to Stripe's APIs through MCP, allowing agents to create and manage payments, subscriptions, invoices, and customer records within agent workflows.

## Key Features

- **Payment Processing**: Create and manage one-time payments
- **Subscription Management**: Handle recurring billing and subscription lifecycles
- **Customer Operations**: Create, update, and retrieve customer information
- **Invoice Handling**: Generate and manage invoices and payment links
- **Webhook Support**: Listen for Stripe events and trigger agent actions
- **Reporting**: Access financial reports and revenue analytics

## Transport Type

**stdio** - Communicates via standard input/output streams

## Use Cases

1. **Subscription Automation**: Manage customer subscriptions based on usage patterns
2. **Payment Recovery**: Identify failed payments and trigger recovery workflows
3. **Revenue Analytics**: Query financial data for business insights
4. **Customer Onboarding**: Create customers and set up billing during sign-up
5. **Refund Processing**: Automate refund requests based on support ticket analysis

## Example Code Snippet

```typescript
import { MCPClient } from '@modelcontextprotocol/sdk/client';

// Connect to Stripe MCP server
const client = new MCPClient({
  command: 'npx',
  args: [
    '@modelcontextprotocol/server-stripe',
    '--api-key', process.env.STRIPE_SECRET_KEY,
    '--webhook-secret', process.env.STRIPE_WEBHOOK_SECRET
  ],
  transport: 'stdio'
});

await client.connect();

// Create a customer
const customer = await client.callTool('create_customer', {
  email: 'customer@example.com',
  name: 'Jane Smith',
  metadata: {
    'signup_source': 'ai-agent-onboarding'
  }
});

// Create a subscription
const subscription = await client.callTool('create_subscription', {
  customer: customer.id,
  items: [{ price: 'price_1NxxxXXXXXXXXXXXXX' }],
  payment_behavior: 'default_incomplete'
});

// List recent payments
const payments = await client.callTool('list_charges', {
  limit: 10,
  status: 'succeeded'
});

// Get revenue report
const revenue = await client.callTool('get_balance_transactions', {
  date_range: {
    gte: '2024-01-01',
    lt: '2024-02-01'
  }
});

// Create a refund
await client.callTool('create_refund', {
  charge: 'ch_1NxxxXXXXXXXXXXXXX',
  amount: 500,
  reason: 'requested_by_customer'
});

// Update subscription quantity
await client.callTool('update_subscription_item', {
  subscription_item: 'si_xxx',
  quantity: 5
});
```

## Setup Instructions

```bash
npm install -g @modelcontextprotocol/server-stripe
```

### API Key Configuration

```bash
npx @modelcontextprotocol/server-stripe \
  --api-key sk_test_your_stripe_secret_key \
  --webhook-secret whsec_your_webhook_signing_secret
```

### Webhook Setup

1. Register webhook endpoint in Stripe Dashboard
2. Add webhook secret to environment
3. Configure events to listen for:
   - `invoice.payment_succeeded`
   - `customer.subscription.created`
   - `charge.failed`
   - `invoice.upcoming`

## Security Considerations

- Never expose secret keys in client-side code or public repositories
- Use restricted API keys with only necessary permissions
- Validate webhook signatures to prevent spoofing
- Implement idempotency keys for safe retries
- Follow PCI compliance guidelines when handling payment data
- Consider using Stripe Radar for fraud detection

## Compatibility

- Stripe API version 2024-06-20+
- Works with all Stripe products (Billing, Payment Links, Checkout, etc.)
- Supports both test and live mode
- Compatible with all MCP client implementations
- Includes automatic pagination for list operations
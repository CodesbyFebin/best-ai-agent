# MCP Directory

## Complete Model Context Protocol (MCP) Server Directory for India

> **Focus**: Indian developers, businesses, and compliance requirements  
> **Last Updated**: June 13, 2026  
> **Total Servers Listed**: 50+  
> **India-Optimized**: 15+ servers

### What is MCP?

Model Context Protocol (MCP) is an open standard for connecting AI agents to external data sources, tools, and services. It enables:
- **Standardized integration** between AI agents and external systems
- **Secure data access** with fine-grained permissions
- **Tool discovery** for autonomous agent workflows
- **Cross-platform compatibility** across different AI platforms

### Why MCP Matters for India

For Indian businesses and developers, MCP offers:
- **DPDP Compliance**: Self-hosted MCP servers ensure data stays in India
- **Cost Efficiency**: Open-source alternatives to expensive SaaS integrations
- **Customization**: Tailor integrations to specific Indian business needs
- **Future-Proofing**: Standard-based approach ensures longevity
- **Security**: Direct control over data handling and access

---

## Official MCP Servers

### File System

**Filesystem MCP Server**
- **Repository**: `https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem`
- **Purpose**: Secure file system access and manipulation
- **Commands**: Read, write, list, delete files and directories
- **Use Cases**: Document processing, batch operations, file-based workflows
- **Installation**:
  ```bash
  npm install @modelcontextprotocol/server-filesystem
  ```
- **Configuration**:
  ```json
  {
    "allowedDirectories": ["/path/to/allowed/files"],
    "allowWrite": true,
    "allowedExtensions": [".txt", ".json", ".md"]
  }
  ```
- **DPDP Compliance**: ✅ Full compliance when self-hosted on Indian infrastructure
- **AWS Mumbai Ready**: ✅ Yes
- **India Optimization**: ✅ Supports NTFS and ext4 file systems common in Indian deployments

### Database

**PostgreSQL MCP Server**
- **Repository**: `https://github.com/modelcontextprotocol/servers/tree/main/src/postgresql`
- **Purpose**: PostgreSQL database connectivity and query execution
- **Commands**: Execute queries, list tables, describe schemas, analyze data
- **Use Cases**: Data analysis, report generation, CRM integration
- **Installation**:
  ```bash
  npm install @modelcontextprotocol/server-postgresql
  ```
- **Connection String**:
  ```bash
  postgresql://username:password@host:port/database?sslmode=require
  ```
- **DPDP Compliance**: ✅ Fully compliant with AWS Mumbai or GCP Delhi PostgreSQL instances
- **India Optimization**: ✅ Optimized for AWS RDS Mumbai, supports data residency

**MySQL MCP Server**
- **Repository**: `https://github.com/modelcontextprotocol/servers/tree/main/src/mysql`
- **Purpose**: MySQL database connectivity
- **Commands**: Query execution, schema operations, data export
- **Use Cases**: Legacy system integration, e-commerce platforms
- **Installation**:
  ```bash
  npm install @modelcontextprotocol/server-mysql
  ```
- **DPDP Compliance**: ✅ Yes, when deployed on Indian cloud

### API Integration

**GitHub MCP Server**
- **Repository**: `https://github.com/modelcontextprotocol/servers/tree/main/src/github`
- **Purpose**: GitHub repository access and management
- **Commands**: List repos, read files, search code, manage issues
- **Use Cases**: Development workflows, code review, CI/CD integration
- **Installation**:
  ```bash
  npm install @modelcontextprotocol/server-github
  ```
- **Authentication**: Personal Access Token with repo scope
- **DPDP Compliance**: ⚠️ Requires careful consideration (GitHub data stored outside India)

**REST API MCP Server**
- **Purpose**: Generic REST API integration
- **Commands**: GET, POST, PUT, DELETE requests with authentication
- **Use Cases**: Third-party service integration, custom API consumption
- **Installation**:
  ```bash
  npm install @modelcontextprotocol/server-rest
  ```

---

## India-Specific MCP Servers

### Payments & Finance

**UPI Payment MCP Server**
- **Repository**: `github.com/indian-fintech-labs/mcp-server-upi-gateway`
- **Purpose**: Unified Payments Interface integration for payment processing
- **Features**:
  - Generate QR codes for UPI payments
  - Verify payment status
  - Process refunds
  - Handle payment webhooks
  - Transaction history API
- **Use Cases**: E-commerce checkout, invoice settlement, subscription billing
- **Installation**:
  ```bash
  npm install @indian-fintech-labs/mcp-server-upi-gateway
  ```
- **Configuration**:
  ```json
  {
    "upiId": "merchant@upi",
    "merchantName": "Your Business Name",
    "apiKey": "your-api-key",
    "webhookUrl": "https://your-domain.com/webhook"
  }
  ```
- **DPDP Compliance**: ✅ Built with NPCI guidelines and Indian data protection in mind
- **India Optimization**: ✅ Purpose-built for Indian payment ecosystem
- **Cost**: Free (transaction fees apply via UPI network)

**GSTN Compliance MCP Server**
- **Repository**: `github.com/indian-tax-tech/mcp-server-gstn`
- **Purpose**: Goods and Services Tax Network integration for compliance
- **Features**:
  - GSTR-1/GSTR-3B form preparation
  - GST invoice validation
  - Input tax credit reconciliation
  - E-way bill generation
  - HSN/SAC code validation
- **Use Cases**: Business accounting, tax filing, invoice compliance
- **Installation**:
  ```bash
  npm install @indian-tax-tech/mcp-server-gstn
  ```
- **DPDP Compliance**: ✅ Operates within GSTN infrastructure
- **Note**: Requires GSTN registration credentials

**Razorpay MCP Server**
- **Repository**: `github.com/indian-fintech-labs/mcp-server-razorpay`
- **Purpose**: Razorpay payment gateway integration
- **Features**:
  - Payment link generation
  - Subscription management
  - Invoice generation
  - Refund processing
  - Payment verification
- **Use Cases**: SaaS billing, recurring payments, marketplace transactions
- **Installation**:
  ```bash
  npm install @indian-fintech-labs/mcp-server-razorpay
  ```
- **DPDP Compliance**: ✅ Razorpay infrastructure is India-based

### Communication

**WhatsApp Business MCP Server**
- **Repository**: `github.com/indian-ai-community/mcp-server-whatsapp-business`
- **Purpose**: WhatsApp Business API integration
- **Features**:
  - Send/receive messages
  - Media sharing (images, documents, audio)
  - Interactive buttons and lists
  - Template message support
  - Webhook handling for incoming messages
- **Use Cases**: Customer support, order notifications, appointment reminders
- **Installation**:
  ```bash
  npm install @indian-ai-community/mcp-server-whatsapp-business
  ```
- **Configuration**:
  ```json
  {
    "phoneNumberId": "your-phone-number-id",
    "accessToken": "your-access-token",
    "businessAccountId": "your-business-id",
    "webhookVerifyToken": "your-verify-token"
  }
  ```
- **DPDP Compliance**: ✅ Designed with data localization options
- **India Optimization**: ✅ Optimized for Indian WhatsApp usage patterns

**SMS MCP Server (ICICI/MSG91/Twilio)**
- **Repository**: `github.com/indian-servers/mcp-server-sms`
- **Purpose**: SMS gateway integration for Indian providers
- **Features**:
  - Send SMS via multiple Indian providers
  - Template management for DLT compliance
  - Delivery status tracking
  - Bulk SMS support
- **Supported Providers**: MSG91, Textlocal, ICICI SMS, Twilio
- **Installation**:
  ```bash
  npm install @indian-servers/mcp-server-sms
  ```

### Government & Regulatory

**IRCTC MCP Server**
- **Repository**: `github.com/indian-travel-tech/mcp-server-irctc`
- **Purpose**: Indian Railway booking and information
- **Features**:
  - Check seat availability
  - Book tickets
  - PNR status lookup
  - Train schedule queries
  - Cancellation processing
- **Installation**:
  ```bash
  npm install @indian-travel-tech/mcp-server-irctc
  ```
- **DPDP Compliance**: ✅ Processes data within Indian Railways infrastructure

**GSTN MCP Server**
- **Repository**: `github.com/indian-tax-tech/mcp-server-gstn`
- **Purpose**: GST compliance and filing
- **Features**:
  - GSTR preparation and validation
  - Invoice verification
  - Tax calculation
  - Return filing assistance
- **DPDP Compliance**: ✅ Fully within Indian government infrastructure

**Aadhaar MCP Server** (Restricted)
- **Purpose**: Aadhaar-based identity verification
- **Features**:
  - Aadhaar number verification
  - OTP generation
  - eKYC services
- **Installation**: Requires UIDAI authorization
- **Note**: Highly regulated, requires approvals

### E-Commerce & Logistics

**Shiprocket MCP Server**
- **Repository**: `github.com/indian-logistics/mcp-server-shiprocket`
- **Purpose**: Shipping and logistics integration
- **Features**:
  - Courier comparison
  - Shipment tracking
  - Label generation
  - COD management
- **Installation**:
  ```bash
  npm install @indian-logistics/mcp-server-shiprocket
  ```

**Amazon Seller Central MCP Server**
- **Repository**: `github.com/indian-ecommerce/mcp-server-amazon-seller`
- **Purpose**: Amazon seller operations
- **Features**:
  - Order management
  - Inventory updates
  - Customer query handling
  - Report generation

### Banking & Finance

**Cashfree MCP Server**
- **Repository**: `github.com/indian-fintech-labs/mcp-server-cashfree`
- **Purpose**: Cashfree payment gateway
- **Features**:
  - Payment link creation
  - Bank account verification
  - Payout processing
  - Refund handling
- **Installation**:
  ```bash
  npm install @indian-fintech-labs/mcp-server-cashfree
  ```

**PhonePe MCP Server**
- **Repository**: `github.com/indian-fintech-labs/mcp-server-phonepe`
- **Purpose**: PhonePe payment integration
- **Features**:
  - UPI payment processing
  - QR code generation
  - Refund handling

---

## Community & Third-Party MCP Servers

### Productivity

**Google Workspace MCP Server**
- **Purpose**: Gmail, Calendar, Drive integration
- **Installation**:
  ```bash
  npm install @modelcontextprotocol/server-gworkspace
  ```

**Slack MCP Server**
- **Purpose**: Slack messaging and workspace management
- **Installation**:
  ```bash
  npm install @modelcontextprotocol/server-slack
  ```

**Notion MCP Server**
- **Purpose**: Notion workspace and database access
- **Installation**:
  ```bash
  npm install @modelcontextprotocol/server-notion
  ```

### Data Processing

**CSV/Excel MCP Server**
- **Purpose**: Process CSV and Excel files
- **Installation**:
  ```bash
  npm install @modelcontextprotocol/server-data
  ```

**PDF MCP Server**
- **Purpose**: PDF reading, creation, and manipulation
- **Installation**:
  ```bash
  npm install @modelcontextprotocol/server-pdf
  ```

### Specialized

**Brave Search MCP Server**
- **Purpose**: Web search capabilities
- **Installation**:
  ```bash
  npm install @modelcontextprotocol/server-brave-search
  ```

**Puppeteer MCP Server**
- **Purpose**: Browser automation and web scraping
- **Installation**:
  ```bash
  npm install @modelcontextprotocol/server-puppeteer
  ```

---

## MCP Server Selection Guide for India

### Compliance-First Selection Matrix

| Server | DPDP Compliant | Data Residency | Self-Hostable | India Priority |
|--------|---------------|----------------|---------------|---------------|
| Filesystem MCP | ✅ | ✅ | ✅ | High |
| PostgreSQL MCP | ✅ | ✅ | ✅ | High |
| WhatsApp MCP | ✅ | ✅ | ✅ | Critical |
| UPI MCP | ✅ | ✅ | ✅ | Critical |
| GSTN MCP | ✅ | ✅ | ✅ | High |
| GitHub MCP | ⚠️ | ❌ | ❌ | Low |
| REST API MCP | ✅ | Depends | ✅ | High |

### Use Case Matching

#### Government & Public Sector
**Required**: DPDP compliant, data residency, audit trails
**Recommended**: Filesystem MCP, PostgreSQL MCP, GSTN MCP (self-hosted on NIC cloud)

#### Banking & Financial Services
**Required**: RBI compliance, encryption, audit trails
**Recommended**: PostgreSQL MCP, UPI MCP, Cashfree MCP, self-hosted deployment

#### Healthcare
**Required**: HIPAA-equivalent security, data residency, consent management
**Recommended**: Filesystem MCP, PostgreSQL MCP, self-hosted on AWS Mumbai/GCP Delhi

#### E-commerce
**Required**: Payment gateway, shipping, customer data protection
**Recommended**: UPI MCP, Shiprocket MCP, WhatsApp MCP, Razorpay MCP

#### Education
**Required**: Student data protection, content delivery, accessibility
**Recommended**: Filesystem MCP, Notion MCP, self-hosted deployment

---

## Quick Reference

### Installation Cheat Sheet
```bash
# Official servers
npm install @modelcontextprotocol/server-filesystem
npm install @modelcontextprotocol/server-postgresql
npm install @modelcontextprotocol/server-github

# India-specific servers
npm install @indian-fintech-labs/mcp-server-upi-gateway
npm install @indian-ai-community/mcp-server-whatsapp-business
npm install @indian-tax-tech/mcp-server-gstn
npm install @indian-servers/mcp-server-sms
```

### Configuration Skeleton
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem"],
      "env": {
        "ALLOWED_PATHS": "/path/to/data"
      }
    },
    "postgresql": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgresql"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@host:5432/db"
      }
    }
  }
}
```

---

*Directory maintained by BestAIAgent.in*  
*Submit new servers: submit@bestaiagent.in*
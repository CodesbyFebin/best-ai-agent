# MCP Security Guide

## Comprehensive Security Guide for Model Context Protocol Deployments in India

### Why MCP Security Matters in India

MCP (Model Context Protocol) servers handle sensitive data, integrate with critical business systems, and enable AI agents to perform actions on your behalf. For Indian businesses, this means:
- **DPDP Act 2023 compliance** is mandatory
- **Data localization** requires careful infrastructure planning
- **Payment integrations** handle financial data
- **Government systems** (GSTN, IRCTC) require strict controls

### Security Principles

#### 1. Defense in Depth
Layer multiple security controls:
- Network security (firewalls, VPNs, private subnets)
- Application security (input validation, authentication, authorization)
- Data security (encryption at rest and in transit)
- Monitoring (audit logs, anomaly detection, alerts)
- Incident response (defined procedures, escalation paths)

#### 2. Least Privilege
Grant minimum necessary permissions:
- MCP servers should only access required resources
- Use read-only access wherever possible
- Implement role-based access control (RBAC)
- Regular permission audits

#### 3. Zero Trust
Never trust, always verify:
- Authenticate every request
- Authorize every resource access
- Validate all inputs
- Log all operations

### Architecture Security

#### Network Architecture
```
Internet
    │
    ▼
[Load Balancer / WAF] ← DDoS protection, rate limiting
    │
    ▼
[DMZ - Optional]
    │
    ▼
[Private Subnet - MCP Servers]
    ├── Filesystem MCP (isolated)
    ├── Database MCP (isolated)
    └── Integration MCP (isolated)
    │
    ▼
[Data Layer - Private]
    ├── PostgreSQL (private subnet)
    ├── S3 / Object Storage (VPC-endpoint only)
    └── Redis Cache
    │
    ▼
[AWS Mumbai / GCP Delhi]
```

#### Security Checklist

**Network Layer**:
- [ ] Deploy in private subnets (no public IPs)
- [ ] Use Security Groups with minimal open ports
- [ ] Enable VPC Flow Logs for network monitoring
- [ ] Configure Network ACLs for defense in depth
- [ ] Enable AWS GuardDuty / GCP Security Command Center
- [ ] Use TLS 1.3 for all connections
- [ ] Disable public access to data stores

**Identity & Access Management**:
- [ ] Use IAM roles instead of long-term credentials
- [ ] Implement MFA for all administrative access
- [ ] Rotate API keys regularly (90-day maximum)
- [ ] Use service accounts with minimal permissions
- [ ] Enable CloudTrail / Cloud Audit Logs
- [ ] Implement just-in-time (JIT) access for privileged operations

**Data Protection**:
- [ ] Enable encryption at rest (AES-256)
- [ ] Enforce encryption in transit (TLS 1.3)
- [ ] Use field-level encryption for PII
- [ ] Implement data masking for non-production environments
- [ ] Set appropriate data retention policies
- [ ] Enable automatic data deletion

### Threat Model

#### Common Attack Vectors

**1. Data Exfiltration**
- **Risk**: Unauthorized access to sensitive data through MCP tools
- **Mitigation**:
  - Input/output validation
  - Output filtering for sensitive content
  - Data Loss Prevention (DLP) tools
  - Audit logging for all data access
  - User consent management

**2. Privilege Escalation**
- **Risk**: Agent gains unauthorized elevated privileges
- **Mitigation**:
  - Strict RBAC implementation
  - Regular privilege audits
  - Principle of least privilege
  - Separation of duties

**3. Injection Attacks**
- **Risk**: SQL injection, command injection, prompt injection
- **Mitigation**:
  - Input sanitization and validation
  - Parameterized queries
  - Output encoding
  - Prompt injection detection
  - Sandboxed execution environments

**4. Denial of Service**
- **Risk**: Resource exhaustion through abuse
- **Mitigation**:
  - Rate limiting per user/IP
  - Request size limits
  - Timeout configurations
  - Auto-scaling with thresholds
  - DDoS protection (AWS Shield, GCP Cloud Armor)

**5. Supply Chain Attacks**
- **Risk**: Compromised dependencies or images
- **Mitigation**:
  - Vulnerability scanning (Snyk, Trivy)
  - SBOM (Software Bill of Materials)
  - Image signing and verification
  - Pinned dependency versions
  - Regular security updates

### Security Controls by MCP Server Type

#### Filesystem MCP
**Primary Risks**: Unauthorized file access, path traversal, data leakage
**Controls**:
- Restrict to specific directories (no wildcards like `/`)
- Read-only mode where write access isn't needed
- Filename validation (no special characters, path traversal checks)
- File size limits
- Content type validation
- Audit logging for all file operations

#### Database MCP (PostgreSQL, MySQL)
**Primary Risks**: SQL injection, data exfiltration, unauthorized queries
**Controls**:
- Read-only user accounts where possible
- Query whitelisting for known-safe operations
- Row-level security (RLS) policies
- Connection pooling with limits
- Query timeout enforcement
- Sensitive data masking in results
- Audit logging of all queries

#### Payment MCP (UPI, Razorpay, Cashfree)
**Primary Risks**: Payment manipulation, fraud, data theft
**Controls**:
- PCI DSS compliance assessment
- Tokenization of sensitive payment data
- Webhook signature verification
- Idempotency keys for all transactions
- Transaction amount limits
- Multi-factor authentication for high-value transactions
- Real-time fraud detection
- Audit trails for all payment operations

#### Communication MCP (WhatsApp, SMS)
**Primary Risks**: Message interception, spam, unauthorized access
**Controls**:
- End-to-end encryption where possible
- Template approval for bulk messaging (DLT compliance)
- Rate limiting per user/phone number
- Message content filtering
- Opt-in/opt-out management
- Audit logging for compliance
- Webhook signature verification

#### API MCP (REST, GraphQL)
**Primary Risks**: API key exposure, rate limit bypass, data leakage
**Controls**:
- API key rotation and secure storage (vaults)
- Request signing and verification
- Rate limiting per API key/user
- Response size limits
- Timeout configurations
- Circuit breakers for external APIs
- Caching with TTL control

### DPDP Act 2023 Compliance for MCP

#### Consent Management
- Obtain explicit consent before processing personal data
- Provide clear purpose for data collection
- Enable easy consent withdrawal
- Maintain consent audit trail
- Age verification for minors

#### Data Rights Implementation
- **Access**: Citizens can request their data
- **Correction**: Allow data updates
- **Deletion**: Implement right to erasure
- **Portability**: Enable data export
- **Objection**: Allow processing objections

#### Data Localization
- Map all data flows
- Classify data by sensitivity
- Ensure sensitive data stays in India
- Document cross-border data transfers
- Implement data residency controls

#### Breach Notification
- Monitor for unauthorized access
- Define breach severity levels
- Establish notification procedures
- Maintain breach register
- Regular incident response drills

### Monitoring & Incident Response

#### Essential Monitoring
```bash
# Key metrics to collect
- Authentication failures
- Rate limit violations
- Data access patterns
- Error rates and types
- Resource utilization
- Network traffic anomalies
- Request latency

# Recommended tools
- Prometheus + Grafana for metrics
- ELK stack for logs
- AWS CloudWatch / GCP Cloud Monitoring
- OpenTelemetry for distributed tracing
- Custom alerting via PagerDuty/OpsGenie
```

#### Incident Response Plan
1. **Detection**: Automated alerting + manual reporting
2. **Triage**: Severity assessment and response prioritization
3. **Containment**: Isolate affected systems
4. **Investigation**: Root cause analysis
5. **Remediation**: Fix vulnerabilities
6. **Recovery**: Restore services safely
7. **Lessons Learned**: Post-incident review

#### Reporting Requirements
- **Data breaches**: Notify within 72 hours (DPDP Act)
- **Security incidents**: Internal reporting within 24 hours
- **Audit findings**: Quarterly review
- **Compliance status**: Annual assessment

### Secure Deployment Checklist

#### Pre-Deployment
- [ ] Threat modeling completed
- [ ] Security requirements documented
- [ ] Penetration testing plan defined
- [ ] Compliance audit scheduled
- [ ] Incident response plan prepared

#### During Deployment
- [ ] Secrets stored in vault (not in code)
- [ ] All communication encrypted (TLS 1.3)
- [ ] IAM roles with least privilege
- [ ] Audit logging enabled
- [ ] Monitoring and alerting configured
- [ ] Security scanning completed (Trivy, Snyk)
- [ ] Penetration testing conducted

#### Post-Deployment
- [ ] Continuous monitoring active
- [ ] Regular security updates scheduled
- [ ] Log review process established
- [ ] Compliance reports generated
- [ ] Team security training planned
- [ ] Disaster recovery tested

### Tools and Resources

#### Security Scanning
- **Trivy**: Container and dependency vulnerability scanning
- **Snyk**: Open-source security scanning
- **Bandit**: Python security linter
- **npm audit**: Node.js dependency security
- **OWASP ZAP**: Web application security testing

#### Secrets Management
- **HashiCorp Vault**: Production-grade secrets management
- **AWS Secrets Manager**: Cloud-native secrets management
- **GCP Secret Manager**: GCP secrets service
- **Bitwarden/Vaultwarden**: Open-source password manager

#### Compliance Tools
- **AWS Artifact**: Compliance reports
- **GCP Assured Workloads**: Compliance controls
- **OpenControl**: Open-source compliance automation
- **Compliance-as-Code**: Policy-as-code frameworks

### Incident Response Contacts

| Incident Type | Internal Contact | External Authority |
|--------------|------------------|-------------------|
| Data Breach | security@bestaiagent.in | CERT-In, DPIIT |
| Service Disruption | oncall@bestaiagent.in | - |
| Compliance Query | legal@bestaiagent.in | DPIIT, MEITy |
| Security Vulnerability | security@bestaiagent.in | - |

---

*Security Guide maintained by BestAIAgent.in Security Team*  
*Last Updated: June 13, 2026*  
*Next Review: September 13, 2026*
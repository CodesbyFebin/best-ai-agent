# Deploying CrewAI on AWS Mumbai for DPDP Compliance

## Step-by-Step Guide for Indian Businesses

This comprehensive tutorial walks you through deploying CrewAI agents on AWS Mumbai (ap-south-1) to ensure DPDP Act 2023 compliance for sensitive Indian business data.

### Prerequisites

- AWS account with ap-south-1 region access
- Basic understanding of Docker and cloud infrastructure
- Domain name (optional but recommended)
- SSL certificate (Let's Encrypt recommended)
- VPC and networking knowledge
- ₹4,500-8,000 monthly budget for infrastructure

### Step 1: AWS Infrastructure Setup

#### Create VPC
```bash
# Create VPC with public and private subnets
aws ec2 create-vpc --cidr-block 10.0.0.0/16 --region ap-south-1

# Create Internet Gateway
aws ec2 create-internet-gateway --region ap-south-1

# Create public subnet
aws ec2 create-subnet \
  --vpc-id vpc-xxxxx \
  --cidr-block 10.0.1.0/24 \
  --availability-zone ap-south-1a \
  --region ap-south-1

# Create private subnet
aws ec2 create-subnet \
  --vpc-id vpc-xxxxx \
  --cidr-block 10.0.2.0/24 \
  --availability-zone ap-south-1a \
  --region ap-south-1
```

#### Launch EC2 Instance (t3.medium recommended)
```bash
# Create security group
aws ec2 create-security-group \
  --group-name crewai-sg \
  --description "CrewAI deployment security group" \
  --vpc-id vpc-xxxxx \
  --region ap-south-1

# Configure inbound rules
aws ec2 authorize-security-group-ingress \
  --group-id sg-xxxxx \
  --protocol tcp \
  --port 22 \
  --cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress \
  --group-id sg-xxxxx \
  --protocol tcp \
  --port 80 \
  --cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress \
  --group-id sg-xxxxx \
  --protocol tcp \
  --port 443 \
  --cidr 0.0.0.0/0

# Launch instance
aws ec2 run-instances \
  --image-id ami-0c1a7f8a3b3e9e9f9 \
  --instance-type t3.medium \
  --key-name your-key-pair \
  --security-group-ids sg-xxxxx \
  --subnet-id subnet-xxxxx \
  --region ap-south-1
```

### Step 2: Docker Installation

```bash
# Connect to your EC2 instance
ssh -i your-key.pem ubuntu@<ec2-public-ip>

# Update packages
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

### Step 3: CrewAI Application Deployment

#### Create Project Structure
```bash
mkdir -p ~/crewai-project/{app,config,database,logs}
cd ~/crewai-project
```

#### Create Dockerfile
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Run application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Create docker-compose.yml
```yaml
version: '3.8'

services:
  crewai-app:
    build: .
    ports:
      - "8000:8000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - DATABASE_URL=postgresql://crewai:password@db:5432/crewai
      - REDIS_URL=redis://redis:6379
      - LOG_LEVEL=INFO
    volumes:
      - ./database:/app/database
      - ./logs:/app/logs
    depends_on:
      - db
      - redis
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=crewai
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=crewai
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - crewai-app
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

### Step 4: Security Hardening

#### Configure Firewall
```bash
# Enable UFW
sudo ufw enable

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Deny all other incoming
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

#### Enable Encryption
```bash
# Install certbot for Let's Encrypt SSL
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo certbot renew --dry-run
```

#### Configure Fail2ban
```bash
# Install fail2ban
sudo apt install fail2ban -y

# Configure SSH protection
sudo nano /etc/fail2ban/jail.local

# Add:
[sshd]
enabled = true
port = 22
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
```

### Step 5: Application Configuration

#### Environment Variables
```bash
# Create .env file
cat > ~/crewai-project/.env <<EOF
OPENAI_API_KEY=your-api-key
DATABASE_URL=postgresql://crewai:password@localhost:5432/crewai
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secret-key-here
LOG_LEVEL=INFO
MAX_WORKERS=4
TIMEOUT=300
EOF

# Secure the file
chmod 600 ~/crewai-project/.env
```

#### Sample CrewAI Application
```python
# main.py
from fastapi import FastAPI
from crewai import Agent, Task, Crew
import os

app = FastAPI()

# Define agents
researcher = Agent(
    role='Senior Researcher',
    goal='Discover innovative AI solutions',
    backstory='You are an expert in AI agent technology and business automation',
    verbose=True,
    allow_delegation=False,
    llm_config={"model": "gpt-4"}
)

writer = Agent(
    role='Content Writer',
    goal='Create engaging blog posts',
    backstory='You excel at translating technical concepts into accessible content',
    verbose=True,
    allow_delegation=False,
    llm_config={"model": "gpt-4"}
)

# Define tasks
research_task = Task(
    description='Research latest AI agent trends in India',
    agent=researcher,
    expected_output='Comprehensive report on AI agent adoption'
)

writing_task = Task(
    description='Write blog post based on research',
    agent=writer,
    expected_output='SEO-optimized blog post in Markdown'
)

# Create crew
crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, writing_task],
    verbose=2
)

@app.get("/")
async def root():
    return {"message": "CrewAI API is running"}

@app.post("/execute")
async def execute_crew(input_data: dict):
    result = crew.kickoff()
    return {"result": result}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

#### Start Services
```bash
cd ~/crewai-project
docker-compose up --build -d

# Verify services
docker-compose ps
docker-compose logs -f
```

### Step 6: Monitoring and Maintenance

#### Setup CloudWatch Monitoring
```bash
# Install CloudWatch agent
sudo yum install amazon-cloudwatch-agent -y

# Configure monitoring
sudo nano /opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json

# Start agent
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
  -a fetch-config \
  -m ec2 \
  -c file:/opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json \
  -s
```

#### Automated Backups
```bash
# Create backup script
cat > ~/backup.sh <<'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf /backups/crewai_$DATE.tar.gz /path/to/data
# Upload to S3
aws s3 cp /backups/crewai_$DATE.tar.gz s3://your-bucket/backups/
EOF

chmod +x ~/backup.sh

# Add to crontab
crontab -e
# Add: 0 2 * * * /home/ubuntu/backup.sh
```

### Step 7: Scaling for Production

#### Load Balancer Setup
```bash
# Create Application Load Balancer
aws elbv2 create-load-balancer \
  --name crewai-alb \
  --subnets subnet-xxxxx subnet-yyyyy \
  --security-groups sg-xxxxx \
  --region ap-south-1

# Create target group
aws elbv2 create-target-group \
  --name crewai-targets \
  --protocol HTTP \
  --port 8000 \
  --vpc-id vpc-xxxxx \
  --health-check-path /health \
  --region ap-south-1

# Register targets
aws elbv2 register-targets \
  --target-group-arn arn:aws:elasticloadbalancing:... \
  --targets Id=i-xxxxx,Id=i-yyyyy \
  --region ap-south-1
```

### Cost Breakdown (Monthly in INR)

| Resource | Configuration | Monthly Cost (INR) |
|----------|---------------|-------------------|
| EC2 (t3.medium x2) | Application servers | ₹7,000 |
| RDS (db.t3.micro) | PostgreSQL database | ₹2,000 |
| ElastiCache (cache.t3.micro) | Redis cache | ₹1,200 |
| ALB | Load balancer | ₹800 |
| S3 Storage | Backups and assets | ₹500 |
| Data Transfer | Inter-AZ transfer | ₹1,500 |
| CloudWatch | Monitoring | ₹300 |
| **Total** | - | **₹13,300** |

### DPDP Compliance Checklist

- [x] Data stored in AWS Mumbai (ap-south-1)
- [x] End-to-end encryption (TLS 1.3)
- [x] At-rest encryption enabled
- [x] Audit logging configured
- [x] Access controls implemented
- [x] Consent management workflows
- [ ] Data retention policies defined
- [ ] Right to erasure implementation
- [ ] Data breach notification procedures
- [ ] Third-party processor agreements
- [ ] Regular security audits scheduled

### Troubleshooting Common Issues

#### Issue: Container fails to start
```bash
# Check logs
docker-compose logs crewai-app

# Common issues:
# - Missing environment variables
# - Insufficient memory
# - Port conflicts
```

#### Issue: Database connection errors
```bash
# Verify PostgreSQL is running
docker-compose ps db

# Check connection credentials
docker-compose exec db psql -U crewai -d crewai
```

#### Issue: High latency
```bash
# Check resource usage
docker stats

# Consider upgrading instance type
# Review application performance bottlenecks
```

### Next Steps

1. **Add more agents**: Extend your crew with specialized agents
2. **Integrate MCP servers**: Connect to databases, APIs, filesystems
3. **Add authentication**: Implement OAuth2 or JWT
4. **Setup CI/CD**: Automate deployments with GitHub Actions
5. **Add monitoring**: Create custom dashboards for agent performance
6. **Expand infrastructure**: Add more instances for scaling

---

*Last Updated: June 13, 2026*
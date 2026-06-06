# 🖥️ AWS EC2: Elastic Compute Cloud Deep Dive

**Date Completed**: May 13, 2026
**Service**: Amazon EC2 (Virtual Servers in the Cloud)
**Environment**: AWS us-west-2 (Oregon)

---

## What I Learned

### 1. What Amazon EC2 Is

Amazon EC2 (Elastic Compute Cloud) is an AWS service that allows users to create and manage virtual servers in the cloud. It provides scalable computing capacity without needing to buy or manage physical hardware.

**Common Uses of EC2**

- Hosting web applications
- Running Linux servers
- Backend APIs
- Databases
- Cloud labs and testing
- DevOps environments
- Security testing environments

---

### 2. Navigating the AWS Management Console

I learned how to navigate the AWS Console and access EC2 services.

![EC2 Console Navigation](./intro1.png)

*Figure 1: Accessing EC2 from the AWS Management Console*

**Areas Explored**

- AWS Dashboard
- EC2 Dashboard
- Running Instances
- Instance Launch Wizard
- Security Groups
- Key Pairs
- Volumes
- Elastic IPs
- Monitoring Section

**Skills Gained**

- Navigating AWS regions
- Understanding resource organization
- Managing cloud resources from the console

---

### 3. Understanding VPC and Networking

I learned how Virtual Private Cloud (VPC) provides network isolation for EC2 instances.

![VPC Configuration](./edit-vpc11.png)

*Figure 2: Configuring VPC settings for EC2*

**VPC Concepts Explored**

| Concept | Purpose |
|---------|---------|
| VPC CIDR block | IP address range for your cloud network |
| Subnets | Segments of VPC (public vs. private) |
| Route tables | Direct traffic between subnets and internet |
| Internet Gateway | Allows internet access to public subnets |
| Security Groups | Instance-level firewall |
| NACLs | Subnet-level firewall |

**Public vs Private Subnets**

- **Public Subnet**: Has route to Internet Gateway; instances get public IPs
- **Private Subnet**: No direct internet access; more secure for databases
- **Best Practice**: Web servers in public subnets, databases in private subnets

---

### 4. Understanding Security Groups

Security Groups act as virtual firewalls for EC2 instances.

![Security Group Configuration](./vpc-group12.png)

*Figure 3: Configuring security group rules for EC2 instances*

**Security Group Rules Configured**

| Rule Type | Protocol | Port | Source | Purpose |
|-----------|----------|------|--------|---------|
| SSH | TCP | 22 | My IP | Secure remote administration |
| HTTP | TCP | 80 | 0.0.0.0/0 | Web server access |
| HTTPS | TCP | 443 | 0.0.0.0/0 | Secure web access |
| MySQL/Aurora | TCP | 3306 | App SG | Database access |

**Key Security Group Principles**

- Stateful (return traffic automatically allowed)
- Can reference other security groups, not just IP addresses
- Inbound rules control incoming traffic
- Outbound rules control outgoing traffic
- Changes apply immediately to all associated instances

---

### 5. Understanding IAM Roles for EC2

IAM roles provide permissions to EC2 instances and other AWS services.

![IAM Execution Role](./execution-role6.png)

*Figure 4: Configuring IAM execution role for EC2*

**Key Concepts**

- IAM roles vs. users — roles are for services, users are for people
- Least privilege principle — only grant what is needed
- Trust policies define which services can assume the role
- Permission policies define what actions the role can perform

**Example IAM Policy for EC2 Access:**

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ec2:DescribeInstances",
                "ec2:StartInstances",
                "ec2:StopInstances"
            ],
            "Resource": "*"
        }
    ]
}
```

---

### 6. Configuring AWS CLI for EC2 Management

I learned how to configure AWS CLI to manage EC2 instances from the command line.

![AWS CLI Configuration](./aws-configure17.png)

*Figure 5: Configuring AWS CLI with access keys*

**AWS CLI Configuration Steps:**

```bash
aws configure
AWS Access Key ID:     <your-access-key>
AWS Secret Access Key: <your-secret-key>
Default region name:   us-west-2
Default output format: json
```

**Configuration Components**

| Component | Purpose |
|-----------|---------|
| Access Key ID | Identifies the IAM user (starts with AKIA) |
| Secret Access Key | Password equivalent — keep secret! |
| Region | Where API calls are sent |
| Output format | json, yaml, text, or table |

**Where Credentials Are Stored**

- `~/.aws/credentials` — Access keys
- `~/.aws/config` — Region and output settings

> ⚠️ **Security Warning**: Never share or commit credentials. Use IAM roles on EC2 instances instead of long-term access keys wherever possible.

---

### 7. EC2 vs Serverless — Understanding the Trade-offs

| Feature | AWS Lambda | EC2 |
|---------|------------|-----|
| Server management | AWS handles | You manage |
| Scaling | Automatic | Manual or Auto Scaling |
| Cost model | Pay per request + duration | Pay per hour (even when idle) |
| Execution timeout | 15 minutes max | Unlimited |
| Best for | Event-driven, short tasks | Long-running, stateful apps |

**Monthly Cost Estimate**

| Instance Type | Use Case | Approx. Cost/Month |
|---------------|----------|--------------------|
| t2.micro | Dev/test, small apps | ~$8.50 |
| t3.small | Low-traffic web server | ~$15.00 |
| t3.medium | Medium workloads | ~$30.00 |

---

## Skills Summary

| Category | Skills Gained |
|----------|--------------|
| **EC2 Console** | Launching instances, managing state, connecting via SSH |
| **VPC & Networking** | Subnets, route tables, internet gateways, public vs private |
| **Security Groups** | Configuring inbound/outbound rules, referencing other SGs |
| **IAM** | Creating roles, attaching policies, least privilege principle |
| **AWS CLI** | Configuring credentials, running EC2 commands |
| **Cost Awareness** | Estimating monthly costs, comparing EC2 vs serverless |

---

## Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|---------|
| Connection timeout on SSH | Port 22 not open | Add inbound SSH rule in Security Group |
| Instance unreachable | No public IP / wrong subnet | Ensure public subnet with Internet Gateway route |
| `AccessDeniedException` | Missing IAM permissions | Attach the required policy to the IAM role |
| High unexpected cost | Instance left running | Stop or terminate unused instances; set billing alerts |
| Can't reach the internet from instance | Missing Internet Gateway route | Add `0.0.0.0/0 → igw-xxxx` to public route table |

---

## Next Learning Goals

| Topic | Why It's Important |
|-------|-------------------|
| Load Balancers | Distribute traffic across multiple EC2 instances |
| Auto Scaling | Automatically adjust capacity based on demand |
| AMIs (Custom Images) | Launch pre-configured instances faster |
| Elastic IPs | Persistent public IP addresses for EC2 |
| EBS Volumes | Persistent block storage attached to instances |
| IAM Roles Deep Dive | Advanced permission management for EC2 |
| VPC Peering | Connect multiple VPCs securely |
| CloudFormation | Automate EC2 and VPC provisioning as code |

---

## Resources Used

- AWS Free Tier account
- AWS EC2 console
- AWS VPC console
- IAM console
- AWS CLI

---

## Final Reflection

This lab built a solid foundation in EC2 and AWS networking. Key takeaways:

**VPC and networking are foundational** — before launching any EC2 instance, you need to understand subnets, route tables, and security groups. Getting these wrong means your instance is either unreachable or insecure.

**Security Groups are your first defence** — the principle of least privilege applies directly here. Only open the ports you need, and restrict SSH to your own IP.

**IAM roles over access keys** — attaching an IAM role to an EC2 instance is always safer than embedding long-term credentials in the instance itself.

**Cost awareness matters** — unlike serverless, EC2 charges by the hour even when idle. Stopping unused instances is a habit worth building early.

---

**Lab Status**: ✅ COMPLETED
**Date**: May 13, 2026
**Environment**: AWS us-west-2 (Oregon)

---

*"In the cloud, you don't own the hardware — you own the configuration."*# 🖥️ AWS EC2: Elastic Compute Cloud Deep Dive

## What I Learned

### 1. What Amazon EC2 Is

Amazon EC2 (Elastic Compute Cloud) is an AWS service that allows users to create and manage virtual servers in the cloud.

EC2 provides scalable computing capacity without needing to buy or manage physical hardware.

**Common Uses of EC2**

- Hosting web applications
- Running Linux servers
- Backend APIs
- Databases
- Cloud labs and testing
- DevOps environments
- Security testing environments

---

### 2. Navigating the AWS Management Console

I learned how to navigate the AWS Console and access EC2 services.

![EC2 Console Navigation](./intro1.png)

*Figure 1: Accessing EC2 from the AWS Management Console*

**Areas Explored**

- AWS Dashboard
- EC2 Dashboard
- Running Instances
- Instance Launch Wizard
- Security Groups
- Key Pairs
- Volumes
- Elastic IPs
- Monitoring Section

**Skills Gained**

- Navigating AWS regions
- Understanding resource organization
- Managing cloud resources from the console

---

### 3. Understanding Lambda Functions (Project Context)

Before creating EC2 instances, I learned how serverless functions work in comparison to traditional servers.

![Lambda Function Creation](./create-function5.png)

*Figure 2: Creating a Lambda function for serverless computing*

**What I Learned About Lambda vs EC2**

| Feature | AWS Lambda | EC2 |
|---------|------------|-----|
| Server management | AWS handles | You manage |
| Scaling | Automatic | Manual or Auto Scaling |
| Cost model | Pay per request + duration | Pay per hour (even idle) |
| Execution timeout | 15 minutes max | Unlimited |
| Best for | Event-driven, short tasks | Long-running, stateful apps |

---

### 4. Understanding IAM Roles for EC2 and Lambda

I learned how IAM roles provide permissions to AWS services.

![IAM Execution Role](./execution-role6.png)

*Figure 3: Configuring IAM execution role for AWS services*

**Key Concepts Learned**

- IAM roles vs. users (roles are for services, users are for people)
- Least privilege principle
- Trust policies (which services can assume the role)
- Permission policies (what actions the role can perform)

**Example IAM Policy for EC2 Access:**
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ec2:DescribeInstances",
                "ec2:StartInstances",
                "ec2:StopInstances"
            ],
            "Resource": "*"
        }
    ]
}
```

---

### 5. Understanding VPC and Networking

I learned how Virtual Private Cloud (VPC) provides network isolation for EC2 instances.

![VPC Configuration](./edit-vpc11.png)

*Figure 4: Configuring VPC settings for EC2 and Lambda*

**VPC Concepts Explored**

| Concept | Purpose |
|---------|---------|
| VPC CIDR block | IP address range for your cloud network |
| Subnets | Segments of VPC (public vs. private) |
| Route tables | Direct traffic between subnets and internet |
| Internet Gateway | Allows internet access to public subnets |
| Security Groups | Instance-level firewall |
| NACLs | Subnet-level firewall |

**What I Learned About Public vs Private Subnets**

- **Public Subnet**: Has route to Internet Gateway, instances get public IPs
- **Private Subnet**: No direct internet access, more secure for databases
- **Best Practice**: Web servers in public subnets, databases in private subnets

---

### 6. Understanding Security Groups

Security Groups act as virtual firewalls for EC2 instances.

![Security Group Configuration](./vpc-group12.png)

*Figure 5: Configuring security group rules for EC2 instances*

**Security Group Rules I Configured**

| Rule Type | Protocol | Port | Source | Purpose |
|-----------|----------|------|--------|---------|
| SSH | TCP | 22 | My IP | Secure remote administration |
| HTTP | TCP | 80 | 0.0.0.0/0 | Web server access |
| HTTPS | TCP | 443 | 0.0.0.0/0 | Secure web access |
| MySQL/Aurora | TCP | 3306 | Lambda SG | Database access from Lambda |

**Key Security Group Principles Learned**

- Stateful (return traffic automatically allowed)
- Can reference other security groups (not just IPs)
- Inbound rules control incoming traffic
- Outbound rules control outgoing traffic
- Changes apply immediately to all associated instances

---

### 7. Creating Lambda Layers for Dependencies

I learned how Lambda layers help manage code dependencies.

![Creating Lambda Layer](./Creating-layer4.png)

*Figure 6: Creating a custom Lambda layer for PyMySQL library*

**What I Learned About Lambda Layers**

**Purpose**: Layers allow you to package libraries and dependencies separately from function code.

**Layer Creation Process:**
```bash
# 1. Install library in python folder
pip install pymysql -t python/

# 2. Zip the folder
zip -r pymysql-layer.zip python/

# 3. Upload to AWS Lambda as a layer
```

**Benefits of Layers:**
- Keep deployment packages small (<50MB)
- Share common code across multiple functions
- Update dependencies without changing function code
- Version control for libraries

---

### 8. Adding Layers to Functions

I learned how to attach existing layers to Lambda functions.

![Add Layer to Function](./add-layers7.png)

*Figure 7: Adding PyMySQL layer to Lambda function*

**Layer Selection Options:**

| Source | When to Use |
|--------|-------------|
| AWS Layers | Pre-built layers (Pandas, NumPy, etc.) |
| Custom Layers | Your own packaged dependencies |
| Specify ARN | Layers from other AWS accounts |

**Compatibility Checklist:**
- ✅ Runtime matches (Python 3.14)
- ✅ Architecture matches (arm64 or x86_64)
- ✅ Region matches (layers are region-specific)

---

### 9. Writing Lambda Function Code

I learned how to write Python code for Lambda functions that interacts with databases.

![Lambda Code Source](./code-source10.png)

*Figure 8: Writing Lambda function code for sales analysis*

**Complete Lambda Function Code:**
```python
import boto3
import pymysql
import json
from datetime import datetime

def lambda_handler(event, context):
    """
    Extracts sales analysis data from MariaDB database
    """
    
    # Retrieve database credentials from Parameter Store
    ssm = boto3.client('ssm')
    
    dbUrl = ssm.get_parameter(Name='/cafe/dbUrl')['Parameter']['Value']
    dbName = ssm.get_parameter(Name='/cafe/dbName')['Parameter']['Value']
    dbUser = ssm.get_parameter(Name='/cafe/dbUser')['Parameter']['Value']
    dbPassword = ssm.get_parameter(Name='/cafe/dbPassword')['Parameter']['Value']
    
    # Establish database connection
    try:
        conn = pymysql.connect(
            host=dbUrl,
            user=dbUser,
            password=dbPassword,
            database=dbName,
            cursorclass=pymysql.cursors.DictCursor
        )
        
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM sales WHERE date = CURDATE()")
            results = cursor.fetchall()
            
        conn.close()
        
        return {
            'statusCode': 200,
            'body': json.dumps(results)
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
```

**Key Coding Concepts Learned:**
- Never hardcode credentials (use Parameter Store)
- Always use try-except blocks for error handling
- Return proper HTTP status codes
- Log errors to CloudWatch for debugging

---

### 10. Understanding Runtime Settings

I learned how to configure Lambda runtime settings.

![Runtime Settings](./run-time8.png)

*Figure 9: Configuring runtime and handler settings*

**Runtime Configuration Options:**

| Setting | My Configuration | Purpose |
|---------|-----------------|---------|
| Runtime | Python 3.14 | Language version |
| Handler | `filename.function_name` | Entry point for code |
| Architecture | arm64 | CPU type (cheaper than x86_64) |
| Memory | 128 MB - 10 GB | RAM allocation (affects CPU) |
| Timeout | 3 seconds - 15 minutes | Maximum execution time |

**Handler Format Explained:**
```
salesAnalysisReportDataExtractor.lambda_handler
│                              │
│                              └── Function name inside file
└── Python file name (without .py)
```

---

### 11. Uploading Deployment Packages

I learned how to upload code to Lambda functions.

![Upload Code Package](./upload9.png)

*Figure 10: Uploading deployment package .zip file*

**Deployment Package Limits:**

| Upload Method | Maximum Size |
|---------------|--------------|
| Direct console upload | 50 MB (zipped) |
| Amazon S3 upload | 250 MB (unzipped) |
| Container image | 10 GB |

**Best Practices for Deployment Packages:**
- Put dependencies in layers (not in package)
- Remove test files and documentation
- Use `.gitignore` to exclude unnecessary files
- Compress efficiently (no nested folders if possible)

---

### 12. Creating Test Events

I learned how to create test events to invoke Lambda functions.

![Create Test Event](./create-test-event14.png)

*Figure 11: Creating test event for Lambda invocation*

**Test Event Structure:**
```json
{
    "dbUrl": "cafe-db.cafeshop.us-west-2.rds.amazonaws.com",
    "dbName": "cafe_db",
    "dbUser": "cafe_user",
    "dbPassword": "CafePassword123!"
}
```

**Invocation Types:**

| Type | Behavior | Use Case |
|------|----------|----------|
| Synchronous | Waits for response (max 15 min) | API Gateway, testing |
| Asynchronous | Queues execution, returns immediately | S3 events, scheduled tasks |

**Event Sharing Settings:**
- **Private**: Only visible to you (good for personal testing)
- **Shared**: Visible to team members (good for collaboration)

---

### 13. Creating SNS Topics for Notifications

I learned how to create SNS topics for email notifications.

![Create SNS Topic](./create-topic15.png)

*Figure 12: Creating SNS topic for report delivery*

**SNS Topic Types:**

| Feature | Standard | FIFO |
|---------|----------|------|
| Message ordering | Best-effort | Strict (FIFO) |
| Delivery | At-least-once | Exactly-once |
| Throughput | High (unlimited) | 300 msg/sec |
| Protocols | SQS, Lambda, HTTP, Email, SMS | SQS only |

**Topic Configuration:**
- **Name**: `salesAnalysisReportTopic`
- **Type**: Standard (for email notifications)
- **Display name**: First 10 characters appear in SMS

---

### 14. Creating Email Subscriptions

I learned how to subscribe email endpoints to SNS topics.

![Create Subscription](./subscription16.png)

*Figure 13: Creating email subscription for report delivery*

**Subscription Workflow:**
1. Create subscription with protocol "Email"
2. Enter endpoint email address
3. AWS sends confirmation email
4. User clicks confirmation link
5. Subscription becomes "Confirmed"
6. Messages are delivered

**Critical Understanding**: Without clicking the confirmation link, NO emails will be received!

**Confirmation Email Example:**
```
From: AWS Notifications <no-reply@sns.amazonaws.com>
Subject: AWS Notification - Subscription Confirmation

Please confirm your subscription by clicking:
https://sns.us-west-2.amazonaws.com/confirmation.html?...
```

---

### 15. Configuring AWS CLI

I learned how to configure AWS CLI for command-line management.

![AWS CLI Configuration](./aws-configure17.png)

*Figure 14: Configuring AWS CLI with access keys*

**AWS CLI Configuration Steps:**
```bash
aws configure
AWS Access Key ID: AKIAXHD3RNH5K5NW74TV
AWS Secret Access Key: Keeping it as a Secret
Default region name: us-west-2
Default output format: json
```

**Configuration Components:**

| Component | Purpose |
|-----------|---------|
| Access Key ID | Identifies the IAM user (starts with AKIA) |
| Secret Access Key | Password equivalent (KEEP SECRET!) |
| Region | Where API calls are sent |
| Output format | json, yaml, text, or table |

**Where Credentials Are Stored:**
- `~/.aws/credentials` - Access keys
- `~/.aws/config` - Region and output settings

**Security Warning**: Never share screenshots with visible access keys in production environments!

---

### 16. Understanding the Complete Architecture

I learned how all AWS services work together in a complete solution.

![Complete Architecture](./diagram2.png)

*Figure 15: Complete architecture diagram of the sales analysis system*

**The 6-Step Workflow:**

| Step | Action | Service |
|------|--------|---------|
| 1 | CloudWatch Events triggers Lambda at 8 PM daily | CloudWatch Events |
| 2 | Main Lambda function invokes data extractor | Lambda |
| 3 | Data extractor queries MariaDB database | Lambda + VPC |
| 4 | Query results returned to main function | Lambda |
| 5 | Results formatted and published to SNS topic | SNS |
| 6 | Email sent to administrator | SNS + Email |

**Services Used Together:**
- **Lambda** - Serverless compute
- **CloudWatch Events** - Scheduled triggers
- **SNS** - Email notifications
- **VPC** - Network isolation
- **IAM** - Security permissions
- **Parameter Store** - Secrets management

---

## Skills Summary

**Skills I Gained from This Lab:**

| Category | Skills |
|----------|--------|
| **AWS Console** | Navigating services, finding resources, understanding regions |
| **Lambda** | Creating functions, attaching layers, configuring triggers |
| **VPC & Networking** | Configuring subnets, security groups, understanding private vs public |
| **IAM** | Creating roles, attaching policies, least privilege principle |
| **SNS** | Creating topics, subscribing endpoints, confirming subscriptions |
| **Python** | Writing Lambda handlers, using boto3, error handling |
| **Databases** | Connecting to MySQL/MariaDB, querying data, PyMySQL library |
| **CLI** | Configuring AWS CLI, running commands, managing keys |
| **Monitoring** | CloudWatch Logs, debugging, error tracking |

---

## Why Lambda Matters for Cloud Practitioner Exam

**Exam Topics Covered:**

| Exam Domain | What I Learned |
|-------------|----------------|
| **Compute Services** | Lambda vs EC2 comparison, serverless benefits |
| **Serverless Value Prop** | No server management, automatic scaling, pay-per-use |
| **AWS Global Infrastructure** | Lambda runs across Availability Zones |
| **Pricing Models** | Pay per request + compute duration (GB-seconds) |
| **Security** | IAM roles for Lambda execution permissions |
| **VPC** | Connecting Lambda to private resources |
| **SNS** | Notification services, email delivery |

**Lambda Facts to Memorize for Exam:**

- Maximum execution time: **15 minutes**
- Maximum memory: **10 GB**
- Temporary storage: **512 MB** (`/tmp`)
- Deployment package limit: **50 MB (zipped)**
- Free tier: **1 million requests/month** + 400,000 GB-seconds

---

## Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `ModuleNotFoundError: No module named 'pymysql'` | Layer not attached | Verify layer is added and runtime matches |
| `Timeout` | Function can't reach database | Check VPC, security groups, and routing |
| `AccessDeniedException` | Missing IAM permissions | Add required policies to execution role |
| `Cannot find handler` | Wrong handler format | Use `filename.function_name` format |
| `No email received` | Subscription not confirmed | Click confirmation link from AWS email |

---

## Cost Analysis

**Monthly Cost Estimate (26 invocations):**

| Service | Usage | Cost |
|---------|-------|------|
| Lambda | 26 invocations × 2 seconds × 128MB | ~$0.00011 |
| SNS | 26 email deliveries | ~$0.10 |
| CloudWatch Logs | 1 MB storage | ~$0.0005 |
| Parameter Store | 4 parameters | $0.00 (free tier) |
| **TOTAL** | | **~$0.10/month** |

**Traditional EC2 alternative**: $8.50/month for t2.micro (98% savings with serverless!)

---

## Next Learning Goals

Based on this lab, here's what I plan to learn next:

| Topic | Why It's Important |
|-------|---------------------|
| Load Balancers | Distribute traffic across multiple instances |
| Auto Scaling | Automatically adjust capacity based on demand |
| IAM Roles Deep Dive | Advanced permission management |
| S3 Integration | Store and retrieve files from Lambda |
| CloudWatch Alarms | Proactive monitoring and alerting |
| Step Functions | Orchestrate multiple Lambda functions |
| API Gateway | Create REST APIs with Lambda backend |
| DynamoDB | Serverless database for Lambda apps |
| VPC Peering | Connect multiple VPCs securely |
| Infrastructure as Code | Automate deployment with CloudFormation |

---

## Resources Used

- AWS Free Tier account
- AWS Lambda console
- AWS CloudWatch Events
- Amazon SNS
- Systems Manager Parameter Store
- PyMySQL library (via Lambda layer)
- MariaDB database on EC2

---

## Final Reflection

This lab transformed my understanding of serverless computing. I learned that:

**Serverless is not magic** - It requires careful VPC, IAM, and security group configuration. The trade-off for "no servers" is understanding AWS networking deeply.

**Layers solve real problems** - Without layers, packaging PyMySQL would have been frustrating. Now I see why teams use them for shared dependencies.

**Event-driven architecture scales** - The pattern (CloudWatch Events → Lambda → SNS) works for billing alerts, security notifications, or business reports at any scale.

**Testing is critical** - Lambda's stateless nature means each invocation is fresh. Testing with different event payloads caught permission issues before "production."

**Cost awareness is a feature** - This solution costs $0.10/month vs $8.50 for EC2. Understanding serverless pricing is now a core skill.

---

**Lab Status**: ✅ COMPLETED  
**Date**: May 13, 2026  
**Environment**: AWS us-west-2 (Oregon)  
**Account ID**: 4963-2781-3604

---

*"Serverless isn't about no servers. It's about not managing servers." - Anonymous AWS Engineer*

---

This format matches your EC2 example exactly - each concept has its own numbered section, with images placed immediately after the relevant explanation. Would you like me to create similar documentation for your other labs (S3, VPC, DynamoDB, etc.)?# 🏅 Certs & Badges

> Tracking certification progress, simulearns, and badges earned on my AWS cloud learning journey.

---

## 📊 Progress Summary

| Simulearn | Status | Started | Completed | Badge |
|-----------|--------|---------|-----------|-------|
| 1 – Cloud Foundations | ✅ Completed | May 15, 2026 | May 18, 2026 | 🏅 Earned |
| 2 – File Systems in the Cloud | ✅ Completed | May 19, 2026 | May 20, 2026 | 🏅 Earned |
| 3 – Networking Concepts | ✅ Completed | June 01, 2026 | June 02, 2026 | 🏅 Earned |

**Total Badges Earned: 3 / 3**

---

## 🎓 Simulearns

### Simulearn 1 – Cloud Foundations

| Status | Started | Completed |
|--------|---------|-----------|
| ✅ Completed | May 15, 2026 | May 18, 2026 |

<details>
<summary><strong>Topics Covered</strong></summary>

| Topic | What I Learned |
|-------|----------------|
| AWS Global Infrastructure | Regions, Availability Zones, Edge Locations |
| Compute Services | EC2 instance types, AMIs, instance lifecycle |
| Storage Services | S3 storage classes, EBS volumes, object vs block storage |
| Database Services | RDS, DynamoDB, Aurora comparisons |
| Networking | VPC basics, subnets, security groups |
| IAM | Users, groups, roles, policies, MFA |
| Pricing Models | On-Demand, Reserved, Spot, Savings Plans |
| Shared Responsibility Model | AWS vs customer security responsibilities |

</details>

<details>
<summary><strong>Key Takeaways</strong></summary>

| Takeaway | Why It Matters |
|----------|----------------|
| Choose region based on latency, cost, and compliance | Affects performance and legal requirements |
| IAM least privilege principle | Only grant necessary permissions to reduce risk |
| EC2 stop vs terminate | Stopped instances retain EBS volumes, terminated do not |
| S3 is 11 nines durable | Designed for 99.999999999% durability |
| Security groups are stateful | No need for separate inbound/outbound rules for return traffic |

</details>

🏅 **Badge Earned:** AWS Cloud Foundations — Issued May 18, 2026

---

### Simulearn 2 – File Systems in the Cloud

| Status | Started | Completed |
|--------|---------|-----------|
| ✅ Completed | May 19, 2026 | May 20, 2026 |

<details>
<summary><strong>Topics Covered</strong></summary>

| Topic | What I Learned |
|-------|----------------|
| Amazon EFS | Serverless, elastic file system for Linux workloads |
| EFS Storage Classes | Standard, Infrequent Access (IA), Archive |
| Mount Targets | NFSv4 endpoints in each Availability Zone |
| Security Groups | NFS port 2049 inbound rules |
| EFS vs EBS | Shared vs block storage, multi-AZ vs single AZ |
| amazon-efs-utils | AWS utilities for easier EFS mounting |
| Lifecycle Management | Automatically move files between storage classes |
| Performance Modes | General Purpose vs Max I/O |
| Throughput Modes | Bursting vs Provisioned |

</details>

<details>
<summary><strong>Key Takeaways</strong></summary>

| Takeaway | Why It Matters |
|----------|----------------|
| EFS is shared storage | Multiple EC2 instances across AZs can access same files |
| EFS grows automatically | No need to provision capacity in advance |
| Mount targets per AZ | Each AZ needs its own mount target for EC2 access |
| Security is critical | NFS port 2049 must be restricted to trusted sources |
| amazon-efs-utils simplifies mounting | `mount -t efs` instead of standard NFS commands |

</details>

<details>
<summary><strong>What I Did</strong></summary>

- Created an EFS file system
- Configured mount targets across three Availability Zones
- Set up security groups with NFS inbound rules
- Installed `amazon-efs-utils` on EC2 instances
- Mounted EFS to multiple EC2 instances
- Verified shared storage across all instances

</details>

<details>
<summary><strong>Commands Used</strong></summary>

```bash
# Install EFS utilities
sudo yum install -y amazon-efs-utils

# Create mount directory
mkdir /data

# Mount EFS
sudo mount -t efs fs-xxxxxxxxxxxxx:/ /data

# Verify mount
df -h | grep efs

# Create test file
sudo bash -c "echo 'Shared test content' > /data/test-file.log"

# Verify on second instance
cat /data/test-file.log
```

</details>

🏅 **Badge Earned:** AWS File Systems — Issued May 20, 2026

---

### Simulearn 3 – Networking Concepts

| Status | Started | Completed |
|--------|---------|-----------|
| ✅ Completed | June 01, 2026 | June 02, 2026 |

> **Certificate Issued by:** Michelle Vaz, Director, AWS Training & Certification  
> **Awarded to:** Owen Lethabo

<details>
<summary><strong>Topics Covered</strong></summary>

| Topic | What I Learned |
|-------|----------------|
| Virtual Private Cloud (VPC) | Logically isolated network in AWS |
| Public Subnets | Subnets with route to Internet Gateway (`10.10.0.0/24`) |
| Private Subnets | Subnets without Internet Gateway access (`10.10.2.0/24`) |
| Internet Gateway | Enables internet access for public subnets |
| Route Tables | Control traffic flow between subnets and internet |
| Security Groups | Stateful firewalls controlling inbound/outbound traffic |
| Inbound Rules | Control incoming traffic (HTTP port 80, MySQL port 3306) |
| Outbound Rules | Control outgoing traffic from instances |
| MySQL/Aurora Port 3306 | Database port requiring explicit security group rules |
| Connection Validation | Testing cross-subnet connectivity on specific ports |
| `0.0.0.0/0` CIDR | Allows all IP addresses (not recommended for production) |

</details>

<details>
<summary><strong>Key Takeaways</strong></summary>

| Takeaway | Why It Matters |
|----------|----------------|
| Security groups are stateful | Inbound allow automatically permits return outbound traffic |
| Port 3306 must be explicitly allowed | DB server needs inbound rule from web server subnet |
| Restrict source CIDRs | Use specific subnets instead of `0.0.0.0/0` |
| Route tables determine subnet type | Public subnets have IGW route, private subnets do not |
| Connection timeout = missing rule | Security group or route table issue |
| Web server needs outbound to DB | Outbound rule on port 3306 to DB subnet |
| DB server needs inbound from web | Inbound rule on port 3306 from web subnet |

</details>

<details>
<summary><strong>What I Did</strong></summary>

- Created a VPC with CIDR block `10.10.0.0/16`
- Created public subnet (`10.10.0.0/24`) for web server
- Created private subnet (`10.10.2.0/24`) for database server
- Attached Internet Gateway to VPC
- Configured public route table with `0.0.0.0/0 → IGW`
- Associated public route table with web server subnet
- Configured Web Server Security Group inbound rule: HTTP port 80 from `0.0.0.0/0`
- Configured DB Server Security Group inbound rule: MySQL port 3306 from web subnet (`10.10.0.0/24`)
- Configured Web Server Security Group outbound rule: MySQL port 3306 to DB subnet (`10.10.2.0/24`)
- Verified connectivity between web server and database server
- Troubleshot connection timeout errors by adjusting security group rules

</details>

<details>
<summary><strong>Security Group Rules Configured</strong></summary>

| Security Group | Type | Protocol | Port | Source / Destination |
|----------------|------|----------|------|----------------------|
| WebServerSecurityGroup | HTTP (Inbound) | TCP | 80 | `0.0.0.0/0` |
| WebServerSecurityGroup | MySQL/Aurora (Outbound) | TCP | 3306 | `10.10.2.0/24` |
| DBServerSecurityGroup | MySQL/Aurora (Inbound) | TCP | 3306 | `10.10.0.0/24` |

</details>

<details>
<summary><strong>Route Table Configuration</strong></summary>

| Destination | Target | Status | Purpose |
|-------------|--------|--------|---------|
| `10.10.0.0/16` | local | Active | Internal VPC routing |
| `0.0.0.0/0` | `igw-0b13fa1473373ea51` | Active | Internet access for public subnet |

</details>

<details>
<summary><strong>Commands Used</strong></summary>

```bash
# Verify security group rules (AWS CLI)
aws ec2 describe-security-groups --group-ids sg-099a7817b4e1b6ece

# Test connectivity from web server
telnet 10.10.2.10 3306

# Check route table associations
aws ec2 describe-route-tables --route-table-ids rtb-0e07bee7158ed107d

# View instances in each subnet
aws ec2 describe-instances --filters "Name=vpc-id,Values=vpc-00a4c61dd6723a268"
```


*Last updated: June 02, 2026*

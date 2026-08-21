# Amazon Inspector: Vulnerability Management in the Cloud

**Date Completed:** _add date_

**Time Spent:** 1 hour

**Service:** Amazon Inspector (Vulnerability Management Service)

---

## What I Learned

### 1. What Amazon Inspector Is

Amazon Inspector is a vulnerability management service that continuously scans AWS workloads for software vulnerabilities and unintended network exposure.

**Key Capabilities:**
- Scans EC2 instances for operating system and package vulnerabilities
- Scans container images in Amazon ECR for known CVEs
- Scans Lambda functions for code dependencies with vulnerabilities
- Provides finding reports with severity scores and remediation steps

**What Inspector Scans:**

| Resource | What It Checks |
|----------|----------------|
| EC2 Instances | OS vulnerabilities, missing patches, network exposure |
| Container Images | Known CVEs in container layers |
| Lambda Functions | Vulnerabilities in Python, Node.js, Java dependencies |
| Code Repositories | Infrastructure as code misconfigurations |

**Common Uses of Inspector:**
- Continuous compliance monitoring
- Identifying unpatched CVEs before exploitation
- Detecting internet-exposed resources
- Automating vulnerability reporting for audits

---

### 2. Navigating the AWS Management Console for Inspector

I learned how to navigate the AWS Console and access Inspector services.

**Areas Explored:**

- Inspector Dashboard
- Activate Inspector
- Findings
- EC2 instances coverage
- Container repositories coverage
- Lambda functions coverage
- Scan settings

**Skills Gained:**
- Navigating AWS regions for Inspector (us-west-2)
- Understanding finding severity levels (Critical, High, Medium, Low)
- Managing vulnerability assessments from the console

---

### 3. Activating Amazon Inspector

I learned how to activate Amazon Inspector for an AWS account.

**Activation Screen:**

![Activate Inspector](activating-inspector-2.png)

*Figure 1: Activating Amazon Inspector*

**Service Permissions Granted:**
When you activate Inspector, you grant it permission to:
- Discover and classify sensitive data
- Generate findings about potential security issues
- Scan EC2 instances, container images, and Lambda functions

**Activation Steps:**
1. Navigate to Amazon Inspector in AWS Console
2. Click "Activate this account"
3. Review the required IAM permissions
4. Confirm activation

**Free Trial:**
- 15-day free trial for EC2 scanning, ECR container scanning, and Lambda scanning
- After trial, pay per resource scanned per month

---

### 4. Understanding Resource Coverage

I learned how Inspector covers different AWS resource types.

**Resource Coverage from Lab:**

| Resource Type | Scanning Status | Count |
|---------------|-----------------|-------|
| EC2 instances | Scanning | 0 |
| Container repositories | Scanning | 0 |
| Container images | Scanning | 0 |
| Lambda functions | Scanning | 2 |
| Code repositories | Not scanning | 0 |

**From Resource Coverage Screen:**

```
EC2 instances: Scanning: 0 | Not scanning: 0
Container repositories: Scanning: 0 | Not scanning: 0
Container images: Scanning: 0 | Not scanning: 0
Lambda functions: Scanning: 2 | Not scanning: 0
Code repositories: Scanning: 0 | Not scanning: 0
```

**What This Means:**
- Inspector was actively scanning 2 Lambda functions in my account
- Each Lambda function was checked for vulnerable dependencies
- Findings are generated automatically when vulnerabilities are found

---

### 5. Understanding Lambda Function Scanning

I learned how Inspector scans Lambda functions for vulnerable dependencies.

**Lambda Function Scanned:**

| Field | Value |
|-------|-------|
| Function Name | `get-request` |
| Function ARN | `arn:aws:lambda:us-west-2:483533674646:function:get-request` |
| Runtime | Python (implied) |
| Dependencies | requests==2.20.0 |
| Last Modified | 10 minutes ago |

**How Lambda Scanning Works:**

```
1. Developer uploads Lambda function code
2. Inspector automatically detects the function
3. Inspector scans the deployment package
4. Inspector checks dependencies against CVE database
5. Vulnerabilities are reported as findings
```

**What Inspector Checks in Lambda:**
- Python packages (requirements.txt)
- Node.js modules (package.json)
- Java dependencies (pom.xml, build.gradle)
- .NET packages

---

### 6. Understanding Findings

I learned how to view and interpret Inspector findings.

**Findings Dashboard:**

![Findings](findings-3.png)

*Figure 2: Inspector findings dashboard showing medium severity CVE*

**Finding Details from Lab:**

| Field | Value |
|-------|-------|
| Severity | Medium |
| CVE ID | CVE-2024-47081 - requests |
| Impacted Resource | `get-request` (Lambda function) |
| Type | Package Vulnerability |
| Age | 1 minute |
| Status | Active |

**Other CVEs Found:**

| CVE ID | Package | Severity |
|--------|---------|----------|
| CVE-2024-47081 | requests | Medium |
| CVE-2023-32681 | requests | Medium |
| CVE-2023-46746 | requests | - |
| CVE-2024-35195 | requests | Medium |
| CVE-2026-25645 | requests | - |

**What This Means:**
- The Lambda function `get-request` was using `requests==2.20.0`
- This version of the `requests` library has known security vulnerabilities
- Inspector automatically detected these CVEs
- Each finding provides remediation guidance

---

### 7. Understanding CVE (Common Vulnerabilities and Exposures)

I learned what CVEs are and why they matter.

**What is a CVE?**
A CVE is a publicly known cybersecurity vulnerability with a unique identifier.

**CVE Structure:**
```
CVE-2024-47081
│    │      │
│    │      └── Unique identifier
│    └── Year discovered
└── Common Vulnerabilities and Exposures
```

**CVE Severity Levels (CVSS Score):**

| Severity | CVSS Score | Example Impact |
|----------|------------|----------------|
| Critical | 9.0 - 10.0 | Remote code execution, data breach |
| High | 7.0 - 8.9 | Privilege escalation, data tampering |
| Medium | 4.0 - 6.9 | Denial of service, information disclosure |
| Low | 0.1 - 3.9 | Limited impact, difficult to exploit |

---

### 8. Understanding the requests Package Vulnerability

I learned about the specific vulnerability found in my Lambda function.

**What is the requests Package?**
The `requests` library is a popular Python package for making HTTP requests.

**Vulnerability Details (CVE-2024-47081):**

| Aspect | Information |
|--------|-------------|
| Package | requests |
| Vulnerable Version | 2.20.0 |
| Fixed Version | 2.32.0+ |
| Impact | Redirect URL validation bypass |
| Risk | Potential information disclosure |

**How the Vulnerability Works:**

```python
# Vulnerable code (uses requests 2.20.0)
import requests
response = requests.get('http://example.com', allow_redirects=True)
# Attacker could redirect to malicious site without validation
```

**Remediation:**
```bash
# Upgrade to patched version
pip install requests>=2.32.0
```

---

### 9. Understanding Finding Status

I learned how to track finding remediation.

**Finding Status Flow:**

```
Active  In Progress  Closed
   │
   └── Suppressed (false positive or accepted risk)
```

**Closed Findings from Lab:**

| CVE | Status | Age |
|-----|--------|-----|
| CVE-2024-47081 - requests | Closed | 7 minutes |
| CVE-2023-32681 - requests | Closed | 7 minutes |
| CVE-2026-25645 - requests | Closed | 7 minutes |
| CVE-2024-35195 - requests | Closed | 7 minutes |
| CVE-2023-46746 - requests | Closed | 7 minutes |

**Why Findings Were Closed:**
- The Lambda function code was updated
- The `requests` package was upgraded to a secure version
- Inspector re-scanned and confirmed the vulnerability was fixed

---

### 10. Understanding Inspector Integration

I learned how Inspector integrates with other AWS services.

**Service Integration:**

| Service | Integration |
|---------|-------------|
| Security Hub | Findings are sent to Security Hub for central visibility |
| CloudWatch | Alarms can be triggered on critical findings |
| EventBridge | Automate response to new vulnerabilities |
| Systems Manager | Patch remediation for EC2 instances |

**Finding Details from Lab:**

| Field | Value |
|-------|-------|
| AWS Account ID | 483533674646 |
| Inspector Score | (displayed at vulnerability site) |
| Finding Overview | CVE details and impacted resources |

---

### 11. Understanding Lambda Function Code with Vulnerability

I examined the Lambda function that had the vulnerable dependency.

**Lambda Function Details:**

![Lambda Function](lambda-function-4.png)

*Figure 3: Lambda function overview showing get-request function*

**Function Configuration:**

| Field | Value |
|-------|-------|
| Function Name | `get-request` |
| Function ARN | `arn:aws:lambda:us-west-2:483533674646:function:get-request` |
| Application | `c208432a52965891f5453970t1w483533674646` |
| Last Modified | 10 minutes ago |

**Dependency File (requirements.txt):**

```
requests==2.20.0
```

**What This Code Does:**
- Makes HTTP requests using the `requests` library
- Version 2.20.0 is vulnerable to redirect-related security issues
- An attacker could potentially exploit this to access internal resources

---

### 12. Understanding Remediation Steps

I learned how to fix the vulnerabilities found by Inspector.

**Step 1: Identify Vulnerable Package**

Inspector finding shows:
- Package: `requests`
- Current version: `2.20.0`
- Vulnerability: CVE-2024-47081

**Step 2: Check Latest Secure Version**

```bash
# Check available versions
pip index versions requests

# Output shows latest version (e.g., 2.32.0)
```

**Step 3: Update requirements.txt**

```txt
# Before
requests==2.20.0

# After
requests==2.32.0
```

**Step 4: Redeploy Lambda Function**

```bash
# Update function code with new requirements
zip -r function.zip .
aws lambda update-function-code \
  --function-name get-request \
  --zip-file fileb://function.zip
```

**Step 5: Verify Fix**

Inspector automatically re-scans and updates the finding status to "Closed"

---

### 13. Understanding Inspector Architecture

I learned how Inspector scans resources in AWS.

**Scanning Architecture:**

```
┌─────────────────────────────────────────────────────────────┐
│                      AWS Account                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   EC2       │  │   ECR       │  │   Lambda    │         │
│  │  Instance   │  │ Repository  │  │  Function   │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
│         │                │                │                 │
│         ▼                ▼                ▼                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Amazon Inspector                        │   │
│  │  - Scans OS and package vulnerabilities              │   │
│  │  - Checks network exposure                           │   │
│  │  - Compares against CVE database                     │   │
│  └─────────────────────────────────────────────────────┘   │
│         │                │                │                 │
│         ▼                ▼                ▼                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   Findings                           │   │
│  │  - Severity (Critical/High/Medium/Low)               │   │
│  │  - Remediation guidance                              │   │
│  │  - Affected resources                                │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

### 14. Understanding Lambda Function Code Source

I examined the code source of the vulnerable Lambda function.

**Code Source Explorer:**

```
EXPLORER
├── GET-REQUEST
│   ├── index.py
│   └── requirements.txt (requests==2.20.0)
```

**What This Shows:**
- The Lambda function is named `get-request`
- It has Python code (`index.py`)
- It uses external libraries defined in `requirements.txt`
- The `requests` library is pinned to version 2.20.0

**Why Pinning Versions Matters:**
- Pinning ensures consistent behaviour across environments
- But pinned versions can become outdated and vulnerable
- Regular updates are needed for security

---

## Skills Summary

**Skills I Gained from This Lab:**

| Category | Skills |
|----------|--------|
| Inspector | Activating Inspector, understanding resource coverage |
| Vulnerability Management | Identifying CVEs, understanding severity levels |
| Lambda Scanning | Scanning function dependencies, finding vulnerable packages |
| Findings Analysis | Reading finding details, understanding impacted resources |
| Remediation | Updating vulnerable packages, verifying fixes |
| CVE Understanding | CVE structure, severity scoring, disclosure process |

---

## Why Inspector Matters for Cloud Practitioner Exam

**Exam Topics Covered:**

| Exam Domain | What I Learned |
|-------------|----------------|
| Security Services | Inspector for vulnerability management |
| Threat Detection | Automated CVE scanning for AWS resources |
| Compliance | Continuous monitoring for security gaps |
| Remediation | Finding and fixing vulnerable dependencies |

**Inspector Facts to Memorise for Exam:**

| Fact | Value |
|------|-------|
| What Inspector scans | EC2, ECR, Lambda |
| Free trial duration | 15 days |
| Finding severity levels | Critical, High, Medium, Low |
| Integration with | Security Hub, EventBridge, CloudWatch |
| Primary purpose | Vulnerability management |

---

## Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| No findings appearing | Inspector not activated | Activate Inspector for the account |
| Lambda not scanned | Runtime not supported | Only Python, Node.js, Java, .NET are supported |
| False positives | Outdated CVE database | Review finding details, suppress if not applicable |
| Cannot activate | Missing IAM permissions | Ensure admin access or required permissions |

---

## Cost Analysis

**Inspector Pricing (us-west-2):**

| Resource | Price |
|----------|-------|
| EC2 instance scanning | $0.006 per instance hour |
| Container image scanning | $0.002 per image scan |
| Lambda function scanning | $0.003 per function scan |

**Free Trial:**
- 15 days free for all scanning types
- No cost during free trial period

**My Lab Cost:**
- 2 Lambda functions scanned
- Within free trial period
- Total cost: $0.00

---

## Next Learning Goals

| Topic | Why It's Important |
|-------|---------------------|
| Security Hub | Centralise findings from multiple security services |
| GuardDuty | Threat detection for AWS accounts |
| Systems Manager Patch Manager | Automate OS patching for EC2 |
| AWS Config | Resource compliance and configuration monitoring |
| CVE Database Research | Understand vulnerability disclosure process |

---

## Resources Used

- AWS Free Tier account (us-west-2 / Oregon)
- Amazon Inspector console
- Lambda function `get-request`
- `requests` Python package version 2.20.0
- CVE databases

---

## Final Reflection

This lab transformed my understanding of vulnerability management in AWS. I learned that:

**Vulnerability scanning is automated** – Inspector continuously scans resources without manual intervention. This is critical for maintaining security at scale.

**Dependencies are attack vectors** – The `requests` library vulnerability shows that even popular, well-maintained packages can have security flaws. Every dependency is a potential risk.

**Remediation is straightforward** – Updating a package version and redeploying the Lambda function fixed all CVEs. Inspector confirmed the fix automatically.

**Security is a shared responsibility** – AWS provides the scanning service (Inspector), but I am responsible for acting on the findings and updating my code.

**Finding severity matters** – Medium severity vulnerabilities should be addressed, but Critical findings require immediate action. Prioritisation is key.

---

## Lab Status:  COMPLETED

**Environment:** AWS us-west-2 (Oregon)

**Account ID:** 4835-3367-4646

**Lambda Functions Scanned:** 2

**Findings Identified:** 5+ CVEs

**Findings Resolved:** All closed

**Vulnerable Package:** requests==2.20.0

**Fixed Package:** requests>=2.32.0

---

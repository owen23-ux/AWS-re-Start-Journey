# AWS SimuLearn: Core Security Concepts (IAM)

**Status:**  Completed  
**Started:** June 11, 2026  
**Completed:** June 11, 2026

---

## Certificate

![AWS SimuLearn Certificate](Owen-security-concepts.pdf)

*Figure 1: AWS SimuLearn: Core Security Concepts completion certificate*

**Awarded to:** Owen Lethabo

**Date Completed:** June 11, 2026

---

## Status

| Status | Started | Completed |
|--------|---------|-----------|
|  Completed | June 2026 | June 11, 2026 |

---

## Topics Covered

| Topic | What I Learned |
|-------|----------------|
| **IAM User Groups** | Logical containers for managing permissions for multiple users |
| **IAM Users** | Individual identities representing people or applications |
| **Managed Policies** | AWS-created permission sets (e.g., ReadOnlyAccess) |
| **AmazonEC2ReadOnlyAccess** | Policy granting read-only access to EC2 resources |
| **AmazonRDSReadOnlyAccess** | Policy granting read-only access to RDS databases |
| **Least Privilege Principle** | Grant only the permissions needed for a specific job role |
| **Support Engineer Role** | Job function requiring read-only access to EC2 and RDS |
| **Policy Attachment** | Adding policies to user groups to grant permissions |
| **IAM User Creation** | Creating users with console access and custom passwords |
| **User Tags** | Key-value pairs for organising and identifying users |

---

## Key Takeaways

| Takeaway | Why It Matters |
|----------|----------------|
| **Use groups, not individual user policies** | Managing permissions at group level is more scalable and maintainable |
| **ReadOnlyAccess is not full access** | Support engineers can view but not modify resources – follows least privilege |
| **Multiple policies per group** | SupportEngineers group needed both EC2 and RDS read access |
| **IAM users belong to groups** | User support-engineer-1 was added to SupportEngineers group |
| **Custom passwords for console access** | Users need credentials to sign in to AWS Management Console |
| **Tags help organise users** | job-title: Support Engineer helps identify user's role |
| **Policy attachment is immediate** | Once policy is attached, permissions are available without delay |

---

## What I Did in This Simulearn

| Step | Action |
|------|--------|
| 1 | Created IAM user group named `SupportEngineers` |
| 2 | Attached `AmazonEC2ReadOnlyAccess` policy to the group |
| 3 | Attached `AmazonRDSReadOnlyAccess` policy to the group |
| 4 | Created IAM user `support-engineer-1` with custom console password |
| 5 | Added the user to the `SupportEngineers` group |
| 6 | Added tag `job-title: Support Engineer` to the user |
| 7 | Verified the group had both ReadOnly policies attached |
| 8 | Tested that user could view EC2 and RDS resources but not modify them |

---

## DIY Goals from Lab

**Goal:** Grant the "SupportEngineers" group read-only access to Amazon RDS.

**Solution Validation Method:** Our test server will verify that the SupportEngineers group was assigned EC2ReadOnlyAccess and RDSReadOnlyAccess.

---

## IAM Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         AWS Account                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   IAM User Group                          │  │
│  │                  SupportEngineers                         │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │              Managed Policies                       │  │  │
│  │  │  ┌─────────────────────┐ ┌─────────────────────┐   │  │  │
│  │  │  │ AmazonEC2           │ │ AmazonRDS           │   │  │  │
│  │  │  │ ReadOnlyAccess      │ │ ReadOnlyAccess      │   │  │  │
│  │  │  └─────────────────────┘ └─────────────────────┘   │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                           │                                │  │
│  │                           ▼                                │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │                   IAM Users                         │  │  │
│  │  │  ┌─────────────────────────────────────────────┐    │  │  │
│  │  │  │         support-engineer-1                  │    │  │  │
│  │  │  │         job-title: Support Engineer         │    │  │  │
│  │  │  └─────────────────────────────────────────────┘    │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                           │                                      │
│           ┌───────────────┴───────────────┐                      │
│           ▼                               ▼                      │
│  ┌─────────────────┐             ┌─────────────────┐             │
│  │   EC2 Instance   │             │   RDS Database   │             │
│  │   (Read Only)    │             │   (Read Only)    │             │
│  └─────────────────┘             └─────────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

---

## IAM User Group Creation

![Create User Group](iam-user-group-2.png)

*Figure 2: Creating the SupportEngineers user group*

| Setting | Value |
|---------|-------|
| User Group Name | `SupportEngineers` |

---

## IAM User Creation

![IAM User Creation](iam-user-3.png)

*Figure 3: Creating support-engineer-1 user*

| Setting | Value |
|---------|-------|
| User Name | `support-engineer-1` |
| Console Access |  Enabled |
| Password Type | Custom password |

---

## IAM User Tags

![IAM Tags](iam-tags-5.png)

*Figure 4: Adding tags to identify user role*

| Key | Value |
|-----|-------|
| job-title | Support Engineer |

---

## Group Permissions

![IAM Permissions](iam-permissions-4.png)

*Figure 5: Adding user to SupportEngineers group*

| Setting | Value |
|---------|-------|
| User Group | `SupportEngineers` |
| Attached Policies | AmazonEC2ReadOnlyAccess, AmazonRDSReadOnlyAccess |

---

## Policies Attached to Group

![Added Policies](added-second-rds-policy8.png)

*Figure 6: Policies attached to SupportEngineers group*

| Policy Name | Type |
|-------------|------|
| AmazonEC2ReadOnlyAccess | AWS managed |
| AmazonRDSReadOnlyAccess | AWS managed |

---

## AWS Account Information

![AWS Account](aws-account-6.png)

*Figure 7: AWS account context for the lab*

| Field | Value |
|-------|-------|
| Account ID | 8971-9670-4750 |
| Region | us-east-1 (N. Virginia) |
| Federated User | AWSLabsUser-0rH3Gy4mEq6ZqivNEjtkKQ/... |

---

## EC2 Instance (Read Only Access)

![EC2 Instance](terminate-instance-7.png)

*Figure 8: EC2 instance visible with ReadOnlyAccess*

| Field | Value |
|-------|-------|
| Instance ID | i-0754e29ac6a7dd03f |
| Instance Name | WebServer |
| Instance State | Running |
| Availability Zone | us-east-1b |
| Public IP | 98.92.191.250 |
| Private IP | 10.10.1.37 |

---

## Security Group Rules I Configured (Reference)

| Security Group | Type | Protocol | Port | Source | Purpose |
|----------------|------|----------|------|--------|---------|
| WebServerSecurityGroup | HTTP | TCP | 80 | 0.0.0.0/0 | Allow web traffic |
| WebServerSecurityGroup | MySQL/Aurora (Outbound) | TCP | 3306 | 10.10.2.0/24 | Allow web to DB |
| DBServerSecurityGroup | MySQL/Aurora (Inbound) | TCP | 3306 | 10.10.0.0/24 | Allow DB access from web |

---

## Route Table Configuration (Reference)

| Destination | Target | Status | Purpose |
|-------------|--------|--------|---------|
| 10.10.0.0/16 | local | Active | Internal VPC routing |
| 0.0.0.0/0 | igw-0b13fa1473373ea51 | Active | Internet access for public subnet |

---

## Commands I Used (Reference)

```bash
# Verify security group rules (AWS CLI)
aws ec2 describe-security-groups --group-ids sg-099a7817b4e1b6ece

# Test connectivity from web server (would run on web EC2)
telnet 10.10.2.10 3306

# Check route table associations
aws ec2 describe-route-tables --route-table-ids rtb-0e07bee7158ed107d

# View instances in each subnet
aws ec2 describe-instances --filters "Name=vpc-id,Values=vpc-00a4c61dd6723a268"

# List IAM groups and attached policies
aws iam list-groups
aws iam list-attached-group-policies --group-name SupportEngineers

# List IAM users in a group
aws iam get-group --group-name SupportEngineers
```

---

## Resources

| Resource | Link |
|----------|------|
| AWS IAM Documentation | [docs.aws.amazon.com/iam](https://docs.aws.amazon.com/iam) |
| IAM User Groups Guide | [docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html) |
| Managed Policies | [docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html) |
| EC2 ReadOnlyAccess Policy | [docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEC2ReadOnlyAccess.html](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEC2ReadOnlyAccess.html) |
| RDS ReadOnlyAccess Policy | [docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonRDSReadOnlyAccess.html](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonRDSReadOnlyAccess.html) |
| AWS SimuLearn: Core Security Concepts | [aws.amazon.com/training/simulearn](https://aws.amazon.com/training/simulearn) |

---

## What This Taught Me About SOC Operations

| SOC Skill | How This Lab Builds It |
|-----------|------------------------|
| **Least Privilege Access** | Support engineers only get read access – not modify permissions |
| **User Auditing** | Tags like `job-title` help identify who has what access |
| **IAM Policy Review** | Understanding what ReadOnlyAccess actually allows |
| **Group-Based Permissions** | Adding users to groups is more secure than individual policies |
| **Cloud Investigation** | SOC analysts need read-only access to investigate incidents |

---

## Key IAM Best Practices Learned

| Best Practice | Why It Matters |
|---------------|----------------|
| Use groups, not individual user policies | Easier to manage and audit |
| Apply least privilege | Users get only necessary permissions |
| Tag users with job roles | Quick identification of access patterns |
| Use AWS managed policies | Pre-built, maintained by AWS, follow best practices |
| Never use root account | Create individual IAM users for human access |

---

## Next Learning Goals

| Topic | Why It's Important |
|-------|---------------------|
| IAM Roles for EC2 | Grant permissions to applications without access keys |
| IAM Policies (Custom) | Create fine-grained permissions for specific needs |
| Service Control Policies (SCPs) | Restrict permissions across AWS accounts |
| IAM Identity Center | Manage access across multiple AWS accounts |
| Security Hub | Centralise security findings from multiple services |

---

## Lab Status:  COMPLETED

**Date:** June 11, 2026

**Environment:** AWS us-east-1 (N. Virginia)

**Account ID:** 8971-9670-4750

**Group Created:** SupportEngineers

**Policies Attached:** AmazonEC2ReadOnlyAccess, AmazonRDSReadOnlyAccess

**User Created:** support-engineer-1

**User Tag:** job-title: Support Engineer

This README follows the same structure as your Networking Concepts lab, Owen. It covers IAM user groups, policies, user creation, and the connection to SOC operations. 💪

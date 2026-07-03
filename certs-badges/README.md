# Certs & Badges

> Tracking certification progress, simulearns, and badges earned on my AWS cloud learning journey.

---

## Progress Summary

| Simulearn | Status | Started | Completed | Badge |
|-----------|--------|---------|-----------|-------|
| 1 – Cloud Foundations | Completed | May 15, 2026 | May 18, 2026 | Earned |
| 2 – File Systems in the Cloud | Completed | May 19, 2026 | May 20, 2026 | Earned |
| 3 – Networking Concepts | Completed | June 01, 2026 | June 02, 2026 | Earned |
| 4 – Core Security Concepts (IAM) | Completed | June 11, 2026 | June 11, 2026 | Earned |

**Total Badges Earned: 4 / 4**

---

## Simulearns

### Simulearn 1 – Cloud Foundations

| Status | Started | Completed |
|--------|---------|-----------|
| Completed | May 15, 2026 | May 18, 2026 |

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

**Badge Earned:** AWS Cloud Foundations — Issued May 18, 2026

---

### Simulearn 2 – File Systems in the Cloud

| Status | Started | Completed |
|--------|---------|-----------|
| Completed | May 19, 2026 | May 20, 2026 |

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

</details>

**Badge Earned:** AWS File Systems — Issued May 20, 2026

---

### Simulearn 3 – Networking Concepts

| Status | Started | Completed |
|--------|---------|-----------|
| Completed | June 01, 2026 | June 02, 2026 |

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

</details>

<details>
<summary><strong>Key Takeaways</strong></summary>

| Takeaway | Why It Matters |
|----------|----------------|
| Security groups are stateful | Inbound allow automatically permits return outbound traffic |
| Port 3306 must be explicitly allowed | DB server needs inbound rule from web server subnet |
| Restrict source CIDRs | Use specific subnets instead of `0.0.0.0/0` |
| Route tables determine subnet type | Public subnets have IGW route, private subnets do not |

</details>

**Badge Earned:** AWS Networking Concepts — Issued June 02, 2026

---

### Simulearn 4 – Core Security Concepts (IAM)

| Status | Started | Completed |
|--------|---------|-----------|
| Completed | June 11, 2026 | June 11, 2026 |

> **Certificate Issued by:** Michelle Vaz, Director, AWS Training & Certification  
> **Awarded to:** Owen Lethabo

<details>
<summary><strong>Topics Covered</strong></summary>

| Topic | What I Learned |
|-------|----------------|
| IAM User Groups | Logical containers for managing permissions for multiple users |
| IAM Users | Individual identities representing people or applications |
| Managed Policies | AWS-created permission sets (e.g., ReadOnlyAccess) |
| AmazonEC2ReadOnlyAccess | Policy granting read-only access to EC2 resources |
| AmazonRDSReadOnlyAccess | Policy granting read-only access to RDS databases |
| Least Privilege Principle | Grant only the permissions needed for a specific job role |
| Policy Attachment | Adding policies to user groups to grant permissions |
| IAM User Creation | Creating users with console access and custom passwords |

</details>

<details>
<summary><strong>Key Takeaways</strong></summary>

| Takeaway | Why It Matters |
|----------|----------------|
| Use groups, not individual user policies | Managing permissions at group level is more scalable |
| ReadOnlyAccess is not full access | Support engineers can view but not modify resources |
| Multiple policies per group | SupportEngineers group needed both EC2 and RDS read access |
| IAM users belong to groups | User was added to SupportEngineers group |
| Tags help organise users | `job-title: Support Engineer` identifies user's role |

</details>

<details>
<summary><strong>What I Did</strong></summary>

| Step | Action |
|------|--------|
| 1 | Created IAM user group named `SupportEngineers` |
| 2 | Attached `AmazonEC2ReadOnlyAccess` policy to the group |
| 3 | Attached `AmazonRDSReadOnlyAccess` policy to the group |
| 4 | Created IAM user `support-engineer-1` with custom console password |
| 5 | Added the user to the `SupportEngineers` group |
| 6 | Added tag `job-title: Support Engineer` to the user |
| 7 | Verified the group had both ReadOnly policies attached |

</details>

<details>
<summary><strong>IAM Architecture Diagram</strong></summary>

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
└─────────────────────────────────────────────────────────────────┘
```

</details>

<details>
<summary><strong>Commands Used</strong></summary>

```bash
# List IAM groups and attached policies
aws iam list-groups
aws iam list-attached-group-policies --group-name SupportEngineers

# List IAM users in a group
aws iam get-group --group-name SupportEngineers
```

</details>

**Badge Earned:** AWS Core Security Concepts — Issued June 11, 2026

---

## Earned Badges

| Badge | Date Earned | Issuer |
|-------|-------------|--------|
| AWS Cloud Foundations | May 18, 2026 | AWS Training & Certification |
| AWS File Systems | May 20, 2026 | AWS Training & Certification |
| AWS Networking Concepts | June 02, 2026 | AWS Training & Certification |
| AWS Core Security Concepts (IAM) | June 11, 2026 | AWS Training & Certification |

---

## Completion Certificates

| Course | Awarded To | Date Completed | Issued By |
|--------|------------|----------------|-----------|
| Simulearn 1 – Cloud Foundations | Owen Lethabo | May 18, 2026 | AWS Training & Certification |
| Simulearn 2 – File Systems in the Cloud | Owen Lethabo | May 20, 2026 | AWS Training & Certification |
| Simulearn 3 – Networking Concepts | Owen Lethabo | June 02, 2026 | Michelle Vaz, Director, AWS T&C |
| Simulearn 4 – Core Security Concepts (IAM) | Owen Lethabo | June 11, 2026 | Michelle Vaz, Director, AWS T&C |

---

## What's Next

- [x] Simulearn 1 – Cloud Foundations
- [x] Simulearn 2 – File Systems in the Cloud
- [x] Simulearn 3 – Networking Concepts
- [x] Simulearn 4 – Core Security Concepts (IAM)
- [ ] Simulearn 5 – Database Services *(Coming Soon)*
- [ ] Simulearn 6 – Security Best Practices *(Coming Soon)*

---

```

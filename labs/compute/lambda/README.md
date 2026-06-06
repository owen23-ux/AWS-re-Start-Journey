# 🏅 Certs & Badges

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

</details>

🏅 **Badge Earned:** AWS Networking Concepts — Issued June 02, 2026

---

## 🎖️ Earned Badges

| Badge | Date Earned | Issuer |
|-------|-------------|--------|
| 🏅 AWS Cloud Foundations | May 18, 2026 | AWS Training & Certification |
| 🏅 AWS File Systems | May 20, 2026 | AWS Training & Certification |
| 🏅 AWS Networking Concepts | June 02, 2026 | AWS Training & Certification |

---

## 📜 Completion Certificates

| Course | Awarded To | Date Completed | Issued By |
|--------|------------|----------------|-----------|
| Simulearn 1 – Cloud Foundations | Owen Lethabo | May 18, 2026 | AWS Training & Certification |
| Simulearn 2 – File Systems in the Cloud | Owen Lethabo | May 20, 2026 | AWS Training & Certification |
| Simulearn 3 – Networking Concepts | Owen Lethabo | June 02, 2026 | Michelle Vaz, Director, AWS T&C |

---

## 🔗 Course Links

| Simulearn | Link |
|-----------|------|
| Simulearn 1 – Cloud Foundations | [Access Course](https://aws.amazon.com/training/digital/aws-simulearn/) |
| Simulearn 2 – File Systems in the Cloud | [Access Course](https://www.classcentral.com/course/aws-simulearn-file-systems-in-the-cloud-299068) |
| Simulearn 3 – Networking Concepts | [Access Course](https://aws.amazon.com/training/digital/aws-simulearn/) |

---

## 🗺️ What's Next

- [ ] Simulearn 4 – Security Best Practices *(Coming Soon)*
- [ ] Simulearn 5 – Database Services *(Coming Soon)*

---

*Last updated: June 02, 2026*

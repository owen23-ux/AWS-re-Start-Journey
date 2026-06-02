# Certs & Badges

Tracking certification progress, simulearns, and badges earned.

---

## Simulearns

### Simulearn 1 – Cloud Foundations

| Status | Started | Completed |
|--------|---------|-----------|
| ✅ Completed | May 15, 2026 | May 18, 2026 |

**Topics Covered:**

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

**Key Takeaways:**

| Takeaway | Why It Matters |
|----------|----------------|
| Choose region based on latency, cost, and compliance | Affects performance and legal requirements |
| IAM least privilege principle | Only grant necessary permissions to reduce risk |
| EC2 stop vs terminate | Stopped instances retain EBS volumes, terminated do not |
| S3 is 11 nines durable | Designed for 99.999999999% durability |
| Security groups are stateful | No need for separate inbound/outbound rules for return traffic |

**Badge Earned:** 🏅 AWS Cloud Foundations – Issued May 18, 2026

---

### Simulearn 2 – File Systems in the Cloud

| Status | Started | Completed |
|--------|---------|-----------|
| ✅ Completed | May 19, 2026 | May 20, 2026 |

**Topics Covered:**

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

**Key Takeaways:**

| Takeaway | Why It Matters |
|----------|----------------|
| EFS is shared storage | Multiple EC2 instances across AZs can access same files |
| EFS grows automatically | No need to provision capacity in advance |
| Mount targets per AZ | Each AZ needs its own mount target for EC2 access |
| Security is critical | NFS port 2049 must be restricted to trusted sources |
| amazon-efs-utils simplifies mounting | `mount -t efs` instead of standard NFS commands |

**What I Did:**

- Created an EFS file system
- Configured mount targets across three Availability Zones
- Set up security groups with NFS inbound rules
- Installed amazon-efs-utils on EC2 instances
- Mounted EFS to multiple EC2 instances
- Verified shared storage across all instances

**Commands Used:**

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

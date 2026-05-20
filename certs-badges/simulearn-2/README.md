# Simulearn 2 – File Systems in the Cloud

## Certificate

![AWS SimuLearn Certificate](Owen-File-Sytem.pdf)

*Figure 1: AWS SimuLearn: File Systems in the Cloud completion certificate*

**Awarded to:** Owen Lethabo

**Date Completed:** May 20, 2026

---

## Status

| Status | Started | Completed |
|--------|---------|-----------|
| ✅ Completed | May 2026 | May 20, 2026 |

---

## Topics Covered

| Topic | What I Learned |
|-------|----------------|
| **Amazon EFS** | Serverless, elastic file system for Linux workloads |
| **EFS Storage Classes** | Standard, Infrequent Access (IA), Archive |
| **Mount Targets** | NFSv4 endpoints in each Availability Zone |
| **Security Groups** | NFS port 2049 inbound rules |
| **EFS vs EBS** | Shared vs block storage, multi-AZ vs single AZ |
| **amazon-efs-utils** | AWS utilities for easier EFS mounting |
| **Lifecycle Management** | Automatically move files between storage classes |

---

## Key Takeaways

| Takeaway | Why It Matters |
|----------|----------------|
| **EFS is shared storage** | Multiple EC2 instances across AZs can access same files |
| **EFS grows automatically** | No need to provision capacity in advance |
| **Mount targets per AZ** | Each AZ needs its own mount target for EC2 access |
| **Security is critical** | NFS port 2049 must be restricted to trusted sources |
| **amazon-efs-utils simplifies mounting** | `mount -t efs` instead of standard NFS commands |

---

## What I Did in This Simulearn

1. Created an EFS file system
2. Configured mount targets across three Availability Zones
3. Set up security groups with NFS inbound rules
4. Installed `amazon-efs-utils` on EC2 instances
5. Mounted EFS to multiple EC2 instances
6. Verified shared storage across all instances

---

## Commands I Used

```bash
# Install EFS utilities
sudo yum install -y amazon-efs-utils

# Create mount directory
mkdir data

# Mount EFS
sudo mount -t efs fs-xxxxxxxxxxxxx:/ data

# Create test file
sudo bash -c "echo 'test content' > test-file.log"

# Verify shared storage
cat test-file.log# Simulearn 2

**Status:** In progress
**Started:** _date_
**Completed:** _date_

## Topics Covered
-

## Key Takeaways
-

## Resources
-

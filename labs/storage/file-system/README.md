# 📁 AWS EFS: Elastic File System Deep Dive

**Date Completed**: May 20, 2026  
**Time Spent**: 45 minutes  
**Service**: Amazon EFS (Managed Network File System for EC2)

---

## What I Learned

### 1. What Amazon EFS Is

Amazon EFS (Elastic File System) is a fully managed, scalable Network File System (NFS) for use with AWS Cloud services and on-premises resources.

EFS provides shared file storage that can be mounted simultaneously by multiple EC2 instances across different Availability Zones.

**Common Uses of EFS**

- Shared file storage for web servers (multiple EC2 instances read same files)
- Content management systems (WordPress, Drupal shared uploads)
- Development environments (shared code repositories)
- Container storage for ECS/EKS
- Big data and analytics workloads
- Media processing pipelines
- Home directories for users

**EFS vs EBS vs S3**

| Feature | EFS | EBS | S3 |
|---------|-----|-----|-----|
| Access | Multiple EC2 instances simultaneously | Single EC2 instance | Anywhere via API |
| Storage type | Shared file system | Block storage | Object storage |
| Scaling | Automatic | Manual (resize volumes) | Automatic |
| Use case | Shared files | Databases, OS drives | Static assets, backups |

---

### 2. Navigating the AWS Management Console for EFS

I learned how to navigate the AWS Console and access EFS services.

**Areas Explored**

- AWS Dashboard
- EFS Dashboard
- File Systems
- Mount Targets
- Access Points
- Backup Settings
- Lifecycle Management

**Skills Gained**

- Navigating to EFS service
- Understanding file system organization
- Managing shared storage from the console

---

### 3. Creating a Security Group for EFS

I learned how to create security groups to control access to EFS file systems.

**Security Group Configuration**

| Setting | My Value |
|---------|----------|
| Security group name | PetModels-EFS-1-SG |
| Description | Restrict access to web servers only |
| VPC | vpc-094dd51fa7781f783 (PetModels) |

**What I Learned About EFS Security Groups**

- Security groups act as virtual firewalls for EFS mount targets
- EFS uses NFS protocol (port 2049)
- Only EC2 instances in the same VPC can mount EFS
- Security groups control which instances can access the file system

---

### 4. Configuring Inbound Rules for EFS

I learned how to configure inbound rules to allow NFS traffic.

**Inbound Rule I Configured**

| Type | Protocol | Port Range | Source |
|------|----------|------------|--------|
| NFS | TCP | 2049 | Custom security group ID |

**Key Security Group Principles for EFS:**

| Concept | Explanation |
|---------|-------------|
| NFS protocol | Uses TCP port 2049 for file sharing |
| Source security group | Allows only specific instances (not all IPs) |
| Stateful | Return traffic automatically allowed |
| Least privilege | Only allow necessary instances to mount |

**What I Learned:**

- EFS uses NFSv4.1 protocol (port 2049)
- Never use 0.0.0.0/0 for EFS (security risk)
- Reference security groups, not IP addresses, for EC2 instances
- This ensures only authorized web servers can access shared files

---

### 5. Verifying Security Group Creation

I learned how to verify that security groups were created successfully.

**Security Group Details:**

| Field | Value |
|-------|-------|
| Security group name | PetModels-EFS-1-SG |
| Security group ID | sg-04a14377d4c1efa11 |
| Description | Restrict access to web servers only |
| VPC ID | vpc-094dd51fa7781f783 |
| Inbound rules count | 1 |
| Outbound rules count | 1 |

**What I Learned:**

- Security groups are created instantly
- Each security group gets a unique ID (sg-xxxxxxxxxxxxxxxxx)
- Outbound rules default to "All traffic" (can be restricted if needed)
- Security groups are VPC-specific (can't be used across VPCs)

---

### 6. Creating an EFS File System

I learned how to create an Elastic File System from scratch.

**EFS Configuration I Used:**

| Setting | My Value |
|---------|----------|
| Name | PetModels-EFS-1 |
| VPC | vpc-094dd51fa7781f783 (PetModels) |
| Throughput mode | Elastic |
| Performance mode | General Purpose |

**EFS Throughput Modes:**

| Mode | Description | Best For |
|------|-------------|----------|
| Elastic | Automatically scales throughput | Unpredictable workloads, cost optimization |
| Bursting | Baseline + burst credits | General purpose, periodic access |
| Provisioned | Fixed throughput | Consistent high-performance needs |

**EFS Performance Modes:**

| Mode | Description | Best For |
|------|-------------|----------|
| General Purpose | Low latency | Web servers, content management |
| Max I/O | Higher aggregate throughput | Big data, analytics |

**What I Learned:**

- EFS is region-specific but spans Availability Zones
- Elastic throughput mode is recommended for most workloads (pay only for what you use)
- File system name is optional but helpful for organization
- VPC selection determines which EC2 instances can access EFS

---

### 7. Understanding Mount Targets

I learned how EFS uses mount targets to provide NFS endpoints.

**Mount Target Configuration:**

| Availability Zone | Subnet ID | Security Group |
|-------------------|-----------|----------------|
| us-east-1a | subnet-092185681e6cd5f81 | PetModels-EFS-1-SG |
| us-east-1b | subnet-061ff6bc7172b7b9 | PetModels-EFS-1-SG |

**What I Learned About Mount Targets:**

| Concept | Explanation |
|---------|-------------|
| Purpose | Provide NFSv4 endpoint for mounting EFS |
| Per AZ | One mount target per Availability Zone |
| High availability | EC2 instances mount to local AZ endpoint |
| Security | Each mount target has its own security group |

**Best Practice:** Create mount targets in every AZ where EC2 instances will mount EFS. This allows instances to mount locally, reducing latency and cross-AZ data transfer costs.

---

### 8. Adding Mount Targets for Multiple AZs

I learned how to add mount targets across multiple Availability Zones.

**Mount Target Settings:**

| Setting | Value |
|---------|-------|
| Availability Zone | us-east-1b |
| Subnet ID | subnet-061ff6bc7172b7b9 |
| IP address type | IPv4 only |
| Security groups | PetModels-EFS-1-SG |

**Why Multiple Mount Targets Are Important:**

- EC2 in us-east-1a → Mounts to us-east-1a endpoint → Low latency, no cross-AZ cost
- EC2 in us-east-1b → Mounts to us-east-1b endpoint → Low latency, no cross-AZ cost

**What I Learned:**

- Each mount target gets a private IP in its subnet
- EC2 instances mount to the mount target in their AZ
- If no mount target in the AZ, instances can still mount across AZ (higher latency)
- EFS automatically replicates data across all AZs in the region

---

### 9. Reviewing EFS File System Details

I learned how to view EFS file system properties and DNS names.

**EFS File System Properties:**

| Property | Value |
|----------|-------|
| File system ID | fs-0aa8a39cff0bbddc |
| Performance mode | General Purpose |
| Throughput mode | Bursting |
| File system state | Available |
| DNS name | fs-0aa8a39cff0bbddc.efs.us-east-1.amazonaws.com |
| Encryption | Enabled (aws/elasticfilesystem) |

**Important DNS Name:**

- **Mount DNS**: `fs-0aa8a39cff0bbddc.efs.us-east-1.amazonaws.com`
- Resolves to the mount target IP in the same AZ as the EC2 instance
- Use this DNS name when mounting from EC2 instances

**What I Learned:**

- EFS is automatically encrypted at rest using AWS KMS
- File system must be "Available" before mounting
- DNS name automatically routes to the correct AZ endpoint
- Lifecycle management can move infrequently accessed files to cheaper storage tiers

---

### 10. DIY Lab Goals

I learned the specific objectives for the EFS hands-on lab.

**Lab Objectives:**

| Goal | Description |
|------|-------------|
| Goal 1 | Mount an EFS endpoint to a third EC2 instance (PetModels-C) |
| Goal 2 | Test that the files are accessible from the EC2 instance |

**Solution Validation:**
- Test server verifies EFS file system was mounted to PetModels-C
- Test server checks that correct files were added to the file system
- Mount target is in us-east-1c Availability Zone

**What I Learned:**

- Validation is automated (test server checks your work)
- Specific AZ (us-east-1c) was used for the mount target
- The goal is to prove EFS works across multiple EC2 instances
- Files created on one instance should be visible on all instances

---

### 11. Installing amazon-efs-utils on EC2 Instance

I learned how to install EFS utilities on Amazon Linux EC2 instances.

**Installation Commands:**
```bash
sudo -i
sudo yum install -y amazon-efs-utils
```

**Installation Output:**

| Package | Architecture | Version | Size |
|---------|--------------|---------|------|
| amazon-efs-utils | x86_64 | 3.1.1-1.amzn2023 | 6.7 MB |
| stunnel | x86_64 | 5.58-1.amzn2023.0.2 | 156 KB |

**What I Learned:**

- `amazon-efs-utils` provides the `mount.efs` helper utility
- `stunnel` is installed as a dependency (provides TLS encryption)
- Total installed size: 25 MB
- These utilities simplify mounting EFS with encryption

**Why amazon-efs-utils is Important:**

| Without amazon-efs-utils | With amazon-efs-utils |
|--------------------------|----------------------|
| Manual NFS mount commands | Simple `mount.efs` command |
| No TLS encryption by default | Automatic TLS encryption |
| Must manage NFS options | Handles optimal defaults |

---

### 12. Verifying EFS Utilities Installation

I learned how to verify that EFS utilities were installed correctly.

**Installation Verification:**
```bash
Installed:
  amazon-efs-utils-3.1.1-1.amzn2023.x86_64
  stunnel-5.58-1.amzn2023.0.2.x86_64
Complete!
```

**What I Learned:**

- `Complete!` indicates successful installation
- Both packages are required for encrypted EFS mounts
- Root privileges (`sudo`) are required for installation
- Amazon Linux 2023 uses `yum` package manager

---

### 13. Creating a Mount Point Directory

I learned how to create a directory to serve as the mount point for EFS.

**Commands Used:**
```bash
mkdir data
ls
```

**Output:**
```
data
```

**What I Learned:**

- A mount point is an empty directory where EFS will be attached
- Directory can be any name (data, efs, shared, www, etc.)
- Mount point must exist before mounting
- After mounting, the directory will contain files from EFS

**Best Practice:** Use descriptive names like:
- `/var/www/html` for web content
- `/shared` for general📁 AWS EFS: Elastic File System Deep Dive

Date Completed: May 20, 2026
Time Spent: 45 minutes
Service: Amazon EFS (Managed Network File System for EC2)
What I Learned
1. What Amazon EFS Is

Amazon EFS (Elastic File System) is a fully managed, scalable Network File System (NFS) for use with AWS Cloud services and on-premises resources.

EFS provides shared file storage that can be mounted simultaneously by multiple EC2 instances across different Availability Zones.

Common Uses of EFS

    Shared file storage for web servers (multiple EC2 instances read same files)

    Content management systems (WordPress, Drupal shared uploads)

    Development environments (shared code repositories)

    Container storage for ECS/EKS

    Big data and analytics workloads

    Media processing pipelines

    Home directories for users

EFS vs EBS vs S3
Feature	EFS	EBS	S3
Access	Multiple EC2 instances simultaneously	Single EC2 instance	Anywhere via API
Storage type	Shared file system	Block storage	Object storage
Scaling	Automatic	Manual (resize volumes)	Automatic
Use case	Shared files	Databases, OS drives	Static assets, backups
2. Navigating the AWS Management Console for EFS

I learned how to navigate the AWS Console and access EFS services.

Areas Explored

    AWS Dashboard

    EFS Dashboard

    File Systems

    Mount Targets

    Access Points

    Backup Settings

    Lifecycle Management

Skills Gained

    Navigating to EFS service

    Understanding file system organization

    Managing shared storage from the console

3. Creating a Security Group for EFS

I learned how to create security groups to control access to EFS file systems.

Security Group Configuration
Setting	My Value
Security group name	PetModels-EFS-1-SG
Description	Restrict access to web servers only
VPC	vpc-094dd51fa7781f783 (PetModels)

What I Learned About EFS Security Groups

    Security groups act as virtual firewalls for EFS mount targets

    EFS uses NFS protocol (port 2049)

    Only EC2 instances in the same VPC can mount EFS

    Security groups control which instances can access the file system

4. Configuring Inbound Rules for EFS

I learned how to configure inbound rules to allow NFS traffic.

Inbound Rule I Configured
Type	Protocol	Port Range	Source
NFS	TCP	2049	Custom security group ID

Key Security Group Principles for EFS:
Concept	Explanation
NFS protocol	Uses TCP port 2049 for file sharing
Source security group	Allows only specific instances (not all IPs)
Stateful	Return traffic automatically allowed
Least privilege	Only allow necessary instances to mount

What I Learned:

    EFS uses NFSv4.1 protocol (port 2049)

    Never use 0.0.0.0/0 for EFS (security risk)

    Reference security groups, not IP addresses, for EC2 instances

    This ensures only authorized web servers can access shared files

5. Verifying Security Group Creation

I learned how to verify that security groups were created successfully.

Security Group Details:
Field	Value
Security group name	PetModels-EFS-1-SG
Security group ID	sg-04a14377d4c1efa11
Description	Restrict access to web servers only
VPC ID	vpc-094dd51fa7781f783
Inbound rules count	1
Outbound rules count	1

What I Learned:

    Security groups are created instantly

    Each security group gets a unique ID (sg-xxxxxxxxxxxxxxxxx)

    Outbound rules default to "All traffic" (can be restricted if needed)

    Security groups are VPC-specific (can't be used across VPCs)

6. Creating an EFS File System

I learned how to create an Elastic File System from scratch.

EFS Configuration I Used:
Setting	My Value
Name	PetModels-EFS-1
VPC	vpc-094dd51fa7781f783 (PetModels)
Throughput mode	Elastic
Performance mode	General Purpose

EFS Throughput Modes:
Mode	Description	Best For
Elastic	Automatically scales throughput	Unpredictable workloads, cost optimization
Bursting	Baseline + burst credits	General purpose, periodic access
Provisioned	Fixed throughput	Consistent high-performance needs

EFS Performance Modes:
Mode	Description	Best For
General Purpose	Low latency	Web servers, content management
Max I/O	Higher aggregate throughput	Big data, analytics

What I Learned:

    EFS is region-specific but spans Availability Zones

    Elastic throughput mode is recommended for most workloads (pay only for what you use)

    File system name is optional but helpful for organization

    VPC selection determines which EC2 instances can access EFS

7. Understanding Mount Targets

I learned how EFS uses mount targets to provide NFS endpoints.

Mount Target Configuration:
Availability Zone	Subnet ID	Security Group
us-east-1a	subnet-092185681e6cd5f81	PetModels-EFS-1-SG
us-east-1b	subnet-061ff6bc7172b7b9	PetModels-EFS-1-SG

What I Learned About Mount Targets:
Concept	Explanation
Purpose	Provide NFSv4 endpoint for mounting EFS
Per AZ	One mount target per Availability Zone
High availability	EC2 instances mount to local AZ endpoint
Security	Each mount target has its own security group

Best Practice: Create mount targets in every AZ where EC2 instances will mount EFS. This allows instances to mount locally, reducing latency and cross-AZ data transfer costs.
8. Adding Mount Targets for Multiple AZs

I learned how to add mount targets across multiple Availability Zones.

Mount Target Settings:
Setting	Value
Availability Zone	us-east-1b
Subnet ID	subnet-061ff6bc7172b7b9
IP address type	IPv4 only
Security groups	PetModels-EFS-1-SG

Why Multiple Mount Targets Are Important:

    EC2 in us-east-1a → Mounts to us-east-1a endpoint → Low latency, no cross-AZ cost

    EC2 in us-east-1b → Mounts to us-east-1b endpoint → Low latency, no cross-AZ cost

What I Learned:

    Each mount target gets a private IP in its subnet

    EC2 instances mount to the mount target in their AZ

    If no mount target in the AZ, instances can still mount across AZ (higher latency)

    EFS automatically replicates data across all AZs in the region

9. Reviewing EFS File System Details

I learned how to view EFS file system properties and DNS names.

EFS File System Properties:
Property	Value
File system ID	fs-0aa8a39cff0bbddc
Performance mode	General Purpose
Throughput mode	Bursting
File system state	Available
DNS name	fs-0aa8a39cff0bbddc.efs.us-east-1.amazonaws.com
Encryption	Enabled (aws/elasticfilesystem)

Important DNS Name:

    Mount DNS: fs-0aa8a39cff0bbddc.efs.us-east-1.amazonaws.com

    Resolves to the mount target IP in the same AZ as the EC2 instance

    Use this DNS name when mounting from EC2 instances

What I Learned:

    EFS is automatically encrypted at rest using AWS KMS

    File system must be "Available" before mounting

    DNS name automatically routes to the correct AZ endpoint

    Lifecycle management can move infrequently accessed files to cheaper storage tiers

10. DIY Lab Goals

I learned the specific objectives for the EFS hands-on lab.

Lab Objectives:
Goal	Description
Goal 1	Mount an EFS endpoint to a third EC2 instance (PetModels-C)
Goal 2	Test that the files are accessible from the EC2 instance

Solution Validation:

    Test server verifies EFS file system was mounted to PetModels-C

    Test server checks that correct files were added to the file system

    Mount target is in us-east-1c Availability Zone

What I Learned:

    Validation is automated (test server checks your work)

    Specific AZ (us-east-1c) was used for the mount target

    The goal is to prove EFS works across multiple EC2 instances

    Files created on one instance should be visible on all instances

11. Installing amazon-efs-utils on EC2 Instance

I learned how to install EFS utilities on Amazon Linux EC2 instances.

Installation Commands:
bash

sudo -i
sudo yum install -y amazon-efs-utils

Installation Output:
Package	Architecture	Version	Size
amazon-efs-utils	x86_64	3.1.1-1.amzn2023	6.7 MB
stunnel	x86_64	5.58-1.amzn2023.0.2	156 KB

What I Learned:

    amazon-efs-utils provides the mount.efs helper utility

    stunnel is installed as a dependency (provides TLS encryption)

    Total installed size: 25 MB

    These utilities simplify mounting EFS with encryption

Why amazon-efs-utils is Important:
Without amazon-efs-utils	With amazon-efs-utils
Manual NFS mount commands	Simple mount.efs command
No TLS encryption by default	Automatic TLS encryption
Must manage NFS options	Handles optimal defaults
12. Verifying EFS Utilities Installation

I learned how to verify that EFS utilities were installed correctly.

Installation Verification:
bash

Installed:
  amazon-efs-utils-3.1.1-1.amzn2023.x86_64
  stunnel-5.58-1.amzn2023.0.2.x86_64
Complete!

What I Learned:

    Complete! indicates successful installation

    Both packages are required for encrypted EFS mounts

    Root privileges (sudo) are required for installation

    Amazon Linux 2023 uses yum package manager

13. Creating a Mount Point Directory

I learned how to create a directory to serve as the mount point for EFS.

Commands Used:
bash

mkdir data
ls

Output:
text

data

What I Learned:

    A mount point is an empty directory where EFS will be attached

    Directory can be any name (data, efs, shared, www, etc.)

    Mount point must exist before mounting

    After mounting, the directory will contain files from EFS

Best Practice: Use descriptive names like:

    /var/www/html for web content

    /shared for general

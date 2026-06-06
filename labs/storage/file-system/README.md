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

![EFS Console Navigation](./DIY goal1.png)

*Figure 1: Accessing EFS from AWS SimuLearn lab environment*

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

![Create Security Group](./SG2.png)

*Figure 2: Creating security group for EFS access control*

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

![Inbound Rules Configuration](./Inbound3.png)

*Figure 3: Configuring inbound rules for NFS access*

**Inbound Rule I Configured**

| Type | Protocol | Port Range | Source |
|------|----------|------------|--------|
| NFS | TCP | 2049 | Custom sg-0c411465dc41f7Ob9 |

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

![Security Group Verification](./SGname4.png)

*Figure 4: Verifying EFS security group was created*

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

![Create EFS File System](./EFS5.png)

*Figure 5: Creating PetModels-EFS-1 file system*

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

![Mount Targets Configuration](./mount-targets6.png)

*Figure 6: Configuring mount targets across Availability Zones*

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

![Add Mount Target](./network-access10.png)

*Figure 7: Adding mount target in us-east-1b Availability Zone*

**Mount Target Settings:**

| Setting | Value |
|---------|-------|
| Availability Zone | us-east-1b |
| Subnet ID | subnet-061ff6bc7172b7b9 |
| IP address type | IPv4 only |
| Security groups | PetModels-EFS-1-SG |

**Why Multiple Mount Targets Are Important:**

```
EC2 in us-east-1a → Mounts to us-east-1a endpoint → Low latency, no cross-AZ cost
EC2 in us-east-1b → Mounts to us-east-1b endpoint → Low latency, no cross-AZ cost
```

**What I Learned:**

- Each mount target gets a private IP in its subnet
- EC2 instances mount to the mount target in their AZ
- If no mount target in the AZ, instances can still mount across AZ (higher latency)
- EFS automatically replicates data across all AZs in the region

---

### 9. Reviewing EFS File System Details

I learned how to view EFS file system properties and DNS names.

![EFS File System Details](./pet-model7.png)

*Figure 8: Reviewing PetModels-EFS-1 file system details*

**EFS File System Properties:**

| Property | Value |
|----------|-------|
| File system ID | fs-0aa8a39cff0bbddc |
| ARN | arn:aws:elasticfilesystem:us-east-1:897196704750:file-system/fs-0aa8a39cff0bbddc |
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

![DIY Lab Goals](./DIY goal1.png)

*Figure 9: DIY lab goals for EFS implementation*

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

![Installing EFS Utilities](./sudo-i8.png)

*Figure 10: Installing amazon-efs-utils package on EC2 instance*

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

![Installation Complete](./mdksir-i9.png)

*Figure 11: Verifying amazon-efs-utils installation*

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

![Creating Mount Directory](./mdksir-i9.png)

*Figure 12: Creating data directory for EFS mount*

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
- `/shared` for general shared files
- `/home/users` for user home directories
- `/data` for application data

---

### 14. Mounting EFS Using amazon-efs-utils

I learned how to mount EFS file system to the mount point directory.

![EFS Mount Command](./mdksir-i9.png)

*Figure 13: Mounting EFS to data directory with TLS encryption*

**Mount Command:**
```bash
sudo mount -t efs -o tls fs-0aa8a39cff0bbddc:/ data
```

**Command Breakdown:**

| Component | Meaning |
|-----------|---------|
| `sudo mount` | Run mount with root privileges |
| `-t efs` | Filesystem type (EFS) |
| `-o tls` | Mount option (encrypt with TLS) |
| `fs-0aa8a39cff0bbddc` | EFS file system ID |
| `:/` | Root of the EFS file system |
| `data` | Local mount point directory |

**What I Learned:**

- `-o tls` enables encryption in transit (recommended for production)
- File system ID comes from EFS console (fs-xxxxxxxxxxxxxxxxx)
- `:/` mounts the root of the EFS file system
- Can mount subdirectories using `:/path/to/subdirectory`
- Mount point directory must exist before mounting

**Mount Options:**

| Option | Purpose |
|--------|---------|
| `tls` | Encrypt data in transit |
| `iam` | Use IAM authorization |
| `tls,iam` | Both encryption and IAM auth |

---

### 15. Troubleshooting Mount Errors

I learned how to troubleshoot common EFS mount errors.

![Mount Error](./mdksir-i9.png)

*Figure 14: Error when mount point directory doesn't exist*

**Error Encountered:**
```bash
sudo mount -t efs -o tls fs-0aa8a39cff0bbddc:/ efs
b'mount.nfs4: mount point efs does not exist'
```

**Error Cause:**
- The directory `/efs` did not exist before mounting
- Mount command cannot attach to a non-existent directory

**Solution:**
```bash
# Create the directory first
mkdir data

# Then mount to the existing directory
sudo mount -t efs -o tls fs-0aa8a39cff0bbddc:/ data
```

**What I Learned:**

- Always verify mount point directory exists before mounting
- Error message clearly indicates the problem (mount point does not exist)
- Create directory with `mkdir` command first
- Mount point name must match exactly (case-sensitive)

**Common Mount Errors:**

| Error | Cause | Solution |
|-------|-------|----------|
| `mount point does not exist` | Directory missing | Create directory with `mkdir` |
| `mount.nfs4: Connection refused` | Security group blocking NFS | Check inbound rule for port 2049 |
| `mount.nfs4: No such file or directory` | Wrong file system ID | Verify EFS ID in console |
| `Permission denied` | Missing NFS permissions | Check security group source |

---

### 16. Navigating the Mounted EFS Directory

I learned how to navigate into the mounted EFS file system.

![Navigate to Mounted Directory](./mdksir-i9.png)

*Figure 15: Changing directory to mounted EFS mount point*

**Commands Used:**
```bash
cd data
```

**What I Learned:**

- After successful mount, the directory contains the EFS file system
- Can use normal Linux commands (`ls`, `cd`, `cp`, `mv`, `rm`)
- Changes made here are immediately available to all EC2 instances
- Multiple instances can read/write simultaneously (locking handled by NFS)

---

### 17. Creating Files on EFS

I learned how to create files on the shared EFS file system.

![Creating Log File](./mdksir-i9.png)

*Figure 16: Creating setup log file on EFS file system*

**Commands Used:**
```bash
sudo bash -c "cat >> efs-1-setup.log"
efs-1 mounted in site A
^C
```

**File Creation Process:**

| Step | Command | Purpose |
|------|---------|---------|
| 1 | `sudo bash -c` | Run command with root privileges |
| 2 | `cat >> filename` | Append input to file (create if not exists) |
| 3 | Type content | Add text to the file |
| 4 | `^C` (Ctrl+C) | Save and exit |

**What I Learned:**

- Files created on one EC2 instance are visible on all instances
- `sudo` required if directory permissions restrict write access
- `cat >>` appends to file (creates file if it doesn't exist)
- Press Ctrl+C to finish entering text

---

### 18. Verifying File Creation

I learned how to verify that files were created successfully on EFS.

![File Verification](./mdksir-i9.png)

*Figure 17: Reading the newly created log file*

**Commands Used:**
```bash
cat efs-1-setup.log
```

**Output:**
```
efs-1 mounted in site A
```

**What I Learned:**

- `cat` command displays file contents
- File content matches what was typed
- File persisted after creation (not lost when instance stops)
- Other EC2 instances can read this file immediately

**Verification Steps for Shared Storage:**

| Instance | Action | Expected Result |
|----------|--------|-----------------|
| PetModels-C | Create file `efs-1-setup.log` | File saved to EFS |
| PetModels-A (different AZ) | `ls /data` | See same file |
| PetModels-B (different AZ) | `cat /data/efs-1-setup.log` | Read same content |

---

### 19. Understanding EFS Use Cases from This Lab

I learned real-world applications of EFS from the PetModels scenario.

**PetModels Use Case:**

| Component | Role |
|-----------|------|
| PetModels-A | Web server in AZ A |
| PetModels-B | Web server in AZ B |
| PetModels-C | Additional EC2 instance |
| EFS | Shared file storage for all web servers |

**What This Enables:**

- **Shared content**: All web servers serve same files
- **Load balancing**: Any instance can handle any request
- **High availability**: If one AZ fails, others continue
- **Simplified deployment**: Update files once on EFS, all instances see changes

**Real-World Examples:**

| Industry | Use Case |
|----------|----------|
| E-commerce | Product images shared across web servers |
| CMS (WordPress) | Uploads folder shared across instances |
| Development | Shared code repository for dev team |
| Media processing | Shared staging area for video files |
| Education | Student home directories across multiple compute nodes |

---

### 20. Understanding EFS vs EBS for Shared Storage

I learned the key differences between EFS and EBS.

**Comparison Table:**

| Feature | EFS | EBS |
|---------|-----|-----|
| Mountable by | Multiple EC2 instances | One EC2 instance |
| Availability Zones | All AZs in region | One AZ |
| Scaling | Automatic | Manual |
| Storage size | Petabytes (auto-scaling) | 1 GB - 16 TB |
| Use case | Shared files | OS drive, databases |
| Protocol | NFSv4.1 | Block device |
| Backup | Automatic (AWS Backup) | Snapshots |
| Cost | $0.30/GB-month (Standard) | $0.10/GB-month (gp3) |

**When to Choose EFS:**

✅ Multiple EC2 instances need access to same files  
✅ Content management systems (WordPress, Drupal)  
✅ Development environments with shared code  
✅ Container storage for ECS/EKS  
✅ Serverless workloads (Lambda with VPC)

**When to Choose EBS:**

✅ Single EC2 instance (root volume, databases)  
✅ High performance requirements (IOPS)  
✅ Cost-sensitive workloads  
✅ Boot volumes for EC2 instances  
✅ Databases requiring dedicated IOPS

---

## Skills Summary

**Skills I Gained from This Lab:**

| Category | Skills |
|----------|--------|
| **EFS Management** | Creating file systems, configuring mount targets, security groups |
| **Networking** | Configuring inbound rules for NFS, understanding VPC requirements |
| **Linux Administration** | Installing packages, creating directories, mounting file systems |
| **Security** | Security groups for EFS, TLS encryption, access control |
| **High Availability** | Mount targets across AZs, shared storage design |
| **Troubleshooting** | Mount errors, permission issues, NFS debugging |

---

## Why EFS Matters for Cloud Practitioner Exam

**Exam Topics Covered:**

| Exam Domain | What I Learned |
|-------------|----------------|
| **Storage Services** | EFS vs EBS vs S3 comparison |
| **Shared Storage** | Multiple EC2 instances accessing same data |
| **High Availability** | EFS spans AZs automatically |
| **Elasticity** | Automatic scaling (no provisioning) |
| **Security** | Encryption at rest and in transit |
| **VPC Integration** | Mount targets in private subnets |

**EFS Facts to Memorize for Exam:**

| Fact | Value |
|------|-------|
| Protocol | NFSv4.1 |
| Mountable by | Up to thousands of EC2 instances |
| Availability | Regional service (spans AZs) |
| Storage tiers | Standard, Infrequent Access (IA), Archive |
| Encryption at rest | Enabled by default (KMS) |
| Encryption in transit | TLS option (recommended) |
| Performance modes | General Purpose, Max I/O |
| Throughput modes | Elastic, Bursting, Provisioned |

---

## Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `mount point does not exist` | Directory missing | Create directory with `mkdir` |
| `mount.nfs4: Connection refused` | Security group blocking NFS | Add inbound rule for port 2049 |
| `mount.nfs4: No such file or directory` | Wrong file system ID | Verify EFS ID in console |
| `Permission denied` | Missing NFS permissions | Check security group source |
| `Unable to resolve DNS` | Wrong DNS or VPC configuration | Use correct `.efs.region.amazonaws.com` |
| `Stale file handle` | File system recreated | Remount with new file system ID |

---

## EFS Mount Commands Reference

**Basic Mount (without encryption):**
```bash
sudo mount -t efs fs-0aa8a39cff0bbddc:/ /data
```

**Encrypted Mount (recommended):**
```bash
sudo mount -t efs -o tls fs-0aa8a39cff0bbddc:/ /data
```

**Mount with IAM Authorization:**
```bash
sudo mount -t efs -o tls,iam fs-0aa8a39cff0bbddc:/ /data
```

**Mount Specific Subdirectory:**
```bash
sudo mount -t efs -o tls fs-0aa8a39cff0bbddc:/myapp/uploads /var/www/uploads
```

**Auto-mount at Boot (add to /etc/fstab):**
```bash
fs-0aa8a39cff0bbddc:/ /data efs _netdev,tls 0 0
```

---

## Cost Analysis

**EFS Pricing (us-east-1):**

| Storage Tier | Price per GB-month |
|--------------|-------------------|
| Standard | $0.30 |
| Infrequent Access (IA) | $0.025 (plus $0.01 per GB access) |
| Archive | $0.008 (plus retrieval fees) |

**My Lab Cost Estimate:**
- Storage: 1 MB (minimal lab usage) = ~$0.0003/month
- Within free tier (5 GB standard storage for 12 months)

**EFS vs EBS Cost Comparison for 100 GB:**

| Service | Monthly Cost | Multiple Instances |
|---------|--------------|-------------------|
| EFS Standard | $30.00 | Yes (unlimited) |
| EFS IA | $2.50 + access fees | Yes |
| EBS gp3 | $10.00 | No (single instance) |
| EBS × 3 instances | $30.00 | Manual replication needed |

---

## Next Learning Goals

Based on this lab, here's what I plan to learn next:

| Topic | Why It's Important |
|-------|---------------------|
| EFS Access Points | Manage application access to EFS |
| EFS Replication | Cross-region disaster recovery |
| EFS Backup | Automated backup with AWS Backup |
| EFS Lifecycle Policies | Automate tier transitions (Standard → IA → Archive) |
| EFS with ECS | Container storage for microservices |
| EFS with Lambda | Serverless access to shared files |
| EFS Performance Testing | Benchmarking throughput and IOPS |
| EFS Monitoring | CloudWatch metrics and alarms |

---

## Resources Used

- AWS SimuLearn lab environment
- AWS EFS console
- EC2 instances (PetModels-A, PetModels-B, PetModels-C)
- Amazon Linux 2023
- amazon-efs-utils package
- NFS protocol (port 2049)
- VPC: vpc-094dd51fa7781f783 (PetModels)

---

## Final Reflection

This lab transformed my understanding of shared cloud storage. I learned that:

**EFS solves the shared storage problem** - Before EFS, sharing files between EC2 instances required complex solutions (NFS server on EC2, GlusterFS, etc.). EFS makes shared storage simple and managed.

**Multi-AZ design is automatic** - EFS automatically replicates data across Availability Zones. I don't need to manage replication or worry about AZ failures.

**Security requires planning** - Security groups for EFS must specifically allow NFS traffic (port 2049) and reference instance security groups, not IP addresses.

**Mount targets matter** - Creating mount targets in every AZ where instances run reduces latency and cross-AZ data transfer costs.

**Testing is verifying** - The lab validated my work by checking that files created on one instance were accessible from the test server. This proved EFS was working correctly.

**EFS is perfect for web farms** - The PetModels use case (multiple web servers serving same content) is exactly why EFS exists. Update files once on EFS, all web servers immediately see changes.

---

**Lab Status**: ✅ COMPLETED  
**Date**: May 20, 2026  
**Environment**: AWS SimuLearn / us-east-1  
**Account ID**: 8971-9670-4750  
**EFS File System**: PetModels-EFS-1 (fs-0aa8a39cff0bbddc)  
**EC2 Instance**: PetModels-C  

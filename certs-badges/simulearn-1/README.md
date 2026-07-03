# Simulearn 1 – AWS Cloud Quest: Cloud Practitioner

## Certificate

![AWS Cloud Quest Certificate](Owen-cloud-practitioner.pdf)

*Figure 1: AWS Cloud Quest: Cloud Practitioner completion certificate*

**Awarded to:** Owen Lethabo

**Date Completed:** May 03, 2026

---

## Status

| Status | Started | Completed |
|--------|---------|-----------|
|  Completed | April 2026 | May 03, 2026 |

---

## Topics Covered

| Topic | What I Learned |
|-------|----------------|
| **Cloud Fundamentals** | Cloud computing models, AWS Global Infrastructure, shared responsibility |
| **Compute** | EC2 instances, Auto Scaling, Load Balancers, Lambda |
| **Storage** | S3 buckets, EBS volumes, storage classes, lifecycle policies |
| **Networking** | VPC, subnets, route tables, Internet Gateways, Security Groups, NACLs |
| **Databases** | RDS, DynamoDB, Aurora, backups and snapshots |
| **Security** | IAM (users, groups, roles, policies), encryption, CloudTrail |
| **Serverless** | Lambda functions, API Gateway, event-driven architectures |
| **Monitoring** | CloudWatch metrics, alarms, CloudWatch Logs |

---

## Key Takeaways

| Takeaway | Why It Matters |
|----------|----------------|
| **AWS is region-based** | Choose regions close to users for low latency |
| **Shared Responsibility Model** | AWS secures the cloud, you secure what you put in it |
| **IAM is critical** | Least privilege access – never use root account |
| **S3 is object storage** | Great for static websites, backups, data lakes |
| **VPC is your private network** | You control IP ranges, subnets, and routing |
| **EC2 stops lose IPs** | Public IP changes when stopped unless using Elastic IP |
| **CloudWatch monitors everything** | Logs, metrics, and alarms are essential for SOC |

---

## What I Did in This Simulearn

| Module | What I Built |
|--------|--------------|
| Cloud Fundamentals | Completed interactive lessons and quizzes |
| Compute | Launched EC2 instances, configured Auto Scaling groups |
| Storage | Created S3 buckets, set permissions, hosted static website |
| Networking | Built VPC with public/private subnets and NAT Gateway |
| Databases | Launched RDS instance, performed backups |
| Security | Created IAM users and policies, set up MFA |
| Serverless | Built Lambda function triggered by S3 |
| Monitoring | Set up CloudWatch alarms for EC2 CPU usage |

---

## Key Commands I Used

```bash
# AWS CLI examples
aws ec2 describe-instances
aws s3 ls
aws s3 cp file.txt s3://my-bucket/
aws iam list-users
aws cloudwatch describe-alarms

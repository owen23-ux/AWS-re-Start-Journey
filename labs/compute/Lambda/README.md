# AWS Lambda – Sales Analysis Report Lab

## Lab Overview

In this lab, I deployed and configured an AWS Lambda-based serverless computing solution. The Lambda function generates a sales analysis report by pulling data from a database and emailing the results daily. The database connection information is stored in Parameter Store (AWS Systems Manager). The database runs on an Amazon EC2 LAMP instance.

---

## Architecture Diagram Summary

| Step | Action |
|------|--------|
| 1 | Amazon CloudWatch Events calls `salesAnalysisReport` Lambda function at 8 PM daily (Monday–Saturday) |
| 2 | `salesAnalysisReport` invokes `salesAnalysisReportDataExtractor` to retrieve report data |
| 3 | `salesAnalysisReportDataExtractor` runs an analytical query against the café database (`cafe_db`) |
| 4 | Query result is returned to `salesAnalysisReport` |
| 5 | `salesAnalysisReport` formats the report and publishes it to `salesAnalysisReportTopic` SNS topic |
| 6 | SNS topic sends the message by email to the administrator |

---

## What I Learned

### 1. IAM Roles and Permissions

- Lambda functions need an IAM role to access other AWS services
- Used `salesAnalysisReportDERole` with permissions for:
  - CloudWatch Logs (basic execution)
  - Amazon SNS (full access)
  - Amazon S3 (full access)
  - CloudWatch (full access)

### 2. Lambda Layers

- Created a custom layer called `pymysqlLibrary` (version 1)
- Uploaded `pymysql-v3.zip` (105.45 KB)
- Layer provides PyMySQL library modules to connect to MySQL/MariaDB databases
- Compatible runtime: Python 3.14
- Compatible architecture: arm64

### 3. Lambda Function Creation

**Function Name:** `salesAnalysisReportDataExtractor`

**Runtime:** Python 3.14

**Architecture:** arm64

**Handler:** `salesAnalysisReportDataExtractor.lambda_handler`

**Execution Role:** `salesAnalysisReportDERole`

### 4. VPC Configuration

- Connected Lambda function to VPC: `vpc-0d418a464cc5eb146 (10.200.0.0/20)`
- Subnet: `subnet-0f43fa29fab10fb07 (10.200.0.0/24)` – Cafe Public Subnet 1
- Security Group: `CafeSecurityGroup (sg-0aba35f145a5d29b2)`

### 5. Database Connection in Code

```python
import boto3
import pymysql
import sys

def lambda_handler(event, context):
    # Retrieve database connection information
    dbUrl = event['ec2-54-202-141-251.us-west-2.compute.amazonaws.com']
    dbName = event['cafe_db']
    dbUser = event['root']
    dbPassword = event['Re:Start!9']

    # Establish connection to Cafe database
    conn = pymysql.connect(host=dbUrl, user=dbUser, password=dbPassword, db=dbName, cursorclass=None)

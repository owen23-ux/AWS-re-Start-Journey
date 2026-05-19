# AWS Lambda – Sales Analysis Report Lab

## Lab Overview

In this lab, I deployed and configured an AWS Lambda-based serverless computing solution. The Lambda function generates a sales analysis report by pulling data from a database and emailing the results daily. The database connection information is stored in Parameter Store (AWS Systems Manager). The database runs on an Amazon EC2 LAMP instance.

**Date Completed:** May 13, 2026

**Author:** Owen Maake – AWS re/Start Participant | Aspiring SOC Analyst

---

## Architecture Diagram

![Diagram](diagram2.png)

*Figure 1: Architecture diagram showing the sales analysis report solution*

| Step | Action |
|------|--------|
| 1 | Amazon CloudWatch Events calls `salesAnalysisReport` Lambda function at 8 PM daily (Monday–Saturday) |
| 2 | `salesAnalysisReport` invokes `salesAnalysisReportDataExtractor` to retrieve report data |
| 3 | `salesAnalysisReportDataExtractor` runs an analytical query against the café database (`cafe_db`) |
| 4 | Query result is returned to `salesAnalysisReport` |
| 5 | `salesAnalysisReport` formats the report and publishes it to `salesAnalysisReportTopic` SNS topic |
| 6 | SNS topic sends the message by email to the administrator |

---

## Lab Objectives

After completing this lab, I was able to:

| Objective | Status |
|-----------|--------|
| Recognize necessary IAM policy permissions for Lambda functions | ✅ |
| Create a Lambda layer to satisfy an external library dependency | ✅ |
| Create Lambda functions that extract data from a database | ✅ |
| Send reports to users via SNS | ✅ |
| Deploy Lambda function triggered by schedule (CloudWatch Events) | ✅ |
| Invoke one Lambda function from another | ✅ |
| Use CloudWatch logs to troubleshoot Lambda issues | ✅ |

---

## Step 1: Create the Lambda Function

### Function Configuration

![Create Function](create-function5.png)

*Figure 2: Creating the Lambda function*

| Setting | Value |
|---------|-------|
| **Function Name** | `salesAnalysisReportDataExtractor` |
| **Runtime** | Python 3.14 |
| **Architecture** | arm64 |
| **Handler** | `salesAnalysisReportDataExtractor.lambda_handler` |

---

## Step 2: Configure IAM Execution Role

![Execution Role](execution-role6.png)

*Figure 3: Selecting the execution role*

| Setting | Value |
|---------|-------|
| **Execution Role** | `salesAnalysisReportDERole` |
| **Permissions** | CloudWatch Logs, SNS Full, S3 Full, CloudWatch Full |

The IAM role provides:
- `AWSLambdaBasicExecutionRole` – write permissions to CloudWatch Logs
- `AmazonSNSFullAccess` – full access to SNS
- `AmazonS3FullAccess` – full access to S3 buckets
- `CloudWatchFullAccess` – full access to CloudWatch

---

## Step 3: Create a Lambda Layer for PyMySQL

### Layer Creation

![Create Layer](Creating-layer4.png)

*Figure 4: Creating the PyMySQL library layer*

### Layer Selection

![Add Layer](add-layers7.png)

*Figure 5: Adding the custom layer to the function*

| Layer Setting | Value |
|---------------|-------|
| **Layer Name** | `pymysqlLibrary` |
| **Description** | PyMySQL library modules |
| **Version** | 1 |
| **Compatible Runtime** | Python 3.14 |
| **Compatible Architecture** | arm64 |
| **Zip File** | `pymysql-v3.zip` (105.45 KB) |

---

## Step 4: Upload Function Code

![Upload Code](upload9.png)

*Figure 6: Uploading the function code package*

| Setting | Value |
|---------|-------|
| **Code Package** | `salesAnalysisReportDataExtractor-v3.zip` |
| **File Size** | 0.79 KB |

---

## Step 5: Configure Runtime Settings

![Runtime Settings](run-time8.png)

*Figure 7: Runtime settings configuration*

| Setting | Value |
|---------|-------|
| **Runtime** | Python 3.14 |
| **Handler** | `salesAnalysisReportDataExtractor.lambda_handler` |
| **Architecture** | arm64 |

---

## Step 6: Configure VPC for Database Access

![Edit VPC](edit-vpc11.png)

*Figure 8: VPC configuration*

### Security Group

![VPC Security Group](vpc-group12.png)

*Figure 9: Security group selection*

| Setting | Value |
|---------|-------|
| **VPC** | `vpc-0d418a464cc5eb146 (10.200.0.0/20)` |
| **Subnet** | `subnet-0f43fa29fab10fb07 (10.200.0.0/24)` – Cafe Public Subnet 1 |
| **Security Group** | `CafeSecurityGroup (sg-0aba35f145a5d29b2)` |

> **Note:** I learned that Lambda needs VPC access to reach resources in private subnets. When connecting a function to a VPC, it does not have internet access unless the VPC provides it via NAT gateway.

---

## Step 7: Lambda Function Code

![Code Source](code-source10.png)

*Figure 10: Lambda function Python code*

```python
import boto3
import pymysql
import sys

def lambda_handler(event, context):
    # Retrieve database connection information from the event input parameter
    dbUrl = event['ec2-54-202-141-251.us-west-2.compute.amazonaws.com']
    dbName = event['cafe_db']
    dbUser = event['root']
    dbPassword = event['Re:Start!9']

    # Establish connection to Cafe database
    try:
        conn = pymysql.connect(host=dbUrl, user=dbUser, password=dbPassword, db=dbName, cursorclass=None)
    except pymysql.Error as e:
        print(e)

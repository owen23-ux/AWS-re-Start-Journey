# 🖥️  AWS Lambda: Serverless Computing Deep Dive

Date Completed: May 13, 2026
Time Spent: 2 hours
Service: AWS Lambda (Serverless Functions in the Cloud)
What I Learned
1. What AWS Lambda Is

AWS Lambda is a serverless compute service that allows you to run code without provisioning or managing servers.

Lambda automatically scales your applications and only charges you for the compute time you consume.

Common Uses of Lambda

    Running code in response to events (S3 uploads, API calls)

    Data processing and ETL jobs

    Real-time file processing

    Backend APIs (with API Gateway)

    Scheduled tasks (cron jobs)

    Chatbots and microservices

    Infrastructure automation

2. Navigating the AWS Management Console for Lambda

I learned how to navigate the AWS Console and access Lambda services.

Areas Explored

    AWS Dashboard

    Lambda Dashboard

    Functions

    Layers

    Event Source Mappings

    Monitoring Section

    Metrics and Logs

Skills Gained

    Navigating AWS regions for Lambda

    Understanding function organization

    Managing serverless resources from the console

3. Creating a Lambda Function

I learned the step-by-step process of creating a Lambda function.

Function Creation Options
Option	Description	Best For
Author from scratch	Start with simple Hello World	Full control, custom code
Use a blueprint	Sample code for common use cases	Quick starts (S3, DynamoDB triggers)
Container image	Deploy containerized applications	Larger dependencies, custom runtimes

Function Configuration I Used
Setting	My Value
Function name	salesAnalysisReportDataExtractor
Runtime	Python 3.14
Architecture	arm64
Permissions	salesAnalysisReportDERole
4. Understanding IAM Roles for Lambda

I learned how IAM roles provide permissions for Lambda functions to access other AWS services.

Key Concepts Learned

    IAM roles vs. users (roles are for AWS services, users are for people)

    Least privilege principle (only grant necessary permissions)

    Trust policies (allows Lambda to assume the role)

    Permission policies (what the role can do)

Example IAM Policy for Lambda Function:
json

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ssm:GetParameter"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "sns:Publish"
            ],
            "Resource": "*"
        }
    ]
}

5. Understanding Lambda Layers

I learned how Lambda layers help manage external dependencies and libraries.

What I Learned About Lambda Layers
Concept	Explanation
Purpose	Package libraries separately from function code
Size limit	250 MB unzipped (50 MB zipped for console)
Maximum layers	5 layers per function
Storage	Layers are extracted to /opt in execution environment

Layer Creation Process:
bash

# 1. Install library in python folder structure
pip install pymysql -t python/

# 2. Zip the folder
zip -r pymysql-layer.zip python/

# 3. Upload to AWS Lambda as a layer

Benefits of Layers:

    Keep deployment packages small (<50MB)

    Share common code across multiple functions

    Update dependencies without changing function code

    Version control for libraries

6. Adding Layers to Lambda Functions

I learned how to attach existing layers to Lambda functions.

Layer Source Options
Source	When to Use
AWS layers	Pre-built layers (Pandas, NumPy, Requests)
Custom layers	Your own packaged dependencies
Specify ARN	Layers from other AWS accounts

Compatibility Requirements:

    ✅ Runtime matches (Python 3.14)

    ✅ Architecture matches (arm64 or x86_64)

    ✅ Region matches (layers are region-specific)

7. Understanding VPC for Lambda Functions

I learned how to connect Lambda functions to VPCs for accessing private resources.

VPC Concepts Explored
Concept	Purpose
VPC	Isolated network in AWS cloud
Subnets	Segments of VPC (public vs. private)
Security Groups	Instance-level firewall rules
ENI (Elastic Network Interface)	Lambda attaches ENIs in your VPC

Important Understanding:

    Lambda runs in AWS-owned VPC by default

    VPC-attached Lambda loses default internet access

    To give internet access: route to NAT Gateway in public subnet

    Choose at least 2 subnets for high availability

8. Understanding Security Groups for Lambda

Security Groups act as virtual firewalls for Lambda functions in a VPC.

Security Group Rules I Configured
Rule Type	Protocol	Port	Source	Purpose
MySQL/Aurora	TCP	3306	Lambda SG	Database access
Outbound	All	All	0.0.0.0/0	Allow all outbound

Key Security Group Principles for Lambda:

    Inbound rules don't matter - Lambda only initiates connections

    Outbound rules matter - Must allow connections to resources (databases, APIs)

    No inbound needed - Lambda is event-driven, not accepting incoming connections

    Security groups are stateful - Return traffic automatically allowed

9. Writing Lambda Function Code

I learned how to write Python code for Lambda functions.

Lambda Handler Structure:
python

import boto3
import pymysql
import json

def lambda_handler(event, context):
    """
    Lambda function entry point
    event: Trigger data (what invoked the function)
    context: Runtime information (timeout, memory, function name)
    """
    
    # Your logic here
    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Success'})
    }

Complete Lambda Function Code I Wrote:
python

import boto3
import pymysql
import json
from datetime import datetime

def lambda_handler(event, context):
    """
    Extracts sales analysis data from MariaDB database
    Triggered by main salesAnalysisReport function
    """
    
    # Retrieve database credentials from Parameter Store
    ssm = boto3.client('ssm')
    
    dbUrl = ssm.get_parameter(Name='/cafe/dbUrl')['Parameter']['Value']
    dbName = ssm.get_parameter(Name='/cafe/dbName')['Parameter']['Value']
    dbUser = ssm.get_parameter(Name='/cafe/dbUser')['Parameter']['Value']
    dbPassword = ssm.get_parameter(Name='/cafe/dbPassword')['Parameter']['Value']
    
    # Establish database connection
    try:
        conn = pymysql.connect(
            host=dbUrl,
            user=dbUser,
            password=dbPassword,
            database=dbName,
            cursorclass=pymysql.cursors.DictCursor
        )
        
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM sales WHERE sale_date = CURDATE()")
            results = cursor.fetchall()
            
        conn.close()
        
        return {
            'statusCode': 200,
            'body': json.dumps(results, default=str)
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

Key Coding Concepts Learned:

    Never hardcode credentials (use Parameter Store or Secrets Manager)

    Always use try-except blocks for error handling

    Return proper HTTP status codes (200 for success, 500 for errors)

    Log errors to CloudWatch for debugging

    Use json.dumps() with default=str for datetime objects

10. Understanding Runtime Settings

I learned how to configure Lambda runtime settings.

Runtime Configuration Options:
Setting	My Configuration	Purpose
Runtime	Python 3.14	Programming language version
Handler	filename.function_name	Entry point for code execution
Architecture	arm64	CPU type (20% cheaper than x86_64)
Memory	128 MB - 10 GB	RAM allocation (affects CPU proportionally)
Timeout	3 seconds - 15 minutes	Maximum execution time before termination
Ephemeral storage	512 MB - 10 GB	Temporary /tmp storage

Handler Format Explained:
text

salesAnalysisReportDataExtractor.lambda_handler
│                              │
│                              └── Function name inside the Python file
└── Python file name (without .py extension)

11. Uploading Deployment Packages

I learned how to upload code to Lambda functions.

Deployment Package Limits:
Upload Method	Maximum Size
Direct console upload	50 MB (zipped)
Amazon S3 upload	250 MB (unzipped)
Container image	10 GB

Best Practices for Deployment Packages:

    Put dependencies in layers, not in the deployment package

    Remove test files and documentation

    Use .gitignore to exclude unnecessary files

    Compress efficiently (no nested folders if possible)

12. Creating Test Events

I learned how to create test events to invoke and test Lambda functions.

Test Event Structure I Created:
json

{
    "dbUrl": "cafe-db.cafeshop.us-west-2.rds.amazonaws.com",
    "dbName": "cafe_db",
    "dbUser": "cafe_user",
    "dbPassword": "CafePassword123!"
}

Invocation Types:
Type	Behavior	Maximum Timeout	Use Case
Synchronous (RequestResponse)	Waits for response	15 minutes	API Gateway, testing
Asynchronous (Event)	Queues execution, returns immediately	N/A	S3 events, scheduled tasks

Event Sharing Settings:

    Private: Only visible to you (good for personal testing)

    Shared: Visible to team members (good for collaboration)

13. Creating SNS Topics for Notifications

I learned how to create SNS topics for Lambda to send email notifications.

SNS Topic Types:
Feature	Standard	FIFO (First-In-First-Out)
Message ordering	Best-effort	Strict (preserved order)
Message delivery	At-least-once	Exactly-once
Throughput	High (unlimited)	300 messages per second
Supported protocols	SQS, Lambda, HTTP, Email, SMS	SQS only

Topic Configuration I Used:

    Name: salesAnalysisReportTopic

    Type: Standard (for email notifications)

    Display name: SARTopic (first 10 characters appear in SMS)

14. Creating Email Subscriptions

I learned how to subscribe email endpoints to SNS topics.

Subscription Workflow:

    Create subscription with protocol "Email"

    Enter endpoint email address

    AWS sends confirmation email to the address

    User clicks the confirmation link

    Subscription becomes "Confirmed"

    Messages are delivered to the email address

Critical Understanding: Without clicking the confirmation link in the email, NO messages will be delivered!

Confirmation Email Example:
text

From: AWS Notifications <no-reply@sns.amazonaws.com>
Subject: AWS Notification - Subscription Confirmation

Please confirm your subscription by clicking the following link:
https://sns.us-west-2.amazonaws.com/confirmation.html?TopicArn=...

15. Configuring AWS CLI

I learned how to configure AWS CLI for command-line management of Lambda and other services.

AWS CLI Configuration Steps:
bash

aws configure
AWS Access Key ID: AKIAXHD3RNH5K5NW74TV
AWS Secret Access Key: Kept Secretley
Default region name: us-west-2
Default output format: json

Configuration Components:
Component	Purpose
Access Key ID	Identifies the IAM user (starts with AKIA)
Secret Access Key	Password equivalent (KEEP SECRET!)
Region	Where API calls are sent (us-west-2 = Oregon)
Output format	json, yaml, text, or table

Where Credentials Are Stored:

    ~/.aws/credentials - Access keys (sensitive)

    ~/.aws/config - Region and output settings

Testing Lambda from CLI:
bash

aws lambda invoke \
  --function-name salesAnalysisReportDataExtractor \
  --payload file://test-event.json \
  response.json

16. Understanding the Complete Architecture

I learned how all AWS services work together in a complete serverless solution.

The 6-Step Workflow:
Step	Action	Service
1	CloudWatch Events triggers Lambda at 8 PM daily	Amazon CloudWatch Events
2	Main Lambda function invokes data extractor	AWS Lambda
3	Data extractor queries MariaDB database	Lambda + VPC + PyMySQL
4	Query results returned to main function	AWS Lambda
5	Results formatted and published to SNS topic	Amazon SNS
6	Email sent to administrator	Amazon SNS + Email

Services Used Together:
Service	Role in Architecture
Lambda	Serverless compute (runs the report logic)
CloudWatch Events	Scheduled triggers (8 PM daily)
SNS	Email notifications (delivers reports)
VPC	Network isolation (access private database)
IAM	Security permissions (service access)
Parameter Store	Secrets management (database credentials)
CloudWatch Logs	Debugging and monitoring
17. Understanding Lambda Limits and Quotas

I learned the important limits that apply to Lambda functions.

Lambda Limits to Remember:
Limit	Value	Impact
Maximum execution timeout	15 minutes	Long-running processes need EC2 or Step Functions
Maximum memory	10,240 MB (10 GB)	Memory also scales CPU proportionally
Temporary storage (/tmp)	512 MB - 10 GB	Can be increased up to 10 GB
Deployment package size (zipped)	50 MB	Put dependencies in layers
Deployment package size (unzipped)	250 MB	Use S3 for larger packages
Maximum layers per function	5	Plan dependency organization
Maximum concurrent executions	1,000 (default)	Can request increase
Environment variables	4 KB total	Use Parameter Store for larger configs

Exam Tip: These limits frequently appear on the Cloud Practitioner exam.
18. Understanding Lambda Pricing Model

I learned how Lambda pricing works and how to estimate costs.

Lambda Pricing Components:
Component	Price (us-west-2)	Free Tier
Requests	$0.20 per 1 million requests	1 million requests/month FREE
Compute duration	$0.0000166667 per GB-second	400,000 GB-seconds/month FREE

Pricing Formula:
text

Monthly Cost = (Total Requests × $0.20/1M) + (Duration GB-seconds × $0.0000166667)

GB-seconds Calculation:
text

GB-seconds = Memory(GB) × Duration(seconds) × Number of invocations

Example Calculation (My Lab):

    Memory: 128 MB = 0.125 GB

    Duration: 2 seconds per invocation

    Invocations: 26 (once daily Monday-Saturday for 4 weeks)

text

GB-seconds = 0.125 × 2 × 26 = 6.5 GB-seconds
Compute Cost = 6.5 × $0.000016667 = $0.000108
Request Cost = 26 × ($0.20/1,000,000) = $0.0000052
TOTAL = ~$0.00011/month (within free tier!)

19. Monitoring Lambda with CloudWatch

I learned how to monitor Lambda functions using CloudWatch.

CloudWatch Metrics for Lambda:
Metric	What It Tells You
Invocations	Number of times function ran
Duration	Execution time (p10, p50, p90, p99 percentiles)
Errors	Number of failed invocations
Throttles	When concurrency limits exceeded
Iterator Age	Stream processing latency
Concurrent Executions	Running instances of your function

Accessing CloudWatch Logs:

    Log group: /aws/lambda/salesAnalysisReportDataExtractor

    Log streams: One per execution environment instance

    Print statements appear in logs automatically

Debugging Commands:
bash

# View logs in CloudWatch
aws logs tail /aws/lambda/salesAnalysisReportDataExtractor --follow

# Check metrics
aws cloudwatch get-metric-statistics \
  --namespace AWS/Lambda \
  --metric-name Duration \
  --dimensions Name=FunctionName,Value=my-function \
  --statistics Average

20. Understanding Lambda Execution Lifecycle

I learned how Lambda executes code and the difference between cold and warm starts.

Cold Start (Function hasn't run recently):

    AWS downloads your code to a new container

    Runtime environment initializes (Python, Node.js, etc.)

    Code outside handler runs (imports, global variables)

    Handler function executes

    Container stays warm for ~5-15 minutes

Cold Start Time: 100ms - 1 second (depends on deployment package size)

Warm Start (Function ran recently):

    Reuses existing container with runtime already running

    Skips download and initialization steps

    Handler function executes immediately

Warm Start Time: 1-10ms

Why This Matters:

    First request after deployment will be slower (cold start)

    Subsequent requests are fast (warm start)

    If no traffic for ~15 minutes, container shuts down

    This is why Lambda isn't ideal for real-time/low-latency applications

Skills Summary

Skills I Gained from This Lab:
Category	Skills
AWS Console	Navigating Lambda dashboard, finding functions, understanding regions
Lambda Functions	Creating functions, writing Python code, configuring handlers
Lambda Layers	Creating layers, packaging dependencies, attaching to functions
VPC & Networking	Configuring subnets, security groups, private resource access
IAM	Creating execution roles, attaching policies, least privilege
SNS	Creating topics, subscribing email endpoints, confirmation workflow
Parameter Store	Storing and retrieving database credentials securely
Python	Writing Lambda handlers, using boto3, PyMySQL, error handling
CLI	Configuring AWS CLI, invoking Lambda from command line
Monitoring	CloudWatch Logs, debugging, error tracking, metrics
Why Lambda Matters for Cloud Practitioner Exam

Exam Topics Covered:
Exam Domain	What I Learned
Compute Services	Lambda vs EC2 comparison, serverless benefits
Serverless Value Prop	No server management, automatic scaling, pay-per-use
AWS Global Infrastructure	Lambda runs across multiple Availability Zones
Pricing Models	Pay per request + compute duration (GB-seconds)
Security	IAM roles for Lambda execution permissions
VPC	Connecting Lambda to private resources
SNS	Notification services, email delivery
CloudWatch	Monitoring, logging, metrics for serverless

Lambda Facts to Memorize for Exam:
Fact	Value
Maximum execution time	15 minutes
Maximum memory	10 GB
Temporary storage (/tmp)	512 MB (default) to 10 GB
Deployment package (console)	50 MB (zipped)
Deployment package (S3)	250 MB (unzipped)
Maximum layers	5 per function
Free tier requests	1 million/month
Free tier compute	400,000 GB-seconds/month

When to Choose Lambda vs EC2:
Use Lambda for...	Use EC2 for...
Short-running (<15 min)	Long-running processes
Irregular or low traffic	Predictable, constant load
Event-driven tasks	Always-on applications
Simple APIs/microservices	Complex, stateful applications
Rapid development	Full OS control needed
Common Errors and Solutions
Error	Cause	Solution
ModuleNotFoundError: No module named 'pymysql'	Layer not attached or incompatible	Verify layer added, runtime matches, architecture matches
Timeout	Function can't reach database or runs too long	Check VPC, security groups, routing; increase timeout
AccessDeniedException	Missing IAM permissions	Add required policies (SSM, SNS) to execution role
Cannot find handler	Wrong handler format	Use filename.function_name format (no .py extension)
No email received	Subscription not confirmed	Click confirmation link from AWS email
Function stuck in VPC	Only 1 subnet selected	Add at least 2 subnets in different AZs
Lambda cannot access internet	VPC mode removes default internet	Add NAT Gateway in public subnet
Cost Analysis

Monthly Cost Estimate for My Lab (26 invocations):
Service	Usage	Cost
Lambda requests	26 invocations	~$0.000005
Lambda compute	6.5 GB-seconds	~$0.000108
SNS	26 email deliveries	~$0.10
CloudWatch Logs	1 MB storage	~$0.0005
Parameter Store	4 parameters	$0.00 (free tier)
TOTAL		~$0.10/month

Traditional EC2 Alternative:

    t2.micro running 24/7: $8.50/month

    Savings with Lambda: 98.8%!

Next Learning Goals

Based on this lab, here's what I plan to learn next:
Topic	Why It's Important
API Gateway	Create REST APIs with Lambda backend
Step Functions	Orchestrate multiple Lambda functions
DynamoDB	Serverless database for Lambda apps
S3 Event Triggers	Auto-process files when uploaded
Lambda Power Tuning	Optimize memory vs cost vs speed
Dead Letter Queues	Handle failed invocations with SQS
Provisioned Concurrency	Eliminate cold starts for critical functions
Infrastructure as Code	Deploy Lambda with CloudFormation/CDK
Lambda Extensions	Add monitoring and observability tools
Container Image Support	Deploy larger applications (10 GB limit)
Resources Used

    AWS Free Tier account

    AWS Lambda console

    AWS CloudWatch Events

    Amazon SNS

    Systems Manager Parameter Store

    PyMySQL library (via Lambda layer)

    MariaDB database on EC2

    Python 3.14 runtime

    arm64 (Graviton) architecture

Final Reflection

This lab transformed my understanding of serverless computing. I learned that:

Serverless is not magic - It requires careful VPC, IAM, and security group configuration. The trade-off for "no servers" is understanding AWS networking deeply.

Layers solve real problems - Without layers, packaging PyMySQL would have been frustrating. Now I see why teams use them for shared dependencies and faster deployments.

Event-driven architecture scales - The pattern (CloudWatch Events → Lambda → SNS) works for billing alerts, security notifications, or business reports at any scale.

Testing is critical - Lambda's stateless nature means each invocation is fresh. Testing with different event payloads caught permission issues before "production."

Cost awareness is a feature - This solution costs $0.10/month vs $8.50 for EC2. Understanding serverless pricing is now a core skill I can apply to any project.

Cold starts are real - The first invocation after 15 minutes of idle time is noticeably slower. For production, I'd consider provisioned concurrency for latency-sensitive workloads.

Lab Status: ✅ COMPLETED
Date: May 13, 2026
Environment: AWS us-west-2 (Oregon)
Function Name: salesAnalysisReportDataExtractor
Runtime: Python 3.14 on arm64

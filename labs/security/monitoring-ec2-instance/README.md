# Monitoring Infrastructure with AWS CloudWatch, Systems Manager, and Config

**Date Completed:** _add date_

**Service:** Amazon CloudWatch, AWS Systems Manager, AWS Config, Amazon SNS

---

## Project Overview

This project demonstrates how to monitor applications and infrastructure using AWS monitoring and observability services. The ability to monitor your applications and infrastructure is critical for delivering reliable, consistent IT services. Monitoring requirements range from collecting statistics for long-term analysis to quickly reacting to changes and outages. Monitoring can also support compliance reporting by continuously checking that infrastructure is meeting organisational standards.

**Services Used:**
- AWS Systems Manager (Run Command, Parameter Store)
- Amazon CloudWatch (Logs, Metrics, Alarms, Events)
- AWS Config
- Amazon SNS

---

## What I Did

### Task 1: Installing the CloudWatch Agent

The CloudWatch agent collects metrics from EC2 instances, including system-level metrics like CPU allocation, free disk space, memory utilisation, and application logs.

**Step 1.1: Install the CloudWatch Agent using Systems Manager Run Command**

- Navigated to **Systems Manager  Run Command**
- Selected the document **AWS-ConfigureAWSPackage**
- Configured parameters:
  - Action: `Install`
  - Name: `AmazonCloudWatchAgent`
  - Version: `latest`
- Targeted the **Web Server** instance manually
- Ran the command and verified success

![Run Command Selection](run-command-1.png)

*Figure 1: Selecting the AWS-ConfigureAWSPackage document*

![Command Parameters](command-parameters-2.png)

*Figure 2: Configuring installation parameters*

![Target Selection](target-section-3.png)

*Figure 3: Selecting the Web Server instance as target*

**Step 1.2: Create a Parameter Store Configuration**

- Navigated to **Systems Manager  Parameter Store**
- Created a parameter named `Monitor-Web-Server`
- Stored the CloudWatch agent configuration JSON

![Create Parameter](parameters-6.png)

*Figure 4: Creating the Monitor-Web-Server parameter*

**Configuration File:**

```json
{
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "log_group_name": "HttpAccessLog",
            "file_path": "/var/log/httpd/access_log",
            "log_stream_name": "{instance_id}",
            "timestamp_format": "%b %d %H:%M:%S"
          },
          {
            "log_group_name": "HttpErrorLog",
            "file_path": "/var/log/httpd/error_log",
            "log_stream_name": "{instance_id}",
            "timestamp_format": "%b %d %H:%M:%S"
          }
        ]
      }
    }
  },
  "metrics": {
    "metrics_collected": {
      "cpu": {
        "measurement": ["cpu_usage_idle", "cpu_usage_iowait", "cpu_usage_user", "cpu_usage_system"],
        "metrics_collection_interval": 10,
        "totalcpu": false
      },
      "disk": {
        "measurement": ["used_percent", "inodes_free"],
        "metrics_collection_interval": 10,
        "resources": ["*"]
      },
      "diskio": {
        "measurement": ["io_time"],
        "metrics_collection_interval": 10,
        "resources": ["*"]
      },
      "mem": {
        "measurement": ["mem_used_percent"],
        "metrics_collection_interval": 10
      },
      "swap": {
        "measurement": ["swap_used_percent"],
        "metrics_collection_interval": 10
      }
    }
  }
}
```

**What This Configuration Monitors:**

| Type | Items |
|------|-------|
| **Logs** | Apache access logs (`/var/log/httpd/access_log`), Apache error logs (`/var/log/httpd/error_log`) |
| **CPU Metrics** | Idle, I/O wait, user, system usage |
| **Disk Metrics** | Used percentage, free inodes |
| **Disk I/O** | I/O time |
| **Memory** | Used percentage |
| **Swap** | Used percentage |

**Step 1.3: Start the CloudWatch Agent**

- Navigated back to **Systems Manager  Run Command**
- Selected the document **AmazonCloudWatch-ManageAgent**
- Configured parameters:
  - Action: `configure`
  - Mode: `ec2`
  - Optional Configuration Source: `ssm`
  - Optional Configuration Location: `Monitor-Web-Server`
  - Optional Restart: `yes`
- Targeted the **Web Server** instance
- Ran the command and verified success

![SSM Document Selection](run-command-7.png)

*Figure 5: Selecting the AmazonCloudWatch-ManageAgent document*

![Command Parameters](agent-command-9.png)

*Figure 6: Configuring CloudWatch agent parameters*

![Step 1 Output](step-1-output-4.png)

*Figure 7: Step 1 execution output*

![Step 2 Output](step-2-output-5.png)

*Figure 8: Step 2 execution output showing successful installation*

---

### Task 2: Monitoring Application Logs Using CloudWatch Logs

CloudWatch Logs enables monitoring of applications and systems using log data without code changes.

**Step 2.1: Generate Log Data**

- Accessed the web server using the provided IP address
- Generated 404 errors by attempting to access non-existent pages:
  - `http://<WebServerIP>/start`
  - `http://<WebServerIP>/start2`
  - Repeated 5+ times

**Step 2.2: View Log Groups in CloudWatch**

- Navigated to **CloudWatch  Log groups**
- Verified two log groups were created: `HttpAccessLog` and `HttpErrorLog`

![Log Groups](log-groups-10.png)

*Figure 9: CloudWatch Log groups showing HttpAccessLog and HttpErrorLog*

![Log Group Details](HttpAccessLog-11.png)

*Figure 10: HttpAccessLog log group details*

**Step 2.3: Create a Metric Filter for 404 Errors**

- Created a metric filter on `HttpAccessLog` with filter pattern:
  ```
  [ip, id, user, timestamp, request, status_code=404, size]
  ```
- Tested the pattern against the log data
- Created metric filter named `404Errors`:
  - Namespace: `LogMetrics`
  - Metric Name: `404Errors`
  - Metric Value: `1`

![Metric Filter Configuration](metric-filter-14.png)

*Figure 11: Configuring the metric filter for 404 errors*

**Step 2.4: Create a CloudWatch Alarm**

- Created an alarm based on the `404Errors` metric:
  - Condition: `Greater/Equal` than `5`
  - Period: `1 minute`
- Configured SNS notification to email
- Alarm name: `404 Errors`
- Alarm description: `Alert when too many 404s detected on an instance`

![Alarm Conditions](alarm-conditions-14.png)

*Figure 12: Configuring alarm conditions for 404 errors*

---

### Task 3: Monitoring Instance Metrics Using CloudWatch

CloudWatch stores metrics for AWS services and custom metrics from the CloudWatch agent.

**Step 3.1: View EC2 Metrics**

- Navigated to **EC2  Instances  Web Server  Monitoring tab**
- Viewed standard EC2 metrics (CPU, disk, network)

**Step 3.2: View CloudWatch Agent Metrics**

- Navigated to **CloudWatch  Metrics  All metrics**
- Explored metrics in the `CWAgent` namespace
- Viewed disk space metrics: `CWAgent > device, fstype, host, path`
- Viewed memory metrics: `CWAgent > host`

---

### Task 4: Creating Real-Time Notifications

CloudWatch Events delivers a near-real-time stream of system events describing changes in AWS resources.

**Step 4.1: Create a CloudWatch Event Rule**

- Navigated to **CloudWatch  Events  Rules**
- Created rule named `Instance_Stopped_Terminated`
- Event source: `AWS Services  EC2  EC2 Instance State-change Notification`
- Specific state(s): `stopped` and `terminated`
- Target: `SNS topic  Default_CloudWatch_Alarms_Topic`

**Step 4.2: Test the Notification**

- Stopped the Web Server instance from EC2 console
- Received email notification with JSON details about the stopped instance
- Confirmed real-time notification worked

---

### Task 5: Monitoring Infrastructure Compliance with AWS Config

AWS Config assesses, audits, and evaluates the configurations of AWS resources.

**Step 5.1: Enable AWS Config**

- Navigated to **AWS Config**
- Initialised AWS Config with default settings

**Step 5.2: Add Compliance Rules**

**Rule 1: required-tags**
- Added managed rule `required-tags`
- Configured parameter: `tag1Key = project`
- Rule checks for resources that do not have a `project` tag

**Rule 2: ec2-volume-inuse-check**
- Added managed rule `ec2-volume-inuse-check`
- Rule checks for EBS volumes that are not attached to EC2 instances

**Step 5.3: View Compliance Results**

- Evaluated compliance results:
  - `required-tags`: Web Server instance was compliant (had `project` tag)
  - `ec2-volume-inuse-check`: Attached volume was compliant, unattached volume was non-compliant

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           AWS Cloud                                         │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                     AWS Systems Manager                                │  │
│  │  ┌───────────────────┐    ┌─────────────────────────────────────────┐ │  │
│  │  │   Run Command      │    │         Parameter Store                 │ │  │
│  │  │  ┌───────────────┐ │    │  ┌───────────────────────────────────┐ │ │  │
│  │  │  │ AWS-Configure │ │    │  │   Monitor-Web-Server (config)     │ │ │  │
│  │  │  │ AWSPackage    │ │    │  └───────────────────────────────────┘ │ │  │
│  │  │  └───────────────┘ │    └─────────────────────────────────────────┘ │  │
│  │  │  ┌───────────────┐ │                                               │  │
│  │  │  │ AmazonCloud   │ │                                               │  │
│  │  │  │ Watch-Manage  │ │                                               │  │
│  │  │  │ Agent         │ │                                               │  │
│  │  │  └───────────────┘ │                                               │  │
│  │  └───────────────────┘                                               │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                    │                                         │
│                                    ▼                                         │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                       EC2 Instance                                    │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │  │
│  │  │                    Web Server                                   │  │  │
│  │  │  ┌─────────────────────┐    ┌─────────────────────────────┐    │  │  │
│  │  │  │  CloudWatch Agent   │    │   Apache Web Server          │    │  │  │
│  │  │  │  (Collects metrics  │    │   /var/log/httpd/            │    │  │  │
│  │  │  │   & logs)           │    │   access_log, error_log     │    │  │  │
│  │  │  └─────────────────────┘    └─────────────────────────────┘    │  │  │
│  │  └─────────────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                    │                                         │
│                                    ▼                                         │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                       Amazon CloudWatch                               │  │
│  │  ┌───────────────┐    ┌───────────────┐    ┌───────────────────────┐ │  │
│  │  │   Log Groups   │    │   Metrics     │    │   Alarms              │ │  │
│  │  │  HttpAccessLog │    │  CWAgent      │    │  404 Errors           │ │  │
│  │  │  HttpErrorLog  │    │  (CPU, Disk,  │    │  (Greater/Equal 5)    │ │  │
│  │  │                │    │   Memory,     │    │                       │ │  │
│  │  │  ┌───────────┐ │    │   Swap)       │    │                       │ │  │
│  │  │  │Metric     │ │    │               │    │                       │ │  │
│  │  │  │Filter     │ │    │               │    │                       │ │  │
│  │  │  │404Errors  │ │    │               │    │                       │ │  │
│  │  │  └───────────┘ │    └───────────────┘    └───────────┬───────────┘ │  │
│  │  └───────────────┘                                     │             │  │
│  └──────────────────────────────────────────────────────┬──┴─────────────┘  │
│                                                         │                    │
│                                              ┌──────────┴──────────┐       │
│                                              │    Amazon SNS       │       │
│                                              │  (Email Notification)│       │
│                                              └─────────────────────┘       │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                     AWS Config                                        │  │
│  │  ┌───────────────────────┐    ┌────────────────────────────────────┐ │  │
│  │  │   required-tags       │    │   ec2-volume-inuse-check           │ │  │
│  │  │   (project tag check) │    │   (attached volume check)          │ │  │
│  │  └───────────────────────┘    └────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                  CloudWatch Events                                    │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │  │
│  │  │  Rule: Instance_Stopped_Terminated                             │  │  │
│  │  │  Event: EC2 Instance State-change Notification                 │  │  │
│  │  │  Target: SNS Topic (email notification)                        │  │  │
│  │  └─────────────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Summary of Services Used

| Service | Purpose |
|---------|---------|
| **AWS Systems Manager Run Command** | Remotely install and configure the CloudWatch agent on EC2 instances |
| **AWS Systems Manager Parameter Store** | Store the CloudWatch agent configuration securely |
| **Amazon CloudWatch Logs** | Collect, monitor, and analyse log files from EC2 instances |
| **Amazon CloudWatch Metrics** | Collect and visualise system and application metrics |
| **Amazon CloudWatch Alarms** | Trigger notifications based on metric thresholds |
| **Amazon CloudWatch Events** | Respond to real-time infrastructure changes |
| **Amazon SNS** | Send email notifications for alarms and events |
| **AWS Config** | Assess and audit resource configurations for compliance |

---

## What I Learned

| Concept | What I Learned |
|---------|----------------|
| **Systems Manager Run Command** | Remotely execute commands on EC2 instances without SSH access |
| **Parameter Store** | Securely store configuration data for applications and agents |
| **CloudWatch Agent** | Collect custom metrics and logs from EC2 instances |
| **CloudWatch Logs** | Centralise log data from multiple sources for analysis |
| **Metric Filters** | Extract specific patterns from log data and turn them into metrics |
| **CloudWatch Alarms** | Create alerts based on metric thresholds |
| **CloudWatch Events** | Automate responses to infrastructure changes |
| **AWS Config** | Continuously monitor and evaluate resource configurations |
| **SNS Notifications** | Deliver alerts via email, SMS, or other endpoints |

---

## Key Takeaways

| Takeaway | Why It Matters |
|----------|----------------|
| **Centralised logging** | CloudWatch Logs eliminates the need to log in to individual servers |
| **Automated configuration** | Systems Manager enables consistent configuration across multiple instances |
| **Real-time monitoring** | CloudWatch provides near-real-time visibility into infrastructure |
| **Proactive alerts** | Alarms notify you before issues impact users |
| **Compliance automation** | AWS Config continuously checks resources against standards |
| **Event-driven automation** | CloudWatch Events can trigger automated remediation |

---

## Commands and Configuration Used

### Parameter Store Configuration

```json
{
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "log_group_name": "HttpAccessLog",
            "file_path": "/var/log/httpd/access_log",
            "log_stream_name": "{instance_id}",
            "timestamp_format": "%b %d %H:%M:%S"
          },
          {
            "log_group_name": "HttpErrorLog",
            "file_path": "/var/log/httpd/error_log",
            "log_stream_name": "{instance_id}",
            "timestamp_format": "%b %d %H:%M:%S"
          }
        ]
      }
    }
  },
  "metrics": {
    "metrics_collected": {
      "cpu": {
        "measurement": ["cpu_usage_idle", "cpu_usage_iowait", "cpu_usage_user", "cpu_usage_system"],
        "metrics_collection_interval": 10,
        "totalcpu": false
      },
      "disk": {
        "measurement": ["used_percent", "inodes_free"],
        "metrics_collection_interval": 10,
        "resources": ["*"]
      },
      "diskio": {
        "measurement": ["io_time"],
        "metrics_collection_interval": 10,
        "resources": ["*"]
      },
      "mem": {
        "measurement": ["mem_used_percent"],
        "metrics_collection_interval": 10
      },
      "swap": {
        "measurement": ["swap_used_percent"],
        "metrics_collection_interval": 10
      }
    }
  }
}
```

### Metric Filter Pattern

```
[ip, id, user, timestamp, request, status_code=404, size]
```


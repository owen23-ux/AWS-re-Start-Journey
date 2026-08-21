# 🖥️ AWS Lab: Monitor an EC2 Instance (CloudWatch & SNS)
**Service:** Amazon CloudWatch & Amazon SNS (Monitoring & Notification Services)

---

## What I Learned

### 1. What Amazon CloudWatch Is

Amazon CloudWatch is a monitoring and observability service built for DevOps engineers, developers, site reliability engineers (SREs), and IT managers. It provides data and actionable insights to monitor applications, respond to system-wide performance changes, optimize resource utilization, and get a unified view of operational health.

**Key Capabilities:**
- Collects metrics and logs from AWS resources
- Monitors EC2 instances, EBS volumes, and RDS databases
- Provides automated dashboards for visual data tracking
- Triggers alarms based on custom thresholds
- Integrates with SNS to send automated notifications

**What CloudWatch Monitors:**

| Resource | What It Monitors |
|----------|------------------|
| EC2 Instances | CPU utilization, network traffic, disk I/O |
| EBS Volumes | Read/write operations, latency, throughput |
| RDS Databases | Database connections, CPU, memory |
| Lambda Functions | Invocation count, errors, duration |
| S3 Buckets | Storage size, request counts, errors |

**Common Uses of CloudWatch:**
- Monitoring application performance in real-time
- Setting alarms for resource exhaustion
- Automating responses to system events
- Visualizing metrics using dashboards

---

### 2. Navigating the AWS Management Console for CloudWatch

I learned how to navigate the AWS Console and access CloudWatch services.

**Areas Explored:**

- CloudWatch Dashboard
- Alarms (All alarms)
- Metrics (Browse, Graph)
- Logs
- Infrastructure Monitoring

**Skills Gained:**
- Navigating AWS regions for CloudWatch (us-west-2)
- Understanding alarm states (OK, In alarm, Insufficient data)
- Managing monitoring alerts from the console
- Creating and configuring dashboards

---

### 3. Creating an SNS Topic

I learned how to create an Amazon Simple Notification Service (SNS) topic to handle notification routing.

**Create Topic Screen:**

![Create Topic](creating-topic-5.png)

*Figure 1: Creating an SNS topic named MyCwAlarm*

**Topic Details Configured:**

| Field | Value |
|-------|-------|
| Type | Standard |
| Name | `MyCwAlarm` |
| Protocol | Email |
| Endpoint | `example@gmail.com` (Email address) |

**What is an SNS Topic?**
An SNS topic is a logical access point that acts as a communication channel. It allows you to group multiple endpoints (like email, SMS, or Lambda functions) and send messages to all of them at once.

**Creating an SNS Topic Steps:**
1. Navigate to Amazon SNS in AWS Console
2. Click "Topics" in the left sidebar
3. Click "Create topic"
4. Select "Standard" as the type
5. Enter a name (e.g., `MyCwAlarm`)
6. Click "Create topic"

---

### 4. Creating an SNS Subscription

I learned how to create a subscription to link an endpoint (email) to an SNS topic.

**Subscription Configuration:**

| Field | Value |
|-------|-------|
| Topic ARN | `arn:aws:sns:us-west-2:549675909988:MyCwAlarm` |
| Protocol | Email |
| Endpoint | `example@gmail.com` |

**What This Does:**
- The SNS topic sends notifications to this specific email address
- Requires confirmation via email to activate
- Once confirmed, SNS can send alerts to the endpoint

**Subscription Confirmation:**

![Subscription Confirmed](subscription-confirmed-7.png)

*Figure 2: AWS notification confirming email subscription*

**Confirmed Subscription Details:**
```
Subscription ARN: arn:aws:sns:us-west-2:549675909988:MyCwAlarm:f05d2037-0b92-43cf-aa50-195221dab5bc
```

**Key Takeaway:**
- SNS subscriptions require manual confirmation through email
- This prevents unauthorized endpoints from receiving notifications
- The subscription becomes active immediately after confirmation

---

### 5. Generating CPU Load on EC2 (Stress Test)

I learned how to intentionally generate high CPU load on an EC2 instance to test monitoring capabilities.

**Stress Test Command Executed:**

```bash
sudo stress --cpu 10 -v --timeout 400s
```

**What This Command Does:**
- Creates 10 CPU workers
- Uses verbose mode (`-v`) to display output
- Runs for 400 seconds (`--timeout`)
- Forks multiple child processes to consume CPU resources

**Stress Test Output:**
```
stress: info: [3362] dispatching hogs: 10 cpu, 0 io, 0 vm, 0 hdd
stress: debug: [3362] using backoff sleep of 30000us
stress: debug: [3362] setting timeout to 400s
stress: debug: [3362] --> hogcpu worker 10 [3363] forked
stress: debug: [3362] --> hogcpu worker 9 [3364] forked
stress: debug: [3362] --> hogcpu worker 8 [3365] forked
...
```

**Verifying CPU Usage with `top`:**

| Field | Value |
|-------|-------|
| %CPU(s) | 100.0 us |
| Load Average | 7.84, 2.63, 0.94 |
| Running Tasks | 11 |
| CPU Status | 100% utilization |

**Why Stress Testing is Important:**
- Tests whether CloudWatch alarms trigger correctly
- Verifies SNS notification delivery works
- Simulates real-world high-load scenarios
- Ensures monitoring systems are properly configured

---

### 6. Creating a CloudWatch Alarm

I learned how to create a CloudWatch alarm to monitor EC2 CPU utilization.

**Alarm Configuration:**

| Field | Value |
|-------|-------|
| Metric | CPUUtilization |
| Namespace | AWS/EC2 |
| InstanceId | `i-07140312f2a00bb28` |
| Statistic | Average |
| Period | 1 minute |
| Threshold Type | Static |
| Condition | Greater than 60% |
| Alarm State Trigger | In alarm |

**Metric Selection Screen:**

![Select Metric](select-metric-4.png)

*Figure 3: Selecting the CPUUtilization metric for the EC2 instance*

**Conditions Configuration:**

```yaml
Threshold type: Static
Whenever CPUUtilization is...: Greater
than...: 60
```

**Alarm Settings:**
- **Metric Name:** `CPUUtilization`
- **Instance Name:** `Stress Test`
- **Statistics:** `Average`
- **Period:** `1 minute`

**What This Alarm Does:**
- Checks CPU utilization every minute
- Triggers if utilization exceeds 60%
- Sends notification to SNS topic `MyCwAlarm`
- Enters "In alarm" state when threshold is breached

---

### 7. Configuring Alarm Actions (SNS Notifications)

I learned how to link a CloudWatch alarm to an SNS topic for notifications.

**Action Configuration:**

| Field | Value |
|-------|-------|
| Alarm State Trigger | In alarm |
| SNS Topic | Select an existing SNS topic |
| Topic Name | `MyCwAlarm` |

**Notification Flow:**

```
EC2 CPU > 60% → CloudWatch Alarm → SNS Topic → Email Notification
```

**SNS Topic Selection Screen:**

![Select SNS Topic](select-sns-topic-10.png)

*Figure 4: Selecting the MyCwAlarm SNS topic for notifications*

**Key Learnings:**
- Alarms can trigger multiple actions (SNS, Auto Scaling, EC2 actions)
- SNS handles message distribution to all subscribed endpoints
- Notifications are sent automatically when alarm state changes
- Email confirmation required before notifications are delivered

---

### 8. Understanding Alarm States

I learned about the different states a CloudWatch alarm can be in.

**Alarm States:**

| State | Description |
|-------|-------------|
| OK | Metric is within the defined threshold |
| In alarm | Metric is outside the defined threshold |
| Insufficient data | Not enough data points to determine state |

**Alarm State Transitions:**
```
OK → In alarm (metric breaches threshold)
In alarm → OK (metric returns within threshold)
Insufficient data → OK (enough data collected)
```

**Lab Alarm Details:**
- **Alarm Name:** `LabCPUUtilizationAlarm`
- **Current State:** In alarm (during stress test)
- **Threshold:** CPU > 60% for 1 datapoint within 1 minute
- **Metric Status:** CPUUtilization

---

### 9. Monitoring the Alarm and Metrics

I learned how to view CloudWatch metrics and alarm graphs to monitor resource performance.

**Alarm Graph Screen:**

![Alarm Graph](alarm-graph-2.png)

*Figure 5: LabCPUUtilizationAlarm graph showing CPU utilization spike*

**Graph Details:**

| Field | Value |
|-------|-------|
| Metric | CPUUtilization |
| Threshold | 60% (Red line) |
| Metric Data | Blue line |
| Time Range | 3 hours |
| Current CPU | 0.167% (after stress test ended) |

**Observed Metrics:**
- CPU utilization spiked to 100% during stress test
- Metric dropped back to 0.167% after test completed
- Alarm correctly triggered at the 60% threshold
- Graph shows continuous monitoring data

**Metric Browser Screen:**

![Metrics Browser](metrics-browser-9.png)

*Figure 6: CloudWatch metrics browser showing CPUUtilization for Stress Test instance*

**Instance Metrics Displayed:**
- CPUUtilization
- NetworkIn
- NetworkOut
- NetworkPacketsIn
- NetworkPacketsOut

---

### 10. Creating a CloudWatch Dashboard

I learned how to create a custom dashboard to visualize and monitor AWS resources.

**Dashboard Configuration:**

| Field | Value |
|-------|-------|
| Dashboard Name | `LabEC2Dashboard` |
| Valid Characters | 0-9A-Za-z-_ |
| Type | Custom Dashboard |

**Dashboard Creation Screen:**

![Create Dashboard](create-dashboard-3.png)

*Figure 7: Creating a new CloudWatch dashboard named LabEC2Dashboard*

**What Dashboards Do:**
- Provide a single view for multiple metrics
- Allow custom placement of widgets
- Enable real-time monitoring of resources
- Can be shared with team members

**Dashboard Benefits:**
- Visualize resource performance trends
- Identify anomalies quickly
- Customize views for different teams
- Monitor multiple resources in one place

---

### 11. Understanding CloudWatch Metrics Collection

I learned how CloudWatch collects and processes metrics from AWS resources.

**Metric Collection Process:**

```
┌─────────────────────────────────────────────────────────────┐
│                      AWS Account                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   EC2       │  │    RDS      │  │   Lambda    │         │
│  │  Instance   │  │  Database   │  │  Function   │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
│         │                │                │                 │
│         ▼                ▼                ▼                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Amazon CloudWatch                       │   │
│  │  - Collects metrics and logs                         │   │
│  │  - Processes data points                             │   │
│  │  - Stores metrics for retrieval                      │   │
│  └─────────────────────────────────────────────────────┘   │
│         │                │                │                 │
│         ▼                ▼                ▼                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   Dashboards                         │   │
│  │  - Visualizes metric data                            │   │
│  │  - Provides real-time monitoring                     │   │
│  │  - Customizable views                                │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Metric Data Points:**
- **Average:** Mean value over the period
- **Minimum:** Lowest value over the period
- **Maximum:** Highest value over the period
- **Sum:** Total of all values over the period

---

### 12. Understanding EC2 Monitoring Metrics

I examined the metrics available for monitoring EC2 instances.

**EC2 Standard Metrics:**

| Metric Name | Description |
|-------------|-------------|
| CPUUtilization | Percentage of CPU capacity used |
| NetworkIn | Bytes received on all network interfaces |
| NetworkOut | Bytes sent on all network interfaces |
| NetworkPacketsIn | Number of packets received |
| NetworkPacketsOut | Number of packets sent |
| DiskReadOps | Completed read operations |
| DiskWriteOps | Completed write operations |
| StatusCheckFailed | System and instance status checks |

**Metric Characteristics:**
- **Metric Name:** CPUUtilization
- **Namespace:** AWS/EC2
- **Instance ID:** i-07140312f2a00bb28
- **Instance Name:** Stress Test
- **Statistic:** Average
- **Period:** 1 minute

**Observed Metric Values:**
- **Before Stress Test:** 0.167% CPU utilization
- **During Stress Test:** 100% CPU utilization (peak)
- **After Stress Test:** 0.167% CPU utilization

---

### 13. Understanding Resource Identification in CloudWatch

I learned how to identify specific resources when configuring monitoring.

**Instance Identification:**
- **Instance ID:** `i-07140312f2a00bb28`
- **Instance Name:** `Stress Test`
- **Region:** us-west-2 (Oregon)
- **Account ID:** 549675909988

**Why Resource Identification Matters:**
- Ensures metrics are tied to the correct resource
- Prevents monitoring the wrong instance
- Enables accurate alarm configuration
- Allows proper dashboard visualization

**Metric Selection Process:**
1. Navigate to CloudWatch Metrics
2. Browse by service (EC2)
3. Search for Instance ID
4. Select CPUUtilization metric
5. Configure statistic and period

---

### 14. Understanding the Stress Test Instance

I examined the EC2 instance used for the stress test and monitoring.

**Instance Configuration:**

| Field | Value |
|-------|-------|
| Instance ID | i-07140312f2a00bb28 |
| Instance Name | Stress Test |
| Session ID | user5033126-Owen_Maake-cj4xtqi2ntkziblxykabs25z4 |
| Status | Running |
| CPU Load | 100% (during stress) |
| Available Memory | 39756 MB |

**Stress Test Results:**
- **Load Average:** 7.84, 2.63, 0.94
- **Running Tasks:** 11
- **CPU Usage:** 100.0 us
- **Number of Stress Processes:** 10

**Instance Metrics Observed:**
- CPU usage reached 100% during stress test
- Load average increased significantly
- System remained responsive despite high load
- Monitoring correctly captured the spike

---

### 15. Understanding Alarm Notification Flow

I learned how CloudWatch alarms trigger notifications through SNS.

**Notification Flow Architecture:**

```
┌─────────────────────────────────────────────────────────────────┐
│                    Notification Flow                             │
│                                                                 │
│  ┌────────────┐     ┌──────────────┐     ┌──────────────┐      │
│  │  EC2 CPU   │     │  CloudWatch  │     │  SNS Topic   │      │
│  │ Utilization│────▶│   Alarm      │────▶│  (MyCwAlarm) │      │
│  │  > 60%     │     │ (In alarm)   │     │              │      │
│  └────────────┘     └──────────────┘     └──────┬───────┘      │
│                                                 │               │
│                                                 ▼               │
│                                        ┌──────────────────┐    │
│                                        │ Email Subscription│   │
│                                        │ (example@gmail.com)│  │
│                                        └──────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Key Components:**
- **Metric:** CPU utilization data point
- **Alarm:** Monitors metric against threshold
- **SNS Topic:** Routes notifications to endpoints
- **Email Subscription:** Delivers notification to user

---

## Skills Summary

**Skills I Gained from This Lab:**

| Category | Skills |
|----------|--------|
| CloudWatch | Creating alarms, configuring thresholds |
| SNS | Creating topics, managing subscriptions |
| EC2 Monitoring | Monitoring CPU utilization, stress testing |
| Dashboards | Creating custom monitoring views |
| Notifications | Configuring email alerts, understanding alarm states |
| Metric Analysis | Reading metric graphs, understanding data points |

---

## Why CloudWatch Matters for Cloud Practitioner Exam

**Exam Topics Covered:**

| Exam Domain | What I Learned |
|-------------|----------------|
| Monitoring Services | CloudWatch for resource monitoring |
| Notification Services | SNS for alert notifications |
| EC2 Operations | Monitoring and stress testing instances |
| Cloud Operations | Alarm creation and dashboard management |
| Incident Response | Detecting and responding to performance issues |

**CloudWatch Facts to Memorise for Exam:**

| Fact | Value |
|------|-------|
| CloudWatch purpose | Monitoring and observability |
| Alarm states | OK, In alarm, Insufficient data |
| SNS purpose | Notification service |
| Alarm threshold | Custom percentage/values |
| Default monitoring | Basic (5-minute intervals) |
| Detailed monitoring | 1-minute intervals |

---

## Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| No metrics appearing | Instance not running | Ensure EC2 instance is running |
| Alarm not triggering | Wrong metric selected | Verify metric name and instance ID |
| Email not received | Subscription not confirmed | Confirm subscription via email link |
| Alarm stuck in insufficient data | No data points | Wait for metric collection period |
| Dashboard not showing data | Wrong region | Check correct region (us-west-2) |

---

## Cost Analysis

**CloudWatch Pricing (us-west-2):**

| Service | Price |
|---------|-------|
| Custom metrics | $0.30 per metric per month |
| Alarm metrics | $0.10 per alarm per month |
| Dashboard (3 widgets) | $3.00 per month |
| SNS notifications (first 100k) | $0.50 per 100k messages |
| SNS email subscriptions | Free |

**Free Tier:**
- 10 custom metrics (first month)
- 3 alarms (first month)
- 10 dashboards (first month)
- SNS notifications (first 1M messages)

**My Lab Cost:**
- 1 CloudWatch alarm
- 1 SNS topic
- 1 email subscription
- 1 dashboard
- **Total cost: $0.00 (within free tier)**

---

## Next Learning Goals

| Topic | Why It's Important |
|-------|---------------------|
| CloudWatch Logs | Centralise application logs |
| CloudWatch Events | Automate responses to state changes |
| AWS CloudTrail | Audit API activity |
| SNS Mobile Push | Notifications for mobile devices |
| Auto Scaling | Automatically adjust resources based on alarms |

---

## Resources Used

- AWS Free Tier account (us-west-2 / Oregon)
- Amazon CloudWatch console
- Amazon SNS console
- EC2 instance (`Stress Test`)
- AWS Systems Manager Session Manager
- `stress` command-line utility

---

## Final Reflection

This lab transformed my understanding of AWS monitoring and alerting. I learned that:

**Monitoring is essential** – CloudWatch provides real-time visibility into AWS resource performance. Without it, issues can go unnoticed until they become critical.

**Alarms automate response** – By setting alarms, I can be notified automatically when resources exceed thresholds. This reduces manual monitoring effort and enables faster incident response.

**SNS handles notifications** – SNS provides a reliable way to route alerts to various endpoints. The subscription confirmation process ensures notifications only reach intended recipients.

**Stress testing validates configurations** – By deliberately generating high CPU load, I verified that alarms trigger correctly and notifications are delivered as expected.

**Dashboards provide visibility** – Custom dashboards allow monitoring multiple resources in a single view, making it easier to spot trends and anomalies.

---

## Lab Status: ✅ COMPLETED

**Date:** August 21, 2026

**Environment:** AWS us-west-2 (Oregon)

**Account ID:** 5496-7590-9988

**EC2 Instance Monitored:** i-07140312f2a00bb28 (Stress Test)

**SNS Topic Created:** MyCwAlarm

**Alarm Created:** LabCPUUtilizationAlarm (CPU > 60%)

**Dashboard Created:** LabEC2Dashboard

**Stress Test Duration:** 400 seconds

**Peak CPU Usage:** 100%

**Alarm State:** In alarm (triggered correctly)

**Notifications:** Delivered via email subscription

---

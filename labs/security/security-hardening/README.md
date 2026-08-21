# 🛠️ AWS Systems Manager: Patch Manager & Fleet Management

**Time Spent:** 1 hour

**Service:** AWS Systems Manager (Operations Hub & Patch Management)

---

## What I Learned

### 1. What AWS Systems Manager Is

AWS Systems Manager is a unified operations service that gives you visibility and control over your AWS infrastructure. It acts as a central place to view and manage AWS resources, automate operational tasks, and maintain compliance.

**Key Capabilities:**
- Manages EC2 instances and on-premises servers at scale
- Automates patching of operating systems (Windows & Linux)
- Provides centralized visibility into fleet health and compliance
- Executes commands and runs scripts across multiple nodes
- Groups resources using tags for easy targeting

**What Systems Manager Can Manage:**

| Resource | What It Manages |
|----------|-----------------|
| EC2 Instances | Patching, inventory, configuration |
| On-Premises Servers | Hybrid activation, patching |
| Managed Nodes | Fleet visibility, compliance |
| Operating Systems | Windows, Linux, macOS |
| Applications | Software inventory, patch updates |

**Common Uses of Systems Manager:**
- Automated OS patch management
- Remote execution of administrative commands
- Centralized compliance monitoring
- Resource grouping and tagging strategies

---

### 2. Navigating the AWS Management Console for Systems Manager

I learned how to navigate the AWS Console and access Systems Manager services.

**Areas Explored:**

- Fleet Manager (Managed Nodes)
- Patch Manager (Baselines, Patch Now)
- Run Command (Execution Details)
- State Manager
- Compliance Dashboard
- Node Tools (Inventory, Compliance)

**Skills Gained:**
- Navigating AWS regions (us-west-2)
- Understanding managed node statuses (Running, Online)
- Managing patch baselines and groups
- Interpreting execution logs and outputs

---

### 3. Understanding Managed Nodes & Fleet Manager

I learned how Systems Manager discovers and tracks EC2 instances as managed nodes.

**Managed Nodes Discovered:**

| Node ID | Name | Platform | OS | Status | Agent Version |
|---------|------|----------|----|--------|---------------|
| i-0363a3d... | Linux-1 | Linux | Amazon L... | Online | 3.3.4515.0 |
| i-04cfd54... | Windows-2 | Windows | Microsoft ... | Online | 3.3.4268.0 |
| i-05a31a6... | Windows-1 | Windows | Microsoft ... | Online | 3.3.4268.0 |
| i-06d0ea4... | Windows-3 | Windows | Microsoft ... | Online | 3.3.4268.0 |
| i-08482ec... | Linux-2 | Linux | Amazon L... | Online | 3.3.4515.0 |
| i-0b6c9b3... | Linux-3 | Linux | Amazon L... | Online | 3.3.4515.0 |

**What This Shows:**
- 6 EC2 instances are being managed
- Both Windows and Linux environments are supported
- The SSM Agent is running successfully on all nodes
- Fleet Manager provides a centralized dashboard for all instances

---

### 4. Creating Resource Tags for Targeting

I learned how to use EC2 tags to group instances for batch operations.

**Tags Applied to Windows-1 Instance:**

| Key | Value |
|-----|-------|
| Name | Windows-1 |
| cloudlab | c208432a529659115467765t1w822222996899 |
| Patch Group | windowsProd |

**Why Tagging is Important:**
- Allows you to target specific groups of instances for patching
- Reduces manual selection errors during operations
- Enables automation based on environment (Prod, Dev, Test)
- Tag keys are automatically used by Patch Manager

**Manage Tags Screen:**
*Figure 1: Assigning the `Patch Group: windowsProd` tag to an EC2 instance*

---

### 5. Understanding Patch Baselines

I learned how to create custom patch baselines to define update rules.

**Custom Patch Baseline Configuration:**

| Field | Value |
|-------|-------|
| Name | `WindowsServerSecurityUpdates` |
| Description | Windows security baseline patch |
| Operating System | Windows |
| Compliance Status | Noncompliant |

**Operating System Rule (Rule 1):**

| Field | Value |
|-------|-------|
| Products | WindowsServer2019 |
| Classification | SecurityUpdates |
| Severity | Important |
| Auto-approval | Approve patches after 3 days |
| Compliance reporting | High |

**Create Patch Baseline Screen:**
*Figure 2: Configuring the Operating System rule for the Windows patch baseline*

**What This Baseline Does:**
- Targets Windows Server 2019
- Only installs `Important` severity `SecurityUpdates`
- Patches are automatically approved 3 days after release
- Ensures patches are only applied to specific operating systems

---

### 6. Modifying Patch Groups

I learned how to attach instances to a specific patch baseline using patch groups.

**Modify Patch Groups Screen:**

| Field | Value |
|-------|-------|
| Baseline ID | pb-028daf23a92625cbc |
| Baseline Name | WindowsServerSecurityUpdates |
| Patch Groups | windowsProd |
| Status | No patch groups attached (before adding) |

**What Patch Groups Do:**
- Dynamically associate instances with a patch baseline
- Using a `Patch Group` tag matches instances to the baseline
- Simplifies management for large fleets

**Modify Patch Groups Screen:**
*Figure 3: Adding the `windowsProd` Patch Group to the WindowsServerSecurityUpdates baseline*

---

### 7. Configuring Patching

I learned how to configure automatic patching for specific instances.

**Configure Patching Screen:**

| Field | Value |
|-------|-------|
| Instance Selection | Enter instance tags |
| Tag Key | Patch Group |
| Tag Value | LinuxProd |

**Configure Patching Screen:**
*Figure 4: Setting up patching to target instances tagged with `Patch Group: LinuxProd`*

**How Configuration Works:**
1. Patch Manager uses Run Command to call the `RunPatchBaseline` document
2. Instances evaluate which patches should be installed
3. Patching happens directly on the instance
4. Maintenance windows can be defined to control patch times

---

### 8. Running an On-Demand Patch Operation (Patch Now)

I learned how to manually trigger a patch scan and install operation on managed nodes.

**Patch Now Configuration:**

| Field | Value |
|-------|-------|
| Patching Operation | Scan and install |
| Instances to Patch | Patch all instances (or target specific) |
| Patching Log Storage | No S3 Bucket Found |
| Target Selection | Specify instance tags |
| Tag Key | Patch Group |
| Tag Value | windowsProd |

**Patch Instances Now Screens:**
*Figure 5: Configuring an on-demand Scan and install operation for all instances*
*Figure 6: Selecting the `windowsProd` Patch Group for the operation*

**What "Scan and Install" Does:**
- Immediately scans target instances for missing patches
- Installs patches based on approved baselines
- Bypasses the requirement to create a schedule
- Updates the compliance status of instances in real-time

---

### 9. Understanding Patch Execution and Output

I learned how to monitor the status and output of a patch execution operation.

**Association Execution Summary:**

| Field | Value |
|-------|-------|
| Association ID | 276925aa-7ac8-4207-bf56-90434011e1b3 |
| Execution ID | af39e44d-92dd-4c3d-bfed-85ceabebcefc |
| Status | Success |
| Operation | Install |
| Reboot Option | RebootIfNeeded |
| Summary | Success=1 |

**Association Execution Summary Screen:**
*Figure 7: Dashboard showing a successful patch execution operation*

**Execution Details:**

| Field | Value |
|-------|-------|
| Resource ID | i-05a31a6cbe55c735b (Windows-1) |
| Resource Type | ManagedInstance |
| Status | Success |
| Last Execution Date | Tue, 09 Jun 2026 12:27:19 GMT |

**Run Command Output:**

```
Initial try to acquire lock on the lock file

Acquired lock on the lock file

Lock file C:\ProgramData\Amazon\SSM\patch-baseline-concurrent.lock created: {
    "commandId": "741204a8-5e0a-4fe0-a9da-6c9ef4d74f9c",
    "rebootCount": 0,
}
```

**Key Takeaways:**
- The patch operation ran successfully on the Windows-1 instance
- The output confirms the lock file was created without errors
- Status is reported as `Success` with detailed status `Success`
- `RebootIfNeeded` was configured, meaning the instance would reboot if required

---

### 10. Understanding the Compliance Dashboard

I learned how to view the overall patch compliance of managed nodes.

**Compliance Summary:**

| Status | Percentage |
|--------|------------|
| Compliant | 50% |
| Other noncompliant | 50% |
| Critical noncompliant | 0% |
| High noncompliant | 0% |

**Dashboards Details:**
- **Amazon EC2 instance management:** Snapshot of EC2 instances not managed by Systems Manager.
- **Compliance Summary:** Shows the compliance status of managed nodes that have previously reported patch data.

**Compliance Dashboard Screen:**
*Figure 8: Systems Manager Dashboard showing 50% compliant and 50% other noncompliant nodes*

**Why Compliance Matters:**
- Verifies that patches are applied correctly across the fleet
- Identifies noncompliant nodes that require attention
- Provides visibility into security posture
- Can trigger alerts or automated remediation

---

## Skills Summary

**Skills I Gained from This Lab:**

| Category | Skills |
|----------|--------|
| Systems Manager | Navigating the console, Fleet Manager, State Manager |
| Patch Manager | Creating baselines, configuring patching, running Patch Now |
| Resource Tagging | Creating tags, targeting instances using tags |
| Automation | Running SSM commands, understanding execution outputs |
| Compliance | Interpreting compliance dashboards and node statuses |
| Troubleshooting | Reading execution logs and resource statuses |

---

## Why Systems Manager Matters for Cloud Practitioner Exam

**Exam Topics Covered:**

| Exam Domain | What I Learned |
|-------------|----------------|
| Management Tools | Systems Manager for unified operations |
| Security & Compliance | Patch baselines for OS security |
| Automation | Run Command, State Manager |
| EC2 Operations | Fleet management and tagging |
| Cloud Operations | Maintenance windows, compliance monitoring |

**Systems Manager Facts to Memorise for Exam:**

| Fact | Value |
|------|-------|
| Purpose | Central place to view and manage AWS resources |
| Key component | SSM Agent (installed on EC2 and on-prem) |
| Patch Manager | Automates OS patching and compliance |
| Run Command | Remotely executes commands on instances |
| Fleet Manager | Manages all instances in a fleet |
| Tagging | Used to group resources for automation |

---

## Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| Instance not showing as Managed | SSM Agent not installed | Install/Update SSM Agent |
| Instance showing offline | IAM role missing permissions | Attach `AmazonSSMManagedInstanceCore` policy |
| Patch operation fails | Insufficient IAM permissions | Ensure `AmazonSSMFullAccess` for the role |
| Patching not triggering | No Patch Group tag set | Add `Patch Group: value` tag to instances |
| Compliance not updating | Missing RunPatchBaseline document | Wait for scan, or run Patch Now |

---

## Cost Analysis

**Systems Manager Pricing (us-west-2):**

| Feature | Pricing |
|---------|---------|
| Fleet Manager | Free |
| Patch Manager | $0.005 per managed node per month |
| Inventory | Free |
| Run Command | $0.01 per action (billed per execution) |
| Parameter Store | Free (Standard tier) |
| State Manager | $0.005 per association per month |

**My Lab Cost:**
- 6 managed nodes
- 1 Patch Association execution
- 1 Patch Baseline
- **Total cost: $0.00 (within Free Tier)**

---

## Next Learning Goals

| Topic | Why It's Important |
|-------|---------------------|
| Maintenance Windows | Automating patch schedules |
| Parameter Store | Centralizing secrets and configuration |
| Systems Manager Documents | Creating custom automation runbooks |
| Amazon EventBridge | Integrating Systems Manager state changes |
| AWS Config | Recording and evaluating resource compliance |

---

## Resources Used

- AWS Free Tier account (us-west-2 / Oregon)
- AWS Systems Manager console
- 6 EC2 Instances (Windows & Linux)
- EC2 Resource Tagging
- Patch Baselines

---

## Final Reflection

This lab transformed my understanding of automated operations and patch management in AWS. I learned that:

**Automation is critical at scale** – Patching a single server is easy, but managing security updates across an entire fleet requires centralized tools like Patch Manager.

**Tags drive automation** – By tagging instances with `Patch Group: windowsProd`, I could easily target specific groups for patching without manually selecting instances each time.

**Visibility is key** – The Compliance Dashboard and Fleet Manager give immediate insight into the health and security status of all managed nodes.

**Execution monitoring matters** – Reading the execution output confirms that operations completed successfully, and troubleshooting errors is easier with detailed logs.

**Security is a continuous process** – Patch baselines ensure that updates are applied consistently, and the 3-day auto-approval window balances security with stability.

---

## Lab Status: ✅ COMPLETED

**Environment:** AWS us-west-2 (Oregon)

**Account ID:** 8222-2299-6899

**Managed Nodes:** 6

**Patch Baseline:** WindowsServerSecurityUpdates

**Patch Group Created:** windowsProd

**Operation Executed:** Scan and Install (Success)

**Compliance Status:** 50% Compliant

---

# 🌐 AWS VPC: Networking in the Cloud

**Date Completed:** April 29, 2026

**Time Spent:** 2 hours

**Service:** Amazon VPC (Virtual Private Cloud)

---

## What I Learned

### 1. What Amazon VPC Is

Amazon VPC (Virtual Private Cloud) is a service that lets you provision a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define.

**Think of it as your own private data centre in the cloud.**

**Key Concepts:**
- VPC is regional (spans multiple Availability Zones)
- You control IP ranges, subnets, route tables, and gateways
- Resources in VPC are isolated from other AWS accounts by default

**Common Uses of VPC:**
- Hosting web applications with public-facing web servers
- Running databases in private subnets with no internet access
- Creating hybrid cloud connections (VPN + Direct Connect)
- Isolating development, test, and production environments
- Multi-tier application architecture (web, app, database layers)

---

### 2. Navigating the AWS Management Console for VPC

I learned how to navigate the AWS Console and access VPC services.

**Areas Explored:**
- VPC Dashboard
- Your VPCs
- Subnets
- Route Tables
- Internet Gateways
- NAT Gateways
- Security Groups
- Network ACLs

**Skills Gained:**
- Navigating AWS regions for VPC resources
- Understanding VPC organisation and naming
- Managing network resources from the console

---

### 3. Creating a VPC

I learned the step-by-step process of creating a VPC from scratch.

**VPC Configuration I Used:**

| Setting | My Value |
|---------|----------|
| VPC Name | `network-concepts/VPC` |
| CIDR Block | `10.10.0.0/16` |
| Tenancy | Default |
| IPv6 | Not enabled (optional) |

**What is CIDR Block?**

CIDR (Classless Inter-Domain Routing) defines the IP address range for your VPC.

| CIDR | Number of IPs | Common Use |
|------|---------------|------------|
| 10.0.0.0/16 | 65,536 | Large VPC (production) |
| 10.0.0.0/20 | 4,096 | Medium VPC |
| 10.0.0.0/24 | 256 | Small VPC (lab/testing) |

**My VPC Details from Lab:**

```
VPC ID: vpc-09a232052983a2a18
CIDR: 10.10.0.0/16
Total IPs: 65,536
Region: us-east-1 (N. Virginia)
```

---

### 4. Creating Subnets

I learned how to divide a VPC into smaller networks called subnets.

**What is a Subnet?**
A subnet (sub-network) is a smaller range of IP addresses within your VPC. Resources launched into a subnet inherit its network configuration.

**Subnet Types:**

| Type | Has Internet Gateway Route | Use Case |
|------|---------------------------|----------|
| **Public Subnet** | Yes | Web servers, load balancers, bastion hosts |
| **Private Subnet** | No | Databases, application servers, internal resources |

**Subnet Configuration I Used:**

| Setting | My Value |
|---------|----------|
| Subnet Name | `WebServerSubnet` |
| VPC | `vpc-09a232052983a2a18` |
| CIDR Block | `10.10.0.0/24` |
| Availability Zone | `us-east-1a` |
| Auto-assign public IP | Enabled |

**Subnet CIDR Math:**

| Subnet CIDR | IP Range | Usable IPs |
|-------------|----------|------------|
| 10.10.0.0/24 | 10.10.0.0 - 10.10.0.255 | 251 (AWS reserves 5) |
| 10.10.1.0/24 | 10.10.1.0 - 10.10.1.255 | 251 |
| 10.10.2.0/24 | 10.10.2.0 - 10.10.2.255 | 251 |

**AWS Reserved IPs (per subnet):**
- First IP: Network address (10.10.0.0)
- Second IP: VPC router (10.10.0.1)
- Third IP: DNS server (10.10.0.2)
- Fourth IP: Reserved (10.10.0.3)
- Last IP: Broadcast (10.10.0.255)

---

### 5. Creating Internet Gateway (IGW)

I learned how to create and attach an Internet Gateway to allow internet access.

**What is an Internet Gateway?**
An Internet Gateway is a horizontally scaled, redundant, and highly available VPC component that allows communication between your VPC and the internet.

**Internet Gateway Configuration:**

| Setting | My Value |
|---------|----------|
| Name | `igw-0ccce6db770d0c...` |
| Attachment | `vpc-09a232052983a2a18` |

**Key Understanding:**
- IGW is attached to the VPC, not to individual instances
- One IGW per VPC (can attach/detach)
- IGW has no security rules – all security is handled by route tables and security groups
- Instances need a public IP to use the IGW

---

### 6. Understanding Route Tables

I learned how route tables control traffic flow within a VPC.

**What is a Route Table?**
A route table contains a set of rules (routes) that determine where network traffic from your subnet or gateway is directed.

**Route Table Components:**

| Component | Purpose |
|-----------|---------|
| **Destination** | Where traffic is trying to go (IP range) |
| **Target** | Where to send the traffic (IGW, NAT, VPC peering) |
| **Local route** | Automatically added for VPC CIDR communication |
| **Route priority** | Most specific route wins (longest prefix match) |

**Route Table Configuration I Used:**

| Destination | Target | Purpose |
|-------------|--------|---------|
| `10.10.0.0/16` | `local` | Keep traffic inside VPC |
| `0.0.0.0/0` | `igw-0ccce6db770d0c...` | Send internet traffic to IGW |

**Route Table Details from Lab:**

```
Route Table ID: rtb-0e14f1e68e76ee217
Main route table: No
VPC: vpc-09a232052983a2a18
Routes: 2 (local + IGW)
Subnet association: WebServerSubnet
```

**Key Understanding:**
- Every subnet must be associated with a route table
- If no custom route table is associated, subnet uses the main route table
- Adding a route to `0.0.0.0/0` makes a subnet PUBLIC
- Private subnets have no `0.0.0.0/0` route (or route to NAT Gateway)

---

### 7. Understanding NAT Gateway

I learned how NAT Gateways allow private subnets to access the internet.

**What is a NAT Gateway?**
NAT (Network Address Translation) Gateway allows instances in a private subnet to initiate outbound traffic to the internet while preventing the internet from initiating connections to those instances.

**NAT Gateway Configuration from Lab:**

| Setting | My Value |
|---------|----------|
| NAT Gateway ID | `nat-0e12c6d0d8f69...` |
| Route Target | `nat-0e12c6d0d8f69...` |
| Route Destination | `0.0.0.0/0` |

**Public vs Private Subnet Routes:**

| Route Target | Subnet Type | Internet Access |
|--------------|-------------|-----------------|
| `igw-xxxxx` | Public | ✅ Two-way (inbound + outbound) |
| `nat-xxxxx` | Private | ✅ Outbound only |
| (no route) | Private | ❌ No internet access |

**Why Private Subnets Can't Have IGW:**
- Security - databases and internal servers shouldn't be publicly accessible
- Compliance - some workloads require no internet access
- Attack surface - reduces potential entry points

---

### 8. Launching EC2 Instances in Public and Private Subnets

I learned how to launch EC2 instances in different subnet types.

**Web Server (Public Subnet):**

| Setting | My Value |
|---------|----------|
| Name | `Web Server` |
| Instance ID | `i-086802585d4e8a07f` |
| Instance Type | `t3.small` |
| Subnet | `WebServerSubnet` (Public) |
| Availability Zone | `us-east-1a` |
| Public IP | Yes |
| Status Check | 3/3 passed |

**DB Server (Private Subnet):**

| Setting | My Value |
|---------|----------|
| Name | `DB Server` |
| Instance ID | `i-0fb6e14174262255f` |
| Instance Type | `t3.small` |
| Subnet | Private subnet |
| Public IP | No |
| Status Check | 3/3 passed |

**Why DB Server Has No Public IP:**
- Databases should never be directly accessible from the internet
- Only the web server (public) should communicate with the database
- Reduces attack surface and improves security posture
- Complies with security best practices (defence in depth)

---

### 9. Understanding Security Groups

I learned how security groups act as virtual firewalls for EC2 instances.

**What is a Security Group?**
A security group acts as a virtual firewall for your EC2 instances to control inbound and outbound traffic.

**Security Group Configuration I Used:**

**Web Server Security Group:**

| Rule Type | Protocol | Port | Source | Purpose |
|-----------|----------|------|--------|---------|
| Inbound | HTTP (TCP) | 80 | 0.0.0.0/0 | Allow web traffic from anywhere |
| Inbound | SSH (TCP) | 22 | Your IP | Allow SSH access |
| Outbound | All traffic | All | 0.0.0.0/0 | Allow all outbound |

**DB Server Security Group:**

| Rule Type | Protocol | Port | Source | Purpose |
|-----------|----------|------|--------|---------|
| Inbound | MySQL/Aurora (TCP) | 3306 | Web Server SG | Only allow web server to connect |
| Outbound | All traffic | All | 0.0.0.0/0 | Allow all outbound |

**Security Group Rules from Lab:**

| Security Group ID | Name | Inbound Rules | Outbound Rules |
|-------------------|------|---------------|----------------|
| `sg-06ecc8064bd4cba8f` | WebServerSecurityGroup | 1 (HTTP) | 2 (All traffic + MySQL) |

**Key Security Group Principles:**

| Concept | Explanation |
|---------|-------------|
| **Stateful** | If you allow inbound, outbound is auto-allowed (and vice versa) |
| **Allow only** | Security groups cannot DENY traffic (use NACLs for denies) |
| **Instance-level** | Applied to individual ENIs, not entire subnets |
| **Order doesn't matter** | All rules are evaluated before allowing traffic |
| **Default deny** | If no rule matches, traffic is denied |

**Security Group vs Network ACL:**

| Feature | Security Group | Network ACL |
|---------|----------------|-------------|
| Level | Instance (ENI) | Subnet |
| State | Stateful | Stateless |
| Rules | Allow only | Allow + Deny |
| Order | All rules evaluated | Order matters (lowest number first) |

---

### 10. Connecting Web Server to Database

I learned how to configure security groups so the web server can talk to the database.

**The Pattern:**

```
Internet → Web Server (Public) → DB Server (Private)
                │                        │
                │ (Port 3306)            │
                └────────────────────────┘
```

**How It Works:**

| Direction | Source | Destination | Port | Why |
|-----------|--------|-------------|------|-----|
| Web → DB | Web Server SG | DB Server SG | 3306 | Web server queries database |
| Internet → Web | 0.0.0.0/0 | Web Server SG | 80 | Users access website |
| Admin → Web | Your IP | Web Server SG | 22 | Secure SSH access |

**Security Group Reference (Best Practice):**

Instead of allowing all IPs to access the database, I used:

```
Source: sg-06ecc8064bd4cba8f (Web Server SG)
Port: 3306 (MySQL)
```

This means ONLY the web server can talk to the database – no other instances or IPs.

---

### 11. Troubleshooting Connection Issues

I encountered a **connection timeout** error and learned how to fix it.

**Error Screen:**
```
The connection has timed out
The server at 32.195.7.34 is taking too long to respond.
```

**Common Causes and Solutions:**

| Problem | How to Fix |
|---------|------------|
| Security group blocks HTTP (port 80) | Add inbound rule for HTTP |
| No public IP assigned | Enable auto-assign public IP or attach Elastic IP |
| Route table missing IGW route | Add `0.0.0.0/0` → `igw-xxxxx` |
| Instance not running | Start the instance |
| Wrong DNS/IP address | Check public IP in EC2 console |
| Instance has stopped/stale state | Terminate and relaunch |

**My Fix:**
I checked the route table and confirmed the IGW route was present (`0.0.0.0/0 → igw-0ccce6db770d0c...`). I also verified the security group had HTTP (port 80) inbound allowed from `0.0.0.0/0`.

---

### 12. Understanding Connection Timeout vs Connection Refused

**Connection Timeout:**
- Network-level issue
- Traffic cannot reach the instance
- Often caused by: wrong IP, security group blocking, instance not running, route missing

**Connection Refused:**
- Application-level issue
- Traffic reached the instance but nothing is listening on the port
- Often caused by: service not running, wrong port number

**How to Test:**

```bash
# Test if HTTP port is reachable
curl -v http://<public-ip>

# Test if SSH port is reachable
nc -zv <public-ip> 22

# Check if instance is responding to ping (ICMP)
ping <public-ip>
```

---

### 13. Architecture Overview (From Lab)

**The Complete Setup:**

```
                    ┌─────────────────────────────────────────────┐
                    │              AWS Cloud - us-east-1           │
                    │  ┌─────────────────────────────────────┐    │
                    │  │              VPC                      │    │
                    │  │         10.10.0.0/16                 │    │
                    │  │  ┌─────────────────────────────┐    │    │
                    │  │  │   Route Table: rtb-xxxx      │    │    │
                    │  │  │   10.10.0.0/16 → local        │    │    │
                    │  │  │   0.0.0.0/0 → IGW             │    │    │
                    │  │  └─────────────────────────────┘    │    │
                    │  │                                      │    │
Internet ── IGW ────┼──▶  ┌─────────────────────┐           │    │
                    │     │   Public Subnet       │           │    │
                    │     │   10.10.0.0/24        │           │    │
                    │     │   us-east-1a          │           │    │
                    │     │  ┌─────────────────┐  │           │    │
                    │     │  │   Web Server     │  │           │    │
                    │     │  │   t3.small       │  │           │    │
                    │     │  │   Port 80 (HTTP) │  │           │    │
                    │     │  └────────┬────────┘  │           │    │
                    │     └───────────┼───────────┘           │    │
                    │                 │ (Port 3306)            │    │
                    │     ┌───────────┼───────────┐           │    │
                    │     │   Private Subnet       │           │    │
                    │     │   (CIDR range)         │           │    │
                    │     │   us-east-1a           │           │    │
                    │     │  ┌─────────┴────────┐  │           │    │
                    │     │  │    DB Server      │  │           │    │
                    │     │  │    t3.small       │  │           │    │
                    │     │  │    Port 3306      │  │           │    │
                    │     │  │    (MySQL)        │  │           │    │
                    │     │  └──────────────────┘  │           │    │
                    │     └─────────────────────────┘           │    │
                    └─────────────────────────────────────────────┘
```

---

## Skills Summary

**Skills I Gained from This Lab:**

| Category | Skills |
|----------|--------|
| **VPC** | Creating VPCs, CIDR planning, understanding IP ranges |
| **Subnets** | Public vs private subnets, CIDR math, AZ placement |
| **Routing** | Route tables, IGW routes, NAT routes, local routes |
| **Internet Gateway** | Creating IGW, attaching to VPC, understanding purpose |
| **NAT Gateway** | Creating NAT, private subnet internet access (outbound only) |
| **Security Groups** | Inbound/outbound rules, stateful vs stateless, referencing SGs |
| **EC2 Networking** | Launching in public/private subnets, public IP assignment |
| **Troubleshooting** | Connection timeout vs connection refused, diagnosing issues |

---

## Why VPC Matters for Cloud Practitioner Exam

**Exam Topics Covered:**

| Exam Domain | What I Learned |
|-------------|----------------|
| VPC | Isolated network in AWS, regional service |
| Subnets | Public vs private, CIDR blocks, AZ placement |
| Route Tables | Control traffic flow, priority rules, IGW vs NAT |
| Internet Gateway | Enables internet access for public subnets |
| NAT Gateway | Outbound-only internet for private subnets |
| Security Groups | Instance-level firewall, stateful, allow only |
| Network ACLs | Subnet-level firewall, stateless, allow + deny |

**VPC Facts to Memorise for Exam:**

| Fact | Value |
|------|-------|
| VPC is regional | Spans all AZs in the region |
| Subnet is AZ-specific | Cannot span multiple AZs |
| Default VPC CIDR | 172.31.0.0/16 |
| AWS reserved IPs per subnet | First 4 + last 1 (5 total) |
| One IGW per VPC | Can attach/detach but only one |
| Maximum VPC size | /16 (65,536 IPs) |
| Minimum VPC size | /28 (16 IPs) |
| Security groups are stateful | Return traffic auto-allowed |
| NACLs are stateless | Need both inbound and outbound rules |

---

## Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| Connection timeout | HTTP port blocked in SG or missing IGW route | Add inbound HTTP rule; verify route table |
| Connection refused | Service not running (web server) | Install Apache/Nginx; start service |
| No public IP | Auto-assign disabled | Create new instance with auto-assign enabled |
| Subnet association missing | No route table attached | Associate subnet with route table |
| IGW not attached | IGW exists but not attached | Attach IGW to VPC |
| Wrong CIDR | Overlapping with other VPCs | Choose non-overlapping CIDR block |
| No internet in private subnet | Missing NAT Gateway or route | Add NAT Gateway + route |

---

## Cost Analysis

**VPC Costs:**
- VPC itself: FREE
- Subnets: FREE
- Route tables: FREE
- Internet Gateway: FREE
- NAT Gateway: ~$0.045/hour ($32.40/month) – not used in basic lab

**EC2 Costs (My Lab):**

| Instance | Type | Monthly Cost (on-demand) |
|----------|------|--------------------------|
| Web Server | t3.small | ~$15-20 |
| DB Server | t3.small | ~$15-20 |

**Note:** Lab environment provided temporary AWS accounts with limited resources.

---

## Final Reflection

This lab transformed my understanding of AWS networking. I learned that:

**VPC is the foundation of AWS security** – Everything starts with how you design your network. Public subnets for web servers, private subnets for databases – this pattern is the gold standard for production applications.

**Route tables control everything** – Adding a single route (`0.0.0.0/0` to IGW) changes a subnet from private to public. Understanding routes is critical for both architects and security professionals.

**Security groups are your first line of defence** – The ability to reference other security groups (not just IPs) is powerful. My database security group only allows traffic from the web server security group – no IP addresses needed.

**Troubleshooting is a skill** – The connection timeout error taught me to check routing, security groups, and application status systematically. These skills translate directly to SOC work.

**Design matters for security** – A well-designed VPC isolates sensitive resources, limits attack surfaces, and makes monitoring easier. As a future SOC analyst, understanding VPC design helps me understand what "normal" looks like.

---

## Lab Status: ✅ COMPLETED

**Date:** June 6, 2026

**Environment:** AWS us-east-1 (N. Virginia)

**VPC Name:** network-concepts/VPC

**VPC ID:** vpc-09a232052983a2a18

**CIDR:** 10.10.0.0/16

**Web Server Instance ID:** i-086802585d4e8a07f

**DB Server Instance ID:** i-0fb6e14174262255f

**Route Table ID:** rtb-0e14f1e68e76ee217

**Internet Gateway ID:** igw-0ccce6db770d0c...

---

## Next Learning Goals

| Topic | Why It's Important |
|-------|---------------------|
| VPC Peering | Connect multiple VPCs for resource sharing |
| Transit Gateway | Central hub for VPC-to-VPC and on-premise connectivity |
| VPN Connections | Hybrid cloud architecture (on-premise to AWS) |
| Direct Connect | Dedicated private connection to AWS |
| VPC Flow Logs | Monitor and troubleshoot network traffic (SOC critical) |
| Network ACLs | Stateless subnet-level firewall rules |
| Endpoint Services | Private connection to AWS services without IGW |
| IPv6 in VPC | Dual-stack networking for modern applications |

---

**Lab completed as part of AWS re/Start programme under Praesignis.**
```

---

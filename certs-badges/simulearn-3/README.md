# Simulearn 3 – Networking Concepts

**Status:**  Completed
**Started:** June 01, 2026
**Completed:** June 02, 2026

## Certificate

**AWS SimuLearn Certificate**

![AWS SimuLearn: Networking Concepts completion certificate](Owen.pdf)

**Awarded to:** Owen Lethabo

**Date Completed:** June 02, 2026

| Status | Started | Completed |
|--------|---------|-----------|
|  Completed | June 2026 | June 02, 2026 |

## Topics Covered

| Topic | What I Learned |
|-------|----------------|
| Virtual Private Cloud (VPC) | Logically isolated network in AWS |
| Public Subnets | Subnets with route to Internet Gateway (10.10.0.0/24) |
| Private Subnets | Subnets without Internet Gateway access (10.10.2.0/24) |
| Internet Gateway | Enables internet access for public subnets |
| Route Tables | Control traffic flow between subnets and internet |
| Security Groups | Stateful firewalls controlling inbound/outbound traffic |
| Inbound Rules | Control incoming traffic (HTTP port 80, MySQL port 3306) |
| Outbound Rules | Control outgoing traffic from instances |
| MySQL/Aurora Port 3306 | Database port requiring explicit security group rules |
| Connection Validation | Testing cross-subnet connectivity on specific ports |
| 0.0.0.0/0 CIDR | Allows all IP addresses (not recommended for production) |

## Key Takeaways

| Takeaway | Why It Matters |
|----------|----------------|
| Security groups are stateful | Inbound allow automatically permits return outbound traffic |
| Port 3306 must be explicitly allowed | DB server needs inbound rule from web server subnet |
| Restrict source CIDRs | Use specific subnets (10.10.0.0/24) instead of 0.0.0.0/0 |
| Route tables determine subnet type | Public subnets have IGW route, private subnets do not |
| Connection timeout = missing rule | Typically indicates security group or route table issue |
| Validation server tests connectivity | Automatically verifies web→db on port 3306 |
| Web server needs outbound to DB | Outbound rule on port 3306 to DB subnet |
| DB server needs inbound from web | Inbound rule on port 3306 from web subnet |
| HTTP port 80 | Allows web traffic from internet (0.0.0.0/0) |
| Multi-tier security | Separate security groups for web and database tiers |

## What I Did in This Simulearn

- Created a VPC with CIDR block 10.10.0.0/16
- Created public subnet (10.10.0.0/24) for web server
- Created private subnet (10.10.2.0/24) for database server
- Attached Internet Gateway to VPC
- Configured public route table with 0.0.0.0/0 → IGW
- Associated public route table with web server subnet
- Configured Web Server Security Group inbound rule: HTTP port 80 from 0.0.0.0/0
- Configured DB Server Security Group inbound rule: MySQL port 3306 from web subnet (10.10.0.0/24)
- Configured Web Server Security Group outbound rule: MySQL port 3306 to DB subnet (10.10.2.0/24)
- Verified connectivity between web server and database server
- Troubleshot connection timeout errors by adjusting security group rules

## Security Group Rules I Configured

| Security Group | Type | Protocol | Port | Source/Destination |
|----------------|------|----------|------|---------------------|
| WebServerSecurityGroup | HTTP | TCP | 80 | 0.0.0.0/0 |
| WebServerSecurityGroup | MySQL/Aurora (Outbound) | TCP | 3306 | 10.10.2.0/24 (DB subnet) |
| DBServerSecurityGroup | MySQL/Aurora (Inbound) | TCP | 3306 | 10.10.0.0/24 (Web subnet) |

## Route Table Configuration

| Destination | Target | Status | Purpose |
|-------------|--------|--------|---------|
| 10.10.0.0/16 | local | Active | Internal VPC routing |
| 0.0.0.0/0 | igw-0b13fa1473373ea51 | Active | Internet access for public subnet |

## Resources

- [AWS VPC Documentation](https://docs.aws.amazon.com/vpc/)
- [Security Groups for EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html)
- [Route Tables Guide](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html)
- [AWS SimuLearn: Networking Concepts](https://aws.amazon.com/training/simulearn/)
- [Troubleshooting Connection Timeouts](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/TroubleshootingInstancesConnecting.html)
- [VPC Subnet Calculations](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html)

## Commands I Used (Reference)

```bash
# Verify security group rules (AWS CLI)
aws ec2 describe-security-groups --group-ids sg-099a7817b4e1b6ece

# Test connectivity from web server (would run on web EC2)
telnet 10.10.2.10 3306

# Check route table associations
aws ec2 describe-route-tables --route-table-ids rtb-0e07bee7158ed107d

# View instances in each subnet
aws ec2 describe-instances --filters "Name=vpc-id,Values=vpc-00a4c61dd6723a268"# AWS SimuLearn: Networking Concepts

**Status:**  Completed  
**Started:** June 01, 2026  
**Completed:** June 02, 2026

---

## Topics Covered

- Virtual Private Cloud (VPC) architecture and components
- Public and private subnet configuration (10.10.0.0/24 and 10.10.2.0/24)
- Internet Gateway attachment and management
- Route table configuration for public subnet traffic (0.0.0.0/0 → IGW)
- Security group inbound rules for HTTP (port 80) and MySQL (port 3306)
- Security group outbound rules for database connectivity
- Connectivity validation between web server and database server
- Restricting access to known IP addresses vs. open access (0.0.0.0/0)

---

## Key Takeaways

- **Security groups are stateful** — allowing inbound traffic automatically allows return outbound traffic.
- **Port 3306 (MySQL/Aurora)** must be explicitly allowed in the DB server's inbound rules for web server connectivity.
- **Source restrictions** should use specific subnet CIDRs (e.g., 10.10.0.0/24) instead of 0.0.0.0/0 whenever possible.
- **Route tables** determine whether a subnet is public (has route to Internet Gateway) or private.
- **Connection timeout errors** typically indicate missing security group rules, incorrect route tables, or network ACL misconfigurations.
- **Validation servers** can test cross-subnet connectivity on specific ports to verify security group rules.
- The **web server security group** needs outbound access to the DB server on port 3306.
- The **DB server security group** needs inbound access from the web server subnet on port 3306.

---

## Resources

- [AWS VPC Documentation](https://docs.aws.amazon.com/vpc/)
- [Security Groups for EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html)
- [Route Tables Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html)
- [AWS SimuLearn: Networking Concepts](https://aws.amazon.com/training/simulearn/)
- [Troubleshooting Connection Timeouts](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/TroubleshootingInstancesConnecting.html)

---

## Certificate

**Awarded to:** Owen Lethabo  
**Date:** June 02, 2026  
**Issued by:** Michelle Vaz, Director, AWS Training & Certification

![AWS Training & Certification Completion Certificate](certificate.png)

---

## Repository Quick Reference

```bash
# Clone the repository
git clone https://github.com/your-org/cloud-security-automation.git
cd cloud-security-automation

# Set up environment
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Validate web-to-db connectivity
python scripts/validate.py --web-subnet 10.10.0.0/24 --db-subnet 10.10.2.0/24 --port 3306

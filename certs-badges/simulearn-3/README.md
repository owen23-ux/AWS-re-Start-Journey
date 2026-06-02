# AWS SimuLearn: Networking Concepts

**Status:** ✅ Completed  
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

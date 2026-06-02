# Cloud Security Automation

## Project Description

Cloud Security Automation is a production-grade infrastructure security management tool that automates the configuration and validation of AWS security group rules, route tables, and network connectivity. The application ensures secure communication between web servers and database servers by managing inbound/outbound rules and verifying network paths.

## Core Features

- Automated security group rule management for MySQL (port 3306) and HTTP (port 80)
- Route table configuration for public and private subnets
- Internet gateway attachment and management
- Automated connectivity validation between web and database servers
- Security group rule audit and compliance checking
- Multi-subnet VPC configuration support (10.10.0.0/24 and 10.10.2.0/24)

## Tech Stack

- **Python 3.11+** - Core programming language
- **Boto3** - AWS SDK for Python
- **Pytest** - Testing framework
- **GitHub Actions** - CI/CD pipeline
- **Docker** - Containerization
- **YAML** - Configuration management
- **AWS Services**: EC2, VPC, Security Groups, Route Tables

## Local Installation

### Prerequisites

```bash
# Install Python 3.11+
python --version

# Install AWS CLI
aws --version

# Configure AWS credentials
aws configure

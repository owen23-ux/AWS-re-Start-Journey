# AWS KMS & Encryption CLI Lab - Data Protection

## Lab Overview

In this lab, I explored AWS Key Management Service (KMS) and used the AWS Encryption SDK CLI to encrypt and decrypt data files. I created a KMS key, configured the AWS CLI with temporary credentials, installed the encryption SDK, and performed encryption operations on a file server.

**Date Completed:** August 2026

**Author:** Owen Maake – AWS re/Start Participant | Aspiring SOC Analyst

---

## Certificate

![Certificate](Owen.pdf)

*Figure 1: AWS SimuLearn completion certificate*

**Awarded to:** Owen Lethabo

---

## Lab Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              AWS Cloud                                     │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      AWS KMS                                        │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │                    Customer Managed Key                      │   │   │
│  │  │                  Alias: MyKMSKey                            │   │   │
│  │  │         Description: Key to encrypt and decrypt data files  │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        EC2 Instance                                 │   │
│  │               i-007d293ff61cf739d (File Server)                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │                 AWS CLI + Encryption SDK                     │   │   │
│  │  │  ┌─────────────────────────────────────────────────────────┐ │   │   │
│  │  │  │  AWS CLI Configured with temporary credentials         │ │   │   │
│  │  │  │  aws-encryption-sdk-cli installed via pip3             │ │   │   │
│  │  │  │  Encrypt/Decrypt operations performed                  │ │   │   │
│  │  │  └─────────────────────────────────────────────────────────┘ │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Step 1: Create a KMS Key

![KMS Console](kms-1.png)

*Figure 2: AWS KMS console*

### Create Customer Managed Key

![Create Key](creating-key-2.png)

*Figure 3: Creating a KMS key with alias and description*

| Field | Value |
|-------|-------|
| **Alias** | `MyKMSKey` |
| **Description** | `Key used to encrypt and decrypt data files` |

**Key Details:**
- **Type:** Customer Managed Key (CMK)
- **Origin:** AWS_KMS
- **Usage:** Encrypt/Decrypt

---

## Step 2: Connect to File Server

![Instance Connection](instance-3.png)

*Figure 4: Connecting to the File Server EC2 instance*

| Field | Value |
|-------|-------|
| **Instance ID** | `i-007d293ff61cf739d (File Server)` |
| **VPC ID** | `vpc-0df60e795f8e7e441` |
| **Security Group** | `sg-087586af406987b2f` |
| **IAM Role** | `c208432a5296593154684991tW8918751` |

---

## Step 3: Configure AWS CLI

![AWS CLI Configuration](ccli-4.png)

*Figure 5: Configuring AWS CLI with temporary credentials*

### CLI Configuration Steps:

```bash
# Configure AWS CLI
aws configure
AWS Access Key ID: ASIA47J7GP5K5Q247K
AWS Secret Access Key: 0khj9XWwA6NNZPePR7Rh5WpYCVOWTZe2MQQs2JC
Default region name: us-west-2
Default output format: json

# Set session token (optional)
aws configure set session_token IQQb3JpzL21uX2VjEAUcXVZLxd1c3QtMiJIMEYCIQFAPMuV5oqtSx6446j5GLv6CMi5jXmuRnHM3u/OPV98gIhAJt/Er+AnucbwMBU920M1Z0P9fJZpna6...
```

**Authentication Details:**

| Credential | Purpose |
|------------|---------|
| **Access Key ID** | Identifies the IAM user or role |
| **Secret Access Key** | Authenticates the API request |
| **Session Token** | Temporary security token for session-based authentication |

---

## Step 4: Install AWS Encryption SDK

![Installation](cli-5.png)

*Figure 6: Installing aws-encryption-sdk-cli*

```bash
# Install the AWS Encryption SDK CLI
pip3 install aws-encryption-sdk-cli

# Installation output
Collecting aws-encryption-sdk-cli
  Downloading aws_encryption_sdk_cli-4.3.0-py2.py3-none-any.whl (44 kB)
Requirement already satisfied: setuptools in /usr/lib/python3.7/site-packages

Collecting attrs>=17.1.0
  Downloading attrs-24.2.0-py3-none-any.whl (63 kB)

Collecting base64io>=1.0.1
  Downloading base64io-1.0.3-py2.py3-none-any.whl (17 kB)

Collecting aws-encryption-sdk~=3.1
  Downloading aws_encryption_sdk-3.1.1-py2.py3-none-any.whl (90 kB)

Collecting importlib-metadata; python_version < "3.8"
  Downloading importlib_metadata-6.7.0-py3-none-any.whl (22 kB)

Collecting cryptography>=3.4.6
  Downloading cryptography-45.0.7-cp37-abi3-manylinux2014_x86_64.whl (4.4 MB)

Collecting boto3>=1.10.0
  Downloading boto3-1.33.13-py3-none-any.whl (139 kB)

Collecting wrapt>=1.10.11
  Downloading wrapt-1.16.0-cp37-cp37m-manylinux_2_5_x86_64.whl (77 kB)
```

**Dependencies Installed:**

| Package | Version | Purpose |
|---------|---------|---------|
| `aws-encryption-sdk-cli` | 4.3.0 | CLI for encryption operations |
| `aws-encryption-sdk` | 3.1.1 | Python SDK for encryption |
| `cryptography` | 45.0.7 | Cryptographic primitives |
| `boto3` | 1.33.13 | AWS SDK for Python |
| `attrs` | 24.2.0 | Data validation |
| `wrapt` | 1.16.0 | Function wrapping |
| `importlib-metadata` | 6.7.0 | Metadata support for Python 3.7 |

---

## Step 5: Encrypt and Decrypt Data

### Using AWS Encryption SDK CLI

```bash
# Encrypt a file using the KMS key
aws-encryption-cli --encrypt \
  --input testfile.txt \
  --output testfile.encrypted \
  --wrapping-keys key-id=MyKMSKey

# Decrypt the file
aws-encryption-cli --decrypt \
  --input testfile.encrypted \
  --output testfile.decrypted \
  --wrapping-keys key-id=MyKMSKey

# Verify decrypted content matches original
diff testfile.txt testfile.decrypted
```

---

## What I Learned

| Concept | What I Learned |
|---------|----------------|
| **AWS KMS** | Creating and managing Customer Managed Keys (CMK) |
| **Key Aliases** | Friendly names for KMS keys to simplify reference |
| **AWS CLI Configuration** | Configuring access keys and temporary session tokens |
| **AWS Encryption SDK** | Using the SDK CLI to encrypt and decrypt data |
| **Dependency Management** | Installing Python packages via pip3 |
| **Temporary Credentials** | Using session tokens for secure access |
| **Security Best Practices** | Keys should have clear descriptions and proper aliases |

---

## KMS Key Configuration

| Setting | Value |
|---------|-------|
| **Key Type** | Customer Managed Key (CMK) |
| **Alias** | `MyKMSKey` |
| **Description** | `Key used to encrypt and decrypt data files` |
| **Origin** | AWS_KMS |
| **Key State** | Enabled |

---

## Skills Summary

| Skill | How I Developed It |
|-------|-------------------|
| **Key Management** | Created and managed KMS keys |
| **AWS CLI** | Configured credentials and session tokens |
| **Encryption SDK** | Installed and used CLI tools for encryption |
| **File Operations** | Encrypted and decrypted data files |
| **Security Awareness** | Learned about secure key management |

---

## Real-World Application for SOC

As a SOC analyst, understanding encryption services like AWS KMS helps me:

| Skill | Application |
|-------|-------------|
| **Investigate Security Incidents** | Understand which keys protect sensitive data |
| **Audit Access** | Review KMS key usage and permissions |
| **Detect Misconfigurations** | Identify over-permissive key policies |
| **Respond to Incidents** | Understand encryption controls during an investigation |

---

## Security Best Practices

| Practice | Why It Matters |
|----------|----------------|
| **Use Customer Managed Keys** | Complete control over key rotation and policies |
| **Enable Key Rotation** | Reduce impact of key compromise |
| **Least Privilege Access** | Only grant necessary KMS permissions |
| **Monitor Key Usage** | Detect unauthorized encryption/decryption attempts |
| **Use Key Aliases** | Simplify key identification |
| **Store Credentials Securely** | Never hardcode access keys in code |

---

## Commands Used

```bash
# Configure AWS CLI
aws configure
aws configure set session_token [TOKEN]

# Install AWS Encryption SDK
pip3 install aws-encryption-sdk-cli

# Encrypt file
aws-encryption-cli --encrypt --input [file] --output [file.encrypted] --wrapping-keys key-id=MyKMSKey

# Decrypt file
aws-encryption-cli --decrypt --input [file.encrypted] --output [file.decrypted] --wrapping-keys key-id=MyKMSKey

# View KMS keys
aws kms list-keys

# Get key details
aws kms describe-key --key-id MyKMSKey

# List aliases
aws kms list-aliases
```

---

## Resources

| Resource | Link |
|----------|------|
| AWS KMS Documentation | [docs.aws.amazon.com/kms](https://docs.aws.amazon.com/kms) |
| AWS Encryption SDK | [docs.aws.amazon.com/encryption-sdk](https://docs.aws.amazon.com/encryption-sdk) |
| AWS CLI Reference | [docs.aws.amazon.com/cli](https://docs.aws.amazon.com/cli) |

---

## Connect With Me

- **GitHub:** github.com/owen23-ux
- **LinkedIn:** linkedin.com/in/owen-maake-0b715a3a3
- **Email:** owenlethabo28@gmail.com

---

**License:** MIT
```

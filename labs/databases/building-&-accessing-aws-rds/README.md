# Building and accessing RDS

## Overview

This lab reinforced the concept of leveraging an AWS-managed database instance for solving relational database needs using Amazon Relational Database Service (Amazon RDS). I created a MySQL database, connected to it from a Linux server, and performed SQL operations including creating tables, inserting data, and joining tables.

**Service:** Amazon RDS

---

## What I Did

### 1. Created an RDS Instance

I launched an Amazon RDS instance using MySQL as the database engine. I selected the Dev/Test template and used a `db.t3.micro` instance class with General Purpose SSD storage. I used the Lab VPC and configured a security group that allowed the LinuxServer to connect to the RDS instance.

**Screenshot: Engine Selection**

![Engine Selection](engine-1.png)

**Screenshot: Database Creation Method**

![Database Creation](creating-database-2.png)

---

### 2. Connected to the Linux Server

Using the provided PEM key, I connected via SSH to the LinuxServer:

```bash
ssh -i your-key.pem ec2-user@<server-address>
```

---

### 3. Installed MySQL Client

Once connected, I installed the MySQL client to interact with the RDS instance:

```bash
sudo yum install mysql -y
```

Then I connected to the database:

```bash
mysql -h <rds-endpoint> -u <username> -p
```

---

### 4. Created Table: RESTART

I created the `RESTART` table with the following columns:

- Student_ID (Number)
- Student_Name
- Restart_City
- Graduation_Date (DateTime)

```sql
CREATE TABLE RESTART (
    Student_ID INT PRIMARY KEY,
    Student_Name VARCHAR(100),
    Restart_City VARCHAR(100),
    Graduation_Date DATETIME
);
```

**Screenshot: Table RESTART created** ✅

---

### 5. Inserted 10 Rows into RESTART

```sql
INSERT INTO RESTART VALUES
(1, 'Owen Maake', 'Johannesburg', '2026-07-31 00:00:00'),
(2, 'Lerato Mokoena', 'Cape Town', '2026-07-31 00:00:00'),
(3, 'Thabo Dlamini', 'Durban', '2026-07-31 00:00:00'),
(4, 'Sipho Nkosi', 'Pretoria', '2026-07-31 00:00:00'),
(5, 'Aisha Khan', 'Johannesburg', '2026-07-31 00:00:00'),
(6, 'Johan van Dyk', 'Cape Town', '2026-07-31 00:00:00'),
(7, 'Nomsa Patel', 'Durban', '2026-07-31 00:00:00'),
(8, 'Zanele Mthembu', 'Pretoria', '2026-07-31 00:00:00'),
(9, 'Ruan Botha', 'Johannesburg', '2026-07-31 00:00:00'),
(10, 'Kgomotso Molefe', 'Cape Town', '2026-07-31 00:00:00');
```

**Screenshot: 10 rows inserted into RESTART** ✅

---

### 6. Selected All Rows from RESTART

```sql
SELECT * FROM RESTART;
```

**Screenshot: All rows from RESTART** ✅

---

### 7. Created Table: CLOUD_PRACTITIONER

```sql
CREATE TABLE CLOUD_PRACTITIONER (
    Student_ID INT PRIMARY KEY,
    Certification_Date DATETIME
);
```

**Screenshot: Table CLOUD_PRACTITIONER created** ✅

---

### 8. Inserted 5 Rows into CLOUD_PRACTITIONER

```sql
INSERT INTO CLOUD_PRACTITIONER VALUES
(1, '2026-07-15 00:00:00'),
(2, '2026-08-01 00:00:00'),
(4, '2026-07-20 00:00:00'),
(5, '2026-09-01 00:00:00'),
(9, '2026-08-15 00:00:00');
```

**Screenshot: 5 rows inserted into CLOUD_PRACTITIONER** ✅

---

### 9. Selected All Rows from CLOUD_PRACTITIONER

```sql
SELECT * FROM CLOUD_PRACTITIONER;
```

**Screenshot: All rows from CLOUD_PRACTITIONER** ✅

---

### 10. Performed an Inner Join

```sql
SELECT 
    RESTART.Student_ID,
    RESTART.Student_Name,
    CLOUD_PRACTITIONER.Certification_Date
FROM RESTART
INNER JOIN CLOUD_PRACTITIONER 
ON RESTART.Student_ID = CLOUD_PRACTITIONER.Student_ID;
```

**Output:**

| Student_ID | Student_Name | Certification_Date |
|------------|--------------|---------------------|
| 1 | Owen Maake | 2026-07-15 00:00:00 |
| 2 | Lerato Mokoena | 2026-08-01 00:00:00 |
| 4 | Sipho Nkosi | 2026-07-20 00:00:00 |
| 5 | Aisha Khan | 2026-09-01 00:00:00 |
| 9 | Ruan Botha | 2026-08-15 00:00:00 |

**Screenshot: Inner join result** ✅

---

## Summary of What I Learned

| Concept | What I Learned |
|---------|----------------|
| RDS Creation | Creating a MySQL database instance in AWS |
| Security Groups | Configuring inbound rules to allow connections |
| SSH Connections | Connecting to a Linux server using PEM keys |
| MySQL Client | Installing and using MySQL client on Linux |
| SQL Commands | CREATE, INSERT, SELECT, JOIN |
| Table Design | Creating tables with appropriate data types |
| Data Insertion | Populating tables with sample rows |
| Joins | Inner joins to combine related data |

---

## Lab Status: ✅ COMPLETED

**Date:** June 24, 2026

**Database Engine:** MySQL

**Environment:** AWS Lab VPC

---

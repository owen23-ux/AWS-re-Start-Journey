# Challenge Lab: Query the World Database

**Date Completed:** _add date_

**Service:** Amazon RDS / MariaDB

**Database:** world (pre-populated with country, city, and countrylanguage tables)

---

## Lab Overview

This lab reinforced SQL querying skills using a pre-configured MariaDB database called `world`. I connected to a Command Host instance and ran various SELECT statements to extract meaningful information from the `country`, `city`, and `countrylanguage` tables.

---

## Lab Environment

The lab provided the following pre-configured resources:

| Resource | Description |
|----------|-------------|
| **Command Host** | EC2 instance with MySQL/MariaDB client pre-installed |
| **world Database** | Pre-populated database with country, city, and countrylanguage tables |
| **IAM Role** | SSMInstanceRole for Session Manager access |

---

## What I Did

### 1. Connected to the Command Host

I used AWS Systems Manager Session Manager to connect to the Command Host instance without needing SSH keys.

![Connect via SSM](connectin-ssm-command-3.png)

*Figure 1: Connecting to Command Host using Session Manager*

| Detail | Value |
|--------|-------|
| Instance ID | `i-01617fa996ab4fda4 (Command Host)` |
| VPC ID | `vpc-0d30c5f4ee96db7bd` |
| IAM Role | `SSMInstanceRole` |
| SSM Agent Status | Online |

---

### 2. Connected to the Database

I switched to the `ec2-user` directory and connected to MariaDB:

```bash
cd /home/ec2-user
mysql -u root --password='re:St@rt!9'
```

![Sudo and MySQL Connection](sudo-su-4.png)

*Figure 2: Connecting to MariaDB as root user*

**Database Credentials:**

| Setting | Value |
|---------|-------|
| Username | `root` |
| Password | `re:St@rt!9` |
| Database | `world` |

---

### 3. Show Available Databases

```sql
SHOW DATABASES;
```

**Output:**
```
+--------------------+
| Database |
+--------------------+
| information_schema |
| mysql |
| performance_schema |
| world |
+--------------------+
```

---

## SQL Queries Performed

### Query 1: Countries with Population Between 50 and 100 Million

```sql
SELECT Name, Capital, Region, SurfaceArea, Population 
FROM world.country 
WHERE Population >= 50000000 AND Population <= 100000000;
```

![SELECT Statement 1](select-statement-6.png)

*Figure 3: Query results using >= and <= operators*

**Output (14 rows):**

| Name | Capital | Region | SurfaceArea | Population |
|------|---------|--------|-------------|------------|
| Congo, The Democratic Republic of the | 2298 | Central Africa | 2344858.00 | 51654000 |
| Germany | 3068 | Western Europe | 357022.00 | 82164700 |
| Egypt | 608 | Northern Africa | 1001449.00 | 68470000 |
| Ethiopia | 756 | Eastern Africa | 1104300.00 | 62565000 |
| France | 2974 | Western Europe | 551500.00 | 59225700 |
| United Kingdom | 456 | British Islands | 242900.00 | 59623400 |
| Iran | 1380 | Southern and Central Asia | 1648195.00 | 67702000 |
| Italy | 1464 | Southern Europe | 301316.00 | 57680000 |
| Mexico | 2515 | Central America | 1958201.00 | 98881000 |
| Philippines | 766 | Southeast Asia | 300000.00 | 75967000 |
| Thailand | 3320 | Southeast Asia | 513115.00 | 61399000 |
| Turkey | 3358 | Middle East | 774815.00 | 66591000 |
| Ukraine | 3426 | Eastern Europe | 603700.00 | 50456000 |
| Vietnam | 3770 | Southeast Asia | 331689.00 | 79832000 |

---

### Query 2: Using the BETWEEN Operator

```sql
SELECT Name, Capital, Region, SurfaceArea, Population 
FROM world.country 
WHERE Population BETWEEN 50000000 AND 100000000;
```

![SELECT Statement 2](select-statement-7.png)

*Figure 4: Query results using BETWEEN operator*

**Output:** Same 14 rows as Query 1 (BETWEEN is inclusive).

---

### Query 3: Sum of Population in European Regions

```sql
SELECT SUM(Population) 
FROM world.country 
WHERE Region LIKE "%Europe%";
```

```sql
SELECT SUM(population) AS "Europe Population Total" 
FROM world.country 
WHERE region LIKE "%Europe%";
```

![SELECT Statement 3](select-statement-8.png)

*Figure 5: Using SUM() function and AS alias*

**Output:**

| Europe Population Total |
|-------------------------|
| 634947800 |

---

### Query 4: Countries with "Central" in Their Region

```sql
SELECT Name, Capital, Region, SurfaceArea, Population 
FROM world.country 
WHERE LOWER(Region) LIKE "%central%";
```

![SELECT Statement 4](select-statement-9.png)

*Figure 6: Using LOWER() function and LIKE operator*

**Output (26 rows):**

| Name | Capital | Region | SurfaceArea | Population |
|------|---------|--------|-------------|------------|
| Afghanistan | 1 | Southern and Central Asia | 652090.00 | 22720000 |
| Angola | 56 | Central Africa | 1246700.00 | 12878000 |
| Bangladesh | 150 | Southern and Central Asia | 143998.00 | 129155000 |
| Belize | 185 | Central America | 22696.00 | 241000 |
| Bhutan | 192 | Southern and Central Asia | 47000.00 | 2124000 |
| Central African Republic | 1889 | Central Africa | 622984.00 | 3615000 |
| Cameroon | 1804 | Central Africa | 475442.00 | 15085000 |
| Congo, The Democratic Republic of the | 2298 | Central Africa | 2344858.00 | 51654000 |
| Congo | 2296 | Central Africa | 342000.00 | 2943000 |
| Costa Rica | 584 | Central America | 51100.00 | 4023000 |
| Gabon | 902 | Central Africa | 267668.00 | 1226000 |
| Equatorial Guinea | 2972 | Central Africa | 28051.00 | 453000 |
| Guatemala | 922 | Central America | 108889.00 | 11385000 |
| Honduras | 933 | Central America | 112088.00 | 6485000 |
| India | 1109 | Southern and Central Asia | 3287263.00 | 1013662000 |
| Iran | 1380 | Southern and Central Asia | 1648195.00 | 67702000 |
| Kazakstan | 1864 | Southern and Central Asia | 2724900.00 | 16223000 |
| Kyrgyzstan | 2253 | Southern and Central Asia | 199900.00 | 4699000 |
| Sri Lanka | 3217 | Southern and Central Asia | 65610.00 | 18827000 |
| Maldives | 2463 | Southern and Central Asia | 298.00 | 286000 |
| Mexico | 2515 | Central America | 1958201.00 | 98881000 |
| Nicaragua | 2734 | Central America | 130000.00 | 5074000 |
| Nepal | 2729 | Southern and Central Asia | 147181.00 | 23930000 |
| Pakistan | 2831 | Southern and Central Asia | 796095.00 | 156483000 |

*(And more...)*

---

## SQL Concepts Applied

| Concept | What I Learned |
|---------|----------------|
| **SELECT** | Retrieving specific columns from a table |
| **WHERE** | Filtering results based on conditions |
| **Comparison Operators** | `>=` and `<=` for range filtering |
| **BETWEEN** | Inclusive range filtering |
| **LIKE** | Pattern matching with `%` wildcard |
| **LOWER()** | Case-insensitive text comparison |
| **SUM()** | Aggregating numeric data |
| **AS** | Creating column aliases for readable output |
| **Fully Qualified Names** | `database.table` syntax |

---

## Commands Used

```sql
-- Show databases
SHOW DATABASES;

-- Query with comparison operators
SELECT Name, Capital, Region, SurfaceArea, Population 
FROM world.country 
WHERE Population >= 50000000 AND Population <= 100000000;

-- Query with BETWEEN
SELECT Name, Capital, Region, SurfaceArea, Population 
FROM world.country 
WHERE Population BETWEEN 50000000 AND 100000000;

-- Aggregate function with LIKE
SELECT SUM(Population) 
FROM world.country 
WHERE Region LIKE "%Europe%";

-- Aggregate with alias
SELECT SUM(population) AS "Europe Population Total" 
FROM world.country 
WHERE region LIKE "%Europe%";

-- Case-insensitive pattern matching
SELECT Name, Capital, Region, SurfaceArea, Population 
FROM world.country 
WHERE LOWER(Region) LIKE "%central%";
```

---

## What I Learned

| Skill | Description |
|-------|-------------|
| **SSM Session Manager** | Connecting to EC2 instances without SSH keys |
| **MariaDB Client** | Using the MySQL command-line client |
| **SQL Filtering** | Using WHERE clauses with multiple conditions |
| **Pattern Matching** | Using LIKE with wildcards |
| **Case Sensitivity** | Using LOWER() for case-insensitive searches |
| **Aggregation** | Using SUM() to calculate totals |
| **Aliases** | Renaming columns for readability |

---

## Lab Status

Completed. Tables used: country, city, countrylanguage. Environment: AWS Lab VPC.

---

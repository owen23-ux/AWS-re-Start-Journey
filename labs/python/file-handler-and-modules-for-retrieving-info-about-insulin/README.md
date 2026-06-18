# Insulin Molecular Weight Calculator – Python JSON Project

**Date Completed:** June 18, 2026

**Language:** Python 3

**Project Type:** Data Processing & JSON Handling

---

## Project Overview

This project calculates the molecular weight of insulin by reading amino acid sequences and their respective weights from a JSON file. It demonstrates how to:

- Read and parse JSON data in Python
- Process biological data programmatically
- Count amino acid occurrences in a protein sequence
- Calculate molecular weight using dictionary operations
- Compare calculated results with actual known values

---

## Project Files

| File | Description |
|------|-------------|
| `calc_weight_json.py` | Main Python script for molecular weight calculation |
| `insulin.json` | JSON file containing insulin sequences and amino acid weights |
| `jsonFileHandler.py` | Helper module for reading JSON files |

---

## How It Works

### 1. JSON Data Structure
The insulin.json file contains:
- `molecules`: Insulin chain sequences (bInsulin, aInsulin, lsInsulin, cInsulin)
- `weights`: Amino acid weights (single-letter code to molecular weight in g/mol)
- `molecularWeightInsulinActual`: Known actual molecular weight for comparison

### 2. Data Reading
The `jsonFileHandler.py` module reads the JSON file and returns the data as a Python dictionary.

### 3. Sequence Processing
- Extracts bInsulin and aInsulin from the JSON
- Concatenates them to form the complete insulin chain
- Counts each amino acid in the sequence using dictionary comprehension

### 4. Molecular Weight Calculation
- Multiplies each amino acid count by its weight
- Sums all values to get the total molecular weight

### 5. Percent Error Calculation
- Compares calculated weight with actual known weight
- Calculates percentage difference

---

## Functions Breakdown

| Function | Purpose |
|----------|---------|
| `readJsonFile(fileName)` | Reads and parses a JSON file, returns data as dictionary |
| `main` logic | Extracts data, counts amino acids, calculates weight, prints results |

---

## Full Code

### calc_weight_json.py

```python
import json

def readJsonFile(fileName):
    data = ""
    try:
        with open(fileName) as json_file:
            data = json.load(json_file)
    except IOError:
        print("Could not read file")
    return data

# Read the JSON file
data = readJsonFile('files/insulin.json')

if data != "":
    bInsulin = data['molecules']['bInsulin']
    aInsulin = data['molecules']['aInsulin']
    insulin = bInsulin + aInsulin
    molecularWeightInsulinActual = data['molecularWeightInsulinActual']
    
    print('bInsulin: ' + bInsulin)
    print('aInsulin: ' + aInsulin)
    print('molecularWeightInsulinActual: ' + str(molecularWeightInsulinActual))
    
    # Getting a list of the amino acid (AA) weights
    aaWeights = data['weights']
    
    # Count the number of each amino acids
    aaCountInsulin = {x: float(insulin.upper().count(x)) for x in ['A','C','D','E','F','G','H','I','K','L','M','N','P','Q','R','S','T','V','W','Y']}
    
    # Multiply the count by the weights
    molecularWeightInsulin = sum({x: (aaCountInsulin[x] * aaWeights[x]) for x in ['A','C','D','E','F','G','H','I','K','L','M','N','P','Q','R','S','T','V','W','Y']}.values())
    
    print("The rough molecular weight of insulin: " + str(molecularWeightInsulin))
    print("Percent error: " + str(((molecularWeightInsulin - molecularWeightInsulinActual) / molecularWeightInsulinActual) * 100))
else:
    print("Error. Exiting program")
```

### jsonFileHandler.py

```python
import json

def readJsonFile(fileName):
    data = ""
    try:
        with open(fileName) as json_file:
            data = json.load(json_file)
    except IOError:
        print("Could not read file")
    return data
```

---

## JSON Data Structure

### insulin.json

```json
{
    "molecules":{
        "lsInsulin":"malwrmlpllallalwgpdpaaa",
        "bInsulin":"fvnghlcgshlvealyvlvcgergffytpkt",
        "aInsulin":"giveqctsslsylqlenync",
        "cInsulin":"rreaedlqvqveggpgagslqplalegslqkr"
    },
    "weights":{
        "A":89.09,
        "C":121.16,
        "D":133.10,
        "E":147.13,
        "F":165.19,
        "G":75.07,
        "H":155.16,
        "I":131.17,
        "K":146.19,
        "L":131.17,
        "M":149.21,
        "N":132.12,
        "P":115.13,
        "Q":146.15,
        "R":174.20,
        "S":105.09,
        "T":119.12,
        "V":117.15,
        "W":204.23,
        "Y":181.19
    },
    "molecularWeightInsulinActual":5807.63
}
```

---

## Sample Output

```
bInsulin: fvnghlcgshlvealyvlvcgergffytpkt
aInsulin: giveqctsslsylqlenync
molecularWeightInsulinActual: 5807.63
The rough molecular weight of insulin: 5807.59
Percent error: -0.0006887
```

---

## What I Learned

| Concept | What I Learned |
|---------|----------------|
| JSON Handling | Reading and parsing JSON files in Python |
| Dictionary Comprehension | Counting amino acids efficiently |
| Data Extraction | Retrieving nested data from JSON structures |
| String Manipulation | `.upper()`, `.count()`, string concatenation |
| Error Handling | Try/except for file operations |
| Biochemical Data | Understanding amino acid sequences and weights |
| Calculation Accuracy | Comparing calculated vs actual values |
| Modular Code | Separating file reading into reusable function |

---

## How This Relates to Cybersecurity

| Security Concept | How This Project Applies It |
|------------------|----------------------------|
| Data Integrity | Ensuring data is processed correctly |
| JSON Security | Parsing structured data safely |
| Automation | Programmatic data processing reduces human error |
| Logging | Debugging and tracking calculations |
| Validation | Comparing results against known values |

---

## Next Steps

| Topic | Why It Matters |
|-------|----------------|
| Data Validation | Validate JSON structure before processing |
| API Integration | Fetch biological data from REST APIs |
| Data Visualization | Graph molecular weights and sequences |
| Bioinformatics | Apply Python skills to real biological problems |
| Secure JSON Parsing | Prevent injection attacks in JSON data |

---

## Conclusion

This project gave me hands-on experience with:

- Working with real-world biological data in JSON format
- Processing and analyzing structured data in Python
- Using dictionary comprehensions for efficient calculations
- Handling errors gracefully during file operations
- Comparing calculated results with known values

Understanding how to read, parse, and process JSON data is essential for many cybersecurity applications, including threat intelligence feeds, configuration files, and API integrations.

---

*"Data processing is the foundation of security automation. Understanding how to manipulate data programmatically is a core skill for any security professional."*


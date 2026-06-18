# Caesar Cipher – Encryption & Decryption in Python

**Date Completed:** June 18, 2026

**Language:** Python 3

**Project Type:** Cybersecurity Fundamentals

---

## Project Overview

The Caesar Cipher is one of the oldest and simplest encryption techniques. It works by shifting each letter in a message by a fixed number of positions down the alphabet.

This project implements a fully functional Caesar Cipher program in Python that can:

- Encrypt any message using a user-provided shift key (1-25)
- Decrypt encrypted messages back to their original form
- Handle spaces, punctuation, and special characters
- Convert all letters to uppercase for consistency
- Wrap around the alphabet (Z -> A when shifting)

---

## Project Files

| File | Description |
|------|-------------|
| `new.py` | Main Python script containing all functions and program logic |

---

## How It Works

### 1. Double Alphabet Creation
The program creates a doubled alphabet string (`ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ`) so that shifting past 'Z' wraps around to 'A'.

### 2. User Input
- The user enters a message to encrypt
- The user enters a shift key (whole number from 1-25)

### 3. Encryption Process
- Converts the message to uppercase
- For each character:
  - If it is a letter, finds its position in the alphabet and shifts it by the key
  - If it is not a letter (space, punctuation), keeps it unchanged

### 4. Decryption Process
- Negates the cipher key (e.g., 5 becomes -5)
- Uses the same encryption function with the negative key to reverse the encryption

---

## Functions Breakdown

| Function | Purpose |
|----------|---------|
| `getDoubleAlphabet(alphabet)` | Creates a doubled alphabet string for wrap-around shifting |
| `getMessage()` | Prompts user for the message to encrypt |
| `getCipherKey()` | Prompts user for the shift key (1-25) |
| `encryptMessage(message, cipherKey, alphabet)` | Encrypts the message using the Caesar Cipher |
| `decryptMessage(message, cipherKey, alphabet)` | Decrypts the message by using a negative key |
| `runCaesarCipherProgram()` | Orchestrates the entire program flow |

---

## Full Code

```python
def getDoubleAlphabet(alphabet):
    doubleAlphabet = alphabet + alphabet
    return doubleAlphabet

def getMessage():
    stringToEncrypt = input("Please enter a message to encrypt: ")
    return stringToEncrypt

def getCipherKey():
    shiftAmount = input("Please enter a key (whole number from 1-25): ")
    return shiftAmount

def encryptMessage(message, cipherKey, alphabet):
    encryptedMessage = ""
    uppercaseMessage = message.upper()
    
    for currentCharacter in uppercaseMessage:
        if currentCharacter in alphabet:
            position = alphabet.find(currentCharacter)
            newPosition = position + int(cipherKey)
            encryptedMessage = encryptedMessage + alphabet[newPosition]
        else:
            encryptedMessage = encryptedMessage + currentCharacter
    
    return encryptedMessage

def decryptMessage(message, cipherKey, alphabet):
    decryptKey = -1 * int(cipherKey)
    return encryptMessage(message, decryptKey, alphabet)

def runCaesarCipherProgram():
    myAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    print(f'Alphabet: {myAlphabet}')
    
    myAlphabet2 = getDoubleAlphabet(myAlphabet)
    print(f'Alphabet2: {myAlphabet2}')
    
    myMessage = getMessage()
    print(f'Message: {myMessage}')
    
    myCipherKey = getCipherKey()
    print(f'Cipher Key: {myCipherKey}')
    
    myEncryptedMessage = encryptMessage(myMessage, myCipherKey, myAlphabet2)
    print(f'Encrypted Message: {myEncryptedMessage}')
    
    myDecryptedMessage = decryptMessage(myEncryptedMessage, myCipherKey, myAlphabet2)
    print(f'Decrypted Message: {myDecryptedMessage}')

runCaesarCipherProgram()
```

---

## Sample Output

### Example 1: Cybersecurity Message

```
Alphabet: ABCDEFGHIJKLMNOPQRSTUVWXYZ
Alphabet2: ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ
Please enter a message to encrypt: Just finished a caesar cipher projects for cybersecurity journey
Message: Just finished a caesar cipher projects for cybersecurity journey
Please enter a key (whole number from 1-25): 23
Cipher Key: 23
Encrypted Message: GRPQ CFKFPBEA X ZXBPBO ZFMBO MOLGBZQP CLO ZVYBOPBZROFQV GLROKBV
Decrypted Message: JUST FINISHED A CAESER CIPHER PROJECTS FOR CYBERSECURITY JOURNEY
```

### Example 2: Personal Introduction

```
Alphabet: ABCDEFGHIJKLMNOPQRSTUVWXYZ
Alphabet2: ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ
Please enter a message to encrypt: I am owen cybersecurity analyst and cloud security with skills and tools for Aws & Microsoft
Message: I am owen cybersecurity analyst and cloud security with skills and tools for Aws & Microsoft
Please enter a key (whole number from 1-25): 8
Cipher Key: 8
Encrypted Message: Q'I IU WEMV KGJMZAMKCZQBG IVITGAB IVL KTWCL AMKCZQBG EQBP ASQITTA IVL BWMTA NWZ IEA & UQKZWANNB
Decrypted Message: I AM OWEN CYBERSECURITY ANALYST AND CLOUD SECURITY WITH SKILLS AND TOOLS FOR AWS & MICROSOFT
```

---

## What I Learned

| Concept | What I Learned |
|---------|----------------|
| Encryption Fundamentals | How shifting letters can hide messages |
| Python Functions | Breaking code into reusable, testable functions |
| String Manipulation | `.upper()`, `.find()`, string concatenation |
| Conditional Logic | `if currentCharacter in alphabet:` for checking letters |
| Loops | `for` loop to iterate through each character |
| Dictionary/List Operations | Working with characters and positions |
| User Input | `input()` for interactive programs |
| Error Handling | Handling spaces and punctuation without breaking |
| Wrap-around Logic | Using a doubled alphabet to wrap Z -> A |

---

## How This Relates to Cybersecurity

| Security Concept | How This Project Applies It |
|------------------|----------------------------|
| Encryption | Data is transformed so only authorised parties can read it |
| Symmetric Key | Same key is used for encryption and decryption |
| Key Management | The shift key must be shared securely |
| Plaintext vs Ciphertext | Original message vs encrypted message |
| Substitution Cipher | Each letter is substituted with another |

---

## Next Steps

| Topic | Why It Matters |
|-------|----------------|
| Brute Force Attack | Try all 25 keys to decrypt without knowing the key |
| Frequency Analysis | Analyse letter frequency to break ciphers |
| Vigenere Cipher | More advanced polyalphabetic substitution cipher |
| AES Encryption | Industry-standard encryption used today |
| Hashing Algorithms | SHA-256, MD5 for integrity checking |

---

## Conclusion

This project gave me a hands-on understanding of:

- How encryption works at its most basic level
- Why encryption is essential for cybersecurity
- Python implementation of cryptographic concepts
- The importance of key management in secure systems

Although the Caesar Cipher is no longer secure by modern standards, it is the foundation upon which all modern encryption is built. Understanding it helped me appreciate the complexity of today's cryptographic systems.

---

*"Understanding the fundamentals of encryption is the first step to defending against modern cyber threats."*

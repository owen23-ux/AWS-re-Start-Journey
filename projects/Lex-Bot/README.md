# ID-Please – Cognito Quiz Bot

## Project Overview

ID-Please is an interactive, authentication-focused chatbot built using **Amazon Lex** for **CloudLearners Inc.** It was designed to educate users on **Amazon Cognito** through an engaging quiz experience. The bot was developed by **Bot Solutions**, a collaborative team of AWS re/Start learners comprising **Gugulethu Shange**, **Promise Sibanda**, and **Owen Maake**.

The project transforms passive learning into an active, gamified experience by quizzing users on key Cognito concepts including User Pools, Identity Pools, token types (ID, Access, Refresh), multi-factor authentication, and password reset flows. The bot provides instant feedback, educational explanations, and fun facts to reinforce learning and keep users engaged.

---

## The Client Challenge

CloudLearners Inc. faced a significant challenge: **static study materials lead to low engagement and difficult knowledge retention for complex topics** like AWS authentication. Students struggled to grasp Cognito concepts through traditional reading materials alone.

**Our Solution:** A conversational "Cognito Mastery" quiz that transforms passive learning into an active, gamified experience with:

- Immediate knowledge reinforcement
- Guided, user-friendly flow
- Scalable educational outreach

---

## Bot Solutions – The Team

ID-Please was built by **Bot Solutions**, a collaborative team of AWS re/Start learners:

| Name | Role |
|------|------|
| **Promise Sibanda** | Bot Developer |
| **Gugulethu Shange** | Bot Developer |
| **Owen Maake** | Bot Developer |

The team combined their knowledge of AWS services, conversational AI, and user experience design to create a chatbot that makes learning about AWS authentication simple, interactive, and accessible to all learners.

---

## The Technical Engine: Amazon Lex

Amazon Lex is the core technology powering ID-Please. It provides the following key features:

### Intent Recognition

Maps diverse user phrases (utterances) to actions, ensuring the bot understands context regardless of how students phrase their requests.

### Slot Filling

Captures essential user input (answers) to maintain a stateful, logical dialogue throughout the quiz flow.

### Conditional Branching

Evaluates user responses dynamically to provide instant feedback for correct and incorrect answers.

### Fallback Handling

Gracefully manages unexpected inputs and redirects users to the intended flow.

---

## Bot Architecture

### Bot Details

| Field | Value |
|-------|-------|
| **Bot Name** | Mr-ID-Please |
| **Language** | English (ZA) |
| **Bot ID** | WZPZOZ1L3V |
| **Built By** | Promise, Gugulethu, Owen |

### Intents (7)

An intent represents an action that the user wants to perform.

| Intent | Purpose |
|--------|---------|
| **Welcome** | Handles greeting messages like "Hi" or "Hello" |
| **AboutService** | Handles questions about Cognito or ID-Please services |
| **StartQuiz** | Starts the Cognito quiz and manages the question flow |
| **EndQuiz** | Ends the quiz and thanks the user |
| **Fact-1** | Provides educational facts about Cognito |
| **Fact-2** | Provides additional educational facts about Cognito |
| **FallbackIntent** | Handles unexpected inputs gracefully |

### Slot Types (2)

| Slot Type | Description |
|-----------|-------------|
| **QuizAnswers** | Valid quiz answer choices (A, B, C, D) |
| **ServiceList** | Handles questions about Cognito or ID-Please services |

### Slots (5)

A slot is a variable that captures specific information from the user.

| Slot | Purpose |
|------|---------|
| **AnswerOne** | Captures response to Question 1 |
| **AnswerTwo** | Captures response to Question 2 |
| **Answer3** | Captures response to Question 3 |
| **YesNoType** | Captures confirmation responses |
| **Ready42** | Captures readiness for the next question |

---

## Conversation Flow Design

We designed a logical pathway alternating between informative facts and knowledge checks:

### Fact-1 & Fact-2 Intents

Educational hooks providing industry context to build student interest. These intents share interesting facts about Cognito, such as:

> *"A single Amazon Cognito User Pool can support up to 50 million active users."*

### StartQuiz Intent

The core engine managing the question-and-answer loop with structured feedback. This intent controls the entire quiz flow, presenting questions one at a time and capturing user answers through slots.

### Feedback Loop

Instant validation provides reinforcement, turning every interaction into a learning moment. Each answer triggers either a "Correct!" or "Incorrect" response with an explanation.

---

## Quiz Questions

### Question 1: Token Types

**Scenario:** If your mobile app uses Cognito for login and users complain they are getting logged out after 1 hour even though they're still using the app, which token should you use to silently get new credentials without making them sign in again?

| Option | Answer |
|--------|--------|
| A | ID Token |
| B | Access Token |
| C | Refresh Token ✅ |
| D | Session Token |

**Explanation:** By default, access tokens expire after 1 hour. The Refresh Token is used to silently request new credentials without making the user sign in again.

---

### Question 2: Identity Pools

**Scenario:** A user has already signed in to an application using Amazon Cognito. The application now needs temporary AWS credentials so the user can upload files to Amazon S3. Which Cognito feature should be used?

| Option | Answer |
|--------|--------|
| A | User Pools |
| B | Identity Pools ✅ |
| C | Cognito Sync |
| D | Hosted UI |

**Explanation:** Identity Pools (Federated Identities) exchange the user's identity token for temporary AWS credentials to access services like S3.

---

### Question 3: Password Reset

**Scenario:** An online shopping application wants users to reset their passwords without contacting customer support. Which Amazon Cognito feature makes this possible?

| Option | Answer |
|--------|--------|
| A | Identity Pools |
| B | User Pools ✅ |
| C | Cognito Sync |
| D | Hosted UI |

**Explanation:** User Pools manage the identity directory, including self-service password reset flows. Users can reset their passwords without contacting customer support.

---

## Bot Flow (Live Demo)

```
User: "Hi"
Bot: "Hi. Welcome to ID-Please Bot! How can I help you?"

User: "services"
Bot: "Which service would you like information about?"

User: "cognito"
Bot: "No problem! Can you wait while I fetch the details about Cognito."
Bot: "Amazon Cognito is a fully managed AWS service that provides authentication, authorization, and user management for web and mobile apps."

User: "id please"
Bot: "No problem! Can you wait while I fetch the details about ID Please."
Bot: "ID-Please is an interactive, authentication-focused chatbot built using Amazon Lex, designed to educate users on Amazon Cognito. It was developed by Bot Solutions..."

User: "start quiz"
Bot: "Welcome to the Cognito Quiz! Let's see how much you know about Amazon Cognito."
Bot: "Question 1: If your mobile app uses Cognito for login..."

User: "b" (incorrect)
Bot: "Incorrect. The correct answer is C (Refresh Token). By default, access tokens expire after 1 hour..."

User: "c" (correct for Question 2)
Bot: "Correct! Identity Pools provide temporary AWS credentials."
Bot: "Did you know that: A single Amazon Cognito User Pool can support up to 50 million active users."

User: "a" (incorrect for Question 3)
Bot: "Incorrect. The correct answer is B (User Pools). User Pools manage the identity directory, including self-service password resets."
Bot: "Congratulations! You have completed the quiz! Great job!"
```

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Amazon Lex Bot                                    │
│                         Mr-ID-Please                                      │
│                         English (ZA)                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                           Intents (7)                                 │  │
│  ├─────────────┬─────────────┬─────────────┬───────────────────────────┤  │
│  │  Welcome    │AboutService │  StartQuiz  │         EndQuiz           │  │
│  │  Fact-1     │  Fact-2     │ Fallback    │                           │  │
│  └─────────────┴─────────────┴─────────────┴───────────────────────────┘  │
│                                    │                                       │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                         Slot Types (2)                                │  │
│  ├───────────────────────────────────────────────────────────────────────┤  │
│  │  QuizAnswers                    │  ServiceList                        │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                    │                                       │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                           Slots (5)                                   │  │
│  ├─────────────┬─────────────┬─────────────┬───────────────────────────┤  │
│  │  AnswerOne  │  AnswerTwo  │   Answer3   │    YesNoType              │  │
│  │  Ready42    │             │             │                           │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                    │                                       │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                      Conditional Branching                           │  │
│  ├───────────────────────────────────────────────────────────────────────┤  │
│  │  Correct → "Correct! ..." → Next Question                           │  │
│  │  Incorrect → "Incorrect. The correct answer is..."                  │  │
│  │  Default → "Please choose A, B, C, or D."                          │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                    │                                       │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                         Responses                                     │  │
│  ├───────────────────────────────────────────────────────────────────────┤  │
│  │  Correct: Explanations + Fun Facts                                   │  │
│  │  Incorrect: Correct answer + Explanation                             │  │
│  │  Completion: Congratulatory message                                  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Technical Approach

### Branching Logic

Using native conditional branching to evaluate user input dynamically:

| Branch | Condition | Response |
|--------|-----------|----------|
| Correct | `AnswerTwo EQ "C"` | "Correct! ..." → Next question |
| Incorrect | `AnswerTwo EQ "A"` | "Incorrect. The correct answer is C..." → Next question |
| Incorrect | `AnswerTwo EQ "B"` | "Incorrect. The correct answer is C..." → Next question |
| Incorrect | `AnswerTwo EQ "D"` | "Incorrect. The correct answer is C..." → Next question |
| Default | (none) | "Please choose A, B, C, or D." → Repeat question |

### Testing Rigor

Conducted iterative testing to handle "fallback" scenarios, ensuring the bot gracefully redirects users.

---

## Challenges Overcome

| Challenge | Solution |
|-----------|----------|
| **Dialogue Drift** | Mitigated by meticulously configuring Next-Step transitions, ensuring a linear, coherent experience |
| **Slot Loops** | Resolved by moving conditional logic to Closing Response instead of slot capture |
| **Maximum Step Limit** | Simplified intent structure to avoid infinite loops |

---

## Strategic Focus: AWS Cognito

We chose AWS Cognito because it is the backbone of modern cloud identity management.

| Reason | Benefit |
|--------|---------|
| **Security Competency** | Essential for building secure, scalable applications |
| **Career-Ready Skills** | Teaches students about User Pools, Identity Pools, and MFA |
| **Foundational Knowledge** | Bridges the gap between app development and cloud infrastructure |

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Intent Recognition** | Maps user phrases to actions using 7 intents |
| **Slot Filling** | Captures answers using 5 slots |
| **Conditional Branching** | Evaluates answers dynamically |
| **Fallback Handling** | Gracefully manages unexpected inputs |
| **Instant Feedback** | Correct/incorrect responses with explanations |
| **Educational Content** | Fun facts with correct answers |

---

## Future Enhancements

| Feature | Description |
|---------|-------------|
| **Data Persistence** | Integrating Amazon DynamoDB to track historical student performance |
| **Advanced Intelligence** | Incorporating AWS Lambda for dynamic, personalised scoring systems |
| **Multimodal** | Deploying Amazon Polly to enable hands-free, voice-activated learning |

---

## What I Learned

| Concept | What I Learned |
|---------|----------------|
| **Amazon Lex** | Building conversational interfaces using intents, slots, and conditional branching |
| **AWS Cognito** | Understanding User Pools, Identity Pools, and authentication flows |
| **Chatbot Design** | Creating engaging, educational user experiences |
| **Problem Solving** | Overcoming dialogue drift, slot loops, and step limits |
| **Team Collaboration** | Working in a team to deliver a client-ready solution |

---

## Screenshots

### Bot Testing

![Bot Testing](projects/Lex-Bot/screenshots/testing.png)

*Figure 1: Testing the ID-Please bot in Amazon Lex console*

### Intents

![Intents](projects/Lex-Bot/screenshots/intents.png)

*Figure 2: List of 7 intents defined in the bot*

### Slot Types

![Slot Types](projects/Lex-Bot/screenshots/slots.png)

*Figure 3: Custom slot types (QuizAnswers, ServiceList)*

### Bot Details

![Bot Details](projects/Lex-Bot/screenshots/id-please.png)

*Figure 4: Bot details showing Mr-ID-Please*

---

## Connect With Me

- **GitHub:** github.com/owen23-ux
- **LinkedIn:** linkedin.com/in/owen-maake-0b715a3a3
- **Email:** owenlethabo28@gmail.com

---

## License

MIT

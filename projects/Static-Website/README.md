# Harvest Table Restaurant – Static Website

A fully functional static website for a local restaurant to enable online booking, meal ordering, and admin management.

---

## Project Overview

Harvest Table Restaurant is a locally owned eatery serving seasonal comfort food. The restaurant experienced a surge in customer volume, resulting in high numbers of daily booking requests and meal orders. These requests were previously managed through phone calls, emails, and in-person visits, using paper diaries and basic spreadsheets.

This project replaces that manual system with a cloud-native static website that allows customers to:

- Browse the menu
- Book a table online
- Place meal orders
- Receive instant confirmation

The restaurant owner can log in to an admin dashboard to view and confirm bookings and orders.

---

## Operational Challenges Solved

| Challenge | How the Website Solves It |
|-----------|---------------------------|
| **Order mix-ups** | Centralised digital system ensures orders are captured correctly and sent to the kitchen queue |
| **Double bookings** | Real-time booking form captures availability |
| **Delayed confirmations** | Instant email and SMS notifications via SNS |
| **No customer data tracking** | DynamoDB stores customer profiles, bookings, and order history |

---

## Website Pages

| Page | Description |
|------|-------------|
| **Home** | Restaurant introduction with hero image and navigation |
| **Menu** | Displays current dishes with prices and descriptions |
| **Bookings** | Form for table reservations — date, time, guests, seating, deposit method |
| **Order** | Menu selection with quantities, collection options, and payment method |
| **Admin** | Login-protected dashboard to view and manage bookings and orders |

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML5, CSS3, JavaScript |
| Hosting | Amazon S3 (static website hosting) |
| Authentication | Amazon Cognito (proposed) |
| Database | Amazon DynamoDB (proposed) |
| Compute | AWS Lambda (proposed) |
| Notifications | Amazon SNS (proposed) |
| Logging & Monitoring | CloudWatch, CloudTrail (proposed) |

---

## Proposed AWS Architecture

![AWS Restaurant Architecture](harvest-table-restaurant/aws_restaurant_architecture.png)

---

## File Structure

```
harvest-table-restaurant/
│
├── index.html          # Home page
├── menu.html           # Menu page
├── booking.html        # Booking form
├── order.html          # Order form
├── admin.html          # Admin login
├── admin-bookings.html # Admin booking queue
├── admin-orders.html   # Admin order queue
├── style.css           # Global styles
├── global.js           # Core functionality
├── menu-data.js        # Menu data (single source of truth)
└── README.md           # Project documentation
```

---

## Editing the Menu

Update `menu-data.js` to change the restaurant menu. The same menu items are used on `menu.html` and `order.html`, so dish names, prices, descriptions, images, and default order quantities only need to be edited in one place.

```javascript
window.MENU_ITEMS = [
  {
    name: "Harvest Salad",
    price: 95,
    description: "Roasted vegetables, grains, herbs, feta, and lemon dressing.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Colourful harvest salad bowl",
    defaultQuantity: 1
  }
];
```

---

## Admin Login

| Credential | Value |
|------------|-------|
| Email | `admin@harvest.com` |
| Password | `RedRed321!` |

---

## Cost Analysis

### Current Manual System (Monthly)

| Cost Type | Amount (ZAR) |
|-----------|--------------|
| Direct costs (paper, ink, IT support) | ~R500 |
| Indirect losses (mix-ups, double bookings, attrition) | R2,000 – R3,000 |
| **Total** | **R2,500 – R3,500** |

### AWS Solution (Monthly after Free Tier)

| Service | Cost (USD) |
|---------|------------|
| S3 Hosting | < $0.50 |
| DynamoDB | ~$0.25 |
| Lambda (1 million requests) | ~$0.20 |
| Cognito (50k active users) | ~$0.00 |
| SNS (1 million publishes) | ~$0.50 |
| **Total** | **~$1.50 USD (~R27 ZAR)** |

**Savings: Over 95% reduction in direct costs, with indirect losses eliminated.**

---

## Benefits of AWS Migration

| Benefit | Description |
|---------|-------------|
| **High Availability** | 99.9% uptime SLA via S3 |
| **Automatic Scalability** | Handles traffic spikes without manual intervention |
| **Enhanced Security** | IAM roles, Cognito authentication, encrypted data |
| **Operational Automation** | Lambda + SNS automates confirmations and alerts |
| **Data-Driven Decisions** | CloudWatch and CloudTrail provide usage analytics |

---

## Implementation Roadmap

| Phase | Duration | Tasks |
|-------|----------|-------|
| **Phase 1: Foundation** | Completed | Static website built, S3 hosting enabled, forms functional |
| **Phase 2: Database** | 5–7 days | Create DynamoDB tables, replace local storage with AWS SDK |
| **Phase 3: Authentication** | 5–7 days | Configure Cognito, add sign-up/sign-in pages |
| **Phase 4: Notifications** | 3–5 days | Write Lambda functions, configure SNS topics, integrate triggers |

---

## Conclusion

This project successfully demonstrates that a static website hosted on Amazon S3 can replace manual, paper-based booking and order management systems. The website provides customers with easy-to-use forms for reservations and meal orders, while the admin panel gives the restaurant owner centralised visibility of daily operations.

The proposed integration of AWS Cognito, DynamoDB, Lambda, and SNS would further automate confirmations, provide permanent data storage, secure customer information, and send real-time alerts to staff. The cost of the complete AWS solution is negligible compared to the direct and indirect costs of the manual system.

**Recommendation:** Approve migration from local storage to AWS services to eliminate data loss risk, automate workflows, and reduce operational costs.

---

## Author

**Owen Maake** – IT Graduate | SOC Analyst in Training | Cloud Enthusiast

---

## License

MIT
```

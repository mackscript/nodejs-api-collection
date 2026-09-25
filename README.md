<div align="center">

# 🛒 ShopFlow — E-Commerce Backend API

**A production-grade, modular RESTful API for an E-Commerce platform**

Built with **Node.js / Bun** · **Express 5** · **TypeScript** · **MongoDB (Mongoose)**

Follows clean architecture principles with strict separation of concerns across
Controllers → Services → Repositories → Models.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-1.0+-000000?style=flat&logo=bun&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.2.1-000000?style=flat&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%209.10.1-47A248?style=flat&logo=mongodb&logoColor=white)
![Zod](https://img.shields.io/badge/Validation-Zod%204.6.5-3E67B1?style=flat)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Architecture & Design Pattern](#-architecture--design-pattern)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Data Models](#-data-models)
- [Project Audit & Findings](#-project-audit--findings)

---

## 🌟 Overview

The backend provides core E-Commerce capabilities:

- 🔐 **Passwordless OTP Authentication** — email-based OTP login and verification via Nodemailer and secure bcrypt hashing
- 🪪 **JWT Authorization** — stateless access token generation and Bearer authentication middleware
- 👤 **User Profile Management** — complete profile creation, fetching, and updating
- 📦 **Product Catalog Management** — creation, detail lookup, update, and paginated listing
- ✅ **Strict Request Validation** — Zod-based request schema validation middleware
- 🚨 **Centralized Error Handling** — custom `AppError` class and global error handling middleware

---

## 🛠 Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Runtime** | [Bun](https://bun.sh/) / Node.js | Fast all-in-one JavaScript runtime & package manager |
| **Framework** | [Express 5](https://expressjs.com/) `v5.2.1` | Minimalist web framework with native async error handling |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Type-safe JavaScript with strict mode enabled |
| **Database** | [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) `v9.10.1` | Document-oriented NoSQL database and ODM |
| **Validation** | [Zod](https://zod.dev/) `v4.6.5` | Schema declaration and validation library |
| **Auth** | [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) & [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | JWT access token management and password/OTP hashing |
| **Mailing** | [Nodemailer](https://nodemailer.com/) | Transactional email delivery for OTP verification |
| **Security** | [Helmet](https://helmetjs.github.io/) & [CORS](https://github.com/expressjs/cors) | HTTP header security and cross-origin resource sharing |

---

## 🏛 Architecture & Design Pattern

The application adopts a **Layered Architecture (N-Tier)**:

```text
HTTP Request
     │
     ▼
[ Routes ] ─────────► [ Middleware ] (Zod Validation, JWT Auth)
     │
     ▼
[ Controllers ] ────► Handles HTTP request/response formatting
     │
     ▼
[ Services ] ───────► Pure business logic (OTP expiry, price checks, token issuing)
     │
     ▼
[ Repositories ] ───► Database abstraction (CRUD queries via Mongoose)
     │
     ▼
[ Models / DB ] ────► Mongoose schemas & MongoDB collections
```

<details>
<summary>📂 <strong>Click to expand full folder structure</strong></summary>

```text
Backend/
├── .env                  # Local environment configuration (ignored by git)
├── .env.example          # Template for required environment variables
├── bun.lock              # Bun lockfile
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript compiler configuration
└── src/
    ├── app.ts            # Express app initialization & route registration
    ├── server.ts         # Server startup and database connection
    ├── express.d.ts      # Custom type declarations (extends Request with user)
    ├── config/
    │   └── database.ts   # MongoDB Mongoose connection setup
    ├── controllers/      # Route request/response handlers
    │   ├── auth.controller.ts
    │   ├── product.controller.ts
    │   └── profile.controller.ts
    ├── errors/           # Custom error definitions
    │   └── app-error.ts
    ├── middleware/       # Express middlewares
    │   ├── async-handler.ts       # Wraps async controller methods
    │   ├── auth.middleware.ts     # Validates JWT in Authorization header
    │   ├── error-handler.ts       # Global error formatting middleware
    │   └── validate.middleware.ts # Zod schema validation middleware
    ├── models/           # Mongoose schemas & TypeScript interfaces
    │   ├── auth/
    │   │   ├── otp.modal.ts       # OTP schema with expiration
    │   │   └── user.model.ts      # User schema (email, role, verification)
    │   ├── product/
    │   │   └── product.model.ts   # Product catalog schema
    │   └── profile/
    │       └── profile.model.ts   # User profile schema
    ├── repositories/     # Database access layer
    │   ├── otp.repository.ts
    │   ├── product.repository.ts
    │   ├── profile.repositroy.ts
    │   └── user.repository.ts
    ├── routes/           # Express router endpoints
    │   ├── auth.routes.ts
    │   ├── product.routes.ts
    │   └── profile.routes.ts
    ├── services/         # Core business logic
    │   ├── auth.service.ts
    │   ├── email.service.ts
    │   ├── otp.service.ts
    │   ├── product.service.ts
    │   └── profile.service.ts
    ├── utils/            # Helper utilities
    │   ├── jwt.ts        # Access token sign & verify
    │   ├── otp.ts        # 6-digit OTP generator
    │   ├── password.ts   # Bcrypt hash/compare
    │   └── validation.ts # Utility schemas
    └── validations/      # Zod validation schemas
        ├── auth.validation.ts
        ├── product.validation.ts
        └── profile.validation.ts
```

</details>

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (version 1.0+) or [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas cluster)
- SMTP Account (e.g. Gmail App Password, Mailgun, SendGrid) for OTP emails

### Installation

```bash
cd Backend
bun install
# or
npm install
```

### Environment Configuration

Create a `.env` file in the `Backend` directory by copying `.env.example`:

```bash
cp .env.example .env
```

<details>
<summary>⚙️ <strong>Click to see required environment variables</strong></summary>

```env
# Server
PORT=5120

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=your_super_secret_random_key_here
JWT_EXPIRES_IN=7d

# Email / SMTP Configuration (for OTP delivery)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_gmail_app_password
```

</details>

### Running the Application

| Command | Action |
| :--- | :--- |
| `bun run dev` / `npm run dev` | Starts development server with hot-reload (`bun --watch src/server.ts`) |
| `bun run start` / `npm run start` | Starts production server (`bun src/server.ts`) |
| `bun run typecheck` / `npm run typecheck` | Runs TypeScript type checker without emitting files |

---

## 📡 API Reference

**Base URL**: `http://localhost:5120`

<details>
<summary>💓 <strong>Health Check — <code>GET /</code></strong></summary>

Verifies that the server is operational.

**Response `200 OK`**
```json
{
  "success": true,
  "message": "E-commerce API is running"
}
```

</details>

<details>
<summary>🔐 <strong>Authentication — <code>/api/v1/auth</code></strong></summary>

#### 1. Send OTP
Generates a verification OTP, records it with an expiration timestamp, creates a placeholder user if new, and sends the code to the user's email.

- **Endpoint**: `POST /api/v1/auth/send-otp`

**Request Body**
```json
{ "email": "user@example.com" }
```

**Response `201 Created`**
```json
{
  "success": true,
  "data": { "email": "user@example.com", "otp": "492810" }
}
```

#### 2. Verify OTP
Validates the submitted OTP against the stored hash, marks `isEmailVerified` as `true`, and returns a JWT access token.

- **Endpoint**: `POST /api/v1/auth/verify-otp`

**Request Body**
```json
{ "email": "user@example.com", "otp": "492810" }
```

**Response `200 OK`**
```json
{
  "success": true,
  "message": "OTP verified successfully",
  "data": {
    "user": {
      "user": {
        "_id": "673f1a2b...",
        "email": "user@example.com",
        "isEmailVerified": true,
        "role": "user",
        "createdAt": "2026-09-25T10:00:00.000Z",
        "updatedAt": "2026-09-25T10:05:00.000Z"
      },
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

</details>

<details>
<summary>👤 <strong>Profile — <code>/api/v1/profile</code></strong></summary>

> All profile endpoints require the header: `Authorization: Bearer <accessToken>`

#### 1. Create Profile
- **Endpoint**: `POST /api/v1/profile/create`

**Request Body**
```json
{
  "name": "Jane Doe",
  "phNumber": "+12345678901",
  "avatar": "https://example.com/avatar.jpg"
}
```

**Response `200 OK`**
```json
{
  "success": true,
  "message": "Profile created successfully",
  "data": {
    "_id": "673f1b...",
    "userId": "673f1a2b...",
    "name": "Jane Doe",
    "phNumber": "+12345678901",
    "avatar": "https://example.com/avatar.jpg",
    "createdAt": "2026-09-25T10:10:00.000Z",
    "updatedAt": "2026-09-25T10:10:00.000Z"
  }
}
```

#### 2. Get My Profile
- **Endpoint**: `GET /api/v1/profile/me`

**Response `200 OK`**
```json
{
  "success": true,
  "message": "Profile fetched successfully",
  "data": {
    "_id": "673f1b...",
    "userId": "673f1a2b...",
    "name": "Jane Doe",
    "phNumber": "+12345678901",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

#### 3. Update Profile
- **Endpoint**: `PATCH /api/v1/profile/update`

**Request Body**
```json
{ "name": "Jane Smith" }
```

**Response `200 OK`**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "_id": "673f1b...",
    "userId": "673f1a2b...",
    "name": "Jane Smith",
    "phNumber": "+12345678901",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

</details>

<details>
<summary>📦 <strong>Products — <code>/api/v1/product</code></strong></summary>

#### 1. Create Product
- **Endpoint**: `POST /api/v1/product/create`

**Request Body**
```json
{
  "title": "Wireless Noise Cancelling Headphones",
  "description": "High-fidelity audio with active noise cancellation",
  "category": "Electronics",
  "mrp": 299.99,
  "salePrice": 249.99,
  "discountPercentage": 16.6,
  "stock": 50,
  "images": ["https://example.com/images/headphones-1.jpg"],
  "returnPolicy": "30 days return",
  "warrantyInformation": "1 year warranty"
}
```

**Response `200 OK`**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "673f2c...",
    "title": "Wireless Noise Cancelling Headphones",
    "salePrice": 249.99,
    "mrp": 299.99,
    "stock": 50,
    "category": "Electronics"
  }
}
```

#### 2. Get Products (Paginated)
- **Endpoint**: `GET /api/v1/product?page=1&limit=10`

**Response `200 OK`**
```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": [
    {
      "_id": "673f2c...",
      "title": "Wireless Noise Cancelling Headphones",
      "category": "Electronics",
      "mrp": 299.99,
      "salePrice": 249.99,
      "stock": 50
    }
  ],
  "pagination": { "page": 1, "limit": 10, "totalProducts": 1, "totalPages": 1 }
}
```

#### 3. Get Product by ID
- **Endpoint**: `GET /api/v1/product/:productId`

**Response `200 OK`**
```json
{
  "success": true,
  "data": {
    "_id": "673f2c...",
    "title": "Wireless Noise Cancelling Headphones",
    "category": "Electronics",
    "mrp": 299.99,
    "salePrice": 249.99,
    "stock": 50
  }
}
```

#### 4. Update Product
- **Endpoint**: `PATCH /api/v1/product/:productId`

**Request Body** (partial updates accepted)
```json
{ "stock": 45, "salePrice": 239.99 }
```

**Response `200 OK`**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": { "_id": "673f2c...", "stock": 45, "salePrice": 239.99 }
}
```

</details>

---

## 🗄 Data Models

<details>
<summary><strong>User</strong> — <code>models/auth/user.model.ts</code></summary>

| Field | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `email` | `String` | Required, Unique, Lowercase, Trim | User email address |
| `passwordHash` | `String` | Optional, Hidden (`select: false`) | Encrypted password (if password auth is used) |
| `isEmailVerified` | `Boolean` | Required, Default: `false` | Email verification flag |
| `role` | `String` | Enum: `["user", "admin"]`, Default: `"user"` | User authorization role |
| `createdAt` / `updatedAt` | `Date` | Managed by Mongoose `timestamps` | Audit timestamps |

</details>

<details>
<summary><strong>OTP</strong> — <code>models/auth/otp.modal.ts</code></summary>

| Field | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `email` | `String` | Required, Lowercase, Trim | Recipient email address |
| `otpHash` | `String` | Required | Bcrypt-hashed OTP code |
| `expiresAt` | `Date` | Required | Expiration timestamp (e.g. 5–10 mins) |

</details>

<details>
<summary><strong>Profile</strong> — <code>models/profile/profile.model.ts</code></summary>

| Field | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `userId` | `ObjectId` | Required, Unique, Indexed, Ref: `User` | Foreign key to `User` document |
| `name` | `String` | Optional, Max 100 chars, Trim | User's full name |
| `phNumber` | `String` | Optional, Trim | User's phone number |
| `avatar` | `String` | Optional, Trim | Profile picture URL |

</details>

<details>
<summary><strong>Product</strong> — <code>models/product/product.model.ts</code></summary>

| Field | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `title` | `String` | Required, Max 100 chars, Trim | Product display title |
| `description` | `String` | Optional, Trim | Product description |
| `category` | `String` | Required, Indexed, Trim | Category name |
| `mrp` | `Number` | Required, Min: 0 | Maximum retail price |
| `salePrice` | `Number` | Required, Min: 0 | Current selling price (must be ≤ `mrp`) |
| `discountPercentage` | `Number` | Min: 0, Max: 100, Default: 0 | Discount percentage |
| `rating` | `Number` | Min: 0, Max: 5, Default: 0 | Average product rating |
| `stock` | `Number` | Required, Min: 0 | Units in inventory |
| `images` | `[String]` | Default: `[]` | List of image URLs |
| `returnPolicy` | `String` | Optional, Trim | Return policy terms |
| `warrantyInformation` | `String` | Optional, Trim | Warranty details |

</details>

---
 
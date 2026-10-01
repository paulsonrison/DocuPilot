# DocuPilot — Backend

REST API for DocuPilot, an AI-powered document intelligence workspace. Handles user authentication, profile management, and will serve as the integration point for AI document processing.

---

## Tech Stack

| | |
|---|---|
| **Runtime** | Node.js |
| **Framework** | Express 5.x |
| **Database** | MongoDB via Mongoose 9.x |
| **Auth** | JWT (`jsonwebtoken` 9.x) + bcrypt 6.x |
| **Validation** | Zod 4.x |
| **Config** | dotenv 18.x |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in the required values:

```bash
cp .env.example .env
```

```env
PORT=8000
MONGO_URI=           # MongoDB connection string (required)
JWT_SECRET=          # JWT signing secret (required)
JWT_EXPIRES_IN=15m   # Token TTL — default 15 minutes
CORS_ORIGIN=http://localhost:3000
OPENAI_API_KEY=      # Reserved for AI document processing (not yet wired)
```

### 3. Start the server

```bash
npm start
```

The server starts on `http://localhost:8000` by default.

---

## Project Structure

```
src/
├── server.js               # Entry point — connects to DB, starts Express
├── app.js                  # Express app — mounts routes and error handler
├── config/
│   ├── database.js         # Mongoose connection
│   └── env.js              # Centralised env validation (fails fast if required vars missing)
├── constants/
│   └── http-status.js      # HTTP status code constants
├── controllers/
│   ├── auth.controllers.js
│   └── profile.controllers.js
├── errors/
│   └── app.error.js        # AppError class (operational errors with statusCode)
├── middleware/
│   ├── auth.middleware.js   # JWT Bearer token verification → req.user
│   ├── error.middleware.js  # Global error handler
│   └── validate.middleware.js # Zod schema validation → 400 with field errors
├── models/
│   └── auth.models.js      # Mongoose User schema (users collection)
├── routes/
│   ├── auth.routers.js
│   └── profile.routers.js
├── services/
│   ├── auth.services.js    # Register / login business logic
│   └── profile.services.js # Get / update profile business logic
├── utils/
│   └── jwt.js              # generateAccessToken helper
└── validators/
    ├── auth.validator.js   # Zod schemas for register + login
    └── profile.validator.js # Zod schema for profile update
```

---

## API Reference

Base URL: `http://localhost:8000`

### Auth — `/api/auth`

No authentication required.

#### `POST /api/auth/register`

Create a new user account.

**Request body**
```json
{
  "username": "paulanderson",
  "email": "paul@company.com",
  "password": "SecurePass1!"
}
```

**Validation rules**
- `username` — minimum 3 characters
- `email` — valid email format
- `password` — minimum 8 characters

**Response `201`**
```json
{
  "user": {
    "_id": "...",
    "username": "paulanderson",
    "email": "paul@company.com"
  }
}
```

---

#### `POST /api/auth/login`

Authenticate and receive an access token.

**Request body**
```json
{
  "email": "paul@company.com",
  "password": "SecurePass1!"
}
```

**Response `200`**
```json
{
  "user": {
    "id": "...",
    "username": "paulanderson",
    "email": "paul@company.com"
  },
  "accessToken": "<JWT>"
}
```

---

### Profile — `/api/profile`

All routes require `Authorization: Bearer <token>`.

#### `GET /api/profile`

Fetch the current user's profile.

**Response `200`**
```json
{
  "id": "...",
  "username": "paulanderson",
  "email": "paul@company.com",
  "createdAt": "2025-01-14T09:00:00.000Z",
  "updatedAt": "2025-05-21T09:42:00.000Z"
}
```

---

#### `PATCH /api/profile`

Update username and/or email. At least one field must be provided.

**Request body**
```json
{
  "username": "newusername"
}
```

**Validation rules**
- `username` — minimum 3 characters (optional)
- `email` — valid email format (optional)
- Extra fields are rejected (`.strict()`)
- At least one field must be present

**Response `200`** — updated profile (same shape as `GET /api/profile`)

---

## Authentication

The API uses short-lived JWT access tokens (default TTL: 15 minutes).

**Token format:** `Authorization: Bearer <token>`

The `authenticate` middleware:
1. Reads the `Authorization` header.
2. Verifies the token against `JWT_SECRET`.
3. Attaches `req.user = { id: payload.sub }` for use in controllers.
4. Returns `401` with a distinct message for expired vs. invalid tokens.

> There is no refresh token mechanism yet. Clients will need to re-authenticate when the token expires.

---

## Error Handling

All errors go through the global error handler in `error.middleware.js`.

| Condition | Status | Notes |
|---|---|---|
| Validation failure (Zod) | `400` | Returns `errors: [{ field, message }]` array |
| Bad MongoDB ObjectId | `400` | |
| Mongoose validation error | `400` | Field-level error messages |
| Duplicate key (username/email) | `409` | Lists affected fields |
| Operational error (`AppError`) | varies | Uses `error.statusCode` |
| Expired JWT | `401` | "Authentication token has expired" |
| Invalid JWT | `401` | "Invalid authentication token" |
| Unhandled server error | `500` | Generic message in production |

---

## Data Model

**User** (collection: `users`)

| Field | Type | Constraints |
|---|---|---|
| `username` | String | Required, unique |
| `email` | String | Unique |
| `passwordHash` | String | Required — bcrypt hash (salt rounds: 10) |
| `createdAt` | Date | Auto (Mongoose timestamps) |
| `updatedAt` | Date | Auto (Mongoose timestamps) |

The `passwordHash` field is excluded from all profile query responses via `.select("-passwordHash")`.

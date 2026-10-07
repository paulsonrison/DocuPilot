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
| **Email** | Resend 6.x |

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

**Development**

```env
PORT=8000
MONGO_URI=                    # MongoDB connection string (required)
JWT_SECRET=                   # JWT signing secret (required)
JWT_EXPIRES_IN=15m

RESEND_API_KEY=               # Resend API key (required)
EMAIL_FROM=DocuPilot <onboarding@resend.dev>  # Resend sandbox sender — no domain needed

# All outgoing emails are redirected here during development.
# Set this to the address you have verified in your Resend account.
DEV_EMAIL_RECIPIENT=you@gmail.com

FRONTEND_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000
```

**Production**

```env
NODE_ENV=production
RESEND_API_KEY=               # Resend API key (required)
EMAIL_FROM=DocuPilot <noreply@yourdomain.com>  # Sender on your verified domain
# DEV_EMAIL_RECIPIENT — omit or leave blank; it is ignored in production
```

### 3. Start the server

```bash
npm start
```

The server starts on `http://localhost:8000` by default.

---

## Email Architecture

Authentication emails (verification and password reset) go through Resend in both development and production. The development recipient override lets you test the full flow without a custom domain — no local SMTP server needed.

```
auth.service.js
      ↓
email.service.js        ← resolves recipient, delegates to Resend
      ↓
resend.provider.js      ← Resend transport
      ↓
  development           production
  DEV_EMAIL_RECIPIENT   actual user email
```

`email.service.js` contains a `resolveRecipient` function:

- `NODE_ENV !== "production"` and `DEV_EMAIL_RECIPIENT` is set → email goes to the developer's verified address.
- Otherwise → email goes to the actual user's address.

The authentication layer always passes the real user email and never needs to know about the override. In production, `DEV_EMAIL_RECIPIENT` is explicitly ignored — it cannot accidentally redirect real users even if the variable is still present.

### Going to production

No code changes required. Update `.env`:

1. Set `NODE_ENV=production`
2. Set `EMAIL_FROM` to a sender on your verified Resend domain
3. Remove or leave blank `DEV_EMAIL_RECIPIENT`

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
│   ├── auth.controller.js
│   └── profile.controller.js
├── emails/
│   ├── verification.email.js    # Verification email template
│   ├── password-reset.email.js  # Password reset email template
│   └── providers/
│       └── resend.provider.js   # Resend transport
├── errors/
│   └── app.error.js        # AppError class (operational errors with statusCode)
├── middleware/
│   ├── auth.middleware.js        # JWT Bearer token verification → req.user
│   ├── error.middleware.js       # Global error handler
│   ├── rate-limit.middleware.js  # express-rate-limit configuration
│   └── validate.middleware.js    # Zod schema validation → 400 with field errors
├── models/
│   ├── user.model.js
│   └── auth-token.model.js       # Verification and reset tokens
├── routes/
│   ├── index.routes.js
│   ├── auth.routes.js
│   └── profile.routes.js
├── services/
│   ├── auth.service.js           # Register / login / verify / reset business logic
│   ├── auth-token.service.js     # Token creation, lookup, and expiry
│   ├── email.service.js          # Recipient resolution + Resend delegation
│   └── profile.service.js
├── utils/
│   ├── auth-token.js             # Token generation helpers
│   └── jwt.js                    # generateAccessToken helper
└── validators/
    ├── auth.validator.js         # Zod schemas for register, login, reset-password
    ├── email.validator.js        # Zod schemas for verify-email, resend, forgot-password
    └── profile.validator.js      # Zod schemas for update profile and change password
```

---

## API Reference

Base URL: `http://localhost:8000`

### Auth — `/api/auth`

No authentication required on any auth route.

#### `POST /api/auth/register`

Create a new user account. Sends a verification email.

**Request body**
```json
{
  "username": "paulanderson",
  "email": "paul@company.com",
  "password": "SecurePass1!"
}
```

**Validation**
- `username` — minimum 3 characters
- `email` — valid email format
- `password` — minimum 8 characters

**Response `201`**
```json
{
  "message": "Registration successful. Please check your email to verify your account.",
  "user": {
    "id": "...",
    "username": "paulanderson",
    "email": "paul@company.com",
    "emailVerified": false
  }
}
```

---

#### `POST /api/auth/login`

Authenticate and receive an access token. Requires email to be verified.

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

#### `POST /api/auth/verify-email`

Verify an email address using the token from the verification email.

**Request body**
```json
{ "token": "<verification-token>" }
```

**Response `200`**
```json
{ "message": "Email verified successfully." }
```

---

#### `POST /api/auth/resend-verification`

Resend a verification email for an unverified account.

**Request body**
```json
{ "email": "paul@company.com" }
```

**Response `200`**
```json
{ "message": "Verification email sent." }
```

---

#### `POST /api/auth/forgot-password`

Request a password reset email. Always returns `200` regardless of whether the email exists (prevents user enumeration).

**Request body**
```json
{ "email": "paul@company.com" }
```

**Response `200`**
```json
{ "message": "If an account with that email exists, a password reset link has been sent." }
```

---

#### `POST /api/auth/reset-password`

Set a new password using the token from the reset email.

**Request body**
```json
{
  "token": "<reset-token>",
  "password": "NewSecurePass1!"
}
```

**Response `200`**
```json
{ "message": "Password reset successful." }
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
{ "username": "newusername" }
```

**Validation**
- `username` — minimum 3 characters (optional)
- `email` — valid email format (optional)
- Extra fields are rejected (`.strict()`)
- At least one field must be present

**Response `200`** — updated profile (same shape as `GET /api/profile`)

---

#### `PATCH /api/profile/password`

Change the current user's password. Requires the existing password.

**Request body**
```json
{
  "currentPassword": "OldPass1!",
  "newPassword": "NewPass1!"
}
```

**Response `200`**
```json
{ "message": "Password updated successfully." }
```

---

## Authentication

The API uses short-lived JWT access tokens (default TTL: 15 minutes).

**Token format:** `Authorization: Bearer <token>`

The `authenticate` middleware:
1. Reads the `Authorization` header.
2. Verifies the token against `JWT_SECRET`.
3. Attaches `req.user = { id: payload.sub }` for use in controllers.
4. Returns `401` with a distinct message for expired vs. invalid tokens.

> There is no refresh token mechanism. Clients re-authenticate when the token expires.

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
| Email delivery failure | `500` | Generic message — provider details never exposed |
| Unhandled server error | `500` | Generic message |

---

## Data Models

**User** (collection: `users`)

| Field | Type | Constraints |
|---|---|---|
| `username` | String | Required, unique |
| `email` | String | Required, unique |
| `passwordHash` | String | Required — bcrypt hash (salt rounds: 10) |
| `emailVerified` | Boolean | Default `false` |
| `createdAt` | Date | Auto (Mongoose timestamps) |
| `updatedAt` | Date | Auto (Mongoose timestamps) |

`passwordHash` is excluded from all profile responses via `.select("-passwordHash")`.

**AuthToken** (collection: `authtokens`)

| Field | Type | Notes |
|---|---|---|
| `userId` | ObjectId | Ref to User |
| `token` | String | Hashed token value |
| `type` | String | `"email_verification"` or `"password_reset"` |
| `expiresAt` | Date | TTL — 24h for verification, 1h for reset |

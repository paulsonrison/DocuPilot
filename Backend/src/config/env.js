"use strict";

require("dotenv").config();

// ---------------------------------------------------------------------------
// Required variable validation
// Fail fast at startup so a missing secret is never a runtime surprise.
// ---------------------------------------------------------------------------
const REQUIRED = ["MONGO_URI", "JWT_SECRET"];

const missing = REQUIRED.filter((key) => !process.env[key]);

if (missing.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missing.join(", ")}\n` +
      "Check your .env file against .env.example."
  );
}

// ---------------------------------------------------------------------------
// Exported configuration object
// All application code should import this module instead of reading
// process.env directly so that environment concerns stay in one place.
// ---------------------------------------------------------------------------
const config = {
  port: Number(process.env.PORT) || 8000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "15m",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
};

module.exports = config;

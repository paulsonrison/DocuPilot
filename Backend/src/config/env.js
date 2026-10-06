require("dotenv").config();

// ---------------------------------------------------------------------------
// Required in all environments
// ---------------------------------------------------------------------------
const required = ["MONGO_URI", "JWT_SECRET", "RESEND_API_KEY", "EMAIL_FROM"];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
module.exports = {
  port: Number(process.env.PORT) || 8000,

  nodeEnv: process.env.NODE_ENV || "development",

  mongoUri: process.env.MONGO_URI,

  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "15m",

  // Email
  resendApiKey: process.env.RESEND_API_KEY,
  emailFrom: process.env.EMAIL_FROM,

  // Development recipient override.
  // When set and NODE_ENV is not "production", all outgoing emails
  // are redirected to this address instead of the actual user email.
  // This lets you test the full Resend flow without a custom domain.
  // Leave empty (or unset) in production — it is intentionally ignored there.
  devEmailRecipient: process.env.DEV_EMAIL_RECIPIENT || "",

  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
};

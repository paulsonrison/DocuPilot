const { z } = require("zod");

const verifyEmailSchema = z.object({
  token: z
    .string()
    .min(1, "Verification token is required")
});

const resendVerificationSchema = z.object({
  email: z.string().email("Please provide a valid email address")
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Please provide a valid email address")
});

module.exports = {
  verifyEmailSchema,
  resendVerificationSchema,
  forgotPasswordSchema
};
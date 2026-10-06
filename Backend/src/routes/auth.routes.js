const express = require("express");

const router = express.Router();

const {
  register,
  login,
  verifyEmail,
  resendVerification,
  forgotPasswordRequest,
  resetPasswordRequest
} = require("../controllers/auth.controller");

const {
  registerSchema,
  loginSchema,
  resetPasswordSchema
} = require("../validators/auth.validator");

const {
  verifyEmailSchema,
  resendVerificationSchema,
  forgotPasswordSchema
} = require("../validators/email.validator");

const { validate } = require("../middleware/validate.middleware");

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/verify-email", validate(verifyEmailSchema), verifyEmail);
router.post(
  "/resend-verification",
  validate(resendVerificationSchema),
  resendVerification,
);
router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  forgotPasswordRequest
);
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  resetPasswordRequest
);

module.exports = router;

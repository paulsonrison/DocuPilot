const config = require("../config/env");
const AppError = require("../errors/app.error");
const HTTP_STATUS = require("../constants/http-status");

const { sendEmail: resendSend } = require("../emails/providers/resend.provider");

/**
 * Resolves the actual email recipient.
 *
 * In development, Resend only delivers to addresses you have
 * verified in your Resend account. DEV_EMAIL_RECIPIENT captures
 * all outgoing emails to a single verified address so the full
 * auth flow can be tested without a custom domain.
 *
 * In production this override is intentionally ignored — emails
 * always go to the actual user.
 *
 *   development  →  config.devEmailRecipient
 *   production   →  the user's own email address
 *
 * @param {string} userEmail  The email address belonging to the user.
 * @returns {string}          The address Resend should deliver to.
 */
const resolveRecipient = (userEmail) => {
  if (config.nodeEnv !== "production" && config.devEmailRecipient) {
    return config.devEmailRecipient;
  }
  return userEmail;
};

/**
 * Sends an email through Resend.
 *
 * The caller (e.g. auth.service.js) passes the user's actual email
 * address. Recipient resolution happens here so authentication logic
 * never needs to know about the development override.
 *
 *   await sendEmail({ to: user.email, subject, html });
 *
 * @param {{ to: string, subject: string, html: string, text?: string }} options
 */
const sendEmail = async ({ to, subject, html, text }) => {
  const recipient = resolveRecipient(to);

  try {
    await resendSend({ to: recipient, subject, html, text });
  } catch (err) {
    // Log the provider-level error server-side only.
    // The raw message (e.g. Resend API details) is never
    // forwarded to the client.
    console.error(`[email.service] Failed to send email to ${recipient}:`, err.message);

    throw new AppError(
      "Failed to send email. Please try again later.",
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }
};

module.exports = {
  sendEmail,
};

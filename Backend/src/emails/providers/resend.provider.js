const { Resend } = require("resend");

const config = require("../../config/env");

const client = new Resend(config.resendApiKey);

/**
 * Sends an email through the Resend API.
 *
 * The recipient (`to`) and sender address (`from`) are already
 * resolved by the time this function is called — this module is
 * responsible only for the transport layer.
 *
 * @param {{ to: string, subject: string, html: string, text?: string }} options
 */
const sendEmail = async ({ to, subject, html, text }) => {
  const { data, error } = await client.emails.send({
    from: config.emailFrom,
    to,
    subject,
    html,
    ...(text ? { text } : {}),
  });

  if (error) {
    throw new Error(`Resend delivery failed: ${error.message}`);
  }

  return data;
};

module.exports = {
  sendEmail,
};

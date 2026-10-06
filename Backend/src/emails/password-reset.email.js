const config = require("../config/env");

const createPasswordResetEmail = ({
  username,
  token
}) => {
  const resetUrl =
    `${config.frontendUrl}/reset-password?token=${token}`;

  return {
    subject: "Reset your DocuPilot password",

    html: `
      <h1>Password Reset</h1>

      <p>
        Hi ${username},
      </p>

      <p>
        We received a request to reset your DocuPilot password.
      </p>

      <p>
        <a href="${resetUrl}">
          Reset my password
        </a>
      </p>

      <p>
        This link will expire in 1 hour.
      </p>

      <p>
        If you did not request a password reset,
        you can safely ignore this email.
      </p>
    `
  };
};

module.exports = {
  createPasswordResetEmail
};
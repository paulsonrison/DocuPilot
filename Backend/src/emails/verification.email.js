const config = require("../config/env");

const createVerificationEmail = ({
  username,
  token
}) => {
  const verificationUrl =
    `${config.frontendUrl}/verify-email?token=${token}`;

  return {
    subject: "Verify your DocuPilot account",

    html: `
      <h1>Welcome to DocuPilot, ${username}!</h1>

      <p>
        Thanks for creating your account.
      </p>

      <p>
        Please verify your email address by clicking
        the link below:
      </p>

      <p>
        <a href="${verificationUrl}">
          Verify my email
        </a>
      </p>

      <p>
        This link will expire in 24 hours.
      </p>

      <p>
        If you did not create this account,
        you can safely ignore this email.
      </p>
    `
  };
};

module.exports = {
  createVerificationEmail
};
const crypto = require("crypto");

const AuthToken = require("../models/auth-token.model");
const { generateToken } = require("../utils/auth-token");

const createEmailVerificationToken = async (
  userId
) => {
  await AuthToken.deleteMany({
    userId,
    type: "email_verification"
  });

  const { token, tokenHash } = generateToken();

  const expiresAt = new Date(
    Date.now() + 24 * 60 * 60 * 1000
  );

  await AuthToken.create({
    userId,
    tokenHash,
    type: "email_verification",
    expiresAt
  });

  return token;
};

const findValidToken = async (
  token,
  type
) => {
  const tokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const authToken = await AuthToken.findOne({
    tokenHash,
    type,
    expiresAt: {
      $gt: new Date()
    }
  });

  return authToken;
};

const createPasswordResetToken = async (userId) => {
  await AuthToken.deleteMany({
    userId,
    type: "password_reset"
  });

  const { token, tokenHash } = generateToken();

  const expiresAt = new Date(
    Date.now() + 60 * 60 * 1000
  );

  await AuthToken.create({
    userId,
    tokenHash,
    type: "password_reset",
    expiresAt
  });

  return token;
};


module.exports = {
  createEmailVerificationToken,
  createPasswordResetToken,
  findValidToken
};
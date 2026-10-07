const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const AppError = require("../errors/app.error");
const HTTP_STATUS = require("../constants/http-status");

const { generateAccessToken } = require("../utils/jwt");

const {
  createEmailVerificationToken,
  createPasswordResetToken,
  findValidToken
} = require("./auth-token.service");

const {
  createPasswordResetEmail
} = require("../emails/password-reset.email");

const { sendEmail } = require("./email.service");

const { createVerificationEmail } = require("../emails/verification.email");

const registerUser = async (data) => {
  const { username, email, password } = data;

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new AppError(
      "Username or email already exists",
      HTTP_STATUS.CONFLICT,
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    passwordHash,
  });

  const verificationToken = await createEmailVerificationToken(user._id);

  const emailContent = createVerificationEmail({
    username: user.username,
    token: verificationToken,
  });

  await sendEmail({
    to: user.email,
    subject: emailContent.subject,
    html: emailContent.html,
  });

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    emailVerified: user.emailVerified,
  };
};

const verifyEmail = async (token) => {
  const authToken = await findValidToken(token, "email_verification");

  if (!authToken) {
    throw new AppError(
      "Invalid or expired verification link",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  const user = await User.findById(authToken.userId);

  if (!user) {
    throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
  }

  if (user.emailVerified) {
    await authToken.deleteOne();
    return;
  }

  user.emailVerified = true;
  await user.save();
  await authToken.deleteOne();
};

const loginUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
  }

  if (!user.emailVerified) {
    throw new AppError(
      "Please verify your email before logging in",
      HTTP_STATUS.FORBIDDEN,
    );
  }

  const accessToken = generateAccessToken(user._id.toString());

  return {
    user: { id: user._id, username: user.username, email: user.email },
    accessToken,
  };
};

const resendVerificationEmail = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(
      "Unable to process verification request",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  if (user.emailVerified) {
    throw new AppError("Email is already verified", HTTP_STATUS.BAD_REQUEST);
  }

  const verificationToken = await createEmailVerificationToken(user._id);

  const emailContent = createVerificationEmail({
    username: user.username,
    token: verificationToken,
  });

  await sendEmail({
    to: user.email,
    subject: emailContent.subject,
    html: emailContent.html,
  });
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    return;
  }

  const resetToken =
    await createPasswordResetToken(user._id);

  const emailContent = createPasswordResetEmail({
    username: user.username,
    token: resetToken
  });

  await sendEmail({
    to: user.email,
    subject: emailContent.subject,
    html: emailContent.html
  });
};

const resetPassword = async (token, newPassword) => {
  const authToken = await findValidToken(
    token,
    "password_reset"
  );

  if (!authToken) {
    throw new AppError(
      "Invalid or expired password reset link",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const user = await User.findById(authToken.userId);

  if (!user) {
    throw new AppError(
      "User not found",
      HTTP_STATUS.NOT_FOUND
    );
  }

  const passwordHash = await bcrypt.hash(
    newPassword,
    10
  );

  user.passwordHash = passwordHash;

  await user.save();

  await authToken.deleteOne();
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword
};
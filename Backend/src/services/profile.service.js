const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const AppError = require("../errors/app.error");
const HTTP_STATUS = require("../constants/http-status");

const getProfile = async (userId) => {
  const user = await User.findById(userId).select("-passwordHash");

  if (!user) {
    throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
  }

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const updateProfile = async (userId, data) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
  }

  const emailChanged = data.email && data.email !== user.email;

  Object.assign(user, data);

  if (emailChanged) {
    user.emailVerified = false;
  }

  await user.save();

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const changePassword = async (
  userId,
  currentPassword,
  newPassword
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(
      "User not found",
      HTTP_STATUS.NOT_FOUND
    );
  }

  const passwordMatches = await bcrypt.compare(
    currentPassword,
    user.passwordHash
  );

  if (!passwordMatches) {
    throw new AppError(
      "Current password is incorrect",
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  user.passwordHash = await bcrypt.hash(
    newPassword,
    10
  );

  await user.save();
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword
};

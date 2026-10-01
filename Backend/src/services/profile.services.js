const User = require("../models/user.models");
const AppError = require("../errors/app.error");

const getProfile = async (userId) => {
  const user = await User.findById(userId).select(
    "-passwordHash"
  );

  if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
};

const updateProfile = async (userId, data) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: data
    },
    {
      new: true,
      runValidators: true
    }
  ).select("-passwordHash");

  if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
};

module.exports = {
  getProfile,
  updateProfile
};
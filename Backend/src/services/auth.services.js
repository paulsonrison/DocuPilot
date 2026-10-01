const bcrypt = require("bcrypt");

const User = require("../models/auth.models");

const AppError = require("../errors/app.error");

const HTTP_STATUS = require("../constants/http-status");

const { generateAccessToken } = require("../utils/jwt");

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
  return {
    user,
  };
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

  const accessToken = generateAccessToken(user._id.toString());

  return {
    user: { id: user._id, username: user.username, email: user.email },
    accessToken,
  };
};

module.exports = {
  registerUser,
  loginUser,
};

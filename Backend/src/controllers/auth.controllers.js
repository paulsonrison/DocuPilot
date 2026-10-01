const { registerUser, loginUser } = require("../services/auth.services");
const HTTP_STATUS = require("../constants/http-status");

const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

    res.status(HTTP_STATUS.CREATED).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const userAuthResult = await loginUser(req.body);

    res.status(HTTP_STATUS.OK).json({
      message: "Login Successful",
      user: userAuthResult.user,
      accessToken: userAuthResult.accessToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};

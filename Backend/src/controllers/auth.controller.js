const {
  registerUser,
  loginUser,
  verifyEmail: verifyEmailService,
  resendVerificationEmail,
  forgotPassword,
  resetPassword
} = require("../services/auth.service");
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

const resendVerification = async (req, res, next) => {
  try {
    await resendVerificationEmail(req.body.email);

    res.status(HTTP_STATUS.OK).json({
      message: "Verification email sent successfully"
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    await verifyEmailService(req.body.token);

    res.status(HTTP_STATUS.OK).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

const forgotPasswordRequest = async (req, res, next) => {
  try {
    await forgotPassword(req.body.email);

    res.status(HTTP_STATUS.OK).json({
      message:
        "If an account exists for this email, a password reset link has been sent"
    });
  } catch (error) {
    next(error);
  }
};

const resetPasswordRequest = async (
  req,
  res,
  next
) => {
  try {
    await resetPassword(
      req.body.token,
      req.body.password
    );

    res.status(HTTP_STATUS.OK).json({
      message: "Password reset successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  resendVerification,
  forgotPasswordRequest,
  resetPasswordRequest
};
const {
  getProfile,
  updateProfile,
  changePassword
} = require("../services/profile.service");

const HTTP_STATUS = require("../constants/http-status");

const profile = async (req, res, next) => {
  try {
    const user = await getProfile(req.user.id);

    res.status(HTTP_STATUS.OK).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const user = await updateProfile(req.user.id, req.body);

    res.status(HTTP_STATUS.OK).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (
  req,
  res,
  next
) => {
  try {
    await changePassword(
      req.user.id,
      req.body.currentPassword,
      req.body.newPassword
    );

    res.status(HTTP_STATUS.OK).json({
      message: "Password changed successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  profile,
  update,
  updatePassword
};

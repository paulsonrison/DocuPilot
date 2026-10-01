const { getProfile,updateProfile } = require("../services/profile.services");


const profile = async (req, res, next) => {
  try {
    const user = await getProfile(req.user.id);

    res.status(200).json({
      user
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const user = await updateProfile(
      req.user.id,
      req.body
    );

    res.status(200).json({
      message: "Profile updated successfully",
      user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  profile,
  update
};
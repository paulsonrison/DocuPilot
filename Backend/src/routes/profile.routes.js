const express = require("express");

const {
  profile,
  update,
  updatePassword,
} = require("../controllers/profile.controller");

const { authenticate } = require("../middleware/auth.middleware");
const { validate } = require("../middleware/validate.middleware");
const {
  updateProfileSchema,
  changePasswordSchema,
} = require("../validators/profile.validator");

const router = express.Router();

router.get("/", authenticate, profile);
router.patch("/", authenticate, validate(updateProfileSchema), update);
router.patch(
  "/password",
  authenticate,
  validate(changePasswordSchema),
  updatePassword,
);
module.exports = router;

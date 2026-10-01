const express = require("express");

const { profile, update } = require("../controllers/profile.controllers");
const { authenticate } = require("../middleware/auth.middleware");
const { validate } = require("../middleware/validate.middleware");
const { updateProfileSchema } = require("../validators/profile.validator");

const router = express.Router();

router.get("/", authenticate, profile);

router.patch("/", authenticate, validate(updateProfileSchema), update);

module.exports = router;

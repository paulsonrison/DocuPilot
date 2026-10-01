const express = require("express");

const router = express.Router();

const { register, login } = require("../controllers/auth.controllers");
const {
  registerValidator,
  loginValidator,
} = require("../validators/auth.validator");
const { validate } = require("../middleware/validate.middleware");

router.post("/register", validate(registerValidator), register);
router.post("/login", validate(loginValidator), login);

module.exports = router;

const jwt = require("jsonwebtoken");

const config = require("../config/env");

const generateAccessToken = (userId) => {
  return jwt.sign(
    { sub: userId },       // payload
    config.jwtSecret,      // secret
    { expiresIn: config.jwtExpiresIn } // options
  );
};

module.exports = {
  generateAccessToken,
};

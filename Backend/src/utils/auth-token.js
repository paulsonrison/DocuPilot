const crypto = require("crypto");

const generateToken = () => {
  const token = crypto.randomBytes(32).toString("hex");

  const tokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  return {
    token,
    tokenHash
  };
};

module.exports = {
  generateToken
};

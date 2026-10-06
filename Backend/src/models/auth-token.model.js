const mongoose = require("mongoose");

const authTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    tokenHash: {
      type: String,
      required: true,
      unique: true
    },

    type: {
      type: String,
      enum: [
        "email_verification",
        "password_reset"
      ],
      required: true
    },

    expiresAt: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const AuthToken = mongoose.model(
  "AuthToken",
  authTokenSchema
);

module.exports = AuthToken;
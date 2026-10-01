const jwt = require("jsonwebtoken");

const AppError = require("../errors/app.error");
const config = require("../config/env");

const authenticate = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new AppError(
        "Authentication required",
        401
      );
    }

    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new AppError(
        "Invalid authentication format",
        401
      );
    }

    const payload = jwt.verify(
      token,
      config.jwtSecret
    );

    req.user = {
      id: payload.sub
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(
        new AppError(
          "Authentication token has expired",
          401
        )
      );
    }

    if (error.name === "JsonWebTokenError") {
      return next(
        new AppError(
          "Invalid authentication token",
          401
        )
      );
    }

    next(error);
  }
};

module.exports = {
  authenticate
};
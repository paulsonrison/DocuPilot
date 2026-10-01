const HTTP_STATUS = require("../constants/http-status");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Database validation failed",
      errors: Object.values(err.errors).map((error) => ({
        field: error.path,
        message: error.message,
      })),
    });
  }

  // MongoDB duplicate key error
  if (err.code === 11000) {
    const fields = Object.keys(err.keyValue || {});

    return res.status(HTTP_STATUS.CONFLICT).json({
      message: "A user with the provided information already exists",
      fields,
    });
  }

  // Invalid MongoDB ObjectId or other cast error
  if (err.name === "CastError") {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Invalid value provided",
    });
  }

  if (err.statusCode) {
    const response = {
      message: err.message,
    };

    if (err.errors) {
      response.errors = err.errors;
    }

    return res.status(err.statusCode).json(response);
  }

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error",
  });
};

module.exports = {
  errorHandler,
};

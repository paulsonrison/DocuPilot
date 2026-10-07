const AppError = require("../errors/app.error");
const HTTP_STATUS = require("../constants/http-status");

const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const error = new AppError("Validation failed", HTTP_STATUS.BAD_REQUEST);

      error.errors = result.error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      }));

      return next(error);
    }

    req.body = result.data;

    next();
  };
};

module.exports = {
  validate,
};

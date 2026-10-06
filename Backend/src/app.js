const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const config = require("./config/env");

const apiRoutes = require("./routes/index.routes");
const { errorHandler } = require("./middleware/error.middleware");
const { apiRateLimiter } = require("./middleware/rate-limit.middleware");

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: config.corsOrigin,
  }),
);

app.use(
  express.json({
    limit: "1mb",
  }),
);

app.use("/api", apiRateLimiter);

app.use("/api", apiRoutes);

app.use(errorHandler);

module.exports = app;

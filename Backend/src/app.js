const express = require("express");

const app = express();

const authRouter = require("./routes/auth.routers");
const {errorHandler} = require("./middleware/error.middleware");
const profileRoutes = require("./routes/profile.routers");


app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRoutes);

app.use(errorHandler);

module.exports = app;

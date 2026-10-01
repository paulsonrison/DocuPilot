const mongoose = require("mongoose");

const config = require("./env");

const connectDatabase = async () => {
  await mongoose.connect(config.mongoUri);

  console.log("MongoDB Connected");
};

module.exports = connectDatabase;

const config = require("./config/env");

const app = require("./app");

const connectDatabase = require("./config/database");

const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(config.port, () => {
      console.log(`Server running on port: ${config.port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();

const app = require("./app");
const { connectToDB } = require("./utils/db");
const config = require("./utils/config");
const logger = require("./utils/logger");

connectToDB().then(() => {
  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
  });
});

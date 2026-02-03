require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL, {
  logging: console.log,
});

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    return process.exit(1);
  }

  return null;
};

module.exports = { sequelize, connectToDB };

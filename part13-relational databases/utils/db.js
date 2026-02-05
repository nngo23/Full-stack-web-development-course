const { Umzug, SequelizeStorage } = require("umzug");
const { Sequelize } = require("sequelize");
const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions:
    process.env.NODE_ENV === "production"
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
});

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("Connected to the database successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    return process.exit(1);
  }

  return null;
};
const migrationConfiguration = {
  migrations: {
    glob: "migrations/*.js",
  },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
};
const runMigrations = async () => {
  const umzug = new Umzug(migrationConfiguration);
  const migrations = await umzug.up();
  console.log("Migrations up to date", {
    files: migrations.map((m) => m.name),
  });
};
const revertLastMigration = async () => {
  await sequelize.authenticate();
  const umzug = new Umzug(migrationConfiguration);
  await umzug.down();
};

module.exports = { sequelize, connectToDB, revertLastMigration };

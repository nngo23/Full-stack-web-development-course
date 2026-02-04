const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("sessions", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    });

    await queryInterface.addConstraint("sessions", {
      fields: ["user_id", "token"],
      type: "unique",
      name: "unique_user_token",
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("sessions");
  },
};

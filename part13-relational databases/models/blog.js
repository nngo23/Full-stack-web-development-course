const { Sequelize, Model, DataTypes } = require("sequelize");

const { sequelize } = require("../utils/db");

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: { args: 1991, msg: "year must be at least 1991" },
        max(value) {
          const currentYear = new Date().getFullYear();
          if (value > currentYear) {
            throw new Error(`year cannot be greater than ${currentYear}`);
          }
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    tableName: "blogs",
    modelName: "blog",
  },
);

module.exports = Blog;

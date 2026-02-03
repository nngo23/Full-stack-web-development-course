const authorsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { fn, col, literal } = require("sequelize");

authorsRouter.get("/", async (request, response) => {
  try {
    const authors = await Blog.findAll({
      attributes: [
        "author",
        [Blog.sequelize.fn("COUNT", Blog.sequelize.col("id")), "articles"],
        [Blog.sequelize.fn("SUM", Blog.sequelize.col("likes")), "likes"],
      ],

      group: ["author"],
      order: [[Blog.sequelize.literal("likes"), "DESC"]],
    });
    response.json(authors);
  } catch (error) {
    next(error);
  }
});

module.exports = authorsRouter;

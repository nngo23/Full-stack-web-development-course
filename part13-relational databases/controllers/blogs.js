const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const userExtractor = require("../middleware/userExtractor");
const tokenExtractor = require("../middleware/tokenExtractor");
const { Op } = require("sequelize");

blogsRouter.get("/", async (request, response) => {
  try {
    const where = {};

    if (request.query.search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${request.query.search}%` } },
        { author: { [Op.iLike]: `%${request.query.search}%` } },
      ];
    }
    const blogs = await Blog.findAll({
      where,
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        attributes: { exclude: ["id"] },
      },
      order: [["likes", "DESC"]],
    });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

const blogFinder = async (req, res, next) => {
  const updatedBlog = await Blog.findByPk(req.params.id);

  if (!updatedBlog) {
    const error = new Error("Blog not found");
    error.name = "NotFoundError";
    throw error;
  }
  req.blog = updatedBlog;
  next();
};

blogsRouter.get("/:id", blogFinder, async (req, res) => {
  res.json(req.blog);
});

blogsRouter.post("/", userExtractor, tokenExtractor, async (req, res) => {
  try {
    const { title, author, url, likes } = req.body;

    if (!title || !url) {
      const error = new Error("title and url are required");
      error.name = "ValidationError";
      throw error;
    }

    if (!req.user) {
      const error = new Error("Token missing or invalid");
      error.name = "JsonWebTokenError";
      throw error;
    }

    const newBlog = await Blog.create({
      author,
      title,
      url,
      likes: likes || 0,
      userId: req.user.id,
    });
    res.status(201).json(newBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete(
  "/:id",
  blogFinder,
  tokenExtractor,
  userExtractor,
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "token missing or invalid" });
      }

      if (req.blog.userId === req.user.id) {
        await Blog.destroy({ where: { id: req.params.id } });
        res.status(204).end();
      } else {
        res.status(403).json({ error: "Only the creator can delete the blog" });
      }
    } catch (error) {
      next(error);
    }
  },
);

blogsRouter.put("/:id", blogFinder, async (request, response) => {
  if (typeof request.body.likes !== "number") {
    const error = new Error("likes must be a number");
    error.name = "ValidationError";
    throw error;
  }

  request.blog.likes = request.body.likes;
  await request.blog.save();

  response.json(request.blog);
});

module.exports = blogsRouter;

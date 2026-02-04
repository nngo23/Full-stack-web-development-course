const usersRouter = require("express").Router();
const { User, Blog } = require("../models");
const tokenExtractor = require("../middleware/tokenExtractor");
const userExtractor = require("../middleware/userExtractor");

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog,
        attributes: { exclude: ["userId"] },
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:id", async (req, res, next) => {
  try {
    const where = {};

    if (req.query.read === "true") {
      where.read = true;
    }

    if (req.query.read === "false") {
      where.read = false;
    }

    const user = await User.findByPk(req.params.id, {
      attributes: ["name", "username"],
      include: [
        {
          model: Blog,
          as: "readings",
          attributes: ["id", "url", "title", "author", "likes", "year"],
          through: {
            attributes: ["read", "id"],
            where: Object.keys(where).length ? where : undefined,
          },
        },
      ],
    });
    if (!user) {
      const error = new Error("user not found");
      error.name = "NotFoundError";
      throw error;
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (req, res, next) => {
  try {
    const { username, name } = req.body;

    if (!username || !name) {
      const error = new Error("username and name are required");
      error.name = "ValidationError";
      throw error;
    }

    const user = await User.create({ username, name });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.put(
  "/:username",
  tokenExtractor,
  userExtractor,
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "token missing or invalid" });
      }
      if (req.params.username !== req.user.username) {
        return res.status(403).json({ error: "forbidden" });
      }
      const user = await User.findOne({
        where: { username: req.params.username },
      });
      if (!user) {
        const error = new Error("user not found");
        error.name = "NotFoundError";
        throw error;
      }
      await user.update(req.body.name);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = usersRouter;

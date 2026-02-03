const usersRouter = require("express").Router();

const { User, Blog } = require("../models");

usersRouter.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] },
    },
  });
  res.json(users);
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

usersRouter.put("/:username", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });
    if (!user) {
      const error = new Error("user not found");
      error.name = "NotFoundError";
      throw error;
    }
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;

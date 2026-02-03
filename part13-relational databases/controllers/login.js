const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const { User } = require("../models");

loginRouter.post("/", async (req, res, next) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      const error = new Error("invalid username or password");
      error.name = "ValidationError";
      throw error;
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
      expiresIn: 60 * 60,
    });

    res.status(200).send({ token, username: user.username, name: user.name });
  } catch (err) {
    next(err);
  }
});
module.exports = loginRouter;

const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();
const { User, Session } = require("../models");

loginRouter.post("/", async (req, res, next) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    if (!user || user.disabled) {
      return res.status(401).json({ error: "invalid credentials" });
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
      expiresIn: 60 * 60,
    });
    await Session.create({ userId: user.id, token: token });
    res.status(200).send({ token, username: user.username, name: user.name });
  } catch (err) {
    next(err);
  }
});
module.exports = loginRouter;

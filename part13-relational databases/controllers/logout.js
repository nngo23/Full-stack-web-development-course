const logoutRouter = require("express").Router();
const { Session } = require("../models");
const userExtractor = require("../middleware/userExtractor");

logoutRouter.delete("/", userExtractor, async (req, res) => {
  const token = req.token;
  if (!token) {
    return res.status(401).json({ error: "token missing" });
  }
  await Session.destroy({ where: { token } });
  res.status(200).send({ message: "logged out successfully" });
});

module.exports = logoutRouter;

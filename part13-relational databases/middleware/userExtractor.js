const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Session = require("../models/session");

const userExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
    let decodedToken;
    try {
      decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ error: "invalid or expired token" });
    }
    if (!decodedToken.id) {
      return res.status(401).json({ error: "invalid token" });
    }

    const session = await Session.findOne({ where: { token: req.token } });
    if (!session) {
      return res.status(401).json({ error: "session expired" });
    }

    req.user = await User.findByPk(decodedToken.id);
    if (!req.user || req.user.disabled) {
      return res.status(401).json({ error: "disabled user" });
    }
  } else {
    req.user = null;
    req.token = null;
  }

  next();
};

module.exports = userExtractor;

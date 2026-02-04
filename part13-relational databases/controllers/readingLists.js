const readinglistsRouter = require("express").Router();
const tokenExtractor = require("../middleware/tokenExtractor");
const userExtractor = require("../middleware/userExtractor");
const { ReadingList } = require("../models");

readinglistsRouter.post(
  "/",
  userExtractor,
  tokenExtractor,
  async (req, res, next) => {
    try {
      const { blogId, userId } = req.body;

      if (!blogId || !userId) {
        const error = new Error("blogId and userId are required");
        error.name = "ValidationError";
        throw error;
      }

      const readingList = await ReadingList.create({
        blogId,
        userId,
        read: false,
      });
      res.json(readingList);
    } catch (error) {
      next(error);
    }
  },
);

readinglistsRouter.put(
  "/:id",
  tokenExtractor,
  userExtractor,
  async (req, res, next) => {
    try {
      if (typeof req.body.read !== "boolean") {
        const error = new Error("read must be a boolean");
        error.name = "ValidationError";
        throw error;
      }

      const readingList = await ReadingList.findByPk(req.params.id);
      if (!readingList) {
        const error = new Error("reading list not found");
        error.name = "NotFoundError";
        throw error;
      }
      if (!req.user) {
        return res.status(401).json({ error: "token missing or invalid" });
      }

      if (readingList.userId === req.user.id) {
        readingList.read = req.body.read;
        await readingList.save();
        res.json(readingList);
      } else {
        res.status(403).json({ error: "Cannot update others' reading lists" });
      }
    } catch (error) {
      next(error);
    }
  },
);

module.exports = readinglistsRouter;

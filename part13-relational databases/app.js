const express = require("express");
const cors = require("cors");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const authorsRouter = require("./controllers/authors");
const readinglistsRouter = require("./controllers/readingLists");
const logoutRouter = require("./controllers/logout");
const tokenExtractor = require("./middleware/tokenExtractor");
const userExtractor = require("./middleware/userExtractor");

const app = express();

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(tokenExtractor);
app.use(userExtractor);
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/readinglists", readinglistsRouter);
app.use("/api/logout", logoutRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

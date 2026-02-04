const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "SequelizeUniqueConstraintError" ||
    error.name === "SequelizeValidationError"
  ) {
    return response.status(400).json({
      error: error.errors.map((e) => e.message),
    });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: error.message });
  } else if (error.name === "NotFoundError") {
    return response.status(404).json({ error: error.message });
  }

  response.status(500).json({ error: "internal server error" });
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};

const express = require("express");
const logger = require("./src/utils/logger");
const cookieParser = require("cookie-parser");

// create express app
const app = express();
require("dotenv").config();

// parse requests of content-type - application/json
app.use(express.json());
app.use(cookieParser());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// helmet for setting various HTTP headers for app security
const helmet = require("helmet");
app.use(helmet());
app.disable("x-powered-by");

// cors settings;
const cors = require("cors");
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : [],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

// PORT
const PORT = process.env.PORT || 3000;

app.get("/ping", (req, res, next) => {
  try {
    res.status(200).json({ message: "pong" });
  } catch (error) {
    next(error);
  }
});

// injecting redis client in req object
const { connectRedis, redisClient } = require("./src/config/redis");
app.use(async (req, res, next) => {
  try {
    await connectRedis();
    req.redisClient = redisClient;
    next();
  } catch (error) {
    next(error);
  }
});

app.use("/api", require("./src/controllers/external"));
app.use("/api", require("./src/controllers/internal"));

const { errorHandling } = require("./src/middleware");

// Error handling middleware (must be after routes)
app.use(errorHandling);

process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
});
process.on("unhandledRejection", (err) =>
  logger.error("unhandled Rejection:", err.message)
);

connectRedis()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Auth service is running on port ${PORT}.`);
    });
  })
  .catch((err) =>
    logger.error("Failed to start server due to redis error:", err.message)
  );

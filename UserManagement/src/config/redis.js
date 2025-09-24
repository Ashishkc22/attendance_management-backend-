const redis = require("redis");
const logger = require("../utils/logger");

console.log("Redis Client connected to:", process.env.REDIS_URL);

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
  socket: {
    reconnectStrategy: function (retries) {
      if (retries > 10) {
        return new Error("Redis retry limit reached");
      }
      return Math.min(retries * 100, 3000); // reconnect after.
    },
    connectTimeout: 5000, // 5 seconds
  },
});

redisClient.on("connect", () => logger.info("Redis client connected"));
redisClient.on("error", (err) => logger.error("Redis Client Error", err));

async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}

module.exports = {
  redisClient,
  connectRedis,
};

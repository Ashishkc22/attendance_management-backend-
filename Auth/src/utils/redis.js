const { redisClient } = require("../config/redis");

class redisCache {
  static async set(
    key,
    value,
    expiryInSec = 100 * 60 * 60 // default 1 hour
  ) {
    try {
      await redisClient.set(key, JSON.stringify(value), { EX: expiryInSec });
    } catch (err) {
      throw err;
    }
  }
  static async get(key) {
    try {
      return JSON.parse(await redisClient.get(key));
    } catch (error) {
      throw error;
    }
  }
  static async del(key) {
    try {
      return await redisClient.del(key);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = redisCache;

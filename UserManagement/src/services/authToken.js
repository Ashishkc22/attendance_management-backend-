const axios = require("axios");
const { redisClient } = require("../config/redis");

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const authServiceUrl = process.env.AUTH_SERVICE_URL;

async function getAuthToken() {
  try {
    let token = await redisClient.get("service:auth:token");
    if (!token) {
      const res = await axios.post(`${authServiceUrl}/api/token`, {
        client_id,
        client_secret,
      });
      await redisClient.set(`service:auth:token`, res.data.data.accessToken);
      return res.data.data.accessToken;
    } else {
      return token;
    }
  } catch (error) {
    throw error;
  }
}

module.exports = getAuthToken;

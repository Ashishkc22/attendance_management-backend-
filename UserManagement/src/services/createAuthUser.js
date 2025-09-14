const axios = require("axios");
const { redisClient } = require("../config/redis");
const authToken = require("./authToken");

const AUTH_URL = process.env.AUTH_SERVICE_URL;

async function createAuthUser(data) {
  const token = await authToken();

  const res = await axios.post(
    `${AUTH_URL}/api/createUser`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.data; // { id, email, role }
}

module.exports = createAuthUser;

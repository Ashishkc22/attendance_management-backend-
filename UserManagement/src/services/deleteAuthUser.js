const axios = require("axios");
const authToken = require("./authToken");

const AUTH_URL = process.env.AUTH_SERVICE_URL;

async function deleteAuthUser(userId) {
  const token = await authToken();

  const res = await axios.delete(
    `${AUTH_URL}/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data; // { id, email, role }
}

module.exports = deleteAuthUser;

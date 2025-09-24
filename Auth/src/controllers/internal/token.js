const verifyClientInfo = require("../../services/verifyClientInfo");
const { generateToken } = require("../../utils/token");

async function getAuthToken(req, res, next) {
  try {
    const { client_id, client_secret } = req.body;
    if (!client_id || !client_secret) {
      throw new Error("Client id and client secret is required.");
    }

    const isClientInfoValid = await verifyClientInfo(client_id, client_secret);
    if (!isClientInfoValid) {
      return req.status(401).json({
        message: "Invalid credentials.",
      });
    }

    const token = generateToken({ client_id }, undefined, false);

    return res.status(200).json({
      data: {
        accessToken: token.accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getAuthToken;

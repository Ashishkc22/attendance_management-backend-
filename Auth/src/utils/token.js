const jwt = require("jsonwebtoken");
const JWT_PRIVATE_KEY = process.env.JWT_TOKEN_PRIVATE_KEY;
const JWT_PUBLIC_KEY = process.env.JWT_TOKEN_PUBLIC_KEY;

function generateToken(payload, expiresIn = "1h", generateRefreshtoken = true) {
  const accessToken = jwt.sign(payload, JWT_PRIVATE_KEY, {
    algorithm: "RS256",
    expiresIn,
  });
  if (generateRefreshtoken) {
    const refreshToken = jwt.sign(payload, JWT_PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: "7d",
    });
    return { accessToken, refreshToken };
  }
  return { accessToken };
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    return decoded;
  } catch (error) {
    return false;
  }
}

module.exports = { generateToken, verifyToken };

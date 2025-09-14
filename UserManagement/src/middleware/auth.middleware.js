// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_TOKEN_PUBLIC_KEY; // Load from .env in production

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expecting: Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ["RS256"],
    });
    req.user = decoded; // Attach payload (user info) to request
    next(); // Proceed to next middleware or route
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticateToken;

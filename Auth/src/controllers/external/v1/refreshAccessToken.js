const { verifyToken, generateToken } = require("../../../utils/token");

function refreshAccesstoken(req, res, next) {
  try {
    const refreshtoken = req.cookies?.refrshToken;

    if (!refreshtoken) {
      return res.status(401).json({
        error: {
          message: "Missing refresh token.",
        },
      });
    }
    const decoded = verifyToken(refreshtoken);
    if (!decoded) {
      return res.status(403).json({
        error: {
          message: "Invalid or expired refresh token.",
        },
      });
    }

    const { accessToken } = generateToken({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });
    res.status(200).json({
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = refreshAccesstoken;

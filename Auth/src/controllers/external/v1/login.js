const getUserDetails = require("../../../services/getUserDetails");
const { comparePassword } = require("../../../utils/hash");
const { generateToken } = require("../../../utils/token");
const getRolesAndPermissions = require("../../../services/getRolesAndPermissions");
const { redisClient } = require("../../../config/redis");
const redisCache = require("../../../utils/redis");

async function setPermissionsAndRefreshTokenInRedis({
  rolesAndPermissions,
  refreshToken,
  userId,
}) {
  try {
    const flatPermissions = rolesAndPermissions
      .map((rp) => rp.permissions.name)
      .flat();
    await redisCache.set(
      `user:${userId}:permissions`,
      flatPermissions,
      7 * 27 * 60 * 60
    ); // 7 days
    await redisCache.set(
      `user:${userId}:refreshToken`,
      refreshToken,
      7 * 27 * 60 * 60
    ); // 7 days
  } catch (error) {
    throw error;
  }
}

async function login(req, res, next) {
  try {
    // check is user exists in db
    const userDetails = await getUserDetails({ email: req.body.email });

    if (!userDetails) {
      return res.status(401).json({ message: "User does not exists" });
    }

    // match password
    if (!comparePassword(req.body.password, userDetails.password)) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // generate access and refrsh tokens
    const { accessToken, refreshToken } = generateToken({
      id: userDetails.id,
      email: userDetails.email,
      role: userDetails.role,
    });
    // store refresh token and users permissions in redis for quick access
    const rolesAndPermissions = await getRolesAndPermissions(userDetails.id);

    // set roles, permissions and refresh token in redis
    await setPermissionsAndRefreshTokenInRedis({
      rolesAndPermissions,
      refreshToken,
      userId: userDetails.id,
    });

    res.cookie("refrshToken_auth", refreshToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days,
      path: "/api/v1/refresh-access-token",
    });

    return res.status(200).json({
      data: {
        accessToken, // send access token in in memory at frontend,
        refreshToken,
        role: userDetails.role
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = login;

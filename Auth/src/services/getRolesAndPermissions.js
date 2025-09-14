const { prisma } = require("../config/db");
const logger = require("../utils/logger");

module.exports = async function getUsersRolesAndPermissions(userId) {
  try {
    if (!userId) throw new Error("User ID is required.");

    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        rolesPermission: {
          select: {
            roles: {
              select: {
                id: true,
                name: true,
              },
            },
            permissions: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!user) throw new Error("User not found.");

    return user.rolesPermission || [];
  } catch (error) {
    logger.error("Error in getRolesAndPermissions service:", error);
    throw error;
  }
};

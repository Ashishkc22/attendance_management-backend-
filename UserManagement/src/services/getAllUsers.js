const { prisma } = require("../config/db");
const logger = require("../utils/logger");

async function getAllUsers() {
  try {
    const users = await prisma.userProfile.findMany({
      select: {
        id: true,
        first_name: true,
        middle_name: true,
        last_name: true,
        email: true,
        role: true,
        createdAt: true
      },
      orderBy: {
        first_name: "asc",
      },
    });
    return users;
  } catch (error) {
    logger.error("DB Error (getAllClasses):", error);
    throw error;
  }
}
module.exports = getAllUsers;

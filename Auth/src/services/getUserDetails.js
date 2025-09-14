const { prisma } = require("../config/db");

/**
 * check if user exists in db
 * @param {Object} params - input parameters
 * @param {String} params.email - email of the user to check
 * @return {Object} user Object true if user exists, false otherwise
 * @return {String} user.id - id of user
 * @return {String} user.email - email of user
 * @return {String} user.password - hased password of user
 * @return {String} user.role - role of user
 * @throws {Error} if any error occurs during the process
 */

module.exports = async function getUserDetails({ email }) {
  try {
    if (!email) throw new Error("Email is required.");

    const user = await prisma.users.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        is_active: true,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

const { prisma } = require("../config/db");

async function userDetails({ email }) {
  try {
    const userDetails = await prisma.userProfile.findFirst({
      where: {
        email,
      },
    });
    return userDetails;
  } catch (error) {
    throw error;
  }
}

module.exports = userDetails;

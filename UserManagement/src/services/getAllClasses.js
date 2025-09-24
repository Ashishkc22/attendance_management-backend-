const { prisma } = require("../config/db")
const logger = require("../utils/logger")

 async function getAllClasses() {
  try {
    const classes = await prisma.classDetails.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    })

    return classes
  } catch (error) {
    logger.error("DB Error (getAllClasses):", error)
    throw error
  }
}
module.exports = getAllClasses

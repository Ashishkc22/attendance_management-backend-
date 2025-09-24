const { prisma } = require("../config/db")
const logger = require("../utils/logger")

 async function getAllDepartment() {
  try {
    const classes = await prisma.Department.findMany({
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
    logger.error("DB Error (Department):", error)
    throw error
  }
}
module.exports = getAllDepartment

const getAllDepartment = require("../../../../services/getAllDepartment");

 async function getAllDepartmentHandler(_, res) {
  try {
    const result = await getAllDepartment();

    return res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
        message: "Failed to get department"
    });
  }
}

module.exports = getAllDepartmentHandler

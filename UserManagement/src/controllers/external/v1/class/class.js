// pages/api/classes/index.js

const getAllClasses = require("../../../../services/getAllClasses");

 async function getAllClassesHandler(_, res) {
  try {
    const result = await getAllClasses();

    return res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
        message: "Failed to get classes"
    });
  }
}

module.exports = getAllClassesHandler

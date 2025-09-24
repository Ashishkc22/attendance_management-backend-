const getUserDetail = require("../../../../services/userDetails");
async function getUserDetails(req, res, next) {
  try {
    const userDetails = await getUserDetail({ email: req.user.email });
    if (!userDetails) {
      return res.status(404).json({
        messgae: "User details not found.",
      });
    }
    res.status(200).json({
      data: userDetails,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getUserDetails;

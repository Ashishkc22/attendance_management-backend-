// controller/userService.ts
const createUser = require("../../services/creareUser");
const sendInviteEmail = require("../../services/sendInviteEmail");
async function registerUser(req, res, next) {
  try {
    const newUser = await createUser(req.body);
    // await sendInviteEmail(newUser.id, newUser.email);
    return res.status(201).json({
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = registerUser;

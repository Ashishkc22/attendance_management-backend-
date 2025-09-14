// controller/userService.ts
const createUser = require("../../services/creareUser")
async function registerUser(req, res, next) {
  try {
    const newUser = await createUser(req.body);
    return res.status(201).json({
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = registerUser;

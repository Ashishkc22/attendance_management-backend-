const createUser = require("../../../../services/createUser");
async function inviteUser(req, res, next) {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ message: "User invited", data: user });
  } catch (error) {
    next(error);
  }
}

module.exports = inviteUser;

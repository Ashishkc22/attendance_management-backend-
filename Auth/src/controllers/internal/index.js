const router = require("express").Router();
const createUserValidator = require("./validation/createUser.validate");
router.post("/token", require("./token"));
router.post(
  "/createUser",
  (req, res, next) => {
    try {
      const result = createUserValidator.validate(req.body);
      if (result.error) {
        return res.status(400).json({ error: result.error.details[0].message });
      }
      next();
    } catch (error) {
      throw error;
    }
  },
  require("./createUser")
);
module.exports = router;

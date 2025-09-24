const router = require("express").Router();
const inviteValidation = require("../v1/user/validation/invite.validate");

router.post(
  "/invite",
  (req, res, next) => {
    try {
      const result = inviteValidation.validate(req.body);
      if (result.error) {
        return res.status(400).json({ error: result.error.details[0].message });
      }
      next();
    } catch (error) {
      throw error;
    }
  },
  require("./user/invite")
);
router.get("/class", require("./class/class"));
router.get("/department", require("./department/department"));
router.get("/users", require("./user/users"));
router.get("/user-details", require("./user/user-details"));

router.use("/student", require("./students"));
router.use("/attendance", require("./attendance/attendance"));

module.exports = router;

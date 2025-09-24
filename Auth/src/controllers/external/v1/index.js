const router = require("express").Router();

router.post("/login", require("./login"));
router.get("/refresh-access-token", require("./refreshAccessToken"));
router.post("/password-reset", require("./password-reset"));

module.exports = router;

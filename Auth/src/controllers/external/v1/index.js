const router = require("express").Router();

router.post("/login", require("./login"));
router.get("/refresh-access-token", require("./refreshAccessToken"));

module.exports = router;

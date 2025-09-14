const router = require("express").Router();
const logger = require("../../utils/logger");
const v1Routes = require("./v1");

router.use("/v1", v1Routes);

module.exports = router;

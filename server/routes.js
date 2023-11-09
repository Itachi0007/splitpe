var authenticateToken = require("./utilities/service").authenticateToken;
const router = require("express").Router();

router.use("/", require("./api/login/login_router"));
router.use("/", authenticateToken, require("./api/group/group_router"));

exports = module.exports = router;

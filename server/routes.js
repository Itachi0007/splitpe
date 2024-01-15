var authenticateToken = require("./utilities/service").authenticateToken;
const router = require("express").Router();

router.use("/", require("./api/login/login_router"));
router.use("/", require("./api/group/group_router"));
router.use("/", require("./api/expense/expense_router"));
router.use("/", require("./api/friends/friend_router"));

exports = module.exports = router;

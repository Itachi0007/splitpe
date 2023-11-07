const router = require("express").Router();
const groupController = require("./group_controller");

router.get("/groups/mygroups", groupController.myGroups); // fetch my groups
router.post("/groups/balance", groupController.groupbalance); // fetch my groups

exports = module.exports = router;

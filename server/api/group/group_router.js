const router = require("express").Router();
const groupController = require("./group_controller");

router.get("/groups/all", groupController.myGroups); // fetch my groups
router.post("/groups/balance", groupController.groupbalance); // fetch my groups
router.post("/groups/new", groupController.newGroup); // add new group

exports = module.exports = router;

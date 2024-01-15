const router = require("express").Router();
const friendController = require("./friend_controller");

router.get("/friends/all", friendController.myFriends); // fetch my friends

exports = module.exports = router;

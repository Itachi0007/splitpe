const router = require("express").Router();
const authenticateToken = require("../../utilities/service").authenticateToken;
const loginController = require("./login_controller");

router.post("/login", loginController.login);
router.post("/signup", authenticateToken, loginController.signup);

exports = module.exports = router;

const router = require("express").Router();
// const authenticateToken = require("../../utilities/service").authenticateToken;
const loginController = require("./login_controller");
// require("../../config/passport");

// router.post("/login", loginController.login);
// router.post("/signup", authenticateToken, loginController.signup);
// router.get("/login/google/",loginController.googleLogin);
// router.get("/login/google/failedlogin",loginController.googleFailedLogin);
// router.get("/login/google/callback",loginController.googleCallback);
// router.get("/login/google/protected",loginController.googleProtected);

exports = module.exports = router;

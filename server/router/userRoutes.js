const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  loginCheck,
  verifyUser,
  resendOTP,
  forgotPassword,
  handleGoogleLogin,
} = require("../controllers/user");
const Authenticate = require("../middleware/authenticate");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(Authenticate, logoutUser);
router.route("/verifyEmail").post(verifyUser);
router.route("/loginCheck").get(Authenticate, loginCheck);
router.route("/resendOTP").post(resendOTP);
router.route("/forgotPassword").post(forgotPassword);
router.route("/handleGoogleLogin").post(handleGoogleLogin);

module.exports = router;

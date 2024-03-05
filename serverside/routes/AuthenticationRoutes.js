const { Router } = require("express");
const {
  registerUser,
  verifyOtpToRegister,
  resendOtpToRegister,
} = require("../controllers/auhentication");
const router = Router();

router.route("/register").post(registerUser);
router.route("/verifyOtp").post(verifyOtpToRegister);
router.route("/resendOtp").post(resendOtpToRegister);

module.exports = router;

const router = require("express").Router();
const {
  signUp,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  resetPasswordpage,
  findUsers,
  findUser,
  logOut,
} = require("../controllers/controller.user");
const { isAuth, validateVerified } = require("../middleware/isAuth");

router.post("/register", signUp);
router.post("/login", validateVerified, loginUser);
router.get("/verify-email", verifyEmail);
router.post("/forgotpassword", validateVerified, forgotPassword);
router.post("/resetpassword/:id/:token", resetPassword);
router.get("/resetpassword/:id/:token", resetPasswordpage);

// router.get("/viewProfiles", findUsers);
// router.get("/viewProfile/:id", findUser);

// router.get("/logout", isAuth, logOut);

module.exports = router;


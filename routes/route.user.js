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
// const { isAuth, validateVerified } = require("../middleware/isAuth");

router.post("/register", signUp);
// router.post("/login", validateVerified, loginUser);
router.get("/verify-email", verifyEmail);
// router.get("/viewProfiles", findUsers);
// router.get("/viewProfile/:id", findUser);
// router.post("/forgotpassword", validateVerified, forgotPassword);
// router.get("/reset-password/:id/:token", resetPasswordpage);
// router.post("/reset-password/:id/:token", resetPassword);
// router.get("/logout", isAuth, logOut);

module.exports = router;


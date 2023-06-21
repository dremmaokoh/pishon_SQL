const router = require("express").Router();
const passport = require("passport");

//function to check if our user is logged in via middleware
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/auth/protected");
});

router.get("/failure", (req, res) => {
  res.send("Connection Error");
});

router.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.username}`);
});

router.get("/logout", (req, res) => {
  res.clearCookie("access_token");
  req.session.destroy();
  return res.redirect("/");
});

module.exports = router;

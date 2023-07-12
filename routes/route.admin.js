const router = require("express").Router();
const {
  findVerifiedUsers,
  findAllUsers,
  findUser,
  switchToAdmin,
  findEnquiries

} = require("../controllers/controller.admin");
const { isAuth} = require("../middleware/isAuth");
router.get("/viewVerifiedProfiles", isAuth, findVerifiedUsers);
router.get("/viewProfiles", isAuth,  findAllUsers);
router.get("/viewProfile/:id",isAuth,  findUser);
router.get("/viewEnquiries", isAuth,findEnquiries);
router.post('/switch-to-admin', switchToAdmin);
module.exports = router;
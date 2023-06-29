const router = require("express").Router();
const {
  findUsers,
  findUser,
  switchToAdmin,
  findEnquiries

} = require("../controllers/controller.admin");
router.get("/viewProfiles", findUsers);
router.get("/viewProfile/:id", findUser);
router.get("/viewEnquiries", findEnquiries);
router.post('/switch-to-admin', switchToAdmin);
module.exports = router;
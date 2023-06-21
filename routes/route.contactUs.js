const router = require("express").Router();
const {
    contactUs 
} = require("../controllers/controller.contactUs");


router.post("/contact", contactUs);


module.exports = router;

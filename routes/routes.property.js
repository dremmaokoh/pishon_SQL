const router = require("express").Router();
const upload = require("../utils/multer");
const {
  addProperty,
  findPropertys,
  findProperty,
  //findlatestproperty,
 // similarField,
  //updateProperty,
  //deleteProperty,
 // getTopPropertys
} = require("../controllers/controller.property");
const { isAuth,  validateRole } = require("../middleware/isAuth");

router.post(
  "/newProperty",
  isAuth,
 // validateRole,
  upload.single("propertyPicture"),
  addProperty
);
router.get("/findproperty/:id",  findProperty);
router.get("/findall", findPropertys);
//router.get("/findnew",  findlatestproperty);
//router.get("/findtoproperty", getTopPropertys);
//router.get("/find/:category",  similarField);
//router.put("/update/:id", isAuth, validateRole, updateProperty);
//router.delete("/delete/:id", isAuth, validateRole, deleteProperty);

module.exports = router;

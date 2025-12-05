const router = require("express").Router();
const LoggedInOnly = require("../Middlewares/LoggedInOnly");
const fetchProfile = require("../Controllers/fetchProfile");
const { editProfile, addPic } = require("../Controllers/editProfile");
const uploader = require("../Middlewares/multer_upload");

router.get("/", LoggedInOnly, fetchProfile);
router.post("/edit", LoggedInOnly, uploader("profileImage"), editProfile);


module.exports = router;

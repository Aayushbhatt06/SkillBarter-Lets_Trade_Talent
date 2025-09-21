const router = require("express").Router();
const LoggedInOnly = require("../Middlewares/LoggedInOnly");
const fetchProfile = require("../Controllers/fetchProfile");
const editProfile = require("../Controllers/editProfile");

router.get("/", LoggedInOnly, fetchProfile);
router.post("/edit", LoggedInOnly, editProfile);

module.exports = router;

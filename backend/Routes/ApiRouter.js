const router = require("express").Router();
const { addSkills, findUserSk } = require("../Controllers/addSkill.js");
const LoggedInOnly = require("../Middlewares/LoggedInOnly.js");
const {
  addPost,
  fetchPosts,
  addComment,
  like,
} = require("../Controllers/Posts.js");
const addProject = require("../Controllers/addProject.js");
const projectSkills = require("../Controllers/projectSkills.js");
const getTagLines = require("../Controllers/tagline.js");
const uploader = require("../Middlewares/multer_upload.js");

router.post("/addskill", LoggedInOnly, addSkills);
router.post("/findskilled", findUserSk);
router.post("/project", LoggedInOnly, uploader("image"), addProject);
router.post("/post", LoggedInOnly, uploader("profileImage"), addPost);
router.get("/fetchposts", fetchPosts);
router.post("/comment", LoggedInOnly, addComment);
router.post("/like", LoggedInOnly, like);
router.get("/skillproject", projectSkills);
router.get("/tagline", getTagLines);
module.exports = router;

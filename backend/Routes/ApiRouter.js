const router = require('express').Router();
const {addSkills,findUserSk} = require('../Controllers/addSkill.js');
const LoggedInOnly = require('../Middlewares/LoggedInOnly.js')
const {addPost,fetchPosts,addComment,like} = require('../Controllers/Posts.js')
const addProject = require('../Controllers/addProject.js')
const projectSkills = require('../Controllers/projectSkills.js')
router.post('/addskill',LoggedInOnly,addSkills);
router.post('/findskilled',LoggedInOnly,findUserSk);
router.post('/projects',LoggedInOnly,addProject);
router.post('/post',LoggedInOnly,addPost);
router.get('/fetchposts',fetchPosts);
router.post('/comment',LoggedInOnly,addComment);
router.post('/like',LoggedInOnly,like)
router.get('/skillproject',projectSkills)
module.exports = router;
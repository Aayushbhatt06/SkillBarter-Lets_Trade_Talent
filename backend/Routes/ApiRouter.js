const router = require('express').Router();
const {addSkills,findUserSk} = require('../Controllers/addSkill.js');
// const {verifyToken} = require('../Middlewares/')
const addProject = require('../Controllers/addProject.js')
router.post('/addskill',addSkills);
router.post('/findskilled',findUserSk);
router.post('/projects',addProject)
module.exports = router;
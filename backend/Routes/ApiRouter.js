const router = require('express').Router();
const {addSkills,findUserSk} = require('../Controllers/addSkill.js');
const LoggedInOnly = require('../Middlewares/LoggedInOnly.js')
const addProject = require('../Controllers/addProject.js')
router.post('/addskill',LoggedInOnly,addSkills);
router.post('/findskilled',LoggedInOnly,findUserSk);
router.post('/projects',LoggedInOnly,addProject)
module.exports = router;
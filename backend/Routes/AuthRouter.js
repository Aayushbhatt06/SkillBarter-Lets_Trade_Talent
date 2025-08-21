const { signupValidation, LoginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();
const { signup,login } = require('../Controllers/AuthController');
const LoggedInOnly = require('../Middlewares/LoggedInOnly');
const check = require('../Controllers/check')

router.post('/signup',signupValidation,signup)
router.post('/login',LoginValidation,login)
router.get('/check',LoggedInOnly,check)

module.exports = router;
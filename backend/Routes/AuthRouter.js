const { signupValidation, LoginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();
const { signup,login } = require('../Controllers/AuthController')



router.post('/signup',signupValidation,signup)
router.post('/login',LoginValidation,login)

module.exports = router;    
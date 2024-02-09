const express = require('express')
const {signupController, signinController} = require('../controllers/auth.controller')

const authRouter = express.Router();

authRouter.route('/signup').post(signupController)
authRouter.route('/signin').post(signinController)

module.exports = {
    authRouter
}
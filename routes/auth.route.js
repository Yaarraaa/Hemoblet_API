const express = require('express')
const {forgetPassword, signupController, signinController, resetPassword} = require('../controllers/auth.controller')

const authRouter = express.Router();

authRouter.route('/signup').post(signupController)
authRouter.route('/signin').post(signinController)
authRouter.route('/forget-password').post(forgetPassword)
authRouter.route('/reset-password').post(resetPassword)

module.exports = {
    authRouter
}
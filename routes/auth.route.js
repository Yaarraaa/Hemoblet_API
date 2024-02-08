const express = require('express')
const {signupController} = require('../controllers/auth.controller')

const authRouter = express.Router();

authRouter.route('/signup').post(signupController)

module.exports = {
    authRouter
}
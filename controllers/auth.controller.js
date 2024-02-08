const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const { Doctor } = require("../models/Doctor");
const { signupValidate } = require('../validator/auth.validator')
const {createError}  = require('../shared/utils/APIError')

/**
 * @des     Register New User
 * @router  /api/auth/signup
 * @method  POST
 * @access public
*/
const signupController = asyncHandler(async (req, res, next) => {
    const {error} = signupValidate(req.body)
    if (error)
        return next(createError(`${error.details[0].message}`, 404))

    res.status(200).json('signup success')
})

module.exports = {
    signupController
}
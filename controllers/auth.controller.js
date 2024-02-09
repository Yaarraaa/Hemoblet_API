const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const { Doctor } = require("../models/Doctor");
const { signupValidate, signinValidate } = require('../validator/auth.validator')
const { createError } = require('../shared/utils/APIError')
const jwt = require('jsonwebtoken')


/**
 * @desc     Register New User
 * @router  /api/auth/signup
 * @method  POST
 * @access public
*/
const signupController = asyncHandler(async (req, res, next) => {
    const {error} = signupValidate(req.body)
    if (error)
        return next(createError(`${error.details[0].message}`, 404))
    const {username, email, password, confirmPassword, phone, ID, location, experience} = req.body
    const existing = await Doctor.findOne({
        email: email
    })
    if (existing) return next(createError('this user already exist', 400));

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const doctor = await Doctor.create({
        username,
        email,
        password: hashedPassword,
        confirmPassword,
        phone,
        ID,
        location,
        experience
    })
    res.status(200).json('signup success, please login')
})

/**
 * @desc     Signin New User
 * @router  /api/auth/signin
 * @method  POST
 * @access public
*/
const signinController = async (req, res, next) => {
    const { error } = signinValidate(req.body)
    if (error) 
        return next(createError(`${error.details[0].message}`, 404))

    const { email, password } = req.body;

    const existing = await Doctor.findOne({ email })
    if (!existing)
        return next(createError('Invalid email or password', 401))

    const matchPassword = await bcrypt.compare(password, existing.password)
    if (!matchPassword) return next(createError('Invalid email or password', 400));

    const token = jwt.sign({ id: existing._id }, process.env.JWT_SECRET, { expiresIn: '5d' })
    res.status(201).json({
        user: {
            id: existing.id,
            username: existing.username,
            email: existing.email
        },
        token,
     });
}

module.exports = {
    signupController,
    signinController
}
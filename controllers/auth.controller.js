const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const { Doctor } = require("../models/Doctor");
const { signupValidate, signinValidate } = require('../validator/auth.validator')
const { createError } = require('../shared/utils/APIError')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const {sendEmail} = require('../shared/utils/email')


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
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, salt)

    if (password != confirmPassword) {
        return next(createError('Password confirmation doesn\'t match Password', 404))
    }

    const doctor = await Doctor.create({
        username,
        email,
        password: hashedPassword,
        confirmPassword: hashedConfirmPassword,
        phone,
        ID,
        location,
        experience
    })

    res.status(200).json('signup success, please login')
})

/**
 * @desc     Signin User
 * @router  /api/auth/signin
 * @method  POST
 * @access public
*/
const signinController = asyncHandler(async (req, res, next) => {
    const { error } = signinValidate(req.body)
    if (error) 
        return next(createError(`${error.details[0].message}`, 404))

    const { email, password } = req.body;

    const existing = await Doctor.findOne({ email })
    if (!existing)
        return next(createError('Invalid email or password', 401))

    const matchPassword = await bcrypt.compare(password, existing.password)
    if (!matchPassword) return next(createError('Invalid email or password', 400));

    const token = jwt.sign({ id: existing._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
    res.status(201).json({
        user: {
            id: existing.id,
            username: existing.username,
            email: existing.email
        },
        token,
     });
})

/**
 * @desc     Forget Password
 * @router  /api/auth/forget-password
 * @method  POST
 * @access public
*/
const forgetPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    console.log('email: ', email)

    const doctor = await Doctor.findOne({ email: email })
    console.log('doctor: ', doctor)
    if (!doctor) {
        return next(createError('Doctor not found', 401))
    }


    const resetCode = crypto.randomBytes(6).toString('hex')

    doctor.resetCode = resetCode;
    console.log(doctor.resetCode)
    await doctor.save()
    const message = `Your password reset code is: ${resetCode}`

    await sendEmail(doctor.email, 'Password change request received', message)

    res.status(200).json({ message: 'Reset code sent successfully' });
})

/**
 * @desc     Reset Password
 * @router  /api/auth/reset-password
 * @method  POST
 * @access public
*/
const resetPassword = asyncHandler(async (req, res, next) => {
    const { email, resetCode, newPassword, confirmNewPassword } = req.body

    const doctor = await Doctor.findOne({ email })
    if (!doctor) {
        return next(createError('Doctor not found', 404))
    }
    if (!doctor.resetCode || resetCode !== doctor.resetCode) {
        return next(createError('Invalid reset code', 400));
    }

    const salt = await bcrypt.genSalt(10)

    doctor.password = await bcrypt.hash(newPassword, salt)
    doctor.confirmPassword = await bcrypt.hash(confirmNewPassword, salt)
    doctor.resetCode = undefined

    await doctor.save()

    res.status(200).json({ message: 'Password reset successful' });
})


module.exports = {
    signupController,
    signinController,
    forgetPassword,
    resetPassword
}
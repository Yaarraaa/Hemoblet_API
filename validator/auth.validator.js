const joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

function signupValidate(obj) {
    const schema = joi.object({
        username: joi.string().trim().min(2).max(50).required(),
        email: joi.string().trim().min(5).max(50).required().email(),
        password: passwordComplexity().required(),
        confirmPassword: passwordComplexity().required(),
        phone: joi.string().min(8).max(11).required(),
        ID: joi.string().max(14).required(),
        location: joi.string().trim().required(),
        experience: joi.string().trim().min(2).max(50)
    })
    return schema.validate(obj);
}

function signinValidate(obj) {
    const schema = joi.object({
       email: joi.string().trim().min(5).max(50).required().email(),
       password: passwordComplexity().required(),
    });
    return schema.validate(obj);
 }

module.exports = {
    signupValidate,
    signinValidate
}
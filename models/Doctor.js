const { string } = require('joi');
const mongoose = require('mongoose')

// doctor schema

const DoctorShema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    confirmPassword: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    phone: {
        type: String,
        required: true,
    },
    ID: {
        type: String,
        required: true,
        maxlength: 14,
        unique: true
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    experience: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    resetCode: {
        type: String
    }
}, {
    timestamps: true
})

const Doctor = mongoose.model("Doctor", DoctorShema);

module.exports = {
    Doctor
}
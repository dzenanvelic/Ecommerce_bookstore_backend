const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 32
    },
    email: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 32
    },
    password: {
        type: String,
        required: true,
        minlength: 6,

    },
    history: {
        type: Array,
        default: []
    },
    role: {
        type: String,
        default: "subscriber"
    },
    about: {
        type: String,
        trim: true
    }


}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
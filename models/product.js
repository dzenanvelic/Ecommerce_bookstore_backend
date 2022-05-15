const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,

    },
    description: {
        type: String,
        maxlength: 2000
    },
    photo: {
        type: String,
        requred: true
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true,
        trim: true
    },
    shipping: {
        type: Boolean,
        default: true
    },
    author: {
        type: String,
        required: true,
        maxlength: 32
    }
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)
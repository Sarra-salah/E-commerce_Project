const mongoose = require("mongoose")

const GallerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})



const productScema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true

    },
    galleries: [GallerySchema],


    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    }


},{ timestamps: true })
module.exports = mongoose.model("products", productScema)
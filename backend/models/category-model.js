const mongoose = require("mongoose")

const category_model = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    }]
}, { timestamps: true })
module.exports = mongoose.model("categories", category_model)
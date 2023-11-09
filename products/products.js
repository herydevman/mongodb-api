const mongoose = require("mongoose")
const { Schema, model } = mongoose
const productSchema = new Schema({
    name: String,
    categorie: String,
    color: String,
    colorAvail: [String],
    description: String,
    price: {
        type: Number,
        required: true
    },
    image: String,
    discount: {
        type: Number,
        default : 0
    }
})

const Products = model("products", productSchema)
module.exports = Products
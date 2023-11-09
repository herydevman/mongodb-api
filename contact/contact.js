const mongoose = require("mongoose")
const Schema = mongoose.Schema
const contactSchema = new Schema({
    name: String,
    email: String,
    message: String,
    postedAt: Date,
    read: Boolean,
    files: String
})

const Contacts = mongoose.model("contact", contactSchema)
module.exports = Contacts
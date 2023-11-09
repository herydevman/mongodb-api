const mongoose = require("mongoose")
const Schema = mongoose.Schema
const commandSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    products: Array,
    createdAt: Date,
    updatedAt: Date,
    payed: Boolean,
    clientRemark: String
})

const Commands = mongoose.model("commands", commandSchema)
module.exports = Commands
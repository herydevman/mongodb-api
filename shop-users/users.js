const mongoose = require("mongoose")
const Schema = mongoose.Schema
const userSchema = new Schema({
    command: [{type: mongoose.Schema.Types.ObjectId, ref:'commands'}],
    name: String,
    lastname: String,
    email: String,
    password: String,
    payementWays: [String],
    isLogged: {
        type: Boolean,
        required: true,
        default: false
    } 
})

const Users = mongoose.model("users", userSchema)
module.exports = Users
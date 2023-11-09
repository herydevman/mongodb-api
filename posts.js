const mongoose = require("mongoose")
const Schema = mongoose.Schema
const postSchema = new Schema({
    title: String,
    email: String,
    author: String,
    tagName: String,
    createdAt: String,
    content: String
})

const Posts = mongoose.model("posts", postSchema)
module.exports = Posts
const mongoose = require("mongoose")
const { Schema, model } = mongoose

const activitySchema = new Schema({
    title: String,
    content: String,
    screenshot: String    
})

const Activities = model("activities", activitySchema)
module.exports = Activities
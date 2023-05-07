const mongoose = require("mongoose")
const shortid = require("shortid")

const urlSchema = mongoose.Schema({
    longurl: {type : String, required : true},
    shorturl: {type : String, required : true, unique: true, default: shortid()},
    visited: {type :Number, required: true, default: 0},
    created: {type: Date, default: Date.now()}
})

const url = mongoose.model("url", urlSchema)

module.exports = url
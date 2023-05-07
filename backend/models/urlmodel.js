const mongoose = require("mongoose")
const shortid = require("shortid")
const {nanoid} = require("nanoid")

const urlSchema =  mongoose.Schema({
    longurl: {type : String, required : true},
    shorturl: {type : String, unique: true, required : true, default: ()=> nanoid(6)},
    visited: {type :Number, required: true, default: 0},
    created: {type: Date, default: Date.now()},
    author: {type: String }
})

const url = mongoose.model("url", urlSchema)

module.exports = url
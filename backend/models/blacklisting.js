const mongoose = require("mongoose")

const BLSchema = mongoose.Schema({
    normaltoken : {type: String, required :true},
    refreshtoken : {type: String, required :true}
})

const blacklist = mongoose.model("blacklist", BLSchema)

module.exports = blacklist
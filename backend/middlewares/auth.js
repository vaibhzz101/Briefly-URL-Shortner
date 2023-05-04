const jwt = require("jsonwebtoken")
const Blacklist = require("../models/blacklistmodel")

const auth = async (req, res, next)=>{
    try {
        const {AccessToken} = req.cookies
        const isTokenBlacklisted = await Blacklist.findOne({token:AccessToken})
        if (isTokenBlacklisted){
            return res.status(400).send({msg: "Please Login"})
        }
        const isValid = jwt.verify(AccessToken, process.env.SecretKey);
        if (!isValid){
            return res.send({mag: "Token expired, generate with refresh token"})
        }

        req.payload = isValid;
        next()
    } catch (error) {
        res.status(500).send({msg: error.message})
    }
}


module.exports = {auth}
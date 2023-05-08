const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")
require("dotenv").config()
const cookieParser = require('cookie-parser');
const {UserModel} = require("../models/user.models")
const blacklist = require("../models/blacklisting")

const authenticate = async (req, res, next)=>{
    const token = req.cookies.normaltoken || req.headers.authenticate 
    
    // if (!token) return res.send({"msg": "Please Login"})
    try {
        const isBlacklisted = await blacklist.findOne({ normaltoken: token })
        if (isBlacklisted) return res.send({ "msg": "You have logged out" })
        const decoded = jwt.verify(token, process.env.normalkey)
        console.log(decoded)

        // const cookieMail = req.cookies.email;
        // const tokens = JSON.parse(await redisclient.GET(cookieMail));
        // const blacklistToken = await redisclient.HGET("blockedToken", cookieMail);

        // if (blacklistToken == tokens.token) {
        //     return res.send("Userloggedout Please login Again");
        // }
        // const decodedverifyToken = jwt.verify(tokens.token, process.env.normalkey);
        // const { user_id } = decodedverifyToken;
        // // old user
        // const user = await UserModel.findById(user_id);
        // if (!user) {
        //     return res.status(401).json({ message: "You are not authorized" });
        // }
        // req.user = user;
        
        
        next()
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

module.exports = authenticate
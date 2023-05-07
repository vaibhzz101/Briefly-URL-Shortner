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
    if (!token) return res.send({"msg": "Please Login"})
    try {
        const isBlacklisted = await blacklist.findOne({ normaltoken: token })
        if (isBlacklisted) return res.send({"msg": "You have logged out"})
        const decoded = jwt.verify(token, process.env.normalkey)
        // console.log(decoded)
        if (decoded) {
            res.locals.userId = decoded.userId;
            // console.log(decoded)
            next()
        } else {
            return  res.send({"msg": "Login again"})
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

module.exports = authenticate

const UserRouter = require("express").Router()
const UserModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const Blacklist = require("../models/blacklistmodel")

UserRouter.post("/signup", async(req, res)=>{
    try {
        const {name, email, pass, role} = req.body;
        const isUserPresent = await UserModel.findOne({email})
        if (isUserPresent){
            return res.status(400).send({msg: "User already present please login"})
        }
        else {
            const hashedPass = bcrypt.hashSync(pass, 8);
            const newUser = new UserModel({name, email, role, pass: hashedPass});
            await newUser.save();
            res.send({msg: "Signup Succesful", user: newUser});
        }
        
    } catch (error) {
        res.status(500).send({msg: error.messgae})
    }
})

UserRouter.post("/login", async(req, res)=>{
    try {
        const {email, pass} = req.body;
        const isUserPresent = await UserModel.findOne({email})
        if (!isUserPresent){
            return res.status(400).send({msg: "Not a user please signup"})
        }
        else {
            const isCorrect = bcrypt.compareSync(pass, isUserPresent.pass);
            if (!isCorrect) return res.status(400).send({msg: "Wrong credentials"})

            const accesstoken = jwt.sign({email, role : isUserPresent.role}, process.env.SecretKey, {expiresIn: "1m"})
            const refreshtoken = jwt.sign({email, role : isUserPresent.role}, process.env.RefreshKey, {expiresIn: "3m"})

            res.cookie("AccessToken", accesstoken, {maxAge: 1000*60})
            res.cookie("RefreshAccessToken", refreshtoken, {maxAge: 1000*60*3})

            res.send({msg: "Login Successful"})
        }
    } catch (error) {
        res.status(500).send({msg: error.messgae})
    }
})


UserRouter.get("/logout", async(req, res)=>{
    try {
        const {AccessToken, RefreshAccessToken} = req.cookies;
        const blacklisttoken = new Blacklist(AccessToken)
        const blacklistrefresh = new Blacklist(RefreshAccessToken)
        await blacklisttoken.save()
        await blacklistrefresh.save()

        res.send({msg: "Logout Succesful"})
    } catch (error) {
        res.status(500).send({msg: error.messgae})
    }
})

UserRouter.get("/getrefreshtoken", async(req, res)=>{
    try {
        const {RefreshAccessToken} = req.cookies
        const isTokenBlacklisted = await Blacklist.findOne({token:RefreshAccessToken})
        if (isTokenBlacklisted){
            return res.status(400).send({msg: "Please Login"})
        }

        const isValid = jwt.verify(RefreshAccessToken, process.env.RefreshKey)

        if (!isValid) {
            return res.status(500).send({msg: "Please login again"})
        }

        const newToken = jwt.sign({email: isValid.email, role: isValid.role}, process.env.SecretKey, {expiresIn:"1m"})
        res.cookie("AccessToken", newToken, {maxAge: 1000*60})
        res.send({msg: "Refresh token updated"})
    } catch (error) {
        res.status(500).send({msg: error.messgae})
    }
})

module.exports = UserRouter
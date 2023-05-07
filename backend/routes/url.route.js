const express = require("express")
const urlRouter = express.Router()
const url = require("../models/urlmodel");
const authenticate = require("../middelwares/authentication");

urlRouter.post("/assign", authenticate, async(req, res)=>{
    try {
        const {longurl} = req.body;
        if (!longurl) return res.json({msg: "Please Provide URL"})
        
        const newurl = new url({longurl})
        await newurl.save()
        res.send(newurl)
    } catch (error) {
        console.log(error)
    }
})

urlRouter.get("/", async(req, res)=>{
    try {
        const totalUrls = await url.find({})
        res.json(totalUrls)
    } catch (error) {
        console.log(error)
    }
})





module.exports = urlRouter
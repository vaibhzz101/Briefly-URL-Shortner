const express = require("express")
const app = express()
app.use(express.json())
require("dotenv").config()
const connection = require("./connection/db")
const urlRouter = require("./routes/url.route")
const url = require("./models/urlmodel")

const { googlerouter } = require("./login-routes/g-oauthroute")
const { githubRouter }=require("./login-routes/github.routes")
app.use("/url", urlRouter)
app.use("/user", googlerouter)
app.use("/", githubRouter)

app.get("/", (req, res)=>{

    res.send("<h1>Welcome</h1>")
})

app.get("/:shortID", async (req, res)=>{
    try {
        const {longurl} = await url.findOne({shorturl: req.params.shortID})

        if (!longurl) return res.status(404).json({msg: "URL does not exist"})

        res.redirect(longurl)

    } catch (error) {
        console.log(error)
    }
})

const PORT = process.env.PORT || 8013
app.listen(PORT, async ()=>{
    try {
        await connection
        console.log("Server is Running at "+PORT)
    } catch (error) {
        console.log(error)
    }
})
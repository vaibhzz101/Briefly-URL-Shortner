const express = require("express")
const app = express()
app.use(express.json())
require("dotenv").config()
const cookieParser = require("cookie-parser")
app.use(cookieParser())
const connection = require("./connection/db")
const urlRouter = require("./routes/url.route")
const url = require("./models/urlmodel")
const userRouter = require("./routes/user.route")
// const { detailUserRoute } = require("./routes/detailroute");
const { googlerouter } = require("./login-routes/g-oauthroute")
const { githubRouter } = require("./login-routes/github.route")

app.use("/url", urlRouter)
app.use("/google", googlerouter)
app.use("/", githubRouter)
app.use("/user", userRouter)
app.get("/", (req, res)=>{

    res.send(`<h1>Welcome</h1>`)
})

app.get("/:shortID", async (req, res)=>{
    try {
        let fetchedURL = await url.findOne({shorturl: req.params.shortID})
        if (!fetchedURL) return res.status(404).json({msg: "URL does not exist"})
        let visits = Number(fetchedURL.visited)
        fetchedURL.visited = visits+1;
        await fetchedURL.save()
        res.redirect(fetchedURL.longurl)

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
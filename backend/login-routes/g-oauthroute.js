const { passport } = require("../connection/google-oauth");

const express = require("express");
const app = express();
const path = require("path");
const googlerouter = express.Router();
const cookieParser = require('cookie-parser');
googlerouter.use(cookieParser())

googlerouter.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

googlerouter.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/google/login",
        session: false,
    }),
    function (req, res) {
        let user = req.user;

        res.redirect(`http://127.0.0.1:5500/frontend/dashboard.html?id=${user._id}`);
    }
);

module.exports = {
    googlerouter
};


    // < !-- < a href = "https://github.com/login/oauth/authorize?client_id=cefb84d0ab8bbfdc2919&scope=user" > <img
    // style="width: 15%;" src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_960_720.png"
    // alt="github"></a> -->
    // < !-- < a href = "http://localhost:8013/user/auth/google" >
    // <img style="width: 15%;" src="data:image/png;base64,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"
    //     alt="google">
    // </a> -->
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

        // localStorage.setItem("username", JSON.stringify(user.name)),
            // console.log(user)
        res.redirect(`http://127.0.0.1:5500/frontend/dashboard.html?id=${user._id}&name=${user.name}`);
    }
);

module.exports = {
    googlerouter
};

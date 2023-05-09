const express = require("express");
const path = require("path");
const { passport3 } = require("../connection/github-oauth");

const githubRouter = express.Router();
const cookieParser = require('cookie-parser');
githubRouter.use(cookieParser())

githubRouter.get(
    "/auth/github",
    passport3.authenticate("github", { scope: ["user:email"] })
);

githubRouter.get(
    "/auth/github/callback",
    passport3.authenticate("github", {
        failureRedirect: "/login",
        session: false,
    }),
    function (req, res) {
        let user = req.user;
        res.redirect(`http://127.0.0.1:5501/frontend/dashboard.html?id=${user._id}&name=${user.name}`)
//         res.redirect(`https://lacking-berry-1088.netlify.app/dashboard.html?id=${user._id}&name= ${user.name}`);

    }
);

module.exports = { githubRouter };


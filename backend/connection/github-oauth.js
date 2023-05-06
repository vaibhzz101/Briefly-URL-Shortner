var GitHubStrategy = require("passport-github2").Strategy;
const passport3 = require("passport");
require("dotenv").config();
const { redisclient } = require("../connection/redis")
const { UserModel } = require("../models/user.models");
const { v4: uuidv4 } = require("uuid");

// const express = require("express");
// const app = express();
// const session = require('express-session');

// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         httpOnly: true,
//         secure: false,
//         maxAge: 24 * 60 * 60 * 1000
//     }
// }))

// app.use(passport3.initialize());
// app.use(passport3.session());
// passport3.serializeUser(function (user, cb) {
//     cb(null,user.id)
// })
// passport3.deserializeUser(function (user, cb) {
//     cb(null, id)
// })


passport3.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "http://localhost:8013/auth/github/callback",
            scope: "user:email",
        },
        async function (accessToken, refreshToken, profile, done) {

            let email = profile.emails[0].value;
            await redisclient.SET(email, JSON.stringify({ "token": accessToken }));
            await redisclient.SET("email", `${email}`);
            let udata = await UserModel.findOne({ email });
            // console.log(accessToken)
            if (udata) {
                return done(null, udata);
            }
            let name = profile._json.name;
            let N = name.trim().split(" ");
            let logo = N[0][0] + N[N.length - 1][0];
            const user = new UserModel({
                name,
                logo,
                email,
                password: uuidv4(),
            });
            await user.save();
            return done(null, user);
            console.log(profile);
        }
    )
);

module.exports = { passport3 };


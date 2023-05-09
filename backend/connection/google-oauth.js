var GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
require("dotenv").config();
const { redisclient } = require("../connection/redis")
const { UserModel } = require("../models/user.models");
const { v4: uuidv4 } = require("uuid");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "https://prickly-dove-knickers.cyclic.app/google/auth/google/callback",
        },
        async function (accessToken, refreshToken, profile, cb) {
            await redisclient.SET("tokens", JSON.stringify({ "token": accessToken }));
            let email = profile._json.email;
            let udata = await UserModel.findOne({ email });
            if (udata) {
                return cb(null, udata);
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
            console.log(user)
            return cb(null, user);
        }
    )
);

module.exports = { passport };

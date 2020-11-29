const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const config = require("../config/index");
const chalk = require("chalk");

// const User = mongoose.model("User");

module.exports = new GoogleStrategy(
  {
    clientID: config.GOOGLE.clientID,
    clientSecret: config.GOOGLE.clientSecret,
    callbackURL: "/auth/google/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log(chalk.blue(JSON.stringify(profile)));
    user = { ...profile };

    // console.log(chalk.red(user.email));
    return cb(null, profile);
  }
);

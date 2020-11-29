const mongoose = require("mongoose");
const FacebookStrategy = require("passport-facebook").Strategy;

const config = require("../config/index");
const chalk = require("chalk");

// const User = mongoose.model("User");

module.exports = new FacebookStrategy(
  {
    clientID: config.FACEBOOK.clientID,
    clientSecret: config.FACEBOOK.clientSecret,
    callbackURL: "/auth/facebook/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log(chalk.blue(JSON.stringify(profile)));
    user = { ...profile };
    return cb(null, profile);
  }
);

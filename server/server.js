//jshint esversion:6
require("dotenv").config();

// const uuid = require('uid-safe')
const express = require("express");
const session = require('express-session');

const cors = require("cors");
const mongoose = require("mongoose");
const errors = require('restify-errors');
const bodyParser = require("body-parser");
const path = require("path");

const config = require("./config");
const mailer = require("./mailer");

const db = require("./modules/db");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS Related
app.use(cors());

// Session Related
app.use(session({
  // genid: (req) => {
  //   return uuid(18) // use UUIDs for session IDs
  // },
  resave: false,
  saveUninitialized: false,
  secret: config.JWT_SECRET,
  // cookie: {
  //   secure: false, 
  //   maxAge: config.JWT_TOKEN_EXP * 60 * 60 * 1000   // hrs * min * sec * msec
  // }
}));


//Use Routes
app.use("/api/items", require("./routes/api/items"));
app.use("/test", require("./routes/test"));


// app.post("/auth/register", async(req, res, next) => {

//   if(!req.is('application/json'))
//     {
//         return next(new errors.InvalidContentError("Expects JSON format 'application/json'"));
//     }

//     const {fName, lName, email, password} = req.body;

//     db.User.findOne({email:email}, async (err, foundUser) => {
//       if (err) {
//         console.log("Auth-Register: " + err);
//       } else {
//         if(foundUser) res.send("User already exists");
//         else {
//           const newUser = new db.User({ fName, lName, email, password });

//           try {
//               const user = await newUser.save();
//               res.sendStatus(201);
//               next();
//           } catch(err) {
//               return next(new errors.InternalError(err.message));
//           }
//         }
//       }
//     });
// });


const dbConn = mongoose.connection;

dbConn.once("open", () => {
  require("./routes/user")(app, session);
});


// APP MANAGEMENT

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build")); // Set static folder
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(config.PORT, () =>
  console.log(`Backend Server started on port ${config.PORT}`)
);

//jshint esversion:6
require("dotenv").config();

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const findOrCreate = require("mongoose-findorcreate");
const passportLocalMongoose = require("passport-local-mongoose");

/// DB init

const db = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@cluster0-depo4.mongodb.net/LostAndFound`;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log("Mongo DB Connected"))
  .catch(err => console.log("Mongo DB connection error: " + err));


/// USER

const userSchema = new mongoose.Schema({
  fName: { type: String, required: true, trim: true },
  lName: { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true },
  source: { type: String, required: true, trim: true },
  provider: String,
  providerId: String,
  pictureURL: String,
  isActive: {type:Boolean, default:false }
});

userSchema.plugin(timestamps);
userSchema.plugin(findOrCreate);
userSchema.plugin(passportLocalMongoose);

// // generating a hash
// userSchema.methods.generateHash = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// // checking if password is valid
// userSchema.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.local.password);
// };

module.exports.User = new mongoose.model("User", userSchema);


/// SESSION

const userSessionSchema = new mongoose.Schema({
  userId: String,
  token: String,
  iat: { type: Date, default: Date.now() },
  exp: { type: Date, default: Date.now() },
  isActive: { type: Boolean, default: true }
});

userSessionSchema.plugin(timestamps);
userSessionSchema.plugin(findOrCreate);

module.exports.UserSession = new mongoose.model("UserSession", userSessionSchema);


///  ITEM

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  user_id: String
});

itemSchema.plugin(timestamps);

module.exports.Item = new mongoose.model("Item", itemSchema);

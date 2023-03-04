const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  password: String,
  address: String,
  address2: String,
  country: String,
  state: String,
  zip: String,
  ngoName: String,
  ngoType: String,
});

// passportLocalMongoose plugin for our schema
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

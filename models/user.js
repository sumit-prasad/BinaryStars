const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  type: String,
  username: String,
  email: String,
  fName: String,
  mName: String,
  lName: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);

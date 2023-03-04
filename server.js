// Requirements
require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3000;
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");

// Express configuration
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

// Body parser
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Start express session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Intialize passport session
app.use(passport.initialize());
app.use(passport.session());

/*DB Connection*/
const connectDB = require("./config/db");
connectDB();

/*Routes*/

// Home
app.use("/", require("./routes/index"));

// NGO
app.use("/ngo", require("./routes/ngo"));

/*Server connection*/
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

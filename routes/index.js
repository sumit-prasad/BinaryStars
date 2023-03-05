const router = require("express").Router();
const User = require("../models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportLocalMongoose = require("passport-local-mongoose");

// Set up local strategy for passport
passport.use(new LocalStrategy(User.authenticate()));

// Set up passport serialization and deserialization
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// passportLocalMongoose plugin for our schema
// User.plugin(passportLocalMongoose);

router.get("/", (req, res) => {
  return res.render("home/index");
});

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/ngo/dashboard/" + req.user.username);
  } else {
    return res.render("home/login");
  }
});

router.get("/signup", (req, res) => {
  return res.render("home/signup");
});

router.get("/about", (req, res) => {
  return res.render("home/about");
});

router.get("/contact", (req, res) => {
  return res.render("home/contact");
});

router.get("/reset-password", (req, res) => {
  return res.render("home/reset");
});

router.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      address,
      address2,
      country,
      state,
      zip,
      ngoName,
      ngoType,
    } = req.body;

    const user = new User({
      firstName,
      lastName,
      username,
      email,
      address,
      address2,
      country,
      state,
      zip,
      ngoName,
      ngoType,
    });
    // Use setPassword method provided by passport-local-mongoose to set hashed password
    await user.setPassword(password);
    // Save user to database
    await user.save();

    // passport-local-mongoose method for creating new user with entered username and password field in register route
    req.login(user, (err) => {
      if (err) {
        console.error("Register Login Error: " + err);
        res.status(500).send(err.message);
      } else {
        return res.redirect("ngo/" + username + "/dashboard");
      }
    });
  } catch (err) {
    console.error("Register Error: " + err);
    res.status(500).send(err.message);
  }
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    req.login(user, (err) => {
      if (err) {
        console.log(err);
      } else {
        // Send it to specified route
        return res.redirect("ngo/" + user.username + "/dashboard");
      }
    });
  }
);

module.exports = router;

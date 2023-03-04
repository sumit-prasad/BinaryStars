const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");

// passport configuration
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get("/", (req, res) => {
  return res.render("home/index");
});

router.get("/login", (req, res) => {
  return res.render("home/login");
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

router.post("/signup", (req, res) => {
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

  // passport-local-mongoose method for creating new user with entered username and password field in register route
  User.register(
    {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      address: address,
      address2: address2,
      country: country,
      state: state,
      zip: zip,
      ngoName: ngoName,
      ngoType: ngoType,
    },
    password,
    (err, user) => {
      if (!err) {
        // passport method to authenticate the user and redirect them to /user route
        passport.authenticate("local")(req, res, () => {
          if (err) {
            console.log(err);
          }
        });
      }
    }
  );
  return res.redirect("ngo/dashboard/" + username);
});

router.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  console.log(user);
  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local", {
        failureRedirect: "/login",
      })(req, res, () => {
        // Send it to specified route
        return res.redirect("ngo/dashboard/" + user.username);
      });
    }
  });
});

module.exports = router;

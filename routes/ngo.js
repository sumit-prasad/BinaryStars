const router = require("express").Router();
const User = require("../models/user");

router.get("/dashboard/:username", (req, res) => {
  if (req.isAuthenticated()) {
    User.findOne({ username: req.params.username }).then((err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
        return res.render("ngo/dashboard");
      }
    });
  } else {
    return res.redirect("/login");
  }
});

module.exports = router;

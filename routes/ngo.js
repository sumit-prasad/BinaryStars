const router = require("express").Router();
const User = require("../models/user");

router.get("/:username/dashboard", async (req, res) => {
  if (req.isAuthenticated()) {
    return res.render("ngo/dashboard", { user: req.user });
  } else {
    return res.redirect("/login");
  }
});

router.get("/:username/profile", async (req, res) => {
  if (req.isAuthenticated()) {
    return res.render("ngo/profile", { user: req.user });
  } else {
    return res.redirect("/login");
  }
});

router.get("/:username/ngo/events", async (req, res) => {
  if (req.isAuthenticated()) {
    return res.render("ngo/events", { user: req.user });
  } else {
    return res.redirect("/login");
  }
});

router.get("/:username/all-ngos", async (req, res) => {
  if (req.isAuthenticated()) {
    return res.render("ngo/list-ngo", { user: req.user });
  } else {
    return res.redirect("/login");
  }
});

router.get("/:ngoName/support", async (req, res) => {
  if (req.isAuthenticated()) {
    return res.render("ngo/support", { user: req.user });
  } else {
    return res.redirect("/login");
  }
});

router.get("/:username/logout", async (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

module.exports = router;

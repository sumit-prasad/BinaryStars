const router = require("express").Router();

router.get("/", (req, res) => {
  return res.render("home/index");
});

router.get("/login", (req, res) => {
  return res.render("home/login");
});

module.exports = router;

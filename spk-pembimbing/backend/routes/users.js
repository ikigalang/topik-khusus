const router = require("express").Router();
let User = require("../models/users.model");

// search user
router.route("/").get((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.find({
    username: username,
    password: password,
  })
    .then((user) => res.json(user))
    .catch((error) => res.status(400).json("Error: " + error));
});

module.exports = router;

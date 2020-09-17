const router = require("express").Router();
let User = require("../models/users.model");

// get all user
router.route("/").get((req, res) => {
  User.find()
    .then((user) => res.json(user))
    .catch((error) => res.status(400).json("Error: " + error));
});

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

// add new user
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User({
    username: username,
    password: password,
  });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((error) => res.status(400).json("Error: " + error));
});

// update user
router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id).then((user) => {
    user.username = req.body.username;
    user.password = req.body.password;

    user
      .save()
      .then(() => res.json("User updated!"))
      .catch((error) => res.status(400).json("Error: " + error));
  });
});

// delete user
router.route("/delete/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted!"))
    .catch((error) => res.status(400).json("Error: " + error));
});

module.exports = router;

const router = require("express").Router();
let Statik = require("../models/statik.model");

// get all statik data
router.route("/").get((req, res) => {
  Statik.find()
    .then((statik) => res.json(statik))
    .catch((error) => res.status(400).json("Error: " + error));
});

// add new statik
router.route("/add").post((req, res) => {
  const pendidikan = req.body.pendidikan;
  const fungsional = req.body.fungsional;
  const kompetensi = req.body.kompetensi;
  const tingkat = req.body.tingkat;

  const newStatik = new Statik({
    pendidikan: pendidikan,
    fungsional: fungsional,
    kompetensi: kompetensi,
    tingkat: tingkat,
  });

  newStatik
    .save()
    .then(() => res.json("Statik added!"))
    .catch((error) => res.status(400).json("Error: " + error));
});

// update statik
router.route("/update/:id").post((req, res) => {
  Statik.findById(req.params.id).then((statik) => {
    statik.pendidikan = req.body.pendidikan;
    statik.fungsional = req.body.fungsional;
    statik.kompetensi = req.body.kompetensi;
    statik.tingkat = req.body.kuota;

    statik
      .save()
      .then(() => res.json("Tingkat updated!"))
      .catch((error) => res.status(400).json("Error; " + error));
  });
});

// delete user
router.route("/delete/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted!"))
    .catch((error) => res.status(400).json("Error: " + error));
});

module.exports = router;

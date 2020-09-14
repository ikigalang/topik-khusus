const router = require("express").Router();
let Bimbingan = require("../models/bimbingan.model");

// get all bimbingan
router.route("/").get((req, res) => {
  Bimbingan.find()
    .then((bimbingan) => res.json(bimbingan))
    .catch((error) => res.status(400).json("Error: " + error));
});

// add new bimbingan
router.route("/add").post((req, res) => {
  const nama = req.body.nama;
  const idPembimbing1 = req.body.pendidikan;
  const idPembimbing2 = req.body.fungsional;

  const newBimbingan = new Bimbingan({
    nama,
    idPembimbing1,
    idPembimbing2,
  });

  newBimbingan
    .save()
    .then(() => res.json("Bimbingan added!"))
    .catch((error) => res.status(400).json("Error: " + error));
});

// delete bimbingan
router.route("/delete/:id").delete((req, res) => {
  Bimbingan.findByIdAndDelete(req.params.id)
    .then(() => res.json("Bimbingan deleted!"))
    .catch((error) => res.status(400).json("Error: " + error));
});

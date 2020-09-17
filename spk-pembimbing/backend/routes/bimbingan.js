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
  const idPembimbing1 = req.body.idPembimbing1;
  const idPembimbing2 = req.body.idPembimbing2;

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

// update bobot
router.route("/update/:id").post((req, res) => {
  Bimbingan.findById(req.params.id).then((bimbingan) => {
    bimbingan.nama = req.body.nama;
    bimbingan.idPembimbing1 = req.body.idPembimbing1;
    bimbingan.idPembimbing2 = req.body.idPembimbing2;

    bimbingan
      .save()
      .then(() => res.json("Bimbingan updated!"))
      .catch((error) => res.status(400).json("Error; " + error));
  });
});

// delete bimbingan
router.route("/delete/:id").delete((req, res) => {
  Bimbingan.findByIdAndDelete(req.params.id)
    .then(() => res.json("Bimbingan deleted!"))
    .catch((error) => res.status(400).json("Error: " + error));
});

module.exports = router;

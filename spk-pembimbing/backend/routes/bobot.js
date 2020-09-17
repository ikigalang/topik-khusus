const router = require("express").Router();
let Bobot = require("../models/bobot.model");

// get all bobot
router.route("/").get((req, res) => {
  Bobot.find()
    .then((bobot) => res.json(bobot))
    .catch((error) => res.status(400).json("Error: " + error));
});

// add new bobot
router.route("/add").post((req, res) => {
  const pendidikan = req.body.pendidikan;
  const fungsional = req.body.fungsional;
  const kompetensi = req.body.kompetensi;
  const kuota = req.body.kuota;

  const newBobot = new Bobot({
    pendidikan: pendidikan,
    fungsional: fungsional,
    kompetensi: kompetensi,
    kuota: kuota,
  });

  newBobot
    .save()
    .then(() => res.json("Bobot added!"))
    .catch((error) => res.status(400).json("Error: " + error));
});

// update bobot
router.route("/update/:id").post((req, res) => {
  Bobot.findById(req.params.id).then((bobot) => {
    bobot.pendidikan = req.body.pendidikan;
    bobot.fungsional = req.body.fungsional;
    bobot.kompetensi = req.body.kompetensi;
    bobot.kuota = req.body.kuota;

    bobot
      .save()
      .then(() => res.json("Bobot updated!"))
      .catch((error) => res.status(400).json("Error; " + error));
  });
});

// delete bobot
router.route("/delete/:id").delete((req, res) => {
  Bobot.findByIdAndDelete(req.params.id)
    .then(() => res.json("Bobot deleted!"))
    .catch((error) => res.status(400).json("Error: " + error));
});

module.exports = router;

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
  const pendidikan1 = req.body.pembimbing1.pendidikan;
  const fungsional1 = req.body.pembimbing1.fungsional;
  const kompetensi1 = req.body.pembimbing1.kompetensi;
  const kuota1 = req.body.pembimbing1.kuota;
  const pendidikan2 = req.body.pembimbing2.pendidikan;
  const fungsional2 = req.body.pembimbing2.fungsional;
  const kompetensi2 = req.body.pembimbing2.kompetensi;
  const kuota2 = req.body.pembimbing2.kuota;
  console.log(pendidikan1);

  const newBobot = new Bobot({
    pembimbing1: {
      pendidikan: pendidikan1,
      fungsional: fungsional1,
      kompetensi: kompetensi1,
      kuota: kuota1,
    },
    pembimbing2: {
      pendidikan: pendidikan2,
      fungsional: fungsional2,
      kompetensi: kompetensi2,
      kuota: kuota2,
    },
  });

  newBobot
    .save()
    .then(() => res.json("Bobot added!"))
    .catch((error) => res.status(400).json("Error: " + error));
});

// update bobot
router.route("/update/:id").post((req, res) => {
  Bobot.findById(req.params.id).then((bobot) => {
    bobot.pembimbing1.pendidikan = req.body.pembimbing1.pendidikan;
    bobot.pembimbing1.fungsional = req.body.pembimbing1.fungsional;
    bobot.pembimbing1.kompetensi = req.body.pembimbing1.kompetensi;
    bobot.pembimbing1.kuota = req.body.pembimbing1.kuota;
    bobot.pembimbing2.pendidikan = req.body.pembimbing2.pendidikan;
    bobot.pembimbing2.fungsional = req.body.pembimbing2.fungsional;
    bobot.pembimbing2.kompetensi = req.body.pembimbing2.kompetensi;
    bobot.pembimbing2.kuota = req.body.pembimbing2.kuota;

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

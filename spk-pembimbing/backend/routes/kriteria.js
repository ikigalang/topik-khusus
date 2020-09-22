const router = require("express").Router();
let Kriteria = require("../models/kriteria.model");

// get all kriteria
router.route("/").get((req, res) => {
  Kriteria.find()
    .then((kriteria) => res.json(kriteria))
    .catch((error) => res.status(400).json("Error: " + error));
});

// add new kriteria
router.route("/add").post((req, res) => {
  const pendidikan1 = req.body.pembimbing1.pendidikan;
  const fungsional1 = req.body.pembimbing1.fungsional;
  const kompetensi1 = req.body.pembimbing1.kompetensi;
  const kuota1 = req.body.pembimbing1.kuota;
  const pendidikan2 = req.body.pembimbing2.pendidikan;
  const fungsional2 = req.body.pembimbing2.fungsional;
  const kompetensi2 = req.body.pembimbing2.kompetensi;
  const kuota2 = req.body.pembimbing2.kuota;

  const newBobot = new Kriteria({
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
    .then(() => res.json("Kriteria added!"))
    .catch((error) => res.status(400).json("Error: " + error));
});

// update krteria
router.route("/update/:id").post((req, res) => {
  Kriteria.findById(req.params.id).then((kriteria) => {
    kriteria.pembimbing1.pendidikan = req.body.pembimbing1.pendidikan;
    kriteria.pembimbing1.fungsional = req.body.pembimbing1.fungsional;
    kriteria.pembimbing1.kompetensi = req.body.pembimbing1.kompetensi;
    kriteria.pembimbing1.kuota = req.body.pembimbing1.kuota;
    kriteria.pembimbing2.pendidikan = req.body.pembimbing2.pendidikan;
    kriteria.pembimbing2.fungsional = req.body.pembimbing2.fungsional;
    kriteria.pembimbing2.kompetensi = req.body.pembimbing2.kompetensi;
    kriteria.pembimbing2.kuota = req.body.pembimbing2.kuota;

    kriteria
      .save()
      .then(() => res.json("Kriteria updated!"))
      .catch((error) => res.status(400).json("Error; " + error));
  });
});

// delete kriteria
router.route("/delete/:id").delete((req, res) => {
  Kriteria.findByIdAndDelete(req.params.id)
    .then(() => res.json("Kriteria deleted!"))
    .catch((error) => res.status(400).json("Error: " + error));
});

module.exports = router;

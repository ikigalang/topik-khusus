const router = require("express").Router();
let Pembimbing = require("../models/pembimbing.model");

// get all pembimbing
router.route("/").get((req, res) => {
  Pembimbing.find()
    .then((pembimbing) => res.json(pembimbing))
    .catch((error) => res.status(400).json("Error: " + error));
});

// find pembimbing by id
router.route("/:id").get((req, res) => {
  Pembimbing.findById(req.params.id)
    .then((pembimbing) => res.json(pembimbing))
    .catch((error) => res.status(400).json("Error: " + error));
});

// add new pembimbing
router.route("/add").post((req, res) => {
  const nik = req.body.nik;
  const nama = req.body.nama;
  const pendidikan = req.body.pendidikan;
  const fungsional = req.body.fungsional;
  const kompetensi1 = req.body.kompetensi1;
  const kompetensi2 = req.body.kompetensi2;
  const kompetensi3 = req.body.kompetensi3;
  const kuota = req.body.kuota;

  const newPembimbing = new Pembimbing({
    nik,
    nama,
    pendidikan,
    fungsional,
    kompetensi1,
    kompetensi2,
    kompetensi3,
    kuota,
  });

  newPembimbing
    .save()
    .then(() => res.json("Pembimbing added!"))
    .catch((error) => res.status(400).json("Error: " + error));
});

// update pembimbing
router.route("/update/:id").post((req, res) => {
  Pembimbing.findById(req.params.id).then((pembimbing) => {
    pembimbing.nik = req.body.nik;
    pembimbing.nama = req.body.nama;
    pembimbing.pendidikan = req.body.pendidikan;
    pembimbing.fungsional = req.body.fungsional;
    pembimbing.kompetensi1 = req.body.kompetensi1;
    pembimbing.kompetensi2 = req.body.kompetensi2;
    pembimbing.kompetensi3 = req.body.kompetensi3;
    pembimbing.kuota = req.body.kuota;

    pembimbing
      .save()
      .then(() => res.json("Pembimbing updated!"))
      .catch((error) => res.status(400).json("Error: " + error));
  });
});

// delete pembimbing
router.route("/delete/:id").delete((req, res) => {
  Pembimbing.findByIdAndDelete(req.params.id)
    .then(() => res.json("Pembimbing deleted!"))
    .catch((error) => res.status(400).json("Error: " + error));
});

module.exports = router;

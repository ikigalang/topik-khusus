const router = require("express").Router();
let Mahasiswa = require("../models/mahasiswa.model");

// get all mahasiswa
router.route("/").get((req, res) => {
  Mahasiswa.find()
    .then((mahasiswa) => res.json(mahasiswa))
    .catch((error) => res.status(400).json("Error: " + error));
});

// find mahasiswa by nim
router.route("/search/:nim").get((req, res) => {
  const query = { "nim": req.params.nim };
  Mahasiswa.findOne(query)
    .then((mahasiswa) => res.json(mahasiswa))
    .catch((error) => res.status(400).json("Error: " + error));
});

// add new mahasiswa
router.route("/add").post((req, res) => {
  const nim = req.body.nim;
  const nama = req.body.nama;

  const newMahasiswa = new Mahasiswa({
    nim,
    nama,
  });

  newMahasiswa
    .save()
    .then(() => res.json("Mahasiswa added!"))
    .catch((error) => res.status(400).json("Error: " + error));
});

// update mahasiswa
router.route("/update/:nim").post((req, res) => {
  const query = { "nim": req.params.nim };
  Mahasiswa.findOne(query).then((mahasiswa) => {
    mahasiswa.nim = req.body.nim;
    mahasiswa.nama = req.body.nama;

    mahasiswa
      .save()
      .then(() => res.json("Mahasiswa updated!"))
      .catch((error) => res.status(400).json("Error: " + error));
  });
});

// delete mahasiswa
router.route("/delete/:nim").delete((req, res) => {
  Mahasiswa.findByIdAndDelete(req.params.nim)
    .then(() => res.json("Mahasiswa deleted!"))
    .catch((error) => res.status(400).json("Error: " + error));
});

module.exports = router;

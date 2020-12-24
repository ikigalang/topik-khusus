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
  const konsentrasi = req.body.konsentrasi;

  const newMahasiswa = new Mahasiswa({
    nim,
    nama,
    konsentrasi
  });

  newMahasiswa
    .save()
    .then(() => res.json("Mahasiswa added!"))
    .catch((error) => res.status(400).json("Error: " + error));
});

// update mahasiswa
router.route("/update/:id").post((req, res) => {
  Mahasiswa.findById(req.params.id).then((mahasiswa) => {
    mahasiswa.nim = req.body.nim;
    mahasiswa.nama = req.body.nama;
    mahasiswa.konsentrasi = req.body.konsentrasi;

    mahasiswa
      .save()
      .then(() => res.json("Mahasiswa updated!"))
      .catch((error) => res.status(400).json("Error: " + error));
  });
});

// delete mahasiswa
router.route("/delete/:nim").delete((req, res) => {
  const query = { "nim": req.params.nim };
  Mahasiswa.findOne(query)
    .then((mahasiswa) => {
      Mahasiswa.findByIdAndDelete(mahasiswa._id)
        .then(() => res.json("Mahasiswa deleted!"))
        .catch((error) => res.status(400).json("Error: " + error));
    })
    .catch((error) => res.status(400).json("Error: " + error));
});

module.exports = router;

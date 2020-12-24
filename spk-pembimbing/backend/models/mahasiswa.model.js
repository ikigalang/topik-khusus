const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mahasiswaSchema = new Schema(
  {
    nim: {
      type: Number,
      required: true,
    },
    nama: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    konsentrasi: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Mahasiswa = mongoose.model("Mahasiswa", mahasiswaSchema);

module.exports = Mahasiswa;

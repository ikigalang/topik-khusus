const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bimbinganSchema = new Schema({
  nama: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  nim: {
    type: Number,
    required: true,
  },
  idPembimbing1: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  idPembimbing2: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
});

const Bimbingan = mongoose.model("Bimbingan", bimbinganSchema);

module.exports = Bimbingan;

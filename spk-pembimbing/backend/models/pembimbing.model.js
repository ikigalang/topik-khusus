const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pembimbingSchema = new Schema(
  {
    nik: {
      type: Number,
      required: true,
    },
    nama: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    pendidikan: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    fungsional: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    kompetensi: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    tingkat: {
      type: String,
      required: true,
      trim: true,
    },
    kuota: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Pembimbing = mongoose.model("Pembimbing", pembimbingSchema);

module.exports = Pembimbing;

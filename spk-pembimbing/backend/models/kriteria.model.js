const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const kriteriaSchema = new Schema(
  {
    pembimbing1: {
      pendidikan: {
        type: Number,
        required: true,
      },
      fungsional: {
        type: Number,
        required: true,
      },
      kompetensi: {
        type: Number,
        required: true,
      },
      kuota: {
        type: Number,
        required: true,
      },
    },
    pembimbing2: {
      pendidikan: {
        type: Number,
        required: true,
      },
      fungsional: {
        type: Number,
        required: true,
      },
      kompetensi: {
        type: Number,
        required: true,
      },
      kuota: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Kriteria = mongoose.model("Kriteria", kriteriaSchema);

module.exports = Kriteria;

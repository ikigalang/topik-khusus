const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bobotSchema = new Schema(
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

const Bobot = mongoose.model("Bobot", bobotSchema);

module.exports = Bobot;

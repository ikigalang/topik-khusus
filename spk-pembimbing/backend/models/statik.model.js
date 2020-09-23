const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const statikSchema = new Schema(
  {
    pendidikan: [
      {
        type: String,
        required: true,
      },
    ],
    fungsional: [
      {
        type: String,
        required: true,
      },
    ],
    kompetensi: [
      {
        type: String,
        required: true,
      },
    ],
    tingkat: [
      {
        type: Number,
        required: true,
      },
    ],
    bobot: [
      {
        type: Number,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Statik = mongoose.model("Statik", statikSchema);

module.exports = Statik;

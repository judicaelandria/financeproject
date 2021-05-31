const mongoose = require("mongoose");

const infoConjointSchema = new mongoose.Schema({
  informationConjointActeMariage: {
    type: String,
    required: true,
  },
  informationConjointNom: {
    type: String,
    required: true,
  },
  informationConjointPrenoms: {
    type: String,
    required: true,
  },
  informationConjointDateNaiss: {
    type: Date,
    required: true,
  },
  informationConjointSexe: {
    type: Boolean,
    required: true,
  },
  informationConjointCIN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Conjoint", infoConjointSchema);

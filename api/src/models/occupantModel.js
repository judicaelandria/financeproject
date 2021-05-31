const mongoose = require("mongoose");

const occupantModel = new mongoose.Schema({
  decision: {
    type: String,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  dateDeNaissance: {
    type: Date,
    required: true,
  },
  sexe: {
    type: String,
    required: true,
  },
  cin: {
    type: String,
    required: true,
  },
  fonction: {
    type: String,
    required: true,
  },
  anneeOccupation: {
    type: String,
    required: true,
  },
  occupantReel: {
    type: String,
    required: true,
  },
  acteDeMariage: {
    type: String,
    required: true,
  },
  nomConjoint: {
    type: String,
    required: true,
  },
  prenomConjoint: {
    type: String,
    required: true,
  },
  dateDeNaissanceConjoint: {
    type: Date,
    required: true,
  },
  sexeConjoint: {
    type: String,
    required: true,
  },
  cinConjoint: {
    type: String,
    required: true,
  },
  isAdministrationEmploye: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Occupant", occupantModel);

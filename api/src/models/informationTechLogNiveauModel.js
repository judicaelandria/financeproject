const mongoose = require("mongoose");

const infoTechLogNiveauSchema = new mongoose.Schema({
  infoTechLogNivNom: {
    type: String,
    required: true,
  },
  infoTechLogNivNombreDePorte: {
    type: Number,
    required: true,
  },
  infoTechLogNivTypesDePorte: {
    type: String,
    required: true,
  },
  infoTechLogNivNombreGrilleProtection: {
    type: Number,
    required: true,
  },
  infoTechLogNivTypeGrilleProtection: {
    type: String,
    required: true,
  },
  infoTechLogNivTypePlanche: {
    type: String,
    required: true,
  },
  infoTechLogNivNombrePiecePrincipale: {
    type: Number,
    required: true,
  },
  infoTechLogNivEtatVisuelExt: {
    type: Boolean,
    required: true,
    default: false,
  },
  infoTechLogNivEtatVisuelInt: {
    type: Boolean,
    required: true,
    default: false,
  },
  infoTechLogNivEtatVisuelIntBoisier: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.Schema("InfoNiveau", infoTechLogNiveauSchema);

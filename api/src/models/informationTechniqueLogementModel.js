const mongoose = require("mongoose");

const infoTechLogSchema = new mongoose.Schema({
  entiteLogementId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EntiteLogement",
  },
  infoTechLogDateSaisie: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  infoTechLogSurfaceBatie: {
    type: String,
    required: true,
  },
  infoTechLogCloture: {
    type: Boolean,
    required: true,
    default: false,
  },
  infoTechLogPortailPrincipal: {
    type: Boolean,
    required: true,
    default: false,
  },
  infoTechLogCour: {
    type: String,
    required: true,
  },
  infoTechLogParking: {
    type: Boolean,
    required: true,
    default: false,
  },
  infoTechLogJardin: {
    type: String,
    required: true,
  },
  infoTechLogAnneDeConstruction: {
    type: Boolean,
    required: true,
    default: false,
  },
  infoTechLogTypesMateriauxConstruction: {
    type: Boolean,
    required: true,
    default: false,
  },
  infoTechLogTypeDeToiture: {
    type: Boolean,
    required: true,
    default: false,
  },
  infoTechLogNivId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Niveau",
  },
});

module.exports = mongoose.model(
  "InformationTechniqueLogement",
  infoTechLogSchema
);

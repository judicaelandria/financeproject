const mongoose = require("mongoose");

const infoOccupantSchema = new mongoose.Schema({
  OccupantDeccisionAttribution: {
    type: String,
    required: true,
  },
  OccupantNom: {
    type: String,
    required: true,
  },
  OccupantPrenoms: {
    type: String,
    required: true,
  },
  OccupantDateNaiss: {
    type: Date,
    required: true,
  },
  OccupantSexe: {
    type: Boolean,
    required: true,
    default: false,
  },
  OccupantCIN: {
    type: String,
    required: true,
  },
  OccupantDateSaisie: {
    type: Date,
    required: true,
  },
  informationConjointId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conjoint",
  },
});

module.exports = mongoose.model("Occupant", infoOccupantSchema);

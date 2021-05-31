const mongoose = require("mongoose");

const infoTechLogPieceSchema = new mongoose.Schema({
  infoTechLogNivId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Niveau",
  },
  informationTechLogNom: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Piece", infoTechLogPieceSchema);

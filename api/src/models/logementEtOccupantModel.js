const mongoose = require("mongoose");

const logementEtOccupantSchema = new mongoose.Schema({
  informationTechLogPieceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Piece",
  },
  informationOccupantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Occupant",
  },
  logementEtOccupantDateSaisie: {
    type: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model("LogementEtOccupant", logementEtOccupantSchema);

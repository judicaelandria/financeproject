const mongoose = require("mongoose");

const ViabilisationSchema = new mongoose.Schema({
  entiteLogementId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Logement",
  },
  viablisationSourceEnergieElec: {
    type: Boolean,
    required: true,
    default: false,
  },
  viablisationAccesEnEau: {
    type: Boolean,
    required: true,
    default: false,
  },
  viablisationDateSaisie: {
    type: Date.now(),
    required: true,
  },
});

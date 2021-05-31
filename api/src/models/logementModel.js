const mongoose = require("mongoose");

const logementSchema = new mongoose.Schema(
  {
    typeBatiment: {
      type: String,
      required: true,
    },
    ministere: {
      type: String,
      required: true,
    },
    typeLogement: {
      type: String,
      required: true,
    },
    localisation: {
      type: String,
      required: true,
    },
    categorie: {
      type: String,
      required: true,
    },
    adresse: {
      type: String,
      required: true,
    },
    nomHotel: {
      type: String,
      required: true,
    },
    fokotany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fokotany",
    },
    isAttributed: {
      type: Boolean,
      default: false,
    },
    enceinteLieuTravail: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Logement", logementSchema);

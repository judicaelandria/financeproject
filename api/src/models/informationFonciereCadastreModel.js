const mongoose = require("mongoose");

const infoFonciereCadasteSchema = mongoose.Schema({
  InfoFoncCadastreNomProprietaire: {
    type: String,
    required: true,
  },
  InfoFoncCadastreNomLieuVillage: {
    type: String,
    required: true,
  },
  InfoFoncCadastreNumParcelle: {
    type: Number,
    required: true,
  },
  InfoFoncCadastreSurface: {
    type: String,
    required: true,
  },
  InfoFoncCadastreSection: {
    type: String,
    required: true,
  },
  InfoFoncCadastreRegistre: {
    type: Number,
    required: true,
  },
  InfoFoncCadastreNumFolio: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("FociereCadastre", infoFonciereCadasteSchema);

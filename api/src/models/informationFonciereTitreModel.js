const mongoose = require("mongoose");

const infoFonciereTitreSchema = new mongoose.Schema({
  InforFoncTitreCISJ: {
    type: Boolean,
    required: true,
  },
  InfoFoncTitreNomPropiete: {
    type: String,
    required: true,
  },
  InfoFoncTitreNumTitre: {
    type: String,
    required: true,
  },
  InfoFoncTitreSurface: {
    type: String,
    required: true,
  },
  InfoFoncTitreNomProprietaire: {
    type: Boolean,
    required: true,
  },
  InfoFoncTitreAffectation: {
    type: String,
    required: true,
  },
  InfoFoncTitreCoordonneGPSX: {
    type: String,
    required: true,
  },
  InfoFoncTitreCoordonneGPSY: {
    type: String,
    required: true,
  },
});

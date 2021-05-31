const mongoose = require("mongoose");

const fokotanySchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  commune: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Commune",
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Fokotany", fokotanySchema);

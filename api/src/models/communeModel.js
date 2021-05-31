const mongoose = require("mongoose");

const communeSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    region: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Region",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Commune", communeSchema);

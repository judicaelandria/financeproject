const mongoose = require("mongoose");

const ministereSchema = new mongoose.Schema({
  minCode: {
    type: String,
    required: true,
  },
  minLibelle: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ministere", ministereSchema);

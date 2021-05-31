const mongoose = require("mongoose")

const proprietaireSchema = new mongoose.Schema({
	logement: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Logement"
	},
	nomProprietaire: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	famille: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model("Proprietaire", proprietaireSchema)

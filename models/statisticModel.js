const mongoose = require("mongoose");

const statisticSchema = new mongoose.Schema({
  statisticName: {
    type: String,
    required: [true, "veuillez entrer le nom de la statistique"],
    maxlength: [50, "le nom ne peut pas dépasser 50 caractères"],
  },
  statisticType: {
    type: String,
    required: [true, "veuillez entrer le type de la statistique"],
    enum: ["counter", "timer"],
  },
  unit: {
    type: String,
    required: [true, "veuillez spécifier le type de la statistique"],
  },
  description: {
    type: String,
    required: false,
  },
  lien: {
    type: String,
    required: false,
  },
  visible: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Statistic", statisticSchema);

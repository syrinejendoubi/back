const mongoose = require("mongoose");

const statisticSchema = new mongoose.Schema(
  {
    statisticName: {
      type: String,
      required: [true, "veuillez entrer le nom de la statistique"],
      maxlength: [50, "le nom ne peut pas dépasser 50 caractères"],
    },
    statisticType: {
      type: String,
      required: [true, "veuillez entrer le type de la statistique"],
      enum: ["compteur", "timer"],
    },
    unit: {
      type: String,
      required: [true, "veuillez spécifier le type de la statistique"],
    },
    description: {
      type: String,
      required: true,
    },
    lien: {
      type: String,
    },
    max: {
      type: Boolean,
    },
    nbreFois: {
      type: Number,
    },

    alerted: {
      type: Boolean,
      default: true,
    },
    discipline:{
      type: mongoose.Schema.Types.ObjectId
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Statistic", statisticSchema);

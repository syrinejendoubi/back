const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema(
  {
    skillName: {
      type: String,
      required: [true, "veuillez entrer le nom de la compétence"],
      maxlength: [50, "le nom ne peut pas dépasser 50 caractères"],
    },
    description: {
      type: String,
      required: true,
    },
    lien: {
      type: String,
      required: false,
    },
    max: {
      type: Boolean,
      required: false,
    },
    nbreFois: {
      type: Number,
      required: false,
    },

    alerted: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("skill", skillsSchema);

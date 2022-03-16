const mongoose = require("mongoose");

const disciplineSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: [true, "veuillez entrer label "],
    },
    icon: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Discipline", disciplineSchema);

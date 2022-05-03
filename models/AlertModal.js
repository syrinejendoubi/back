const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema(
  {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    statistique: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Statistic",
    },
    alertType: {
      type: String,
      enum: ["utile", "non utile"],
      default: "utile",
    },
    isPositiveAlert: Boolean,
    date: String,
    maximiser: Boolean,
    valeurObj: Number,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Alert", AlertSchema);

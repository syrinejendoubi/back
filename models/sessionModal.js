const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, "veuillez entrer le nom du défi"],
    },
    creactedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    programme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Programme",
    },
    statistics: [
      {
        statistic: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Statistic",
        },
        value: {
          type: Number,
          default: null,
        },
      },
    ],
    skills: [
      {
        skill: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "skill",
        },
        value: {
          type: Number,
          default: null,
        },
      },
    ],
    trainingGround: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainingGround",
    },
    feedback: {
      goalAcheived: Boolean,
      description: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Session", sessionSchema);

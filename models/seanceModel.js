const mongoose = require("mongoose");

const seanceSchema = new mongoose.Schema(
  {
    seanceName: {
      type: String,
      required: [true, "veuillez entrer le nom du seance "],
    },
    dateSeance: {
      type: Date,
      required: [true, "veuillez entrer date "],
    },
    createdAt: {
      type: Date,
      default: Date.now,
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
    sessionCancelled: {
      isCancelled: { type: Boolean, default: false },
      reason: String,
    },
    sessionStatus: {
      type: String,
      enum: ["Planifié", "Terminé"],
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Seance", seanceSchema);

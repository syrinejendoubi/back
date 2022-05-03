const mongoose = require("mongoose");

const playerObjectiveSchema = new mongoose.Schema(
  {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    statistics: [
      {
        statistic: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Statistic",
        },
        value: {
          type: Number,
          default: undefined,
        },
        beforeDate: {
          type: Date,
          required: true,
        },
        done: {
          type: Boolean,
          default: false,
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
          default: undefined,
        },
        beforeDate: {
          type: Date,
          required: true,
        },
        done: {
          type: Boolean,
          default: false,
        },
      },
    ],
    creactedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

playerObjectiveSchema.pre("save", function () {});
module.exports = mongoose.model("playerObjective", playerObjectiveSchema);

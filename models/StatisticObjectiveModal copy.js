const mongoose = require("mongoose");

const playerStatisticObjectiveSchema = new mongoose.Schema(
  {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

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
    creactedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "StatisticObjective",
  playerStatisticObjectiveSchema
);

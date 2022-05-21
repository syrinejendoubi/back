const mongoose = require("mongoose");

const playerStatisticObjectiveSchema = new mongoose.Schema(
  {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    statistic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Statistic",
      required: true,
    },
    value: {
      type: Number,
      default: undefined,
      required: true,
    },
    beforeDate: {
      type: Date,
      required: true,
    },
    done: {
      type: Boolean,
      default: false,
      required: true,
    },
    creactedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

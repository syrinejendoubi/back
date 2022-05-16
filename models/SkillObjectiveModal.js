const mongoose = require("mongoose");

const playerSkillObjectiveSchema = new mongoose.Schema(
  {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
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
    creactedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SkillObjective", playerSkillObjectiveSchema);

const mongoose = require("mongoose");

const assignedChallengeSchema = new mongoose.Schema(
  {
    defi: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Defi",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    done: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    deadline: { type: Date },
  },
  { timestamps: true }
);
module.exports = mongoose.model("AssignedChallenge", assignedChallengeSchema);

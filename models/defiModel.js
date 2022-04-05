const mongoose = require("mongoose");

const defiSchema = new mongoose.Schema(
  {
    defiName: {
      type: String,
      required: [true, "veuillez entrer le nom du défi"],
    },
    defiObjectif: {
      type: String,
    },
    defiLien: {
      type: String,
    },
    defiVisible: {
      type: Boolean,
      default: false,
    },
    creacteBy: {
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
    expired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Defi", defiSchema);

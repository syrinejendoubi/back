const mongoose = require("mongoose");

const defiSchema = new mongoose.Schema(
    defiName: {
        type: String,
        required: [true, "veuillez entrer le nom du défi"],
        maxlength: [80, "le nom ne peut pas dépasser 80 caractères"],
    },
    defiObjectif: {
        type: String,
        required: false,
    },
    defiLien: {
        type: String,
        required: false,
    },
    defiVisible: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    creacteBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    expired : {
        type: Boolean,
        default : false
    } 
)
module.exports = mongoose.model("Defi", defiSchema);

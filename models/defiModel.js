const mongoose = require("mongoose");

const defiSchema = new mongoose.Schema(
    {
    defiName: {
        type: String,
        required: [true, "veuillez entrer le nom du défi"]
    },
    defiObjectif: {
        type: String
    },
    defiLien: {
        type: String
    },
    defiVisible: {
        type: Boolean,
        default: true,
    },
    creacteBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
  
    dateExpiration: Date ,
    },
    {   timestamps: true 
    }
);
module.exports = mongoose.model("Defi", defiSchema);

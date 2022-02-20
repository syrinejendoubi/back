const mongoose = require("mongoose");

const disciplineSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            required: [true, "label is required"]
        },
        icon : String 
    },
    {   timestamps: true 
    }
    );

module.exports = mongoose.model("Discipline", disciplineSchema);

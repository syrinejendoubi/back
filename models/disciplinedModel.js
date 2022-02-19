const mongoose = require("mongoose");

const disciplinedSchema = new mongoose.Schema(
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

module.exports = mongoose.model("Disciplined", disciplinedSchema);

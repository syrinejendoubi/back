const mongoose = require("mongoose");

const programmeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "veuillez entrer title "]
        },
        description: {
            type: String,
            required: [true,"veuillez entrer description"]
        },
        image: {
            type: String
        },
        videoLink: {
            type: String
        },
        skills :  [{ type: mongoose.Schema.Types.ObjectId, ref: 'skill' }] ,
        statistics : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Statistic' }],
        creacteBy : {
            type: mongoose.Schema.Types.ObjectId,
            ref : "User",
        }
    },
    {   
        timestamps: true 
    }
    );

module.exports = mongoose.model("Programme", programmeSchema);

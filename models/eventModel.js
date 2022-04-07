const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
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
        dateExpiration: Date ,
        etat : {
            type : String ,
            enum : ["Pour Tous","Mes Joueurs"]

        } ,
       
        creacteBy : {
            type: mongoose.Schema.Types.ObjectId,
            ref : "User",
        }
    },
    {   
        timestamps: true 
    }
    );

module.exports = mongoose.model("Event", eventSchema);

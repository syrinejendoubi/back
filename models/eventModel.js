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
       
        etat : {
            type : String ,
            enum : ["Pour Tous","Mes Joueurs"]

        } ,
        participants :  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] ,
        image: {
            type: String
        },
        dateEvent: Date ,
        creacteBy : {
            type: mongoose.Schema.Types.ObjectId,
            ref : "User",
        },
        eventVisible: {
            type: Boolean,
            default: true,
        },
    },
    {   
        timestamps: true 
    }
    );

module.exports = mongoose.model("Event", eventSchema);

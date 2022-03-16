const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const invitationSchema = new mongoose.Schema(
    {
        dateExpiration: Date ,
        etat : {
            type : String ,
            enum : ["accepté","refusé","envoyé","annulé","consulté"]

        } ,
        creacteBy : {
            type: mongoose.Schema.Types.ObjectId,
            ref : "User",
        },
        acceptedBy : {
            type: mongoose.Schema.Types.ObjectId,
            ref : "User",
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            required: "l'adresse email est obligatoire",
            validate: [isEmail, "veuillez saisir une adresse e-mail valide"],
          },
        userData : {},
        expired : {
            type: Boolean,
            default : false
        } 
    },
    {   timestamps: true 
    }
    );

module.exports = mongoose.model("Invitation", invitationSchema);

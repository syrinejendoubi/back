const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const invitationSchema = new mongoose.Schema(
    {
        dateExpiration: Date ,
        etat : {
            type : String ,
            enum : ["accepté","refusé","envoyé","annulé"]

        } ,
        creacteBy : {
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
        userData : {}
    },
    {   timestamps: true 
    }
    );

module.exports = mongoose.model("Invitation", invitationSchema);

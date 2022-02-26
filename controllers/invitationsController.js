const Invitation = require("../models/invitationModel");
const sendEmail = require("../utils/sendEmail");

//Create new Invitation
exports.createInvitation = async (req, res) => {
    // Request validation
    const invitationData = req.body ;
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Invitation content can not be empty"
        });
    }
    // Create a Invitation
    const invitation = new Invitation(invitationData);

    // Save Invitation in the database
    invitation.save()
    .catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the invitation."
        });
    });
    
    const url = `http://127.0.0.1:3000/invitation/${invitation.id}`;
    const message = `<html><body><h1>invitation HiCotech </h1><a href=${url}>Accepter</a></body></html>` ;
    try {
        await sendEmail({
            email: invitation.email,
            subject: "Invitation Hicotech",
            message,
        });
        res.status(200).json({
            message:
              "invitation envoyée avec succès ",
          });
    } catch (err) {
        return next(new ErrorResponse("Email n'a pas pu être envoyé", 500));
    }
        
    
};

// Retrieve all invitations from the database.
exports.findAllInvitation = (req, res) => {
    const data = req.query  ;
    Invitation.find(data)
    .then(invitations => {
        res.send(invitations);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving invitations."
        });
    });
};

// Find a single invitation with a invitationId
exports.findInvitation = (req, res) => {
    Invitation.findById(req.params.invitationId)
    .then(invitation => {
        if(!invitation) {
            return res.status(404).send({
                message: "Invitation not found with id " + req.params.invitationId
            });            
        }
        res.send(invitation);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Invitation not found with id " + req.params.invitationId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving invitation with id " + req.params.invitationId
        });
    });
};

// Update a invitation
exports.updateInvitation = (req, res) => {
    // Validate Request
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Invitation content can not be empty"
        });
    }

    // Find and update invitation with the request body
    Invitation.findByIdAndUpdate(req.params.invitationId, req.body , {new: true})
    .then(invitation => {
        if(!invitation) {
            return res.status(404).send({
                message: "Invitation not found with id " + req.params.invitationId
            });
        }
        res.send(invitation);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Invitation not found with id " + req.params.invitationId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.invitationId
        });
    });
};

// Delete a note with the specified Id in the request
exports.deleteInvitation = (req, res) => {
    Invitation.findByIdAndRemove(req.params.invitationId)
    .then(invitation => {
        if(!invitation) {
            return res.status(404).send({
                message: "Invitation not found with id " + req.params.invitationId
            });
        }
        res.send({message: "Invitation deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Invitation not found with id " + req.params.invitationId
            });                
        }
        return res.status(500).send({
            message: "Could not delete invitation with id " + req.params.invitationId
        });
    });
};
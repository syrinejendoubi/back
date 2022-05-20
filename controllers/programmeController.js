const Programme = require("../models/programmeModel");

//Create new Programme
exports.createProgramme = (req, res) => {
    // Request validation
    const programmeData = req.body ;
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Programme content can not be empty"
        });
    }

    // Create a Programme
    const programme = new Programme(programmeData);

    // Save Programme in the database
    programme.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the programme."
        });
    });
};

// Retrieve all programmes from the database.
exports.findAllProgramme = (req, res) => {
    const data = req.query  ;
    Programme.find(data).populate('statistics').populate('skills')
    .then(programmes => {
        res.send(programmes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving programmes."
        });
    });
};

// Find a single programme with a programmeId
exports.findProgramme = (req, res) => {
    Programme.findById(req.params.programmeId).populate('statistics').populate('skills')
    .then(programme => {
        if(!programme) {
            return res.status(404).send({
                message: "Programme not found with id " + req.params.programmeId
            });            
        }
        res.send(programme);
    }).catch(err => {
        return res.status(500).send({
            message: "Something wrong retrieving programme with id " + req.params.programmeId
        });
    });
};

// Update a programme
exports.updateProgramme = (req, res) => {
    // Validate Request
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Programme content can not be empty"
        });
    }

    // Find and update programme with the request body
    Programme.findByIdAndUpdate(req.params.programmeId, req.body , {new: true})
    .then(programme => {
        if(!programme) {
            return res.status(404).send({
                message: "Programme not found with id " + req.params.programmeId
            });
        }
        res.send(programme);
    }).catch(err => {
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.programmeId
        });
    });
};

// Delete a note with the specified Id in the request
exports.deleteProgramme = (req, res) => {
    Programme.findByIdAndRemove(req.params.programmeId)
    .then(programme => {
        if(!programme) {
            return res.status(404).send({
                message: "Programme not found with id " + req.params.programmeId
            });
        }
        res.send({message: "Programme deleted successfully!"});
    }).catch(err => {
        return res.status(500).send({
            message: "Could not delete programme with id " + req.params.programmeId
        });
    });
};
const Disciplined = require("../models/disciplinedModel");

//Create new Disciplined
exports.createDisciplined = (req, res) => {
    // Request validation
    const disciplinedData = req.body ;
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Disciplined content can not be empty"
        });
    }

    // Create a Disciplined
    const disciplined = new Disciplined(disciplinedData);

    // Save Disciplined in the database
    disciplined.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the disciplined."
        });
    });
};

// Retrieve all disciplineds from the database.
exports.findAllDisciplined = (req, res) => {
    Disciplined.find()
    .then(disciplineds => {
        res.send(disciplineds);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving disciplineds."
        });
    });
};

// Find a single disciplined with a disciplinedId
exports.findDisciplined = (req, res) => {
    Disciplined.findById(req.params.disciplinedId)
    .then(disciplined => {
        if(!disciplined) {
            return res.status(404).send({
                message: "Disciplined not found with id " + req.params.disciplinedId
            });            
        }
        res.send(disciplined);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Disciplined not found with id " + req.params.disciplinedId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving disciplined with id " + req.params.disciplinedId
        });
    });
};

// Update a disciplined
exports.updateDisciplined = (req, res) => {
    // Validate Request
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Disciplined content can not be empty"
        });
    }

    // Find and update disciplined with the request body
    Disciplined.findByIdAndUpdate(req.params.disciplinedId, req.body , {new: true})
    .then(disciplined => {
        if(!disciplined) {
            return res.status(404).send({
                message: "Disciplined not found with id " + req.params.disciplinedId
            });
        }
        res.send(disciplined);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Disciplined not found with id " + req.params.disciplinedId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.disciplinedId
        });
    });
};

// Delete a note with the specified Id in the request
exports.deleteDisciplined = (req, res) => {
    Disciplined.findByIdAndRemove(req.params.disciplinedId)
    .then(disciplined => {
        if(!disciplined) {
            return res.status(404).send({
                message: "Disciplined not found with id " + req.params.disciplinedId
            });
        }
        res.send({message: "Disciplined deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Disciplined not found with id " + req.params.disciplinedId
            });                
        }
        return res.status(500).send({
            message: "Could not delete disciplined with id " + req.params.disciplinedId
        });
    });
};
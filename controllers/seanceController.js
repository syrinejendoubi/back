const Seance = require("../models/seanceModel");

//Create new Seance
exports.createSeance = (req, res) => {
    // Request validation
    const seanceData = req.body ;
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Seance content can not be empty"
        });
    }

    // Create a Seance
    const seance = new Seance(seanceData);

    // Save Seance in the database
    seance.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the seance."
        });
    });
};

// Retrieve all seances from the database.
exports.findAllSeance = (req, res) => {
    const data = req.query  ;
    Seance.find(data).populate('statistics')
    .then(seances => {
        res.send(seances);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving seances."
        });
    });
};

// Find a single seance with a seanceId
exports.findSeance = (req, res) => {
    Seance.findById(req.params.seanceId).populate('statistics')
    .then(seance => {
        if(!seance) {
            return res.status(404).send({
                message: "Seance not found with id " + req.params.seanceId
            });            
        }
        res.send(seance);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Seance not found with id " + req.params.seanceId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving seance with id " + req.params.seanceId
        });
    });
};

// Update a seance
exports.updateSeance = (req, res) => {
    // Validate Request
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Seance content can not be empty"
        });
    }

    // Find and update seance with the request body
    Seance.findByIdAndUpdate(req.params.seanceId, req.body , {new: true})
    .then(seance => {
        if(!seance) {
            return res.status(404).send({
                message: "Seance not found with id " + req.params.seanceId
            });
        }
        res.send(seance);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Seance not found with id " + req.params.seanceId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.seanceId
        });
    });
};

// Delete a note with the specified Id in the request
exports.deleteSeance = (req, res) => {
    Seance.findByIdAndRemove(req.params.seanceId)
    .then(seance => {
        if(!seance) {
            return res.status(404).send({
                message: "Seance not found with id " + req.params.seanceId
            });
        }
        res.send({message: "Seance deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Seance not found with id " + req.params.seanceId
            });                
        }
        return res.status(500).send({
            message: "Could not delete seance with id " + req.params.seanceId
        });
    });
};
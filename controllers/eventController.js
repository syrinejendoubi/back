const Event = require("../models/eventModel");
const User = require("../models/userModel");

//Create new Event
exports.createEvent = (req, res) => {
    // Request validation
    const eventData = req.body ;
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Event content can not be empty"
        });
    }

    // Create a Event
    const event = new Event(eventData);

    // Save Event in the database
    event.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the event."
        });
    });
};

// Retrieve all events from the database.
exports.findAllEvent = (req, res) => {
    const data = req.query  ;
    Event.find(data)
    .then(events => {
        res.send(events);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving events."
        });
    });
};

// Find a single event with a eventId
exports.findEvent = (req, res) => {
    Event.findById(req.params.eventId)
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });            
        }
        res.send(event);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving event with id " + req.params.eventId
        });
    });
};

// Update a event
exports.updateEvent = (req, res) => {
    // Validate Request
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Event content can not be empty"
        });
    }

    // Find and update event with the request body
    Event.findByIdAndUpdate(req.params.eventId, req.body , {new: true})
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });
        }
        res.send(event);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.eventId
        });
    });
};

// Delete a note with the specified Id in the request
exports.deleteEvent = (req, res) => {
    Event.findByIdAndRemove(req.params.eventId)
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });
        }
        res.send({message: "Event deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });                
        }
        return res.status(500).send({
            message: "Could not delete event with id " + req.params.eventId
        });
    });
};

exports.findEventCratedByMycoachs = async (req, res) => {
    
    const user = await User.findById(req.params.userId);
    
    Event
    .find({$or:[{
        etat : "Pour Tous",
        eventVisible : true 
    },
    {
        etat : "Mes Joueurs",
        eventVisible : true,
        creacteBy: user.mycoaches  
    }]
    })
    .then(events => {
        res.send(events);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving events."
        });
    });

};
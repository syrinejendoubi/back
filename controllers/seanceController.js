const Seance = require("../models/seanceModel");
const sendEmail = require("../utils/sendEmail");
var jsrender = require("jsrender");
//Create new Seance
exports.createSeance = (req, res) => {
  // Request validation
  const seanceData = req.body;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Seance content can not be empty",
    });
  }

  // Create a Seance
  const seance = new Seance(seanceData);

  // Save Seance in the database
  seance
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something wrong while creating the seance.",
      });
    });
};
exports.cancelSession = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Seance content can not be empty",
    });
  }

  Seance.findByIdAndUpdate(req.params.seanceId, req.body, { new: true })
    .populate("creactedBy")
    .populate("player")
    .exec()
    .then((seance) => {
      if (!seance) {
        return res.status(404).send({
          message: "Seance not found with id " + req.params.seanceId,
        });
      }
      const template = jsrender.templates("./templates/annulerSeance.html");

      const message = template.render({
        P_firstname: seance?.player?.firstName,
        P_lastname: seance?.player?.lastName,
        C_firstname: seance?.creactedBy?.firstName,
        C_lastname: seance?.creactedBy?.lastName,
        date: seance?.dateSeance.toISOString().slice(0, 10),
        raison: seance?.sessionCancelled?.reason,
      });

      try {
        sendEmail({
          email: seance.player.email,
          subject: "Annulation Seance ",
          message,
        });

        return res.send(seance);
      } catch (err) {
        return next(new ErrorResponse("Email n'a pas pu être envoyé", 500));
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Seance not found with id " + req.params.seanceId,
        });
      }
      return res.status(500).send({
        message: "Something wrong updating note with id " + req.params.seanceId,
      });
    });
};

// Retrieve all seances from the database.
exports.findAllSeance = (req, res) => {
  const data = req.query;
  Seance.find(data)
    .populate("statistics.statistic")
    .populate("skills.skill")
    .sort("dateSeance")
    .then((seances) => {
      res.send(seances);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving seances.",
      });
    });
};

// Find a single seance with a seanceId
exports.findSeance = (req, res) => {
  Seance.findById(req.params.seanceId)
    .populate("statistics")
    .then((seance) => {
      if (!seance) {
        return res.status(404).send({
          message: "Seance not found with id " + req.params.seanceId,
        });
      }
      res.send(seance);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Seance not found with id " + req.params.seanceId,
        });
      }
      return res.status(500).send({
        message:
          "Something wrong retrieving seance with id " + req.params.seanceId,
      });
    });
};

// Update a seance
exports.updateSeance = (req, res) => {
  // Validate Request
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Seance content can not be empty",
    });
  }

  // Find and update seance with the request body
  Seance.findByIdAndUpdate(req.params.seanceId, req.body, { new: true })
    .then((seance) => {
      if (!seance) {
        return res.status(404).send({
          message: "Seance not found with id " + req.params.seanceId,
        });
      }
      res.send(seance);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Seance not found with id " + req.params.seanceId,
        });
      }
      return res.status(500).send({
        message: "Something wrong updating note with id " + req.params.seanceId,
      });
    });
};

// Delete a note with the specified Id in the request
exports.deleteSeance = (req, res) => {
  Seance.findByIdAndRemove(req.params.seanceId)
    .then((seance) => {
      if (!seance) {
        return res.status(404).send({
          message: "Seance not found with id " + req.params.seanceId,
        });
      }
      res.send({ message: "Seance deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Seance not found with id " + req.params.seanceId,
        });
      }
      return res.status(500).send({
        message: "Could not delete seance with id " + req.params.seanceId,
      });
    });
};

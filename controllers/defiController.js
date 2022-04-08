const Defi = require("../models/defiModel");
//Create new Defi
exports.createDefi = (req, res) => {
  // Request validation
  const defiData = req.body;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Defi content can not be empty",
    });
  }

  // Create a Defi
  const defi = new Defi(defiData);

  // Save Defi in the database
  defi
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something wrong while creating the defi.",
      });
    });
};

// Retrieve all defis from the database.
exports.findAllDefi = (req, res) => {
  const data = req.query;
  Defi.find(data)
    .populate("creacteBy")
    .then((defis) => {
      res.send(defis);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving defis.",
      });
    });
};

// Find a single defi with a defiId
exports.findDefi = (req, res) => {
  Defi.findById(req.params.defiId)
    .then((defi) => {
      if (!defi) {
        return res.status(404).send({
          message: "Defi not found with id " + req.params.defiId,
        });
      }
      res.send(defi);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Defi not found with id " + req.params.defiId,
        });
      }
      return res.status(500).send({
        message: "Something wrong retrieving defi with id " + req.params.defiId,
      });
    });
};

// Update a defi
exports.updateDefi = (req, res) => {
  // Validate Request
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Defi content can not be empty",
    });
  }

  // Find and update defi with the request body
  Defi.findByIdAndUpdate(req.params.defiId, req.body, { new: true })
    .then((defi) => {
      if (!defi) {
        return res.status(404).send({
          message: "Defi not found with id " + req.params.defiId,
        });
      }
      res.send(defi);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Defi not found with id " + req.params.defiId,
        });
      }
      return res.status(500).send({
        message: "Something wrong updating note with id " + req.params.defiId,
      });
    });
};
// assign a challenge to multiple players
exports.assignChallenge = (req, res) => {
  // Validate Request
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Defi content can not be empty",
    });
  }

  // Find and update challenge with the request body
  Defi.findByIdAndUpdate(req.params.defiId, req.body, { new: true })
    .then((defi) => {
      if (!defi) {
        return res.status(404).send({
          message: "Challenge not found ",
        });
      }
      res.send(defi);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Challenge not found",
        });
      }
      return res.status(500).send({
        message: "Something wrong",
      });
    });
};

// Delete a note with the specified Id in the request
exports.deleteDefi = (req, res) => {
  Defi.findByIdAndRemove(req.params.defiId)
    .then((defi) => {
      if (!defi) {
        return res.status(404).send({
          message: "Defi not found with id " + req.params.defiId,
        });
      }
      res.send({ message: "Defi deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Defi not found with id " + req.params.defiId,
        });
      }
      return res.status(500).send({
        message: "Could not delete defi with id " + req.params.defiId,
      });
    });
};

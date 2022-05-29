const AssignChallenge = require("../models/assignChallengeModel");
//Create new Defi
exports.assignChallenge = (req, res) => {
  // Request validation
  const defiData = req.body;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Defi content can not be empty",
    });
  }

  const assignedChallenge = new AssignChallenge(defiData);

  assignedChallenge
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
exports.findAllAssignedChallenges = async (req, res) => {
  const data = req.query;
  AssignChallenge.find(data)
    .populate("createdBy")
    .populate("defi")
    .sort("-createdAt")
    .then((defis) => {
      return res.send(defis);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving defis.",
      });
    });
};
exports.findAllAssignedChallengesFull = (req, res) => {
  const data = req.query;
  AssignChallenge.find(data)
    .populate("defi")
    .populate("done")
    .populate("assignedTo")
    .sort("-createdAt")
    .then((defis) => {
      res.send(defis);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving defis.",
      });
    });
};

exports.updateAssignedChallenge = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Challenge content can not be empty",
    });
  }

  // Find and update challenge with the request body
  AssignChallenge.findByIdAndUpdate(req.params.defiId, req.body, { new: true })
    .then((challenge) => {
      if (!challenge) {
        return res.status(404).send({
          message: "Challenge not found ",
        });
      }
      res.send(challenge);
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

const Objective = require("../models/playerObjectiveModal");

//Create new Seance
exports.createObjective = (req, res) => {
  // Request validation
  const objectiveData = req.body;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "les champs ne peuvent pas étre vide",
    });
  }

  // Create a Seance
  const ojective = new Objective(objectiveData);

  // Save Seance in the database
  ojective
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Un erreur est servenu lors de la création de l'objectif.",
      });
    });
};

// Retrieve all seances from the database.
exports.findAllObjective = (req, res) => {
  const data = req.query;
  Objective.find(data)
    .populate({
      path: "statistics.statistic",
      model: "Statistic",
    })
    .populate({ path: "player", model: "User" })
    .populate({
      path: "skills.skill",
      model: "skill",
    })
    .populate({
      path: "creactedBy",
      model: "User",
    })

    .then((objective) => {
      res.send(objective);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Un erreur est servenu lors de la création de l'objectif.",
      });
    });
};

// Find a single seance with a seanceId
exports.findObjective = (req, res) => {
  Objective.findById(req.params.objectiveId)
    .populate({
      path: "statistics.statistic",
      model: "Statistic",
    })
    .populate({ path: "player", model: "User" })
    .populate({
      path: "skills.skill",
      model: "skill",
    })
    .populate({
      path: "creactedBy",
      model: "User",
    })
    .then((objective) => {
      if (!objective) {
        return res.status(404).send({
          message: "objective not found with id " + req.params.objectiveId,
        });
      }
      res.send(objective);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "objective not found with id " + req.params.objectiveId,
        });
      }
      return res.status(500).send({
        message:
          "Something wrong retrieving seance with id " + req.params.objectiveId,
      });
    });
};
exports.findObjectiveByCoach = (req, res) => {
  const data = req.query;
  Objective.findOne(data)
    .populate({
      path: "statistics.statistic",
      model: "Statistic",
    })
    .populate({ path: "player", model: "User" })
    .populate({
      path: "skills.skill",
      model: "skill",
    })
    .populate({
      path: "creactedBy",
      model: "User",
    })
    .then((objective) => {
      if (!objective) {
        return res.status(404).send({
          message:
            "objective not found with coachId: " +
            data.creactedBy +
            " and PLayerID: " +
            data.creactedBy,
        });
      }
      res.send(objective);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message:
            "objective not found with coachId: " +
            data.creactedBy +
            " and PLayerID: " +
            data.creactedBy,
        });
      }
      return res.status(500).send({
        message: "Something wrong retrieving objective with the specidfied id",
      });
    });
};

// Update a seance
exports.updateObjective = (req, res) => {
  // Validate Request
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "les champs ne peuvent pas étre vide",
    });
  }

  // Find and update seance with the request body
  Objective.findByIdAndUpdate(req.params.objectiveId, req.body, { new: true })
    .then((objective) => {
      if (!objective) {
        return res.status(404).send({
          message: "Objective not found with id " + req.params.objectiveId,
        });
      }
      res.send(objective);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Objective not found with id " + req.params.objectiveId,
        });
      }
      return res.status(500).send({
        message:
          "Something wrong updating objective with id " +
          req.params.objectiveId,
      });
    });
};

// Delete an objective with the specified Id in the request
exports.deleteObjective = (req, res) => {
  Objective.findByIdAndRemove(req.params.objectiveId)
    .then((seance) => {
      if (!seance) {
        return res.status(404).send({
          message: "objective not found with id " + req.params.objectiveId,
        });
      }
      res.send({ message: "objective deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "objective not found with id " + req.params.objectiveId,
        });
      }
      return res.status(500).send({
        message: "Could not delete seance with id " + req.params.objectiveId,
      });
    });
};
// Delete an objective with for a specified coach and player
exports.deleteStatsObjectiveByCoachAndPlayer = (req, res) => {
  const data = req.query;
  Objective.findOneAndUpdate(
    data,
    {
      $pull: { statistics: { _id: req.params.objectiveId } },
    },
    { new: true }
  )
    .then((ojective) => {
      if (!ojective) {
        return res.status(404).send({
          message: "objective not found with id " + req.params.objectiveId,
        });
      }
      res.send({
        message: "statistique supprimer avec succés!",
        type: "success",
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "objective not found with id " + req.params.objectiveId,
        });
      }
      return res.status(500).send({
        message: "Could not delete ojective with id " + req.params.objectiveId,
      });
    });
};
// Modify an objective for a specified coach and player
exports.modifyStatsObjectiveByCoachAndPlayer = (req, res) => {
  const { value, beforeDate, done } = req.body;
  Objective.findOneAndUpdate(
    req.params.objectiveId,
    {
      $set: {
        "statistics.$[elem].value": value,
        "statistics.$[elem].beforeDate": beforeDate,
        "statistics.$[elem].done": done,
      },
    },
    // $set: { statistics: { _id: req.params.objectiveId } },
    { arrayFilters: [{ "elem._id": req.params.statId }] }
  )
    .then((ojective) => {
      if (!ojective) {
        return res.status(404).send({
          message: "objective not found with id " + req.params.objectiveId,
        });
      }
      res.send({
        message: "statistique modifier avec succés!",
        type: "success",
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "objective not found with id " + req.params.objectiveId,
        });
      }
      return res.status(500).send({
        message:
          "Impossible de modifier l'objective avec l'id " +
          req.params.objectiveId,
      });
    });
};
// Modify an objective for a specified coach and player
exports.modifySkillObjectiveByCoachAndPlayer = (req, res) => {
  const { value, beforeDate, done } = req.body;
  Objective.findOneAndUpdate(
    req.params.objectiveId,
    {
      $set: {
        "skills.$[elem].value": value,
        "skills.$[elem].beforeDate": beforeDate,
        "skills.$[elem].done": done,
      },
    },
    // $set: { statistics: { _id: req.params.objectiveId } },
    { arrayFilters: [{ "elem._id": req.params.statId }] }
  )
    .then((ojective) => {
      if (!ojective) {
        return res.status(404).send({
          message: "objective not found with id " + req.params.objectiveId,
        });
      }
      res.send({
        message: "compétence modifier avec succés!",
        type: "success",
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "objective not found with id " + req.params.objectiveId,
        });
      }
      return res.status(500).send({
        message:
          "Impossible de modifier l'objective avec l'id " +
          req.params.objectiveId,
      });
    });
};
// Delete an objective with for a specified coach and player
exports.deleteSkillObjectiveByCoachAndPlayer = (req, res) => {
  const data = req.query;
  Objective.findOneAndUpdate(
    data,
    {
      $pull: { skills: { _id: req.params.objectiveId } },
    },
    { new: true }
  )
    .then((ojective) => {
      if (!ojective) {
        return res.status(404).send({
          message: "objective not found with id " + req.params.objectiveId,
        });
      }
      res.send({
        message: "compétence supprimer avec succés!",
        type: "success",
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "objective not found with id " + req.params.objectiveId,
        });
      }
      return res.status(500).send({
        message: "Could not delete ojective with id " + req.params.objectiveId,
      });
    });
};

// add stat to an object by coachId and playerID
exports.addStatObjectiveById = (req, res) => {
  // Validate Request
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "veillez enter le coach id et le joueur id",
    });
  }

  // Find and update seance with the request body
  Objective.updateOne(
    { _id: req.params.objectiveId },
    { $push: { statistics: req.body } },
    { new: true, runValidators: true }
  )
    .then((objective) => {
      if (!objective) {
        return res.status(404).send({
          message: "Objective not found with id " + req.params.objectiveId,
        });
      }
      res.send(objective);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Objective not found with id " + req.params.objectiveId,
        });
      }
      return res.status(500).send({
        message:
          "Something wrong updating objective with id " +
          req.params.objectiveId,
      });
    });
};
// add stat to an object by coachId and playerID
exports.addSkillObjectiveById = (req, res) => {
  // Validate Request
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "veillez enter le coach id et le joueur id",
    });
  }

  // Find and update seance with the request body
  Objective.updateOne(
    { _id: req.params.objectiveId },
    { $push: { skills: req.body } },
    { new: true, runValidators: true }
  )
    .then((objective) => {
      if (!objective) {
        return res.status(404).send({
          message: "Objective not found with id " + req.params.objectiveId,
        });
      }
      res.send(objective);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Objective not found with id " + req.params.objectiveId,
        });
      }
      return res.status(500).send({
        message:
          "Something wrong updating objective with id " +
          req.params.objectiveId,
      });
    });
};

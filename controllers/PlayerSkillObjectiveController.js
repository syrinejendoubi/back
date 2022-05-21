const Objective = require("../models/SkillObjectiveModal");

//Create new Seance
exports.createSkillObjective = (req, res) => {
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
          "Enter tous les champs de l'objective" ||
          "Un erreur est servenu lors de la création de l'objectif.",
      });
    });
};

// Retrieve all seances from the database.
exports.findAllSkillObjective = (req, res) => {
  const data = req.query;
  Objective.find(data)
    .populate({
      path: "skill",
      model: "skill",
    })
    .populate({ path: "player", model: "User" })
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
exports.findSkillObjective = (req, res) => {
  Objective.findById(req.params.objectiveId)
    .populate({
      path: "skill",
      model: "skill",
    })
    .populate({ path: "player", model: "User" })
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
      return res.status(500).send({
        message:
          "Something wrong retrieving seance with id " + req.params.objectiveId,
      });
    });
};
// Update a seance
exports.updateSkillObjective = (req, res) => {
  // Validate Request
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "les champs ne peuvent pas étre vide",
      type: "error",
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
      return res.status(500).send({
        message: "Could not delete seance with id " + req.params.objectiveId,
      });
    });
};
// Modify an objective for a specified coach and player
// // Modify an objective for a specified coach and player
// exports.modifySkillObjectiveByCoachAndPlayer = (req, res) => {
//   const { value, beforeDate, done } = req.body;
//   Objective.findOneAndUpdate(
//     req.params.SkillId,
//     {
//       $set: {
//         "skills.$[elem].value": value,
//         "skills.$[elem].beforeDate": beforeDate,
//         "skills.$[elem].done": done,
//       },
//     },
//     // $set: { statistics: { _id: req.params.SkillId } },
//     { arrayFilters: [{ "elem._id": req.params.statId }] }
//   )
//     .then((ojective) => {
//       if (!ojective) {
//         return res.status(404).send({
//           message: "objective not found with id " + req.params.SkillId,
//         });
//       }
//       res.send({
//         message: "compétence modifier avec succés!",
//         type: "success",
//       });
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId" || err.name === "NotFound") {
//         return res.status(404).send({
//           message: "objective not found with id " + req.params.SkillId,
//         });
//       }
//       return res.status(500).send({
//         message:
//           "Impossible de modifier l'objective avec l'id " +
//           req.params.SkillId,
//       });
//     });
// };
// Delete an objective with for a specified coach and player
// exports.deleteSkillObjectiveByCoachAndPlayer = (req, res) => {
//   const data = req.query;
//   Objective.findOneAndUpdate(
//     data,
//     {
//       $pull: { skills: { _id: req.params.SkillId } },
//     },
//     { new: true }
//   )
//     .then((ojective) => {
//       if (!ojective) {
//         return res.status(404).send({
//           message: "objective not found with id " + req.params.SkillId,
//         });
//       }
//       res.send({
//         message: "compétence supprimer avec succés!",
//         type: "success",
//       });
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId" || err.name === "NotFound") {
//         return res.status(404).send({
//           message: "objective not found with id " + req.params.SkillId,
//         });
//       }
//       return res.status(500).send({
//         message: "Could not delete ojective with id " + req.params.SkillId,
//       });
//     });
// };

// // add stat to an object by coachId and playerID
// exports.addStatObjectiveById = (req, res) => {
//   // Validate Request
//   if (Object.keys(req.body).length === 0) {
//     return res.status(400).send({
//       message: "veillez enter le coach id et le joueur id",
//     });
//   }

//   // Find and update seance with the request body
//   Objective.updateOne(
//     { _id: req.params.SkillId },
//     { $push: { statistics: req.body } },
//     { new: true, runValidators: true }
//   )
//     .then((objective) => {
//       if (!objective) {
//         return res.status(404).send({
//           message: "Objective not found with id " + req.params.SkillId,
//         });
//       }
//       res.send(objective);
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId") {
//         return res.status(404).send({
//           message: "Objective not found with id " + req.params.SkillId,
//         });
//       }
//       return res.status(500).send({
//         message:
//           "Something wrong updating objective with id " +
//           req.params.SkillId,
//       });
//     });
// };
// // add stat to an object by coachId and playerID
// exports.addSkillObjectiveById = (req, res) => {
//   // Validate Request
//   if (Object.keys(req.body).length === 0) {
//     return res.status(400).send({
//       message: "veillez enter le coach id et le joueur id",
//     });
//   }

//   // Find and update seance with the request body
//   Objective.updateOne(
//     { _id: req.params.SkillId },
//     { $push: { skills: req.body } },
//     { new: true, runValidators: true }
//   )
//     .then((objective) => {
//       if (!objective) {
//         return res.status(404).send({
//           message: "Objective not found with id " + req.params.SkillId,
//         });
//       }
//       res.send(objective);
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId") {
//         return res.status(404).send({
//           message: "Objective not found with id " + req.params.SkillId,
//         });
//       }
//       return res.status(500).send({
//         message:
//           "Something wrong updating objective with id " +
//           req.params.SkillId,
//       });
//     });
// };

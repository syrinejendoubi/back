const Discipline = require("../models/disciplineModel");

//Create new Discipline
exports.createDiscipline = (req, res) => {
  // Request validation
  const disciplineData = req.body;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Discipline content can not be empty",
    });
  }

  // Create a Discipline
  const discipline = new Discipline(disciplineData);

  // Save Discipline in the database
  discipline
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something wrong while creating the discipline.",
      });
    });
};

// Retrieve all disciplines from the database.
exports.findAllDiscipline = (req, res) => {
  const data = req.query;
  Discipline.find(data)
    .then((disciplines) => {
      res.send(disciplines);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving disciplines.",
      });
    });
};

// Find a single discipline with a disciplineId
exports.findDiscipline = (req, res) => {
  Discipline.findById(req.params.disciplineId)
    .then((discipline) => {
      if (!discipline) {
        return res.status(404).send({
          message: "Discipline not found with id " + req.params.disciplineId,
        });
      }
      res.send(discipline);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Discipline not found with id " + req.params.disciplineId,
        });
      }
      return res.status(500).send({
        message:
          "Something wrong retrieving discipline with id " +
          req.params.disciplineId,
      });
    });
};

// Update a discipline
exports.updateDiscipline = (req, res) => {
  // Validate Request
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Discipline content can not be empty",
    });
  }

  // Find and update discipline with the request body
  Discipline.findByIdAndUpdate(req.params.disciplineId, req.body, { new: true })
    .then((discipline) => {
      if (!discipline) {
        return res.status(404).send({
          message: "Discipline not found with id " + req.params.disciplineId,
        });
      }
      res.send(discipline);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Discipline not found with id " + req.params.disciplineId,
        });
      }
      return res.status(500).send({
        message:
          "Something wrong updating note with id " + req.params.disciplineId,
      });
    });
};

// Delete a note with the specified Id in the request
exports.deleteDiscipline = (req, res) => {
  Discipline.findByIdAndRemove(req.params.disciplineId)
    .then((discipline) => {
      if (!discipline) {
        return res.status(404).send({
          message: "Discipline not found with id " + req.params.disciplineId,
        });
      }
      res.send({ message: "Discipline deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Discipline not found with id " + req.params.disciplineId,
        });
      }
      return res.status(500).send({
        message:
          "Could not delete discipline with id " + req.params.disciplineId,
      });
    });
};

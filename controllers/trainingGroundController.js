const TrainingGround = require("../models/trainingGroundModel");
const ErrorResponse = require("../utils/errorResponse");
const mongoose = require("mongoose");
exports.createTrainingGround = async (req, res, next) => {
  const { createdBy, city, address } = req.body;
  if (!createdBy || !city || !address) {
    return next(
      new ErrorResponse("Veuillez fournir tous les renseignements requis", 400)
    );
  }
  const trainingGround = new TrainingGround({
    ...req.body,
    createdBy: mongoose.Types.ObjectId(createdBy),
  });
  trainingGround
    .save()
    .then(() => {
      res.status(200).send({
        type: "success",
        message: "Le lieu d'entainement a été ajouté avec succès.",
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: "error",
        message:
          err.message || "Un problème est survenu lors de la création de lieu.",
      });
    });
};

exports.getTrainingGrounds = async (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const traininGrounds = await TrainingGround.find({
      createdBy: req.params.id,
    }).sort("-createdAt");
    if (traininGrounds) {
      return res.status(200).json({ type: "success", data: traininGrounds });
    }
    return next(new ErrorResponse("Lieu d'entrainement non trouvé", 404));
  } else {
    return next(new ErrorResponse("Veuillez fournir une id valide", 400));
  }
};

exports.updateTrainingGround = async (req, res, next) => {
  const { createdBy, city, address } = req.body;
  if (!createdBy || !city || !address) {
    return next(
      new ErrorResponse("Veuillez fournir tous les renseignements requis", 400)
    );
  }

  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const updatedTrainingGroud = await TrainingGround.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (updatedTrainingGroud) {
      return res.status(200).json({
        type: "success",
        message: "l’emplacement a été mis à jour avec succès",
      });
    }
    return next(new ErrorResponse("Mise à jour a échoué", 500));
  } else {
    return next(new ErrorResponse("Veuillez fournir une id valide", 400));
  }
};

exports.deleteTrainingGround = async (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    TrainingGround.findByIdAndRemove(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send({
          type: "error",
          message: "Erreur de serveur",
        });
      }
      if (!data) {
        return res.status(404).send({
          type: "error",
          message: "Lieu d'entrainement non trouvé avec id spécifiée",
        });
      }
      res.status(200).send({
        type: "success",
        message: "Lieu supprimé avec succès !",
      });
    });
  } else {
    return next(new ErrorResponse("Veuillez fournir une id valide", 400));
  }
};

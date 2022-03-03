const Statistic = require("../models/statisticModel");

exports.CreateStatistic = (req, res) => {
  const StatisticData = res.body;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Les champs de contenu des statistiques ne peut pas être vide",
    });
  }
  const statistic = new Statistic(StatisticData);
  statistic
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Un problème est survenu lors de la création de l'invitation.",
      });
    });
};

// Retrieve all invitations from the database.
exports.findAllStatistic = (req, res) => {
  const data = req.query;
  statistic
    .find(data)
    .then((stat) => {
      res.send(stat);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Un problème est survenu lors de la récupération des statistiques.",
      });
    });
};

// Find a single invitation with a invitationId
exports.findSingleStatistic = (req, res) => {
  Statistic.findById(req.params.statisticId)
    .then((stat) => {
      if (!stat) {
        return res.status(404).send({
          message:
            "statistique non trouvée avec l'id " + req.params.statisticId,
        });
      }
      res.send(stat);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message:
            "statistique non trouvée avec l'id  " + req.params.statisticId,
        });
      }
      return res.status(500).send({
        message:
          "Un problème est survenu lors de la récupération de la statistique avec l'id " +
          req.params.statisticId,
      });
    });
};

// Update a invitation
exports.updateStatistic = (req, res) => {
  // Validate Request
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Les champs de contenu des statistiques ne peut pas être vide",
    });
  }

  // Find and update invitation with the request body
  Statistic.findByIdAndUpdate(req.params.statisticId, req.body, { new: true })
    .then((stat) => {
      if (!stat) {
        return res.status(404).send({
          message: "Statistique non trouvée avec id " + req.params.statisticId,
        });
      }
      res.send(stat);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Statistique non trouvée avec id  " + req.params.statisticId,
        });
      }
      return res.status(500).send({
        message:
          "Un problème est survenu lors de la mise à jour de la statistique avec l'id" +
          req.params.statisticId,
      });
    });
};

// Delete a note with the specified Id in the request
exports.deleteStatistic = (req, res) => {
  Statistic.findByIdAndRemove(req.params.statisticId)
    .then((stat) => {
      if (!stat) {
        return res.status(404).send({
          message: "Statistique non trouvée avec id " + req.params.statisticId,
        });
      }
      res.send({ message: "Statistique supprimé avec succès !" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "statistique non trouvée avec id" + req.params.statisticId,
        });
      }
      return res.status(500).send({
        message: "statistique non trouvée avec id " + req.params.statisticId,
      });
    });
};

const Alert = require("../models/AlertModal");

exports.findAllAlerts = (req, res) => {
  const data = req.query;
  Alert.find(data)
    .populate("player")
    .populate("statistique")
    .sort("-createdAt")
    .then((alerts) => {
      res.send(alerts);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving alerts.",
      });
    });
};

exports.updateAlert = (req, res) => {
  // Validate Request
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Alert content can not be empty",
    });
  }

  Alert.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((alert) => {
      if (!alert) {
        return res.status(404).send({
          message: "Alert not found ",
        });
      }
      res.send(alert);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Alert not found",
        });
      }
      return res.status(500).send({
        message: "Something wrong",
      });
    });
};

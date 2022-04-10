const Session = require("../models/sessionModal");
//Create new Programme
exports.createSession = (req, res) => {
  // Request validation
  const sessionData = req.body;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Session content can not be empty",
    });
  }

  // Create a Programme
  const session = new Session(sessionData);

  // Save Programme in the database
  session
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something wrong while creating the programme.",
      });
    });
};

// Retrieve all programmes from the database.
exports.findAllSessions = (req, res) => {
  const data = req.query;
  Session.find(data)
    .populate("statistics")
    .then((session) => {
      res.send(session);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving sessions.",
      });
    });
};

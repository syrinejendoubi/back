const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    http_only: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  user.password = undefined;
  res.status(statusCode).json({ user, token });
};

//Create new User
exports.createUser = (req, res) => {
  // Request validation
  const userData = req.body;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "User content can not be empty",
    });
  }

  // Create a User
  const user = new User(userData);

  // Save User in the database
  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something wrong while creating the user.",
      });
    });
};

// Retrieve all users from the database.
exports.findAllUser = (req, res) => {
  const data = req.query;
  User.find(data)
    .populate("discipline")
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving users.",
      });
    });
};

// Find a single user with a userId
exports.findUser = (req, res) => {
  User.findById(req.params.userId)
    .populate("discipline")
    .populate("myPlayers")
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Something wrong retrieving user with id " + req.params.userId,
      });
    });
};
// Update a user
exports.updateUser = async (req, res) => {
  // Validate Request
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Le contenu des données de l'utilisateur ne peut pas être vide",
    });
  }

  // Find and update user with the request body
  const updatedUser = await User.findByIdAndUpdate(
    req.params.userId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (updatedUser) {
    return res.status(200).json({
      data: updatedUser,
      type: "success",
      message: "l'utilisateur a été mis à jour avec succès",
    });
  }
  if (user.role == "coach") sendTokenResponse(user, 200, res);
  return next(new ErrorResponse("Mise à jour a échoué", 500));
  // .catch((err) => {
  //   if (err.kind === "ObjectId") {
  //     return res.status(404).send({
  //       message: "User not found with id " + req.params.userId,
  //     });
  //   }
  //   return res.status(500).send({
  //     message: "Something wrong updating user with id " + req.params.userId,
  //   });
  // });
};

// Delete a note with the specified Id in the request
exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.userId,
      });
    });
};
exports.changeSubscription = async (req, res, next) => {
  const { subscription } = req.body;
  if (!subscription) {
    return next(
      new ErrorResponse("Veuillez fournir tous les renseignements requis", 400)
    );
  }
  const updatedSubscription = await User.findByIdAndUpdate(
    req.params.userId,
    { subscription: subscription },
    {
      new: true,
      runValidators: true,
    }
  );
  if (updatedSubscription) {
    return res.status(200).json({
      data: updatedSubscription,
      type: "success",
      message: "l'abonnement a été mis à jour avec succès",
    });
  }
  return next(new ErrorResponse("Mise à jour a échoué", 500));
};

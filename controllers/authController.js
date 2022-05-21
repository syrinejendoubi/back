const crypto = require("crypto");
const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    http_only: true,
  };

  user.password = undefined;
  res.status(statusCode).json({ user, token });
};

exports.register = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    sexe,
    city,
    dateOfBirth,
    height,
    weight,
    active,
    role,
    sessionPrice,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !sexe ||
    !city ||
    !dateOfBirth ||
    !role
  ) {
    return next(
      new ErrorResponse("Veuillez fournir tous les renseignements requis", 400)
    );
  }
  const ExistingUser = await User.findOne({ email });
  if (ExistingUser) {
    return next(
      new ErrorResponse(
        "Utilisateur existe déjà s’il vous plaît rediriger vers la page de connexion",
        401
      )
    );
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    sexe,
    city,
    dateOfBirth,
    height,
    weight,
    sessionPrice,
    active,
    role,
  });
  sendTokenResponse(user, 200, res);
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new ErrorResponse("veuillez fournir l'email et le mot de passe", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(
      new ErrorResponse(
        "Les informations de connexion fournies sont invalides",
        401
      )
    );
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(
      new ErrorResponse(
        "Les informations de connexion fournies sont invalides",
        401
      )
    );
  }

  sendTokenResponse(user, 200, res);
};

exports.logout = async (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 1000),
    http_only: true,
  });
  res.status(200).json({ success: true });
};

const Skill = require("../models/skillsModel");
const ErrorResponse = require("../utils/errorResponse");

exports.CreateSkill = async (req, res, next) => {
  const skillData = req.body;
  const { skillName } = req.body;
  if (Object.keys(skillData).length === 0) {
    return res.status(400).send({
      message: "Les champs ne peut pas être vide",
    });
  }
  const skill = new Skill(skillData);
  skill
    .save()
    .then((data) => {
      res.json({ data, message: "compétence créée avec succès" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Enter tous les champs de compétence" ||
          "Un problème est survenu lors de la création de compétence.",
      });
    });
};

// Retrieve all invitations from the database.
exports.findAllSkills = async (req, res) => {
  try {
    const PAGE_SIZE = 20;
    const page = parseInt(req.query.page) || "0";
    const total = await Skill.countDocuments({});
    const skill = await Skill.find({ discipline: req.params.discipline })
      .sort("-createdAt")
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res.json({
      totalpages: Math.ceil(total / PAGE_SIZE),
      skill,
      pageSize: PAGE_SIZE,
    });
    // const limit = req.query.limit * 1 || 100;
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        "Un problème est survenu lors de la récupération des compétences.",
    });
  }
};

// Find a single invitation with a invitationId
exports.findSingleSkill = (req, res) => {
  Skill.findById(req.params.skillId)
    .then((skill) => {
      if (!skill) {
        return res.status(404).send({
          message: "compétence non trouvée avec l'id " + req.params.skillId,
        });
      }
      res.send(skill);
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          "Un problème est survenu lors de la récupération de la statistique avec l'id " +
          req.params.skillId,
      });
    });
};

exports.updateSkill = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Les champs de contenu des compétences ne peut pas être vide",
    });
  }

  // Find and update invitation with the request body
  Skill.findByIdAndUpdate(req.params.skillId, req.body, { new: true })
    .then((skill) => {
      if (!skill) {
        return res.status(404).send({
          message: "compétence non trouvée avec id " + req.params.skillId,
        });
      }
      res.json({
        skill,
        message: "La compétence a été modifiée avec succès",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          "Un problème est survenu lors de la mise à jour de la compétence ",
      });
    });
};

// Delete a note with the specified Id in the request
exports.deleteSkill = (req, res) => {
  Skill.findByIdAndRemove(req.params.skillId)
    .then((skill) => {
      if (!skill) {
        return res.status(404).send({
          message: "compétence non trouvée avec id " + req.params.skillId,
        });
      }
      res.json({
        skill: skill,
        message: "compétence supprimé avec succès !",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "compétence non trouvée avec id " + req.params.skillId,
      });
    });
};

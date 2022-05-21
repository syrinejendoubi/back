const router = require("express").Router();
const {
  findAllSkillObjective,
  createSkillObjective,
  findSkillObjective,
  deleteObjective,
  updateSkillObjective,
  modifySkillObjective,
} = require("../../controllers/PlayerSkillObjectiveController");
const { protect, authorize } = require("../../middleware/authMiddleware");
// Get All objective
router.get("/SkillObjectives", findAllSkillObjective);
// Add objective
router.post("/skillObjective", createSkillObjective);
// get objective by id
router.get("/skillObjectives/:objectiveId", findSkillObjective);
// update objective
router.put("/skillObjectives/:objectiveId", updateSkillObjective);
// delete objective
router.delete("/skillObjectives/:objectiveId", deleteObjective);

module.exports = router;

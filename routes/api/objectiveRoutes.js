const router = require("express").Router();
const {
  findAllObjective,
  createObjective,
  findObjective,
  deleteObjective,
  updateObjective,
  findObjectiveByCoach,
  deleteStatsObjectiveByCoachAndPlayer,
  deleteSkillObjectiveByCoachAndPlayer,
  addStatObjectiveById,
  addSkillObjectiveById,
  modifyStatsObjectiveByCoachAndPlayer,
  modifySkillObjectiveByCoachAndPlayer,
} = require("../../controllers/PlayerObjectiveController");
const { protect, authorize } = require("../../middleware/authMiddleware");
// Get All objective
router.get("/objectives", findAllObjective);
// Add objective
router.post("/objectives", createObjective);
// get objective by id
router.get("/objectives/:objectiveId", findObjective);
// get objective by id
router.get("/objectivesByCoach", findObjectiveByCoach);
// update objective
router.put("/objectives/:objectiveId", updateObjective);
// delete objective's stat by coach and player id
router.put(
  "/deleteObjectiveStat/:objectiveId",
  deleteStatsObjectiveByCoachAndPlayer
);
// delete objective's stat by coach and player id
router.put(
  "/deleteObjectiveSkill/:objectiveId",
  deleteSkillObjectiveByCoachAndPlayer
);
// add objective's stat by platerId and coach id
router.put("/addObjectiveStat/:objectiveId", addStatObjectiveById);
// add objective's skill by platerId and coach id
router.put("/addObjectiveSkill/:objectiveId", addSkillObjectiveById);
// add objective's skill by platerId and coach id
router.put(
  "/modifyObjectiveStat/:objectiveId/:statId",
  modifyStatsObjectiveByCoachAndPlayer
);
// add objective's skill by platerId and coach id
router.put(
  "/modifyObjectiveSkill/:objectiveId/:statId",
  modifySkillObjectiveByCoachAndPlayer
);
// delete objective
router.delete("/objectives/:objectiveId", deleteObjective);

module.exports = router;

const router = require("express").Router();
const {
  findAllStatisticObjective,
  createStatisticObjective,
  findStatisticObjective,
  deleteObjective,
  updateStatisticObjective,
  modifyStatsObjective,
} = require("../../controllers/PlayerStatisticObjectiveController");
const { protect, authorize } = require("../../middleware/authMiddleware");
// Get All objective
router.get("/StatObjectives", findAllStatisticObjective);
// Add objective
router.post("/statObjective", createStatisticObjective);
// get objective by id
router.get("/statisticObjectives/:objectiveId", findStatisticObjective);
// update objective
router.put("/statisticObjectives/:objectiveId", updateStatisticObjective);
// delete objective
router.delete("/statObjectives/:objectiveId", deleteObjective);

module.exports = router;

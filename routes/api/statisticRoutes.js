const router = require("express").Router();
const { protect, authorize } = require("../../middleware/authMiddleware");
const {
  CreateStatistic,
  deleteStatistic,
  updateStatistic,
  findSingleStatistic,
  findAllStatistic,
} = require("../../controllers/statisticController");

router.post("/createStatistic", protect, CreateStatistic);

router.get("/all/statistics", protect, findAllStatistic);

// get statistic by id
router.get("/statistic/:statisticId", protect, findSingleStatistic);
// update statistic
router.put("/statistic/:statisticId", protect, updateStatistic);
// delete statistic
router.delete("/statistic/:statisticId", protect, deleteStatistic);

module.exports = router;

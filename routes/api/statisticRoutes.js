const router = require("express").Router();
const { protect, authorize } = require("../../middleware/authMiddleware");
const {
  CreateStatistic,
  deleteStatistic,
  updateStatistic,
  findSingleStatistic,
  findAllStatistic,
} = require("../../controllers/statisticController");

router.post("/createStatistic", CreateStatistic);

router.get("/all/statistics/:discipline", findAllStatistic);

// get statistic by id
router.get("/statistic/:statisticId", findSingleStatistic);
// update statistic
router.put("/statistic/:statisticId", updateStatistic);
// delete statistic
router.delete("/statistic/:statisticId", deleteStatistic);

module.exports = router;

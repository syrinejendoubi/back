const router = require("express").Router();
const {
  createTrainingGround,
  getTrainingGrounds,
  updateTrainingGround,
  deleteTrainingGround,
} = require("../../controllers/trainingGroundController");

router.post("/createTrainingGround", createTrainingGround);
router.get("/getTrainingGrounds/:id", getTrainingGrounds);
router.post("/updateTrainingGround/:id", updateTrainingGround);
router.delete("/deleteTrainingGround/:id", deleteTrainingGround);

module.exports = router;

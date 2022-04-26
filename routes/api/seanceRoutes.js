const router = require("express").Router();
const {
  findAllSeance,
  createSeance,
  findSeance,
  deleteSeance,
  updateSeance,
  cancelSession,
} = require("../../controllers/seanceController");
const { protect, authorize } = require("../../middleware/authMiddleware");
// Get All seances
router.get("/seances", findAllSeance);
// Add seance
router.post("/seances", createSeance);
// get seance by id
router.get("/seances/:seanceId", findSeance);
// update seance
router.put("/seances/:seanceId", updateSeance);
// cancel seance
router.put("/seances/annuler/:seanceId", cancelSession);
// delete seance
router.delete("/seances/:seanceId", deleteSeance);

module.exports = router;

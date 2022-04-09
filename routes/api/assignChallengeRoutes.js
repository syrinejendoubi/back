const router = require("express").Router();
const {
  assignChallenge,
  findAllAssignedChallenges,
  findAllAssignedChallengesFull,
  updateAssignedChallenge,
} = require("../../controllers/assignerDefiController");
const { protect, authorize } = require("../../middleware/authMiddleware");
router.post("/assignerdefi", assignChallenge);

router.put("/player/defi/marquerFini/:defiId", updateAssignedChallenge);

router.get("/coach/defis/assignes", findAllAssignedChallengesFull);

router.get("/player/defis/assignes", findAllAssignedChallenges);

module.exports = router;

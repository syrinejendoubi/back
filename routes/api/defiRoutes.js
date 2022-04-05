const router = require("express").Router();
const {
  findAllDefi,
  createDefi,
  findDefi,
  deleteDefi,
  updateDefi,
  assignChallenge,
  findMyDefi,
} = require("../../controllers/defiController");
const { protect, authorize } = require("../../middleware/authMiddleware");
// Get All defis
router.get("/defis", findAllDefi);
// Get My defis
router.get("/mes/defis/:userId", findMyDefi);
// Add defi
router.post("/defis", createDefi);
// get defi by id
router.get("/defis/:defiId", findDefi);
// update defi
router.put("/defis/:defiId", updateDefi);
// assign defi
router.put("/attribuer/defi/:defiId", assignChallenge);
// delete defi
router.delete("/defis/:defiId", deleteDefi);

module.exports = router;

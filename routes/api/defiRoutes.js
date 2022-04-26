const router = require("express").Router();
const {
  findAllDefi,
  createDefi,
  findDefi,
  deleteDefi,
  updateDefi,
} = require("../../controllers/defiController");
const { protect, authorize } = require("../../middleware/authMiddleware");
// Get All defis
router.get("/defis", findAllDefi);
// Add defi
router.post("/defis", createDefi);
// get defi by id
router.get("/defis/:defiId", findDefi);
// update defi
router.put("/defis/:defiId", updateDefi);
// delete defi
router.delete("/defis/:defiId", deleteDefi);

module.exports = router;

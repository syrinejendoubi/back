const router = require("express").Router();
const {
  findAllAlerts,
  updateAlert,
} = require("../../controllers/AlertController");
router.get("/coach/alerts", findAllAlerts);
router.put("/coach/alerts/:id", updateAlert);
module.exports = router;

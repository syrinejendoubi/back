const router = require("express").Router();
const { updateSubscription } = require("../../controllers/usersController");
const { protect, authorize } = require("../../middleware/authMiddleware");
// update Subscription
router.put("/subscription/:userId", updateSubscription);

module.exports = router;

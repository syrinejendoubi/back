const router = require("express").Router();
const { changeSubscription } = require("../../controllers/usersController");
const { protect, authorize } = require("../../middleware/authMiddleware");
// update Subscription
router.put("/update-subscription/:userId", changeSubscription);

module.exports = router;

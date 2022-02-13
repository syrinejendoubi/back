const router = require("express").Router();
const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
  updateEmail,
  resetEmail,
  getMe,
} = require("../../controllers/authController");
const { protect, authorize } = require("../../middleware/authMiddleware");
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.put("/updatedetails", protect, authorize("user"), updateDetails);
router.post("/updateemail", protect, authorize("user"), updateEmail);
router.put("/updatepassword", protect, authorize("user"), updatePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);
router.put("/resetemail/:resettoken", resetEmail);
router.get("/me", protect, authorize("user"), getMe);
module.exports = router;

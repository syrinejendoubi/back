const router = require("express").Router();
const { findAllSeance , createSeance , findSeance,  deleteSeance , updateSeance  } = require("../../controllers/seanceController");
const { protect, authorize } = require("../../middleware/authMiddleware");
// Get All seances
router.get("/seances" , findAllSeance);
// Add seance
router.post("/seances", createSeance);
// get seance by id 
router.get("/seances/:seanceId" , findSeance );
// update seance
router.put("/seances/:seanceId" ,updateSeance );
// delete seance
router.delete("/seances/:seanceId" ,deleteSeance );


module.exports = router;
